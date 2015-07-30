module.exports = function(models) {
  var Agendamento = models.Agendamento;

  return {
    index: function(scope) {
      var currentUser = scope.currentUser;
      console.log(currentUser);
      return Agendamento.where({gerente_id: currentUser.id}).then(function(agendamentos) {
        console.log(agendamentos);
        scope.agendamentos = agendamentos;
      });
    },

    show: function(scope) {
      var agendamentoId = scope.params.id;

      return Agendamento.find(agendamentoId).then(function(agendamento) {
        scope.agendamento = agendamento;
      });

    }
  };

};
