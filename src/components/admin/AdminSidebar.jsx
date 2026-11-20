import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Code2,
  FolderGit2,
  GraduationCap,
  Award,
  Mail,
  Palette,
  Sparkles,
  Zap,
  Image,
  Database,
  Eye
} from 'lucide-react';

export const AdminSidebar = () => {
  const { activeAdminTab, setActiveAdminTab, draftData } = usePortfolio();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero & Profile', icon: User },
    { id: 'about', label: 'About Me', icon: BookOpen },
    { id: 'skills', label: 'Technical Skills', icon: Code2, badge: draftData?.skills?.reduce((acc, c) => acc + (c.items?.length || 0), 0) },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: draftData?.projects?.length },
    { id: 'education', label: 'Education & CGPA', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements & Certs', icon: Award, badge: (draftData?.achievements?.length || 0) + (draftData?.certifications?.length || 0) },
    { id: 'contact', label: 'Contact Details', icon: Mail },
    { id: 'appearance', label: 'Appearance & Themes', icon: Palette },
    { id: 'scrapbook', label: 'Scrapbook Elements', icon: Sparkles },
    { id: 'animations', label: 'Animations', icon: Zap },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'settings', label: 'Supabase & Settings', icon: Database },
  ];

  return (
    <aside className="w-64 bg-white border-r-2 border-[#1E1E24] flex flex-col shrink-0 overflow-y-auto">
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-lg text-slate-800 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>CMS Workspace</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                isActive
                  ? 'bg-[#1E1E24] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </div>

              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info in Sidebar */}
      <div className="mt-auto p-4 border-t border-slate-200 text-[11px] font-mono text-slate-400">
        Bhavana Kondakrindi • v1.0
      </div>

    </aside>
  );
};
