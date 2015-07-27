exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "descricao VARCHAR(256)",
    "preco INT NOT NULL"
  ];
  pgm.sql('CREATE TABLE tipos_de_servico(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE tipos_de_servico');
};
