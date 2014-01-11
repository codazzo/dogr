var fs = require('fs');
var url = require('url');
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

var request = require('request');

var imgurClientID = process.env.IMGUR_CLIENT_ID,
    authorization = 'Client-ID ' + imgurClientID;

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

    app.post('/upload', function(req, res, next){
        var data = req.body.data,
            options,
            uploadRequest,
            imgurUploadURL = 'https://api.imgur.com/3/image';

        dogeCanvas.fillCanvasFromData(data);

        options = {
            uri: url.parse(imgurUploadURL),
            method: 'POST',
            headers: {
                Authorization: authorization,
                Accept: 'application/json'
            }
        };

        uploadRequest = request(options, function(error, response, body){
            var resObj,
                data;

            res.type('json');
            res.status(response.statusCode);

            if (!error && response.statusCode === 200) {
                data = JSON.parse(body).data;
                resObj = {
                    link: data.link,
                    deletehash: data.deletehash
                }
            } else {
                resObj = {
                    error: body
                };
            }
            res.send(JSON.stringify(resObj));
        });

        canvas.jpegStream({
            quality: 90
        }).pipe(uploadRequest);
    });
};