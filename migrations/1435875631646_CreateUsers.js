exports.up = function(pgm) {
	var fields = [
		"id SERIAL PRIMARY KEY",
		"nome VARCHAR(40) NOT NULL",
		"telefone VARCHAR(40) NOT NULL",
		"email VARCHAR(80) NOT NULL UNIQUE",
		"endereco VARCHAR(256) NOT NULL",
		"cpf VARCHAR(20) NOT NULL UNIQUE",
		"password CHAR(60) NOT NULL",
		"tipo CHAR(60) NOT NULL"
	];
	pgm.sql('CREATE TABLE users(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
	pgm.sql('DROP TABLE users');
};
