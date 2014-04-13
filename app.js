
/**
 * Module dependencies.
 */

var fs = require('fs');
var environment = process.env.NODE_ENV || 'development';
var config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json', encoding='utf8'))[environment];
var CryptoCheck = require("./lib/crypto_check")

// Configure globals
GLOBAL.appConfig = function () {return config;};
GLOBAL.db = require('./models/index');

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
