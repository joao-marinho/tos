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
    create: function(scope) {
      var user = scope.params.user;

      return User.create(user).then(function(user) {
        scope.user = user;
      });
    }
  };

};

function permittedParams(user) {

}
