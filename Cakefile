fs = require "fs"
environment = process.env.NODE_ENV or 'development'
config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json', 'utf8'))[environment]
GLOBAL.appConfig = ()-> config
GLOBAL.db = require './models/index'

task "db:create_tables", "Drop and create all tables", ()->
  GLOBAL.db.sequelize.sync({force: true}).complete (err)->
    console.error err  if err

task "deamons:fetch_last", "Fetch last deamon releases from GitHub", ()->
  for currency, daemonOptions of GLOBAL.appConfig().daemons
    GLOBAL.db.DaemonRelease.updateLast currency, daemonOptions.user, daemonOptions.repo
  console.log new Date()