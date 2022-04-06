const { TwitterApi } = require('twitter-api-v2');
const { getToken } = require('./auth');
const { getRecipe } = require('./recipes');

const tweet = (tweetMessage) => {
  // 1. Create the client instance
  const accessToken = getToken('accesToken');
  const client = new TwitterApi(accessToken);

}

const createTweetMessage = () => {
  // 1. Get recipe from the API
  const recipe = getRecipe();
  console.log(recipe);
}