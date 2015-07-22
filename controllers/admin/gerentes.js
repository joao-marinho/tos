module.exports = function(models) {
  var Gerente = models.Gerente;

  return {
    index: function(scope) {
      return Gerente.all().then(function(gerentes) {
        scope.gerentes = gerentes;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var gerente = req.body.gerente;

      gerente.password = generatePassword();

      return Gerente.create(gerente).then(function(gerente) {
        res.redirect("/admin/gerentes/" + gerente.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return Gerente.find(scope.params.id).then(function(gerente) {
        scope.gerente = gerente;
      });
    }

  };

};

function generatePassword() {
  return "123123";
}
