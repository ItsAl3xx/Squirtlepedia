// src/components/PokemonCard.js

import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PokemonCard = ({ pokemon }) => {
  // Function to add a Pokemon to favorites
  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Assuming pokemon is an object with an 'id' property
    const isFavorite = favorites.some(fav => fav.id === pokemon.id);
    
    if (!isFavorite) {
      favorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    // If pokemon is already in favorites, you might want to alert the user
  };

  return (
    <ListGroup.Item variant="dark" className="pokemon-card">
      <h5>{pokemon.name}</h5>
      {/* Add more details you want to display about the pokemon */}
      <button onClick={addToFavorites}>Add to Favorites</button>
    </ListGroup.Item>
  );
};

export default PokemonCard;
