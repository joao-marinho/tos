var q = require("q");

module.exports = function(daos, BasicModel) {
  var adminDao = daos.Admin;
  var Admin = new BasicModel(adminDao);

  return Admin;
};
