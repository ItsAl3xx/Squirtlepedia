// src/components/PokemonDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  // You would use the `id` from `useParams` to fetch details for a specific Pokemon
  const { pokemonId } = useParams();

  return (
    <div className="pokemon-details">
      <h1>Pokémon Details: {pokemonId}</h1>
      {/* Render Pokémon details here */}
    </div>
  );
};

export default PokemonDetails;
