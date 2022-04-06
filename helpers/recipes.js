const axios = require('axios');

/**
 * Get the recipe from the API
 * @returns {Object} Recipe in JSON format
 */
const getRecipe = async () => {
  try {
    const recipe = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=1`);
    console.log(recipe.data.recipes[0]);
    return recipe.data.recipes[0];
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getRecipe };
