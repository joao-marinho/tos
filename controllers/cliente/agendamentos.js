var moment = require("moment");
var q = require("q");

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
        return Gerente.find(agendamento.gerente_id);
      }).then(function(gerente){
        scope.gerente = gerente;
        console.log(scope.gerente);
        return TipoDeVeiculo.find(scope.agendamento.tipo_de_veiculo_id);
      }).then(function(tipo_de_veiculo){
        scope.tipo_de_veiculo = tipo_de_veiculo;
      });

    },
    lista: function(scope) {
      var currentUser = scope.currentUser;
      console.log(currentUser);
      return Agendamento.where({cliente_id: currentUser.id}).then(function(agendamentos) {
        console.log(agendamentos);

        var promises = agendamentos.map(function(agendamento) {
          return Gerente.find(agendamento.gerente_id).then(function(gerente) {
            agendamento.gerente = gerente;
            return agendamento;
          }).then(function(agendamento){
            return TipoDeVeiculo.find(agendamento.tipo_de_veiculo_id).then(function(tipo_de_veiculo){
              agendamento.tipo_de_veiculo = tipo_de_veiculo;
            });
          });
        });

        scope.agendamentos = agendamentos;
        return q.all(promises);
      });

    },
    cancelar: function(req, res, next) {
      var agendamentoId = req.params.id;
      console.log(agendamentoId);
      return Agendamento.find(agendamentoId).then(function(agendamento) {
        console.log(agendamento);
        agendamento.delete().then(function(result) {
          console.log("Alguma coisa "+result)
          res.redirect("/cliente/agendamentos");
        });
      });

    }
  };

};
