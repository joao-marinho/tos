var q = require("q");

module.exports = function(models, services) {
  var Gerente = models.Gerente;
  var AgendamentoReport = services.AgendamentoReport;

  return {
    index: function(scope) {
    },
    agendamentos: function(scope) {
      scope.agendamentoReports = [];

      return Gerente.all().then(function(gerentes) {
        return q.all(gerentes.map(function(gerente) {
          return AgendamentoReport.generate(gerente).then(function(report) {
            console.log(report);
            scope.agendamentoReports.push(report);
          });
        }));
      });
    }
  };
};
