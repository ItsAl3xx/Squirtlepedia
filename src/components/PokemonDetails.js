import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Image, Badge, Button } from 'react-bootstrap';
import { getTypeColor } from '../helpers'; // Helper function to get color based on type
import styles from './PokemonDetails.module.css';

// Component to display detailed information about a specific Pokémon
const PokemonDetails = () => {
  const { name } = useParams(); // Extracts the Pokémon's name from the URL
  const navigate = useNavigate(); // Hook for navigating between routes
  const [pokemon, setPokemon] = useState(null); // State for storing the main Pokémon data
  const [species, setSpecies] = useState(null); // State for storing species data, like flavor text
  const [evolutionChain, setEvolutionChain] = useState([]); // State for storing the Pokémon's evolution chain
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the Pokémon is a favorite

  // Fetch detailed Pokémon data from the API on component mount or when the name changes
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(pokemonData);
        const { data: speciesData } = await axios.get(pokemonData.species.url);
        setSpecies(speciesData);
        const { data: evolutionData } = await axios.get(speciesData.evolution_chain.url);
        processEvolutionChain(evolutionData.chain);
        checkIfFavorite(pokemonData.id);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    fetchPokemonDetails();
  }, [name]);

  // Process and store the evolution chain data
  const processEvolutionChain = (chain) => {
    let currentStage = chain;
    const evolutionArray = [];
    while (currentStage) {
      const pokemonId = currentStage.species.url.split('/').slice(-2, -1)[0];
      evolutionArray.push({
        species_name: currentStage.species.name,
        min_level: currentStage.evolution_details[0]?.min_level || "N/A",
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemonId}.png`
      });
      currentStage = currentStage.evolves_to[0];
    }
    setEvolutionChain(evolutionArray);
  };

  // Check and update the favorite status of the Pokémon
  const checkIfFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(p => p.id === id));
  };

  // Toggle the favorite status of the Pokémon
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(p => p.id === pokemon.id);
    if (index >= 0) {
      favorites.splice(index, 1);
      setIsFavorite(false);
    } else {
      favorites.push({
        id: pokemon.id,
        name: pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemon.id}.png`,
        type: pokemon.types.map(type => type.type.name).join(', ')
      });
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  // Navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Display loading message until all data is fetched
  if (!pokemon || !species) {
    return <Container className="text-center mt-5">Loading...</Container>;
  }

  // Extract and clean the flavor text from the species data
  const getFlavorText = () => {
    const flavor = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    return flavor ? flavor.flavor_text.replace(/[\n\f]/g, ' ') : "No description available.";
  };

  // Render the detailed view of the Pokémon
  return (
    <Container className={styles.pokemonDetailContainer}>
      <Card className={styles.pokemonCard}>
        <div className={styles.pokemonImageContainer}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemon.id}.png`}
            roundedCircle
            className={styles.pokemonImage}
          />
        </div>
        <div className={styles.pokemonInfo}>
          <div className={styles.headerContainer}>
            <h2 className={styles.pokemonName}>
              {pokemon.name} - #{pokemon.id}
            </h2>
            <button className={styles.backButton} onClick={handleGoBack}>
              &larr; Back
            </button>
            <Button variant={isFavorite ? "primary" : "outline-primary"} onClick={toggleFavorite} className={styles.favoritesButton}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
          <div className={styles.typeBadges}>
            {pokemon.types.map(type => (
              <Badge
                key={type.type.name}
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name.toUpperCase()}
              </Badge>
            ))}
          </div>
          <div className={styles.detailsGrid}>
            <div>
              <strong>Height:</strong> {pokemon.height * 10} cm
            </div>
            <div>
              <strong>Weight:</strong> {pokemon.weight / 10} kg
            </div>
            <div>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </div>
            <div>
              <strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
            </div>
          </div>
          <div className={styles.stats}>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className={styles.stat}>
                <strong>{stat.stat.name.replace('-', ' ')}</strong>: {stat.base_stat}
              </div>
            ))}
          </div>
          <p>{getFlavorText()}</p>
          <div className={styles.evolutionChain}>
            {evolutionChain.map((evo, index) => (
              <div key={index} className={styles.evoItem}>
                <Image src={evo.image} thumbnail />
                <p>{evo.species_name} (Level {evo.min_level})</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default PokemonDetails;
