module.exports = function(models) {
  var Agendamento = models.Agendamento;

  return {
    index: function(scope) {
      return Agendamento.all().then(function(agendamentos) {
        scope.agendamentos = agendamentos;
      });
    },
    create: function(req, res, next) {
      var agendamento = req.body.agendamento;
      console.log(agendamento);

      agendamento.cliente_id = req.currentUser.id;

      return Agendamento.create(agendamento).then(function(agendamento) {
        res.redirect("/cliente/agendamentos/");

      }, function(err) {
        next(err);
      });
    }
  };

};
