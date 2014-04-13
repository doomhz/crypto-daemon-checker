fs = require "fs"
environment = process.env.NODE_ENV or 'development'
config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json', 'utf8'))[environment]
GLOBAL.appConfig = ()-> config
GLOBAL.db = require './models/index'
CryptoCheck = require "./lib/crypto_check"
cryptoCheck = new CryptoCheck

task "db:create_tables", "Create all tables", ()->
  GLOBAL.db.sequelize.sync().complete ()->

task "db:create_tables_force", "Drop and create all tables", ()->
  return console.log "Not in production!"  if environment is "production"
  GLOBAL.db.sequelize.query("DROP TABLE SequelizeMeta").complete ()->
    GLOBAL.db.sequelize.sync({force: true}).complete ()->

task "db:migrate", "Run pending database migrations", ()->
  migrator = GLOBAL.db.sequelize.getMigrator
    path:        "#{process.cwd()}/models/migrations"
    filesFilter: /\.coffee$/
    coffee: true
  migrator.migrate().success ()->
    console.log "Database migrations finished."

task "db:migrate_undo", "Undo database migrations", ()->
  migrator = GLOBAL.db.sequelize.getMigrator
    path:        "#{process.cwd()}/models/migrations"
    filesFilter: /\.coffee$/
    coffee: true
  migrator.migrate({method: "down"}).success ()->
    console.log "Database migrations reverted."

task "deamons:fetch_last", "Fetch last deamon releases from GitHub", ()->
  cryptoCheck.getLast "bitcoin", "bitcoin", (err, lastRelease) ->
    return console.error(err)  if err
    console.log lastRelease.name
    return

  cryptoCheck.getLast "litecoin", "litecoin-project", (err, lastRelease) ->
    return console.error(err)  if err
    console.log lastRelease.name
    return

  cryptoCheck.getLast "dogecoin", "dogecoin", (err, lastRelease) ->
    return console.error(err)  if err
    console.log lastRelease.name
    return
