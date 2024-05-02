import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import styles from './PokemonDetails.module.css';

const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(pokemonData);
        const { data: speciesData } = await axios.get(pokemonData.species.url);
        setSpecies(speciesData);
        const { data: evolutionData } = await axios.get(speciesData.evolution_chain.url);
        processEvolutionChain(evolutionData.chain);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  const processEvolutionChain = (chain) => {
    const evolutionArray = [];
    let currentStage = chain;
    while (currentStage) {
      evolutionArray.push({
        species_name: currentStage.species.name,
        min_level: currentStage.evolution_details[0]?.min_level || "N/A",
      });
      currentStage = currentStage.evolves_to[0];
    }
    setEvolutionChain(evolutionArray);
  };

  if (!pokemon || !species || evolutionChain.length === 0) {
    return <Container className="text-center mt-5">Loading...</Container>;
  }

  const getFlavorText = () => {
    const flavor = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    return flavor ? flavor.flavor_text.replace(/[\n\f]/g, ' ') : "No description available.";
  };

  return (
    <Container className="mt-4">
      <Card className={`text-center ${styles.pokemonCard}`}>
        <Row>
          <Col md={4}>
            <Image src={pokemon?.sprites?.other['official-artwork']?.front_default} className={styles.pokemonImage} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{pokemon?.name.toUpperCase()} - #{pokemon.id}</Card.Title>
              <Card.Text className={styles.flavorText}>{getFlavorText()}</Card.Text>
              <div className={styles.details}>
                <span>Type: {pokemon.types.map(t => t.type.name.toUpperCase()).join(', ')}</span>
                <span>Height: {pokemon.height / 10} m</span>
                <span>Weight: {pokemon.weight / 10} kg</span>
                <span>Base Experience: {pokemon.base_experience}</span>
                {species.habitat && <span>Habitat: {species.habitat.name.toUpperCase()}</span>}
                {species.growth_rate && <span>Growth Rate: {species.growth_rate.name.toUpperCase()}</span>}
              </div>
              <div className={styles.evolutionSection}>
                <h5>Evolution Chain:</h5>
                {evolutionChain.map((evo, index) => (
                  <div key={index} className={styles.evoItem}>
                    {evo.species_name} (Level {evo.min_level})
                  </div>
                ))}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PokemonDetails;
