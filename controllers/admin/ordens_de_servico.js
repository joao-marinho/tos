module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Cliente = models.Cliente;

  return {
    index: function(scope) {
      return OrdemDeServico.all().then(function(ordensDeServico) {
        console.log(ordensDeServico);
        scope.ordensDeServico = ordensDeServico;
      });
    },
    new: function(scope) {
      return Cliente.all().then(function(clientes) {
        scope.clientes = clientes;
      });
    },
    create: function(req, res, next) {
      var ordemDeServico = req.body.ordemDeServico;

      ordemDeServico.data_de_emissao = new Date();
      ordemDeServico.status = OrdemDeServico.STATUS_INCOMPLETE;

      console.log(ordemDeServico);

      return OrdemDeServico.create(ordemDeServico).then(function(ordemDeServico) {
        res.redirect("/admin/ordens-de-servico/" + ordemDeServico.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return OrdemDeServico.find(scope.params.id).then(function(ordemDeServico) {
        scope.ordemDeServico = ordemDeServico;
      });
    }

  };

};
