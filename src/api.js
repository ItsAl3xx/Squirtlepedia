// src/api.js
import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2/';

export const getPokemonList = async (limit = 50, offset = 0) => {
  const response = await axios.get(`${baseURL}pokemon`, {
    params: { limit, offset }
  });
  return response.data;
};

// Export other API functions here...
