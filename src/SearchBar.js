import React, { useState } from 'react';
import './help.css';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='smile'>
    <input
      type="text"
      placeholder="Enter the Question..."
      value={query}
    />

    <button className="butt" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
