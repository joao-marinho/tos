module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Tecnico = models.Tecnico;
  var Gerente = models.Gerente;
  var Cliente = models.Cliente;

  return {
    index: function(scope) {
      var tecnico = scope.currentUser;
      return tecnico.ordensDeServico().then(function(ordensDeServico) {
        console.log(ordensDeServico);
        scope.ordensDeServico = ordensDeServico;
      });
    }
  };

};
