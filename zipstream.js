/*
 * readable/writable zip stream
 */
var Stream  = require('stream').Stream,
    util    = require('util'),
    Parser  = require('./parser'),
    C       = require('./constants');

function ZipStream() {
    this.readable = true;
    this.writable = true;
}

util.inherits(ZipStream, Stream);

module.exports = ZipStream;
