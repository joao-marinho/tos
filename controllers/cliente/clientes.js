module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var cliente = req.body.cliente;

      return Cliente.create(cliente).then(function(cliente) {
        res.redirect("/cliente/");
      }, function(err) {
        next(err);
      });
    }
  };

};
