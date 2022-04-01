const Token = require('../models/Token');

const getAccessToken = async() => {
  try {
    const currentAccessToken = await Token.find({name: process.env.TOKEN_IDENTIFIER});
    if(currentAccessToken.count() === 0) {
      return null;
    }

    return JSON.stringify(currentAccessToken);
  } catch(err) {

  }
  
}

module.exports = { getAccessToken };