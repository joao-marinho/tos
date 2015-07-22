module.exports = function(models) {
  var Atendente = models.Atendente;

  return {
    index: function(scope) {
      return Atendente.all().then(function(atendentes) {
        scope.atendentes = atendentes;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var atendente = req.body.atendente;

      atendente.password = generatePassword();

      return Atendente.create(atendente).then(function(atendente) {
        res.redirect("/admin/atendentes/" + atendente.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return Atendente.find(scope.params.id).then(function(atendente) {
        scope.atendente = atendente;
      });
    }

  };

};

function generatePassword() {
  return "123123";
}
