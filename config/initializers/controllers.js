var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");

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
      var controller = require(path.join(conf.appDir, "controllers", controllerFileName))(conf.models);

      _.forEach(controller, function(handler, action) {
        var oldHandler = handler;
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
      });

      controllers[controllerName] = controller;
    });

    resolve(controllers);
  });
};
