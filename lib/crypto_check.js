(function() {
  var CryptoCheck, GitHubApi, exports;

  GitHubApi = require("github");

  CryptoCheck = (function() {
    CryptoCheck.prototype.github = null;

    function CryptoCheck(options) {
      if (options == null) {
        options = {};
      }
      this.github = new GitHubApi(options.github);
    }

    CryptoCheck.prototype.getReleases = function(user, repo, callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.github.repos.getTags({
        repo: repo,
        user: user
      }, callback);
    };

    CryptoCheck.prototype.getLast = function(user, repo, callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.getReleases(repo, user, function(err, releases) {
        if (err) {
          return callback(err);
        }
        return callback(null, releases[0]);
      });
    };

    return CryptoCheck;

  })();

  exports = module.exports = CryptoCheck;

}).call(this);
