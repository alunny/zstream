var format  = require('util').format,
    fs      = require('fs'),

    CDFileHeader    = require('./../../headers/cd-file-header.js'),
    simpleFlatPath  = format('%s/../zipfiles/simple-flat.zip', __dirname),
    simpleFlatZip   = fs.readFileSync(simpleFlatPath),
    flatAtCD        = simpleFlatZip.slice(621),
    simpleCDEntry   = new CDFileHeader(flatAtCD);

exports['simple-flat.zip - first CD entry'] = {
    'filename': function (test) {
        test.equal(simpleCDEntry.filename, 'config.xml');
        test.done();
    },

    'local file header offset': function (test) {
        test.equal(simpleCDEntry.localFileHeaderOffset, 0);
        test.done();
    }
}
