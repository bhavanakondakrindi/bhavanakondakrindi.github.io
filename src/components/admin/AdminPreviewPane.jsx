import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Monitor, Tablet, Smartphone, Maximize2, RefreshCw } from 'lucide-react';
import { HeroSection } from '../public/HeroSection';
import { AboutSection } from '../public/AboutSection';
import { SkillsSection } from '../public/SkillsSection';
import { ProjectsSection } from '../public/ProjectsSection';
import { EducationSection } from '../public/EducationSection';
import { ContactSection } from '../public/ContactSection';
import { Footer } from '../public/Footer';

export const AdminPreviewPane = () => {
  const {
    draftData,
    adminPreviewDevice,
    setAdminPreviewDevice,
    activeAdminTab,
  } = usePortfolio();

  const [previewScope, setPreviewScope] = useState('full'); // 'full' | 'active-section'

  // Determine width based on simulated device
  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[375px] max-w-full',
  };

  return (
    <div className="w-full lg:w-[48%] xl:w-[50%] bg-slate-900 border-l-2 border-[#1E1E24] flex flex-col shrink-0 h-full overflow-hidden">
      
      {/* Top Preview Control Strip */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white">Live Draft Preview</span>
        </div>

        {/* Scope Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewScope(previewScope === 'full' ? 'active-section' : 'full')}
            className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[11px]"
          >
            Scope: {previewScope === 'full' ? 'Entire Site' : 'Current Section'}
          </button>
        </div>
      </div>

      {/* Simulated Device Frame Container */}
      <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-slate-900/90">
        <div
          className={`${deviceWidths[adminPreviewDevice]} transition-all duration-300 bg-[#FAF7F2] rounded-2xl border-4 border-slate-700 shadow-2xl overflow-y-auto max-h-full`}
        >
          {previewScope === 'full' ? (
            <div className="divide-y divide-black/5">
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <EducationSection />
              <ContactSection />
              <Footer />
            </div>
          ) : (
            <div>
              {activeAdminTab === 'hero' && <HeroSection />}
              {activeAdminTab === 'about' && <AboutSection />}
              {activeAdminTab === 'skills' && <SkillsSection />}
              {activeAdminTab === 'projects' && <ProjectsSection />}
              {activeAdminTab === 'education' && <EducationSection />}
              {activeAdminTab === 'achievements' && <EducationSection />}
              {activeAdminTab === 'contact' && <ContactSection />}
              {['overview', 'appearance', 'scrapbook', 'animations', 'media', 'settings'].includes(activeAdminTab) && (
                <div className="p-8 text-center">
                  <p className="font-editorial text-xl font-bold text-slate-800 mb-2">
                    Viewing Global Portfolio
                  </p>
                  <p className="text-xs font-mono text-slate-500 mb-6">
                    Changes to appearance, themes, and settings apply globally across all sections.
                  </p>
                  <HeroSection />
                  <SkillsSection />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
