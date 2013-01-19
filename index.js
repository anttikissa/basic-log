
function date() {
	return new Date().toISOString().replace(/[TZ]/g, ' ');
}

function log(message) {
	console.log(date() + message);
}

log.e = function(message) {
	console.log(date() + '[error] ' + message);
}

log.i = function(message) {
	console.log(date() + '[info] ' + message);
}

log.d = function(message) {
	console.log(date() + '[info] ' + message);
}

module.exports = log;

