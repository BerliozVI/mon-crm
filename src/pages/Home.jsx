import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      gap: '1.5rem'
    }}>
      <h1>Bienvenue sur votre CRM Artisan</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/clients">
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>Clients & Chantiers</button>
        </Link>
        <Link to="/dashboard">
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>Tableau de Bord</button>
        </Link>
      </div>
    </div>
  );
}
