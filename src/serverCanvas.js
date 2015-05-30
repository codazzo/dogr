'use strict';

var Canvas = require('canvas');
var Font = Canvas.Font;
var dogeFont = new Font('doge', __dirname + '/../public/dogeFont.ttf');
var dogeImgURL = './public/doge.png';
var canvas = new Canvas(600,600);
var dogeCanvas = require('./dogeCanvas')({
    imgURL: dogeImgURL,
    canvas: canvas,
    imageClass: Canvas.Image,
    font: dogeFont
});

module.exports = {
    addLines: dogeCanvas.addLines,

    fillCanvasFromData: dogeCanvas.fillCanvasFromData,

    stream: function(format){
        switch (format) {
            case 'jpg':
                return canvas.createJPEGStream({
                    quality: 90
                });
            case 'png':
                return canvas.pngStream();
            default:
                throw new Error('Format ' + format + ' not supported');
        }
    }
};