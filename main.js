require('dotenv').config();
const express = require('express')
const app = express();
const session = require('express-session');
const { TwitterApi } = require('twitter-api-v2');
const port = 3000;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { getAccessToken } = require('./helpers/auth');

// Connect to MongoDB
connectDB();

// 'CONTENT-TYPE: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());


app.use(session({ 
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

app.get('/auth', (req, res) => {
  const client = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });
  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(process.env.CALLBACK_URL, { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] });
  req.session.codeVerifier = codeVerifier;
  req.session.state = state;
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
    // Extract state and code from query string
    const { state, code } = req.query;
    // Get the saved oauth_token_secret from session
    const { codeVerifier, state: sessionState } = req.session;
    if (!codeVerifier || !state || !sessionState || !code) {
      return res.status(400).send('You denied the app or your session expired!');
    }
    if (state !== sessionState) {
      return res.status(400).send('Stored tokens didnt match!');
    }
  
    // Obtain access token
    const client = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });
  
    client.loginWithOAuth2({ code, codeVerifier, redirectUri: process.env.CALLBACK_URL })
      .then(async({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
        // 1. Check if there is already an accessToken in the database
        const currentAccessToken = await getAccessToken();
        // 2. Update/Create accessToken in the database
        })
      .catch((err) => {
        console.log(err);
        res.status(403).send('Invalid verifier or access tokens!')
      });
});

app.get('hello', (req, res) => {
 res.send('Here we are!');
});

app.get('/tweet', async (req, res) => {
  // 
 })

 mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});

