exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "descricao VARCHAR(256)",
    "preco INT NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS tipos_de_peca(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE tipos_de_peca');
};
