import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { getTypeColor } from '../helpers';
import '../App.css'; 

const PokemonCard = ({ pokemon }) => {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate(); // Instantiate navigate function

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const spriteUrl = details.sprites.versions['generation-i']['red-blue'].front_default;

  // Navigate to the details page on click
  const handleClick = () => {
    console.log("Clicked: ", details.name);  // Logging click to console
    navigate(`/pokemon/${details.id}`);  // Navigate to the details page using the Pokémon's ID
  };

  return (
    <Card className="pokemon-card" onClick={handleClick}>
      <Card.Img variant="top" src={spriteUrl} className="pokemon-img" alt={details.name} />
      <Card.Body>
        <Card.Title className="pokemon-name">{details.name}</Card.Title>
        <div className="pokemon-type">
          {details.types.map((typeInfo) => (
            <div key={typeInfo.type.name} className="type-badge" style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}>
              {typeInfo.type.name.toUpperCase()}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
