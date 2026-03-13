/* Shared config used across all components */

export const APP_TITLE = 'DevAtlas';
export const APP_TAGLINE = "Developer's Manual Reimagined";
export const APP_DESCRIPTION = 'The Centralized Library for all Code Syntax and Problems';

/* Languages for badges and marquee */
export const SUPPORTED_LANGUAGES = [
    { key: 'html', name: 'HTML', color: '#e44d26', svg: '<svg viewBox="0 0 24 24"><path fill="#e44d26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z"/><path fill="#f16529" d="M12 22.164l6.95-1.926L20.77 2.25H12v19.914z"/><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="Arial,sans-serif">5</text></svg>' },
    { key: 'css', name: 'CSS', color: '#264de4', svg: '<svg viewBox="0 0 24 24"><path fill="#264de4" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z"/><path fill="#2965f1" d="M12 22.164l6.95-1.926L20.77 2.25H12v19.914z"/><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="Arial,sans-serif">3</text></svg>' },
    { key: 'javascript', name: 'JavaScript', color: '#fbbf24', svg: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="2" fill="#fbbf24"/><text x="14.5" y="18" text-anchor="middle" fill="#000" font-size="11" font-weight="bold" font-family="Arial,sans-serif">JS</text></svg>' },
    { key: 'sql', name: 'SQL', color: '#38bdf8', svg: '<svg viewBox="0 0 24 24"><path fill="#38bdf8" d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 9c-4.42 0-8-1.34-8-3v3c0 1.68 3.58 3 8 3s8-1.32 8-3v-3c0 1.66-3.58 3-8 3zm0 5c-4.42 0-8-1.34-8-3v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 1.66-3.58 3-8 3z"/></svg>' },
    { key: 'git', name: 'Git', color: '#fb7185', svg: '<svg viewBox="0 0 24 24"><path fill="#fb7185" d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.06V8.783a1.838 1.838 0 01-.998-2.41L7.629 3.64.452 10.818a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.428-10.43a1.55 1.55 0 000-2.127z"/></svg>' },
    { key: 'cpp', name: 'C++ (DSA)', color: '#659ad2', svg: '<svg viewBox="0 0 24 24"><path fill="#659ad2" d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91z"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold" font-family="Arial,sans-serif">C++</text></svg>' }
];

/* Dev language categories for sidebar */
export const DEV_CATEGORIES = [
    { id: 'web', name: 'Web Development', langs: ['html', 'css', 'javascript'] },
    { id: 'data', name: 'Databases', langs: ['sql'] },
    { id: 'vcs', name: 'Version Control', langs: ['git'] },
];

/* Dev language accent colors */
export const LANG_COLORS = {
    html: '#fb923c',
    css: '#e879f9',
    javascript: '#fbbf24',
    sql: '#38bdf8',
    git: '#fb7185'
};

/* Dev language inline SVG icons */
export const LANG_ICONS = {
    html: '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fb923c" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
    css: '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#e879f9" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>',
    javascript: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="2" fill="#fbbf24" fill-opacity="0.18"/><path fill="#fbbf24" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.705-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
    sql: '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#38bdf8" d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 9c-4.42 0-8-1.34-8-3v3c0 1.68 3.58 3 8 3s8-1.32 8-3v-3c0 1.66-3.58 3-8 3zm0 5c-4.42 0-8-1.34-8-3v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 1.66-3.58 3-8 3z"/></svg>',
    git: '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fb7185" d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.06V8.783a1.838 1.838 0 01-.998-2.41L7.629 3.64.452 10.818a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.428-10.43a1.55 1.55 0 000-2.127z"/></svg>'
};

/* DSA category config — icon, color, data key */
export const DSA_CATEGORIES = [
    { id: 'math-bits', name: 'Math & Bits', icon: '🧮', color: '#fbbf24' },
    { id: 'arrays-matrices', name: 'Arrays & Matrices', icon: '📊', color: '#22c55e' },
    { id: 'searching-sorting', name: 'Searching & Sorting', icon: '🔍', color: '#38bdf8' },
    { id: 'strings', name: 'Strings', icon: '🔤', color: '#e879f9' },
    { id: 'recursion-backtracking', name: 'Recursion & Backtracking', icon: '🔁', color: '#f472b6' },
    { id: 'linked-lists', name: 'Linked Lists', icon: '🔗', color: '#fb923c' },
    { id: 'stacks-queues', name: 'Stacks & Queues', icon: '📚', color: '#a78bfa' },
    { id: 'greedy', name: 'Greedy', icon: '🎯', color: '#facc15' },
    { id: 'binary-trees', name: 'Binary Trees', icon: '🌲', color: '#34d399' },
    { id: 'bst', name: 'BST', icon: '🌳', color: '#4ade80' },
    { id: 'heaps', name: 'Heaps', icon: '⛰️', color: '#f87171' },
    { id: 'hashing-tries', name: 'Hashing & Tries', icon: '#️⃣', color: '#67e8f9' },
    { id: 'graphs', name: 'Graphs', icon: '🕸️', color: '#c084fc' },
    { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '🧩', color: '#fb7185' },
    { id: 'segment-trees', name: 'Segment Trees', icon: '🏗️', color: '#818cf8' },
];
