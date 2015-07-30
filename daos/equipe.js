module.exports = function(db, BasicDao) {
  var fields = [
    "gerente_id",
    "primeiro_tecnico_id",
    "segundo_tecnico_id"
	];

  return new BasicDao({tableName: "equipes", fieldNames: fields, db: db});
};
