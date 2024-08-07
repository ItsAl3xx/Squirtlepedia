import React from 'react';
import PokemonCard from './PokemonCard';
import { Row, Col, Container } from 'react-bootstrap';
import '../App.css';

const PokemonList = ({ pokemons }) => {
  if (pokemons.length === 0) {
    return <p>No Pokémon found.</p>;
  }

  if (pokemons.length === 1) {
    return (
      <Container className="d-flex justify-content-center">
        <PokemonCard pokemon={pokemons[0]} />
      </Container>
    );
  }

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