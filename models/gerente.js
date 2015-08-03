var q = require("q");

module.exports = function(daos, BasicModel, models) {
  var gerenteDao = daos.Gerente;
  var Gerente = new BasicModel(gerenteDao);

  Gerente.getAvaliable = function() {
    var self = this;
    return self.getOneRandom();
  };

  Gerente.prototype.ordensDeServico = function() {
    var self = this;
    var OrdemDeServico = models().OrdemDeServico;
    var Equipe = models().Equipe;

    return Equipe.where({gerente_id: self.id}).then(function(equipes) {
      if(equipes.length == 0) {
        return [];
      }
      var osQuery = equipes.map(function(equipe) {
        return {equipe_id: equipe.id};
      });
      return OrdemDeServico.where(osQuery);
    });
  };

  Gerente.prototype.agendamentos = function() {
    var self = this;
    var Agendamento = models().Agendamento;

    return Agendamento.where({gerente_id: self.id}).then(function(agendamentos) {
      self.agendamentos = agendamentos;
      return agendamentos;
    });
  };

  return Gerente;
};
