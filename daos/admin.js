module.exports = function(db, BasicDao) {
  var fields = [
		"nome",
		"telefone",
		"email",
		"endereco",
		"cpf",
		"password"
	];

  return new BasicDao({tableName: "users", fieldNames: fields, db: db, discriminator: "admin"});
};
