# Twitter Bot for @vinyl_digest

A simple Node.js app using [Twit](https://github.com/ttezel/twit).

Create a config.js file in your root dir containing your twitter keys/secrets:

<<<<<<< HEAD
module.exports = {
	consumer_key: "XXXX",
	consumer_secret: "XXXX",
	access_token: "XXXX",
	access_token_secret: "XXXX"
}
=======
Asumming you have [Node.js](http://nodejs.org/) and [Heroku Toolbelt](https://toolbelt.heroku.com/) installed on your machine:

```sh
git clone git@github.com:heroku/node-js-sample.git # or clone your own fork
cd node-js-sample
npm install
foreman start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Building a Real-time, Polyglot Application with Node.js, Ruby, MongoDB and Socket.IO](https://devcenter.heroku.com/articles/realtime-polyglot-app-node-ruby-mongodb-socketio)
<<<<<<< HEAD
- [Using Socket.IO with Node.js on Heroku](https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku)
>>>>>>> fix markdown typo
=======
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
>>>>>>> Update documentation links
