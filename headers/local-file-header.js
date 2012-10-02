/*
 * LocalFileHeader class
 * takes a buffer, reads local file header from that
 */
var C = require('./../constants');

function LocalFileHeader(buf) {
    this._offset = 0;
    this._complete = false;

    // check that it's a localFileHeader
    if (buf.readUInt32LE(this._offset) != C.LOCAL_FILE_HEADER_SIG) {
        throw new Error('not a Local File Header');
    }

    // fixed length fields
    this.versionNeededToExtract = buf.readUInt16LE(this._offset += 4);
    this.generalPurposeBitFlag  = buf.readUInt16LE(this._offset += 2);
    this.compressionMethod      = buf.readUInt16LE(this._offset += 2);
    this.lastModificationTime   = buf.readUInt16LE(this._offset += 2);
    this.lastModificationDate   = buf.readUInt16LE(this._offset += 2);
    this.crc32                  = buf.readUInt32LE(this._offset += 2);
    this.compressedSize         = buf.readUInt32LE(this._offset += 4);
    this.uncompressedSize       = buf.readUInt32LE(this._offset += 4);
    this.fileNameLength         = buf.readUInt16LE(this._offset += 4);
    this.extraFieldLength       = buf.readUInt16LE(this._offset += 2);
    this._offset += 2;

    // variable length fields
    var rawFileName = buf.slice(this._offset, this._offset += this.fileNameLength);
    this.filename               = rawFileName.toString();
    this.extraField             = buf.slice(this._offset,
                                        this._offset += this.extraFieldLength);

    this.dataOffset = this._offset;
}

module.exports = LocalFileHeader;
