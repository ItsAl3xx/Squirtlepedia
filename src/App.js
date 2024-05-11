import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing components for routing
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling
import './App.css'; // Import custom styles
import NavbarComponent from './components/NavbarComponent'; // Import the navigation bar component
import HomePage from './components/HomePage'; // Import the home page component
import Search from './components/Search'; // Import the search page component
import PokemonDetails from './components/PokemonDetails'; // Import the Pokémon details page component
import FavoritesList from './components/FavoritesList'; // Import the favorites list page component

// Main component that defines the structure of the application
const App = () => {
  return (
    // Router component to handle navigation between different components based on the URL
    <Router>
      <NavbarComponent /> {/* Renders the navigation bar at the top of all pages */}
      <div className="App">
        {/* Routes define the mapping between URL paths and components */}
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/search" element={<Search />} /> 
          <Route path="/pokemon/:name" element={<PokemonDetails />} /> 
          <Route path="/favorites" element={<FavoritesList />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Export the App component to be used in index.js
