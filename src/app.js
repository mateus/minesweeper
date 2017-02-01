import express from 'express';

let app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.listen(80, () => {
  console.log('\x1b[36m\nGame running on http://localhost/\n\x1b[0m');
})
