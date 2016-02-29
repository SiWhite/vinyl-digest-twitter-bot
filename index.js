var express = require('express');
var app = express();
var Twit = require('twit');
var twitInfo = require('./config.js'); //add twitter app keys/tokens in config.js

// this is for heroku deployment, so we can see if it's running
app.get('/', function(req, res){ res.send('Vinyl Digest bot is happily running.'); });
app.listen(process.env.PORT || 5000);

var twitter = new Twit(twitInfo);

var stream = twitter.stream('statuses/filter', {track: '#vinyl'}); // set the hashtag to retweet

stream.on('connect', function(request) {
	console.log('Connected to Twitter API');
});

stream.on('disconnect', function(request) {
	console.log('Disconnected from Twitter API');
});

stream.on('tweet', function(tweet){
	var tweetID = tweet.id_str;
	console.log(tweetID);
	twitter.post('statuses/retweet/:id', { id: tweetID }, function (err, data, response) {
		tweetID = '';
	})
})
stream.on('error', function (tweet) {
	console.log(tweet);
});


