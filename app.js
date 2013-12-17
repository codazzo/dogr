var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('public'));

app.get('*', function(req, res) {
    fs.readFile('public/index.html', {encoding: 'utf8'}, function (err, data) {
        if (err) throw err;
        res.type('html');
        res.send(data);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});