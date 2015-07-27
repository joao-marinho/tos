exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "quantidade INT NOT NULL",
    "ordem_de_servico_id INT references ordens_de_servico(id) NOT NULL",
    "tipo_de_peca_id INT references tipos_de_peca(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE pecas(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE pecas');
};
