var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var session = require('express-session');
var MongoStore = require('connect-mongo')({session:session});
var passport = require('passport')
var lusca = require('lusca');
var https = require('https');
var fs = require('fs');
var methodOverride = require('method-override');
var conf = require('./config');
var jade_browser = require('jade-browser');

require('./passport-build.js');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.enable('trust proxy')
app.disable('x-powered-by')
app.use(favicon());
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser("herro"));
app.use(session({secret:"herro",store: new MongoStore({url:conf.db_path, collections:'sessions', auto_reconnect:true}), cookie: { maxAge: 600000000 ,httpOnly: false, secure: true}}));
app.use(passport.initialize());
app.use(passport.session({maxAge: new Date(Date.now() + 3600000)}));
app.use(function(req, res, next){
  	res.locals._user = req.user;
  	res.header('Vary', 'Accept');
	next();
});	
app.use(jade_browser('/templates.js', '**', {root: __dirname + '/views/components/', noCache:true})); 
app.use(compress({
        filter: function (req, res) {
          return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
      }));



app.use('/', routes);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['publish_stream', 'publish_actions'] }));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
app.use('/secret', require('./lib/admin'));

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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end(err);
});

function Authenticate(req,res,next){
  if (req.isAuthenticated()) { return next(); }
 	 return res.redirect('/');
}
function Authenticate_admin(req,res,next){
  if (req.isAuthenticated() && req.user.type=='administrator') { return next(); }
 	 return res.redirect('/');
}


module.exports = app;

app.listen(7000);