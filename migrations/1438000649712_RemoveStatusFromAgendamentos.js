exports.up = function(pgm) {
  pgm.sql('ALTER TABLE agendamentos DROP COLUMN status;');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE agendamentos ADD COLUMN status VARCHAR(40) NOT NULL;');
};
