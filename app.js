'use strict';

require('newrelic');

var express = require('express');
var app = express();
var exphbs  = require('express3-handlebars');

var routeRender = require('./routes/render');
var routeUpload = require('./routes/upload');
var routeBundle = require('./routes/bundle');
var routeIndex = require('./routes/index');

app.use(express.bodyParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

routeRender(app);
routeUpload(app);
routeBundle(app);
routeIndex(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
