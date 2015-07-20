var pg = require("pg");
var q = require("q");

module.exports = function(conf) {
  return q.Promise(function(resolve, reject) {
    var Db = {
      query: function(queryString, queryValues) {
        var deferred = q.defer();
        var conString = process.env.DATABASE_URL;
        console.log(queryString);

        pg.connect(conString, function(err, client, done) {
          if(err) {
            return deferred.reject(err);
          }

          client.query(queryString, queryValues, function(err, result) {
            done();

            if(err) {
              return deferred.reject(err);
            }

            deferred.resolve(result);
          });
        });

        return deferred.promise;
      }
    };

    resolve(Db);
  });
}
