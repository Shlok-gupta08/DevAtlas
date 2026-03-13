/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* ── Design tokens matching the original DevAtlas palette ── */
      colors: {
        surface: {
          0: '#000000',
          1: '#0a0a0a',
          2: '#0f0f0f',
          3: '#141414',
          4: '#171717',
          5: '#1a1a1a',
          6: '#1e1e1e',
          7: '#262626',
          8: '#333333',
          9: '#404040',
        },
        text: {
          primary: '#fafafa',
          secondary: '#d4d4d8',
          muted: '#a3a3a3',
          dim: '#737373',
          faint: '#525252',
          ghost: '#404040',
          invisible: '#333333',
        },
        accent: {
          DEFAULT: '#facc15',
          html: '#fb923c',
          css: '#e879f9',
          javascript: '#fbbf24',
          sql: '#38bdf8',
          git: '#fb7185',
          cpp: '#659ad2',
          dsa: '#8b5cf6',
        },
        diff: {
          easy: '#22c55e',
          medium: '#eab308',
          hard: '#ef4444',
        },
        filter: {
          completed: '#22c55e',
          review: '#f59e0b',
          revisit: '#f97316',
          'in-progress': '#8b5cf6',
          skipped: '#ef4444',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Google Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Google Sans Code"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
