module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var AuthenticationAdmin = conf.middleware.Authentication_for("Admin");

  app.get("/", controllers.Public.index);
  app.get("/internal", controllers.Public.internal);

  /*
  *
  * Cliente
  *
  */

  // Sign up
  app.get("/cliente/clientes/new", controllers.Cliente.Clientes.new);
  app.post("/cliente/clientes", controllers.Cliente.Clientes.create);

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

  app.get("/admin/sessions/new", controllers.Admin.Sessions.new);
  app.post("/admin/sessions/", controllers.Admin.Sessions.create);
  
  //Logoff
  app.get("/admin/sessions/delete", controllers.Admin.Sessions.delete);

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

  app.get("/admin/caixas", AuthenticationAdmin(controllers.Admin.Caixas.index));
  app.get("/admin/caixas/new", AuthenticationAdmin(controllers.Admin.Caixas.new));
  app.post("/admin/caixas", AuthenticationAdmin(controllers.Admin.Caixas.create));
  app.get("/admin/caixas/:id", AuthenticationAdmin(controllers.Admin.Caixas.show));

  app.get("/admin/atendentes", AuthenticationAdmin(controllers.Admin.Atendentes.index));
  app.get("/admin/atendentes/new", AuthenticationAdmin(controllers.Admin.Atendentes.new));
  app.post("/admin/atendentes", AuthenticationAdmin(controllers.Admin.Atendentes.create));
  app.get("/admin/atendentes/:id", AuthenticationAdmin(controllers.Admin.Atendentes.show));


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

  /*
  *
  * Caixa
  *
  */

  //Sign in
  app.get("/caixa/sessions/new", controllers.Caixa.Sessions.new);
  app.post("/caixa/sessions", controllers.Caixa.Sessions.create);

  //Logoff
  app.get("/caixa/sessions/delete", controllers.Caixa.Sessions.delete);

};
