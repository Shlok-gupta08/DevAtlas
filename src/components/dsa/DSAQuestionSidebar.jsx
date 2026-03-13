import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useDSAStore, FILTER_DEFS } from '../../store/useDSAStore';
import { DSA_CATEGORIES } from '../../utils/constants';
import { ArrowLeft, Plus, Pencil, Trash2, ChevronDown } from 'lucide-react';

export default function DSAQuestionSidebar({
    catConfig, catData, allQuestions, activeId,
    onSelect, mobileSidebarOpen, onAddQuestion,
    onEditCustom, onDeleteCustom,
}) {
    const setView = useAppStore((s) => s.setView);
    const setDsaCategory = useAppStore((s) => s.setDsaCategory);
    const setDsaQuestion = useAppStore((s) => s.setDsaQuestion);
    const hasFilter = useDSAStore((s) => s.hasFilter);
    const _fv = useDSAStore((s) => s._filterVersion);

    const [catDropdownOpen, setCatDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    /* Close dropdown on outside click */
    useEffect(() => {
        if (!catDropdownOpen) return;
        function handler(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setCatDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, [catDropdownOpen]);

    /* Group questions by difficulty */
    const groups = { easy: [], medium: [], hard: [], custom: [] };
    allQuestions.forEach((q) => {
        if (q.isCustom) {
            groups.custom.push(q);
        } else {
            const diff = (q.difficulty || 'medium').toLowerCase();
            if (groups[diff]) groups[diff].push(q);
            else groups.medium.push(q);
        }
    });

    /* Build sidebar dot: colored dot normally, colored tick if completed */
    function buildSidebarDot(catId, qId, difficulty) {
        const isCompleted = hasFilter(catId, qId, 'completed');
        const dc = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[difficulty] || '#525252';
        if (isCompleted) {
            const contrast = (dc === '#ef4444' || dc === '#22c55e') ? '#fff' : '#000';
            return (
                <span className="qs-tick-mark" style={{ background: dc, color: contrast }}>
                    ✓
                </span>
            );
        }
        return <span className={`qs-diff-dot ${(difficulty || '').toLowerCase()}`} />;
    }

    /* Switch to a different DS category */
    function switchCategory(catId) {
        setCatDropdownOpen(false);
        setDsaCategory(catId);
        setDsaQuestion(null);
        setView('dsa-question');
    }

    return (
        <div className={`dsa-question-sidebar floating ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
            <div className="qs-header">
                <button className="qs-back-btn" onClick={() => setView('dsa-grid')}>
                    <ArrowLeft size={12} />
                    All Categories
                </button>
                <div className="qs-cat-title-wrap" ref={dropdownRef}>
                    <div
                        className="qs-cat-title qs-cat-title--ds"
                        onClick={() => setCatDropdownOpen((p) => !p)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="qs-cat-icon">{catConfig?.icon}</span>
                        {catConfig?.name}
                        <ChevronDown size={14} className={`qs-cat-arrow ${catDropdownOpen ? 'open' : ''}`} />
                    </div>
                    {catDropdownOpen && (
                        <div className="qs-cat-dropdown">
                            {DSA_CATEGORIES.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`qs-cat-dropdown-item ${cat.id === catConfig?.id ? 'current' : ''}`}
                                    onClick={() => switchCategory(cat.id)}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="qs-list">
                {['easy', 'medium', 'hard', 'custom'].map((diff) => {
                    const items = groups[diff];
                    if (items.length === 0) return null;
                    return (
                        <div className="diff-group" key={diff}>
                            <div className={`diff-group-label ${diff}`}>
                                {diff === 'custom' ? 'Custom' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </div>
                            {items.map((q, idx) => {
                                const isActive = q.id === activeId;
                                return (
                                    <div
                                        key={q.id}
                                        className={`qs-item ${q.id === activeId ? 'active' : ''}`}
                                        data-diff={q.difficulty || 'medium'}
                                        onClick={() => onSelect(q.id)}
                                    >
                                        {q.isCustom ? (
                                            <span className="qs-custom-tag" style={{ color: '#a78bfa' }}>★</span>
                                        ) : (
                                            <span className="qs-num">{idx + 1}</span>
                                        )}
                                        {buildSidebarDot(catConfig?.id, q.id, q.difficulty)}
                                        <span className="qs-item-title">{q.title}</span>
                                        {q.isCustom && (
                                            <span className="qs-custom-icons">
                                                <span className="qs-edit-icon" onClick={(e) => { e.stopPropagation(); onEditCustom(q); }}>
                                                    <Pencil size={14} />
                                                </span>
                                                <span className="qs-trash-icon" onClick={(e) => { e.stopPropagation(); onDeleteCustom(q); }}>
                                                    <Trash2 size={14} />
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="qs-add-btn-wrap">
                <button className="qs-add-btn" onClick={onAddQuestion}>
                    <Plus size={16} />
                    Add Question
                </button>
            </div>
        </div>
    );
}
