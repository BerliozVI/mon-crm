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

  // Ajouter un client Firestore
  const handleAddClient = (client) => {
    if (!user) return;
    addClientFirestore(client, user.uid);
  };

  // Supprimer un client Firestore
  const handleDeleteClient = (clientId) => {
    if (!user) return;
    deleteClientFirestore(clientId, user.uid);
  };

  // Filtrer les clients selon la recherche
  const filtered = clients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.telephone || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.adresse   || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>CRM Artisan – Clients</h1>

      {/* Navigation vers le dashboard */}
      <Link to="/dashboard">
        <button style={{ marginBottom: '1rem' }}>
          Voir le tableau de bord
        </button>
      </Link>

      {/* Barre de recherche */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Formulaire d’ajout de client */}
      <ClientForm onAdd={handleAddClient} />

      {/* Liste des clients */}
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
