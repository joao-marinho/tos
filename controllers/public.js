console.log("controllers public");

module.exports = function(models) {
  var User = models.User;

  return {
    index: function(req, res) {
      console.log("on index public");
      res.render('public/index');
      // User.all().then(function(users) {
      //   res.render('users/index', { users: users });
      // }).catch(function(err) {
      //   console.log("err", err);
      // });
    }
  };

};
