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
    }
}
