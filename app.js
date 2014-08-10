var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

// Router directory initialization
var routes = require('./routes');
var users = require('./routes/user');
var crawl = require("./routes/crawl");
var viewData = require("./routes/viewData");
var viewCharts = require("./routes/viewCharts");

var app = express();

// view engine setup
// default port is 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// Mongodb connectivity
mongoose.connect("mongodb://localhost:27017/test");
// Require all files in /models directory
fs.readdirSync(__dirname + "/models").forEach(function(filename){
  if(~filename.indexOf(".js")){
    require(__dirname + "/models/" + filename);
  }
});

// Setting of routers
app.get('/', routes.index);
app.get('/users', users.list);
app.get("/crawl", crawl.init);
app.get("/viewData", viewData.init);
app.get("/viewCharts", viewCharts.init);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
