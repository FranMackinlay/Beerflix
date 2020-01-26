const express = require('./node_modules/express');
const PORT = 3000;

const app = express();

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log('Listening...');
});
