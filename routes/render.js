'use strict';

var splitter = require('../lib/sentencesplitter.js');
var serverCanvas = require('../src/serverCanvas');
var imgRegexp = /(.*)\.(png|jpg)$/;

module.exports = function(app){
    app.get(imgRegexp, function(req, res){
        var url = req.url;
        var cleanPath = imgRegexp.exec(url)[1];
        var type = imgRegexp.exec(url)[2];
        var splitLines = splitter.splitPath(cleanPath);

        serverCanvas.addLines(splitLines);
        serverCanvas.stream(type).pipe(res);
    });
};