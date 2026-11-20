import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Plus, Trash2, Edit2, Tag, Check, ArrowUp, ArrowDown } from 'lucide-react';

export const SkillsEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const categories = draftData?.skills || [];

  const [activeCatId, setActiveCatId] = useState(categories[0]?.id || 'cat-languages');

  const addCategory = () => {
    const newId = `cat-${Date.now()}`;
    const newCategory = {
      id: newId,
      category: "New Category",
      color: "#FEF08A",
      items: [
        { id: `skill-${Date.now()}`, name: "New Skill", level: "Core", notes: "Skill description" }
      ]
    };
    updateDraft(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newCategory]
    }));
    setActiveCatId(newId);
  };

  const removeCategory = (catId) => {
    if (window.confirm("Are you sure you want to delete this entire skill category?")) {
      const updated = categories.filter(c => c.id !== catId);
      updateDraft(prev => ({
        ...prev,
        skills: updated
      }));
      if (activeCatId === catId && updated.length > 0) {
        setActiveCatId(updated[0].id);
      }
    }
  };

  const updateCategoryProp = (catId, field, value) => {
    const updated = categories.map(c => {
      if (c.id === catId) {
        return { ...c, [field]: value };
      }
      return c;
    });
    updateDraft(prev => ({ ...prev, skills: updated }));
  };

  const addSkillToCategory = (catId) => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: "New Skill",
      level: "Proficient",
      notes: "Describe your experience or application with this skill."
    };

    const updated = categories.map(c => {
      if (c.id === catId) {
        return { ...c, items: [...(c.items || []), newSkill] };
      }
      return c;
    });
    updateDraft(prev => ({ ...prev, skills: updated }));
  };

  const updateSkill = (catId, skillId, field, value) => {
    const updated = categories.map(c => {
      if (c.id === catId) {
        const updatedItems = c.items.map(s => {
          if (s.id === skillId) {
            return { ...s, [field]: value };
          }
          return s;
        });
        return { ...c, items: updatedItems };
      }
      return c;
    });
    updateDraft(prev => ({ ...prev, skills: updated }));
  };

  const removeSkill = (catId, skillId) => {
    const updated = categories.map(c => {
      if (c.id === catId) {
        return { ...c, items: c.items.filter(s => s.id !== skillId) };
      }
      return c;
    });
    updateDraft(prev => ({ ...prev, skills: updated }));
  };

  const activeCategory = categories.find(c => c.id === activeCatId) || categories[0];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Technical Skills & Repertoire
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Manage categorized collectible skills. No percentage bars or arbitrary ratings.
          </p>
        </div>

        <button
          onClick={addCategory}
          className="px-3.5 py-2 rounded-xl bg-[#1E1E24] text-white text-xs font-mono font-bold shadow-scrapbook flex items-center gap-1.5 hover:bg-slate-800 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Category</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-slate-200 pb-3">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCatId(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeCatId === c.id
                ? 'bg-[#1E1E24] text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{c.category}</span>
            <span className="ml-1.5 opacity-60">({c.items?.length || 0})</span>
          </button>
        ))}
      </div>

      {/* Active Category Editor */}
      {activeCategory && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-6">
          
          {/* Category Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Category Title
              </label>
              <input
                type="text"
                value={activeCategory.category}
                onChange={(e) => updateCategoryProp(activeCategory.id, 'category', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
              />
            </div>

            <div className="flex items-end justify-between gap-3">
              <div className="flex-1">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                  Card Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeCategory.color || '#FEF08A'}
                    onChange={(e) => updateCategoryProp(activeCategory.id, 'color', e.target.value)}
                    className="w-8 h-8 rounded border border-black/20 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-600 uppercase">
                    {activeCategory.color || '#FEF08A'}
                  </span>
                </div>
              </div>

              {categories.length > 1 && (
                <button
                  onClick={() => removeCategory(activeCategory.id)}
                  className="px-3 py-2 rounded-xl text-rose-600 border border-rose-300 hover:bg-rose-50 text-xs font-mono font-bold"
                  title="Delete this Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Skills List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold text-slate-900">
                Skills in "{activeCategory.category}"
              </h3>
              <button
                onClick={() => addSkillToCategory(activeCategory.id)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-800 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.items?.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50/70 space-y-3 relative group hover:border-[#1E1E24] transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(activeCategory.id, skill.id, 'name', e.target.value)}
                      placeholder="Skill name"
                      className="font-editorial font-bold text-base text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-[#1E1E24] focus:outline-none w-full"
                    />

                    <button
                      onClick={() => removeSkill(activeCategory.id, skill.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-0.5">
                      Label / Level
                    </label>
                    <input
                      type="text"
                      value={skill.level || ''}
                      onChange={(e) => updateSkill(activeCategory.id, skill.id, 'level', e.target.value)}
                      placeholder="e.g. Core, Modern, Architecture"
                      className="w-full px-2 py-1 text-xs font-mono rounded border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-0.5">
                      Practical Application / Notes
                    </label>
                    <input
                      type="text"
                      value={skill.notes || ''}
                      onChange={(e) => updateSkill(activeCategory.id, skill.id, 'notes', e.target.value)}
                      placeholder="e.g. ES6+, interactive state, simulations"
                      className="w-full px-2 py-1 text-xs font-sans rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
