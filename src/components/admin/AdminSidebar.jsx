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
  ArrowLeft
} from 'lucide-react';

export const AdminSidebar = () => {
  const { activeAdminTab, setActiveAdminTab, draftData } = usePortfolio();

  const sections = [
    {
      group: 'PORTFOLIO CONTENT',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'hero', label: 'Profile & Laptop Photo', icon: User, highlight: true },
        { id: 'marquee', label: 'Yellow Moving Tape', icon: Sparkles, highlight: true },
        { id: 'about', label: 'About & Journal', icon: BookOpen },
        { id: 'skills', label: 'Technical Skills', icon: Code2, badge: draftData?.skills?.reduce((acc, c) => acc + (c.items?.length || 0), 0) },
        { id: 'projects', label: 'Projects & Case Files', icon: FolderGit2, badge: draftData?.projects?.length },
        { id: 'education', label: 'Education & CGPA', icon: GraduationCap },
        { id: 'contact', label: 'Contact Details', icon: Mail },
      ]
    },
    {
      group: 'VISUAL DESIGN & ACCENTS',
      items: [
        { id: 'appearance', label: 'Color Themes & Fonts', icon: Palette },
        { id: 'scrapbook', label: 'Scrapbook & Stickers', icon: Sparkles },
        { id: 'animations', label: 'Motion & Transitions', icon: Zap },
      ]
    },
    {
      group: 'ASSETS & BACKEND',
      items: [
        { id: 'media', label: 'Laptop Media Library', icon: Image },
        { id: 'settings', label: 'Supabase & Backup', icon: Database },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r-2 border-[#1A1714] flex flex-col shrink-0 overflow-y-auto">
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#FEF08A] rounded-lg border-2 border-[#1A1714] flex items-center justify-center font-editorial font-bold text-xs">
              BK
            </div>
            <div>
              <span className="font-editorial font-black text-sm text-[#1A1714] block leading-tight">
                Studio CMS
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Visual Editor
              </span>
            </div>
          </div>

          <a
            href="#/"
            className="text-[11px] font-mono font-bold text-slate-500 hover:text-black flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"
            title="Return to Public Site"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Site</span>
          </a>
        </div>
      </div>

      {/* Grouped Navigation */}
      <nav className="p-3 space-y-5">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-widest font-bold text-slate-400 px-3 py-1">
              {section.group}
            </div>

            {section.items.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-[#1A1714] text-white shadow-xs'
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
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-4 border-t border-slate-200 text-[11px] font-mono text-slate-400">
        Bhavana Kondakrindi CMS • v2.0
      </div>

    </aside>
  );
};
