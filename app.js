var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , search = require('./routes/search')
  , error = require('./routes/404');

var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port);
var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.favicon(__dirname + '/public/images/favicon.png'))
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', routes.index);
app.get('/:query', search.index);
app.get('/*', error.index);

io.sockets.on('connection', function (socket) {
  socket.on('requestForMoreRecipes', function(data) {

    search.moreRecipes(data, function(data) {
      socket.emit('moreRecipes', data);
    });
  });
});

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.set('log level', 1);

console.log("Express server listening on port " + port);