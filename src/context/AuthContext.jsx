import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext();

const LOCAL_ADMIN_KEY = 'bhavana_admin_auth_v1';
const DEFAULT_LOCAL_PASS = 'admin123'; // Permitted for offline development only

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // 1. Check Supabase session if configured
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(true);
        } else if (import.meta.env.DEV) {
          // In local dev, allow checking cached local session
          checkLocalSession();
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setAuthLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(true);
        } else {
          if (import.meta.env.DEV) {
            checkLocalSession();
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Offline mode before Supabase is configured
      checkLocalSession();
    }
  }, []);

  const checkLocalSession = () => {
    try {
      const savedAuth = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed);
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    setAuthLoading(true);

    // 1. Try Supabase Auth when configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Security: Only allow local backdoor in development environment
          if (import.meta.env.DEV && email === 'admin@portfolio.local' && password === DEFAULT_LOCAL_PASS) {
            const localUser = { email, role: 'admin', provider: 'local-dev' };
            localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(localUser));
            setUser(localUser);
            setIsAdmin(true);
            setAuthLoading(false);
            return { success: true };
          }
          throw error;
        }

        setUser(data.user);
        setIsAdmin(true);
        setAuthLoading(false);
        return { success: true };
      } catch (err) {
        setAuthError(err.message || 'Authentication failed');
        setAuthLoading(false);
        return { success: false, error: err.message };
      }
    }

    // 2. Offline / Local admin mode (Used prior to connecting Supabase)
    if (
      (email === 'bhavanakondakrindi26@gmail.com' || email === 'admin' || email === 'admin@portfolio.local') &&
      (password === 'admin123' || password === 'bhavana2026' || password === 'admin')
    ) {
      const localUser = { email, role: 'admin', provider: 'local-offline' };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(localUser));
      setUser(localUser);
      setIsAdmin(true);
      setAuthLoading(false);
      return { success: true };
    }

    setAuthError('Invalid administrator credentials.');
    setAuthLoading(false);
    return { success: false, error: 'Invalid administrator credentials.' };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        authLoading,
        authError,
        login,
        logout,
        isSupabaseConnected: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
