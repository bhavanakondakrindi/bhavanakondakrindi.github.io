import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Plus, Trash2, Award, GraduationCap, BookOpen, Bookmark } from 'lucide-react';

export const EducationEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const headings = draftData?.sectionHeadings || {};
  const education = draftData?.education || [];
  const achievements = draftData?.achievements || [];
  const certifications = draftData?.certifications || [];
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

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    updateDraft(prev => ({ ...prev, education: updated }));

    // If CGPA changed in education, sync to profile.cgpa as well
    if (field === 'cgpa') {
      updateDraft(prev => ({
        ...prev,
        profile: { ...prev.profile, cgpa: value }
      }));
    }
  };

  const addAchievement = () => {
    const newAch = {
      id: `ach-${Date.now()}`,
      title: "New Academic / Technical Milestone",
      issuer: "KLH Deemed to be University",
      category: "Academic",
      date: "Ongoing",
      description: "Brief summary of the milestone or recognition."
    };
    updateDraft(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAch]
    }));
  };

  const updateAchievement = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    updateDraft(prev => ({ ...prev, achievements: updated }));
  };

  const removeAchievement = (index) => {
    const updated = achievements.filter((_, i) => i !== index);
    updateDraft(prev => ({ ...prev, achievements: updated }));
  };

  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: "New Certification / Credential",
      issuer: "Issuing Organization",
      issueDate: "Ongoing",
      credentialUrl: ""
    };
    updateDraft(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
  };

  const updateCertification = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateDraft(prev => ({ ...prev, certifications: updated }));
  };

  const removeCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    updateDraft(prev => ({ ...prev, certifications: updated }));
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Education, CGPA & Milestones
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Keep your CGPA updated and log new achievements, hackathons, and certifications.
        </p>
      </div>

      {/* Section Headings Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <Bookmark className="w-4 h-4 text-purple-600" />
          <span>Chapter 04 Headings & Badge</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Chapter Badge Label
          </label>
          <input
            type="text"
            value={headings.educationBadge || ''}
            onChange={(e) => handleHeadingChange('educationBadge', e.target.value)}
            placeholder="Chapter 04 // Academics & Milestones"
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
              value={headings.educationTitleMain || ''}
              onChange={(e) => handleHeadingChange('educationTitleMain', e.target.value)}
              placeholder="Academic"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-editorial font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Heading Accent
            </label>
            <input
              type="text"
              value={headings.educationTitleAccent || ''}
              onChange={(e) => handleHeadingChange('educationTitleAccent', e.target.value)}
              placeholder="Standing"
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
            value={headings.educationSubtitle || ''}
            onChange={(e) => handleHeadingChange('educationSubtitle', e.target.value)}
            placeholder="Formal degree progression at KLH Deemed to be University..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
          />
        </div>
      </div>

      {/* University Record */}
      {education.map((edu, idx) => (
        <div key={edu.id || idx} className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
          
          <div className="flex items-center gap-2 text-purple-900 font-mono text-xs font-bold uppercase">
            <GraduationCap className="w-4 h-4 text-purple-700" />
            <span>Primary University Record</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Degree & Specialization
              </label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Current CGPA (Keep Editable) *
              </label>
              <input
                type="text"
                value={edu.cgpa || profile.cgpa || ''}
                onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)}
                placeholder="e.g. 9.5"
                className="w-full px-3.5 py-2 rounded-xl border-2 border-rose-300 bg-rose-50/40 text-sm font-mono font-bold text-rose-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Current Status
              </label>
              <input
                type="text"
                value={edu.status || ''}
                onChange={(e) => handleEducationChange(idx, 'status', e.target.value)}
                placeholder="Currently in 2nd Year (Undergraduate)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Academic Overview / Description
            </label>
            <textarea
              rows={2}
              value={edu.description || ''}
              onChange={(e) => handleEducationChange(idx, 'description', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-sans"
            />
          </div>

        </div>
      ))}

      {/* Achievements Manager */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Accomplishments ({achievements.length})</span>
          </div>

          <button
            onClick={addAchievement}
            className="px-3 py-1.5 rounded-lg bg-[#1E1E24] text-white text-xs font-mono font-bold flex items-center gap-1 hover:bg-slate-800"
          >
            <Plus className="w-3 h-3" />
            <span>Add Achievement</span>
          </button>
        </div>

        <div className="space-y-3">
          {achievements.map((ach, aIdx) => (
            <div key={ach.id || aIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={ach.title}
                  onChange={(e) => updateAchievement(aIdx, 'title', e.target.value)}
                  placeholder="Achievement title"
                  className="font-bold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none flex-1"
                />
                <button
                  onClick={() => removeAchievement(aIdx)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={ach.issuer}
                  onChange={(e) => updateAchievement(aIdx, 'issuer', e.target.value)}
                  placeholder="Issuer / Event"
                  className="px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  value={ach.category}
                  onChange={(e) => updateAchievement(aIdx, 'category', e.target.value)}
                  placeholder="Category (Academic, Engineering)"
                  className="px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                />
              </div>

              <textarea
                rows={2}
                value={ach.description}
                onChange={(e) => updateAchievement(aIdx, 'description', e.target.value)}
                placeholder="Description"
                className="w-full px-2 py-1 text-xs rounded border border-slate-300 bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Manager (Empty initially as instructed) */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-900 font-mono text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Certifications ({certifications.length})</span>
          </div>

          <button
            onClick={addCertification}
            className="px-3 py-1.5 rounded-lg bg-[#1E1E24] text-white text-xs font-mono font-bold flex items-center gap-1 hover:bg-slate-800"
          >
            <Plus className="w-3 h-3" />
            <span>Add Certification</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 text-center bg-slate-50/50">
            <p className="text-xs font-mono text-slate-500">
              No certifications entered yet. As you earn certifications, click "Add Certification" above to display them in your portfolio.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, cIdx) => (
              <div key={cert.id || cIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateCertification(cIdx, 'title', e.target.value)}
                    placeholder="Certification title"
                    className="font-bold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none flex-1"
                  />
                  <button
                    onClick={() => removeCertification(cIdx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cIdx, 'issuer', e.target.value)}
                    placeholder="Issuing Org (e.g. AWS, Oracle, Google)"
                    className="px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(cIdx, 'issueDate', e.target.value)}
                    placeholder="Date or Year"
                    className="px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
