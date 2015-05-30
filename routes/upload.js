'use strict';

var url = require('url');
var serverCanvas = require('../src/serverCanvas');
var request = require('request');
var imgurClientID = process.env.IMGUR_CLIENT_ID;
var authorization = 'Client-ID ' + imgurClientID;
var STREAM_FORMAT = 'jpg';
var imgurUploadURL = 'https://api.imgur.com/3/image';

module.exports = function(app){
    app.post('/upload', function(req, res){
        var data = req.body.data;
        var options;
        var uploadRequest;

        serverCanvas.fillCanvasFromData(data);

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
                };
            } else {
                resObj = {
                    error: body
                };
            }
            res.send(JSON.stringify(resObj));
        });

        serverCanvas.stream(STREAM_FORMAT).pipe(uploadRequest);
    });
};