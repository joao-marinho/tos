var q = require("q");

module.exports = function(daos, BasicModel) {
  var userDao = daos.User;
  var User = new BasicModel(userDao);
  
  return User;
};
