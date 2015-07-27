module.exports = function(models, services) {
  var Authentication = services.AuthenticationFor("Atendente");

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.atendente.email;
      var password = req.body.atendente.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(atendente) {
        res.redirect("/atendente");
      }, function() {
        // Authentication fail
        res.redirect("/atendente/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/atendente/sessions/new");
      });
    }
  };

};
