var  router

module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;

  app.get("/", controllers.Public.index);
  app.get("/users", controllers.Users.index);

  app.get("/users/new", controllers.Users.new);
  app.post("/users/create", controllers.Users.create);
};
