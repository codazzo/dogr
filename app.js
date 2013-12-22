require('newrelic');

var express = require('express');
var app = express();
var fs = require('fs');
var splitter = require('./lib/sentencesplitter.js');
var exphbs  = require('express3-handlebars');
var browserify = require('browserify');
var nodecanvas = require('canvas');
var renderer = require('./src/renderer');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(renderer);

app.get('/dogr.js', function(req, res){
    var b = browserify();
    b.add('./src/dogr.js');
    b.bundle().pipe(res);
});

app.get('*', function(req, res) {
    var splitLinesArray = splitter.splitPath(req.url),
        splitLines = JSON.stringify(splitLinesArray.length ? splitLinesArray : ['wow', 'such sample', 'much text']);

    res.render('index', {
        layout: false,
        lines: splitLines
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
