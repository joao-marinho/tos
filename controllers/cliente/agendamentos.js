var moment = require("moment");

module.exports = function(models) {
  var Agendamento = models.Agendamento;

  return {
    index: function(scope) {
      return Agendamento.all().then(function(agendamentos) {
        console.log(agendamentos);
        scope.agendamentos = agendamentos;
      });
    },
    create: function(req, res, next) {
      var agendamento = req.body.agendamento;

      console.log(agendamento);

      agendamento.horario = moment(agendamento.horario).toDate();;
      agendamento.cliente_id = req.currentUser.id;

      return Agendamento.create(agendamento).then(function(agendamento) {

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

    }
  };

};
