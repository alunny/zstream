# zstream

> zipping and unzipping in JavaScript

zstream is to provide a well-maintained, complete streaming API for working with
zip archives in node.js.

zstream is super early, and not ready for use yet.

## Usage

Recursively zip up a directory (this doesn't work yet):

````js
var zs = require('zstream'),
    fs = require('fs'),
    fstream = require('fstream'); // isaacs/fstream

var sourceDir = fstream.Reader('my/directory');

sourceDir.pipe(zs.ZipStream())
    .pipe(fs.createWriteStream('newzipfile.zip'));
````

Unzip a zip file into a directory:

````js
var zs = require('zstream'),
    fs = require('fs'),
    fstream = require('fstream'); // isaacs/fstream

fs.createReadStream('somezipfile.zip')
    .pipe(new zs.UnzipStream())
    .pipe(fstream.Writer('new/directory'));
````

## authors

@alunny

## license

MIT
