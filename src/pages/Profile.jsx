import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { updatePassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyAddress: '',
  });
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    getDoc(ref)
      .then(snap => {
        if (snap.exists()) setProfile(snap.data());
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleProfileChange = e =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const saveProfile = async e => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
      setMessage('Profil mis à jour.');
    } catch {
      setMessage('Erreur lors de la mise à jour du profil.');
    }
  };

  const handlePasswordChange = e =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const savePassword = async e => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await updatePassword(auth.currentUser, passwords.newPassword);
      setMessage('Mot de passe mis à jour.');
      setPasswords({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage('Erreur : ' + err.message);
    }
  };

  if (!user || loading) return <p>Chargement…</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/"><button>← Accueil</button></Link>
      <h1>Mon Profil</h1>
      {message && <p>{message}</p>}

      <form onSubmit={saveProfile} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Prénom</label><br/>
          <input
            name="firstName"
            value={profile.firstName}
            onChange={handleProfileChange}
            required
          />
        </div>
        <div>
          <label>Nom</label><br/>
          <input
            name="lastName"
            value={profile.lastName}
            onChange={handleProfileChange}
            required
          />
        </div>
        <div>
          <label>Nom de la société</label><br/>
          <input
            name="companyName"
            value={profile.companyName}
            onChange={handleProfileChange}
          />
        </div>
        <div>
          <label>Adresse de la société</label><br/>
          <input
            name="companyAddress"
            value={profile.companyAddress}
            onChange={handleProfileChange}
          />
        </div>
        <button type="submit">Mettre à jour le profil</button>
      </form>

      <h2>Changer le mot de passe</h2>
      <form onSubmit={savePassword}>
        <div>
          <label>Nouveau mot de passe</label><br/>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label>Confirmer le mot de passe</label><br/>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Mettre à jour le mot de passe</button>
      </form>
    </div>
  );
}
