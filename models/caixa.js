var q = require("q");

module.exports = function(daos, BasicModel) {
  var caixaDao = daos.Caixa;
  var Caixa = new BasicModel(caixaDao);

  return Caixa;
};
