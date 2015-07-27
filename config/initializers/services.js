var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var q = require("q");

function getName(filename) {
  var extname = path.extname(filename);
  var basename = path.basename(filename, extname);
  return _.capitalize(_.camelCase(basename.toLowerCase()));
}

module.exports = function(conf) {
  return q.Promise(function(resolve, reject) {
    var services = {};
    var servicesFilesNames = fs.readdirSync(path.join(conf.appDir, "services"));

    servicesFilesNames.forEach(function(serviceFileName) {
      console.log(serviceFileName);
      var serviceName = getName(serviceFileName);
      services[serviceName] = require(path.join(conf.appDir, "services", serviceFileName))(conf.models);
    });

    resolve(services);
  });
};
