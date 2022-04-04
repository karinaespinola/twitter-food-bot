const Token = require('../models/Token');
const { TwitterApi } = require('twitter-api-v2');
/**
 * Get access token from the database if any
 * @returns JSON or null if token not found
 */

const getAccessToken = async() => {
  try {
    const currentAccessToken = await Token.find({name: process.env.TOKEN_IDENTIFIER}).exec();
    return currentAccessToken;
  } catch(err) {
    throw new Error('There was an issue connecting retrieving the token from the database.');
  }  
}

/**
 * Creates the record on the database of the access token
 * @param {String} newAccessToken The new value of the accessToken
 */
const createAccessToken = async(newAccessToken) => {
  try {
    const newToken = new Token({
      name: process.env.TOKEN_IDENTIFIER,
      value: newAccessToken
    });
    await newToken.save();
    return true;
  } catch (error) {
    throw new Error('There was an issue when creating the access token record in the database');
  }
}

/**
 * Updates the access token in the database
 * @param {String} newAccessToken The new value to assign to the access token in the database
 * @returns JSON with the updated token record
 */
const updateAccessToken = async (newAccessToken) => {
  try {
    const filter = { name: process.env.TOKEN_IDENTIFIER };
    const update = { value: newAccessToken };

    const updatedToken = await Token.findOneAndUpdate(filter, update, {
    new: true
    });
    return updatedToken;
  } catch (error) {
      throw new Error('There was an error when updating the token in the database');
  }
}

const refreshToken = async () => {
  const client = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });
  const currentToken = await getAccessToken();
  // Obtain the {refreshToken} from your DB/store
  const { client: refreshedClient, accessToken, refreshToken: newRefreshToken } = await client.refreshOAuth2Token(currentToken[0].value);
  
  // Store refreshed {accessToken} and {newRefreshToken} to replace the old ones
  
  // Example request
  await refreshedClient.v2.me();
}

module.exports = { getAccessToken, createAccessToken, updateAccessToken };