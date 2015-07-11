function authentication(cb) {
  return function(req, res, next) {
    var session = req.session;

    if(session.isLogged) {
      return cb(req, res, next);
    }
    else {
      return res.redirect("/sessions/new");
    }
  };
}


module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;

  app.get("/", controllers.Public.index);
  app.get("/users", authentication(controllers.Users.index));

  app.get("/users/new", controllers.Users.new);
  app.post("/users/create", controllers.Users.create);

  app.get("/sessions/new", controllers.Sessions.new);
  app.post("/sessions/create", controllers.Sessions.create);
  app.get("/sessions/delete", controllers.Sessions.delete);
};
