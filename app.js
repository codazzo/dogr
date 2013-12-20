var express = require('express');
var app = express();
var fs = require('fs');
var splitter = require('./lib/sentencesplitter.js');
var exphbs  = require('express3-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('*', function(req, res) {
    var splitLines = JSON.stringify(splitter.splitPath(req.url))
    res.render('index', {
        layout: false,
        lines: splitLines
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
