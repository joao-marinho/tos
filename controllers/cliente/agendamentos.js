module.exports = function(models) {
  var Agendamento = models.Agendamento;

  return {
    index: function(scope) {
      return Agendamento.all().then(function(agendamentos) {
        scope.agendamentos = agendamentos;
      });
    }
  };

};
