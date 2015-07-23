module.exports = function(models) {
  var Tecnico = models.Tecnico;

  return {
    index: function(scope) {
      return Tecnico.all().then(function(tecnicos) {
        scope.tecnicos = tecnicos;
      });
    },
    new: function(scope) {

    },
    create: function(req, res, next) {
      var tecnico = req.body.tecnico;

      tecnico.password = generatePassword();

      return Tecnico.create(tecnico).then(function(tecnico) {
        res.redirect("/admin/tecnicos/" + tecnico.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return Tecnico.find(scope.params.id).then(function(tecnico) {
        scope.tecnico = tecnico;
      });
    }

  };

};

function generatePassword() {
  return "123123";
}
