exports.up = function(pgm) {
  pgm.sql('ALTER TABLE users ADD COLUMN especialidade VARCHAR(40);');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE users DROP COLUMN especialidade;');
};
