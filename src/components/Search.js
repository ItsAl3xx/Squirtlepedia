import React, { useEffect, useState } from 'react';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';

const Search = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

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
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <PokemonList pokemons={displayedPokemons} />
    </div>
  );
};

export default Search;