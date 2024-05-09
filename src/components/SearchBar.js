import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form className="d-flex mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Search Pokémon"
        className="mr-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline-light" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;