exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "horario VARCHAR(40) NOT NULL",
    "placa VARCHAR(40) NOT NULL",
    "status VARCHAR(40) NOT NULL",
    "tipo_de_veiculo_id INT references tipos_de_veiculo(id) NOT NULL",
    "cliente_id INT references users(id) NOT NULL",
    "gerente_id INT references users(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS agendamentos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE agendamentos');
};
