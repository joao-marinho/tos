var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var pg = require("pg");
var q = require("q");

require('dotenv').load();


var conf = {
  appDir: path.join(__dirname, ".."),
  DAO: {},
};


require(path.join(__dirname, "initializers", "db"))(conf)
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

    conf.models.User.create({name: "joey"}).then(function(user) {
      console.log(user);
    }, function(err) {
      console.log("err", err);
    });
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });

module.exports = conf;
