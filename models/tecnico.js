var q = require("q");

module.exports = function(daos, BasicModel, models) {
  var tecnicoDao = daos.Tecnico;
  var Tecnico = new BasicModel(tecnicoDao);

  Tecnico.prototype.ordensDeServico = function() {
    var self = this;
    var OrdemDeServico = models().OrdemDeServico;
    var Equipe = models().Equipe;

    return Equipe.where([{primeiro_tecnico_id: self.id}, {segundo_tecnico_id: self.id}]).then(function(equipes) {
      if(equipes.length == 0) {
        return [];
      }
      var osQuery = equipes.map(function(equipe) {
        return {equipe_id: equipe.id};
      });
      return OrdemDeServico.where(osQuery);
    });
  };

  return Tecnico;
};
