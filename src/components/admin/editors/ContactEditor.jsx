import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Mail, MessageSquare } from 'lucide-react';
import { Github, Linkedin } from '../../ui/BrandIcons';

export const ContactEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const contact = draftData?.contactInfo || {};
  const profile = draftData?.profile || {};

  const handleContactChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
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
      
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Contact Channels & Dispatches
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Manage contact copy, email placeholder, and external profile URLs.
        </p>
      </div>

      {/* Copy and Headings */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Section Heading
          </label>
          <input
            type="text"
            value={contact.heading || ''}
            onChange={(e) => handleContactChange('heading', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Introductory Subtitle
          </label>
          <textarea
            rows={2}
            value={contact.subheading || ''}
            onChange={(e) => handleContactChange('subheading', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Friendly Closing Scrapbook Note
          </label>
          <textarea
            rows={2}
            value={contact.closingMessage || ''}
            onChange={(e) => handleContactChange('closingMessage', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
          />
        </div>
      </div>

      {/* Social & Channel URLs */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Profile Channels
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              <span>Contact Email Placeholder</span>
            </label>
            <input
              type="email"
              value={profile.socialLinks?.email || ''}
              onChange={(e) => handleSocialChange('email', e.target.value)}
              placeholder="bhavanakondakrindi@example.com"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-900" />
              <span>GitHub Profile URL</span>
            </label>
            <input
              type="text"
              value={profile.socialLinks?.github || ''}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              placeholder="https://github.com/bhavanakondakrindi"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="text"
              value={profile.socialLinks?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/bhavana-kondakrindi-26bb57379"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
