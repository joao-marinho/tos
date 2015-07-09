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
    var Dao = {};
    var daoFilesNames = fs.readdirSync(path.join(conf.appDir, "daos"));

    daoFilesNames.forEach(function(daoFileName) {
      var daoName = getName(daoFileName);
      Dao[daoName] = require(path.join(conf.appDir, "daos", daoFileName))(conf.Db);
    });

    resolve(Dao);
  });
};
