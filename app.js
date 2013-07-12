var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , search = require('./routes/search');

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', routes.index);
app.get('/*', search.index);

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);

console.log("Express server listening on port " + port);