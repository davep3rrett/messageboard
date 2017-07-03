var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var newTopic = require('./routes/new-topic');
var topicSingle = require('./routes/topic-single');
var newPost = require('./routes/new-post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// import credentials
var credentials = require('./credentials.js');

// database setup
var mongoose = require('mongoose');
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

console.log(app.get('env'));

// switch(app.get('env')) {
//   case 'development':
//   mongoose.connect(credentials.mongo.development.connectionString, opts);
//   case 'production':
//   mongoose.connect(credentials.mongo.production.connectionString, opts);
//   default:
//   throw new Error('unknown execution environment: ' + app.get('env'));
// }

mongoose.connect(credentials.mongo.development.connectionString);

var Topic = require('./models/topic.js');

Topic.find(function(err, topics) {
  if(err) return console.error(err);
  if(topics.length) return;

  new Topic({
    title: "test topic",
    posts: [{body: "test post number 1 bitch", date: new Date(2001, 7, 25), username: "davep3rrett"}, {body: "post number 2 baby", date: Date.now(), username: "swdyww"}],
    dateCreated: new Date(2000, 1, 1),
    username: "michael.believe"
  }).save();
});

app.use('/', index);
app.use('/users', users);
app.use('/new-topic', newTopic);
app.use('/new-post', newPost);
app.use('/topic/', topicSingle);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
