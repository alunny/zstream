var format = require('util').format,
    fs = require('fs'),
    Parser = require('./../zstream').Parser,
    simpleFlatPath = format('%s/zipfiles/simple-flat.zip', __dirname);
    simpleFlatZip = fs.readFileSync(simpleFlatPath);

exports['simple-flat.zip'] = {
    'should end without error': function (test) {
        var p = new Parser;

        p.on('end', function (err) {
            if (err) throw err;

            test.done();
        });

        p.parse(simpleFlatZip);
   },

    'should emit two entry events': function (test) {
        var p = new Parser,
            localfiles = 0;

        p.on('entry', function (file) {
            localfiles++;
        });

        p.on('end', function (err) {
            if (err) throw err;

            test.equal(2, localfiles);
            test.done();
        });

        p.parse(simpleFlatZip);
    },

    'should emit two cd-header events': function (test) {
        var p = new Parser,
            cdHeaders = 0;

        p.on('cd-header', function (file) {
            cdHeaders++;
        });

        p.on('end', function (err) {
            if (err) throw err;

            test.equal(2, cdHeaders);
            test.done();
        });

        p.parse(simpleFlatZip);
    },

    'should emit one end-of-cd event': function (test) {
        var p = new Parser,
            endOfCD = 0;

        p.on('end-of-cd', function (file) {
            endOfCD++;
        });

        p.on('end', function (err) {
            if (err) throw err;

            test.equal(1, endOfCD);
            test.done();
        });

        p.parse(simpleFlatZip);
    }
}
