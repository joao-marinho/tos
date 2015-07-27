var q = require("q");

module.exports = function(daos, BasicModel) {
  var tipoDeVeiculoDAO = daos.TipoDeVeiculo;
  var TipoDeVeiculo = new BasicModel(tipoDeVeiculoDAO);

  return TipoDeVeiculo;
};
