import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useDSAStore, FILTER_DEFS } from '../../store/useDSAStore';
import { DSAData } from '../../data/index';
import { DSA_CATEGORIES } from '../../utils/constants';

export default function DSACategoryGrid() {
    const setView = useAppStore((s) => s.setView);
    const setDsaCategory = useAppStore((s) => s.setDsaCategory);
    const setDsaFilterView = useAppStore((s) => s.setDsaFilterView);
    const getQuestionsByFilter = useDSAStore((s) => s.getQuestionsByFilter);
    const getAllCustomQuestions = useDSAStore((s) => s.getAllCustomQuestions);
    const hasFilter = useDSAStore((s) => s.hasFilter);
    const getFilterLevel = useDSAStore((s) => s.getFilterLevel);
    /* Subscribe to version counters for reactivity */
    const _fv = useDSAStore((s) => s._filterVersion);
    const _cv = useDSAStore((s) => s._customVersion);

    /* Compute per-category progress + difficulty counts */
    const catStats = useMemo(() => {
        const stats = {};
        DSA_CATEGORIES.forEach((cat) => {
            const data = DSAData[cat.id];
            if (!data) { stats[cat.id] = { total: 0, done: 0, custom: 0, easy: 0, medium: 0, hard: 0 }; return; }
            const questions = data.questions || [];
            let done = 0;
            let easy = 0, medium = 0, hard = 0;
            questions.forEach((q) => {
                if (hasFilter(cat.id, q.id, 'completed') && getFilterLevel(cat.id, q.id, 'completed') !== null) done++;
                if (q.difficulty === 'easy') easy++;
                else if (q.difficulty === 'medium') medium++;
                else if (q.difficulty === 'hard') hard++;
            });
            const customs = getAllCustomQuestions()[cat.id] || [];
            stats[cat.id] = { total: questions.length + customs.length, done, custom: customs.length, easy, medium, hard };
        });
        return stats;
    }, [hasFilter, getAllCustomQuestions, _fv, _cv]);

    /* Compute filter counts */
    const filterCounts = useMemo(() => {
        const counts = {};
        FILTER_DEFS.forEach((f) => {
            counts[f.id] = getQuestionsByFilter(f.id).length;
        });
        let incomplete = 0;
        DSA_CATEGORIES.forEach((cat) => {
            const data = DSAData[cat.id];
            if (!data) return;
            (data.questions || []).forEach((q) => {
                if (!hasFilter(cat.id, q.id, 'completed') || getFilterLevel(cat.id, q.id, 'completed') === null) incomplete++;
            });
            const customs = getAllCustomQuestions()[cat.id] || [];
            customs.forEach((cq) => {
                if (!hasFilter(cat.id, cq.id, 'completed') || getFilterLevel(cat.id, cq.id, 'completed') === null) incomplete++;
            });
        });
        counts['incomplete'] = incomplete;
        const customs = getAllCustomQuestions();
        let customTotal = 0;
        Object.values(customs).forEach((arr) => { customTotal += arr.length; });
        counts['custom-questions'] = customTotal;
        return counts;
    }, [getQuestionsByFilter, hasFilter, getAllCustomQuestions, _fv, _cv]);

    function openCategory(catId) {
        setDsaCategory(catId);
        setView('dsa-question');
    }

    function openFilter(filterId) {
        setDsaFilterView(filterId);
        setView('dsa-filtered');
    }

    return (
        <div style={{ minHeight: '100vh', background: '#000' }}>
            {/* Header — 3-column layout matching original */}
            <div className="dsa-header">
                <div className="dsa-header-row">
                    {/* Left: branding + back */}
                    <div className="dsa-header-left">
                        <div className="dsa-branding" onClick={() => setView('landing')} style={{ cursor: 'pointer' }}>
                            <div className="brand-title">📚 DevAtlas</div>
                            <div className="brand-sub">Developer's manual reimagined</div>
                        </div>
                        <button className="dsa-back-btn" onClick={() => setView('picker')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                            </svg>
                            Back to Sections
                        </button>
                    </div>

                    {/* Center: title + tagline */}
                    <div className="dsa-header-center">
                        <h1>Data Structures &amp; Algorithms</h1>
                        <p>Master the fundamentals with curated problems and C++ solutions</p>
                    </div>

                    {/* Right: GitHub link */}
                    <div className="dsa-header-right">
                        <a
                            href="https://github.com/Shlok-gupta08/DevAtlas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dsa-github-link"
                            title="View on GitHub"
                        >
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Filter pills */}
            <div className="dsa-filter-section">
                <span className="dsa-filter-title">Your Progress Filters: </span>
                <div className="dsa-filter-pills">
                    {FILTER_DEFS.map((f) => (
                        <button
                            key={f.id}
                            className="dsa-filter-pill"
                            style={{ '--filter-color': f.color }}
                            onClick={() => openFilter(f.id)}
                        >
                            <span className="fp-icon">{f.icon}</span>
                            <span className="fp-label">{f.label}</span>
                            {filterCounts[f.id] > 0 && (
                                <span className="fp-count">{filterCounts[f.id]}</span>
                            )}
                        </button>
                    ))}
                    <span className="dsa-filter-divider" />
                    <button
                        className="dsa-filter-pill"
                        style={{ '--filter-color': '#71717a' }}
                        onClick={() => openFilter('incomplete')}
                    >
                        <span className="fp-icon">○</span>
                        <span className="fp-label">Incomplete</span>
                        {filterCounts['incomplete'] > 0 && (
                            <span className="fp-count" style={{ background: '#71717a' }}>
                                {filterCounts['incomplete']}
                            </span>
                        )}
                    </button>
                    <button
                        className="dsa-filter-pill"
                        style={{ '--filter-color': '#facc15' }}
                        onClick={() => openFilter('custom-questions')}
                    >
                        <span className="fp-icon">★</span>
                        <span className="fp-label">Custom Questions</span>
                        {filterCounts['custom-questions'] > 0 && (
                            <span className="fp-count" style={{ background: '#facc15' }}>
                                {filterCounts['custom-questions']}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Category grid */}
            <div className="dsa-grid">
                {DSA_CATEGORIES.map((cat, i) => {
                    const stats = catStats[cat.id] || { total: 0, done: 0, custom: 0, easy: 0, medium: 0, hard: 0 };
                    return (
                        <motion.div
                            key={cat.id}
                            className="dsa-cat-card"
                            style={{ '--cat-color': cat.color }}
                            onClick={() => openCategory(cat.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.03 }}
                        >
                            {/* Progress indicator */}
                            {stats.done > 0 && stats.done < stats.total && (
                                <span className="cat-progress">
                                    Completed: {stats.done}/{stats.total}
                                </span>
                            )}
                            {stats.done > 0 && stats.done >= stats.total && (
                                <span className="cat-progress cat-progress-done">(completed)</span>
                            )}
                            <span className="cat-icon">{cat.icon}</span>
                            <span className="cat-name">{cat.name}</span>
                            <span className="cat-count">
                                {stats.total} Problems
                                {stats.custom > 0 && (
                                    <span className="cat-custom-badge"> +{stats.custom} custom</span>
                                )}
                            </span>
                            <div className="cat-difficulties">
                                {stats.easy > 0 && <span className="diff-badge easy">{stats.easy} Easy</span>}
                                {stats.medium > 0 && <span className="diff-badge medium">{stats.medium} Medium</span>}
                                {stats.hard > 0 && <span className="diff-badge hard">{stats.hard} Hard</span>}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
