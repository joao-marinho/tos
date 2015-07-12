module.exports = function(models, services) {
  var User = models.User;
  var Authentication = services.Authentication;

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.user.email;
      var password = req.body.user.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(user) {
        res.redirect("/users");
      }, function() {
        // Authentication fail
        res.redirect("/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/sessions/new");
      });
    }
  };

};

function permittedParams(user) {

}
