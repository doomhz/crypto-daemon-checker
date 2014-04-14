GitHubApi = require "github"

class CryptoCheck

  github: null

  constructor: (options = {})->
    @github = new GitHubApi options.github

  getReleases: (user, repo, callback = ()->)->
    @github.repos.getTags {repo: repo, user: user}, callback

  getLast: (user, repo, callback = ()->)->
    @getReleases repo, user, (err, releases)->
      return callback err  if err
      callback null, releases[0]

exports = module.exports = CryptoCheck