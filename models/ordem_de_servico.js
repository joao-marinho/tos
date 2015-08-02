var q = require("q");

module.exports = function(daos, BasicModel) {
  var ordemDeServicoDAO = daos.OrdemDeServico;
  var OrdemDeServico = new BasicModel(ordemDeServicoDAO);

  OrdemDeServico.STATUS_INCOMPLETE = "Incompleto";
  OrdemDeServico.STATUS_CREATED = "Criado";
  OrdemDeServico.STATUS_AUTHORIZED = "Autorizado";
  OrdemDeServico.STATUS_DOING = "Fazendo";
  OrdemDeServico.STATUS_DONE = "Feito";
  OrdemDeServico.STATUS_PAID = "Pago";

  OrdemDeServico.prototype.authorize = function() {
    var self = this;

    // Here we should verify if is possible to authorize...
    self.status = OrdemDeServico.STATUS_AUTHORIZED;
    return self.save();
  }

  OrdemDeServico.prototype.doing = function() {
    var self = this;

    // Here we should verify if is possible to authorize...
    self.status = OrdemDeServico.STATUS_DOING;
    return self.save();
  }

  OrdemDeServico.prototype.done = function() {
    var self = this;

    // Here we should verify if is possible to authorize...
    self.status = OrdemDeServico.STATUS_DONE;
    return self.save();
  }

  OrdemDeServico.prototype.paid = function() {
    var self = this;

    // Here we should verify if is possible to authorize...
    self.status = OrdemDeServico.STATUS_PAID;
    return self.save();
  }

  return OrdemDeServico;
};
