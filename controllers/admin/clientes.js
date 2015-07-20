module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    index: function(scope) {
      return Cliente.all().then(function(clientes) {
        scope.clientes = clientes;
      });
    },
    new: function(scope) {

    },
    create: function(scope) {
      var cliente = scope.params.cliente;

      return Cliente.create(cliente).then(function(cliente) {
        scope.cliente = cliente;
      });
    }
  };

};
