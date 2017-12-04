var express = require('express');
var router = express.Router();

router.post('/sms', function(req, res){
	res.send("Recieved");
});

module.exports = router;