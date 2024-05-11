import React, { useEffect, useState } from 'react';
import PokemonList from './PokemonList'; // Import the PokemonList component to display the list of Pokémon
import SearchBar from './SearchBar'; // Import the SearchBar component for searching Pokémon

const Search = () => {
  // State to store all pokemons and the displayed pokemons after filtering
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  // useEffect to fetch all pokemons from the API when component mounts
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        setAllPokemons(data.results); // Store all pokemons in state
        setDisplayedPokemons(data.results); // Initially, all pokemons are displayed
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      }
    };
    fetchPokemons();
  }, []);

  // Function to filter pokemons based on search query
  const onSearch = (query) => {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedPokemons(filteredPokemons); // Update displayed pokemons based on search
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} /> 
      <PokemonList pokemons={displayedPokemons} /> 
    </div>
  );
};

export default Search;
