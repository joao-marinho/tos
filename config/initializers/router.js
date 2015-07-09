module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;

  app.use("/users", controllers.Users.index);
  app.use("/", controllers.Public.index);
};
