var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', function(request, res) {
  res.sendFile('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
