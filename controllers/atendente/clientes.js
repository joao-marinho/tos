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
    create: function(req, res, next) {
      var cliente = req.body.cliente;

      cliente.password = generatePassword();

      return Cliente.create(cliente).then(function(cliente) {
        res.redirect("/atendente/clientes/" + cliente.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return Cliente.find(scope.params.id).then(function(cliente) {
        scope.cliente = cliente;
      });
    }

  };

};

function generatePassword() {
  return "123123";
}
