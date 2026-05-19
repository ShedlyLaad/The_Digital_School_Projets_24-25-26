import { useState, useEffect, useCallback } from 'react';
import { authService } from '../api/authApi';
import { adminAxios } from '../api/index';
import { isAdminAuthenticated as localIsAdminAuthenticated } from '../lib/utils';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier l'authentification au chargement (sessionStorage fallback)
    const checkAuth = () => {
      const authenticated = localIsAdminAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(username, password);

      // Supporter plusieurs formats de token retournés par le backend
      const data = response?.data || {};
      const token = data.token || data.access_token || data?.data?.token || null;

      if (token) {
        // Stocker le token en session pour que l'interceptor l'utilise
        sessionStorage.setItem('bigscreen_admin_token', token);
        // Définir aussi l'en-tête par défaut pour les requêtes immédiates
        try {
          adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (e) {
          // ignore
        }

        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      }

      const errorMessage = data.message || data.error || 'Identifiants incorrects';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Erreur lors de la connexion';
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    // Supprimer le token en session
    sessionStorage.removeItem('bigscreen_admin_token');
    try {
      delete adminAxios.defaults.headers.common['Authorization'];
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError
  };
}

