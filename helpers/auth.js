const Token = require('../models/Token');
const { TwitterApi } = require('twitter-api-v2');
/**
 * Get a token from the database
 * @param {String} tokenType Type of token. Possible values: refreshToken, accessToken 
 * @returns JSON or null if token not found
 */

const getToken = async(tokenType) => {
  try {
    const token = await Token.find({name: tokenType}).exec();
    return token;
  } catch(err) {
    throw new Error('There was an issue connecting retrieving the token from the database.');
  }  
}

/**
 * Creates the record on the database of a token
 * @param {String} tokenType The token type. Possible values: accessToken, refreshToken
 * @param {String} tokenValue The new value of the accessToken
 */
const createToken = async(tokenType, tokenValue) => {
  try {
    const newToken = new Token({
      name: tokenType,
      value: tokenValue
    });
    await newToken.save();
    return true;
  } catch (error) {
    throw new Error('There was an issue when creating the token record in the database');
  }
}

/**
 * Updates a token record in the database
 * @param {String} tokenType Type of token to update
 * @param {String} newToken The new value to assign to the token in the database
 * @returns JSON with the updated token record
 */
const updateToken = async (newToken) => {
  try {
    const filter = { name: tokenType };
    const update = { value: newToken };

    const updatedToken = await Token.findOneAndUpdate(filter, update, {
    new: true
    });
    return updatedToken;
  } catch (error) {
      throw new Error('There was an error when updating the token in the database');
  }
}

/**
 * Refreshes the current access token using the Twitter API
 */
const refreshToken = async () => {
  const client = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });
  const currentToken = await getAccessToken();
  // Obtain the {refreshToken} from your DB/store
  const { client: refreshedClient, accessToken, refreshToken: newRefreshToken } = await client.refreshOAuth2Token(currentToken[0].value);
  
  // Store refreshed {accessToken} and {newRefreshToken} to replace the old ones
  
  // Example request
  await refreshedClient.v2.me();
}

module.exports = { getToken, createToken, updateToken };