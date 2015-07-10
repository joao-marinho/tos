var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");

function getName(filename) {
  var extname = path.extname(filename);
  var basename = path.basename(filename, extname);
  return _.capitalize(basename.toLowerCase());
}

function BasicDao(conf) {
  var self = this;

  self.tableName = conf.tableName;
  self.fieldNames = conf.fieldNames;
  self.db = conf.db;
}

BasicDao.prototype.create = function(resource) {
  var self = this;
  var fields = self.fieldNames;
  var tableName = self.tableName;

  var values = fields.map(function(fieldName) {
    var value = resource[fieldName];
    if(value === '') {
      return null;
    }
    return resource[fieldName];
  });
  var values$ = "";

  for(var i = 1; i <= fields.length; i += 1) {
    values$ += "$"+i;
    if(i != fields.length) {
      values$ += ", ";
    }
  }

  return self.db.query("INSERT INTO "+ tableName +" ("+ fields.join(", ") +") VALUES (" + values$ + ") RETURNING *;", values);
};

BasicDao.prototype.find = function(id) {
  var self = this;
  return self.db.query("SELECT * FROM "+ self.tableName +" WHERE id = $1 LIMIT 1;", [id]);
};

BasicDao.prototype.all = function() {
  var self = this;
  return self.db.query("SELECT * FROM "+self.tableName+";");
};

module.exports = function(conf) {
  return q.Promise(function(resolve, reject) {
    var Dao = {};
    var daoFilesNames = fs.readdirSync(path.join(conf.appDir, "daos"));

    daoFilesNames.forEach(function(daoFileName) {
      var daoName = getName(daoFileName);
      Dao[daoName] = require(path.join(conf.appDir, "daos", daoFileName))(conf.Db, BasicDao);
    });

    resolve(Dao);
  });
};
