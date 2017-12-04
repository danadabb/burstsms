const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(require('./routes/index'));
app.use(require('./routes/sms'));

app.listen(process.env.PORT || 3000);