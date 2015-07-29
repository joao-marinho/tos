exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "gerente_id INT references users(id) NOT NULL",
    "primeiro_tecnico_id INT references users(id) NOT NULL",
    "segundo_tecnico_id INT references users(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS equipes(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE equipes');
};
