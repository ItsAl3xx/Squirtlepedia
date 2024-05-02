// src/components/Search.js
import React from 'react';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';


const Search = () => {
  return (
    <div>
      <SearchBar />
      <PokemonList /> {/* Just include it once */}
    </div>
  );
};

export default Search;