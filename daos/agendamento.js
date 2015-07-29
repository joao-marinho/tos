module.exports = function(db, BasicDao) {
  var fields = [
		"horario",
		"cliente_id",
    "placa",
    "tipo_de_veiculo_id",
    "gerente_id"
	];

  return new BasicDao({tableName: "agendamentos", fieldNames: fields, db: db});
};
