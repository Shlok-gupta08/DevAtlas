import { useAppStore } from '../../store/useAppStore';
import { Menu, PanelLeft } from 'lucide-react';

export default function DSATopNav({ catConfig, currentQuestion, sidebarCollapsed, onToggleSidebar }) {
    const setView = useAppStore((s) => s.setView);

    return (
        <div className={`dsa-topnav ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <button className="dsa-sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
                {sidebarCollapsed ? <Menu size={18} /> : <PanelLeft size={18} />}
            </button>
            <div className="dsa-breadcrumb">
                <span className="bc-link" onClick={() => setView('dsa-grid')}>DSA</span>
                <span className="bc-sep">/</span>
                <span className="bc-link" onClick={() => setView('dsa-grid')}>
                    {catConfig?.name || 'Category'}
                </span>
                {currentQuestion && (
                    <>
                        <span className="bc-sep">/</span>
                        <span className="bc-current">{currentQuestion.title}</span>
                    </>
                )}
            </div>
        </div>
    );
}
