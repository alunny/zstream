var format  = require('util').format,
    fs      = require('fs'),

    CDEndSignature      = require('./../../headers/cd-end-signature.js'),
    simpleFlatPath      = format('%s/../zipfiles/simple-flat.zip', __dirname),
    simpleFlatZip       = fs.readFileSync(simpleFlatPath),
    flatAtEndCD         = simpleFlatZip.slice(781),
    simpleEndOfCDSig    = new CDEndSignature(flatAtEndCD);

exports['simple-flat.zip - end of CD'] = {
    'should have the right signatureLength': function (test) {
        test.equal(simpleEndOfCDSig.signatureLength, 20);
        test.done();
    }
}
