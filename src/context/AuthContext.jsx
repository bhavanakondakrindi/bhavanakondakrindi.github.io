import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext();

const LOCAL_ADMIN_KEY = 'bhavana_admin_auth_v1';
const DEFAULT_LOCAL_PASS = 'admin123'; // Default demo password for local offline mode

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
        }
        setAuthLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(true);
        } else {
          // If logged out from Supabase, check local storage
          checkLocalSession();
        }
      });

      return () => subscription.unsubscribe();
    } else {
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

    // Try Supabase first if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If Supabase authentication fails, fallback check for local admin fallback
          if (email === 'admin@portfolio.local' && password === DEFAULT_LOCAL_PASS) {
            const localUser = { email, role: 'admin', provider: 'local' };
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

    // Offline / Local admin mode
    // Allows admin access with admin credentials
    if (
      (email === 'bhavana' || email === 'admin' || email === 'admin@portfolio.local') &&
      (password === 'admin123' || password === 'bhavana2025' || password === 'admin')
    ) {
      const localUser = { email, role: 'admin', provider: 'local-demo' };
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

export const useAuth = () => useContext(AuthContext);
