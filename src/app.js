var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 8000));
app.set('view engine', 'html');

app.use(express.static('public'));

// DB
var mongoose = require('mongoose');
var playerSchema = mongoose.Schema({
  name: String,
  level: String,
  time: Number,
  date: { type: Date, default: Date.now },
  country: String
});
var Player = mongoose.model('Player', playerSchema);

function savePlayer(playerObj) {
  var status;
  mongoose.connect(process.env.MONGOLAB_URI);
  var db = mongoose.connection;

  db.on('error', function(e) {
    console.log('DB Error', e);
    status = 503;
    db.close();
  });
  db.once('open', function() {
    var newPlayer = new Player(playerObj);

    newPlayer.save(function (err, fluffy) {
      if (err) return console.error(err);
      status = 503;
      db.close();
    });
  });

  return status;
}

// ROUTES ======================================================================
app.get('/', function(request, res) {
  res.sendFile('index.html');
});

app.get('/api/get/players', function(request, res) {
  mongoose.connect(process.env.MONGOLAB_URI);
  var db = mongoose.connection;
  var data;

  db.on('error', function() {
    db.close();
  });
  db.once('open', function() {
    Player.find({}).sort({ level: -1, time: 1 }).exec(function (err, players) {
      if (err) return console.error(err);
      res.send(JSON.stringify(players));
      db.close();
    });
  });
});

app.get('/api/get/small', function(request, res) {
  mongoose.connect(process.env.MONGOLAB_URI);
  var db = mongoose.connection;
  var data;

  db.on('error', function() {
    db.close();
  });
  db.once('open', function() {
    Player.find({'level': 'Small'}).sort({ time: 1 }).exec(function (err, players) {
      if (err) return console.error(err);
      res.send(JSON.stringify(players));
      db.close();
    });
  });
});

app.get('/api/get/medium', function(request, res) {
  mongoose.connect(process.env.MONGOLAB_URI);
  var db = mongoose.connection;
  var data;

  db.on('error', function() {
    db.close();
  });
  db.once('open', function() {
    Player.find({'level': 'Medium'}).sort({ time: 1 }).exec(function (err, players) {
      if (err) return console.error(err);
      res.send(JSON.stringify(players));
      db.close();
    });
  });
});

app.get('/api/get/large', function(request, res) {
  mongoose.connect(process.env.MONGOLAB_URI);
  var db = mongoose.connection;
  var data;

  db.on('error', function() {
    db.close();
  });
  db.once('open', function() {
    Player.find({'level': 'Large'}).sort({ time: 1 }).exec(function (err, players) {
      if (err) return console.error(err);
      res.send(JSON.stringify(players));
      db.close();
    });
  });
});

app.post('/api/save/player', function(request, res) {
  var player = {};
  player.name = request.body.name;
  player.level = request.body.level;
  player.time = request.body.time;
  player.country = request.body.country;

  var status = savePlayer(player);
  var status = 200;
  if (status === 200) {
    res.send(player);
  } else {
    res.send('Error');
  }
});

// Server ======================================================================
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
