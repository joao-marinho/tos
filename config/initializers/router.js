module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var AuthenticationAdmin = conf.middleware.Authentication_for("Admin");

  app.get("/", controllers.Public.index);

  /*
  *
  * Cliente
  *
  */

  // Sign up
  app.get("/cliente/clientes/new", controllers.Cliente.Clientes.new);
  app.post("/cliente/clientes/create", controllers.Cliente.Clientes.create);

  //Sign in
  app.get("/cliente/sessions/new", controllers.Cliente.Sessions.new);
  app.post("/cliente/sessions", controllers.Cliente.Sessions.create);

  //Logoff
  app.get("/cliente/sessions/delete", controllers.Cliente.Sessions.delete);


  /*
  *
  * Admin
  *
  */

  // app.get("/admin/users/new", controllers.Users.new);
  app.get("/admin/sessions/new", controllers.Admin.Sessions.new);
  app.post("/admin/sessions/", controllers.Admin.Sessions.create);
  // app.post("admin/users/create", controllers.Users.create);
  app.get("/admin/users", AuthenticationAdmin(controllers.Admin.Clientes.index));

};
