import React, { useRef, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { validateImageFile } from '../../../lib/security';
import {
  Upload,
  Image as ImageIcon,
  Check,
  Trash2,
  Link,
  Sparkles,
  GraduationCap,
  FileText,
  StickyNote,
  Compass,
  Code2,
  MousePointerClick
} from 'lucide-react';

export const HeroEditor = () => {
  const { draftData, updateDraft, setActiveAdminTab } = usePortfolio();
  const profile = draftData?.profile || {};
  const hero = draftData?.heroContent || {};

  const fileInputRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleProfileChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleHeroChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      heroContent: {
        ...(prev.heroContent || {}),
        [field]: value
      }
    }));
  };

  // Direct Laptop File Upload Handler
  const handlePhotoUpload = (file) => {
    const check = validateImageFile(file);
    if (!check.valid) {
      alert(check.error);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      handleProfileChange('avatarUrl', base64Data);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="font-editorial text-2xl font-black text-slate-900">
          Hero Section & Central Photo Desk
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Full CMS editing access for the central photo desk, the 4 surrounding notes, masthead, subtitles, and buttons.
        </p>
      </div>

      {/* =========================================================================
          1. THE 4 STICKY NOTES AROUND HERO PHOTO (User's #1 Highlighted Feature)
         ========================================================================= */}
      <div className="bg-[#FEFCE8] p-6 rounded-2xl border-3 border-[#1A1714] shadow-scrapbook-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-300">
          <div className="flex items-center gap-2.5 text-amber-950 font-mono text-xs font-bold uppercase tracking-wider">
            <StickyNote className="w-4 h-4 text-amber-700" />
            <span>4 Sticky Notes Around Central Photo Desk</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-400">
            Interactive Desk Elements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Note 1 (Top Left): Academic Log */}
          <div className="bg-white p-4 rounded-xl border-2 border-[#1A1714] shadow-scrapbook space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="text-[11px] font-mono font-bold text-rose-700 uppercase">
                Note 1 (Top Left // Academic Log)
              </span>
              <span className="text-[10px] font-mono text-slate-400">#log</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Tag</label>
                <input
                  type="text"
                  value={hero.note1Tag || ''}
                  onChange={(e) => handleHeroChange('note1Tag', e.target.value)}
                  placeholder="ACADEMIC LOG"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Title / University</label>
                <input
                  type="text"
                  value={hero.note1Title || ''}
                  onChange={(e) => handleHeroChange('note1Title', e.target.value)}
                  placeholder="KLH University"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Degree & Year Subtitle</label>
              <input
                type="text"
                value={hero.note1Subtitle || ''}
                onChange={(e) => handleHeroChange('note1Subtitle', e.target.value)}
                placeholder="CSE Sophomore (2nd Yr)"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">CGPA Label</label>
                <input
                  type="text"
                  value={hero.note1CgpaLabel || ''}
                  onChange={(e) => handleHeroChange('note1CgpaLabel', e.target.value)}
                  placeholder="CGPA:"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">CGPA Value</label>
                <input
                  type="text"
                  value={hero.note1CgpaValue || ''}
                  onChange={(e) => handleHeroChange('note1CgpaValue', e.target.value)}
                  placeholder="~9.5 / 10"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-rose-300 bg-rose-50 text-rose-900 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Note 2 (Bottom Left): Focus */}
          <div className="bg-white p-4 rounded-xl border-2 border-[#1A1714] shadow-scrapbook space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="text-[11px] font-mono font-bold text-blue-700 uppercase">
                Note 2 (Bottom Left // Technical Focus)
              </span>
              <span className="text-[10px] font-mono text-slate-400">#focus</span>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Tag Header</label>
              <input
                type="text"
                value={hero.note2Tag || ''}
                onChange={(e) => handleHeroChange('note2Tag', e.target.value)}
                placeholder="Focus: Systems & Web"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Description</label>
              <textarea
                rows={3}
                value={hero.note2Desc || ''}
                onChange={(e) => handleHeroChange('note2Desc', e.target.value)}
                placeholder="React.js dashboards, Python AI simulations & Java OOP."
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Note 3 (Top Right): Core Philosophy */}
          <div className="bg-white p-4 rounded-xl border-2 border-[#1A1714] shadow-scrapbook space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="text-[11px] font-mono font-bold text-amber-700 uppercase">
                Note 3 (Top Right // Core Philosophy)
              </span>
              <span className="text-[10px] font-mono text-slate-400">#philosophy</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Tag</label>
                <input
                  type="text"
                  value={hero.note3Tag || ''}
                  onChange={(e) => handleHeroChange('note3Tag', e.target.value)}
                  placeholder="CORE PHILOSOPHY"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Title</label>
                <input
                  type="text"
                  value={hero.note3Title || ''}
                  onChange={(e) => handleHeroChange('note3Title', e.target.value)}
                  placeholder="Practical Technology"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Quote</label>
              <textarea
                rows={2}
                value={hero.note3Quote || ''}
                onChange={(e) => handleHeroChange('note3Quote', e.target.value)}
                placeholder='"I believe in building working, user-centered software that solves real-world challenges."'
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs italic leading-relaxed"
              />
            </div>
          </div>

          {/* Note 4 (Bottom Right): Algorithmic Thinking */}
          <div className="bg-white p-4 rounded-xl border-2 border-[#1A1714] shadow-scrapbook space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
              <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase">
                Note 4 (Bottom Right // Algorithmic Thinking)
              </span>
              <span className="text-[10px] font-mono text-slate-400">#algorithms</span>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Tag Header</label>
              <input
                type="text"
                value={hero.note4Tag || ''}
                onChange={(e) => handleHeroChange('note4Tag', e.target.value)}
                placeholder=">_ Algorithmic Thinking"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Description</label>
              <textarea
                rows={3}
                value={hero.note4Desc || ''}
                onChange={(e) => handleHeroChange('note4Desc', e.target.value)}
                placeholder="Classical algorithms, data structures & pathfinding models."
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs leading-relaxed"
              />
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. CENTRAL POLAROID DESK & LAPTOP PHOTO UPLOAD
         ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
            <ImageIcon className="w-4 h-4" />
            <span>Central Polaroid Desk Photograph & Captions</span>
          </div>

          <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Laptop Upload Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Photo Preview Inset */}
          <div className="sm:col-span-4 flex flex-col items-center">
            <div className="relative w-36 h-44 rounded-xl border-2 border-[#1A1714] overflow-hidden bg-slate-100 shadow-scrapbook">
              <img
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                alt="Current Portrait Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-2 font-bold">
              Current Polaroid Photo
            </span>
          </div>

          {/* Upload Dropzone */}
          <div className="sm:col-span-8 space-y-3">
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 rounded-2xl border-2 border-dashed cursor-pointer text-center transition-all flex flex-col items-center justify-center ${
                dragActive
                  ? 'border-rose-600 bg-rose-50/60 scale-[1.01]'
                  : 'border-[#1A1714]/30 bg-slate-50 hover:bg-slate-100/80 hover:border-[#1A1714]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center justify-center mb-2">
                <Upload className="w-6 h-6 text-rose-600" />
              </div>

              <div className="font-editorial text-base font-bold text-slate-900">
                Click to Choose Photo from Laptop
              </div>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                or drag and drop your image file here (PNG, JPG, WEBP)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handlePhotoUpload(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>

            {uploadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Photo successfully loaded from your laptop! Live preview updated.</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-mono">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-bold"
              >
                <Link className="w-3 h-3" />
                <span>{showUrlInput ? 'Hide Web URL Option' : 'Or Paste Image URL Instead'}</span>
              </button>

              {profile.avatarUrl && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset photo back to placeholder?')) {
                      handleProfileChange('avatarUrl', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
                    }
                  }}
                  className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-bold"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Reset Photo</span>
                </button>
              )}
            </div>

            {showUrlInput && (
              <div className="pt-2">
                <input
                  type="text"
                  value={profile.avatarUrl || ''}
                  onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>
            )}

          </div>

        </div>

        {/* Polaroid Captions */}
        <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Polaroid Handwritten Caption
            </label>
            <input
              type="text"
              value={hero.polaroidCaption || profile.avatarCaption || ''}
              onChange={(e) => {
                handleHeroChange('polaroidCaption', e.target.value);
                handleProfileChange('avatarCaption', e.target.value);
              }}
              placeholder="e.g. Bhavana Kondakrindi • CSE 2nd Year @ KLH"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Polaroid Sub-Caption (Monospace Stamp)
            </label>
            <input
              type="text"
              value={hero.polaroidSubCaption || ''}
              onChange={(e) => handleHeroChange('polaroidSubCaption', e.target.value)}
              placeholder="e.g. KLH CSE • SOPHOMORE"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-mono uppercase focus:outline-none"
            />
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. HERO MASTHEAD & HEADINGS
         ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <FileText className="w-4 h-4 text-rose-600" />
          <span>Hero Masthead & Identity Copy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              First Name
            </label>
            <input
              type="text"
              value={hero.firstName || ''}
              onChange={(e) => handleHeroChange('firstName', e.target.value)}
              placeholder="Bhavana"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-serif font-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={hero.lastName || ''}
              onChange={(e) => handleHeroChange('lastName', e.target.value)}
              placeholder="Kondakrindi"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-serif font-black focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Handwritten Script Subtitle (Under Name)
          </label>
          <input
            type="text"
            value={hero.handwrittenSubtitle || ''}
            onChange={(e) => handleHeroChange('handwrittenSubtitle', e.target.value)}
            placeholder="creative developer portfolio & digital sketchbook"
            className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none text-rose-700 italic"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Issue Pill (Top Left Badge)
            </label>
            <input
              type="text"
              value={hero.issuePill || ''}
              onChange={(e) => handleHeroChange('issuePill', e.target.value)}
              placeholder="KLH Deemed to be University • Computer Science & Engineering"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-xs font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              CGPA Highlight Pill
            </label>
            <input
              type="text"
              value={hero.cgpaHighlight || ''}
              onChange={(e) => handleHeroChange('cgpaHighlight', e.target.value)}
              placeholder="CGPA ~9.5"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-rose-300 bg-rose-50/50 text-rose-900 text-xs font-mono font-bold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Tagline (Bold Summary Below Desk)
          </label>
          <input
            type="text"
            value={hero.tagline || profile.tagline || ''}
            onChange={(e) => {
              handleHeroChange('tagline', e.target.value);
              handleProfileChange('tagline', e.target.value);
            }}
            placeholder="Exploring code, designing interactive software & solving practical problems."
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans font-medium focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Introductory Paragraph
          </label>
          <textarea
            rows={3}
            value={hero.intro || profile.intro || ''}
            onChange={(e) => {
              handleHeroChange('intro', e.target.value);
              handleProfileChange('intro', e.target.value);
            }}
            placeholder="I am a Computer Science Engineering student interested in software development..."
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans leading-relaxed focus:outline-none"
          />
        </div>
      </div>

      {/* =========================================================================
          4. CALL TO ACTION BUTTONS
         ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <MousePointerClick className="w-4 h-4 text-emerald-600" />
          <span>Hero Call-to-Action Buttons</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Primary Button Label
            </label>
            <input
              type="text"
              value={hero.primaryBtnText || ''}
              onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
              placeholder="Explore Selected Projects"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-xs font-mono font-bold uppercase focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Secondary Button Label
            </label>
            <input
              type="text"
              value={hero.secondaryBtnText || ''}
              onChange={(e) => handleHeroChange('secondaryBtnText', e.target.value)}
              placeholder="Send a Direct Note"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-xs font-mono font-bold uppercase focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quick Access to Yellow Moving Tape Studio */}
      <div className="bg-[#FEF9C3] p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-300 border-2 border-[#1A1714] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-950" />
          </div>
          <div>
            <h4 className="font-editorial font-bold text-amber-950 text-base">
              Yellow Moving Ribbon Banner Tape
            </h4>
            <p className="text-xs font-mono text-amber-900">
              Customize text phrases, background & text colors, speed, and separator icons on the animated banner.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveAdminTab('marquee')}
          className="px-4 py-2.5 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold hover:bg-slate-800 transition-colors shadow-xs shrink-0 flex items-center gap-2"
        >
          <span>Open Moving Tape Studio</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
};
