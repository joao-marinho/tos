module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var Authentication = conf.middleware.Authentication;

  app.get("/", controllers.Public.index);
  app.get("/users", Authentication(controllers.Users.index));

  app.get("/users/new", controllers.Users.new);
  app.post("/users/create", controllers.Users.create);

  app.get("/sessions/new", controllers.Sessions.new);
  app.get("/admin/sessions/new", controllers.Admin.Sessions.new);
  app.post("/sessions/create", controllers.Sessions.create);
  app.get("/sessions/delete", Authentication(controllers.Sessions.delete));
};
