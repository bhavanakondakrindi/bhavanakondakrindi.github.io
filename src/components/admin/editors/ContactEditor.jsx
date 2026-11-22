import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Mail, MessageSquare, Bookmark, Send, MapPin, GraduationCap } from 'lucide-react';
import { Github, Linkedin } from '../../ui/BrandIcons';

export const ContactEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const headings = draftData?.sectionHeadings || {};
  const contact = draftData?.contactInfo || {};
  const profile = draftData?.profile || {};

  const handleHeadingChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      sectionHeadings: {
        ...(prev.sectionHeadings || {}),
        [field]: value
      }
    }));
  };

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
          Manage contact headings, sender credentials, email, and social media URLs.
        </p>
      </div>

      {/* Chapter 05 Section Headings */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <Bookmark className="w-4 h-4 text-rose-600" />
          <span>Chapter 05 Headings & Badge</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Chapter Badge Label
          </label>
          <input
            type="text"
            value={headings.contactBadge || ''}
            onChange={(e) => handleHeadingChange('contactBadge', e.target.value)}
            placeholder="Chapter 05 // Air-Mail Dispatch & Direct Channels"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Heading Main
            </label>
            <input
              type="text"
              value={headings.contactTitleMain || ''}
              onChange={(e) => handleHeadingChange('contactTitleMain', e.target.value)}
              placeholder="Get In"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-editorial font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Heading Accent
            </label>
            <input
              type="text"
              value={headings.contactTitleAccent || ''}
              onChange={(e) => handleHeadingChange('contactTitleAccent', e.target.value)}
              placeholder="Touch"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-serif italic text-rose-600 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Section Subtitle
          </label>
          <textarea
            rows={2}
            value={headings.contactSubtitle || contact.subheading || ''}
            onChange={(e) => {
              handleHeadingChange('contactSubtitle', e.target.value);
              handleContactChange('subheading', e.target.value);
            }}
            placeholder="Whether you have questions about my projects, want to collaborate on engineering initiatives..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
          />
        </div>
      </div>

      {/* Return Dispatch Sender Details */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-[#1A1714]/20">
          <Send className="w-4 h-4 text-emerald-600" />
          <span>Air-Mail Return Dispatch // Sender Credentials</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Sender Name
          </label>
          <input
            type="text"
            value={headings.contactSenderTitle || ''}
            onChange={(e) => handleHeadingChange('contactSenderTitle', e.target.value)}
            placeholder="Bhavana Kondakrindi"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              University / Affiliation
            </label>
            <input
              type="text"
              value={headings.contactSenderUniv || ''}
              onChange={(e) => handleHeadingChange('contactSenderUniv', e.target.value)}
              placeholder="KLH Deemed to be University"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Location
            </label>
            <input
              type="text"
              value={headings.contactSenderLoc || ''}
              onChange={(e) => handleHeadingChange('contactSenderLoc', e.target.value)}
              placeholder="Hyderabad, India"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Social & Channel URLs */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Profile Channels
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              <span>Contact Email</span>
            </label>
            <input
              type="email"
              value={profile.socialLinks?.email || contact.email || ''}
              onChange={(e) => {
                handleSocialChange('email', e.target.value);
                handleContactChange('email', e.target.value);
              }}
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
              value={profile.socialLinks?.github || contact.github || ''}
              onChange={(e) => {
                handleSocialChange('github', e.target.value);
                handleContactChange('github', e.target.value);
              }}
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
              value={profile.socialLinks?.linkedin || contact.linkedin || ''}
              onChange={(e) => {
                handleSocialChange('linkedin', e.target.value);
                handleContactChange('linkedin', e.target.value);
              }}
              placeholder="https://linkedin.com/in/bhavana-kondakrindi-26bb57379"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
