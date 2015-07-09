var path = require("path");

module.exports = function(app) {
  var conf = {
    appDir: path.join(__dirname, ".."),
    app: app,
    DAO: {}
  };

  return require(path.join(__dirname, "initializers", "db"))(conf)
    .then(function(Db) {
      conf.Db = Db;

      return require(path.join(__dirname, "initializers", "daos"))(conf);
    })
    .then(function(dao) {
      conf.DAO = dao;

      return require(path.join(__dirname, "initializers", "models"))(conf);
    })
    .then(function(models) {
      conf.models = models;

      return require(path.join(__dirname, "initializers", "controllers"))(conf);
    })
    .then(function(controllers) {
      conf.controllers = controllers;

      return require(path.join(__dirname, "initializers", "router"))(conf);
    })
    .catch(function(err) {
      console.log(err);
      throw err;
    });
};
