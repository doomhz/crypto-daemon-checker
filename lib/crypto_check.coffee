GitHubApi = require "github"

class CryptoCheck

  github: null

  token: null

  constructor: (options = {})->
    @github = new GitHubApi options.github
    @token = options.github.token

  auth: ()->
    @github.authenticate
      type: "oauth"
      token: @token

  getReleases: (user, repo, callback = ()->)->
    @auth()
    @github.repos.getTags {user: repo, repo: user}, callback

  getLast: (user, repo, callback = ()->)->
    @auth()
    @getReleases repo, user, (err, releases = [])->
      console.error repo, user, err  if err
      return callback err  if err
      lastRelease = releases[0] or {}
      callback null, lastRelease

exports = module.exports = CryptoCheck