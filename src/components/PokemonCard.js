import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTypeColor } from '../helpers';
import styles from './PokemonCard.module.css';

const PokemonCard = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    fetchPokemonDetails();
  }, [pokemon]);

  if (!details) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${details.id}.png`;

  return (
    <Link to={`/pokemon/${details.name}`} className={styles.pokemonCardLink}>
      <Card className={`${styles.pokemonCard} w-100`}>
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
                style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
              >
                {typeInfo.type.name.toUpperCase()}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PokemonCard;