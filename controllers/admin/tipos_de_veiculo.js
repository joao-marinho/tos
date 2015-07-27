module.exports = function(models) {
  var TipoDeVeiculo = models.TipoDeVeiculo;

  return {
    index: function(scope) {
      return TipoDeVeiculo.all().then(function(tiposDeVeiculo) {
        scope.tiposDeVeiculo = tiposDeVeiculo;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var tipoDeVeiculo = req.body.tipoDeVeiculo;

      return TipoDeVeiculo.create(tipoDeVeiculo).then(function(tipoDeVeiculo) {
        res.redirect("/admin/tipos-de-veiculo/" + tipoDeVeiculo.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return TipoDeVeiculo.find(scope.params.id).then(function(tipoDeVeiculo) {
        scope.tipoDeVeiculo = tipoDeVeiculo;
      });
    }

  };

};
