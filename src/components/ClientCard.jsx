import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  useChantiers,
  addChantierFirestore,
  deleteChantierFirestore,
  updateChantierFirestore
} from '../hooks/useChantiers';
import ChantierForm from './ChantierForm';

export default function ClientCard({ client, onDelete }) {
  const { user } = useAuth();
  const chantiers = useChantiers(client.id);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData]   = useState({ titre: '', date: '', fin: '', statut: '' });

  const startEdit = (ch) => {
    setEditingId(ch.id);
    setEditData({ titre: ch.titre, date: ch.date, fin: ch.fin, statut: ch.statut });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!user) return;
    await updateChantierFirestore(client.id, editingId, editData, user.uid);
    setEditingId(null);
  };

  const handleAdd = async (ch) => {
    if (!user) return;
    await addChantierFirestore(client.id, ch, user.uid);
  };

  const handleDelete = async (cid) => {
    if (!user) return;
    await deleteChantierFirestore(client.id, cid, user.uid);
  };

  return (
    <li style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{client.nom}</strong><br/>
          <small>{client.email}</small><br/>
          {client.telephone && <small>Téléphone : {client.telephone}</small>}<br/>
          {client.adresse   && <small>Adresse : {client.adresse}</small>}
        </div>
        <button onClick={() => onDelete(client.id)}>Supprimer client</button>
      </div>

      <h4 style={{ marginTop: '1rem' }}>Chantiers</h4>
      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {chantiers.map(ch => (
          <li key={ch.id} style={{ marginBottom: '0.5rem' }}>
            {editingId === ch.id ? (
              <form onSubmit={submitEdit}>
                <input
                  name="titre"
                  value={editData.titre}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="fin"
                  value={editData.fin}
                  onChange={handleChange}
                  required
                />
                <select
                  name="statut"
                  value={editData.statut}
                  onChange={handleChange}
                  required
                >
                  <option value="">Statut</option>
                  <option value="prévu">Prévu</option>
                  <option value="en cours">En cours</option>
                  <option value="terminé">Terminé</option>
                </select>
                <button type="submit">Valider</button>
                <button type="button" onClick={() => setEditingId(null)} style={{ marginLeft: '0.5rem' }}>
                  Annuler
                </button>
              </form>
            ) : (
              <>
                <strong>{ch.titre}</strong><br/>
                Début : {ch.date} – Fin : {ch.fin}<br/>
                Statut : {ch.statut}
                <button onClick={() => startEdit(ch)} style={{ marginLeft: '1rem' }}>✏️</button>
                <button onClick={() => handleDelete(ch.id)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <ChantierForm onAdd={handleAdd} />
    </li>
  );
}
