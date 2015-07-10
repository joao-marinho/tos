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
    }
    // create: function(scope) {
    //   return User.create({nome: "Joao", email: "joao@joao.com"}).then(function(user) {
    //     scope.user = user;
    //   });
    // }
  };

};
