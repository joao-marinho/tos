var q = require("q");

module.exports = function(daos, BasicModel) {
  var ordemDeServicoDAO = daos.OrdemDeServico;
  var OrdemDeServico = new BasicModel(ordemDeServicoDAO);

  OrdemDeServico.STATUS_INCOMPLETE = "Incompleto";

  return OrdemDeServico;
};
