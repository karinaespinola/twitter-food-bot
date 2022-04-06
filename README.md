# Twitter Bot
Hi! In this repository you will find the code to create your own Twitter bot with the following technologies:

- Node JS
- Express
- MongoDB Atlas

So basically how it works is, first the app logs to the Twitter account that you would like to tweet to. So a very important package is [twitter-api-v2](https://www.npmjs.com/package/twitter-api-v2) so if you could check their documentation that would be great! So after loggin in the get a random recipe from the [spoonacular API](https://spoonacular.com/food-api) and then tweets it!

Since the authentication is OAuth 2.0 you will need to use the /auth route to grant the initial access and create the access Token and refresh Token in the database. So remember to set everything up and then go to the /auth route.

You will aslso need to create in the root directory a .env file with these keys:
TWITTER_API_KEY
TWITTER_API_SECRET
TWITTER_BEARER_TOKEN
CLIENT_ID
CLIENT_SECRET
CALLBACK_URL
DATABASE_URI
SPOONACULAR_API_KEY
PORT
