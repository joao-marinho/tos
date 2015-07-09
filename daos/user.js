module.exports = function(db) {
  console.log("users");

  return {
    create: function(user) {
      return db.query("INSERT INTO users (name) VALUES ($1) RETURNING *;", [user.name]);
    },
    find: function(id) {
      return db.query("SELECT * FROM users WHERE id = $1 LIMIT 1;", [id]);
    },
    all: function() {
      return db.query("SELECT * FROM users;");
    }
  };
};
