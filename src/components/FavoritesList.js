import React from 'react';
import PokemonCard from './PokemonCard';
import styles from './FavoritesList.module.css';

const FavoritesList = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log("Loaded favorites from localStorage:", favorites);

  // Ensure every favorite Pokémon has an 'id' and 'url' before rendering
  const validFavorites = favorites.filter(pokemon => pokemon && pokemon.id && pokemon.url);

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

export default FavoritesList;