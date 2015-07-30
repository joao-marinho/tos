module.exports = function(models) {
  var OrdemDeServico = models.OrdemDeServico;
  var Cliente = models.Cliente;
  var Tecnico = models.Tecnico;
  var Equipe = models.Equipe;

  return {
    index: function(scope) {
      return OrdemDeServico.all().then(function(ordensDeServico) {
        console.log(ordensDeServico);
        scope.ordensDeServico = ordensDeServico;
      });
    },
    new: function(scope) {
      return Cliente.all().then(function(clientes) {
        scope.clientes = clientes;
        return Tecnico.all();
      }).then(function(tecnicos) {
        scope.tecnicos = tecnicos;
      });
    },
    create: function(req, res, next) {
      var ordemDeServico = req.body.ordemDeServico;
      var equipe = req.body.equipe;
      var currentUser = req.currentUser;

      ordemDeServico.data_de_emissao = new Date();
      ordemDeServico.status = OrdemDeServico.STATUS_INCOMPLETE;

      console.log(ordemDeServico);

      return Equipe.findByTecnicosOrCreate(equipe.primeiro_tecnico_id, equipe.segundo_tecnico_id, currentUser.id)
      .then(function(equipe) {
        ordemDeServico.equipe_id = equipe.id;

        return OrdemDeServico.create(ordemDeServico);
      })
      .then(function(ordemDeServico) {
        res.redirect("/admin/ordens-de-servico/" + ordemDeServico.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      return OrdemDeServico.find(scope.params.id).then(function(ordemDeServico) {
        scope.ordemDeServico = ordemDeServico;
      });
    }

  };

};
