exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "modelo VARCHAR(40) NOT NULL",
    "tipo VARCHAR(40) NOT NULL",
    "marca VARCHAR(40) NOT NULL"
  ];
  pgm.sql('CREATE TABLE tipos_de_veiculo(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE tipos_de_veiculo');
};
