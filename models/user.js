var q = require("q");

console.log("model user");

module.exports = function(daos, BasicModel) {
  var userDao = daos.User;
  var User = new BasicModel(userDao);

  return User;
};
