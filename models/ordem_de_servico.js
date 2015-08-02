var q = require("q");

module.exports = function(daos, BasicModel) {
  var ordemDeServicoDAO = daos.OrdemDeServico;
  var OrdemDeServico = new BasicModel(ordemDeServicoDAO);

  OrdemDeServico.STATUS_INCOMPLETE = "Incompleto";
  OrdemDeServico.STATUS_CREATED = "Criado";
  OrdemDeServico.STATUS_AUTHORIZED = "Autorizado";

  OrdemDeServico.prototype.authorize = function() {
    var self = this;

    // Here we should verify if is possible to authorize...

    self.status = OrdemDeServico.STATUS_AUTHORIZED;
    return self.save();
  }

  return OrdemDeServico;
};
