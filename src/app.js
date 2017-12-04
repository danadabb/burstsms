const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(require('./routes/index'));

app.listen(3000, () => console.log('Listening on port 3000'));