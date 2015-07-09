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
      controllers[controllerName] = require(path.join(conf.appDir, "controllers", controllerFileName))(conf.models);
    });

    resolve(controllers);
  });
};
