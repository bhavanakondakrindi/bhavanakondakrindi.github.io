import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Verifies if an authenticated Supabase user is in the portfolio_admin_users allowlist.
   * Row Level Security ensures only true administrators can query this table.
   */
  const verifyAdminStatus = useCallback(async (authUser) => {
    if (!authUser || !supabase) {
      setUser(null);
      setIsAdmin(false);
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_admin_users')
        .select('user_id')
        .eq('user_id', authUser.id)
        .maybeSingle();

      if (!error && data?.user_id) {
        setUser(authUser);
        setIsAdmin(true);
        setAuthError(null);
        return true;
      } else {
        // Authenticated with Supabase, but not an approved administrator
        setUser(authUser);
        setIsAdmin(false);
        setAuthError('Access denied: You are logged in, but this account is not in the administrator allowlist.');
        return false;
      }
    } catch (err) {
      console.error('Error verifying admin authorization:', err);
      setUser(authUser);
      setIsAdmin(false);
      setAuthError('Unable to verify administrator permissions. Please check connection.');
      return false;
    }
  }, []);

  useEffect(() => {
    // If Supabase is not configured in environment, completely block admin entry
    if (!isSupabaseConfigured || !supabase) {
      setUser(null);
      setIsAdmin(false);
      setAuthLoading(false);
      return;
    }

    let isMounted = true;

    // Check active Supabase session on startup
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (!isMounted) return;

      if (error) {
        console.warn('Session retrieval error:', error.message);
        setUser(null);
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      if (session?.user) {
        await verifyAdminStatus(session.user);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    // Listen for auth state transitions (sign in, sign out, token refresh, session expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          await verifyAdminStatus(session.user);
        }
      } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setUser(null);
        setIsAdmin(false);
        setAuthError(null);
      }
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [verifyAdminStatus]);

  /**
   * Real, genuine Supabase Authentication login
   */
  const login = async (email, password) => {
    setAuthError(null);
    setAuthLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      const msg = 'Supabase credentials are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.';
      setAuthError(msg);
      setAuthLoading(false);
      return { success: false, error: msg };
    }

    const cleanEmail = email ? email.trim() : '';
    if (!cleanEmail || !password) {
      const msg = 'Please enter both your administrator email and password.';
      setAuthError(msg);
      setAuthLoading(false);
      return { success: false, error: msg };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
        return { success: false, error: error.message };
      }

      if (!data?.user) {
        const msg = 'Authentication failed: No user profile returned.';
        setAuthError(msg);
        setAuthLoading(false);
        return { success: false, error: msg };
      }

      // Check allowlist table
      const isAuthorized = await verifyAdminStatus(data.user);
      setAuthLoading(false);

      if (!isAuthorized) {
        // Sign out from Supabase if not on the administrator allowlist
        await supabase.auth.signOut();
        const msg = 'Access Denied: This account is authenticated but not registered in the administrator allowlist.';
        setAuthError(msg);
        return { success: false, error: msg };
      }

      return { success: true };
    } catch (err) {
      const msg = err.message || 'An unexpected authentication error occurred.';
      setAuthError(msg);
      setAuthLoading(false);
      return { success: false, error: msg };
    }
  };

  /**
   * Secure logout via Supabase Auth
   */
  const logout = async () => {
    setAuthLoading(true);
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error:', err);
      }
    }
    setUser(null);
    setIsAdmin(false);
    setAuthError(null);
    setAuthLoading(false);
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
