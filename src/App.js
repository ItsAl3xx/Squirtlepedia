import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Your custom CSS for dark theme

import NavbarComponent from './components/NavbarComponent'; // Make sure you have this component
import HomePage from './components/HomePage'; // Make sure you have this component
import Search from './components/Search';
import PokemonDetails from './components/PokemonDetails'; // Make sure you have this component
import FavoritesList from './components/FavoritesList'; // Make sure you have this component

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;