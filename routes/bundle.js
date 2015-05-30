'use strict';

var browserify = require('browserify');
var b = browserify();
var dogrSrc;

b.add('./src/dogr.js');
b.bundle(null, function(err, src){
    dogrSrc = src;
});

module.exports = function(app) {
    app.get('/dogr.js', function(req, res){
        res.send(dogrSrc);
    });
};
