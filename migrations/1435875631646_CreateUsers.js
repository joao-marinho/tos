exports.up = function(pgm) {
	var fields = [
		"id SERIAL PRIMARY KEY",
		"nome VARCHAR(40) not null",
		"telefone VARCHAR(40) not null",
		"email VARCHAR(80) not null",
		"endereco VARCHAR(256) not null",
		"cpf VARCHAR(20) not null",
		"password CHAR(60) not null"
	];

	pgm.sql('CREATE TABLE users(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
	pgm.sql('DROP TABLE users');
};
