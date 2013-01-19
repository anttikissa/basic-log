function Log(opts) {
	function log(message) {
		var self = log;
		return self.output(self.date() + message);
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

Log.prototype.e = function(message) {
	return this.output(this.date() + '[error] ' + message);
}

Log.prototype.i = function(message) {
	return this.output(this.date() + '[info] ' + message);
}

Log.prototype.d = function(message) {
	return this.output(this.date() + '[debug] ' + message);
}

Log.prototype.w = function(message) {
	return this.output(this.date() + '[warn] ' + message);
}

// Return date plus a space.
// Will be printed before each log line.
function date() {
	return new Date().toISOString().replace(/[TZ]/g, ' ');
}

// Outputs the message.
function output(message) {
	return console.log(message);
}

var log = new Log();

Log.prototype.date = date;
Log.prototype.output = output;

log.Log = Log;

module.exports = log;
