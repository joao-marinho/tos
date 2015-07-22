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

  app.get("/admin/", AuthenticationAdmin(controllers.Admin.Clientes.index));

  app.get("/admin/clientes", AuthenticationAdmin(controllers.Admin.Clientes.index));
  app.get("/admin/clientes/new", AuthenticationAdmin(controllers.Admin.Clientes.new));
  app.post("/admin/clientes", AuthenticationAdmin(controllers.Admin.Clientes.create));
  app.get("/admin/clientes/:id", AuthenticationAdmin(controllers.Admin.Clientes.show));

  app.get("/admin/gerentes", AuthenticationAdmin(controllers.Admin.Gerentes.index));
  app.get("/admin/gerentes/new", AuthenticationAdmin(controllers.Admin.Gerentes.new));
  app.post("/admin/gerentes", AuthenticationAdmin(controllers.Admin.Gerentes.create));
  app.get("/admin/gerentes/:id", AuthenticationAdmin(controllers.Admin.Gerentes.show));

  app.get("/admin/tecnicos", AuthenticationAdmin(controllers.Admin.Tecnicos.index));
  app.get("/admin/tecnicos/new", AuthenticationAdmin(controllers.Admin.Tecnicos.new));
  app.post("/admin/tecnicos", AuthenticationAdmin(controllers.Admin.Tecnicos.create));
  app.get("/admin/tecnicos/:id", AuthenticationAdmin(controllers.Admin.Tecnicos.show));

  /*
  *
  * Gerente
  *
  */

  //Sign in
  app.get("/gerente/sessions/new", controllers.Gerente.Sessions.new);
  app.post("/gerente/sessions", controllers.Gerente.Sessions.create);

  //Logoff
  app.get("/gerente/sessions/delete", controllers.Gerente.Sessions.delete);

  /*
  *
  * Atendente
  *
  */

  //Sign in
  app.get("/atendente/sessions/new", controllers.Atendente.Sessions.new);
  app.post("/atendente/sessions", controllers.Atendente.Sessions.create);

  //Logoff
  app.get("/atendente/sessions/delete", controllers.Atendente.Sessions.delete);

  /*
  *
  * Tecnico
  *
  */

  //Sign in
  app.get("/tecnico/sessions/new", controllers.Tecnico.Sessions.new);
  app.post("/tecnico/sessions", controllers.Tecnico.Sessions.create);

  //Logoff
  app.get("/tecnico/sessions/delete", controllers.Tecnico.Sessions.delete);
};
