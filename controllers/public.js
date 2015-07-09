console.log("controllers public");

module.exports = function(models) {
  var User = models.User;

  return {
    index: function(req, res) {
      console.log("on index public");
      res.render('public/index');
    }
  };

};
