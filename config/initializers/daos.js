var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");

function getName(filename) {
  var extname = path.extname(filename);
  var basename = path.basename(filename, extname);
  return _.capitalize(_.camelCase(basename.toLowerCase()));
}

function BasicDao(conf) {
  var self = this;

  self.tableName = conf.tableName;
  self.fieldNames = conf.fieldNames;
  self.db = conf.db;
  self.discriminator = conf.discriminator;
}

BasicDao.prototype.create = function(resource) {
  var self = this;
  var fields = self.fieldNames;
  var tableName = self.tableName;
  var i;

  var values = fields.map(function(fieldName) {
    var value = resource[fieldName];
    if (value === '') {
      return null;
    }
    return resource[fieldName];
  });
  var values$ = "";

  for (i = 1; i <= fields.length; i += 1) {
    values$ += "$" + i;
    if (i != fields.length) {
      values$ += ", ";
    }
  }

  if (self.discriminator) {
    values$ += ", $" + i;
    fields = fields.concat("tipo");
    values.push(self.discriminator);
  }

  return self.db.query("INSERT INTO " + tableName + " (" + fields.join(", ") + ") VALUES (" + values$ + ") RETURNING *;", values);
};

BasicDao.prototype.addDiscriminatorQuery = function(opts) {
  var self = this;
  var query = "";
  opts = opts || {};
  if (!self.discriminator) {
    return " ";
  }

  if (opts.withWhere) {
    query = " WHERE";
  }
  else if(opts.andAtBegin) {
    query += "AND";
  }

  query += " tipo = '" + self.discriminator + "' ";

  if(opts.andAtEnd) {
    query += "AND ";
  }

  return query;
}

BasicDao.prototype.find = function(id) {
  var self = this;
  return self.db.query("SELECT * FROM " + self.tableName + " WHERE id = $1 " + self.addDiscriminatorQuery({andAtBegin: true}) + "LIMIT 1;", [id]);
};

BasicDao.prototype.findOneRandom = function() {
  var self = this;

  return self.db.query("SELECT * FROM " + self.tableName + self.addDiscriminatorQuery({withWhere: true}) + " ORDER BY RANDOM() LIMIT 1;");
};

BasicDao.prototype.all = function() {
  var self = this;
  return self.db.query("SELECT * FROM " + self.tableName + self.addDiscriminatorQuery({withWhere: true}) + ";");
};

BasicDao.prototype.where = function(queryArray) {
  var self = this;
  var query = "";
  var values = [];

  if(!_.isArray(queryArray)) {
    queryArray = [queryArray];
  }

  query += "(";
  _.forEach(queryArray, function(queryObj) {
    query += "(";
    _.forEach(queryObj, function(value, field) {
      values.push(value);
      query += field + " = $" + values.length + " AND ";
    });
    // Removing the last " AND "
    query = query.substring(0, query.length - 5);
    query += ") OR ";
  });

  // Removing the last " OR "
  query = query.substring(0, query.length - 4);
  query += ")";
  query += ";";

  return self.db.query("SELECT * FROM " + self.tableName + " WHERE " + self.addDiscriminatorQuery({andAtEnd: true}) + query, values);
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
