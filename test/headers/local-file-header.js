var format = require('util').format,
    fs = require('fs'),
    LocalFileHeader = require('./../../headers/local-file-header.js'),
    simpleFlatPath = format('%s/../zipfiles/simple-flat.zip', __dirname),
    simpleFlatZip = fs.readFileSync(simpleFlatPath),
    simpleLocalFile = new LocalFileHeader(simpleFlatZip);

exports['simple-flat.zip - first entry'] = {
    'version needed to extract': function (test) {
        test.equal(simpleLocalFile.versionNeededToExtract, 20);
        test.done();
    },

    'general purpose bit flag': function (test) {
        test.equal(simpleLocalFile.generalPurposeBitFlag, 0);
        test.done();
    },

    'compression method': function (test) {
        test.equal(simpleLocalFile.compressionMethod, 8);
        test.done();
    },

    'last modification time': function (test) {
        test.equal(simpleLocalFile.lastModificationTime, 31822);
        test.done();
    },

    'last modification date': function (test) {
        test.equal(simpleLocalFile.lastModificationDate, 16643);
        test.done();
    },

    'crc32': function (test) {
        test.equal(simpleLocalFile.crc32, 1929635290);
        test.done();
    },

    'compressed size': function (test) {
        test.equal(simpleLocalFile.compressedSize, 212);
        test.done();
    },

    'uncompressed size': function (test) {
        test.equal(simpleLocalFile.uncompressedSize, 377);
        test.done();
    },

    'file name length': function (test) {
        test.equal(simpleLocalFile.fileNameLength, 10);
        test.done();
    },

    'extra field length': function (test) {
        test.equal(simpleLocalFile.extraFieldLength, 28);
        test.done();
    },

    'file name': function (test) {
        test.equal(simpleLocalFile.filename, 'config.xml');
        test.done();
    },

    'extra field': function (test) {
        var expectedBuffer = new Buffer([
            0x55, 0x54, 0x09, 0x00, 0x03, 0xf3, 0x51, 0x1c, 0x50, 0xe1, 0x51,
            0x1c, 0x50, 0x75, 0x78, 0x0b, 0x00, 0x01, 0x04, 0xf5, 0x01, 0x00,
            0x00, 0x04, 0x14, 0x00, 0x00, 0x00
        ]);

        // using toString to compare
        test.equal(simpleLocalFile.extraField.toString('base64'),
                    expectedBuffer.toString('base64'));
        test.done();
    },

    'data offset': function (test) {
        test.equal(simpleLocalFile.dataOffset, 68);
        test.done();
    }
}
