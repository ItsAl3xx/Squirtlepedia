import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTypeColor } from '../helpers'; // Helper function to get color based on Pokémon type
import styles from './PokemonCard.module.css'; // Custom CSS module for styling

// Define the PokemonCard component accepting a pokemon prop
const PokemonCard = ({ pokemon }) => {
  // State to hold detailed information about a specific Pokémon
  const [details, setDetails] = useState(null);

  // Effect hook to fetch Pokémon details when the component mounts or the pokemon prop changes
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Use axios to fetch data from the provided Pokémon URL
        const response = await axios.get(pokemon.url);
        setDetails(response.data); // Store the fetched details in state
      } catch (error) {
        console.error(error); // Log any errors that occur during the fetch
      }
    };
    fetchPokemonDetails(); // Call the fetch function
  }, [pokemon]);

  // Display loading message if details have not been fetched yet
  if (!details) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Construct the URL to the Pokémon sprite
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${details.id}.png`;

  // Render the Pokémon card
  return (
    // Link to the Pokémon's detailed view page
    <Link to={`/pokemon/${details.name}`} className={styles.pokemonCardLink}>
      <Card className={styles.pokemonCard}>
        <div className={styles.spriteContainer}>
          <div className={styles.spriteBackground}></div>
          <Card.Img variant="top" src={spriteUrl} className={styles.pokemonImg} alt={details.name} />
        </div>
        <Card.Body>
          <Card.Title className={styles.pokemonName}>{details.name}</Card.Title>
          <div className={styles.pokemonType}>
            {details.types.map((typeInfo) => (
              <div
                key={typeInfo.type.name}
                className={styles.typeBadge}
                style={{ backgroundColor: getTypeColor(typeInfo.type.name) }} // Set background color based on type
              >
                {typeInfo.type.name.toUpperCase()} {/* Display the type name in uppercase */}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PokemonCard; // Export the PokemonCard component for use in other parts of the application
