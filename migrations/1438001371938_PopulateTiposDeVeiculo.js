exports.up = function(pgm) {
  var tipoDeVeiculo = {
    modelo: "'Palio 2011'",
    tipo: "'carro'",
    marca: "'Fiat'"
  };
  pgm.sql('INSERT INTO tipos_de_veiculo(modelo, tipo, marca) VALUES ({modelo}, {tipo}, {marca});', tipoDeVeiculo);

};

exports.down = function(pgm) {

};
