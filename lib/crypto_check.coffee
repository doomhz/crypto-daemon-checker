GitHubApi = require "github"

class CryptoCheck

  github: null

  constructor: ()->
    @github = new GitHubApi
      version: "3.0.0"
      debug: false
      protocol: "https"
      host: "api.github.com"
      #pathPrefix: "/api/v3"
      timeout: 5000

  getReleases: (user, repo, callback = ()->)->
    @github.repos.getTags {repo: repo, user: user}, callback

  getLast: (user, repo, callback = ()->)->
    @getReleases repo, user, (err, releases)->
      return callback err  if err
      callback null, releases[0]

exports = module.exports = CryptoCheck