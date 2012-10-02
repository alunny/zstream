/*
 * FileEntry class
 * handles extraction; puts in shape for isaacs/fstream
 */
var zlib    = require('zlib'),
    util    = require('util'),
    Stream  = require('stream').Stream,
    C       = require('./constants');

function FileEntry(header, buffer, offset) {
    var offset = offset || 0;

    console.log(header.filename)

    this.compressedData = buffer.slice(offset, offset + header.compressedSize);
    this.header = header;

    this.path = header.filename;

    this.readable = true;
    this.writable = false;
}

util.inherits(FileEntry, Stream);

FileEntry.prototype.extract = function (cb) {
    var algo = C.COMPRESSION_METHODS[this.header.compressionMethod];

    if (algo == 'DEFLATE') {
        // TODO: call zlib.deflate, pass callback
        console.log('DEFLATE FOR ' + this.path);
    } else {
        throw new Error('unhandled compression method ' + algo);
    }
}

module.exports = FileEntry;
