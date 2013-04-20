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
	
	return log;
}

Log.prototype = Object.create(Function.prototype);

Log.prototype.e = function() {
	return this.output(this.date() + '[error] ' + this.fmt.apply(this, arguments));
}

Log.prototype.i = function() {
	return this.output(this.date() + '[info] ' + this.fmt.apply(this, arguments));
}

Log.prototype.d = function() {
	return this.output(this.date() + '[debug] ' + this.fmt.apply(this, arguments));
}

Log.prototype.w = function() {
	return this.output(this.date() + '[warn] ' + this.fmt.apply(this, arguments));
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

