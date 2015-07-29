var q = require("q");

module.exports = function(daos, BasicModel) {
  var ordemDeServicoDAO = daos.OrdemDeServico;
  var OrdemDeServico = new BasicModel(ordemDeServicoDAO);

  return OrdemDeServico;
};
