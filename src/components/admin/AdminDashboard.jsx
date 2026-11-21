import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminPreviewPane } from './AdminPreviewPane';

// Editors
import { OverviewEditor } from './editors/OverviewEditor';
import { HeroEditor } from './editors/HeroEditor';
import { AboutEditor } from './editors/AboutEditor';
import { SkillsEditor } from './editors/SkillsEditor';
import { ProjectsEditor } from './editors/ProjectsEditor';
import { EducationEditor } from './editors/EducationEditor';
import { ContactEditor } from './editors/ContactEditor';
import { AppearanceEditor } from './editors/AppearanceEditor';
import { ScrapbookEditor } from './editors/ScrapbookEditor';
import { AnimationsEditor } from './editors/AnimationsEditor';
import { MediaLibraryEditor } from './editors/MediaLibraryEditor';
import { SupabaseSettingsEditor } from './editors/SupabaseSettingsEditor';

export const AdminDashboard = () => {
  const { activeAdminTab } = usePortfolio();
  const [showPreviewPane, setShowPreviewPane] = useState(true);

  const renderActiveEditor = () => {
    switch (activeAdminTab) {
      case 'overview':
        return <OverviewEditor />;
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'education':
      case 'achievements':
        return <EducationEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'appearance':
        return <AppearanceEditor />;
      case 'scrapbook':
        return <ScrapbookEditor />;
      case 'animations':
        return <AnimationsEditor />;
      case 'media':
        return <MediaLibraryEditor />;
      case 'settings':
        return <SupabaseSettingsEditor />;
      default:
        return <OverviewEditor />;
    }
  };

  return (
    <div className="fixed inset-0 z-[99990] bg-[#FAF7F2] flex flex-col overflow-hidden select-text">
      
      {/* Top Admin Header Bar */}
      <AdminHeader
        showPreviewPane={showPreviewPane}
        setShowPreviewPane={setShowPreviewPane}
      />

      {/* Main Multi-Column CMS Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Navigation) */}
        <AdminSidebar />

        {/* Middle Main Editing Workspace */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50/60 bg-graph-paper-fine">
          <div className="max-w-3xl mx-auto pb-16">
            {renderActiveEditor()}
          </div>
        </main>

        {/* Right Panel (Live Preview) */}
        {showPreviewPane && <AdminPreviewPane />}

      </div>

    </div>
  );
};
