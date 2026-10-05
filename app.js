const express = require('express');
const router = require('./router/app.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});