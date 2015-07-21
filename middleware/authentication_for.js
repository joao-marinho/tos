module.exports = function(conf) {

  return function(modelName) {
    var Model = conf.models[modelName];

    return function(cb) {
      return function(req, res, next) {
        var session = req.session;

        if (session.isLogged) {
          Model.find(session.userId).then(function(user) {
            req.currentUser = user;
            return cb(req, res, next);
          }, function() {
            return res.redirect("/sessions/new");
          }).catch(function(err) {
            next(err);
          });
        } else {
          return res.redirect("/sessions/new");
        }
      };
    }
  }
};
