import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Your custom CSS for the dark theme

import NavbarComponent from './components/NavbarComponent';
import HomePage from './components/HomePage';
import Search from './components/Search';
import PokemonDetails from './components/PokemonDetails';
import FavoritesList from './components/FavoritesList';

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
          {/* Additional routes can be added here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
