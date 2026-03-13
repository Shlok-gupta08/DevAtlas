import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useDSAStore } from '../../store/useDSAStore';
import { APP_TITLE, APP_TAGLINE, APP_DESCRIPTION, SUPPORTED_LANGUAGES } from '../../utils/constants';

/* Shuffle helper */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const NUM_MARQUEE_ROWS = 10;
const ICONS_PER_ROW = 18;
const BASE_DURATIONS = [80, 95, 72, 88, 68, 92, 75, 85, 98, 70];

export default function LandingPage() {
    const setView = useAppStore((s) => s.setView);
    const getPosition = useDSAStore((s) => s.getPosition);
    const position = getPosition();

    /* Compute continue label */
    const continueLabel = useMemo(() => {
        if (!position?.view || !position?.context) return null;
        if (position.view === 'dev') {
            return `Continue: Dev (${(position.context.langId || '').toUpperCase()}) →`;
        }
        if (position.view === 'dsa') {
            const catLabel = position.context.catId
                ? position.context.catId.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                : 'DSA';
            if (position.context.filterId) {
                const fl = position.context.filterId.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                return `Continue: DSA — ${fl} →`;
            }
            if (position.context.virtualFilter) {
                const vf = position.context.virtualFilter.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                return `Continue: DSA — ${vf} →`;
            }
            return `Continue: DSA (${catLabel}) →`;
        }
        return 'Continue Progress →';
    }, [position]);

    /* Handle continue progress */
    function handleContinue() {
        if (!position?.view || !position?.context) return;
        const store = useAppStore.getState();
        if (position.view === 'dsa') {
            if (position.context.virtualFilter) {
                store.setDsaFilterView(position.context.virtualFilter);
                store.setView('dsa-filtered');
            } else if (position.context.filterId) {
                store.setDsaFilterView(position.context.filterId);
                store.setDsaCategory(position.context.catId);
                store.setView('dsa-filtered');
            } else if (position.context.catId) {
                store.setDsaCategory(position.context.catId);
                if (position.context.questionId) {
                    store.setDsaQuestion(position.context.questionId);
                }
                store.setView('dsa-question');
            }
        } else if (position.view === 'dev' && position.context.langId) {
            store.setActiveLang(position.context.langId);
            store.setView('dev');
        }
    }

    /* Build marquee rows data once */
    const marqueeRows = useMemo(() => {
        return Array.from({ length: NUM_MARQUEE_ROWS }, (_, r) => {
            const shuffled = shuffle(SUPPORTED_LANGUAGES);
            const icons = Array.from({ length: ICONS_PER_ROW }, (_, i) => shuffled[i % shuffled.length]);
            return {
                icons: [...icons, ...icons],
                duration: BASE_DURATIONS[r % BASE_DURATIONS.length],
                direction: r % 2 === 0 ? 'scroll-left' : 'scroll-right',
            };
        });
    }, []);

    return (
        <div className="landing-overlay">
            {/* Marquee background — icon tiles matching original */}
            <div className="marquee-bg">
                {marqueeRows.map((row, ri) => (
                    <div
                        key={ri}
                        className={`marquee-row ${row.direction}`}
                        style={{ '--marquee-duration': `${row.duration}s` }}
                    >
                        {row.icons.map((lang, li) => (
                            <div
                                key={li}
                                className="marquee-icon"
                                dangerouslySetInnerHTML={{ __html: lang.svg }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Hero content */}
            <motion.div
                className="landing-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h1
                    className="landing-title"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    {APP_TITLE}
                </motion.h1>

                <motion.div
                    className="landing-tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    {APP_TAGLINE}
                </motion.div>

                <motion.p
                    className="landing-description"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    {APP_DESCRIPTION}
                </motion.p>
            </motion.div>

            {/* Language badges */}
            <motion.div
                className="landing-languages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
            >
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <div key={lang.key} className="lang-badge">
                        <span
                            style={{ display: 'inline-flex', width: 14, height: 14 }}
                            dangerouslySetInnerHTML={{ __html: lang.svg }}
                        />
                        {lang.name}
                    </div>
                ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
                className="landing-cta"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
            >
                <button className="landing-cta-btn" onClick={() => setView('picker')}>
                    Explore the Atlas
                </button>
                {continueLabel && (
                    <button className="landing-cta-btn landing-continue-btn" onClick={handleContinue}>
                        {continueLabel}
                    </button>
                )}
            </motion.div>
        </div>
    );
}
