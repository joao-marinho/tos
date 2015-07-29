var q = require("q");

module.exports = function(daos, BasicModel) {
  var tipoDePecaDAO = daos.TipoDePeca;
  var TipoDePeca = new BasicModel(tipoDePecaDAO);

  return TipoDePeca;
};
