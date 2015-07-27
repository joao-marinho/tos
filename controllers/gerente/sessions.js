module.exports = function(models, services) {
  var Authentication = services.AuthenticationFor("Gerente");

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.gerente.email;
      var password = req.body.gerente.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(gerente) {
        res.redirect("/gerente");
      }, function() {
        // Authentication fail
        res.redirect("/gerente/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/gerente/sessions/new");
      });
    }
  };

};
