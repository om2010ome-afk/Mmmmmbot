import { create } from 'zustand';
import type { FontFile, OpenTypeFeature, FontJob, Page, User } from '../types';

interface AppState {
  // Navigation
  currentPage: Page;
  setPage: (page: Page) => void;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Font
  currentFont: FontFile | null;
  fonts: FontFile[];
  setCurrentFont: (font: FontFile | null) => void;
  addFont: (font: FontFile) => void;
  updateFont: (id: string, updates: Partial<FontFile>) => void;
  removeFont: (id: string) => void;

  // Features
  detectedFeatures: OpenTypeFeature[];
  selectedFeatures: string[];
  setDetectedFeatures: (features: OpenTypeFeature[]) => void;
  toggleFeature: (tag: string) => void;
  selectAllFeatures: () => void;
  clearSelectedFeatures: () => void;

  // Jobs
  jobs: FontJob[];
  currentJob: FontJob | null;
  addJob: (job: FontJob) => void;
  updateJob: (id: string, updates: Partial<FontJob>) => void;
  setCurrentJob: (job: FontJob | null) => void;

  // Font URL for preview
  fontPreviewUrl: string | null;
  setFontPreviewUrl: (url: string | null) => void;

  // Lab settings
  labText: string;
  labFontSize: number;
  labLineHeight: number;
  labLetterSpacing: number;
  labDirection: 'rtl' | 'ltr';
  labTextColor: string;
  labBgColor: string;
  setLabText: (text: string) => void;
  setLabFontSize: (size: number) => void;
  setLabLineHeight: (height: number) => void;
  setLabLetterSpacing: (spacing: number) => void;
  setLabDirection: (dir: 'rtl' | 'ltr') => void;
  setLabTextColor: (color: string) => void;
  setLabBgColor: (color: string) => void;

  // Splash
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
}

export const useStore = create<AppState>((set, _get) => ({
  // Navigation
  currentPage: 'splash',
  setPage: (page) => set({ currentPage: page }),

  // Auth
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true, currentPage: 'dashboard' }),
  logout: () => set({ user: null, isAuthenticated: false, currentPage: 'landing' }),

  // Font
  currentFont: null,
  fonts: [],
  setCurrentFont: (font) => set({ currentFont: font }),
  addFont: (font) => set((state) => ({ fonts: [...state.fonts, font] })),
  updateFont: (id, updates) => set((state) => ({
    fonts: state.fonts.map((f) => f.id === id ? { ...f, ...updates } : f),
    currentFont: state.currentFont?.id === id ? { ...state.currentFont, ...updates } : state.currentFont,
  })),
  removeFont: (id) => set((state) => ({
    fonts: state.fonts.filter((f) => f.id !== id),
    currentFont: state.currentFont?.id === id ? null : state.currentFont,
  })),

  // Features
  detectedFeatures: [],
  selectedFeatures: [],
  setDetectedFeatures: (features) => set({ detectedFeatures: features }),
  toggleFeature: (tag) => set((state) => ({
    selectedFeatures: state.selectedFeatures.includes(tag)
      ? state.selectedFeatures.filter((t) => t !== tag)
      : [...state.selectedFeatures, tag],
  })),
  selectAllFeatures: () => set((state) => ({
    selectedFeatures: state.detectedFeatures.filter(f => f.canFreeze).map(f => f.tag),
  })),
  clearSelectedFeatures: () => set({ selectedFeatures: [] }),

  // Jobs
  jobs: [],
  currentJob: null,
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  updateJob: (id, updates) => set((state) => ({
    jobs: state.jobs.map((j) => j.id === id ? { ...j, ...updates } : j),
    currentJob: state.currentJob?.id === id ? { ...state.currentJob, ...updates } : state.currentJob,
  })),
  setCurrentJob: (job) => set({ currentJob: job }),

  // Font URL
  fontPreviewUrl: null,
  setFontPreviewUrl: (url) => set({ fontPreviewUrl: url }),

  // Lab settings
  labText: 'بسم الله الرحمن الرحيم\nThe quick brown fox jumps over the lazy dog\nمهندس الخطوط - FontEngineer\n0123456789',
  labFontSize: 48,
  labLineHeight: 1.6,
  labLetterSpacing: 0,
  labDirection: 'rtl',
  labTextColor: '#FFFFFF',
  labBgColor: '#0B0B0F',
  setLabText: (text) => set({ labText: text }),
  setLabFontSize: (size) => set({ labFontSize: size }),
  setLabLineHeight: (height) => set({ labLineHeight: height }),
  setLabLetterSpacing: (spacing) => set({ labLetterSpacing: spacing }),
  setLabDirection: (dir) => set({ labDirection: dir }),
  setLabTextColor: (color) => set({ labTextColor: color }),
  setLabBgColor: (color) => set({ labBgColor: color }),

  // Splash
  showSplash: true,
  setShowSplash: (show) => set({ showSplash: show }),
}));
