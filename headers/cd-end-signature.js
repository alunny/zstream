/*
 * CDEndSignature class (Central Directory)
 * takes a buffer, reads central directory end signature from that
 */
var C = require('./../constants');

function CDEndSignature(buf) {
    this._offset = 0;
    this._complete = false;

    // check that it's a central directory file header
    if (buf.readUInt32LE(this._offset) != C.END_CENTRAL_DIR_SIG) {
        throw new Error('not a Central Directory File Header');
    }

    // fixed length fields
    this.diskNumber         = buf.readUInt16LE(this._offset += 4);
    this.cdStartDisk        = buf.readUInt16LE(this._offset += 2);
    this.CDRecordsOnDisk    = buf.readUInt16LE(this._offset += 2);
    this.totalCDRecord      = buf.readUInt16LE(this._offset += 2);
    this.CDSize             = buf.readUInt32LE(this._offset += 2);
    this.CDOffset           = buf.readUInt32LE(this._offset += 4);
    this.commentLength      = buf.readUInt16LE(this._offset += 4);

    // variable length fields
    this.comment = buf.slice(this._offset, this._offset + this.commentLength);

    this.signatureLength = this._offset + this.commentLength;
}

module.exports = CDEndSignature;
