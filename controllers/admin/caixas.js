module.exports = function(models) {
  var Caixa = models.Caixa;

  return {
    index: function(scope) {
      return Caixa.all().then(function(caixas) {
        scope.caixas = caixas;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var caixa = req.body.caixa;

      caixa.password = generatePassword();

      return Caixa.create(caixa).then(function(caixa) {
        res.redirect("/admin/caixas/" + caixa.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return Caixa.find(scope.params.id).then(function(caixa) {
        scope.caixa = caixa;
      });
    }

  };

};

function generatePassword() {
  return "123123";
}
