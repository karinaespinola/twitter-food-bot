const Token = require('../models/Token');

const getAccessToken = async () => {
  // Get the accessToken from the database by an specific name
  const accessToken = await Token.find({ name: process.env.TOKEN_IDENTIFIER }).exec();
  console.log(JSON.stringify(accessToken));
}

const getAllCharacters = async (req, res) => {
  const allCharacters = await Character.find().all();
  res.status(200).json(allCharacters);
}

module.exports = { getSingleCharacter, getAllCharacters }