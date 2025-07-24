import { useEffect, useState }     from 'react';
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db }                      from '../firebase';
import { useAuth }                 from '../contexts/AuthContext';

export function useClients() {
  const { user } = useAuth();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!user) return;
    const col = collection(db, 'clients', user.uid, 'mesClients');
    const unsub = onSnapshot(query(col), snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setClients(arr);
    });
    return () => unsub();
  }, [user]);

  return clients;
}

export async function addClientFirestore(data, userUid) {
  await addDoc(
    collection(db, 'clients', userUid, 'mesClients'),
    data
  );
}

export async function deleteClientFirestore(clientId, userUid) {
  await deleteDoc(
    doc(db, 'clients', userUid, 'mesClients', clientId)
  );
}
