module.exports = function(models, services) {
  var Authentication = services.Authentication_for("Cliente");

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.cliente.email;
      var password = req.body.cliente.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(cliente) {
        res.redirect("/cliente");
      }, function() {
        // Authentication fail
        res.redirect("/cliente/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/cliente/sessions/new");
      });
    }
  };

};
