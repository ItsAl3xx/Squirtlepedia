import React from 'react';
import PokemonCard from './PokemonCard';
import { Row, Col } from 'react-bootstrap';
import '../App.css';

const PokemonList = ({ pokemons }) => {
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