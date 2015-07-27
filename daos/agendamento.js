module.exports = function(db, BasicDao) {
  var fields = [
		"horario",
		"cliente_id",
    "placa"
	];

  return new BasicDao({tableName: "agendamentos", fieldNames: fields, db: db});
};
