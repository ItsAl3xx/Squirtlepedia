import React, { useEffect, useState } from 'react';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';
import { Container } from 'react-bootstrap';

const Search = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        setAllPokemons(data.results);
        setDisplayedPokemons(data.results);
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      }
    };
    fetchPokemons();
  }, []);

  const onSearch = (query) => {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedPokemons(filteredPokemons);
    
    if (filteredPokemons.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  return (
    <Container>
      <SearchBar onSearch={onSearch} />
      {noResults ? (
        <p className="text-center mt-4">No Pokémon found. Try a different search.</p>
      ) : (
        <PokemonList pokemons={displayedPokemons} />
      )}
    </Container>
  );
};

export default Search;