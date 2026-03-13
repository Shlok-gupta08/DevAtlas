/* ──────────────────────────────────────────────────────────────
   useDSAStore — localStorage persistence for DSA progress,
   filters, custom questions, and personal notes (Zustand).
   Mirrors the original dsaStore.js API.
   ────────────────────────────────────────────────────────────── */
import { create } from 'zustand';

// ========== Storage keys ==========
const KEYS = {
  POSITION: 'devatlas_position',
  FILTERS: 'devatlas_dsa_filters',
  CUSTOM: 'devatlas_dsa_custom',
  NOTES: 'devatlas_dsa_notes',
};

function safeGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota */ }
}

// ========== Filter definitions (same as original) ==========
export const FILTER_DEFS = [
  {
    id: 'completed', label: 'Completed', icon: '✓', color: '#22c55e',
    desc: 'Understood the optimal logic and can write the code without notes.',
    levels: [
      { id: 'easy', label: 'Easy', desc: 'Solved it fast' },
      { id: 'medium', label: 'Medium', desc: 'Took some thought' },
      { id: 'hard', label: 'Hard', desc: 'Complex logic solved' },
    ],
  },
  {
    id: 'review', label: 'Review Later', icon: '⏳', color: '#f59e0b',
    desc: "Understand it now, but will likely forget the specific trick or pattern.",
    levels: null,
  },
  {
    id: 'revisit', label: 'Revisit', icon: '↻', color: '#f97316',
    desc: "Saw the solution and it made sense, but couldn't solve it independently.",
    levels: [
      { id: 'easy', label: 'Easy', desc: 'Syntax issues only' },
      { id: 'medium', label: 'Medium', desc: 'Logic gap' },
      { id: 'hard', label: 'Hard', desc: 'Concept was totally new' },
    ],
  },
  {
    id: 'in-progress', label: 'In Progress', icon: '◐', color: '#8b5cf6',
    desc: "Started reading or watching, but haven't finished the implementation.",
    levels: null,
  },
  {
    id: 'skipped', label: 'Skipped', icon: '—', color: '#ef4444',
    desc: 'Skipping for now to focus on more important topics.',
    levels: null,
  },
];

