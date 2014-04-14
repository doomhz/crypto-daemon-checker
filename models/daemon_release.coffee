Emailer     = require "../lib/emailer"
CryptoCheck = require "../lib/crypto_check"
cryptoCheck = new CryptoCheck
  github: GLOBAL.appConfig().github

module.exports = (sequelize, DataTypes) ->

  DaemonRelease = sequelize.define "DaemonRelease",
      currency:
        type: DataTypes.STRING(10)
        allowNull: false
        unique: true
      user:
        type: DataTypes.STRING(20)
        allowNull: false
      repo:
        type: DataTypes.STRING(20)
        allowNull: false
      version:
        type: DataTypes.STRING(20)
        allowNull: false
      download_url:
        type: DataTypes.STRING(200)
        allowNull: false
    ,
      tableName: "daemon_releases"
      classMethods:

        updateLast: (currency, user, repo, callback = ()->)->
          DaemonRelease.findOrCreate({currency: currency}, {user: user, repo: repo}).complete (err, daemonRelease)->
            console.error err  if err
            return callback err  if err
            daemonRelease.fetchLast callback

      instanceMethods:

        fetchLast: (callback)->
          cryptoCheck.getLast @user, @repo, (err, lastRelease)=>
            return callback err  if err
            newRelease = if @version isnt lastRelease.name then true else false
            @version = lastRelease.name
            @download_url = lastRelease.tarball_url
            @save().complete callback
            @sendAlertByMail()  if newRelease

        sendAlertByMail: (callback = ()->)->
          data =
            daemon: @values
          options =
            to:
              email: GLOBAL.appConfig().emailer.to
            subject: "New #{@currency} daemon release available"
            template: "new_daemon_release_alert"
          emailer = new Emailer options, data
          emailer.send (err, result)->
            console.error err  if err

  DaemonRelease
