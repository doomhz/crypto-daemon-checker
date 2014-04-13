(function() {
  var restify;

  restify = require("restify");

  module.exports = function(app) {
    return app.get("/releases/last", function(req, res, next) {
      if (err) {
        return next(new restify.ConflictError(err));
      }
      return res.send({});
    });
  };

}).call(this);
