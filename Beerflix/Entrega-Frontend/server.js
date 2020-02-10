const express = require('express');
const PORT = 3030;

const app = express();

app.use(express.static('.'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log('Listening...');
});
