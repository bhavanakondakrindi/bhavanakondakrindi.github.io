import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';

export const MediaLibraryEditor = () => {
  const [copiedUrl, setCopiedUrl] = useState('');
  const [customImages, setCustomImages] = useState([
    {
      id: 'media-1',
      title: 'Bhavana Avatar Placeholder',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      category: 'Profile'
    },
    {
      id: 'media-2',
      title: 'Airline Disruption Dashboard',
      url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
      category: 'Project'
    },
    {
      id: 'media-3',
      title: 'SkyRoute AI Drone Simulation',
      url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      category: 'Project'
    },
    {
      id: 'media-4',
      title: 'StudyForge Collaboration',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      category: 'Project'
    },
    {
      id: 'media-5',
      title: 'EcoQuest Sustainability',
      url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
      category: 'Project'
    },
    {
      id: 'media-6',
      title: 'Personal Finance Manager',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      category: 'Project'
    }
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMedia = {
        id: `media-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        url: reader.result,
        category: 'Uploaded'
      };
      setCustomImages([newMedia, ...customImages]);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2500);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Media Library & Assets
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Upload personal photos, project screenshots, and copy asset URLs to paste into fields.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2 rounded-xl bg-[#1E1E24] hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-scrapbook flex items-center gap-1.5 cursor-pointer shrink-0">
          <Upload className="w-4 h-4 text-yellow-300" />
          <span>Upload New Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customImages.map((media) => (
          <div
            key={media.id}
            className="bg-white rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-video bg-slate-100 overflow-hidden relative border-b border-slate-200">
              <img
                src={media.url}
                alt={media.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                {media.category}
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="font-editorial font-bold text-sm text-slate-900 truncate">
                {media.title}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleCopy(media.url)}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-mono flex items-center gap-1 text-slate-700 hover:bg-slate-50"
                >
                  {copiedUrl === media.url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                {media.category === 'Uploaded' && (
                  <button
                    onClick={() => setCustomImages(customImages.filter(i => i.id !== media.id))}
                    className="p-1 rounded text-rose-500 hover:text-rose-700"
                    title="Remove from local library"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
