exports.up = function(pgm) {
  var tecnicos = [
    {
      nome: "'Tecnico 1'",
      telefone: "'1234-1234'",
      email: "'tecnico1@tos.com'",
      endereco: "'Rua da amargura'",
      cpf: "'111.111.111-13'",
      password: "'123123'",
      tipo: "'tecnico'"
    },
    {
      nome: "'Tecnico 2'",
      telefone: "'1234-1234'",
      email: "'tecnico2@tos.com'",
      endereco: "'Rua da amargura'",
      cpf: "'111.111.111-14'",
      password: "'123123'",
      tipo: "'tecnico'"
    },
    {
      nome: "'Tecnico 3'",
      telefone: "'1234-1234'",
      email: "'tecnico3@tos.com'",
      endereco: "'Rua da amargura'",
      cpf: "'111.111.111-15'",
      password: "'123123'",
      tipo: "'tecnico'"
    }
  ];

  tecnicos.forEach(function(tecnico) {
    pgm.sql('INSERT INTO users (nome, telefone, email, endereco, cpf, password, tipo) VALUES ({nome}, {telefone}, {email}, {endereco}, {cpf}, {password}, {tipo});', tecnico);
  });


};

exports.down = function(pgm) {

};
