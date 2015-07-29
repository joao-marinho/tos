module.exports = function(models) {
  var TipoDeServico = models.TipoDeServico;

  return {
    index: function(scope) {
      return TipoDeServico.all().then(function(tiposDeServico) {
        console.log(tiposDeServico);
        scope.tiposDeServico = tiposDeServico;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var tipoDeServico = req.body.tipoDeServico;

      console.log(tipoDeServico);

      return TipoDeServico.create(tipoDeServico).then(function(tipoDeServico) {
        res.redirect("/admin/tipos-de-servico/" + tipoDeServico.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return TipoDeServico.find(scope.params.id).then(function(tipoDeServico) {
        scope.tipoDeServico = tipoDeServico;
      });
    }

  };

};