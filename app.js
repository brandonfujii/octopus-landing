// require dependencies
var express = require('express'),
app = express(),
path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var indexController = require('./controllers/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', ''))); //get favicon

app.use(bodyParser.urlencoded({
  extended: true
}));

// ROUTES
app.get('/', indexController.index);



app.listen(process.env.PORT || 1337, function(){
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});