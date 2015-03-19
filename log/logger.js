var logger = require('winston');
var config = require(__dirname + '/../config.js');
require('winston-pushbullet').Pushbullet;

function currentStamp () {
    var d = new Date();
    return '' +
    ("0" + d.getHours()).slice(-2)   + ":" + 
    ("0" + d.getMinutes()).slice(-2) + ":" + 
    ("0" + d.getSeconds()).slice(-2);
}

logger.setLevels({
    debug: 0,
    info:  1,
    silly: 2,
    warn:  3,
    error: 4,
});

logger.addColors({
    debug: 'green',
    info:  'cyan',
    silly: 'magenta',
    warn:  'yellow',
    error: 'red'
});

logger.remove(logger.transports.Console);

if (process.env['TRAVIS'] !== undefined)
logger.add(logger.transports.DailyRotateFile, {
    filename: './log/logs/littlist.',
    datePattern: 'yyyy-MM-dd.log',
});

logger.add(logger.transports.Console, {
    level: 'debug',
    colorize: true,
    timestamp: currentStamp 
});

logger.add(logger.transports.Pushbullet, {
    handleExceptions: true,
    level: 'error',
    apikey:  config.logger.pushbullet.apiKey, 
    title:   config.logger.pushbullet.title,
    devices: config.logger.pushbullet.devices
});

module.exports = logger;
