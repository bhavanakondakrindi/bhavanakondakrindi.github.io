import { initialPortfolioData } from '../data/initialPortfolioData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY_PUBLISHED = 'bhavana_portfolio_published_v1';
const STORAGE_KEY_DRAFT = 'bhavana_portfolio_draft_v1';
const STORAGE_KEY_AUTH = 'bhavana_admin_session_v1';

const sanitizePortfolioData = (parsed) => {
  if (!parsed) return parsed;
  if (parsed.projects && parsed.projects.length < initialPortfolioData.projects.length) {
    parsed.projects = initialPortfolioData.projects;
  }
  if (!parsed.appearance) parsed.appearance = {};
  if (!parsed.appearance.individualStickers) {
    parsed.appearance.individualStickers = initialPortfolioData.appearance.individualStickers;
  }
  // Sanitize 2025 out of any stickers
  if (parsed.appearance.individualStickers) {
    Object.keys(parsed.appearance.individualStickers).forEach((key) => {
      const s = parsed.appearance.individualStickers[key];
      if (s.date && s.date.includes('2025')) {
        s.date = s.date.replace(/2025/g, 'VERIFIED').replace(/\s*•\s*VERIFIED/, ' • VERIFIED').trim();
      }
      if (s.label && s.label.includes('2025')) {
        s.label = s.label.replace(/2025/g, '').trim();
      }
    });
  }
  // Ensure marqueeBanner exists with defaults
  if (!parsed.marqueeBanner) {
    parsed.marqueeBanner = initialPortfolioData.marqueeBanner;
  }
  return parsed;
};

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
        const sanitized = sanitizePortfolioData(data.content);
        localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(sanitized));
        return sanitized;
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
      const sanitized = sanitizePortfolioData(parsed);
      localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(sanitized));
      return sanitized;
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
        const sanitized = sanitizePortfolioData(data.content);
        localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch (err) {
      console.warn('Supabase draft fetch error:', err);
    }
  }

  try {
    const local = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (local) {
      const parsed = JSON.parse(local);
      const sanitized = sanitizePortfolioData(parsed);
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(sanitized));
      return sanitized;
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
