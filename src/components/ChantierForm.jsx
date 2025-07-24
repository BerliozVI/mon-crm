import React, { useState } from 'react';

function ChantierForm({ onAdd }) {
  const [chantier, setChantier] = useState({ titre: '', date: '', fin: '', statut: '' });
  const handleChange = e => setChantier({ ...chantier, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (chantier.titre && chantier.date && chantier.fin && chantier.statut) {
      onAdd(chantier);
      setChantier({ titre: '', date: '', fin: '', statut: '' });
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        name="titre"
        placeholder="Titre du chantier"
        value={chantier.titre}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={chantier.date}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fin"
        value={chantier.fin}
        onChange={handleChange}
        required
      />
      <select name="statut" value={chantier.statut} onChange={handleChange} required>
        <option value="">Statut</option>
        <option value="prévu">Prévu</option>
        <option value="en cours">En cours</option>
        <option value="terminé">Terminé</option>
      </select>
      <button type="submit" style={{ marginLeft: '0.5rem' }}>Ajouter chantier</button>
    </form>
  );
}

export default ChantierForm;
