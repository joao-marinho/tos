module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Cliente = models.Cliente;
  var Tecnico = models.Tecnico;

  return {
    show: function(scope) {
      console.log(scope.params);
      return OrdemDeServico.find(scope.params.id).then(function(ordemDeServico) {
        console.log(ordemDeServico);
        scope.ordemDeServico = ordemDeServico;
        return Cliente.find(ordemDeServico.cliente_id);
      }).then(function(cliente){
        scope.cliente = cliente;
        console.log(scope.cliente);
      });
    },
    doing: function(req, res, next) {
      var ordemDeServicoId = req.params.id;
      return OrdemDeServico.find(ordemDeServicoId).then(function(ordemDeServico) {
        return ordemDeServico.doing();
      }).then(function() {
        res.redirect("/tecnico/ordens-de-servico/" + ordemDeServicoId);
      });
    },
    done: function(req, res, next) {
      var ordemDeServicoId = req.params.id;
      return OrdemDeServico.find(ordemDeServicoId).then(function(ordemDeServico) {
        return ordemDeServico.done();
      }).then(function() {
        res.redirect("/tecnico/ordens-de-servico/" + ordemDeServicoId);
      });
    }
  };

};
