// src/components/NavbarComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">PokeApp</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/search">Search</Nav.Link>
        <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
