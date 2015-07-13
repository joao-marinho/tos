module.exports = function(models) {
  var User = models.User;

  return {
    index: function(scope) {
    },
    internal: function(scope) {
      scope.title =  "hue ";
    }
  };

};
