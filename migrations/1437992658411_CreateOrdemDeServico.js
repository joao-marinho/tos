exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "data_de_emissao TIMESTAMP NOT NULL",
    "data_de_conclusao TIMESTAMP",
    "valor INT NOT NULL",
    "status VARCHAR(40) NOT NULL",
    "cliente_id INT references users(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS ordens_de_servico(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE ordens_de_servico');
};
