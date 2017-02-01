import express from 'express';

let app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`http://localhost/:${port}`);
})
