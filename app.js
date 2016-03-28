var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose/');
// Connect to DB
mongoose.connect('mongodb://localhost/remotepres');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/client/favicon.ico'));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'master'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./server/passport/init');
initPassport(passport);

// Define routes
var routes = require('./server/routes/index')(passport);
app.use('/', routes);

// Define 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Start server
app.listen(app.get('port'), function () {
    console.log('Server draait nu op poort: ' + app.get('port'))
});

module.export = app;