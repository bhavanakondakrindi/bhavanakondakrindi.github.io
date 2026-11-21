import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { initialPortfolioData } from '../data/initialPortfolioData';
import {
  getPublishedData,
  getDraftData,
  saveDraftData,
  publishData,
  resetDraftToPublished,
  resetToInitialDefaults
} from '../lib/storage';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // Published data (what visitors see)
  const [publishedData, setPublishedData] = useState(initialPortfolioData);
  // Draft data (what admin edits)
  const [draftData, setDraftData] = useState(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'published'

  // Admin UI state
  const [activeAdminTab, setActiveAdminTab] = useState('overview');
  const [adminPreviewMode, setAdminPreviewMode] = useState(false);
  const [adminPreviewDevice, setAdminPreviewDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // Public interactive states
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('warm-editorial');

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const pub = await getPublishedData();
        const draft = await getDraftData();
        setPublishedData(pub);
        setDraftData(draft);
        if (pub?.appearance?.activeTheme) {
          setActiveThemeId(pub.appearance.activeTheme);
        }
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Sync theme changes with CSS variables
  useEffect(() => {
    const currentTheme =
      draftData?.appearance?.themes?.find(t => t.id === activeThemeId) ||
      publishedData?.appearance?.themes?.find(t => t.id === activeThemeId) ||
      initialPortfolioData.appearance.themes[0];

    if (currentTheme) {
      document.documentElement.style.setProperty('--bg-primary', currentTheme.bgPrimary);
      document.documentElement.style.setProperty('--bg-surface', currentTheme.bgSurface);
      document.documentElement.style.setProperty('--text-primary', currentTheme.textPrimary);
      document.documentElement.style.setProperty('--text-muted', currentTheme.textMuted);
      document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
    }
  }, [activeThemeId, draftData, publishedData]);

  // Update draft in admin
  const updateDraft = useCallback((updater) => {
    setDraftData(prev => {
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      setIsDirty(true);
      setSaveStatus('unsaved');
      return updated;
    });
  }, []);

  // Specific helper to update nested profile field
  const updateProfile = useCallback((field, value) => {
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  }, [updateDraft]);

  // Save current draft
  const handleSaveDraft = async () => {
    setSaveStatus('saving');
    try {
      await saveDraftData(draftData);
      setIsDirty(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return true;
    } catch (err) {
      console.error('Save draft failed:', err);
      setSaveStatus('error');
      return false;
    }
  };

  // Publish draft changes to public view
  const handlePublish = async () => {
    setSaveStatus('saving');
    try {
      const published = await publishData(draftData);
      setPublishedData(published);
      setIsDirty(false);
      setSaveStatus('published');

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => setSaveStatus('idle'), 4000);
      return true;
    } catch (err) {
      console.error('Publish failed:', err);
      setSaveStatus('error');
      return false;
    }
  };

  // Reset draft to current published state
  const handleDiscardChanges = async () => {
    const published = await resetDraftToPublished();
    setDraftData(published);
    setIsDirty(false);
    setSaveStatus('idle');
  };

  // Reset entire website to original defaults
  const handleResetToDefaults = async () => {
    const resetData = await resetToInitialDefaults();
    setPublishedData(resetData);
    setDraftData(resetData);
    setIsDirty(false);
    setSaveStatus('published');
  };

  return (
    <PortfolioContext.Provider
      value={{
        publishedData,
        draftData,
        isLoading,
        isDirty,
        saveStatus,
        activeAdminTab,
        setActiveAdminTab,
        adminPreviewMode,
        setAdminPreviewMode,
        adminPreviewDevice,
        setAdminPreviewDevice,
        activeProjectModal,
        setActiveProjectModal,
        isResumeModalOpen,
        setIsResumeModalOpen,
        activeThemeId,
        setActiveThemeId,
        updateDraft,
        updateProfile,
        saveDraft: handleSaveDraft,
        publish: handlePublish,
        discardChanges: handleDiscardChanges,
        resetToDefaults: handleResetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
