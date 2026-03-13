import { useState, useEffect, useRef } from 'react';
import { useDSAStore } from '../../store/useDSAStore';
import { unformatComplexity } from '../../utils/helpers';

export default function AddQuestionDialog({ mode, catId, editData, onClose }) {
    const addCustomQuestion = useDSAStore((s) => s.addCustomQuestion);
    const updateCustomQuestion = useDSAStore((s) => s.updateCustomQuestion);

    const isEdit = mode === 'edit' && editData;

    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [timeComplexity, setTimeComplexity] = useState('');
    const [spaceComplexity, setSpaceComplexity] = useState('');
    const [overview, setOverview] = useState('');
    const [walkthrough, setWalkthrough] = useState('');
    const [testCases, setTestCases] = useState([{ input: '', output: '', explanation: '' }]);

    /* Populate form for edit mode */
    useEffect(() => {
        if (isEdit) {
            setTitle(editData.title || '');
            setDifficulty(editData.difficulty || 'medium');
            setDescription(editData.description || '');
            const approach = editData.approaches?.[0];
            setCode(approach?.code || '');
            setLanguage(approach?.language || 'cpp');
            setTimeComplexity(unformatComplexity(approach?.timeComplexity || ''));
            setSpaceComplexity(unformatComplexity(approach?.spaceComplexity || ''));
            setOverview(approach?.description || '');
            setWalkthrough(approach?.detailedWalkthrough || '');
            if (editData.testCases && editData.testCases.length > 0) {
                setTestCases(editData.testCases.map((tc) => {
                    if (typeof tc === 'string') {
                        const parts = tc.replace(/<[^>]*>/g, '').split(/→|output:/i);
                        return {
                            input: (parts[0] || '').replace(/input:/i, '').trim(),
                            output: (parts[1] || '').trim(),
                            explanation: '',
                        };
                    }
                    return { input: tc.input || '', output: tc.output || '', explanation: tc.explanation || '' };
                }));
            }
        }
    }, [isEdit, editData]);

    function handleSave() {
        if (!title.trim()) return;

        const tcData = testCases
            .filter((tc) => tc.input || tc.output)
            .map((tc) => ({
                input: tc.input,
                output: tc.output,
                explanation: tc.explanation || undefined,
            }));

        const timeRaw = timeComplexity.trim();
        const spaceRaw = spaceComplexity.trim();

        const questionData = {
            title: title.trim(),
            difficulty: difficulty,
            description: description.trim(),
            testCases: tcData,
            approaches: (code.trim() || overview.trim() || walkthrough.trim()) ? [{
                name: 'Solution',
                code: code.trim(),
                language: language,
                timeComplexity: timeRaw ? 'O(' + timeRaw + ')' : 'N/A',
                spaceComplexity: spaceRaw ? 'O(' + spaceRaw + ')' : 'N/A',
                description: overview.trim(),
                detailedWalkthrough: walkthrough.trim(),
            }] : [],
        };

        if (isEdit) {
            updateCustomQuestion(catId, editData.id, questionData);
        } else {
            addCustomQuestion(catId, questionData);
        }
        onClose();
    }

    function addTestCase() {
        setTestCases([...testCases, { input: '', output: '', explanation: '' }]);
    }

    function removeTestCase(idx) {
        setTestCases(testCases.filter((_, i) => i !== idx));
    }

    function updateTestCase(idx, field, value) {
        const updated = [...testCases];
        updated[idx] = { ...updated[idx], [field]: value };
        setTestCases(updated);
    }

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-title">
                    {isEdit ? 'Edit Question' : 'Add Custom Question'}
                </div>

                <div className="dialog-scroll-body">
                    {/* Title */}
                    <div className="dialog-field">
                        <label>Title <span className="dialog-req">*</span></label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Two Sum"
                            maxLength={100}
                        />
                        <span className="dialog-charcount">{title.length}/100</span>
                    </div>

                    {/* Difficulty */}
                    <div className="dialog-field">
                        <label>Difficulty</label>
                        <div className="dialog-diff-chooser">
                            {['easy', 'medium', 'hard'].map((d) => (
                                <button
                                    key={d}
                                    type="button"
                                    className={`dialog-diff-btn ${d} ${difficulty === d ? 'selected' : ''}`}
                                    onClick={() => setDifficulty(d)}
                                >
                                    {d.charAt(0).toUpperCase() + d.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="dialog-field">
                        <label>Description</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Problem description (HTML allowed)…"
                        />
                    </div>

                    {/* Test cases */}
                    <div className="dialog-field">
                        <label>Test Cases</label>
                        {testCases.map((tc, i) => (
                            <div key={i} className="dialog-tc-row">
                                <div className="tc-row-header">
                                    <span>Test Case {i + 1}</span>
                                    {testCases.length > 1 && (
                                        <button type="button" className="tc-remove" onClick={() => removeTestCase(i)}>
                                            ×
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Input"
                                    value={tc.input}
                                    onChange={(e) => updateTestCase(i, 'input', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Output"
                                    value={tc.output}
                                    onChange={(e) => updateTestCase(i, 'output', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Explanation (optional)"
                                    className="tc-explanation"
                                    value={tc.explanation}
                                    onChange={(e) => updateTestCase(i, 'explanation', e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" className="dialog-add-tc" onClick={addTestCase}>
                            + Add Test Case
                        </button>
                    </div>

                    {/* Language */}
                    <div className="dialog-field">
                        <label>Language</label>
                        <div className="dialog-lang-chooser">
                            {['cpp', 'python', 'java', 'javascript'].map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    className={`dialog-lang-btn ${language === lang ? 'selected' : ''}`}
                                    onClick={() => setLanguage(lang)}
                                >
                                    {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code */}
                    <div className="dialog-field">
                        <label>Code</label>
                        <textarea
                            className="dialog-code-area"
                            rows={10}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Paste your solution code…"
                        />
                    </div>

                    {/* Complexity */}
                    <div className="dialog-field">
                        <label>Time Complexity</label>
                        <div className="complexity-input-wrap">
                            <span className="complexity-prefix">O(</span>
                            <input
                                className="complexity-input"
                                type="text"
                                value={timeComplexity}
                                onChange={(e) => setTimeComplexity(e.target.value)}
                                placeholder="n"
                            />
                            <span className="complexity-suffix">)</span>
                        </div>
                        <span className="dialog-hint">Use ^ for exponents, e.g. n^2</span>
                    </div>

                    <div className="dialog-field">
                        <label>Space Complexity</label>
                        <div className="complexity-input-wrap">
                            <span className="complexity-prefix">O(</span>
                            <input
                                className="complexity-input"
                                type="text"
                                value={spaceComplexity}
                                onChange={(e) => setSpaceComplexity(e.target.value)}
                                placeholder="1"
                            />
                            <span className="complexity-suffix">)</span>
                        </div>
                    </div>

                    {/* Overview */}
                    <div className="dialog-field">
                        <label>Overview</label>
                        <textarea
                            rows={3}
                            value={overview}
                            onChange={(e) => setOverview(e.target.value)}
                            placeholder="Brief approach overview..."
                        />
                    </div>

                    {/* Detailed Walkthrough */}
                    <div className="dialog-field">
                        <label>Detailed Walkthrough</label>
                        <textarea
                            rows={5}
                            value={walkthrough}
                            onChange={(e) => setWalkthrough(e.target.value)}
                            placeholder="Step-by-step explanation..."
                        />
                    </div>
                </div>

                {/* Sticky actions */}
                <div className="dialog-actions-sticky">
                    <button type="button" className="dialog-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="button" className="dialog-save" onClick={handleSave}>
                        {isEdit ? 'Update' : 'Add Question'}
                    </button>
                </div>
            </div>
        </div>
    );
}
