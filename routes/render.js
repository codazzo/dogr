'use strict';

var splitter = require('../lib/sentencesplitter.js');
var serverCanvas = require('../src/serverCanvas');
var imgRegexp = /(.+)\.(png|jpg)$/;

module.exports = function(app){
    app.get(imgRegexp, function(req, res){
        var path = req.path;
        var segments = imgRegexp.exec(path)[1];
        var type = imgRegexp.exec(path)[2];
        var splitLines = splitter.splitPath(segments, {
            dontSplitWords: req.query.split === 'false'
        });
        var mimes = {'png': 'image/png', 'jpg': 'image/jpeg'};
        var ext = path.substr(-3);

        res.set({
            'Content-Type': mimes[ext] || 'application/octet-stream'
        });

        serverCanvas.addLines(splitLines);
        serverCanvas.stream(type).pipe(res);
    });
};
