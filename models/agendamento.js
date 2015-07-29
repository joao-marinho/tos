var q = require("q");

module.exports = function(daos, BasicModel) {
  var agendamentoDao = daos.Agendamento;
  var Agendamento = new BasicModel(agendamentoDao);

  return Agendamento;
};
