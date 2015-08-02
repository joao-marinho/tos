module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var AuthenticationAdmin = conf.middleware.AuthenticationFor("Admin");
  var AuthenticationCliente = conf.middleware.AuthenticationFor("Cliente");
  var AuthenticationAtendente = conf.middleware.AuthenticationFor("Atendente");
  var AuthenticationGerente = conf.middleware.AuthenticationFor("Gerente");
  var AuthenticationCaixa = conf.middleware.AuthenticationFor("Caixa");

  app.get("/", controllers.Public.index);
  app.get("/internal", controllers.Public.internal);

  /*
  *
  * Cliente
  *
  */
  app.get("/cliente/", AuthenticationCliente(controllers.Cliente.Agendamentos.lista));
  app.get("/cliente/agendamentos", AuthenticationCliente(controllers.Cliente.Agendamentos.lista));
  app.get("/cliente/agendamentos/index", AuthenticationCliente(controllers.Cliente.Agendamentos.index));
  app.post("/cliente/agendamentos", AuthenticationCliente(controllers.Cliente.Agendamentos.create));
  app.get("/cliente/agendamentos/:id", AuthenticationCliente(controllers.Cliente.Agendamentos.show));
  app.get("/cliente/agendamentos/cancelar/:id", AuthenticationCliente(controllers.Cliente.Agendamentos.cancelar));


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

  app.get("/admin/tipos-de-veiculo", AuthenticationAdmin(controllers.Admin.TiposDeVeiculo.index));
  app.get("/admin/tipos-de-veiculo/new", AuthenticationAdmin(controllers.Admin.TiposDeVeiculo.new));
  app.post("/admin/tipos-de-veiculo", AuthenticationAdmin(controllers.Admin.TiposDeVeiculo.create));
  app.get("/admin/tipos-de-veiculo/:id", AuthenticationAdmin(controllers.Admin.TiposDeVeiculo.show));

  app.get("/admin/tipos-de-peca", AuthenticationAdmin(controllers.Admin.TiposDePeca.index));
  app.get("/admin/tipos-de-peca/new", AuthenticationAdmin(controllers.Admin.TiposDePeca.new));
  app.post("/admin/tipos-de-peca", AuthenticationAdmin(controllers.Admin.TiposDePeca.create));
  app.get("/admin/tipos-de-peca/:id", AuthenticationAdmin(controllers.Admin.TiposDePeca.show));

  app.get("/admin/tipos-de-servico", AuthenticationAdmin(controllers.Admin.TiposDeServico.index));
  app.get("/admin/tipos-de-servico/new", AuthenticationAdmin(controllers.Admin.TiposDeServico.new));
  app.post("/admin/tipos-de-servico", AuthenticationAdmin(controllers.Admin.TiposDeServico.create));
  app.get("/admin/tipos-de-servico/:id", AuthenticationAdmin(controllers.Admin.TiposDeServico.show));

  app.get("/admin/ordens-de-servico", AuthenticationAdmin(controllers.Admin.OrdensDeServico.index));
  app.get("/admin/ordens-de-servico/new", AuthenticationAdmin(controllers.Admin.OrdensDeServico.new));
  app.post("/admin/ordens-de-servico", AuthenticationAdmin(controllers.Admin.OrdensDeServico.create));
  app.get("/admin/ordens-de-servico/:id", AuthenticationAdmin(controllers.Admin.OrdensDeServico.show));
  
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

  app.get("/gerente/", AuthenticationGerente(controllers.Gerente.Agenda.index));
  app.get("/gerente/agenda", AuthenticationGerente(controllers.Gerente.Agenda.index));
  app.get("/gerente/agenda/:id", AuthenticationGerente(controllers.Gerente.Agenda.show));

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

  //Home
  app.get("/atendente/", AuthenticationAtendente(controllers.Atendente.Clientes.index));

  //Manipular Cliente
  app.get("/atendente/clientes", AuthenticationAtendente(controllers.Atendente.Clientes.index));
  app.get("/atendente/clientes/new", AuthenticationAtendente(controllers.Atendente.Clientes.new));
  app.post("/atendente/clientes", AuthenticationAtendente(controllers.Atendente.Clientes.create));
  app.get("/atendente/clientes/:id", AuthenticationAtendente(controllers.Atendente.Clientes.show));
  app.get("/atendente/clientes/:id/agendamentos", AuthenticationAtendente(controllers.Atendente.AgendamentosDoCliente.index));

  //Agendamentos
  app.get("/atendente/agendamentos/index", AuthenticationAtendente(controllers.Atendente.Agendamentos.index));
  app.post("/atendente/agendamentos", AuthenticationAtendente(controllers.Atendente.Agendamentos.create));
  app.get("/atendente/agendamentos/:id", AuthenticationAtendente(controllers.Atendente.Agendamentos.show));
  app.get("/atendente/agendamentos/cancelar/:id", AuthenticationAtendente(controllers.Atendente.Agendamentos.cancelar));

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

  app.get("/caixa/", AuthenticationCaixa(controllers.Caixa.OrdensDeServico.index));
  app.get("/caixa/ordens-de-servico", AuthenticationCaixa(controllers.Caixa.OrdensDeServico.index));
  app.get("/caixa/ordens-de-servico/:id", AuthenticationCaixa(controllers.Caixa.OrdensDeServico.show));
};
