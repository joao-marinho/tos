var q = require("q");

module.exports = function(models) {
  var User = models.User;

  return {
    login: function(email, password, session) {
      return q.Promise(function(resolve, reject) {
        User.where({email: email, password: password}).then(function(users) {
          if(users.length != 1) {
            return reject();
          }
          session.isLogged = true;
          session.userId = users[0].id;
          resolve(users[0]);
        },function(err) {
          console.log(err);
          reject();
        }).done();
      });
    },
    logout: function(session) {
      return q.Promise(function(resolve, reject) {
        session.userId = null;
        session.isLogged = false;

        return resolve();
      });
    }
  }
}
