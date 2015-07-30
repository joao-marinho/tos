var q = require("q");

module.exports = function(daos, BasicModel) {
  var ordemDeServicoDAO = daos.OrdemDeServico;
  var OrdemDeServico = new BasicModel(ordemDeServicoDAO);

  OrdemDeServico.STATUS_INCOMPLETE = "Incompleto";
  OrdemDeServico.STATUS_CREATED = "Criado";

  return OrdemDeServico;
};
