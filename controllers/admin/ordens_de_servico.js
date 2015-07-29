module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;

  return {
    index: function(scope) {
      return OrdemDeServico.all().then(function(ordensDeServico) {
        console.log(ordensDeServico);
        scope.ordensDeServico = ordensDeServico;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var ordemDeServico = req.body.ordemDeServico;

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