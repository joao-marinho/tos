var moment = require("moment");
var q = require("q");

module.exports = function(models) {
  var Agendamento = models.Agendamento;
  var TipoDeVeiculo = models.TipoDeVeiculo;
  var Gerente = models.Gerente;

  return {
    index: function(scope) {
      var clienteId = scope.params.id;
      return Agendamento.where({cliente_id: clienteId}).then(function(agendamentos) {
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
    }
  }
}