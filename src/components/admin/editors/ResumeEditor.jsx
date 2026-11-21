import React, { useRef, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import {
  FileText,
  Upload,
  Link,
  Check,
  Trash2,
  ExternalLink,
  Sparkles,
  Eye,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const ResumeEditor = () => {
  const { draftData, updateDraft, setIsResumeModalOpen } = usePortfolio();
  const profile = draftData?.profile || {};
  const resume = profile?.resume || {};
  const resumeUrl = resume?.url || profile?.resumeUrl || '';

  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const updateResumeField = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        resume: {
          ...(prev.profile?.resume || {}),
          [field]: value
        },
        // Keep resumeUrl in sync
        ...(field === 'url' ? { resumeUrl: value } : {})
      }
    }));
  };

  // Direct Laptop File Upload Handler for Resume
  const handleFileUpload = (file) => {
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      alert('Please upload a PDF file or an Image file (PNG, JPG, JPEG).');
      return;
    }

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please upload an optimized PDF or document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      updateDraft(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          resumeUrl: base64Data,
          resume: {
            ...(prev.profile?.resume || {}),
            url: base64Data,
            fileName: file.name,
            fileSize: `${sizeInMB} MB`,
            fileType: isPdf ? 'pdf' : 'image',
            uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            enabled: true
          }
        }
      }));

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
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    if (window.confirm('Are you sure you want to remove the current resume file?')) {
      updateDraft(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          resumeUrl: '',
          resume: {
            ...(prev.profile?.resume || {}),
            url: '',
            fileName: '',
            fileSize: '',
            fileType: '',
            uploadedAt: ''
          }
        }
      }));
    }
  };

  const hasLoadedResume = Boolean(resumeUrl && resumeUrl !== '#' && resumeUrl.length > 5);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Curriculum Vitae & Academic Resume
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Upload your PDF resume from your laptop, customize the wax-sealed folio card, or link to Google Drive.
          </p>
        </div>

        {uploadSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold animate-bounce">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Resume Updated Successfully!</span>
          </div>
        )}
      </div>

      {/* Main Upload Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-900 uppercase">
            <FileText className="w-4 h-4 text-purple-700" />
            <span>1. Laptop File Upload</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-700">
            <input
              type="checkbox"
              checked={resume.enabled !== false}
              onChange={(e) => updateResumeField('enabled', e.target.checked)}
              className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">Show Resume Button on Site</span>
          </label>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive
              ? 'border-purple-600 bg-purple-50/50 scale-[1.01]'
              : 'border-[#1A1714]/25 hover:border-[#1A1714] bg-[#FDFBF7]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf,image/png,image/jpeg,image/webp"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />

          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#DDD6FE] border-2 border-[#1A1714] shadow-scrapbook flex items-center justify-center">
              <Upload className="w-8 h-8 text-purple-900" />
            </div>

            <div>
              <h3 className="font-editorial text-lg font-bold text-slate-900">
                Drag & Drop Your Resume PDF Here
              </h3>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Supports PDF or Image documents directly from your laptop (up to 15MB)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-yellow-300" />
                <span>Choose PDF from Laptop</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Link className="w-4 h-4 text-slate-500" />
                <span>Or Cloud Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Optional External Link URL Input */}
        {showUrlInput && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
              External Document URL (Google Drive / OneDrive / Cloud PDF)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={resumeUrl.startsWith('data:') ? '' : resumeUrl}
                onChange={(e) => updateResumeField('url', e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none"
              />
              <button
                onClick={() => setShowUrlInput(false)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold hover:bg-slate-100"
              >
                Save
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              If pasting a Google Drive link, ensure link sharing is set to "Anyone with the link can view".
            </p>
          </div>
        )}

        {/* Current Active File Status Banner */}
        {hasLoadedResume && (
          <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-emerald-600/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-editorial font-bold text-emerald-950 text-sm">
                    {resume.fileName || "Uploaded Resume Document"}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    READY
                  </span>
                </div>
                <p className="text-xs font-mono text-emerald-800 mt-0.5">
                  {resume.fileSize ? `${resume.fileSize} • ` : ''}
                  {resume.uploadedAt ? `Updated ${resume.uploadedAt}` : 'Active for Visitors'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-400 text-emerald-950 text-xs font-mono font-bold hover:bg-emerald-50 flex items-center gap-1 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-700" />
                <span>Test View</span>
              </button>

              <button
                type="button"
                onClick={removeFile}
                className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                title="Remove current resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Presentation Customization */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-900 uppercase">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>2. Presentation Styling & Folio Text</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Button Title
            </label>
            <input
              type="text"
              value={resume.buttonText || 'Curriculum Vitae'}
              onChange={(e) => updateResumeField('buttonText', e.target.value)}
              placeholder="e.g. Curriculum Vitae"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Folio Subtitle / Tagline
            </label>
            <input
              type="text"
              value={resume.tagline || 'Official Academic & Technical Record'}
              onChange={(e) => updateResumeField('tagline', e.target.value)}
              placeholder="e.g. B.Tech CSE Sophomore • KLH Deemed to be University"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans focus:outline-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
