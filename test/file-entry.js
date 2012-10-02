var format = require('util').format,
    fs = require('fs'),
    Parser = require('./../zstream').Parser,
    FileEntry = require('./../file-entry'),
    simpleFlatPath = format('%s/zipfiles/simple-flat.zip', __dirname),
    simpleFlatZip = fs.readFileSync(simpleFlatPath),
    entry = null;

exports.setUp = function (callback) {
    var p = new Parser();

    p.on('entry', function (enn) {
        if (enn.path == 'config.xml') {
            entry = enn;
            callback();
        }
    })

    p.parse(simpleFlatZip);
}

exports['simple-flat'] = {
    'should execute without error': function (test) {
        test.done();
    },

    'should pipe to a new file': function (test) {
        var output = format('%s/output/config.xml', __dirname)
        var writer = fs.createWriteStream(output);

        entry.pipe(writer);
        writer.on('close', function () {
            test.done();
        });
    }
}
