// DEPENDENCIES
var express = require('express'),
app = express(),
path = require('path');
var APIRouter = express.Router();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');

// CONTROLLERS
var indexController = require('./controllers/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Get clientside assets
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', ''))); //get favicon

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// ROUTES
app.get('/', indexController.index);


// Routes
app.get('/', indexController.index);

// API
// JSON Files
var MESSAGES_LIST = path.join(__dirname + '/public/assets/messages.json');
app.use('/api/messages', APIRouter);

APIRouter.post('/', function(req, res, next) {
  fs.readFile(MESSAGES_LIST, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var messages = JSON.parse(data);

    var newMessage = {
      id: Date.now(),
      username: 'yours_truly',
      body: req.body.body,
      icon: "http://socialmediaweek.org/wp-content/blogs.dir/1/files/slack-pattern-940x492.jpg"
    };

    messages.push(newMessage);

    fs.writeFile(MESSAGES_LIST, JSON.stringify(messages, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(messages);
    });
  });
});

APIRouter.get('/', function(req, res, next) {
	fs.readFile(MESSAGES_LIST, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});


// SERVER
app.listen(process.env.PORT || 2100, function(){
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});