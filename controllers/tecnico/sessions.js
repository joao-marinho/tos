module.exports = function(models, services) {
  var Authentication = services.AuthenticationFor("Tecnico");

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.tecnico.email;
      var password = req.body.tecnico.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(tecnico) {
        res.redirect("/tecnico");
      }, function() {
        // Authentication fail
        res.redirect("/tecnico/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/tecnico/sessions/new");
      });
    }
  };

};
