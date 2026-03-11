// =================================================================
//  dsaStore.js — DSA localStorage persistence layer
//  Handles: progress tracking, multi-filter system, custom questions,
//           universal position, personal notes
//  Attaches to window.DSAStore
// =================================================================
(function () {
    'use strict';

    var STORAGE_KEYS = {
        POSITION: 'devatlas_position',
        FILTERS: 'devatlas_dsa_filters',
        CUSTOM_QUESTIONS: 'devatlas_dsa_custom',
        NOTES: 'devatlas_dsa_notes'
    };

    // ========== FILTER DEFINITIONS ==========
    var FILTER_DEFS = [
        {
            id: 'completed',
            label: 'Completed',
            icon: '✓',
            color: '#22c55e',
            desc: 'Understood the optimal logic and can write the code without notes.',
            levels: [
                { id: 'easy', label: 'Easy', desc: 'Solved it fast' },
                { id: 'medium', label: 'Medium', desc: 'Took some thought' },
                { id: 'hard', label: 'Hard', desc: 'Complex logic solved' }
            ]
        },
        {
            id: 'review',
            label: 'Review Later',
            icon: '⏳',
            color: '#f59e0b',
            desc: 'Understand it now, but will likely forget the specific trick or pattern.',
            levels: null
        },
        {
            id: 'revisit',
            label: 'Revisit',
            icon: '↻',
            color: '#f97316',
            desc: 'Saw the solution and it made sense, but couldn\'t solve it independently.',
            levels: [
                { id: 'easy', label: 'Easy', desc: 'Syntax issues only' },
                { id: 'medium', label: 'Medium', desc: 'Logic gap' },
                { id: 'hard', label: 'Hard', desc: 'Concept was totally new' }
            ]
        },
        {
            id: 'in-progress',
            label: 'In Progress',
            icon: '◐',
            color: '#8b5cf6',
            desc: 'Started reading or watching, but haven\'t finished the implementation.',
            levels: null
        },
        {
            id: 'skipped',
            label: 'Skipped',
            icon: '—',
            color: '#ef4444',
            desc: 'Skipping for now to focus on more important topics.',
            levels: null
        }
    ];

    // ========== HELPERS ==========
    function safeGet(key) {
        try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
    }

    function safeSet(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* quota exceeded */ }
    }

    // ========== UNIVERSAL POSITION TRACKING ==========
    function savePosition(view, context) {
        safeSet(STORAGE_KEYS.POSITION, { view: view, context: context, timestamp: Date.now() });
    }

    function getPosition() {
        return safeGet(STORAGE_KEYS.POSITION);
    }

    function clearPosition() {
        localStorage.removeItem(STORAGE_KEYS.POSITION);
    }

    // ========== MULTI-FILTER SYSTEM ==========
    function getAllFilters() {
        return safeGet(STORAGE_KEYS.FILTERS) || {};
    }

    // Returns array of filter objects for a question: [{ filterId, level }, ...]
    function getFilter(catId, questionId) {
        var all = getAllFilters();
        var key = catId + '::' + questionId;
        var val = all[key] || null;
        // Migrate old single-filter format to array
        if (val && !Array.isArray(val)) {
            val = [val];
            all[key] = val;
            safeSet(STORAGE_KEYS.FILTERS, all);
        }
        return val;
    }

    function addFilter(catId, questionId, filterId, level) {
        var all = getAllFilters();
        var key = catId + '::' + questionId;
        var arr = all[key] || [];
        if (!Array.isArray(arr)) arr = [arr]; // migrate
        // Remove existing entry for same filterId
        arr = arr.filter(function (f) { return f.filterId !== filterId; });
        arr.push({ filterId: filterId, level: level || null });
        all[key] = arr;
        safeSet(STORAGE_KEYS.FILTERS, all);
    }

    function removeFilter(catId, questionId, filterId) {
        var all = getAllFilters();
        var key = catId + '::' + questionId;
        var arr = all[key] || [];
        if (!Array.isArray(arr)) arr = [arr];
        arr = arr.filter(function (f) { return f.filterId !== filterId; });
        if (arr.length === 0) {
            delete all[key];
        } else {
            all[key] = arr;
        }
        safeSet(STORAGE_KEYS.FILTERS, all);
    }

    function setFilterLevel(catId, questionId, filterId, level) {
        var all = getAllFilters();
        var key = catId + '::' + questionId;
        var arr = all[key] || [];
        if (!Array.isArray(arr)) arr = [arr];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].filterId === filterId) {
                arr[i].level = level;
                break;
            }
        }
        all[key] = arr;
        safeSet(STORAGE_KEYS.FILTERS, all);
    }

    // Get all questions with a specific filter
    function getQuestionsByFilter(filterId) {
        var all = getAllFilters();
        var results = [];
        Object.keys(all).forEach(function (key) {
            var arr = all[key];
            if (!Array.isArray(arr)) arr = [arr];
            arr.forEach(function (f) {
                if (f.filterId === filterId) {
                    var parts = key.split('::');
                    results.push({ catId: parts[0], questionId: parts[1], level: f.level });
                }
            });
        });
        return results;
    }

    // Check if a question has a specific filter
    function hasFilter(catId, questionId, filterId) {
        var filters = getFilter(catId, questionId);
        if (!filters) return false;
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].filterId === filterId) return true;
        }
        return false;
    }

    // Get the filter entry for a specific filterId on a question
    function getFilterEntry(catId, questionId, filterId) {
        var filters = getFilter(catId, questionId);
        if (!filters) return null;
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].filterId === filterId) return filters[i];
        }
        return null;
    }

    // ========== CUSTOM QUESTIONS ==========
    function getAllCustomQuestions() {
        return safeGet(STORAGE_KEYS.CUSTOM_QUESTIONS) || {};
    }

    function getCustomQuestions(catId) {
        var all = getAllCustomQuestions();
        return all[catId] || [];
    }

    function addCustomQuestion(catId, question) {
        var all = getAllCustomQuestions();
        if (!all[catId]) all[catId] = [];
        question.id = 'custom-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
        question.isCustom = true;
        all[catId].push(question);
        safeSet(STORAGE_KEYS.CUSTOM_QUESTIONS, all);
        return question.id;
    }

    function updateCustomQuestion(catId, questionId, updatedData) {
        var all = getAllCustomQuestions();
        if (!all[catId]) return;
        for (var i = 0; i < all[catId].length; i++) {
            if (all[catId][i].id === questionId) {
                updatedData.id = questionId;
                updatedData.isCustom = true;
                all[catId][i] = updatedData;
                break;
            }
        }
        safeSet(STORAGE_KEYS.CUSTOM_QUESTIONS, all);
    }

    function deleteCustomQuestion(catId, questionId) {
        var all = getAllCustomQuestions();
        if (!all[catId]) return;
        all[catId] = all[catId].filter(function (q) { return q.id !== questionId; });
        if (all[catId].length === 0) delete all[catId];
        safeSet(STORAGE_KEYS.CUSTOM_QUESTIONS, all);
        var filters = getAllFilters();
        delete filters[catId + '::' + questionId];
        safeSet(STORAGE_KEYS.FILTERS, filters);
    }

    // ========== PERSONAL NOTES ==========
    function getAllNotes() {
        return safeGet(STORAGE_KEYS.NOTES) || {};
    }

    function getNote(catId, questionId) {
        var all = getAllNotes();
        return all[catId + '::' + questionId] || null;
    }

    function saveNote(catId, questionId, title, content) {
        var all = getAllNotes();
        var key = catId + '::' + questionId;
        if (!title && !content) {
            delete all[key];
        } else {
            all[key] = { title: title || '', content: content || '', updated: Date.now() };
        }
        safeSet(STORAGE_KEYS.NOTES, all);
    }

    // ========== PUBLIC API ==========
    window.DSAStore = {
        FILTER_DEFS: FILTER_DEFS,
        savePosition: savePosition,
        getPosition: getPosition,
        clearPosition: clearPosition,
        getAllFilters: getAllFilters,
        getFilter: getFilter,
        addFilter: addFilter,
        removeFilter: removeFilter,
        setFilterLevel: setFilterLevel,
        getQuestionsByFilter: getQuestionsByFilter,
        hasFilter: hasFilter,
        getFilterEntry: getFilterEntry,
        getAllCustomQuestions: getAllCustomQuestions,
        getCustomQuestions: getCustomQuestions,
        addCustomQuestion: addCustomQuestion,
        updateCustomQuestion: updateCustomQuestion,
        deleteCustomQuestion: deleteCustomQuestion,
        getAllNotes: getAllNotes,
        getNote: getNote,
        saveNote: saveNote
    };
})();
