import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Image, Badge } from 'react-bootstrap';
import styles from './PokemonDetails.module.css';

const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [typeColors, setTypeColors] = useState({});

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      setPokemon(pokemonData);

      const { data: speciesData } = await axios.get(pokemonData.species.url);
      setSpecies(speciesData);

      const { data: evolutionData } = await axios.get(speciesData.evolution_chain.url);
      processEvolutionChain(evolutionData.chain);
    };

    const fetchTypeColors = async () => {
      const { data } = await axios.get('https://pokeapi.co/api/v2/type/');
      const colors = {};
      data.results.forEach(type => {
        colors[type.name] = getTypeColor(type.name);
      });
      setTypeColors(colors);
    };

    fetchPokemonDetails();
    fetchTypeColors();
  }, [pokemonId]);

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

  const getTypeColor = (typeName) => {
    // Map type names to their corresponding colors
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    return typeColors[typeName];
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
            src={pokemon.sprites.versions['generation-i']['red-blue'].front_default || pokemon.sprites.front_default}
            roundedCircle
            className={styles.pokemonImage}
          />
        </div>
        <div className={styles.pokemonInfo}>
          <h2 className={styles.pokemonName}>
            {pokemon.name} - #{pokemon.id}
          </h2>
          <div className={styles.typeBadges}>
            {pokemon.types.map(type => (
              <Badge
                key={type.type.name}
                style={{ backgroundColor: typeColors[type.type.name] }}
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
              <strong>Abilities:</strong>{' '}
              {pokemon.abilities.map(a => a.ability.name).join(', ')}
            </div>
          </div>
          <div className={styles.stats}>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className={styles.stat}>
                <strong>{stat.stat.name.replace('-', ' ')}</strong>:{' '}
                {stat.base_stat}
              </div>
            ))}
          </div>
          <p>{getFlavorText()}</p>
          <div className={styles.evolutionChain}>
            {evolutionChain.map((evo, index) => (
              <div key={index} className={styles.evoItem}>
                <Image src={evo.image} thumbnail />
                <p>
                  {evo.species_name} (Level {evo.min_level})
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default PokemonDetails;