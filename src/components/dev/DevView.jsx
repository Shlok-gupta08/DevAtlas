import { useEffect, useRef } from 'react';
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
            <DevSidebar activeLang={activeLang} onSwitchLang={setActiveLang} />
            <DevTopNav langData={langData} activeLang={activeLang} />
            <DevContent langData={langData} activeLang={activeLang} />
        </div>
    );
}
