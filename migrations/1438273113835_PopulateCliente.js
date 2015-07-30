exports.up = function(pgm) {
  var cliente = {
    nome: "'André Amaral'",
    telefone: "'1234-1234'",
    email: "'cliente@tos.com'",
    endereco: "'Rua da amargura'",
    cpf: "'111.111.111-17'",
    password: "'123123'",
    tipo: "'cliente'"
  };
  pgm.sql('INSERT INTO users (nome, telefone, email, endereco, cpf, password, tipo) VALUES ({nome}, {telefone}, {email}, {endereco}, {cpf}, {password}, {tipo});', cliente);

};

exports.down = function(pgm) {

};
