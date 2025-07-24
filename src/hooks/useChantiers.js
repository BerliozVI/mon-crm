// src/hooks/useChantiers.js
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db }      from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

export function useChantiers(clientId) {
  const { user } = useAuth();
  const [chantiers, setChantiers] = useState([]);

  useEffect(() => {
    if (!user || !clientId) return;
    const col = collection(db, 'clients', user.uid, 'mesClients', clientId, 'chantiers');
    const unsub = onSnapshot(query(col), snap => {
      setChantiers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user, clientId]);

  return chantiers;
}

export async function addChantierFirestore(clientId, data, userUid) {
  await addDoc(
    collection(db, 'clients', userUid, 'mesClients', clientId, 'chantiers'),
    data
  );
}

export async function deleteChantierFirestore(clientId, chantierId, userUid) {
  await deleteDoc(
    doc(db, 'clients', userUid, 'mesClients', clientId, 'chantiers', chantierId)
  );
}

// Nouvelle fonction de mise à jour
export async function updateChantierFirestore(clientId, chantierId, data, userUid) {
  const ref = doc(db, 'clients', userUid, 'mesClients', clientId, 'chantiers', chantierId);
  await updateDoc(ref, data);
}
