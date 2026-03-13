import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useDSAStore } from '../../store/useDSAStore';
import DevSidebar from './DevSidebar';
import DevTopNav from './DevTopNav';
import DevContent from './DevContent';
import { DevAtlasData } from '../../data/index';

/* Main Dev view — sidebar + top nav + scrollable content */
export default function DevView() {
    const activeLang = useAppStore((s) => s.activeLang);
    const setActiveLang = useAppStore((s) => s.setActiveLang);
    const savePosition = useDSAStore((s) => s.savePosition);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.innerWidth <= 768);

    /* Default to html if no lang selected */
    useEffect(() => {
        if (!activeLang) setActiveLang('html');
    }, [activeLang, setActiveLang]);

    const langData = DevAtlasData[activeLang];

    /* Save position for continue progress */
    useEffect(() => {
        if (activeLang) {
            savePosition('dev', { langId: activeLang });
        }
    }, [activeLang, savePosition]);

    return (
        <div data-lang={activeLang}>
            <DevSidebar
                activeLang={activeLang}
                onSwitchLang={setActiveLang}
                collapsed={sidebarCollapsed}
                onToggleCollapsed={setSidebarCollapsed}
            />
            <DevTopNav langData={langData} activeLang={activeLang} sidebarCollapsed={sidebarCollapsed} />
            <DevContent langData={langData} activeLang={activeLang} sidebarCollapsed={sidebarCollapsed} />
        </div>
    );
}
