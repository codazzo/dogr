require('newrelic');

var express = require('express');
var app = express();
var fs = require('fs');
var splitter = require('./lib/sentencesplitter.js');
var exphbs  = require('express3-handlebars');
var browserify = require('browserify');
var nodecanvas = require('canvas');

app.use(express.bodyParser());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

require('./src/renderer')(app);

var b = browserify(),
    dogrSrc;

    b.add('./src/dogr.js');
b.bundle(null, function(err, src){
    dogrSrc = src;
});

app.get('/dogr.js', function(req, res){
    res.send(dogrSrc);
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
