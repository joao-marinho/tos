module.exports = function(db, BasicDao) {
  var fields = [
		"horario",
		"cliente_id"
	];

  return new BasicDao({tableName: "agendamentos", fieldNames: fields, db: db});
};
