exports.up = function(pgm) {
	var fields = [
		"id SERIAL PRIMARY KEY",
		"horario TIMESTAMP NOT NULL",
		"cliente_id INT REFERENCES users(id) NOT NULL"
	];
	pgm.sql('CREATE TABLE agendamentos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
	pgm.sql('DROP TABLE agendamentos');
};
