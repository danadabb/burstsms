var rp = require('request-promise-native');


module.exports.sendMessage = (number,msg) => {
	console.log(number, msg);

	var options = {
    uri: ' https://api.transmitsms.com/send-sms.json',
    auth:{
    	user: process.env.API_KEY,
    	password: process.env.API_SECRET
    },
    qs: {
        message: msg,
        to: number
    },
    json: true
};
 
rp(options)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    });
};
