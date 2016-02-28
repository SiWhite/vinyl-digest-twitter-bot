var express = require('express');
var app = express();
var Twit = require('twit');
var twitInfo = require('./config.js'); //add twitter app keys/tokens in config.js

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

var twitter = new Twit(twitInfo);

var stream = twitter.stream('statuses/filter', {track: '#vinyl'});

stream.on('connect', function(request) {
	console.log('Connected to Twitter API');
});

stream.on('tweet', function(tweet){
	var tweetID = tweet.id_str;
	console.log(tweetID);
	twitter.post('statuses/retweet/:id', { id: tweetID }, function (err, data, response) {
		tweetID = '';
	})
})


