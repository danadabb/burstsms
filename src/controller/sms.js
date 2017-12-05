var rp = require('request-promise-native');

function bitlyShortener(url){
	return rp({ 
		uri: `https://api-ssl.bitly.com/v3/shorten?access_token=${process.env.BITLY_TOKEN}&longUrl=${encodeURIComponent(url)}`, 
		json: true 
	});
}

function shortenUrls(message){
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	var urls = message.match(regex);

	if(!urls) { return Promise.resolve(message) };

	var shortenedUrls = [];

	urls.forEach(url => shortenedUrls.push(bitlyShortener(url)));

	return Promise.all(shortenedUrls).then(bitlyUrls => 
	{
		for(var i = 0; i < urls.length; i++){
			message = message.replace(urls[i], bitlyUrls[i].data.url);
		}
		return message;
	});
}

module.exports.sendMessage = (number,msg) => {

	return shortenUrls(msg).then(message => {
		var options = {
			uri: ' https://api.transmitsms.com/send-sms.json',
			auth:{
				user: process.env.API_KEY,
				password: process.env.API_SECRET
			},
			qs: {
				message: message,
				to: number
			},
			json: true
		};
		return rp(options);
	});
};
