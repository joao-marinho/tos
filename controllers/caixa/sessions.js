module.exports = function(models, services) {
  var Authentication = services.Authentication_for("Caixa");

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.caixa.email;
      var password = req.body.caixa.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(caixa) {
        res.redirect("/caixa");
      }, function() {
        // Authentication fail
        res.redirect("/caixa/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/caixa/sessions/new");
      });
    }
  };

};