const useDSAStore = create((set, get) => ({
  // ── Reactivity versioning (triggers re-renders) ──
  _filterVersion: 0,
  _customVersion: 0,
  _noteVersion: 0,

  // ── Position tracking ──
  savePosition: (view, context) => {
    safeSet(KEYS.POSITION, { view, context, timestamp: Date.now() });
  },
  getPosition: () => safeGet(KEYS.POSITION),
  clearPosition: () => localStorage.removeItem(KEYS.POSITION),

  // ── Filters ──
  _getAllFilters: () => safeGet(KEYS.FILTERS) || {},

  getFilter: (catId, questionId) => {
    const all = safeGet(KEYS.FILTERS) || {};
    let val = all[catId + '::' + questionId] || null;
    if (val && !Array.isArray(val)) {
      val = [val];
      all[catId + '::' + questionId] = val;
      safeSet(KEYS.FILTERS, all);
    }
    return val;
  },

  hasFilter: (catId, questionId, filterId) => {
    const filters = get().getFilter(catId, questionId);
    if (!filters) return false;
    return filters.some((f) => f.filterId === filterId);
  },

  getFilterEntry: (catId, questionId, filterId) => {
    const filters = get().getFilter(catId, questionId);
    if (!filters) return null;
    return filters.find((f) => f.filterId === filterId) || null;
  },

  addFilter: (catId, questionId, filterId, level) => {
    const all = safeGet(KEYS.FILTERS) || {};
    const key = catId + '::' + questionId;
    let arr = all[key] || [];
    if (!Array.isArray(arr)) arr = [arr];
    arr = arr.filter((f) => f.filterId !== filterId);
    arr.push({ filterId, level: level || null });
    all[key] = arr;
    safeSet(KEYS.FILTERS, all);
    set((s) => ({ _filterVersion: s._filterVersion + 1 }));
  },

  removeFilter: (catId, questionId, filterId) => {
    const all = safeGet(KEYS.FILTERS) || {};
    const key = catId + '::' + questionId;
    let arr = all[key] || [];
    if (!Array.isArray(arr)) arr = [arr];
    arr = arr.filter((f) => f.filterId !== filterId);
    if (arr.length === 0) delete all[key];
    else all[key] = arr;
    safeSet(KEYS.FILTERS, all);
    set((s) => ({ _filterVersion: s._filterVersion + 1 }));
  },

  setFilterLevel: (catId, questionId, filterId, level) => {
    const all = safeGet(KEYS.FILTERS) || {};
    const key = catId + '::' + questionId;
    let arr = all[key] || [];
    if (!Array.isArray(arr)) arr = [arr];
    const entry = arr.find((f) => f.filterId === filterId);
    if (entry) entry.level = level;
    all[key] = arr;
    safeSet(KEYS.FILTERS, all);
    set((s) => ({ _filterVersion: s._filterVersion + 1 }));
  },

  getFilterLevel: (catId, questionId, filterId) => {
    const entry = get().getFilterEntry(catId, questionId, filterId);
    return entry ? entry.level : null;
  },

  getQuestionsByFilter: (filterId) => {
    const all = safeGet(KEYS.FILTERS) || {};
    const results = [];
    Object.keys(all).forEach((key) => {
      let arr = all[key];
      if (!Array.isArray(arr)) arr = [arr];
      arr.forEach((f) => {
        if (f.filterId === filterId) {
          const [catId, questionId] = key.split('::');
          results.push({ catId, questionId, level: f.level });
        }
      });
    });
    return results;
  },

  // ── Custom questions ──
  getAllCustomQuestions: () => safeGet(KEYS.CUSTOM) || {},

  getCustomQuestions: (catId) => {
    const all = safeGet(KEYS.CUSTOM) || {};
    return all[catId] || [];
  },

  addCustomQuestion: (catId, question) => {
    const all = safeGet(KEYS.CUSTOM) || {};
    if (!all[catId]) all[catId] = [];
    question.id = 'custom-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    question.isCustom = true;
    all[catId].push(question);
    safeSet(KEYS.CUSTOM, all);
    set((s) => ({ _customVersion: s._customVersion + 1 }));
    return question.id;
  },

  updateCustomQuestion: (catId, questionId, updatedData) => {
    const all = safeGet(KEYS.CUSTOM) || {};
    if (!all[catId]) return;
    for (let i = 0; i < all[catId].length; i++) {
      if (all[catId][i].id === questionId) {
        updatedData.id = questionId;
        updatedData.isCustom = true;
        all[catId][i] = updatedData;
        break;
      }
    }
    safeSet(KEYS.CUSTOM, all);
    set((s) => ({ _customVersion: s._customVersion + 1 }));
  },

  deleteCustomQuestion: (catId, questionId) => {
    const all = safeGet(KEYS.CUSTOM) || {};
    if (!all[catId]) return;
    all[catId] = all[catId].filter((q) => q.id !== questionId);
    if (all[catId].length === 0) delete all[catId];
    safeSet(KEYS.CUSTOM, all);
    const filters = safeGet(KEYS.FILTERS) || {};
    delete filters[catId + '::' + questionId];
    safeSet(KEYS.FILTERS, filters);
    set((s) => ({ _customVersion: s._customVersion + 1, _filterVersion: s._filterVersion + 1 }));
  },

  // ── Notes ──
  getNote: (catId, questionId) => {
    const all = safeGet(KEYS.NOTES) || {};
    return all[catId + '::' + questionId] || null;
  },

  saveNote: (catId, questionId, title, content) => {
    const all = safeGet(KEYS.NOTES) || {};
    const key = catId + '::' + questionId;
    if (!title && !content) delete all[key];
    else all[key] = { title: title || '', content: content || '', updated: Date.now() };
    safeSet(KEYS.NOTES, all);
    set((s) => ({ _noteVersion: s._noteVersion + 1 }));
  },
}));

export { useDSAStore };
export default useDSAStore;
