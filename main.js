const express = require('express')
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const { TwitterApi } = require('twitter-api-v2');
const port = 3000

const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
const rwClient = appOnlyClient.readWrite;

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.get('/', (req, res) => {
  const client = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });
  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(process.env.CALLBACK_URL, { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] });
  req.session.codeVerifier = codeVerifier;
  req.session.state = state;
  res.redirect(url);
});

app.get('/callback', (req, res) => {
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
        // {loggedClient} is an authenticated client in behalf of some user
        // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
        // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
  
        // Example request
        const { data: userObject } = await loggedClient.v2.me();
        console.log(userObject);
        res.redirect('/hello');
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send('Invalid verifier or access tokens!')
      });
});

app.get('hello', (req, res) => {
 res.send('Here we are!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

