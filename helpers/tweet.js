const { TwitterApi } = require('twitter-api-v2');
const { getToken, refreshTokens } = require('./auth');
const { getRecipe } = require('./recipes');

/**
 * Tweets text to the loggedIn client
 * @param {String} tweetMessage The text to tweet 
 */
const tweet = async (tweetMessage) => {

  try {
    // 1. Create the client instance
    const tokens = await refreshTokens();
    const client = new TwitterApi(tokens.accessToken);
    // 2. Tweet!
    await client.v2.tweet(tweetMessage);
  } catch (error) {
    throw new Error(error);
  }

}

/**
 * Builds the tweet bytaking the data from the API response
 * @returns {String} The tweet text.
 */
const createTweetMessage = async () => {

  try {
    // 1. Get recipe from the API
    const recipe = await getRecipe();
    // 2. Build the message
    const tweet = `${recipe.title} - Ready in ${recipe.readyInMinutes} min. \n
                  ${recipe.spoonacularSourceUrl}`;
    return tweet;
  } catch (error) {
    throw new Error('There was an error while getting the recipe from the API. More info:' + error);
  }
}

module.exports = { tweet, createTweetMessage };