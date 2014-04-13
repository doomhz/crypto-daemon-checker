
/**
 * Module dependencies.
 */

var restify = require('restify');
var fs = require('fs');
var environment = process.env.NODE_ENV || 'development';
var config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json', encoding='utf8'))[environment];
var CryptoCheck = require("./lib/crypto_check")

// Configure globals
GLOBAL.appConfig = function () {return config;};
GLOBAL.db = require('./models/index');

// Setup express
/*
var server = restify.createServer();
server.use(restify.bodyParser());
var port = process.env.PORT || 8000;
server.listen(process.env.PORT || 8000, function(){
  console.log("CryptoDaemon Checker is running on port %d in %s mode", port, environment);
});
*/

// Routes
//require('./routes/releases')(server);

var cryptoCheck = new CryptoCheck()
cryptoCheck.getLast("bitcoin", "bitcoin", function (err, lastRelease) {
  if (err) return console.error(err);
  console.log(lastRelease.name);
});

cryptoCheck.getLast("litecoin", "litecoin-project", function (err, lastRelease) {
  if (err) return console.error(err);
  console.log(lastRelease.name);
});

cryptoCheck.getLast("dogecoin", "dogecoin", function (err, lastRelease) {
  if (err) return console.error(err);
  console.log(lastRelease.name);
});
