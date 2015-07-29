var q = require("q");

module.exports = function(daos, BasicModel) {
  var gerenteDao = daos.Gerente;
  var Gerente = new BasicModel(gerenteDao);

  Gerente.getAvaliable = function() {
    var self = this;
    return self.getOneRandom();
  };

  return Gerente;
};
