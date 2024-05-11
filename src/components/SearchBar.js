import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

// Component for the search bar to filter Pokémon
const SearchBar = ({ onSearch }) => {
  // State to hold the search query input by the user
  const [query, setQuery] = useState('');

  // Function to handle the form submission, which triggers the search
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    onSearch(query); // Call the onSearch function passed as a prop with the current query
  };

  return (
    // Form setup with Bootstrap classes for styling
    <Form className="d-flex mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Search Pokémon" 
        className="mr-2" 
        value={query} // Value of the input tied to the state
        onChange={(e) => setQuery(e.target.value)} // Update the query state on every keystroke
      />
      <Button variant="outline-light" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar; 