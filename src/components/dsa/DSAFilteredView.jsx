import { useState, useMemo, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useDSAStore, FILTER_DEFS } from '../../store/useDSAStore';
import { DSAData } from '../../data/index';
import { DSA_CATEGORIES } from '../../utils/constants';
import DSAQuestionDetail from './DSAQuestionDetail';
import AddQuestionDialog from './AddQuestionDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { ArrowLeft, Menu, PanelLeft, ChevronDown, ChevronRight } from 'lucide-react';

export default function DSAFilteredView() {
    const dsaFilterView = useAppStore((s) => s.dsaFilterView);
    const setView = useAppStore((s) => s.setView);
    const savePosition = useDSAStore((s) => s.savePosition);
    const getQuestionsByFilter = useDSAStore((s) => s.getQuestionsByFilter);
    const getAllCustomQuestions = useDSAStore((s) => s.getAllCustomQuestions);
    const hasFilter = useDSAStore((s) => s.hasFilter);
    const getFilterLevel = useDSAStore((s) => s.getFilterLevel);
    const setFilterLevel = useDSAStore((s) => s.setFilterLevel);
    const _fv = useDSAStore((s) => s._filterVersion);
    const _cv = useDSAStore((s) => s._customVersion);

    const [selectedCatId, setSelectedCatId] = useState(null);
    const [selectedQId, setSelectedQId] = useState(null);
    const [collapsedCats, setCollapsedCats] = useState({});
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [hoverLevelItem, setHoverLevelItem] = useState(null);

    /* Determine view type */
    const isBuiltInFilter = FILTER_DEFS.some((f) => f.id === dsaFilterView);
    const isIncomplete = dsaFilterView === 'incomplete';
    const isCustom = dsaFilterView === 'custom-questions';
    const filterDef = FILTER_DEFS.find((f) => f.id === dsaFilterView);

    const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

    /* Helper: find question data */
    function findQuestion(catId, questionId) {
        const data = DSAData[catId];
        if (data) {
            const q = (data.questions || []).find((q) => q.id === questionId);
            if (q) return { ...q, isCustom: false };
        }
        const customs = getAllCustomQuestions()[catId] || [];
        const cq = customs.find((q) => q.id === questionId);
        if (cq) return { ...cq, isCustom: true };
        return null;
    }

    /* Compute items grouped by category + flat list for navigation */
    const { groupedItems, flatList, totalCount } = useMemo(() => {
        const groups = [];
        const flat = [];

        if (isBuiltInFilter) {
            const items = getQuestionsByFilter(dsaFilterView);
            const map = {};
            items.forEach((item) => {
                const q = findQuestion(item.catId, item.questionId);
                if (!q) return;
                if (!map[item.catId]) map[item.catId] = [];
                map[item.catId].push({
                    catId: item.catId, questionId: item.questionId,
                    title: q.title, difficulty: q.difficulty,
                    level: item.level, isCustom: !!q.isCustom,
                });
            });
            DSA_CATEGORIES.forEach((cat) => {
                if (map[cat.id]) {
                    map[cat.id].sort((a, b) => (DIFF_ORDER[a.difficulty] || 0) - (DIFF_ORDER[b.difficulty] || 0));
                    groups.push({ catId: cat.id, catName: cat.name, catColor: cat.color, items: map[cat.id] });
                    map[cat.id].forEach((item) => flat.push(item));
                }
            });
        } else if (isIncomplete) {
            DSA_CATEGORIES.forEach((cat) => {
                const data = DSAData[cat.id];
                if (!data) return;
                const incomplete = (data.questions || []).filter(
                    (q) => !hasFilter(cat.id, q.id, 'completed') || getFilterLevel(cat.id, q.id, 'completed') === null
                );
                const customs = getAllCustomQuestions()[cat.id] || [];
                const incompleteCustoms = customs.filter(
                    (cq) => !hasFilter(cat.id, cq.id, 'completed') || getFilterLevel(cat.id, cq.id, 'completed') === null
                );
                const allIncomplete = [
                    ...incomplete.map((q) => ({ catId: cat.id, questionId: q.id, title: q.title, difficulty: q.difficulty, isCustom: false })),
                    ...incompleteCustoms.map((q) => ({ catId: cat.id, questionId: q.id, title: q.title, difficulty: q.difficulty, isCustom: true })),
                ];
                allIncomplete.sort((a, b) => (DIFF_ORDER[a.difficulty] || 0) - (DIFF_ORDER[b.difficulty] || 0));
                if (allIncomplete.length > 0) {
                    groups.push({ catId: cat.id, catName: cat.name, catColor: cat.color, items: allIncomplete });
                    allIncomplete.forEach((item) => flat.push(item));
                }
            });
        } else if (isCustom) {
            const customs = getAllCustomQuestions();
            DSA_CATEGORIES.forEach((cat) => {
                const cqs = customs[cat.id] || [];
                if (cqs.length > 0) {
                    const items = cqs.map((q) => ({ catId: cat.id, questionId: q.id, title: q.title, difficulty: q.difficulty, isCustom: true }));
                    groups.push({ catId: cat.id, catName: cat.name, catColor: cat.color, items });
                    items.forEach((item) => flat.push(item));
                }
            });
        }

        return { groupedItems: groups, flatList: flat, totalCount: flat.length };
    }, [dsaFilterView, isBuiltInFilter, isIncomplete, isCustom, _fv, _cv]);

    /* Auto-select first question if nothing selected or selection is gone */
    const activeItem = useMemo(() => {
        if (selectedCatId && selectedQId) {
            const found = flatList.find((it) => it.catId === selectedCatId && it.questionId === selectedQId);
            if (found) return found;
            /* Keep selection when question leaves filter (e.g. marked complete from incomplete) */
            return { catId: selectedCatId, questionId: selectedQId };
        }
        return flatList[0] || null;
    }, [flatList, selectedCatId, selectedQId]);

    const activeCatId = activeItem?.catId || null;
    const activeQId = activeItem?.questionId || null;

    /* Current question data for detail */
    const currentQuestion = useMemo(() => {
        if (!activeCatId || !activeQId) return null;
        return findQuestion(activeCatId, activeQId);
    }, [activeCatId, activeQId, _fv, _cv]);

    const currentIndex = flatList.findIndex((it) => it.catId === activeCatId && it.questionId === activeQId);

    /* Title and color */
    let viewTitle = 'Filtered View';
    let viewColor = '#a3a3a3';
    let viewIcon = '';
    if (filterDef) {
        viewTitle = filterDef.label;
        viewColor = filterDef.color;
        viewIcon = filterDef.icon;
    } else if (isIncomplete) {
        viewTitle = 'Incomplete';
        viewColor = '#737373';
        viewIcon = '○';
    } else if (isCustom) {
        viewTitle = 'Custom Questions';
        viewColor = '#a78bfa';
        viewIcon = '★';
    }

    function goToQuestion(catId, questionId) {
        setSelectedCatId(catId);
        setSelectedQId(questionId);
        setMobileSidebarOpen(false);
        savePosition('dsa', { catId, questionId, filterId: dsaFilterView });
    }

    const goPrev = useCallback(() => {
        if (currentIndex > 0) {
            const prev = flatList[currentIndex - 1];
            goToQuestion(prev.catId, prev.questionId);
        }
    }, [currentIndex, flatList]);

    const goNext = useCallback(() => {
        if (currentIndex < flatList.length - 1) {
            const next = flatList[currentIndex + 1];
            goToQuestion(next.catId, next.questionId);
        }
    }, [currentIndex, flatList]);

    function toggleCat(catId) {
        setCollapsedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
    }

    function handleSidebarToggle() {
        if (window.innerWidth <= 768) {
            setMobileSidebarOpen((prev) => !prev);
        } else {
            setSidebarCollapsed((prev) => !prev);
        }
    }

    function handleEditCustom(question) {
        setEditingQuestion(question);
        setDialogMode('edit');
    }

    function handleDeleteCustom(question) {
        setDeleteTarget(question);
    }

    function diffColor(diff) {
        switch ((diff || '').toLowerCase()) {
            case 'easy': return '#22c55e';
            case 'medium': return '#eab308';
            case 'hard': return '#ef4444';
            default: return '#525252';
        }
    }

    function levelColor(lvlId) {
        switch (lvlId) {
            case 'easy': return '#22c55e';
            case 'medium': return '#eab308';
            case 'hard': return '#ef4444';
            default: return '#a3a3a3';
        }
    }

    /* Build sidebar dot: always colored dots in filter sections */
    function buildSidebarDot(catId, qId, difficulty) {
        return <span className={`qs-diff-dot ${(difficulty || '').toLowerCase()}`} />;
    }

    const activeCatConfig = DSA_CATEGORIES.find((c) => c.id === activeCatId);

    /* Empty state */
    if (totalCount === 0) {
        return (
            <div className="dsa-filtered-view">
                <div className="fv-header">
                    <button className="fv-back" onClick={() => setView('dsa-grid')}>
                        <ArrowLeft size={14} />
                        Back to Categories
                    </button>
                    <h1 className="fv-title" style={{ color: viewColor }}>
                        {viewIcon} {viewTitle}
                    </h1>
                    <span className="fv-count">0 questions</span>
                </div>
                <div className="fv-empty">
                    No questions found in this filter.<br />
                    Mark questions from the question detail view.
                </div>
            </div>
        );
    }

    return (
        <div className={`dsa-question-view ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} style={{ '--cat-color': viewColor }}>
            {/* Mobile sidebar overlay */}
            <div
                className={`mobile-sidebar-overlay ${mobileSidebarOpen ? 'visible' : ''}`}
                onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Top nav breadcrumb */}
            <div className={`dsa-topnav ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <button className="dsa-sidebar-toggle" onClick={handleSidebarToggle} aria-label="Toggle sidebar">
                    {sidebarCollapsed ? <Menu size={18} /> : <PanelLeft size={18} />}
                </button>
                <div className="dsa-breadcrumb">
                    <span className="bc-link" onClick={() => setView('dsa-grid')}>DSA</span>
                    <span className="bc-sep">/</span>
                    <span className="bc-link" style={{ color: viewColor }} onClick={() => setView('dsa-grid')}>
                        {viewTitle}
                    </span>
                    {currentQuestion && (
                        <>
                            <span className="bc-sep">/</span>
                            <span className="bc-current">{currentQuestion.title}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar grouped by category with collapsible headings */}
            <div className={`dsa-question-sidebar floating ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
                <div className="qs-header">
                    <button className="qs-back-btn" onClick={() => setView('dsa-grid')}>
                        <ArrowLeft size={12} />
                        All Categories
                    </button>
                    <div className="qs-cat-title" style={{ color: viewColor }}>
                        <span className="qs-cat-icon">{viewIcon}</span>
                        {viewTitle}
                    </div>
                    <div style={{ fontSize: 12, color: '#525252', fontWeight: 600, marginTop: 2 }}>
                        {totalCount} question{totalCount !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="qs-list">
                    {groupedItems.map((group) => {
                        const isCollapsed = collapsedCats[group.catId];
                        return (
                            <div className="diff-group fv-sidebar-group" key={group.catId}>
                                <div
                                    className="diff-group-label fv-cat-toggle"
                                    onClick={() => toggleCat(group.catId)}
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                >
                                    <span className="fv-toggle-arrow">
                                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                                    </span>
                                    {group.catName} ({group.items.length})
                                </div>
                                {!isCollapsed && (
                                    <div className="fv-cat-items-wrap">
                                        {group.items.map((item) => {
                                            const qId = item.questionId || item.id;
                                            const isActive = item.catId === activeCatId && qId === activeQId;
                                            const level = item.level || (isBuiltInFilter
                                                ? getFilterLevel(item.catId, qId, dsaFilterView)
                                                : null);
                                            const filterLevel = filterDef?.levels?.find((l) => l.id === level);
                                            const itemKey = `${item.catId}-${qId}`;
                                            const showLevelPicker = hoverLevelItem === itemKey && filterDef?.levels;
                                            return (
                                                <div
                                                    key={itemKey}
                                                    className={`qs-item ${isActive ? 'active' : ''}`}
                                                    data-diff={item.difficulty || 'medium'}
                                                    onClick={() => { setHoverLevelItem(null); goToQuestion(item.catId, qId); }}
                                                    onMouseEnter={() => filterDef?.levels && setHoverLevelItem(itemKey)}
                                                    onMouseLeave={() => setHoverLevelItem(null)}
                                                >
                                                    {item.isCustom ? (
                                                        <span className="qs-custom-tag" style={{ color: diffColor(item.difficulty) }}>★</span>
                                                    ) : (
                                                        buildSidebarDot(item.catId, qId, item.difficulty)
                                                    )}
                                                    <span className="qs-item-title">{item.title}</span>
                                                    {showLevelPicker ? (
                                                        <span className="fv-level-picker">
                                                            {filterDef.levels.map((lvl) => (
                                                                <button
                                                                    key={lvl.id}
                                                                    className={`fv-level-opt ${lvl.id === level ? 'active' : ''}`}
                                                                    style={{ '--lvl-color': levelColor(lvl.id) }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFilterLevel(item.catId, qId, dsaFilterView, lvl.id);
                                                                    }}
                                                                >
                                                                    {lvl.label}
                                                                </button>
                                                            ))}
                                                        </span>
                                                    ) : filterLevel ? (
                                                        <span
                                                            className="fv-item-level"
                                                            style={{ color: levelColor(level) }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setHoverLevelItem(hoverLevelItem === itemKey ? null : itemKey);
                                                            }}
                                                        >
                                                            ({filterLevel.label})
                                                        </span>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Question detail */}
            {currentQuestion && (
                <DSAQuestionDetail
                    catConfig={activeCatConfig}
                    question={currentQuestion}
                    questionIndex={currentIndex}
                    totalQuestions={totalCount}
                    onPrev={goPrev}
                    onNext={goNext}
                    onEditCustom={handleEditCustom}
                    onDeleteCustom={handleDeleteCustom}
                    overrideCatId={activeCatId}
                />
            )}

            {/* Add/Edit question dialog */}
            {dialogMode && (
                <AddQuestionDialog
                    mode={dialogMode}
                    catId={activeCatId}
                    editData={editingQuestion}
                    onClose={() => { setDialogMode(null); setEditingQuestion(null); }}
                />
            )}

            {/* Delete confirmation dialog */}
            {deleteTarget && (
                <DeleteConfirmDialog
                    catId={activeCatId}
                    question={deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
