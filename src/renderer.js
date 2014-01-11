var fs = require('fs');
var Canvas = require('canvas');
var Font = Canvas.Font;
var dogeFont = new Font('doge', __dirname + '/../public/dogeFont.ttf');
var dogeImgURL = './public/doge.png';
var canvas = new Canvas(600,600);
var splitter = require('../lib/sentencesplitter.js');
var dogeCanvas = require('./dogeCanvas')({
    imgURL: dogeImgURL,
    canvas: canvas,
    imageClass: Canvas.Image,
    font: dogeFont
});

var imgRegexp = /(.*)\.(png|jpg)$/;

module.exports = function(app){
    app.get(imgRegexp, function(req, res, next){
    var url = req.url,
            cleanPath = imgRegexp.exec(url)[1],
            stream,
            type = imgRegexp.exec(url)[2],
        splitLines = splitter.splitPath(cleanPath);

        dogeCanvas.addLines(splitLines);

        if (type === 'jpg') {
            stream = canvas.createJPEGStream({
                quality: 90
            });
        } else if (type === 'png') {
            stream = canvas.pngStream();
    }

        stream.pipe(res);
    });
};