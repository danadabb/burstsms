var express = require('express');
var router = express.Router();
var SMS = require('../controller/sms.js');

router.post('/sms', function(req, res){
	SMS.sendMessage(req.body.number, req.body.message)
	.then(response => res.send(response))
	.catch(error => res.send(error));
});

module.exports = router;