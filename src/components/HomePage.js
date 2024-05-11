// This component is the home page of the application. It is displayed when the user first visits the site. It contains a background image and a welcome message.
import React from 'react';

const HomePage = () => {
  const styles = {
    container: {
      height: '100vh',
      width: '100%',
      backgroundImage: `url(/background.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
    },
    content: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '2rem',
      borderRadius: '8px',
      color: '#ffffff',
      textAlign: 'center',
      maxWidth: '800px',
    },
    header: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.2rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>Welcome to SquirtlePedia!</h1>
        <p style={styles.paragraph}>Start by searching for Pokémon or viewing your favorites!</p>
      </div>
    </div>
  );
};

export default HomePage;