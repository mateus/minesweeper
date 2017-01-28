import express from 'express';

let app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.listen(8000, () => {
  console.log('\x1b[36m\nGame running on http://localhost:8000\n\x1b[0m');
})
