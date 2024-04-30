import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch Pokémon details:', error);
      });
  }, [pokemonId]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>Height: {pokemon.height} dm</p>
      <p>Weight: {pokemon.weight} hg</p>
      {/* More details can be added as needed */}
    </div>
  );
};

export default PokemonDetails;
