var q = require("q");

module.exports = function(daos, BasicModel) {
  var equipeDao = daos.Equipe;
  var Equipe = new BasicModel(equipeDao);

  Equipe.findByTecnicosOrCreate = function(tecnico1, tecnico2, gerenteId) {
    var self = this;

    return self._dao.where([
      {primeiro_tecnico_id: tecnico1.id, segundo_tecnico_id: tecnico2.id},
      {primeiro_tecnico_id: tecnico2.id, segundo_tecnico_id: tecnico1.id},
    ]).then(function(result) {
      if(result.rows.length == 0) {
        return self.create({primeiro_tecnico_id: tecnico1.id, segundo_tecnico_id: tecnico2.id, gerente_id: gerenteId});
      }
      else {
        return new Equipe(result.rows[0]);
      }
    });
  };

  return Equipe;
};
