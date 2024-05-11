import React from 'react';
import PokemonCard from './PokemonCard'; // Component to display individual Pokémon cards
import styles from './FavoritesList.module.css'; // Import styling specific to this component

// Define a React component called FavoritesList for displaying the user's favorite Pokémon
const FavoritesList = () => {
  // Retrieve and parse the list of favorite Pokémon from local storage, or default to an empty array if none
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log("Loaded favorites from localStorage:", favorites);

  // Filter the list to include only those entries that have both an 'id' and 'url' to ensure they are valid for rendering
  const validFavorites = favorites.filter(pokemon => pokemon && pokemon.id && pokemon.url);

  // Render the component
  return (
    <div className={styles.favoritesContainer}>
      <h1 className={styles.favoritesTitle}>Your Favorite Pokémon</h1>
      <div className={styles.favoritesGrid}>
        {validFavorites.map((pokemon, index) => (
          <div key={pokemon.id + '-' + index} className={styles.favoriteCard}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList; // Make the FavoritesList component available for use in other parts of the app
