import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home       from './pages/Home';
import App        from './App';
import Dashboard  from './Dashboard';
import Login      from './pages/Login';
import Register   from './pages/Register';

import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Page d’accueil publique */}
          <Route path="/" element={<Home />} />

          {/* Authentification */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages protégées */}
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
