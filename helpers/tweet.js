const { TwitterApi } = require('twitter-api-v2');
const { getToken } = require('./auth');

const tweet = () => {
  // 1. Create the client instance
  const accessToken = getToken('accesToken');
  const client = new TwitterApi('<YOUR-ACCESS-TOKEN>');
}