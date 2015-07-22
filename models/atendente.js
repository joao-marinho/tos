var q = require("q");

module.exports = function(daos, BasicModel) {
  var atendenteDao = daos.Atendente;
  var Atendente = new BasicModel(atendenteDao);

  return Atendente;
};
