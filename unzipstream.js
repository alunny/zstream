/*
 * Writable unzip stream
 */
var Stream = require('stream').Stream,
    util = require('util'),
    constants = require('./constants');

function UnzipStream() {
    this.readable = false;
    this.writable = true;

    this._offset = 0;
    this._remainder = null; // unparsed part of buffer
}

util.inherits(UnzipStream, Stream);

UnzipStream.prototype.write = function (data) {
    if (data) {
        console.log(data);
    }
}

UnzipStream.prototype.end = function (data) {
    if (data) {
        console.log(data);
    }
    this.emit('end');
}

module.exports = UnzipStream;
