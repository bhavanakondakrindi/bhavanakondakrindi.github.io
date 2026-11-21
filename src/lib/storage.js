import { initialPortfolioData } from '../data/initialPortfolioData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY_PUBLISHED = 'bhavana_portfolio_published_v1';
const STORAGE_KEY_DRAFT = 'bhavana_portfolio_draft_v1';
const STORAGE_KEY_AUTH = 'bhavana_admin_session_v1';

export const getPublishedData = async () => {
  // If Supabase is available, attempt to fetch published version
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('content')
        .eq('version_type', 'published')
        .maybeSingle();

      if (!error && data?.content) {
        // Cache locally as fallback
        localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(data.content));
        return data.content;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local cache:', err);
    }
  }

  // Fallback to local storage
  try {
    const local = localStorage.getItem(STORAGE_KEY_PUBLISHED);
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed?.projects && parsed.projects.length < initialPortfolioData.projects.length) {
        parsed.projects = initialPortfolioData.projects;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error reading local published data:', e);
  }

  // Default initial data
  return initialPortfolioData;
};

export const getDraftData = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('content')
        .eq('version_type', 'draft')
        .maybeSingle();

      if (!error && data?.content) {
        localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(data.content));
        return data.content;
      }
    } catch (err) {
      console.warn('Supabase draft fetch error:', err);
    }
  }

  try {
    const local = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Error reading local draft data:', e);
  }

  // If no draft exists yet, initialize draft from published data
  return await getPublishedData();
};

export const saveDraftData = async (draft) => {
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draft));
  } catch (e) {
    console.error('Error saving local draft:', e);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({
          version_type: 'draft',
          content: draft,
          updated_at: new Date().toISOString()
        }, { onConflict: 'version_type' });

      if (error) throw error;
    } catch (err) {
      console.warn('Could not save draft to Supabase:', err);
    }
  }

  return true;
};

export const publishData = async (draft) => {
  const publishedVersion = {
    ...draft,
    lastPublishedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(publishedVersion));
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(publishedVersion));
  } catch (e) {
    console.error('Error saving published state locally:', e);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({
          version_type: 'published',
          content: publishedVersion,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'version_type' });

      if (error) throw error;
    } catch (err) {
      console.warn('Could not publish to Supabase:', err);
    }
  }

  return publishedVersion;
};

export const resetDraftToPublished = async () => {
  const published = await getPublishedData();
  await saveDraftData(published);
  return published;
};

export const resetToInitialDefaults = async () => {
  await publishData(initialPortfolioData);
  return initialPortfolioData;
};
