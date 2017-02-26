
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var start = require('./routes/start');
var home = require('./routes/home');
var questions = require('./routes/questions');
var intention = require('./routes/new-intention');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development onlyapp
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', home.login);

app.get('/questions', questions.view);
app.get('/questions/:id', questions.view);
app.get('/home', home.view);
app.get('/login', home.login);
app.get('/intention', intention.view);
app.get('/previous_intention', home.previous_intention);

app.get('/intentions_json', intention.get_intentions_json);

app.post('/save_intention', intention.save_intention);
app.post('/save_answers', intention.save_answers);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
