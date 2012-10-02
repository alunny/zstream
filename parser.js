// nodejs dependencies
var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    zlib = require('zlib');

// zstream dependencies
var C = require('./constants'),
    LocalFileHeader     = require('./headers/local-file-header'),
    CDFileHeader        = require('./headers/cd-file-header'),
    CDEndSignature      = require('./headers/cd-end-signature'),
    FileEntry           = require('./file-entry');

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
    'entry', 'cd-header', 'end-of-cd'
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
                        this.handleCDHeader(buf);

                    } else if (sig == C.END_CENTRAL_DIR_SIG) {
                        this.handleEndOfCD(buf);

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

Parser.prototype.handleCDHeader = function (buf) {
    var buf = buf.slice(this._pos),
        header  = new CDFileHeader(buf);

    this.emit('cd-header', header);

    this._pos += header.headerLength;
}

Parser.prototype.handleEndOfCD = function (buf) {
    var buf = buf.slice(this._pos),
        sig = new CDEndSignature(buf);

    this.emit('end-of-cd', sig);

    this._pos += sig.signatureLength;
}

module.exports = Parser;
