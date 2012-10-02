/*
 * CDFileHeader class (Central Directory)
 * takes a buffer, reads central directory file header from that
 */
var C = require('./../constants');

function CDFileHeader(buf) {
    this._offset = 0;
    this._complete = false;

    // check that it's a central directory file header
    if (buf.readUInt32LE(this._offset) != C.CENTRAL_DIR_FILE_HEADER_SIG) {
        throw new Error('not a Central Directory File Header');
    }

    // fixed length fields
    this.versionMadeBy          = {
        zip: buf.readUInt8(this._offset +=4),   // version of APPNOTE
        os:  buf.readUInt8(this._offset += 1)
    };
    this.versionNeededToExtract = buf.readUInt16LE(this._offset += 1);
    this.generalPurposeBitFlag  = buf.readUInt16LE(this._offset += 2);
    this.compressionMethod      = buf.readUInt16LE(this._offset += 2);
    this.lastModificationTime   = buf.readUInt16LE(this._offset += 2);
    this.lastModificationDate   = buf.readUInt16LE(this._offset += 2);
    this.crc32                  = buf.readUInt32LE(this._offset += 2);
    this.compressedSize         = buf.readUInt32LE(this._offset += 4);
    this.uncompressedSize       = buf.readUInt32LE(this._offset += 4);
    this.fileNameLength         = buf.readUInt16LE(this._offset += 4);
    this.extraFieldLength       = buf.readUInt16LE(this._offset += 2);
    this.fileCommentLength      = buf.readUInt16LE(this._offset += 2);
    this.fileStartDiskNumber    = buf.readUInt16LE(this._offset += 2);
    this.internalFileAttr       = buf.readUInt16LE(this._offset += 2);

    this.externalFileAttr       = buf.readUInt32LE(this._offset += 2);
    this.localFileHeaderOffset  = buf.readUInt32LE(this._offset += 4);
    this._offset += 4;

    // variable length fields
    var rawFileName = buf.slice(this._offset, this._offset += this.fileNameLength);
    this.filename               = rawFileName.toString();
    this.extraField             = buf.slice(this._offset,
                                        this._offset += this.extraFieldLength);
    this.fileComment            = buf.slice(this._offset,
                                        this._offset += this.fileCommentLength);

    this.headerLength = this._offset;
}

module.exports = CDFileHeader;
