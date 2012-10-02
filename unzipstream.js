/*
 * Writable unzip stream
 */
var Stream  = require('stream').Stream,
    util    = require('util'),
    Parser  = require('./parser'),
    C       = require('./constants');

function UnzipStream() {
    var me = this;

    this.readable = false;
    this.writable = true;

    this.parser = new Parser();

    this.parser.on('entry', function (entry) {
        // just pass that through
        me.emit('entry', entry);
    });

    this._offset = 0;
}

util.inherits(UnzipStream, Stream);

/*
 * when data comes in, gets piped to Parser
 * appropriate actions on parse events
 */
UnzipStream.prototype.write = function (data) {
    if (data) {
        this.parser.parse(data);
    }

    return true;
}

UnzipStream.prototype.end = function (data) {
    if (data) {
        this.parser.parse(data);
    }

    this.emit('end');
}

module.exports = UnzipStream;
