import { useState, useEffect, useRef, useCallback } from 'react';
import hljs from 'highlight.js';
import { useDSAStore, FILTER_DEFS } from '../../store/useDSAStore';
import { useAppStore } from '../../store/useAppStore';
import { formatComplexity } from '../../utils/helpers';
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';

export default function DSAQuestionDetail({
    catConfig, question, questionIndex, totalQuestions,
    onPrev, onNext, onEditCustom, onDeleteCustom,
    overrideCatId,
}) {
    const [activeApproach, setActiveApproach] = useState(0);
    const [levelSelectorFilterId, setLevelSelectorFilterId] = useState(null);
    const contentRef = useRef(null);
    const storeCatId = useAppStore((s) => s.dsaCategory);
    const dsaCategory = overrideCatId || storeCatId;

    const hasFilter = useDSAStore((s) => s.hasFilter);
    const addFilter = useDSAStore((s) => s.addFilter);
    const removeFilter = useDSAStore((s) => s.removeFilter);
    const getFilterEntry = useDSAStore((s) => s.getFilterEntry);
    const getFilterLevel = useDSAStore((s) => s.getFilterLevel);
    const setFilterLevel = useDSAStore((s) => s.setFilterLevel);
    const getNote = useDSAStore((s) => s.getNote);
    const saveNote = useDSAStore((s) => s.saveNote);
    /* Subscribe to version counters for reactivity */
    const _fv = useDSAStore((s) => s._filterVersion);
    const _nv = useDSAStore((s) => s._noteVersion);

    /* Reset approach tab and level selector when question changes */
    useEffect(() => {
        setActiveApproach(0);
        setLevelSelectorFilterId(null);
    }, [question?.id]);

    /* Highlight code blocks when content changes */
    useEffect(() => {
        if (!contentRef.current) return;
        contentRef.current.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el);
        });
        // Setup copy buttons
        const copyBtns = contentRef.current.querySelectorAll('.copy-btn');
        const handler = (e) => {
            const btn = e.currentTarget;
            const wrapper = btn.closest('.code-wrapper');
            if (!wrapper) return;
            const codeEl = wrapper.querySelector('code');
            if (!codeEl) return;
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
        };
        copyBtns.forEach((btn) => btn.addEventListener('click', handler));
        return () => copyBtns.forEach((btn) => btn.removeEventListener('click', handler));
    }, [question?.id, activeApproach]);

    /* Notes state */
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const noteTimerRef = useRef(null);

    useEffect(() => {
        if (!dsaCategory || !question?.id) return;
        const note = getNote(dsaCategory, question.id);
        setNoteTitle(note?.title || '');
        setNoteBody(note?.content || '');
    }, [dsaCategory, question?.id, getNote]);

    const debouncedSaveNote = useCallback((title, body) => {
        if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
        noteTimerRef.current = setTimeout(() => {
            if (title || body) {
                saveNote(dsaCategory, question.id, title, body);
            }
        }, 500);
    }, [dsaCategory, question?.id, saveNote]);

    /* Auto-resize textarea */
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [noteBody]);

    if (!question) {
        return (
            <div className="dsa-question-detail" style={{ paddingTop: 80 }}>
                <p style={{ color: '#525252' }}>No question selected.</p>
            </div>
        );
    }

    const approaches = question.approaches || [];
    const approach = approaches[activeApproach];

    /* Toggle filter on/off — supports multiple simultaneous filters */
    function toggleFilter(filterId) {
        const isActive = hasFilter(dsaCategory, question.id, filterId);
        if (isActive) {
            removeFilter(dsaCategory, question.id, filterId);
            if (levelSelectorFilterId === filterId) setLevelSelectorFilterId(null);
        } else {
            const def = FILTER_DEFS.find((f) => f.id === filterId);
            const hasLevels = def && def.levels && def.levels.length > 0;
            /* Don't set a default level — let user pick from the selector */
            addFilter(dsaCategory, question.id, filterId, null);
            if (hasLevels) {
                setLevelSelectorFilterId(filterId);
            }
        }
    }

    /* Get bracket label for a filter button, e.g. " (Easy)" — colored by difficulty for completed, native for others */
    function getBracketLabel(filterId) {
        if (!hasFilter(dsaCategory, question.id, filterId)) return null;
        const def = FILTER_DEFS.find((f) => f.id === filterId);
        if (!def || !def.levels || def.levels.length === 0) return null;
        const entry = getFilterEntry(dsaCategory, question.id, filterId);
        if (!entry || !entry.level) return null;
        const lvl = def.levels.find((l) => l.id === entry.level);
        if (!lvl) return null;
        /* Only completed filter uses difficulty colors; others use their native filter color */
        const color = filterId === 'completed'
            ? ({ easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[entry.level] || def.color)
            : def.color;
        return <span style={{ color, marginLeft: 4 }}>({lvl.label})</span>;
    }

    /* Level selector definition (shown temporarily after toggling a filter with levels) */
    const levelSelectorDef = levelSelectorFilterId ? FILTER_DEFS.find((f) => f.id === levelSelectorFilterId) : null;
    const levelSelectorCurrentLevel = levelSelectorFilterId ? getFilterLevel(dsaCategory, question.id, levelSelectorFilterId) : null;

    return (
        <div className="dsa-question-detail" ref={contentRef} style={{ paddingTop: 72 }}>
            {/* Title row */}
            <div className="q-title-row">
                <h1 className="q-title">{question.title}</h1>
                {question.difficulty && (
                    <span className={`q-difficulty ${question.difficulty.toLowerCase()}`}>
                        {question.difficulty}
                    </span>
                )}
                {question.isCustom && (
                    <span className="q-custom-label">Custom</span>
                )}
            </div>

            {/* Nav row */}
            <div className="q-nav-row" style={{ marginTop: 8 }}>
                <button className="q-nav-btn" disabled={questionIndex <= 0} onClick={onPrev}>
                    <ChevronLeft size={14} /> Prev
                </button>
                <span style={{ fontSize: 12, color: '#404040', fontWeight: 600 }}>
                    {questionIndex + 1} / {totalQuestions}
                </span>
                <button className="q-nav-btn" disabled={questionIndex >= totalQuestions - 1} onClick={onNext}>
                    Next <ChevronRight size={14} />
                </button>
            </div>

            {/* Custom question actions */}
            {question.isCustom && (
                <div className="q-custom-actions" style={{ marginTop: 16 }}>
                    <button className="q-edit-custom" onClick={() => onEditCustom(question)}>
                        <Pencil size={14} /> Edit
                    </button>
                    <button className="q-delete-custom" onClick={() => onDeleteCustom(question)}>
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            )}

            {/* Filter Section */}
            <div 
                className="q-filter-section" 
                style={{ marginTop: 20 }}
                onMouseLeave={() => {
                    if (levelSelectorFilterId) {
                        const level = getFilterLevel(dsaCategory, question.id, levelSelectorFilterId);
                        if (level !== null) {
                            setLevelSelectorFilterId(null);
                        }
                    }
                }}
            >
                <div className="q-filter-bar">
                    <span className="q-filter-label">Mark as:</span>
                    {FILTER_DEFS.map((f) => {
                        const isActive = hasFilter(dsaCategory, question.id, f.id);
                        return (
                            <button
                                key={f.id}
                                className={`q-filter-btn ${isActive ? 'active' : ''}`}
                                style={{ '--filter-color': f.color }}
                                onClick={() => toggleFilter(f.id)}
                                onMouseEnter={() => {
                                    if (isActive && f.levels && f.levels.length > 0) {
                                        setLevelSelectorFilterId(f.id);
                                    }
                                }}
                            >
                                <span className="qfb-icon">{f.icon}</span>
                                <span className="qfb-label">{f.label}{getBracketLabel(f.id)}</span>
                            </button>
                        );
                    })}
                </div>

            {/* Level selector — shown temporarily when a filter with levels is toggled on or hovered */}
            {levelSelectorFilterId && levelSelectorDef && levelSelectorDef.levels && levelSelectorDef.levels.length > 0 && (
                <div className="q-level-selector" style={{ marginTop: 12 }}>
                    <span className="q-level-label">Level:</span>
                    {levelSelectorDef.levels.map((lvl) => {
                        const lvlColor = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[lvl.id] || lvl.color || levelSelectorDef.color;
                        return (
                            <button
                                key={lvl.id}
                                className={`q-level-btn ${levelSelectorCurrentLevel === lvl.id ? 'active' : ''}`}
                                style={{ '--level-color': lvlColor }}
                                onClick={() => {
                                    setFilterLevel(dsaCategory, question.id, levelSelectorFilterId, lvl.id);
                                    setLevelSelectorFilterId(null);
                                }}
                            >
                                {lvl.label}
                            </button>
                        );
                    })}
                </div>
            )}
            </div>

            {/* Description */}
            {question.description && (
                <div className="q-description" style={{ marginTop: 20 }}>
                    <div className="q-description-title">Problem Description</div>
                    <div className="q-description-body" dangerouslySetInnerHTML={{ __html: question.description }} />
                </div>
            )}

            {/* Test cases */}
            {question.testCases && question.testCases.length > 0 && (
                <div className="q-test-cases" style={{ marginTop: 20 }}>
                    <div className="q-test-cases-title">Test Cases</div>
                    {question.testCases.map((tc, i) => {
                        if (typeof tc === 'string') {
                            return (
                                <div key={i} className="q-test-case">
                                    <div className="tc-header">Case {i + 1}</div>
                                    <div className="tc-row" dangerouslySetInnerHTML={{ __html: tc }} />
                                </div>
                            );
                        }
                        return (
                            <div key={i} className="q-test-case">
                                <div className="tc-header">Case {i + 1}</div>
                                <div className="tc-row">
                                    <span className="tc-label">Input:</span> <code>{tc.input}</code>
                                </div>
                                <div className="tc-row">
                                    <span className="tc-label">Output:</span> <code>{tc.output}</code>
                                </div>
                                {tc.explanation && (
                                    <div className="tc-row">
                                        <span className="tc-label">Explanation:</span> {tc.explanation}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Approach tabs */}
            {approaches.length > 0 && (
                <>
                    <div className="approach-tabs">
                        {approaches.map((a, i) => (
                            <button
                                key={i}
                                className={`approach-tab ${i === activeApproach ? 'active' : ''}`}
                                onClick={() => setActiveApproach(i)}
                            >
                                {a.name || `Approach ${i + 1}`}
                            </button>
                        ))}
                    </div>

                    {approach && (
                        <div className="approach-content" key={activeApproach}>
                            {/* Code block */}
                            {approach.code && (
                                <div className="code-wrapper">
                                    <div className="code-header">
                                        <span>{approach.language || 'cpp'}</span>
                                        <button className="copy-btn">Copy</button>
                                    </div>
                                    <pre><code className={`language-${approach.language || 'cpp'}`}>{approach.code}</code></pre>
                                </div>
                            )}

                            {/* Complexity badges */}
                            {(approach.timeComplexity || approach.spaceComplexity) && (
                                <div className="approach-complexity">
                                    {approach.timeComplexity && (
                                        <div className="complexity-badge">
                                            <span className="cb-label">Time</span>
                                            <span dangerouslySetInnerHTML={{
                                                __html: formatComplexity(approach.timeComplexity)
                                            }} />
                                        </div>
                                    )}
                                    {approach.spaceComplexity && (
                                        <div className="complexity-badge">
                                            <span className="cb-label">Space</span>
                                            <span dangerouslySetInnerHTML={{
                                                __html: formatComplexity(approach.spaceComplexity)
                                            }} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Approach description / explanation */}
                            {approach.description && (
                                <div className="approach-description">
                                    <div className="approach-description-title">Approach Overview</div>
                                    <div dangerouslySetInnerHTML={{ __html: approach.description }} />
                                </div>
                            )}

                            {/* Detailed walkthrough */}
                            {(approach.detailedWalkthrough || approach.explanation) && (
                                <div className="code-explanation">
                                    <div className="explanation-title">Detailed Walkthrough</div>
                                    <div className="explanation-body" dangerouslySetInnerHTML={{ __html: approach.detailedWalkthrough || approach.explanation }} />
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* Personal notes */}
            <div className="q-notes-section">
                <input
                    className="q-notes-title"
                    placeholder="Note title…"
                    value={noteTitle}
                    onChange={(e) => {
                        setNoteTitle(e.target.value);
                        debouncedSaveNote(e.target.value, noteBody);
                    }}
                />
                <textarea
                    ref={textareaRef}
                    className="q-notes-textarea"
                    placeholder="Write personal notes here…"
                    value={noteBody}
                    onChange={(e) => {
                        setNoteBody(e.target.value);
                        debouncedSaveNote(noteTitle, e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
