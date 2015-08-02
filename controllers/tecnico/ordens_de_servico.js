module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Cliente = models.Cliente;
  var Tecnico = models.Tecnico;

  return {
    show: function(scope) {
      console.log(scope.params);
      return OrdemDeServico.find(scope.params.id).then(function(ordemDeServico) {
        console.log(ordemDeServico);
        scope.ordemDeServico = ordemDeServico;
        return Cliente.find(ordemDeServico.cliente_id);
      }).then(function(cliente){
        scope.cliente = cliente;
        console.log(scope.cliente);
      });
    }
  };

};
