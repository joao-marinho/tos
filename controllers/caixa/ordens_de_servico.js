var q = require("q");

module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Cliente = models.Cliente;
  var Tecnico = models.Tecnico;

  return {
    index: function(scope) {
      return OrdemDeServico.all().then(function(ordensDeServico) {
        console.log(ordensDeServico);

        var promises = ordensDeServico.map(function(ordemDeServico) {
          return Cliente.find(ordemDeServico.cliente_id).then(function(cliente) {
            ordemDeServico.cliente = cliente;
            return ordemDeServico;
          });
        });

        scope.ordensDeServico = ordensDeServico;
        return q.all(promises);
      });
    },
    show: function(scope) {
      return OrdemDeServico.find(scope.params.id).then(function(ordemDeServico) {
        scope.ordemDeServico = ordemDeServico;
        return Cliente.find(ordemDeServico.cliente_id);
      }).then(function(cliente){
        scope.cliente = cliente;
        console.log(scope.cliente);
      });
    }
  };

};
