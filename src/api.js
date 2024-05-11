import axios from 'axios';

// Base URL for the Pokémon API
const baseURL = 'https://pokeapi.co/api/v2/';

// Function to fetch a list of Pokémon using the Pokémon API
export const getPokemonList = async (limit = 50, offset = 0) => {
  // Axios GET request to the API with parameters for limiting and offsetting results
  const response = await axios.get(`${baseURL}pokemon`, {
    params: { limit, offset }
  });
  return response.data; // Return the data part of the response
};
