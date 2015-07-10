module.exports = function(db) {
  console.log("users");
  var fields = [
		"nome",
		"telefone",
		"email",
		"endereco",
		"cpf",
		"password"
	];

  return {
    create: function(user) {
      var userObject = fields.map(function(fieldName) {
        return user[fieldName];
      });
      var values$ = "";

      for(var i = 1; i <= fields.length; i += 1) {
        values$ += "$"+i;
        if(i != fields.length) {
          values$ += ", ";
        }
      }
      return db.query("INSERT INTO users ("+ fields.join(", ") +") VALUES (" + values$ + ") RETURNING *;", userObject);
    },
    find: function(id) {
      return db.query("SELECT * FROM users WHERE id = $1 LIMIT 1;", [id]);
    },
    all: function() {
      return db.query("SELECT * FROM users;");
    }
  };
};
