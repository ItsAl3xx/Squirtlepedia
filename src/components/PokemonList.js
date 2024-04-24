// src/components/PokemonList.js
import React, { useEffect, useState } from 'react';
import { getPokemonList } from '../api';
import PokemonCard from './PokemonCard'; // Make sure to import PokemonCard
import { ListGroup } from 'react-bootstrap';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setPokemon(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <ListGroup>
      {pokemon.map((p) => (
        // Use the PokemonCard component for each Pokemon
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </ListGroup>
  );
};

export default PokemonList;
