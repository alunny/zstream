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

    this.compressedData = buffer.slice(offset, offset + header.compressedSize);
    this.header = header;

    this.path = header.filename;
    this.props = {}

    this.readable = true;
    this.writable = false;
}

util.inherits(FileEntry, Stream);

// fake pipe for fun and profit
FileEntry.prototype.pipe = function (dest) {
    var algo = C.COMPRESSION_METHODS[this.header.compressionMethod],
        extractor = null;

    if (algo == 'DEFLATE') {
        // TODO: real stream!

        extractor = zlib.createInflateRaw();
        extractor.pipe(dest);

        extractor.end(this.compressedData);
    } else {
        throw new Error('unhandled compression method ' + algo);
    }
}

FileEntry.prototype.extract = function (cb) {
    var algo = C.COMPRESSION_METHODS[this.header.compressionMethod];

    if (algo == 'DEFLATE') {
        // TODO: call zlib.inflateRaw, pass callback
        console.log('DEFLATE FOR ' + this.path);
    } else {
        throw new Error('unhandled compression method ' + algo);
    }
}

// placeholders for now
FileEntry.prototype.pause   = function () {}
FileEntry.prototype.resume  = function () {}

module.exports = FileEntry;
