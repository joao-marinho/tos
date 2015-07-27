module.exports = function(db, BasicDao) {
  var fields = [
		"modelo",
		"tipo",
		"marca"
	];

  return new BasicDao({tableName: "tipos_de_veiculo", fieldNames: fields, db: db});
};
