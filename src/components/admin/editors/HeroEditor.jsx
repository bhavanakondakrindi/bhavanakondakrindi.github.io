import React, { useRef, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Upload, Image as ImageIcon, Check, Trash2, Link, Sparkles, GraduationCap } from 'lucide-react';

export const HeroEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const profile = draftData?.profile || {};
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

  // Direct Laptop File Upload Handler
  const handlePhotoUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
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
          Hero & Profile Identity
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Upload your personal photo directly from your laptop and configure your headlines.
        </p>
      </div>

      {/* Direct Laptop Photo Uploader (Primary Feature) */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
            <ImageIcon className="w-4 h-4" />
            <span>Personal Portrait Photograph</span>
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
              Current Cover Photo
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

            {/* Optional Web URL input */}
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

        {/* Photo Caption */}
        <div className="pt-3 border-t border-slate-200">
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Polaroid Handwritten Caption
          </label>
          <input
            type="text"
            value={profile.avatarCaption || ''}
            onChange={(e) => handleProfileChange('avatarCaption', e.target.value)}
            placeholder="e.g. Bhavana Kondakrindi • CSE @ KLH"
            className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none"
          />
        </div>

      </div>

      {/* Identity & Headings */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Discipline / Focus
            </label>
            <input
              type="text"
              value={profile.role || ''}
              onChange={(e) => handleProfileChange('role', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Tagline / Cover Deck
          </label>
          <input
            type="text"
            value={profile.tagline || ''}
            onChange={(e) => handleProfileChange('tagline', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Professional Introduction
          </label>
          <textarea
            rows={3}
            value={profile.intro || ''}
            onChange={(e) => handleProfileChange('intro', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-sans focus:outline-none"
          />
        </div>

      </div>

      {/* University & CGPA */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase">
          <GraduationCap className="w-4 h-4 text-amber-700" />
          <span>University Standing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              University
            </label>
            <input
              type="text"
              value={profile.university || ''}
              onChange={(e) => handleProfileChange('university', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              CGPA *
            </label>
            <input
              type="text"
              value={profile.cgpa || ''}
              onChange={(e) => handleProfileChange('cgpa', e.target.value)}
              placeholder="e.g. 9.5"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-rose-300 bg-rose-50/40 text-sm font-mono font-bold text-rose-900"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
