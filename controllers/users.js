console.log("controllers users");

module.exports = function(models) {
  var User = models.User;

  return {
    index: function(req, res, next) {
      return User.all().then(function(users) {
        res.render('users/index', { users: users });
      });
    },
    new: function(req, res, next) {
      res.render('users/new', {extends: "layout.jade"});
    }
  };

};
