/* ──────────────────────────────────────────────────────────────
   useAppStore — Global application state (Zustand)
   Manages: current view, active language, sidebar state, etc.
   ────────────────────────────────────────────────────────────── */
import { create } from 'zustand';

/** Possible views: 'landing' | 'picker' | 'dev' | 'dsa-grid' | 'dsa-question' */
const useAppStore = create((set) => ({
  // Current top-level view
  view: 'landing',
  setView: (view) => set({ view }),

  // Dev-section active language id ('html', 'css', 'javascript', 'sql', 'git')
  activeLang: 'html',
  setActiveLang: (id) => set({ activeLang: id }),

  // Sidebar open/closed (desktop Dev section)
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Mobile sidebar / drawer
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  // DSA state
  dsaCategory: null,
  setDsaCategory: (catId) => set({ dsaCategory: catId }),
  dsaQuestion: null,
  setDsaQuestion: (qId) => set({ dsaQuestion: qId }),
  dsaApproach: 0,
  setDsaApproach: (idx) => set({ dsaApproach: idx }),

  // DSA filter view
  dsaFilterView: null, // null | filterId string | 'incomplete' | 'custom-questions'
  setDsaFilterView: (fv) => set({ dsaFilterView: fv }),
}));

export { useAppStore };
export default useAppStore;
