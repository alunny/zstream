var C = require('./constants'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    zlib = require('zlib'),
    LocalFileHeader = require('./headers/local-file-header'),
    FileEntry = require('./file-entry');

var S = 0,
    P = C.P, // P of PK
    K = C.K, // K of PK
    states = {
        INITIAL:                    S++,
        LOCAL_FILE_HEADER:          S++,
        FILE_DATA:                  S++,
        DATA_DESCRIPTOR:            S++,
        CENTRAL_DIR_FILE_HEADER:    S++,
        END_CENTRAL_DIR:            S++
    }

function Parser() {
    this.state = 0; // INITIAL
    this._pos = 0;
}

Parser.Events = [
    'entry'
]

util.inherits(Parser, EventEmitter);

Parser.prototype.parse = function (buf) {
    while (this._pos < buf.length) {
        switch (this.state) {

            case states.INITIAL:
                if (buf[this._pos] == P && buf[this._pos+1] == K) {
                    var sig = buf.readUInt32LE(this._pos);

                    if (sig == C.LOCAL_FILE_HEADER_SIG) {
                        this.handleLocalFile(buf);

                    } else if (sig == C.CENTRAL_DIR_FILE_HEADER_SIG) {
                        this._pos += 4;

                    } else if (sig == C.END_CENTRAL_DIR_SIG) {
                        this._pos += 4;

                    } else {
                        // signature not recognized
                        // advance parser past "PK"
                        this._pos += 2;
                    }

                } else {
                    // padding data, ignored
                    this._pos++;
                }

                continue;

            default:
                this._pos++;
        }
    }

    this.emit('end');
}

Parser.prototype.handleLocalFile = function (buf) {
    var buf = buf.slice(this._pos),
        header =  new LocalFileHeader(buf),
        entry  =  new FileEntry(header, buf, header.dataOffset);

    this.emit('entry', entry);

    this._pos += header.dataOffset + header.compressedSize;
}

module.exports = Parser;
