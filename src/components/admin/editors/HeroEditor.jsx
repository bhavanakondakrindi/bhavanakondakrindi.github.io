import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { User, Sparkles, Image, Link, GraduationCap } from 'lucide-react';

export const HeroEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const profile = draftData?.profile || {};

  const handleProfileChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        socialLinks: {
          ...prev.profile.socialLinks,
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Hero & Professional Profile
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Edit your cover typography, introductory deck, academic standing, and photograph.
        </p>
      </div>

      {/* Main Identity Form */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Role / Discipline *
            </label>
            <input
              type="text"
              value={profile.role || ''}
              onChange={(e) => handleProfileChange('role', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Hero Tagline / Deck
          </label>
          <input
            type="text"
            value={profile.tagline || ''}
            onChange={(e) => handleProfileChange('tagline', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
          />
        </div>

        {/* Professional Introduction */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Professional Introduction (Source of Truth)
          </label>
          <textarea
            rows={3}
            value={profile.intro || ''}
            onChange={(e) => handleProfileChange('intro', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
          />
        </div>

      </div>

      {/* University & Academic Credentials Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase">
          <GraduationCap className="w-4 h-4 text-amber-700" />
          <span>University Credentials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              University Name
            </label>
            <input
              type="text"
              value={profile.university || ''}
              onChange={(e) => handleProfileChange('university', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Current CGPA *
            </label>
            <input
              type="text"
              value={profile.cgpa || ''}
              onChange={(e) => handleProfileChange('cgpa', e.target.value)}
              placeholder="e.g. 9.5"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-mono font-bold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Academic Status
          </label>
          <input
            type="text"
            value={profile.educationStatus || ''}
            onChange={(e) => handleProfileChange('educationStatus', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
          />
        </div>
      </div>

      {/* Scrapbook Avatar & Photograph */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
          <Image className="w-4 h-4" />
          <span>Hero Polaroid Photograph</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          <div className="sm:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={profile.avatarUrl || ''}
                onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-mono focus:outline-none"
              />
              <p className="text-[11px] font-mono text-slate-500 mt-1">
                Tip: You can paste any image URL or upload one in the Media Library tab.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Polaroid Handwritten Caption
              </label>
              <input
                type="text"
                value={profile.avatarCaption || ''}
                onChange={(e) => handleProfileChange('avatarCaption', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>
          </div>

          {/* Image Preview */}
          <div className="border-2 border-[#1E1E24] rounded-xl p-2 bg-[#FAF7F2] text-center">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
              <img
                src={profile.avatarUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Live Polaroid Preview
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
