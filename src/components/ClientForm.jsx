import React, { useState } from 'react';

function ClientForm({ onAdd }) {
  const [client, setClient] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
  });

  const handleChange = e =>
    setClient({ ...client, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const { nom, email, telephone, adresse } = client;
    if (nom && email) {
      onAdd(client);
      setClient({ nom: '', email: '', telephone: '', adresse: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        name="nom"
        placeholder="Nom"
        value={client.nom}
        onChange={handleChange}
        required
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={client.email}
        onChange={handleChange}
        required
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <input
        name="telephone"
        placeholder="Téléphone"
        value={client.telephone}
        onChange={handleChange}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <input
        name="adresse"
        placeholder="Adresse"
        value={client.adresse}
        onChange={handleChange}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>
        Ajouter client
      </button>
    </form>
  );
}

export default ClientForm;
