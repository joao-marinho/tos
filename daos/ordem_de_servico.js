module.exports = function(db, BasicDao) {
  var fields = [
		"data_de_emissao",
		"data_de_conclusao",
    "valor",
    "status",
    "cliente_id"
	];

  return new BasicDao({tableName: "ordens_de_servico", fieldNames: fields, db: db});
};
