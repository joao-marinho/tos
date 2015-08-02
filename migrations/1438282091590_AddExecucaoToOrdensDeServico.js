exports.up = function(pgm) {
  pgm.sql('ALTER TABLE ordens_de_servico ADD COLUMN inicio_da_execucao timestamp;');
  pgm.sql('ALTER TABLE ordens_de_servico ADD COLUMN fim_da_execucao timestamp;');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE ordens_de_servico DROP COLUMN inicio_da_execucao;');
  pgm.sql('ALTER TABLE ordens_de_servico DROP COLUMN fim_da_execucao;');
};
