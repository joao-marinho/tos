exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "data_de_emissao VARCHAR(40) NOT NULL",
    "data_de_conclusao VARCHAR(40)",
    "valor INT NOT NULL",
    "status VARCHAR(40) NOT NULL",
    "cliente_id INT references users(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE ordens_de_servico(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE ordens_de_servico');
};
