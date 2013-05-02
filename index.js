util = require('util');

function Log(opts) {
	function log() {
		var self = log;
		return self.output(self.date() + self.fmt.apply(self, arguments));
	}
	if (opts) {
		for (var key in opts) {
			if (opts.hasOwnProperty(key)) {
				log[key] = opts[key];
			}
		}
	}

	log.__proto__ = this.__proto__;

	log.setLevel('all', true);

	return log;
}

levels = {
	none: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	all: 4
}

Log.prototype = Object.create(Function.prototype);

Log.prototype.e = function() {
	if (this.level >= levels.error)
		return this.output(this.date() + '[error] ' + this.fmt.apply(this, arguments));
}

Log.prototype.w = function() {
	if (this.level >= levels.warn)
		return this.output(this.date() + '[warn] ' + this.fmt.apply(this, arguments));
}

Log.prototype.i = function() {
	if (this.level >= levels.info)
		return this.output(this.date() + '[info] ' + this.fmt.apply(this, arguments));
}

Log.prototype.d = function() {
	if (this.level >= levels.debug)
		return this.output(this.date() + '[debug] ' + this.fmt.apply(this, arguments));
}

// Set log level to any of 'none', 'error', 'warn', 'info', 'debug', each
// successive level always including the output of all of the levels preceding
// it.
//
// log(message) always prints its output. You must use the log.{e,w,i,d}
// variants if you need to silence one or more log levels.
//
// Default level is 'debug', which prints all messages. 'all' is an alias for
// 'debug'.
Log.prototype.setLevel = function(levelName, silent) {
	for (level in levels) {
		if (level === levelName) {
			this.level = levels[level];
			if (!silent) {
				this("Log level set to '" + level + "'");
			}
			return;
		}
	}

	this.e("Unknown log level '" + levelName + "'");
}

// Return date plus a space.
// Will be printed before each log line.
function date() {
	return new Date().toISOString().replace(/[TZ]/g, ' ');
}

// Output the message.
function output(message) {
	return console.log(message);
}

// Convert arguments to a string, like console.log does.
function fmt() {
	result = [];
	for (var i = 0; i < arguments.length; i++) {
		var type = typeof arguments[i];
		if (type == 'string') {
			result.push(arguments[i]);
		} else if (type == 'function') {
			result.push(arguments[i].toString());
		} else {
			result.push(util.inspect(arguments[i]));
		}
	}
	return result.join(' ');
}

Log.prototype.date = date;
Log.prototype.output = output;
Log.prototype.fmt = fmt;

var log = new Log();
log.Log = Log;

module.exports = log;

