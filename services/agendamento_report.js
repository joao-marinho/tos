var moment = require("moment");
var _ = require("lodash");

module.exports = function(models) {

  return {
    generate: function(gerente) {
      return gerente.agendamentos().then(function() {
        gerente.agendamentos.forEach(function(agendamento) {
          agendamento.horario = moment(agendamento.horario);
        });

        return {
          gerente: gerente,
          agendamentoTotal: gerente.agendamentos.length,
          agendamentosByMonth: agendamentosByMonth(gerente.agendamentos),
          agendamentosByWeek: agendamentosByWeek(gerente.agendamentos)
        };
      });
    }
  };
};

function agendamentosByMonth(agendamentos) {
  var agendamentosGroupedByMonth = _.groupBy(agendamentos, function(agendamento) {
      return agendamento.horario.month();
  });

  console.log("agendamentosGroupedByMonth", agendamentosGroupedByMonth);
  var agendamentosGroupedByMonthArr = _.map(agendamentosGroupedByMonth, function(value, key) {
    return {monthName: moment().month(Number(key)).format("MMMM"), month: key, agendamentos: value};
  });

  console.log("agendamentosGroupedByMonthArr", agendamentosGroupedByMonthArr);

  var agendamentosSorted = _.sortBy(agendamentosGroupedByMonthArr, function(value) {
    return value.month;
  });

  return agendamentosSorted;
}

function weekName(week) {
  week = Number(week);
  var startOfWeek = moment().week(week).startOf("week").format("DD/MMM");
  var endOfWeek = moment().week(week).endOf("week").format("DD/MMM");

  return startOfWeek + " - " + endOfWeek;
}

function agendamentosByWeek(agendamentos) {
  var agendamentosGroupedByWeek = _.groupBy(agendamentos, function(agendamento) {
      return agendamento.horario.week();
  });

  console.log("agendamentosGroupedByWeek", agendamentosGroupedByWeek);
  var agendamentosGroupedByWeekArr = _.map(agendamentosGroupedByWeek, function(value, key) {
    return {weekName: weekName(key), week: key, agendamentos: value};
  });

  console.log("agendamentosGroupedByWeekArr", agendamentosGroupedByWeekArr);

  var agendamentosSorted = _.sortBy(agendamentosGroupedByWeekArr, function(value) {
    return value.week;
  });

  return agendamentosSorted;
}
