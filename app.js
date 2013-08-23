
/**
 * Module dependencies.
 */

var express = require('express')
  , cfg = require('./config')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.locals.author = cfg.author;

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.latest);
app.get('/archive', routes.archive);
app.get('/archive/:file', routes.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
