var q = require("q");

console.log("model user");

module.exports = function(daos) {
  var userDao = daos.User;

  function User(user) {
    this.name = user.name;
    this.id = user.id;
  }

  User.create = function(user) {
    return userDao.create(user).
      then(function(result) {
        user = result.rows[0];

        return new User(user);
      });
  };

  User.find = function(id) {
    return userDao.find(id).
      then(function(result) {
        user = result.rows[0];

        return new User(user);
      });
  }

  User.all = function() {
    return userDao.all().
      then(function(result) {
        return result.rows.map(function(user) {
          return new User(user);
        });
      });
  }

  return User;
};
