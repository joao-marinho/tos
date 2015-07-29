exports.up = function(pgm) {
  var gerente = {
    nome: "'Gerente'",
    telefone: "'1234-1234'",
    email: "'gerente@tos.com'",
    endereco: "'Rua da amargura'",
    cpf: "'111.111.111-12'",
    password: "'123123'",
    tipo: "'gerente'"
  };
  pgm.sql('INSERT INTO users (nome, telefone, email, endereco, cpf, password, tipo) VALUES ({nome}, {telefone}, {email}, {endereco}, {cpf}, {password}, {tipo});', gerente);

};

exports.down = function(pgm) {

};
