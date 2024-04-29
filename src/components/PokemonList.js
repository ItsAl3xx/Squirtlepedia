// src/components/PokemonList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { Row, Col } from 'react-bootstrap';
import '../App.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const limit = 151; // Number of Gen 1 Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        setPokemons(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="pokemon-deck">
      <Row xs={1} md={3} className="g-4">
        {pokemons.map((pokemon) => (
          <Col key={pokemon.name} className="mb-4">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PokemonList;
