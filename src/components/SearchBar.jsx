import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Rechercher un client..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ padding: '0.5rem', width: '100%' }}
      />
    </div>
  );
}

export default SearchBar;
