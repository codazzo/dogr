'use strict';

var splitter = require('../lib/sentencesplitter.js');
var DEFAULT_LINES = ['wow', 'such sample', 'much text'];

function getLinesArray(url) {
    if (url.indexOf('%20') > -1) {
        return url.split('%20');
    }

    var splitLinesArray = splitter.splitPath(url);
    return JSON.stringify(splitLinesArray.length ? splitLinesArray : DEFAULT_LINES);
}

module.exports = function(app) {
    app.get('*', function(req, res) {
        res.render('index', {
            layout: false,
            lines: getLinesArray(req.url)
        });
    });
};