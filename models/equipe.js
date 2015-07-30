var q = require("q");

module.exports = function(daos, BasicModel) {
  var equipeDao = daos.Equipe;
  var Equipe = new BasicModel(equipeDao);

  Equipe.findByTecnicosOrCreate = function(tecnico1_id, tecnico2_id, gerenteId) {
    var self = this;

    return self._dao.where([
      {primeiro_tecnico_id: tecnico1_id, segundo_tecnico_id: tecnico2_id},
      {primeiro_tecnico_id: tecnico2_id, segundo_tecnico_id: tecnico1_id},
    ]).then(function(result) {
      if(result.rows.length == 0) {
        return self.create({primeiro_tecnico_id: tecnico1_id, segundo_tecnico_id: tecnico2_id, gerente_id: gerenteId});
      }
      else {
        return new Equipe(result.rows[0]);
      }
    });
  };

  return Equipe;
};
