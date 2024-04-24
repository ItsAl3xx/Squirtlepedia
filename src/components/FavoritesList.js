// src/components/FavoritesList.js
import React from 'react';

const FavoritesList = () => {
  // Load favorites from local storage and display them
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div className="favorites-list">
      <h1>Your Favorite Pokémon</h1>
      {favorites.map(pokemon => (
        <div key={pokemon.id}>{pokemon.name}</div>
        // You would likely render a PokemonCard or similar here
      ))}
    </div>
  );
};

export default FavoritesList;