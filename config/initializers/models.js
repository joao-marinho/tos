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
    var models = {};
    var modelFilesNames = fs.readdirSync(path.join(conf.appDir, "models"));

    modelFilesNames.forEach(function(modelFileName) {
      var modelName = getName(modelFileName);
      models[modelName] = require(path.join(conf.appDir, "models", modelFileName))(conf.DAO);
    });

    resolve(models);
  });
};
