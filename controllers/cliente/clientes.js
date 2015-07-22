module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    new: function(scope) {

    },
    create: function(scope) {
      var cliente = scope.body.cliente;

      return Cliente.create(cliente).then(function(cliente) {
        scope.cliente = cliente;
      });
    }
  };

};
