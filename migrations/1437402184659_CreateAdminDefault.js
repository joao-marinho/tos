exports.up = function(pgm) {
  var admin = {
    nome: "'admin'",
    telefone: "'1234-1234'",
    email: "'admin@tos.com'",
    endereco: "'Rua da amargura'",
    cpf: "'111.111.111-11'",
    password: "'admin'",
    tipo: "'admin'"
  };
  pgm.sql('INSERT INTO users (nome, telefone, email, endereco, cpf, password, tipo) VALUES ({nome}, {telefone}, {email}, {endereco}, {cpf}, {password}, {tipo});', admin);

};

exports.down = function(pgm) {

};
