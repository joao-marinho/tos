var q = require("q");

module.exports = function(daos, BasicModel) {
  var equipeDao = daos.Equipe;
  var Equipe = new BasicModel(equipeDao);

  Equipe.findByTecnicosOrCreate = function(tecnico1, tecnico2) {
    var self = this;

    self._dao.where([
      {primeiro_tecnico_id: tecnico1.id, segundo_tecnico_id: tecnico2.id},
      {primeiro_tecnico_id: tecnico2.id, segundo_tecnico_id: tecnico1.id},
    ]).then(function(result) {
      console.log(result);
    });
  };

  return Equipe;
};
