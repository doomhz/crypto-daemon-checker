(function() {
  var CryptoCheck, GitHubApi, exports;

  GitHubApi = require("github");

  CryptoCheck = (function() {
    CryptoCheck.prototype.github = null;

    CryptoCheck.prototype.token = null;

    function CryptoCheck(options) {
      if (options == null) {
        options = {};
      }
      this.github = new GitHubApi(options.github);
      this.token = options.github.token;
    }

    CryptoCheck.prototype.auth = function() {
      return this.github.authenticate({
        type: "oauth",
        token: this.token
      });
    };

    CryptoCheck.prototype.getReleases = function(user, repo, callback) {
      if (callback == null) {
        callback = function() {};
      }
      this.auth();
      return this.github.repos.getTags({
        user: repo,
        repo: user
      }, callback);
    };

    CryptoCheck.prototype.getLast = function(user, repo, callback) {
      if (callback == null) {
        callback = function() {};
      }
      this.auth();
      return this.getReleases(repo, user, function(err, releases) {
        var lastRelease;
        if (releases == null) {
          releases = [];
        }
        if (err) {
          console.error(repo, user, err);
        }
        if (err) {
          return callback(err);
        }
        lastRelease = releases[0] || {};
        return callback(null, lastRelease);
      });
    };

    return CryptoCheck;

  })();

  exports = module.exports = CryptoCheck;

}).call(this);
