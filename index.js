function log(message) {
	var self = log;
	return self.output(self.date() + message);
}

log.e = function(message) {
	return this.output(this.date() + '[error] ' + message);
}

log.i = function(message) {
	return this.output(this.date() + '[info] ' + message);
}

log.d = function(message) {
	return this.output(this.date() + '[debug] ' + message);
}

log.w = function(message) {
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

log.date = date;
log.output = output;

module.exports = log;
