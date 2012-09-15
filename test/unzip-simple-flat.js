var format = require('util').format,
    fs = require('fs'),
    UnzipStream = require('./../zstream').UnzipStream,
    filepath = format('%s/zipfiles/simple-flat.zip', __dirname);

exports['should emit two entry events'] = function (test) {
    var unzipper = new UnzipStream,
        entries = 0;

    fs.createReadStream(filepath).pipe(unzipper);

    unzipper.on('entry', function (entry) {
        entries++;
    });

    unzipper.on('end', function () {
        test.equal(2, entries);
        test.done();
    });
}
