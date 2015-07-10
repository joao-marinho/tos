console.log("controllers users");

module.exports = function(models) {
  var User = models.User;

  return {
    index: function(scope) {
      return User.all().then(function(users) {
        scope.users = users;
      });
    },
    new: function(scope) {

    },
    create: function(req, res) {
      var user = req.body.user;
      // console.log("users from params", req.body.user);

      return User.create(user).then(function(user) {
        console.log(user);
        res.render("users/create", {user: user});
      });
    }
  };

};

function permittedParams(user) {

}
