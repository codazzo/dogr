var fs = require('fs');
var Canvas = require('canvas');
var dogeImgURL = './public/doge.png';
var canvas = new Canvas(600,600);
var splitter = require('../lib/sentencesplitter.js');
var dogeCanvas = require('./dogeCanvas')({
    imgURL: dogeImgURL,
    canvas: canvas,
    imageClass: Canvas.Image
});

var imgRegexp = /.*\.(png|jpg)$/;

module.exports = function(req, res, next){
    var url = req.url,
        cleanPath;

    if (imgRegexp.test(url)) {
        console.log('image!');
        cleanPath = url.split('.png')[0].split('jpg')[0]; //FIXME ugly

        splitLines = splitter.splitPath(cleanPath);

        dogeCanvas.addLines(splitLines);
        res.send(canvas.toBuffer());
    } else {
        next();
    }
}