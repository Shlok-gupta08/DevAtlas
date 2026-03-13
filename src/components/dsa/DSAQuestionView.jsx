import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useDSAStore, FILTER_DEFS } from '../../store/useDSAStore';
import { DSAData } from '../../data/index';
import { DSA_CATEGORIES } from '../../utils/constants';
import DSAQuestionSidebar from './DSAQuestionSidebar';
import DSAQuestionDetail from './DSAQuestionDetail';
import DSATopNav from './DSATopNav';
import AddQuestionDialog from './AddQuestionDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';

export default function DSAQuestionView() {
    const dsaCategory = useAppStore((s) => s.dsaCategory);
    const dsaQuestion = useAppStore((s) => s.dsaQuestion);
    const setDsaQuestion = useAppStore((s) => s.setDsaQuestion);
    const savePosition = useDSAStore((s) => s.savePosition);
    const getPosition = useDSAStore((s) => s.getPosition);
    const getAllCustomQuestions = useDSAStore((s) => s.getAllCustomQuestions);
    const _cv = useDSAStore((s) => s._customVersion);

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [dialogMode, setDialogMode] = useState(null); // 'add' | 'edit' | null
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const catConfig = DSA_CATEGORIES.find((c) => c.id === dsaCategory);
    const catData = DSAData[dsaCategory];
    const customQuestions = (getAllCustomQuestions()[dsaCategory] || []);

    /* Merge built-in + custom questions */
    const allQuestions = useMemo(() => {
        const builtIn = (catData?.questions || []).map((q) => ({ ...q, isCustom: false }));
        const customs = customQuestions.map((q) => ({ ...q, isCustom: true }));
        return [...builtIn, ...customs];
    }, [catData, customQuestions]);

    /* Auto-select: resume last viewed question or fallback to first */
    useEffect(() => {
        if (!dsaQuestion && allQuestions.length > 0) {
            const pos = getPosition();
            if (pos && pos.context && pos.context.catId === dsaCategory && pos.context.questionId) {
                const exists = allQuestions.some((q) => q.id === pos.context.questionId);
                if (exists) {
                    setDsaQuestion(pos.context.questionId);
                    return;
                }
            }
            setDsaQuestion(allQuestions[0].id);
        }
    }, [dsaQuestion, allQuestions, setDsaQuestion, dsaCategory, getPosition]);

    /* Save position */
    useEffect(() => {
        if (dsaCategory) {
            savePosition('dsa', {
                catId: dsaCategory,
                questionId: dsaQuestion || null,
            });
        }
    }, [dsaCategory, dsaQuestion, savePosition]);

    const currentQuestion = useMemo(() => {
        return allQuestions.find((q) => q.id === dsaQuestion) || allQuestions[0] || null;
    }, [allQuestions, dsaQuestion]);

    const currentIndex = allQuestions.findIndex((q) => q.id === dsaQuestion);

    const goToQuestion = useCallback((id) => {
        setDsaQuestion(id);
        setMobileSidebarOpen(false);
    }, [setDsaQuestion]);

    const goPrev = useCallback(() => {
        if (currentIndex > 0) {
            setDsaQuestion(allQuestions[currentIndex - 1].id);
        }
    }, [currentIndex, allQuestions, setDsaQuestion]);

    const goNext = useCallback(() => {
        if (currentIndex < allQuestions.length - 1) {
            setDsaQuestion(allQuestions[currentIndex + 1].id);
        }
    }, [currentIndex, allQuestions, setDsaQuestion]);

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

    return (
        <div className={`dsa-question-view ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} style={{ '--cat-color': catConfig?.color || '#facc15' }}>
            {/* Mobile sidebar overlay */}
            <div
                className={`mobile-sidebar-overlay ${mobileSidebarOpen ? 'visible' : ''}`}
                onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Top nav with breadcrumb */}
            <DSATopNav
                catConfig={catConfig}
                currentQuestion={currentQuestion}
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebar={handleSidebarToggle}
            />

            {/* Question sidebar */}
            <DSAQuestionSidebar
                catConfig={catConfig}
                catData={catData}
                allQuestions={allQuestions}
                activeId={dsaQuestion}
                onSelect={goToQuestion}
                mobileSidebarOpen={mobileSidebarOpen}
                onAddQuestion={() => setDialogMode('add')}
                onEditCustom={handleEditCustom}
                onDeleteCustom={handleDeleteCustom}
            />

            {/* Question detail */}
            <DSAQuestionDetail
                catConfig={catConfig}
                question={currentQuestion}
                questionIndex={currentIndex}
                totalQuestions={allQuestions.length}
                onPrev={goPrev}
                onNext={goNext}
                onEditCustom={handleEditCustom}
                onDeleteCustom={handleDeleteCustom}
            />

            {/* Add/Edit question dialog */}
            {dialogMode && (
                <AddQuestionDialog
                    mode={dialogMode}
                    catId={dsaCategory}
                    editData={editingQuestion}
                    onClose={() => { setDialogMode(null); setEditingQuestion(null); }}
                />
            )}

            {/* Delete confirmation dialog */}
            {deleteTarget && (
                <DeleteConfirmDialog
                    catId={dsaCategory}
                    question={deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
