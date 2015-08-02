var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");

function getName(filename) {
  var extname = path.extname(filename);
  var basename = path.basename(filename, extname);
  return _.capitalize(_.camelCase(basename.toLowerCase()));
}

function BasicModel(dao) {

  function Model(modelRaw) {
    var self = this;
    self.id = modelRaw.id;

    dao.fieldNames.forEach(function(fieldName) {
      self[fieldName] = modelRaw[fieldName];
    });
  }

  Model._dao = dao;

  Model.create = function(model) {
    return dao.create(model).
      then(function(result) {
        var modelRaw = result.rows[0];

        return new Model(modelRaw);
      });
  };

  Model.find = function(id) {
    return dao.find(id).
      then(function(result) {
        var modelRaw = result.rows[0];

        return new Model(modelRaw);
      });
  };

  Model.all = function() {
    return dao.all().
      then(function(result) {
        return result.rows.map(function(modelRaw) {
          return new Model(modelRaw);
        });
      });
  };

  Model.getOneRandom = function() {
    return dao.findOneRandom().
      then(function(result) {
        var modelRaw = result.rows[0];

        return new Model(modelRaw);
      });
  };

  Model.where = function(queryObj) {
    return dao.where(queryObj).
      then(function(result) {
        return result.rows.map(function(modelRaw) {
          return new Model(modelRaw);
        })
      });
  };

  Model.prototype.delete = function() {
    var self = this;

    return dao.delete(self.id).then(function(result) {
      return true;
    }, function() {
      return false;
    });
  };

  Model.prototype.save = function() {
    var self = this;

    return dao.save(self).then(function(result) {
      var modelRaw = result.rows[0];

      return new Model(modelRaw);
    });
  };

  return Model;
}

module.exports = function(conf) {
  return q.Promise(function(resolve, reject) {
    var models = {};
    var modelFilesNames = fs.readdirSync(path.join(conf.appDir, "models"));

    modelFilesNames.forEach(function(modelFileName) {
      var modelName = getName(modelFileName);
      models[modelName] = require(path.join(conf.appDir, "models", modelFileName))(conf.DAO, BasicModel);
    });

    resolve(models);
  });
};
