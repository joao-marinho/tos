exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "cliente_id INT references users(id) NOT NULL",
    "primeiro_tecnico_id INT references users(id) NOT NULL",
    "segundo_tecnico_id INT references users(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE equipes(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE equipes');
};
