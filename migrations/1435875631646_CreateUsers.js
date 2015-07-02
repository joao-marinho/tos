exports.up = function(pgm) {
	pgm.sql('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) not null)');
};

exports.down = function(pgm) {
	pgm.sql('DROP TABLE users');
};
