exports.up = function(pgm) {
  pgm.sql('ALTER TABLE ordens_de_servico ADD COLUMN equipe_id INT references equipes(id) NOT NULL;');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE ordens_de_servico DROP COLUMN equipe_id;');
};
