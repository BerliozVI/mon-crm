import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import ClientForm from './components/ClientForm';
import ClientCard from './components/ClientCard';

import { useClients, addClientFirestore, deleteClientFirestore } from './hooks/useClients';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user } = useAuth();
  const clients = useClients();
  const [search, setSearch] = useState('');

  const handleAddClient = (client) => {
    if (!user) return;
    addClientFirestore(client, user.uid);
  };

  const handleDeleteClient = (clientId) => {
    if (!user) return;
    deleteClientFirestore(clientId, user.uid);
  };

  const filtered = clients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.telephone || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.adresse   || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/">
          <button>← Accueil</button>
        </Link>
        <Link to="/dashboard" style={{ marginLeft: '1rem' }}>
          <button>Voir le tableau de bord</button>
        </Link>
      </div>

      <h1>CRM Artisan – Clients</h1>

      <SearchBar value={search} onChange={setSearch} />

      <ClientForm onAdd={handleAddClient} />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(client => (
          <ClientCard
            key={client.id}
            client={client}
            onDelete={() => handleDeleteClient(client.id)}
          />
        ))}
      </ul>
    </div>
  );
}
