import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { DevAtlasData } from '../../data/index';
import { DEV_CATEGORIES, LANG_ICONS } from '../../utils/constants';

export default function DevSidebar({ activeLang, onSwitchLang }) {
    const setView = useAppStore((s) => s.setView);
    const [collapsed, setCollapsed] = useState(() => window.innerWidth <= 768);
    const [hoverReveal, setHoverReveal] = useState(false);

    const toggleSidebar = useCallback(() => {
        setCollapsed((prev) => {
            if (!prev) {
                // Collapsing — allow hover-reveal
                setHoverReveal(false);
            }
            return !prev;
        });
    }, []);

    /* Hover-zone reveals sidebar when collapsed */
    useEffect(() => {
        if (!collapsed) return;
        const zone = document.getElementById('sidebar-hover-zone-react');
        if (!zone) return;
        const enter = () => setHoverReveal(true);
        zone.addEventListener('mouseenter', enter);
        return () => zone.removeEventListener('mouseenter', enter);
    }, [collapsed]);

    const sidebarClasses = [
        collapsed ? 'collapsed' : '',
        collapsed && hoverReveal ? 'hover-reveal' : '',
    ].filter(Boolean).join(' ');

    return (
        <>
            {/* Mobile overlay */}
            {!collapsed && (
                <div className="dev-sidebar-overlay" onClick={() => setCollapsed(true)} />
            )}

            {/* Hover zone for collapsed sidebar */}
            {collapsed && (
                <div
                    id="sidebar-hover-zone-react"
                    className="sidebar-hover-zone"
                    style={{ display: 'block' }}
                />
            )}

            {/* Toggle button */}
            <button
                className={`sidebar-toggle ${collapsed && !hoverReveal ? 'sidebar-collapsed' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                {collapsed ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" x2="21" y1="12" y2="12" />
                        <line x1="3" x2="21" y1="6" y2="6" />
                        <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M9 3v18" />
                    </svg>
                )}
            </button>

            {/* Sidebar */}
            <nav
                id="sidebar"
                className={sidebarClasses}
                onMouseLeave={() => { if (collapsed) setHoverReveal(false); }}
            >
                <div className="sidebar-logo" onClick={() => setView('landing')}>
                    <div className="sidebar-logo-title">📚 DevAtlas</div>
                    <div className="sidebar-logo-sub">Developer's manual reimagined</div>
                </div>

                <button className="sidebar-back-btn" onClick={() => setView('picker')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                    </svg>
                    Back to Sections
                </button>

                <div className="sidebar-nav">
                    {DEV_CATEGORIES.map((cat) => (
                        <div key={cat.id}>
                            <div className="sidebar-category">{cat.name}</div>
                            {cat.langs.map((langId) => {
                                const lang = DevAtlasData[langId];
                                if (!lang) return null;
                                return (
                                    <div
                                        key={langId}
                                        className={`sidebar-item ${activeLang === langId ? 'active' : ''}`}
                                        onClick={() => onSwitchLang(langId)}
                                    >
                                        <span
                                            className="lang-icon"
                                            dangerouslySetInnerHTML={{ __html: LANG_ICONS[langId] || '' }}
                                        />
                                        <span>{lang.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <a
                    href="https://github.com/Shlok-gupta08/DevAtlas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-github"
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>Shlok-gupta08</span>
                </a>
            </nav>
        </>
    );
}
