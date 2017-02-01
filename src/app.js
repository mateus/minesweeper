import express from 'express';

let app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.listen(app.get('port'), () => {
  console.log(`http://localhost/:${app.get('port')}`);
})
