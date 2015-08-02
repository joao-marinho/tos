var q = require("q");

module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Cliente = models.Cliente;
  var Tecnico = models.Tecnico;

  return {
    index: function(scope) {
      return OrdemDeServico.where({status: OrdemDeServico.STATUS_DONE}).then(function(ordensDeServico) {
        console.log(ordensDeServico);

        var promises = ordensDeServico.map(function(ordemDeServico) {
          return Cliente.find(ordemDeServico.cliente_id).then(function(cliente) {
            ordemDeServico.cliente = cliente;
            return ordemDeServico;
          });
        });

        scope.ordensDeServico = ordensDeServico;
        return q.all(promises);
      });
    },
    show: function(scope) {
      return OrdemDeServico.find(scope.params.id).then(function(ordemDeServico) {
        scope.ordemDeServico = ordemDeServico;
        return Cliente.find(ordemDeServico.cliente_id);
      }).then(function(cliente){
        scope.cliente = cliente;
        console.log(scope.cliente);
      });
    },
    pay: function(req, res, next) {
      var ordemDeServicoId = req.params.id;
      return OrdemDeServico.find(ordemDeServicoId).then(function(ordemDeServico) {
        return ordemDeServico.pay();
      }).then(function() {
        res.redirect("/caixa/ordens-de-servico/" + ordemDeServicoId);
      });
    }
  };

};
