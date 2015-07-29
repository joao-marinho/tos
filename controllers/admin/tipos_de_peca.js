module.exports = function(models) {
  var TipoDePeca = models.TipoDePeca;

  return {
    index: function(scope) {
      return TipoDePeca.all().then(function(tiposDePeca) {
        console.log(tiposDePeca);
        scope.tiposDePeca = tiposDePeca;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var tipoDePeca = req.body.tipoDePeca;

      console.log(tipoDePeca);

      return TipoDePeca.create(tipoDePeca).then(function(tipoDePeca) {
        res.redirect("/admin/tipos-de-peca/" + tipoDePeca.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return TipoDePeca.find(scope.params.id).then(function(tipoDePeca) {
        scope.tipoDePeca = tipoDePeca;
      });
    }

  };

};
