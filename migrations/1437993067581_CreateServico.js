exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "descricao VARCHAR(256)",
    "ordem_de_servico_id INT references ordens_de_servico(id) NOT NULL",
    "tipo_de_servico_id INT references tipos_de_servico(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE servicos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE servicos');
};
