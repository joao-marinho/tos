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
          res.redirect("/users");
        }
      });
    }
  };

};

function permittedParams(user) {

}
