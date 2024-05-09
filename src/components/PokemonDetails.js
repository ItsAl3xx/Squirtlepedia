import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Image, Badge, Button } from 'react-bootstrap';
import { getTypeColor } from '../helpers';
import styles from './PokemonDetails.module.css';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const checkIfFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(p => p.id === id));
  };

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

  if (!pokemon || !species) {
    return <Container className="text-center mt-5">Loading...</Container>;
  }

  const getFlavorText = () => {
    const flavor = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    return flavor ? flavor.flavor_text.replace(/[\n\f]/g, ' ') : "No description available.";
  };

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