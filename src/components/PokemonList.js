import React from 'react';
import PokemonCard from './PokemonCard';
import { Row, Col } from 'react-bootstrap';  // Importing Row and Col from react-bootstrap for layout
import '../App.css';

// Functional component to display a list of Pokémon
const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemon-deck">
      {/* Grid layout for Pokémon cards with responsive settings: 1 column on extra small screens, 3 on medium and larger */}
      <Row xs={1} md={3} className="g-4">
        {/* Map over the pokemons array to render a PokemonCard for each item */}
        {pokemons.map((pokemon) => (
          <Col key={pokemon.name} className="mb-4">  {/* Each column contains a single Pokémon card, with a bottom margin */}
            <PokemonCard pokemon={pokemon} />  {/* Passing the individual pokemon data to the PokemonCard component */}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PokemonList;  // Export the PokemonList component for use in other parts of the application