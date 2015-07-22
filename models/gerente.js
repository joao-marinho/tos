var q = require("q");

module.exports = function(daos, BasicModel) {
  var gerenteDao = daos.Gerente;
  var Gerente = new BasicModel(gerenteDao);

  return Gerente;
};
