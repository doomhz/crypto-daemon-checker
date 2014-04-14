Crypto Daemon Checker
=====================

This tool helps you to keep track of the new crypto wallet deamons releases like `bitcoind`, `litecoind`, `dogecoind`, `ppcoin`...


Installation
------------

The easiest way is to deploy an EC2 Micro machine for free (free tier `http://aws.amazon.com/free/`).
Install `nodejs`, `npm`, `git-core` and `mysql-server` on it.

Clone the project and hit a `npm install`.

Install the `coffee-script` package globally for the `cake` tasks to work:
`sudo npm install -g coffee-script`

Make a copy of the `config.json.sample` to `config.json` and edit the database connection details and the email sender transport method. The easiest thig is to use the Amazon SES (http://aws.amazon.com/ses/) or Google Mail for sending mail alerts.

Create the MySQL database that you configured in the configuration file.

Run `cake db:create_tables` first time to create the DB schema.

Run `sudo crontab -e` to setup a cronjob that verifies if there are new releases every hour:
`0 * * * * cd /home/ubuntu/crypto-daemon-checker/; sudo NODE_ENV=production cake deamons:fetch_last >> /home/ubuntu/deamon_fetcher.log 2>&1`


Configuration
-------------

Please don't forget to set up your email address where you want the alerts to be delivered: https://github.com/doomhz/crypto-daemon-checker/blob/master/config.json.sample#L21 .
You can add as many daemons to be checked as you want: https://github.com/doomhz/crypto-daemon-checker/blob/master/config.json.sample#L33 .


TODO
----

* Add SMS alerts through Twillio
* Add HipChat alerts
* Add Trello alerts/cards
* Add SQLite storage for Sequelize
