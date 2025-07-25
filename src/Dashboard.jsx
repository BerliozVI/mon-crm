import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collectionGroup, query, onSnapshot } from 'firebase/firestore';

import { db } from './firebase';
import { useAuth } from './contexts/AuthContext';
import { useClients } from './hooks/useClients';

export default function Dashboard() {
  const { user } = useAuth();
  const clients  = useClients();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collectionGroup(db, 'chantiers'));
    const unsub = onSnapshot(q, snapshot => {
      const arr = snapshot.docs
        .map(docSnap => {
          const data = docSnap.data();
          const segments = docSnap.ref.path.split('/');
          const userId   = segments[1];
          const clientId = segments[3];
          return { id: docSnap.id, userId, clientId, ...data };
        })
        .filter(item => item.userId === user.uid)
        .map(item => {
          const cli = clients.find(c => c.id === item.clientId);
          return { ...item, clientName: cli ? cli.nom : '—' };
        });
      setList(arr);
    });

    return () => unsub();
  }, [user, clients]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/">
        <button style={{ marginBottom: '1rem' }}>← Accueil</button>
      </Link>
      <h1>Tableau de bord des chantiers</h1>

      {list.length === 0 ? (
        <p>Aucun chantier disponible.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: 'collapse', width: '100%' }}
        >
          <thead>
            <tr>
              <th>Client</th>
              <th>Titre</th>
              <th>Début</th>
              <th>Fin estimée</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.clientName}</td>
                <td>{item.titre}</td>
                <td>{item.date}</td>
                <td>{item.fin}</td>
                <td>{item.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
