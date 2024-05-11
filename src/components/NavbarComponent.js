// Import necessary React and React-Router components for navigation
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Bootstrap components for styling and layout
import './Navbar.css'; // Import custom styles specific to the navbar

// Define a React functional component called NavbarComponent
const NavbarComponent = () => {
  return (
    // Create a responsive navigation bar with a dark theme
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Brand logo or name with a link to the home page, styled as bold and slightly larger font */}
        <Navbar.Brand as={Link} to="/" className="fs-4 fw-bold me-auto navbar-brand">
          SquirtlePedia
        </Navbar.Brand>
        {/* Toggle button for collapsible navigation bar on smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Collapsible element containing navigation links */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Navigation link to the Search page, with custom styling */}
            <Nav.Link as={Link} to="/search" className="fs-5 mx-3 nav-link-custom">
              Search
            </Nav.Link>
            {/* Navigation link to the Favorites page, with custom styling */}
            <Nav.Link as={Link} to="/favorites" className="fs-5 mx-3 nav-link-custom">
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent; // Export the NavbarComponent for use in other parts of the app
