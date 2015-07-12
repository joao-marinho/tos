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
    var middleware = {};
    var middlewareFilesNames = fs.readdirSync(path.join(conf.appDir, "middleware"));

    middlewareFilesNames.forEach(function(middlewareFileName) {
      var middlewareName = getName(middlewareFileName);
      middleware[middlewareName] = require(path.join(conf.appDir, "middleware", middlewareFileName))(conf);
    });

    resolve(middleware);
  });
};
