// GRAVEL Theme Definitions & Design Token Dictionaries [F-UI-002]
import { ThemeConfig, ThemeId } from '../types';

export interface ThemeTokens {
  '--bg-canvas': string;
  '--bg-surface-primary': string;
  '--bg-surface-glass': string;
  '--bg-surface-muted': string;
  '--bg-surface-hover': string;
  '--bg-floating-bar': string;
  '--bg-floating-text': string;
  '--text-primary': string;
  '--text-secondary': string;
  '--text-muted': string;
  '--accent-primary': string;
  '--accent-subtle': string;
  '--accent-secondary': string;
  '--status-present': string;
  '--status-present-bg': string;
  '--status-absent': string;
  '--status-absent-bg': string;
  '--status-late': string;
  '--status-late-bg': string;
  '--tag-public-exam': string;
  '--tag-public-exam-bg': string;
  '--tag-tma-only': string;
  '--tag-tma-only-bg': string;
  '--border-hairline': string;
  '--card-radius': string;
  '--border-width': string;
  '--font-heading': string;
  '--font-body': string;
  '--font-mono': string;
}

export const THEMES_META: Record<ThemeId, ThemeConfig> = {
  'slate-light': {
    id: 'slate-light',
    name: 'Gravel Slate (Alabaster & Graphite)',
    design: 'Gravel Slate (Bento)',
    mode: 'light',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    primaryAccent: '#2563EB',
    cardRadius: '6px',
    fontHeading: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace"
  },
  'slate-dark': {
    id: 'slate-dark',
    name: 'Gravel Slate (Obsidian & Cyan Slate)',
    design: 'Gravel Slate (Bento)',
    mode: 'dark',
    canvasBg: '#090D16',
    surfaceBg: '#111827',
    primaryAccent: '#38BDF8',
    cardRadius: '6px',
    fontHeading: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace"
  },
  'paper-light': {
    id: 'paper-light',
    name: 'NIOS Paper (Parchment & Terracotta)',
    design: 'NIOS Academic Editorial',
    mode: 'light',
    canvasBg: '#FBF9F5',
    surfaceBg: '#FFFFFF',
    primaryAccent: '#C2410C',
    cardRadius: '12px',
    fontHeading: "'Newsreader', 'Merriweather', serif",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'IBM Plex Mono', monospace"
  },
  'paper-dark': {
    id: 'paper-dark',
    name: 'NIOS Paper (Midnight Library & Amber)',
    design: 'NIOS Academic Editorial',
    mode: 'dark',
    canvasBg: '#141210',
    surfaceBg: '#1F1C18',
    primaryAccent: '#F59E0B',
    cardRadius: '12px',
    fontHeading: "'Newsreader', 'Merriweather', serif",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'IBM Plex Mono', monospace"
  },
  'kinetic-light': {
    id: 'kinetic-light',
    name: 'Kinetic Pulse (Frost & Indigo Pulse)',
    design: 'Kinetic Pulse (OLED)',
    mode: 'light',
    canvasBg: '#F4F4F8',
    surfaceBg: '#FFFFFF',
    primaryAccent: '#4F46E5',
    cardRadius: '16px',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'Space Mono', monospace"
  },
  'kinetic-dark': {
    id: 'kinetic-dark',
    name: 'Kinetic Pulse (OLED Pitch & Neon Emerald)',
    design: 'Kinetic Pulse (OLED)',
    mode: 'dark',
    canvasBg: '#000000',
    surfaceBg: '#0C0C0E',
    primaryAccent: '#10B981',
    cardRadius: '16px',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'Space Mono', monospace"
  }
};

