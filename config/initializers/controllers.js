var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");
var getParameterNames = require('get-parameter-names')

function getName(filename) {
  var extname = path.extname(filename);
  var basename = path.basename(filename, extname);
  return _.capitalize(basename.toLowerCase());
}

module.exports = function(conf) {
  return q.Promise(function(resolve, reject) {
    var controllers = {};
    var controllerFilesNames = fs.readdirSync(path.join(conf.appDir, "controllers"));

    controllerFilesNames.forEach(function(controllerFileName) {
      var controllerName = getName(controllerFileName);
      var controller = require(path.join(conf.appDir, "controllers", controllerFileName))(conf.models, conf.services);

      _.forEach(controller, function(handler, action) {
        var oldHandler = handler;
        var handlerParameters = getParameterNames(handler);
        // console.log(path.join(controllerName, action).toLowerCase());

        if(handlerParameters.length === 1 && handlerParameters[0] == "scope") {
          controller[action] = function(req, res, next) {
            var scope = {params: req.body, session: req.session, currentUser: req.currentUser};
            var result = oldHandler(scope);
            var renderPath = path.join(controllerName, action).toLowerCase();

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

      controllers[controllerName] = controller;
    });

    resolve(controllers);
  });
};
