restify = require "restify"

module.exports = (app)->

  app.get "/releases/last", (req, res, next)->
    return next(new restify.ConflictError err)  if err
    res.send {}
