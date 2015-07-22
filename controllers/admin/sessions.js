module.exports = function(models, services) {
  var Authentication = services.Authentication_for("Admin");

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.admin.email;
      var password = req.body.admin.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(user) {
        res.redirect("/admin");
      }, function() {
        // Authentication fail
        res.redirect("/admin/sessions/new");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/admin/sessions/new");
      });
    }
  };

};

function permittedParams(user) {

}
