var moment = require("moment");
var q = require("q");

module.exports = function(models) {
  var Agendamento = models.Agendamento;
  var TipoDeVeiculo = models.TipoDeVeiculo;
  var Gerente = models.Gerente;
  var Cliente = models.Cliente;

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
        return Cliente.all();
      })
      .then(function(clientes){
        scope.clientes = clientes;
      });
    },
    create: function(req, res, next) {
      var agendamento = req.body.agendamento;

      console.log(agendamento);

      agendamento.horario = moment(agendamento.horario).toDate();;

      return Gerente.getAvaliable().then(function(gerente) {
        console.log(gerente);
        agendamento.gerente_id = gerente.id;

        return  Agendamento.create(agendamento);
      }).then(function(agendamento) {
        res.redirect("/atendente/agendamentos/"+agendamento.id);
      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      var agendamentoId = scope.params.id;

      return Agendamento.find(agendamentoId).then(function(agendamento) {
        console.log("agendamento", agendamento);
        scope.agendamento = agendamento;
        return Gerente.find(agendamento.gerente_id);
      }).then(function(gerente){
        scope.gerente = gerente;
        console.log(scope.gerente);
        return TipoDeVeiculo.find(scope.agendamento.tipo_de_veiculo_id);
      }).then(function(tipo_de_veiculo){
        scope.tipo_de_veiculo = tipo_de_veiculo;
        return Cliente.find(scope.agendamento.cliente_id);
      }).then(function(cliente){
        scope.cliente = cliente;
      });
    },
    cancelar: function(req, res, next) {
      var agendamentoId = req.params.id;
      console.log(req.params);
      return Agendamento.find(agendamentoId).then(function(agendamento) {
        console.log(agendamento);
        agendamento.delete().then(function(result) {
          console.log("Alguma coisa "+result)
          res.redirect("/atendente/clientes/"+agendamento.cliente_id+"/agendamentos");
        });
      });
    }
  };

};
