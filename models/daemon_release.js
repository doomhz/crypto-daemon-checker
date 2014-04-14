(function() {
  var CryptoCheck, Emailer, cryptoCheck;

  Emailer = require("../lib/emailer");

  CryptoCheck = require("../lib/crypto_check");

  cryptoCheck = new CryptoCheck({
    github: GLOBAL.appConfig().github
  });

  module.exports = function(sequelize, DataTypes) {
    var DaemonRelease;
    DaemonRelease = sequelize.define("DaemonRelease", {
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
      },
      user: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      repo: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      version: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      download_url: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    }, {
      tableName: "daemon_releases",
      classMethods: {
        updateLast: function(currency, user, repo, callback) {
          if (callback == null) {
            callback = function() {};
          }
          return DaemonRelease.findOrCreate({
            currency: currency
          }, {
            user: user,
            repo: repo
          }).complete(function(err, daemonRelease) {
            if (err) {
              console.error(err);
            }
            if (err) {
              return callback(err);
            }
            return daemonRelease.fetchLast(callback);
          });
        }
      },
      instanceMethods: {
        fetchLast: function(callback) {
          return cryptoCheck.getLast(this.user, this.repo, (function(_this) {
            return function(err, lastRelease) {
              var newRelease;
              if (err) {
                return callback(err);
              }
              newRelease = _this.version !== lastRelease.name ? true : false;
              _this.version = lastRelease.name;
              _this.download_url = lastRelease.tarball_url;
              _this.save().complete(callback);
              if (newRelease) {
                return _this.sendAlertByMail();
              }
            };
          })(this));
        },
        sendAlertByMail: function(callback) {
          var data, emailer, options;
          if (callback == null) {
            callback = function() {};
          }
          data = {
            daemon: this.values
          };
          options = {
            to: {
              email: GLOBAL.appConfig().emailer.to
            },
            subject: "New " + this.currency + " daemon release available",
            template: "new_daemon_release_alert"
          };
          emailer = new Emailer(options, data);
          return emailer.send(function(err, result) {
            if (err) {
              return console.error(err);
            }
          });
        }
      }
    });
    return DaemonRelease;
  };

}).call(this);
