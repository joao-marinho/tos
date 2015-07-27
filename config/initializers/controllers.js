var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");
var getParameterNames = require('get-parameter-names')

function getBasename(filename) {
  var extname = path.extname(filename);
  var basename = path.basename(filename, extname);

  return basename;
}

function getName(filename) {
  return _.capitalize(_.camelCase(getBasename(filename)));
}

function readDirectory(controllers, relativePath, controllersPath, prepareController) {
  var currentPath = path.join(controllersPath, relativePath);
  var fileNames = fs.readdirSync(currentPath);

  _.forEach(fileNames, function(filename) {
    var pathComplete = path.join(currentPath, filename);
    var fileStat = fs.statSync(pathComplete);
    var currentRelativePath = path.join(relativePath, getBasename(filename));

    if(fileStat.isFile()) {
      var controllerName = getName(filename);
      var controller = require(pathComplete);

      controllers[controllerName] = prepareController(controller, currentRelativePath);
    }
    else if(fileStat.isDirectory()) {
      var directoryName = getName(filename);
      controllers[directoryName] = {};
      readDirectory(controllers[directoryName], currentRelativePath, controllersPath, prepareController);
    }
  });
}

module.exports = function(conf) {
  return q.Promise(function(resolve, reject) {
    var controllers = {};
    var controllersPath = path.join(conf.appDir, "controllers");

    readDirectory(controllers, "", controllersPath, function(controllerInitializer, pathComplete) {
      var controller = controllerInitializer(conf.models, conf.services);

      _.forEach(controller, function(handler, action) {
        var oldHandler = handler;
        var handlerParameters = getParameterNames(handler);
        // console.log(path.join(controllerName, action).toLowerCase());

        if(handlerParameters.length === 1 && handlerParameters[0] == "scope") {
          controller[action] = function(req, res, next) {
            var scope = {params: req.params, body: req.body, session: req.session, currentUser: req.currentUser};
            var result = oldHandler(scope);
            var renderPath = path.join(pathComplete, action).toLowerCase();

            if(result && typeof result.then == 'function' && typeof result.catch == 'function') {
              result
              .then(function() {
                res.render(renderPath, scope);
              })
              .catch(function(err) {
                console.log(err);
                next(err);
              });
            }
            else {
              res.render(renderPath, scope);
            }

            return result;
          };
        }
        else {
          controller[action] = function(req, res, next) {
            var result = oldHandler(req, res, next);
            if(result && typeof result.then == 'function' && typeof result.catch == 'function') {
              result.catch(function(err) {
                console.log(err);
                next(err);
              });
            }

            return result;
          };
        }
      });

      return controller;
    });
    console.log(controllers);
    resolve(controllers);
  });
};
