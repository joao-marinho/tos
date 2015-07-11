module.exports = function(models) {
  var User = models.User;

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.user.email;
      var password = req.body.user.password;

      return User.where({email: email, password: password}).then(function(users) {
        // Authentication fail
        if(users.length !== 1) {
          res.redirect("/sessions/new");
        }
        else {
          req.session.isLogged = true;
          req.session.userId = users[0].id;
          res.redirect("/users");
        }
      });
    },
    delete: function(req, res, next) {
      req.session.isLogged = null;
      req.session.userId = null;

      res.redirect("/sessions/new");
    }
  };

};

function permittedParams(user) {

}