export const THEME_TOKEN_VALUES: Record<ThemeId, ThemeTokens> = {
  'slate-light': {
    '--bg-canvas': '#F8FAFC',
    '--bg-surface-primary': '#FFFFFF',
    '--bg-surface-glass': 'rgba(255, 255, 255, 0.92)',
    '--bg-surface-muted': '#F1F5F9',
    '--bg-surface-hover': '#EFF6FF',
    '--bg-floating-bar': '#0F172A',
    '--bg-floating-text': '#F8FAFC',
    '--text-primary': '#0F172A',
    '--text-secondary': '#475569',
    '--text-muted': '#94A3B8',
    '--accent-primary': '#2563EB',
    '--accent-subtle': '#DBEAFE',
    '--accent-secondary': '#6366F1',
    '--status-present': '#16A34A',
    '--status-present-bg': '#DCFCE7',
    '--status-absent': '#DC2626',
    '--status-absent-bg': '#FEE2E2',
    '--status-late': '#D97706',
    '--status-late-bg': '#FEF3C7',
    '--tag-public-exam': '#1D4ED8',
    '--tag-public-exam-bg': '#EFF6FF',
    '--tag-tma-only': '#7E22CE',
    '--tag-tma-only-bg': '#FAF5FF',
    '--border-hairline': '#E2E8F0',
    '--card-radius': '6px',
    '--border-width': '1px',
    '--font-heading': "'Plus Jakarta Sans', 'Inter', sans-serif",
    '--font-body': "'Inter', sans-serif",
    '--font-mono': "'JetBrains Mono', monospace"
  },
  'slate-dark': {
    '--bg-canvas': '#090D16',
    '--bg-surface-primary': '#111827',
    '--bg-surface-glass': 'rgba(17, 24, 39, 0.9)',
    '--bg-surface-muted': '#1E293B',
    '--bg-surface-hover': '#1E3A5F',
    '--bg-floating-bar': '#38BDF8',
    '--bg-floating-text': '#090D16',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#94A3B8',
    '--text-muted': '#64748B',
    '--accent-primary': '#38BDF8',
    '--accent-subtle': '#0C4A6E',
    '--accent-secondary': '#818CF8',
    '--status-present': '#4ADE80',
    '--status-present-bg': '#052E16',
    '--status-absent': '#F87171',
    '--status-absent-bg': '#450A0A',
    '--status-late': '#FBBF24',
    '--status-late-bg': '#451A03',
    '--tag-public-exam': '#60A5FA',
    '--tag-public-exam-bg': '#172554',
    '--tag-tma-only': '#C084FC',
    '--tag-tma-only-bg': '#3B0764',
    '--border-hairline': '#1E293B',
    '--card-radius': '6px',
    '--border-width': '1px',
    '--font-heading': "'Plus Jakarta Sans', 'Inter', sans-serif",
    '--font-body': "'Inter', sans-serif",
    '--font-mono': "'JetBrains Mono', monospace"
  },
  'paper-light': {
    '--bg-canvas': '#FBF9F5',
    '--bg-surface-primary': '#FFFFFF',
    '--bg-surface-glass': 'rgba(255, 255, 255, 0.94)',
    '--bg-surface-muted': '#F3EFE6',
    '--bg-surface-hover': '#EDE6D8',
    '--bg-floating-bar': '#292524',
    '--bg-floating-text': '#FBF9F5',
    '--text-primary': '#1C1917',
    '--text-secondary': '#57534E',
    '--text-muted': '#A8A29E',
    '--accent-primary': '#C2410C',
    '--accent-subtle': '#FFEDD5',
    '--accent-secondary': '#B45309',
    '--status-present': '#15803D',
    '--status-present-bg': '#DCFCE7',
    '--status-absent': '#B91C1C',
    '--status-absent-bg': '#FEE2E2',
    '--status-late': '#B45309',
    '--status-late-bg': '#FEF3C7',
    '--tag-public-exam': '#1E40AF',
    '--tag-public-exam-bg': '#DBEAFE',
    '--tag-tma-only': '#6B21A8',
    '--tag-tma-only-bg': '#F3E8FF',
    '--border-hairline': '#E7E0D3',
    '--card-radius': '12px',
    '--border-width': '1px',
    '--font-heading': "'Newsreader', 'Merriweather', serif",
    '--font-body': "'DM Sans', sans-serif",
    '--font-mono': "'IBM Plex Mono', monospace"
  },
  'paper-dark': {
    '--bg-canvas': '#141210',
    '--bg-surface-primary': '#1F1C18',
    '--bg-surface-glass': 'rgba(31, 28, 24, 0.92)',
    '--bg-surface-muted': '#292520',
    '--bg-surface-hover': '#36302A',
    '--bg-floating-bar': '#F59E0B',
    '--bg-floating-text': '#141210',
    '--text-primary': '#F5F5F4',
    '--text-secondary': '#A8A29E',
    '--text-muted': '#78716C',
    '--accent-primary': '#F59E0B',
    '--accent-subtle': '#451A03',
    '--accent-secondary': '#FB923C',
    '--status-present': '#4ADE80',
    '--status-present-bg': '#064E3B',
    '--status-absent': '#FCA5A5',
    '--status-absent-bg': '#7F1D1D',
    '--status-late': '#FCD34D',
    '--status-late-bg': '#78350F',
    '--tag-public-exam': '#93C5FD',
    '--tag-public-exam-bg': '#1E3A8A',
    '--tag-tma-only': '#D8B4FE',
    '--tag-tma-only-bg': '#581C87',
    '--border-hairline': '#2E2923',
    '--card-radius': '12px',
    '--border-width': '1px',
    '--font-heading': "'Newsreader', 'Merriweather', serif",
    '--font-body': "'DM Sans', sans-serif",
    '--font-mono': "'IBM Plex Mono', monospace"
  },
  'kinetic-light': {
    '--bg-canvas': '#F4F4F8',
    '--bg-surface-primary': '#FFFFFF',
    '--bg-surface-glass': 'rgba(255, 255, 255, 0.82)',
    '--bg-surface-muted': '#E4E4E7',
    '--bg-surface-hover': '#EEF2FF',
    '--bg-floating-bar': '#4F46E5',
    '--bg-floating-text': '#FFFFFF',
    '--text-primary': '#09090B',
    '--text-secondary': '#52525B',
    '--text-muted': '#A1A1AA',
    '--accent-primary': '#4F46E5',
    '--accent-subtle': '#EEF2FF',
    '--accent-secondary': '#EC4899',
    '--status-present': '#059669',
    '--status-present-bg': '#D1FAE5',
    '--status-absent': '#E11D48',
    '--status-absent-bg': '#FFE4E6',
    '--status-late': '#D97706',
    '--status-late-bg': '#FEF3C7',
    '--tag-public-exam': '#3B82F6',
    '--tag-public-exam-bg': '#EFF6FF',
    '--tag-tma-only': '#A855F7',
    '--tag-tma-only-bg': '#FAF5FF',
    '--border-hairline': '#D4D4D8',
    '--card-radius': '16px',
    '--border-width': '1.5px',
    '--font-heading': "'Space Grotesk', sans-serif",
    '--font-body': "'Inter', sans-serif",
    '--font-mono': "'Space Mono', monospace"
  },
  'kinetic-dark': {
    '--bg-canvas': '#000000',
    '--bg-surface-primary': '#0C0C0E',
    '--bg-surface-glass': 'rgba(18, 18, 22, 0.85)',
    '--bg-surface-muted': '#18181B',
    '--bg-surface-hover': '#1F2937',
    '--bg-floating-bar': '#10B981',
    '--bg-floating-text': '#000000',
    '--text-primary': '#FAFAFA',
    '--text-secondary': '#A1A1AA',
    '--text-muted': '#52525B',
    '--accent-primary': '#10B981',
    '--accent-subtle': '#064E3B',
    '--accent-secondary': '#A855F7',
    '--status-present': '#10B981',
    '--status-present-bg': '#052E16',
    '--status-absent': '#F43F5E',
    '--status-absent-bg': '#450A0A',
    '--status-late': '#F59E0B',
    '--status-late-bg': '#451A03',
    '--tag-public-exam': '#60A5FA',
    '--tag-public-exam-bg': '#172554',
    '--tag-tma-only': '#C084FC',
    '--tag-tma-only-bg': '#3B0764',
    '--border-hairline': '#27272A',
    '--card-radius': '16px',
    '--border-width': '1.5px',
    '--font-heading': "'Space Grotesk', sans-serif",
    '--font-body': "'Inter', sans-serif",
    '--font-mono': "'Space Mono', monospace"
  }
};

export function applyTheme(themeId: ThemeId): void {
  const root = document.documentElement;
  const tokens = THEME_TOKEN_VALUES[themeId];
  if (!tokens) return;

  for (const [prop, val] of Object.entries(tokens)) {
    root.style.setProperty(prop, val);
  }

  // Set color-scheme for native inputs / scrollbars
  const mode = THEMES_META[themeId].mode;
  root.style.colorScheme = mode;
  document.body.className = `theme-${themeId} mode-${mode}`;
}

