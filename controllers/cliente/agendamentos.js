var moment = require("moment");

module.exports = function(models) {
  var Agendamento = models.Agendamento;
  var TipoDeVeiculo = models.TipoDeVeiculo;
  var Gerente = models.Gerente;

  return {
    index: function(scope) {
      return Agendamento.all().then(function(agendamentos) {
        console.log(agendamentos);
        scope.agendamentos = agendamentos;

        return TipoDeVeiculo.all();
      })
      .then(function(tiposDeVeiculo) {
        console.log(tiposDeVeiculo);
        scope.tiposDeVeiculo = tiposDeVeiculo;
      });
    },
    create: function(req, res, next) {
      var agendamento = req.body.agendamento;

      console.log(agendamento);

      agendamento.horario = moment(agendamento.horario).toDate();;
      agendamento.cliente_id = req.currentUser.id;

      return Gerente.getAvaliable().then(function(gerente) {
        console.log(gerente);
        agendamento.gerente_id = gerente.id;

        return  Agendamento.create(agendamento);
      }).then(function(agendamento) {
        res.redirect("/cliente/agendamentos/"+agendamento.id);
      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      var agendamentoId = scope.params.id;

      return Agendamento.find(agendamentoId).then(function(agendamento) {
        console.log("agendamento", agendamento);
        scope.agendamento = agendamento;
      });

    },
    lista: function(scope) {
      var currentUser = scope.currentUser;
      console.log(currentUser);
      return Agendamento.where({cliente_id: currentUser.id}).then(function(agendamentos) {
        console.log(agendamentos);
        scope.agendamentos = agendamentos;
      });

    }
  };

};
