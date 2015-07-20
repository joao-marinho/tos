var q = require("q");

module.exports = function(daos, BasicModel) {
  var clienteDao = daos.Cliente;
  var Cliente = new BasicModel(clienteDao);

  return Cliente;
};
