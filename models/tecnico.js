var q = require("q");

module.exports = function(daos, BasicModel) {
  var tecnicoDao = daos.Tecnico;
  var Tecnico = new BasicModel(tecnicoDao);

  return Tecnico;
};
