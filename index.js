"use strict";

var express = require('express');
var app = express();
var Twit = require('twit');
var twitInfo = require('./config.js'); //add twitter app keys/tokens in config.js

// this is for heroku deployment, so we can see if it's running
app.get('/', function(req, res){ res.send('Vinyl Digest bot is happily running.'); });
app.listen(process.env.PORT || 5000);

// reject tweets about that damn TV show and other crap...
var regexReject = new RegExp('^.*(show|Olivia|Wilde|Sky|ebay|episode|hbo|@HBO|@vinylHBO|s01|@SkyAtlanticHD|@SkyAtlantic|TV|carpet|flooring|S1|#vinylHBO|RT|Decal|banner|print|Scorsese|Laminate|binding|signs|nude|sex|meulino|cherry|xxx|adult|sexy|sohot|sweet16|boombap|musicsupervisor|upholstery|stickers|cunt|fuck|fucked|#petsofinstagram|#oahu|#rolltide|#lecheria|#feelingblessed|#niggas|#listenlive|etsy|amzn).*$', 'i');

var twitter = new Twit(twitInfo);

Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = (this.getDate() -1).toString(); //yesterday, as twitter seems to use US timestamp
	return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
};

var date = new Date();
date = date.yyyymmdd();
var prevTweetID = '';

setInterval(function() {
	console.log('setInterval ran');
	reTweet(); }, 1800000 // 30 minutes
	//reTweet(); }, 60000 // 1 minute
);

function reTweet() {
	console.log('prevTweetID = '+prevTweetID);

	twitter.get('/search/tweets', { q: '#vinyl since:'+date, count: 1, language: 'en' }, function(err, data, response){
		var tweet = data.statuses[0];
		if (tweet !== undefined) {
			var tweetID = tweet.id_str
			console.log('tweetID = '+tweetID);
			if ( regexReject.test(tweet.text) || tweetID === undefined || tweetID == prevTweetID ) {
				console.log('TWEET REJECTED!!!');
				return;
			} else {
				twitter.post('statuses/retweet/:id', { id: tweetID }, function (err, data, response) {
					prevTweetID = tweetID;
					tweetID = '';
					console.log('TWEET POSTED!!!');
				});
			}
		} else {
			console.log('tweet is undefined');
			return;
		}
	});
};