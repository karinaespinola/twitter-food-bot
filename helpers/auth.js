const Token = require('../models/Token');
/**
 * Get access token from the database if any
 * @returns JSON or null if token not found
 */

const getAccessToken = async() => {
  try {
    console.log("Here at the helper111!");
    const currentAccessToken = await Token.find({name: "eltokencito"}).exec();
    if(currentAccessToken.length === 0) {
      return null;
    }
    console.log("Here at the helper!");
    return currentAccessToken;
  } catch(err) {

  }
  
}

module.exports = { getAccessToken };