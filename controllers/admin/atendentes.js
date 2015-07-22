module.exports = function(models) {
  var Atendentes = models.Atendentes;

  return {
    index: function(scope) {
      return Atendentes.all().then(function(atendentes) {
        scope.atendentes = atendentes;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var atendente = req.body.atendente;

      atendente.password = generatePassword();

      return Atendentes.create(atendente).then(function(atendente) {
        res.redirect("/admin/atendentes/" + atendente.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return Atendentes.find(scope.params.id).then(function(atendente) {
        scope.atendente = atendente;
      });
    }

  };

};

function generatePassword() {
  return "123123";
}
