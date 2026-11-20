import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  FolderGit2,
  ExternalLink,
  Check,
  X,
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { Github } from '../../ui/BrandIcons';

export const ProjectsEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const projects = draftData?.projects || [];

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || 'proj-airline-disruption');

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const updateCurrentProject = (field, value) => {
    const updated = projects.map(p => {
      if (p.id === activeProject.id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    updateDraft(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProject = {
      id: newId,
      title: "New Practical Project",
      subtitle: "System Architecture & Engineering Implementation",
      category: "Software Application",
      featured: false,
      color: "#FEF9C3",
      accent: "#EAB308",
      summary: "A concise overview describing the practical problem solved by this project.",
      problemStatement: "Detail the technical challenge or user problem addressed.",
      objectives: [
        "Design modular software architecture",
        "Implement responsive interactive interface"
      ],
      features: [
        "Core feature description",
        "Interactive operations dashboard"
      ],
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
      implementationDetails: "Engineered using clean design patterns and structured data models.",
      challenges: "Key algorithmic or UI/UX challenges encountered and resolved.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "New Release"
    };

    updateDraft(prev => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
    setActiveProjectId(newId);
  };

  const deleteProject = (id) => {
    if (projects.length <= 1) {
      alert("You must keep at least one project in your portfolio.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this project dossier?")) {
      const updated = projects.filter(p => p.id !== id);
      updateDraft(prev => ({ ...prev, projects: updated }));
      if (activeProjectId === id && updated.length > 0) {
        setActiveProjectId(updated[0].id);
      }
    }
  };

  const moveProject = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    updateDraft(prev => ({ ...prev, projects: updated }));
  };

  // Array item helpers (for objectives, features, technologies)
  const handleArrayItemChange = (field, index, value) => {
    const currentArray = [...(activeProject[field] || [])];
    currentArray[index] = value;
    updateCurrentProject(field, currentArray);
  };

  const addArrayItem = (field, placeholderText = "New item") => {
    const currentArray = [...(activeProject[field] || [])];
    currentArray.push(placeholderText);
    updateCurrentProject(field, currentArray);
  };

  const removeArrayItem = (field, index) => {
    const currentArray = (activeProject[field] || []).filter((_, i) => i !== index);
    updateCurrentProject(field, currentArray);
  };

  const activeIndex = projects.findIndex(p => p.id === activeProject?.id);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Projects & System Dossiers
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Manage your horizontally scrollable showcase and immersive expanding dossier modals.
          </p>
        </div>

        <button
          onClick={addProject}
          className="px-4 py-2 rounded-xl bg-[#1E1E24] text-white text-xs font-mono font-bold shadow-scrapbook flex items-center gap-1.5 hover:bg-slate-800 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Project Selector Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b-2 border-slate-200">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setActiveProjectId(proj.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all ${
              activeProject?.id === proj.id
                ? 'bg-[#1E1E24] text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{idx + 1}. {proj.title.length > 20 ? proj.title.slice(0, 18) + '...' : proj.title}</span>
          </button>
        ))}
      </div>

      {/* Active Project Editor Card */}
      {activeProject && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-6">
          
          {/* Top Bar for active project: Move up/down, Delete */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500">
                Project Position: {activeIndex + 1} of {projects.length}
              </span>
              <button
                onClick={() => moveProject(activeIndex, 'up')}
                disabled={activeIndex === 0}
                className="p-1 rounded text-slate-500 hover:text-black disabled:opacity-30"
                title="Move Left / Earlier"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => moveProject(activeIndex, 'down')}
                disabled={activeIndex === projects.length - 1}
                className="p-1 rounded text-slate-500 hover:text-black disabled:opacity-30"
                title="Move Right / Later"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => deleteProject(activeProject.id)}
              className="text-xs font-mono text-rose-600 hover:text-rose-700 flex items-center gap-1 font-bold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Project</span>
            </button>
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={activeProject.title || ''}
                onChange={(e) => updateCurrentProject('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                value={activeProject.subtitle || ''}
                onChange={(e) => updateCurrentProject('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Category
              </label>
              <input
                type="text"
                value={activeProject.category || ''}
                onChange={(e) => updateCurrentProject('category', e.target.value)}
                placeholder="e.g. Web Application, AI & Simulation"
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Badge / Seal Label
              </label>
              <input
                type="text"
                value={activeProject.badge || ''}
                onChange={(e) => updateCurrentProject('badge', e.target.value)}
                placeholder="e.g. Featured System, AI Simulation"
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>
          </div>

          {/* Short Summary */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Short Card Summary
            </label>
            <textarea
              rows={2}
              value={activeProject.summary || ''}
              onChange={(e) => updateCurrentProject('summary', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
            />
          </div>

          {/* Image & Scrapbook Styling */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Screenshot / Image URL
              </label>
              <input
                type="text"
                value={activeProject.image || ''}
                onChange={(e) => updateCurrentProject('image', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Card Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeProject.color || '#FEF9C3'}
                  onChange={(e) => updateCurrentProject('color', e.target.value)}
                  className="w-8 h-8 rounded border border-black/20 cursor-pointer"
                />
                <span className="text-xs font-mono uppercase">{activeProject.color || '#FEF9C3'}</span>
              </div>
            </div>
          </div>

          {/* Problem Statement & Objectives */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Problem Statement (Expanded Modal)
              </label>
              <textarea
                rows={3}
                value={activeProject.problemStatement || ''}
                onChange={(e) => updateCurrentProject('problemStatement', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>

            {/* Objectives Array */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
                  Project Objectives
                </label>
                <button
                  onClick={() => addArrayItem('objectives', 'New core objective')}
                  className="text-xs font-mono text-purple-700 hover:underline flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3 h-3" /> Add Objective
                </button>
              </div>

              <div className="space-y-2">
                {activeProject.objectives?.map((obj, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">#{oIdx + 1}</span>
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => handleArrayItemChange('objectives', oIdx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-sans"
                    />
                    <button
                      onClick={() => removeArrayItem('objectives', oIdx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Array */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
                  Implemented Features
                </label>
                <button
                  onClick={() => addArrayItem('features', 'New implemented feature')}
                  className="text-xs font-mono text-purple-700 hover:underline flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3 h-3" /> Add Feature
                </button>
              </div>

              <div className="space-y-2">
                {activeProject.features?.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">✓</span>
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleArrayItemChange('features', fIdx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-sans"
                    />
                    <button
                      onClick={() => removeArrayItem('features', fIdx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Tags */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
                  Technologies Used
                </label>
                <button
                  onClick={() => addArrayItem('technologies', 'Tech')}
                  className="text-xs font-mono text-purple-700 hover:underline flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3 h-3" /> Add Tech
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeProject.technologies?.map((tech, tIdx) => (
                  <div key={tIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 text-xs font-mono">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleArrayItemChange('technologies', tIdx, e.target.value)}
                      className="w-20 bg-transparent focus:outline-none font-semibold text-slate-800"
                    />
                    <button
                      onClick={() => removeArrayItem('technologies', tIdx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Details & Challenges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Implementation Details
                </label>
                <textarea
                  rows={3}
                  value={activeProject.implementationDetails || ''}
                  onChange={(e) => updateCurrentProject('implementationDetails', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-sans focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Challenges & Learnings
                </label>
                <textarea
                  rows={3}
                  value={activeProject.challenges || ''}
                  onChange={(e) => updateCurrentProject('challenges', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-sans focus:outline-none"
                />
              </div>
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={activeProject.githubUrl || ''}
                  onChange={(e) => updateCurrentProject('githubUrl', e.target.value)}
                  placeholder="https://github.com/bhavanakondakrindi/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Live Demo URL (Leave blank if local simulation)
                </label>
                <input
                  type="text"
                  value={activeProject.demoUrl || ''}
                  onChange={(e) => updateCurrentProject('demoUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
