# A simple logging library for Node.js

## Installing

	$ npm install basic-log

## Basic usage

	var log = require('basic-log');

	log('Hello!');

Output:

	2013-01-19 09:01:53.478 Hello!

`log` takes a single argument, converts it to string, and prints it to console.

## Other log levels:

	log.d('Hello!');
	log.i('Hello!');
	log.w('Hello!');
	log.e('Hello!');

Output:

	2013-01-19 09:03:17.671 [debug] Hello!
	2013-01-19 09:03:17.671 [info] Hello!
	2013-01-19 09:03:17.671 [warn] Hello!
	2013-01-19 09:03:17.671 [error] Hello!

## Changing the date format

By default, the date format is `YYYY-MM-DD hh:mm:ss:mmm` in UTC time.

Change it by setting `date`:

	log.date = function() {
		return new Date().getTime() + ' ';
	}

	log('Hello!');

Output:

	1358586277536 Hello!

Or get rid of the time altogether:

	log.date = function() {
		return '';
	}

	log('Hello!');

Output:

	Hello!

## Changing the output

By default, messages are written using `console.log`.

Change it by setting `output`:

	log.output = function(message) {
		console.err(message);
	}

	log('Hello!'); // prints to stderr

Or make it return a value if you like:

	log.output = function(message) {
		return message.toUpperCase();
	}

	console.log(log('Hello!'));

Output:

	HELLO!

## Creating new instances

If want to avoid changing the global `log`, you make create a new instance:

	var Log = require('basic-log').Log;
	var log = new Log(<custom functions>);

A typical use case would be to create your own log module and use it:

`lib/my-log.js`:

	var Log = require('basic-log').Log;

	module.exports = new Log({
		date: function() { return new Date().getTime() + ' '; }
	});


`my-app.js`:

	var log = require('./lib/my-log');

	log('Hi!');

