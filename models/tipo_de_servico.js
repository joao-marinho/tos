var q = require("q");

module.exports = function(daos, BasicModel) {
  var tipoDeServicoDAO = daos.TipoDeServico;
  var TipoDeServico = new BasicModel(tipoDeServicoDAO);

  return TipoDeServico;
};