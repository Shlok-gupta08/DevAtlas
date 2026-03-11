// =================================================================
//  dsaRenderer.js — DSA section renderer
//  Handles: category grid, question list, question detail,
//           approach tabs, navigation, breadcrumbs, multi-filters,
//           custom questions, floating sidebar, filtered view,
//           personal notes, add question dialog
//  Attaches to window.DSARenderer
// =================================================================
(function () {
    'use strict';

    var currentCategory = null;
    var currentQuestion = null;
    var currentApproach = 0;

    // DSA category display order
    var CATEGORY_ORDER = [
        'math-bits', 'arrays-matrices', 'searching-sorting', 'strings',
        'recursion-backtracking', 'linked-lists', 'stacks-queues', 'greedy',
        'binary-trees', 'bst', 'heaps', 'hashing-tries',
        'graphs', 'dynamic-programming', 'segment-trees'
    ];

    var CAT_NAMES = {};

    function getData() {
        return window.DSAData || {};
    }

    function getCategoryList() {
        var data = getData();
        var list = [];
        CATEGORY_ORDER.forEach(function (key) {
            if (data[key]) {
                list.push(data[key]);
                CAT_NAMES[key] = data[key].name;
            }
        });
        return list;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function buildCodeBlock(code, lang) {
        var escaped = escapeHtml(code);
        var language = lang || 'cpp';
        var langLabel = { cpp: 'C++', c: 'C', java: 'Java', python: 'Python' }[language] || language.toUpperCase();
        return '<div class="code-wrapper"><div class="code-header"><span>' + langLabel + '</span>' +
               '<button class="copy-btn" onclick="copyCode(this)">Copy</button></div>' +
               '<pre><code class="language-' + language + '">' + escaped + '</code></pre></div>';
    }

    function countByDifficulty(questions) {
        var counts = { easy: 0, medium: 0, hard: 0 };
        questions.forEach(function (q) { counts[q.difficulty]++; });
        return counts;
    }

    // ========== FILTER HELPERS ==========
    function getFilterDef(filterId) {
        var defs = window.DSAStore.FILTER_DEFS;
        for (var i = 0; i < defs.length; i++) {
            if (defs[i].id === filterId) return defs[i];
        }
        return null;
    }

    function getFilterColor(filterId, level) {
        var def = getFilterDef(filterId);
        if (!def) return '#525252';
        if (filterId === 'completed') {
            return { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[level] || def.color;
        }
        if (filterId === 'revisit') {
            return { easy: '#f59e0b', medium: '#f97316', hard: '#dc2626' }[level] || def.color;
        }
        return def.color;
    }

    function getFilterLabel(filterId, level) {
        var def = getFilterDef(filterId);
        if (!def) return '';
        if (level && def.levels) {
            for (var i = 0; i < def.levels.length; i++) {
                if (def.levels[i].id === level) return def.label + ' (' + def.levels[i].label + ')';
            }
        }
        return def.label;
    }

    // Count all incomplete questions (no completed filter)
    function countIncompleteQuestions() {
        var data = getData();
        var count = 0;
        CATEGORY_ORDER.forEach(function (catKey) {
            var cat = data[catKey];
            if (!cat) return;
            cat.questions.forEach(function (q) {
                if (!window.DSAStore.hasFilter(catKey, q.id, 'completed')) count++;
            });
            var customQs = window.DSAStore.getCustomQuestions(catKey);
            customQs.forEach(function (cq) {
                if (!window.DSAStore.hasFilter(catKey, cq.id, 'completed')) count++;
            });
        });
        return count;
    }

    // Count all custom questions across categories
    function countAllCustomQuestions() {
        var allCustom = window.DSAStore.getAllCustomQuestions();
        var count = 0;
        Object.keys(allCustom).forEach(function (catId) {
            count += allCustom[catId].length;
        });
        return count;
    }

    // ========== SIDEBAR DOT — color based on QUESTION DIFFICULTY ==========
    function buildSidebarDot(difficulty, catId, questionId) {
        var filters = window.DSAStore.getFilter(catId, questionId);
        if (filters && filters.length > 0) {
            // Check if completed filter exists
            var hasCompleted = false;
            for (var i = 0; i < filters.length; i++) {
                if (filters[i].filterId === 'completed') { hasCompleted = true; break; }
            }
            if (hasCompleted) {
                var color = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[difficulty] || '#22c55e';
                var contrast = '#000';
                if (color === '#ef4444' || color === '#22c55e') contrast = '#fff';
                return '<span class="qs-tick-mark" style="background:' + color + ';color:' + contrast + '">✓</span>';
            }
        }
        return '<span class="qs-diff-dot ' + difficulty + '"></span>';
    }

    // ========== CATEGORY GRID VIEW ==========
    function renderCategoryGrid() {
        currentCategory = null;
        currentQuestion = null;

        var dsaView = document.getElementById('dsa-view');
        dsaView.innerHTML = '';

        var categories = getCategoryList();

        var h = '<div class="dsa-header">';

        h += '<div class="dsa-header-row">';

        // Left group: logo + back button
        h += '<div class="dsa-header-left">';
        h += '<div class="dsa-branding" id="dsa-brand-home">';
        h += '<div class="brand-title">📚 DevAtlas</div>';
        h += '<div class="brand-sub">Developer\'s manual reimagined</div>';
        h += '</div>';
        h += '<button class="dsa-back-btn" id="dsa-back-home">';
        h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'Back to Sections';
        h += '</button>';
        h += '</div>';

        // Center group: DSA title + tagline
        h += '<div class="dsa-header-center">';
        h += '<h1>Data Structures & Algorithms</h1>';
        h += '<p>Master the fundamentals with curated problems and C++ solutions</p>';
        h += '</div>';

        // Right group: GitHub logo
        h += '<div class="dsa-header-right">';
        h += '<a href="https://github.com/Shlok-gupta08/DevAtlas" target="_blank" rel="noopener noreferrer" class="dsa-github-link" title="View on GitHub">';
        h += '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';
        h += '</a>';
        h += '</div>';

        h += '</div>'; // end header-row
        h += '</div>';

        // ===== COMPACT INLINE FILTER SECTION =====
        h += '<div class="dsa-filter-section" id="dsa-filter-section">';
        h += '<span class="dsa-filter-title">Your Progress Filters: </span>';
        var defs = window.DSAStore.FILTER_DEFS;
        h += '<div class="dsa-filter-pills">';
        defs.forEach(function (def) {
            var count = window.DSAStore.getQuestionsByFilter(def.id).length;
            h += '<button class="dsa-filter-pill" data-filter-id="' + def.id + '" style="--filter-color:' + def.color + '">';
            h += '<span class="fp-icon">' + def.icon + '</span>';
            h += '<span class="fp-label">' + def.label + '</span>';
            if (count > 0) h += '<span class="fp-count">' + count + '</span>';
            h += '</button>';
        });
        // Vertical divider
        h += '<span class="dsa-filter-divider"></span>';
        // Incomplete virtual filter
        var incompleteCount = countIncompleteQuestions();
        h += '<button class="dsa-filter-pill" data-virtual-filter="incomplete" style="--filter-color:#71717a">';
        h += '<span class="fp-icon">○</span>';
        h += '<span class="fp-label">Incomplete</span>';
        if (incompleteCount > 0) h += '<span class="fp-count" style="background:#71717a">' + incompleteCount + '</span>';
        h += '</button>';
        // Custom Questions virtual filter
        var allCustomCount = countAllCustomQuestions();
        h += '<button class="dsa-filter-pill" data-virtual-filter="custom-questions" style="--filter-color:#facc15">';
        h += '<span class="fp-icon">★</span>';
        h += '<span class="fp-label">Custom Questions</span>';
        if (allCustomCount > 0) h += '<span class="fp-count" style="background:#facc15">' + allCustomCount + '</span>';
        h += '</button>';
        h += '</div>';
        h += '</div>';

        h += '<div class="dsa-grid">';
        categories.forEach(function (cat, i) {
            var counts = countByDifficulty(cat.questions);
            // Include custom questions in count
            var customQs = window.DSAStore.getCustomQuestions(cat.id);
            var totalCount = cat.questions.length + customQs.length;
            // Module progress tracking
            var completedInModule = 0;
            cat.questions.forEach(function (q) {
                if (window.DSAStore.hasFilter(cat.id, q.id, 'completed')) completedInModule++;
            });
            customQs.forEach(function (cq) {
                if (window.DSAStore.hasFilter(cat.id, cq.id, 'completed')) completedInModule++;
            });
            h += '<div class="dsa-category-card anim-card" data-cat-id="' + cat.id + '" style="--cat-color:' + cat.color + '">';
            // Progress indicator top-right
            if (completedInModule > 0 && completedInModule < totalCount) {
                h += '<div class="cat-progress">Completed: ' + completedInModule + '/' + totalCount + '</div>';
            } else if (completedInModule > 0 && completedInModule >= totalCount) {
                h += '<div class="cat-progress cat-progress-done">(completed)</div>';
            }
            h += '<div class="cat-icon">' + cat.icon + '</div>';
            h += '<div class="cat-name">' + cat.name + '</div>';
            h += '<div class="cat-count">' + totalCount + ' Problems' + (customQs.length ? ' <span class="cat-custom-badge">+' + customQs.length + ' custom</span>' : '') + '</div>';
            h += '<div class="cat-difficulties">';
            if (counts.easy) h += '<span class="diff-badge easy">' + counts.easy + ' Easy</span>';
            if (counts.medium) h += '<span class="diff-badge medium">' + counts.medium + ' Medium</span>';
            if (counts.hard) h += '<span class="diff-badge hard">' + counts.hard + ' Hard</span>';
            h += '</div>';
            h += '</div>';
        });
        h += '</div>';

        dsaView.innerHTML = h;

        // Attach click listeners — category cards
        dsaView.querySelectorAll('.dsa-category-card').forEach(function (el) {
            el.addEventListener('click', function () {
                renderQuestionList(el.dataset.catId);
            });
        });

        document.getElementById('dsa-back-home').addEventListener('click', function () {
            window.DevAtlasApp.showSectionPicker();
        });

        document.getElementById('dsa-brand-home').addEventListener('click', function () {
            window.DevAtlasApp.showLandingPage();
        });

        // Filter pill clicks → open filtered view
        dsaView.querySelectorAll('.dsa-filter-pill[data-filter-id]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                renderFilteredView(btn.dataset.filterId);
            });
        });

        // Virtual filter pill clicks
        dsaView.querySelectorAll('.dsa-filter-pill[data-virtual-filter]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var vf = btn.dataset.virtualFilter;
                if (vf === 'incomplete') renderIncompleteView();
                else if (vf === 'custom-questions') renderCustomQuestionsView();
            });
        });

        // Animate cards in
        animateCards();
    }

    // ========== QUESTION LIST VIEW ==========
    function renderQuestionList(catId, questionId) {
        var data = getData();
        var cat = data[catId];
        if (!cat) return;

        currentCategory = catId;
        var dsaView = document.getElementById('dsa-view');

        // All questions: data + custom
        var allQuestions = cat.questions.slice();
        var customQs = window.DSAStore.getCustomQuestions(catId);

        // Default to first question
        var targetQ = questionId || allQuestions[0].id;
        currentQuestion = targetQ;
        currentApproach = 0;

        // Group questions by difficulty
        var groups = { easy: [], medium: [], hard: [] };
        var globalIdx = 0;
        allQuestions.forEach(function (q) {
            globalIdx++;
            groups[q.difficulty].push({ q: q, num: globalIdx, custom: false });
        });

        var h = '<div class="dsa-question-view">';

        // === Floating Sidebar with question list ===
        h += '<div class="dsa-question-sidebar floating" style="--cat-color:' + cat.color + '">';
        h += '<div class="qs-header">';
        h += '<button class="qs-back" id="qs-back-grid">';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'All Categories';
        h += '</button>';
        h += '<div class="qs-cat-name">' + cat.icon + ' ' + cat.name + '</div>';
        h += '<div class="qs-cat-count">' + (allQuestions.length + customQs.length) + ' Problems</div>';
        h += '</div>';
        h += '<div class="qs-list">';

        // Render grouped by difficulty
        var diffOrder = ['easy', 'medium', 'hard'];
        var diffLabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
        diffOrder.forEach(function (diff) {
            var items = groups[diff];
            if (items.length === 0) return;
            h += '<div class="diff-group">';
            h += '<div class="diff-group-label ' + diff + '">' + diffLabels[diff] + ' (' + items.length + ')</div>';
            items.forEach(function (entry) {
                var active = entry.q.id === targetQ ? ' active' : '';
                h += '<div class="qs-item' + active + '" data-q-id="' + entry.q.id + '" data-diff="' + entry.q.difficulty + '">';
                h += '<span class="qs-number">' + entry.num + '</span>';
                h += buildSidebarDot(entry.q.difficulty, catId, entry.q.id);
                h += '<span class="qs-item-title">' + entry.q.title + '</span>';
                h += '</div>';
            });
            h += '</div>';
        });

        // Custom Questions — single list, sorted by difficulty, with edit + trash icons
        if (customQs.length > 0) {
            var diffColors = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' };
            var sortedCustom = customQs.slice().sort(function (a, b) {
                var order = { easy: 0, medium: 1, hard: 2 };
                return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
            });
            h += '<div class="diff-group custom-group">';
            h += '<div class="diff-group-label custom">★ Custom (' + customQs.length + ')</div>';
            sortedCustom.forEach(function (cq) {
                var active = cq.id === targetQ ? ' active' : '';
                h += '<div class="qs-item' + active + '" data-q-id="' + cq.id + '" data-diff="' + cq.difficulty + '" data-custom="true">';
                h += '<span class="qs-custom-tag" style="color:' + diffColors[cq.difficulty] + '">★</span>';
                h += buildSidebarDot(cq.difficulty, catId, cq.id);
                h += '<span class="qs-item-title">' + escapeHtml(cq.title) + '</span>';
                h += '<span class="qs-custom-icons">';
                h += '<span class="qs-edit-icon" data-edit-q="' + cq.id + '" title="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>';
                h += '<span class="qs-trash-icon" data-del-q="' + cq.id + '" title="Delete"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></span>';
                h += '</span>';
                h += '</div>';
            });
            h += '</div>';
        }

        h += '</div>'; // end qs-list

        // === Add Question Button (persistent at bottom) ===
        h += '<div class="qs-add-btn-wrap">';
        h += '<button class="qs-add-btn" id="qs-add-question">';
        h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
        h += ' Add Question';
        h += '</button>';
        h += '</div>';

        h += '</div>'; // end sidebar

        // === Detail area ===
        h += '<div class="dsa-question-detail" id="dsa-q-detail">';
        h += '</div>';

        // === Top breadcrumb nav ===
        h += '<div class="dsa-topnav">';
        h += '<div class="dsa-breadcrumb">';
        h += '<span class="bc-link" id="bc-dsa">DSA</span>';
        h += '<span class="bc-sep">›</span>';
        h += '<span class="bc-link" id="bc-cat">' + cat.name + '</span>';
        h += '<span class="bc-sep">›</span>';
        h += '<span class="bc-current" id="bc-question"></span>';
        h += '</div>';
        h += '</div>';

        h += '</div>';

        dsaView.innerHTML = h;

        // Render the question detail
        renderQuestionDetail(catId, targetQ);

        // Sidebar item clicks
        dsaView.querySelectorAll('.qs-item').forEach(function (el) {
            el.addEventListener('click', function () {
                renderQuestionDetail(catId, el.dataset.qId, el.dataset.custom === 'true');
                dsaView.querySelectorAll('.qs-item').forEach(function (item) {
                    item.classList.toggle('active', item.dataset.qId === el.dataset.qId);
                });
            });
        });

        // Back to grid
        document.getElementById('qs-back-grid').addEventListener('click', function () {
            renderCategoryGrid();
        });

        // Breadcrumb clicks
        document.getElementById('bc-dsa').addEventListener('click', function () {
            renderCategoryGrid();
        });
        document.getElementById('bc-cat').addEventListener('click', function () {
            renderCategoryGrid();
        });

        // Add Question button
        document.getElementById('qs-add-question').addEventListener('click', function () {
            renderAddQuestionDialog(catId);
        });

        // Save position
        window.DSAStore.savePosition('dsa', { catId: catId, questionId: targetQ });

        // Trash icon clicks on custom questions
        dsaView.querySelectorAll('.qs-trash-icon').forEach(function (icon) {
            icon.addEventListener('click', function (e) {
                e.stopPropagation();
                renderDeleteConfirmDialog(catId, icon.dataset.delQ);
            });
        });

        // Edit icon clicks on custom questions
        dsaView.querySelectorAll('.qs-edit-icon').forEach(function (icon) {
            icon.addEventListener('click', function (e) {
                e.stopPropagation();
                renderEditQuestionDialog(catId, icon.dataset.editQ);
            });
        });
    }

    // ========== QUESTION DETAIL ==========
    function renderQuestionDetail(catId, questionId, isCustom) {
        var data = getData();
        var cat = data[catId];
        if (!cat) return;

        var qIndex = -1;
        var question = null;
        var isCustomQuestion = false;

        // Search built-in questions first
        for (var i = 0; i < cat.questions.length; i++) {
            if (cat.questions[i].id === questionId) {
                question = cat.questions[i];
                qIndex = i;
                break;
            }
        }

        // Search custom questions if not found
        if (!question) {
            var customQs = window.DSAStore.getCustomQuestions(catId);
            for (var j = 0; j < customQs.length; j++) {
                if (customQs[j].id === questionId) {
                    question = customQs[j];
                    isCustomQuestion = true;
                    break;
                }
            }
        }
        if (!question) return;

        currentQuestion = questionId;
        currentApproach = 0;

        var detail = document.getElementById('dsa-q-detail');
        if (!detail) return;

        // Update breadcrumb
        var bcQ = document.getElementById('bc-question');
        if (bcQ) bcQ.textContent = question.title;

        // Save position for continue progress feature
        window.DSAStore.savePosition('dsa', { catId: catId, questionId: questionId });

        // Build combined list for navigation (built-in + custom)
        var allNavQuestions = cat.questions.slice();
        var navCustomQs = window.DSAStore.getCustomQuestions(catId);
        navCustomQs.forEach(function (cq) { allNavQuestions.push(cq); });
        var navIdx = -1;
        for (var ni = 0; ni < allNavQuestions.length; ni++) {
            if (allNavQuestions[ni].id === questionId) { navIdx = ni; break; }
        }
        var prevQ = navIdx > 0 ? allNavQuestions[navIdx - 1] : null;
        var nextQ = navIdx < allNavQuestions.length - 1 ? allNavQuestions[navIdx + 1] : null;

        var h = '';

        // Title + difficulty + custom tag
        h += '<div class="q-title-row">';
        h += '<h1 class="q-title">' + escapeHtml(question.title) + '</h1>';
        h += '<span class="diff-badge ' + question.difficulty + '">' + question.difficulty + '</span>';
        if (isCustomQuestion) {
            h += '<span class="q-custom-label">★ Custom</span>';
        }
        h += '</div>';

        // Prev / Next nav
        h += '<div class="q-nav">';
        h += '<button class="q-nav-btn" id="q-prev"' + (prevQ ? '' : ' disabled') + '>';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'Prev';
        h += '</button>';
        h += '<button class="q-nav-btn" id="q-next"' + (nextQ ? '' : ' disabled') + '>';
        h += 'Next';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
        h += '</button>';
        h += '</div>';

        // ===== MULTI-FILTER BUTTONS =====
        var currentFilters = window.DSAStore.getFilter(catId, questionId) || [];
        h += '<div class="q-filter-bar">';
        h += '<span class="q-filter-label">Mark as:</span>';
        window.DSAStore.FILTER_DEFS.forEach(function (def) {
            var isActive = window.DSAStore.hasFilter(catId, questionId, def.id);
            var entry = isActive ? window.DSAStore.getFilterEntry(catId, questionId, def.id) : null;
            var bracketLabel = '';
            if (isActive && entry && entry.level && def.levels) {
                for (var li = 0; li < def.levels.length; li++) {
                    if (def.levels[li].id === entry.level) {
                        bracketLabel = ' (' + def.levels[li].label + ')';
                        break;
                    }
                }
            }
            h += '<button class="q-filter-btn' + (isActive ? ' active' : '') + '" data-filter-id="' + def.id + '" style="--filter-color:' + def.color + '">';
            h += '<span class="qfb-icon">' + def.icon + '</span>';
            h += '<span class="qfb-label">' + def.label + bracketLabel + '</span>';
            h += '</button>';
        });
        h += '</div>';

        // Delete + Edit buttons for custom questions
        if (isCustomQuestion) {
            h += '<div class="q-custom-actions">';
            h += '<button class="q-delete-custom" id="q-delete-custom"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete Question</button>';
            h += '<button class="q-edit-custom" id="q-edit-custom"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit Question Details</button>';
            h += '</div>';
        }

        // Question description
        if (question.description) {
            h += '<div class="q-description">';
            h += '<div class="q-description-title">Problem Description</div>';
            h += '<div class="q-description-body">' + question.description + '</div>';
            h += '</div>';
        }

        // Test cases
        if (question.testCases && question.testCases.length > 0) {
            h += '<div class="q-test-cases">';
            h += '<div class="q-test-cases-title">Test Cases</div>';
            question.testCases.forEach(function (tc, idx) {
                h += '<div class="q-test-case">';
                h += '<div class="tc-header">Case ' + (idx + 1) + '</div>';
                h += '<div class="tc-row"><span class="tc-label">Input:</span> <code>' + escapeHtml(tc.input) + '</code></div>';
                h += '<div class="tc-row"><span class="tc-label">Output:</span> <code>' + escapeHtml(tc.output) + '</code></div>';
                if (tc.explanation) {
                    h += '<div class="tc-row"><span class="tc-label">Explanation:</span> ' + escapeHtml(tc.explanation) + '</div>';
                }
                h += '</div>';
            });
            h += '</div>';
        }

        // Approach tabs (if multiple)
        if (question.approaches && question.approaches.length > 1) {
            h += '<div class="approach-tabs" id="approach-tabs">';
            question.approaches.forEach(function (app, i) {
                h += '<div class="approach-tab' + (i === 0 ? ' active' : '') + '" data-approach="' + i + '">' + app.name + '</div>';
            });
            h += '</div>';
        }

        // Approach content
        if (question.approaches && question.approaches.length > 0) {
            h += '<div id="approach-content"></div>';
        }

        // ===== PERSONAL NOTES =====
        var note = window.DSAStore.getNote(catId, questionId);
        var noteTitle = (note && note.title) ? escapeHtml(note.title) : '';
        var noteContent = (note && note.content) ? escapeHtml(note.content) : '';
        h += '<div class="q-notes-section">';
        h += '<input type="text" class="q-notes-title" id="q-notes-title" value="' + noteTitle + '" placeholder="Add Your Custom Notes">';
        h += '<textarea class="q-notes-textarea" id="q-notes-content" placeholder="Write your notes here...">' + noteContent + '</textarea>';
        h += '</div>';

        detail.innerHTML = h;

        // Render first approach
        if (question.approaches && question.approaches.length > 0) {
            renderApproach(question, 0);
        }

        // Tab clicks
        var tabs = detail.querySelectorAll('.approach-tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var idx = parseInt(tab.dataset.approach);
                currentApproach = idx;
                tabs.forEach(function (t) { t.classList.toggle('active', parseInt(t.dataset.approach) === idx); });
                renderApproach(question, idx);
            });
        });

        // Prev/Next clicks
        if (prevQ) {
            document.getElementById('q-prev').addEventListener('click', function () {
                renderQuestionDetail(catId, prevQ.id);
                updateSidebarActive(prevQ.id);
            });
        }
        if (nextQ) {
            document.getElementById('q-next').addEventListener('click', function () {
                renderQuestionDetail(catId, nextQ.id);
                updateSidebarActive(nextQ.id);
            });
        }

        // Filter button clicks — multi-filter with animation
        detail.querySelectorAll('.q-filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filterId = btn.dataset.filterId;
                var isActive = window.DSAStore.hasFilter(catId, questionId, filterId);
                if (isActive) {
                    // Toggle off — remove this filter
                    window.DSAStore.removeFilter(catId, questionId, filterId);
                    // Animate button out
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(btn, { scale: 1.05 }, { scale: 1, duration: 0.25, ease: 'power2.out' });
                    }
                } else {
                    // Add this filter
                    var def = getFilterDef(filterId);
                    var defaultLevel = (def && def.levels && def.levels.length > 0) ? def.levels[0].id : null;
                    window.DSAStore.addFilter(catId, questionId, filterId, defaultLevel);
                    // Animate button in
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
                    }
                    // Show level selector temporarily if filter has levels
                    if (def && def.levels && def.levels.length > 0) {
                        showLevelSelector(catId, questionId, filterId, def, detail, isCustomQuestion);
                        refreshSidebarDot(catId, questionId);
                        updateFilterButtonLabels(catId, questionId, detail);
                        return;
                    }
                }
                updateFilterButtonLabels(catId, questionId, detail);
                refreshSidebarDot(catId, questionId);
            });
        });

        // Level button clicks (for existing level selectors)
        detail.querySelectorAll('.q-level-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var level = btn.dataset.level;
                var filterId = btn.closest('.q-level-selector').dataset.filterId;
                window.DSAStore.setFilterLevel(catId, questionId, filterId, level);
                updateFilterButtonLabels(catId, questionId, detail);
                refreshSidebarDot(catId, questionId);
                // Remove level selector after selection
                var selector = btn.closest('.q-level-selector');
                if (typeof gsap !== 'undefined') {
                    gsap.to(selector, {
                        opacity: 0, height: 0, marginBottom: 0, duration: 0.3, ease: 'power2.in',
                        onComplete: function () { selector.remove(); }
                    });
                } else {
                    selector.remove();
                }
            });
        });

        // Delete custom question
        if (isCustomQuestion) {
            document.getElementById('q-delete-custom').addEventListener('click', function () {
                renderDeleteConfirmDialog(catId, questionId);
            });
            document.getElementById('q-edit-custom').addEventListener('click', function () {
                renderEditQuestionDialog(catId, questionId);
            });
        }

        // Scroll to top of detail
        detail.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Auto-expand notes textarea
        var notesArea = document.getElementById('q-notes-content');
        if (notesArea) {
            function autoResize() {
                notesArea.style.height = 'auto';
                notesArea.style.height = notesArea.scrollHeight + 'px';
            }
            notesArea.addEventListener('input', function () {
                autoResize();
                saveNotesDebounced(catId, questionId);
            });
            autoResize();
        }
        var notesTitle = document.getElementById('q-notes-title');
        if (notesTitle) {
            notesTitle.addEventListener('input', function () {
                saveNotesDebounced(catId, questionId);
            });
        }
    }

    // Debounced note saving
    var notesSaveTimer = null;
    function saveNotesDebounced(catId, questionId) {
        clearTimeout(notesSaveTimer);
        notesSaveTimer = setTimeout(function () {
            var title = document.getElementById('q-notes-title');
            var content = document.getElementById('q-notes-content');
            if (title && content) {
                window.DSAStore.saveNote(catId, questionId, title.value.trim(), content.value.trim());
            }
        }, 400);
    }

    // Show temporary level selector inline
    function showLevelSelector(catId, questionId, filterId, def, detail, isCustomQuestion) {
        // Remove any existing level selectors
        var existing = detail.querySelectorAll('.q-level-selector');
        existing.forEach(function (el) { el.remove(); });

        var bar = detail.querySelector('.q-filter-bar');
        if (!bar) return;

        var entry = window.DSAStore.getFilterEntry(catId, questionId, filterId);
        var currentLevel = entry ? entry.level : null;

        var selector = document.createElement('div');
        selector.className = 'q-level-selector';
        selector.dataset.filterId = filterId;
        selector.innerHTML = '<span class="q-level-label">Level:</span>' +
            def.levels.map(function (lv) {
                var isLevelActive = currentLevel === lv.id;
                return '<button class="q-level-btn' + (isLevelActive ? ' active' : '') + '" data-level="' + lv.id + '">' + lv.label + '</button>';
            }).join('');

        bar.parentNode.insertBefore(selector, bar.nextSibling);

        if (typeof gsap !== 'undefined') {
            gsap.from(selector, { opacity: 0, height: 0, duration: 0.3, ease: 'power2.out' });
        }

        selector.querySelectorAll('.q-level-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                window.DSAStore.setFilterLevel(catId, questionId, filterId, btn.dataset.level);
                updateFilterButtonLabels(catId, questionId, detail);
                refreshSidebarDot(catId, questionId);
                if (typeof gsap !== 'undefined') {
                    gsap.to(selector, {
                        opacity: 0, height: 0, marginBottom: 0, duration: 0.3, ease: 'power2.in',
                        onComplete: function () { selector.remove(); }
                    });
                } else {
                    selector.remove();
                }
            });
        });
    }

    // Update filter button labels with bracket levels
    function updateFilterButtonLabels(catId, questionId, detail) {
        detail.querySelectorAll('.q-filter-btn').forEach(function (btn) {
            var fid = btn.dataset.filterId;
            var isActive = window.DSAStore.hasFilter(catId, questionId, fid);
            btn.classList.toggle('active', isActive);
            var labelEl = btn.querySelector('.qfb-label');
            var def = getFilterDef(fid);
            if (!def || !labelEl) return;
            var bracketLabel = '';
            if (isActive) {
                var entry = window.DSAStore.getFilterEntry(catId, questionId, fid);
                if (entry && entry.level && def.levels) {
                    for (var i = 0; i < def.levels.length; i++) {
                        if (def.levels[i].id === entry.level) {
                            bracketLabel = ' (' + def.levels[i].label + ')';
                            break;
                        }
                    }
                }
            }
            labelEl.textContent = def.label + bracketLabel;
        });
    }

    function renderApproach(question, index) {
        var app = question.approaches[index];
        if (!app) return;

        var container = document.getElementById('approach-content');
        if (!container) return;

        var h = '<div class="approach-content">';

        // Code block
        h += buildCodeBlock(app.code);

        // Complexity badges
        h += '<div class="approach-complexity">';
        h += '<div class="complexity-badge"><span class="cb-label">Time</span> ' + formatComplexity(app.timeComplexity || '') + '</div>';
        h += '<div class="complexity-badge"><span class="cb-label">Space</span> ' + formatComplexity(app.spaceComplexity || '') + '</div>';
        h += '</div>';

        // Approach description (brief summary)
        var descText = app.description || '';
        if (descText) {
            h += '<div class="approach-description">';
            h += '<div class="approach-description-title">Approach Overview</div>';
            h += escapeHtml(descText);
            h += '</div>';
        }

        // Detailed Walkthrough (the main teaching section)
        var walkthrough = app.detailedWalkthrough || app.explanation || '';
        if (walkthrough) {
            h += '<div class="code-explanation">';
            h += '<div class="explanation-title">Detailed Walkthrough</div>';
            h += '<div class="explanation-body">' + walkthrough + '</div>';
            h += '</div>';
        }

        h += '</div>';

        container.innerHTML = h;

        // Highlight code
        container.querySelectorAll('pre code').forEach(function (el) {
            hljs.highlightElement(el);
        });
    }

    function updateSidebarActive(questionId) {
        document.querySelectorAll('.qs-item').forEach(function (item) {
            item.classList.toggle('active', item.dataset.qId === questionId);
        });
    }

    function refreshSidebarDot(catId, questionId) {
        var item = document.querySelector('.qs-item[data-q-id="' + questionId + '"]');
        if (!item) return;
        var oldDot = item.querySelector('.qs-diff-dot, .qs-tick-mark');
        if (oldDot) {
            var diff = item.dataset.diff || 'easy';
            var tmp = document.createElement('span');
            tmp.innerHTML = buildSidebarDot(diff, catId, questionId);
            oldDot.replaceWith(tmp.firstChild);
        }
    }

    // ========== FILTERED VIEW (full question view with sidebar) ==========
    function renderFilteredView(filterId, startCatId, startQuestionId) {
        var def = getFilterDef(filterId);
        if (!def) return;

        var dsaView = document.getElementById('dsa-view');
        var items = window.DSAStore.getQuestionsByFilter(filterId);
        var data = getData();

        if (items.length === 0) {
            // Show empty state
            var emptyH = '<div class="dsa-filtered-view">';
            emptyH += '<div class="fv-header">';
            emptyH += '<button class="fv-back" id="fv-back">';
            emptyH += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
            emptyH += 'Back';
            emptyH += '</button>';
            emptyH += '<div class="fv-title" style="color:' + def.color + '">' + def.icon + ' ' + def.label + '</div>';
            emptyH += '<div class="fv-count">0 questions</div>';
            emptyH += '</div>';
            emptyH += '<div class="fv-empty">No questions marked as <strong>' + def.label + '</strong> yet.</div>';
            emptyH += '</div>';
            dsaView.innerHTML = emptyH;
            document.getElementById('fv-back').addEventListener('click', function () { renderCategoryGrid(); });
            return;
        }

        // Group items by category for sidebar, and also by level
        var byCat = {};
        items.forEach(function (entry) {
            if (!byCat[entry.catId]) byCat[entry.catId] = [];
            byCat[entry.catId].push(entry);
        });

        // Build flat list for prev/next navigation
        var flatList = [];
        CATEGORY_ORDER.forEach(function (catKey) {
            if (!byCat[catKey]) return;
            byCat[catKey].forEach(function (entry) { flatList.push(entry); });
        });

        var firstEntry = flatList[0];
        var startIdx = 0;
        if (startCatId && startQuestionId) {
            for (var si = 0; si < flatList.length; si++) {
                if (flatList[si].catId === startCatId && flatList[si].questionId === startQuestionId) {
                    firstEntry = flatList[si];
                    startIdx = si;
                    break;
                }
            }
        }

        var h = '<div class="dsa-question-view">';

        // === Sidebar ===
        h += '<div class="dsa-question-sidebar floating" style="--cat-color:' + def.color + '">';
        h += '<div class="qs-header">';
        h += '<button class="qs-back" id="fv-back-grid">';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'All Categories';
        h += '</button>';
        h += '<div class="qs-cat-name" style="color:' + def.color + '">' + def.icon + ' ' + def.label + '</div>';
        h += '<div class="qs-cat-count">' + items.length + ' question' + (items.length !== 1 ? 's' : '') + '</div>';
        h += '</div>';
        h += '<div class="qs-list">';

        // Build sidebar grouped by DS category with collapsible headings
        CATEGORY_ORDER.forEach(function (catKey) {
            if (!byCat[catKey]) return;
            var catName = CAT_NAMES[catKey] || catKey;
            var catItems = byCat[catKey];
            h += '<div class="diff-group fv-sidebar-group">';
            h += '<div class="diff-group-label fv-cat-toggle" data-fv-cat="' + catKey + '">' + catName + ' (' + catItems.length + ') <span class="fv-toggle-arrow">▾</span></div>';
            h += '<div class="fv-cat-items-wrap" data-fv-cat-body="' + catKey + '">';
            catItems.forEach(function (entry) {
                var active = (entry.catId === firstEntry.catId && entry.questionId === firstEntry.questionId) ? ' active' : '';
                // Find question to get difficulty
                var qDiff = 'easy';
                var cat = data[entry.catId];
                if (cat) {
                    cat.questions.forEach(function (q) {
                        if (q.id === entry.questionId) qDiff = q.difficulty;
                    });
                }
                var customQs = window.DSAStore.getCustomQuestions(entry.catId);
                customQs.forEach(function (cq) {
                    if (cq.id === entry.questionId) qDiff = cq.difficulty;
                });
                var dotColor = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[qDiff] || '#525252';
                var isCustomEntry = findQuestion(entry.catId, entry.questionId);
                var entryIsCustom = isCustomEntry && isCustomEntry.isCustom;
                h += '<div class="qs-item' + active + '" data-fv-cat-id="' + entry.catId + '" data-fv-q-id="' + entry.questionId + '">';
                if (entryIsCustom) {
                    h += '<span class="qs-custom-tag" style="color:' + dotColor + '">★</span>';
                } else {
                    h += '<span class="fv-dot" style="background:' + dotColor + '"></span>';
                }
                h += '<span class="qs-item-title">' + escapeHtml(findQuestionTitle(entry.catId, entry.questionId)) + '</span>';
                if (entry.level) {
                    var lvColor = getFilterColor(filterId, entry.level);
                    var lvLabel = entry.level.charAt(0).toUpperCase() + entry.level.slice(1);
                    h += '<span class="fv-item-level" style="color:' + lvColor + '">(' + lvLabel + ')</span>';
                }
                h += '</div>';
            });
            h += '</div>';
            h += '</div>';
        });

        h += '</div>'; // end qs-list
        h += '</div>'; // end sidebar

        // === Detail area ===
        h += '<div class="dsa-question-detail" id="dsa-fv-detail"></div>';

        // === Top breadcrumb nav ===
        h += '<div class="dsa-topnav">';
        h += '<div class="dsa-breadcrumb">';
        h += '<span class="bc-link" id="fv-bc-dsa">DSA</span>';
        h += '<span class="bc-sep">›</span>';
        h += '<span class="bc-link" id="fv-bc-filter" style="color:' + def.color + '">' + def.label + '</span>';
        h += '<span class="bc-sep">›</span>';
        h += '<span class="bc-current" id="fv-bc-question"></span>';
        h += '</div>';
        h += '</div>';

        h += '</div>';

        dsaView.innerHTML = h;

        // Render first question detail using the filtered detail renderer
        renderFilteredQuestionDetail(filterId, firstEntry.catId, firstEntry.questionId, flatList, startIdx);

        // Sidebar item clicks
        dsaView.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (el) {
            el.addEventListener('click', function () {
                var ci = el.dataset.fvCatId;
                var qi = el.dataset.fvQId;
                var idx = 0;
                for (var fi = 0; fi < flatList.length; fi++) {
                    if (flatList[fi].catId === ci && flatList[fi].questionId === qi) { idx = fi; break; }
                }
                renderFilteredQuestionDetail(filterId, ci, qi, flatList, idx);
                dsaView.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (item) {
                    item.classList.toggle('active', item.dataset.fvCatId === ci && item.dataset.fvQId === qi);
                });
            });
        });

        // Collapsible category headings
        dsaView.querySelectorAll('.fv-cat-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var catKey = toggle.dataset.fvCat;
                var body = dsaView.querySelector('[data-fv-cat-body="' + catKey + '"]');
                if (body) {
                    var isHidden = body.style.display === 'none';
                    body.style.display = isHidden ? '' : 'none';
                    toggle.querySelector('.fv-toggle-arrow').textContent = isHidden ? '▾' : '▸';
                }
            });
        });

        // Back to grid
        document.getElementById('fv-back-grid').addEventListener('click', function () { renderCategoryGrid(); });
        document.getElementById('fv-bc-dsa').addEventListener('click', function () { renderCategoryGrid(); });
        document.getElementById('fv-bc-filter').addEventListener('click', function () { renderCategoryGrid(); });
    }

    function findQuestionTitle(catId, questionId) {
        var data = getData();
        var cat = data[catId];
        if (cat) {
            for (var i = 0; i < cat.questions.length; i++) {
                if (cat.questions[i].id === questionId) return cat.questions[i].title;
            }
        }
        var customQs = window.DSAStore.getCustomQuestions(catId);
        for (var j = 0; j < customQs.length; j++) {
            if (customQs[j].id === questionId) return customQs[j].title;
        }
        return questionId;
    }

    function findQuestion(catId, questionId) {
        var data = getData();
        var cat = data[catId];
        if (cat) {
            for (var i = 0; i < cat.questions.length; i++) {
                if (cat.questions[i].id === questionId) return { q: cat.questions[i], isCustom: false };
            }
        }
        var customQs = window.DSAStore.getCustomQuestions(catId);
        for (var j = 0; j < customQs.length; j++) {
            if (customQs[j].id === questionId) return { q: customQs[j], isCustom: true };
        }
        return null;
    }

    function renderFilteredQuestionDetail(filterId, catId, questionId, flatList, currentIdx) {
        var result = findQuestion(catId, questionId);
        if (!result) return;
        var question = result.q;
        var isCustomQuestion = result.isCustom;

        var detail = document.getElementById('dsa-fv-detail');
        if (!detail) return;

        var bcQ = document.getElementById('fv-bc-question');
        if (bcQ) bcQ.textContent = question.title;

        // Save position from filtered view
        window.DSAStore.savePosition('dsa', { catId: catId, questionId: questionId, filterId: filterId });

        var prevEntry = currentIdx > 0 ? flatList[currentIdx - 1] : null;
        var nextEntry = currentIdx < flatList.length - 1 ? flatList[currentIdx + 1] : null;

        var h = '';

        h += '<div class="q-title-row">';
        h += '<h1 class="q-title">' + escapeHtml(question.title) + '</h1>';
        h += '<span class="diff-badge ' + question.difficulty + '">' + question.difficulty + '</span>';
        if (isCustomQuestion) h += '<span class="q-custom-label">★ Custom</span>';
        h += '</div>';

        // Prev / Next nav
        h += '<div class="q-nav">';
        h += '<button class="q-nav-btn fv-prev"' + (prevEntry ? '' : ' disabled') + '>';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'Prev</button>';
        h += '<button class="q-nav-btn fv-next"' + (nextEntry ? '' : ' disabled') + '>';
        h += 'Next';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
        h += '</button>';
        h += '</div>';

        // Multi-filter buttons
        h += '<div class="q-filter-bar">';
        h += '<span class="q-filter-label">Mark as:</span>';
        window.DSAStore.FILTER_DEFS.forEach(function (def) {
            var isActive = window.DSAStore.hasFilter(catId, questionId, def.id);
            var entry = isActive ? window.DSAStore.getFilterEntry(catId, questionId, def.id) : null;
            var bracketLabel = '';
            if (isActive && entry && entry.level && def.levels) {
                for (var li = 0; li < def.levels.length; li++) {
                    if (def.levels[li].id === entry.level) {
                        bracketLabel = ' (' + def.levels[li].label + ')';
                        break;
                    }
                }
            }
            h += '<button class="q-filter-btn' + (isActive ? ' active' : '') + '" data-filter-id="' + def.id + '" style="--filter-color:' + def.color + '">';
            h += '<span class="qfb-icon">' + def.icon + '</span>';
            h += '<span class="qfb-label">' + def.label + bracketLabel + '</span>';
            h += '</button>';
        });
        h += '</div>';

        // Description
        if (question.description) {
            h += '<div class="q-description">';
            h += '<div class="q-description-title">Problem Description</div>';
            h += '<div class="q-description-body">' + question.description + '</div>';
            h += '</div>';
        }

        // Test cases
        if (question.testCases && question.testCases.length > 0) {
            h += '<div class="q-test-cases">';
            h += '<div class="q-test-cases-title">Test Cases</div>';
            question.testCases.forEach(function (tc, idx) {
                h += '<div class="q-test-case">';
                h += '<div class="tc-header">Case ' + (idx + 1) + '</div>';
                h += '<div class="tc-row"><span class="tc-label">Input:</span> <code>' + escapeHtml(tc.input) + '</code></div>';
                h += '<div class="tc-row"><span class="tc-label">Output:</span> <code>' + escapeHtml(tc.output) + '</code></div>';
                if (tc.explanation) h += '<div class="tc-row"><span class="tc-label">Explanation:</span> ' + escapeHtml(tc.explanation) + '</div>';
                h += '</div>';
            });
            h += '</div>';
        }

        // Approach tabs
        if (question.approaches && question.approaches.length > 1) {
            h += '<div class="approach-tabs" id="fv-approach-tabs">';
            question.approaches.forEach(function (app, i) {
                h += '<div class="approach-tab' + (i === 0 ? ' active' : '') + '" data-approach="' + i + '">' + app.name + '</div>';
            });
            h += '</div>';
        }

        if (question.approaches && question.approaches.length > 0) {
            h += '<div id="approach-content"></div>';
        }

        // Notes
        var note = window.DSAStore.getNote(catId, questionId);
        var noteTitle = (note && note.title) ? escapeHtml(note.title) : '';
        var noteContent = (note && note.content) ? escapeHtml(note.content) : '';
        h += '<div class="q-notes-section">';
        h += '<input type="text" class="q-notes-title" id="q-notes-title" value="' + noteTitle + '" placeholder="Add Your Custom Notes">';
        h += '<textarea class="q-notes-textarea" id="q-notes-content" placeholder="Write your notes here...">' + noteContent + '</textarea>';
        h += '</div>';

        detail.innerHTML = h;

        // Render first approach
        if (question.approaches && question.approaches.length > 0) {
            renderApproach(question, 0);
        }

        // Approach tab clicks
        detail.querySelectorAll('.approach-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                var idx = parseInt(tab.dataset.approach);
                detail.querySelectorAll('.approach-tab').forEach(function (t) { t.classList.toggle('active', parseInt(t.dataset.approach) === idx); });
                renderApproach(question, idx);
            });
        });

        // Prev/Next
        var prevBtn = detail.querySelector('.fv-prev');
        var nextBtn = detail.querySelector('.fv-next');
        if (prevEntry && prevBtn) {
            prevBtn.addEventListener('click', function () {
                renderFilteredQuestionDetail(filterId, prevEntry.catId, prevEntry.questionId, flatList, currentIdx - 1);
                updateFilteredSidebarActive(prevEntry.catId, prevEntry.questionId);
            });
        }
        if (nextEntry && nextBtn) {
            nextBtn.addEventListener('click', function () {
                renderFilteredQuestionDetail(filterId, nextEntry.catId, nextEntry.questionId, flatList, currentIdx + 1);
                updateFilteredSidebarActive(nextEntry.catId, nextEntry.questionId);
            });
        }

        // Filter button clicks — same multi-filter logic
        detail.querySelectorAll('.q-filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var fid = btn.dataset.filterId;
                var isActive = window.DSAStore.hasFilter(catId, questionId, fid);
                if (isActive) {
                    window.DSAStore.removeFilter(catId, questionId, fid);
                    // If removing the filter we're viewing, re-render the filtered view
                    if (fid === filterId) {
                        renderFilteredView(filterId);
                        return;
                    }
                } else {
                    var fdef = getFilterDef(fid);
                    var defLevel = (fdef && fdef.levels && fdef.levels.length > 0) ? fdef.levels[0].id : null;
                    window.DSAStore.addFilter(catId, questionId, fid, defLevel);
                    if (fdef && fdef.levels && fdef.levels.length > 0) {
                        showLevelSelector(catId, questionId, fid, fdef, detail, isCustomQuestion);
                        updateFilterButtonLabels(catId, questionId, detail);
                        return;
                    }
                }
                updateFilterButtonLabels(catId, questionId, detail);
            });
        });

        // Notes auto-expand
        var notesArea = document.getElementById('q-notes-content');
        if (notesArea) {
            function autoResizeFv() {
                notesArea.style.height = 'auto';
                notesArea.style.height = notesArea.scrollHeight + 'px';
            }
            notesArea.addEventListener('input', function () {
                autoResizeFv();
                saveNotesDebounced(catId, questionId);
            });
            autoResizeFv();
        }
        var notesTitle = document.getElementById('q-notes-title');
        if (notesTitle) {
            notesTitle.addEventListener('input', function () {
                saveNotesDebounced(catId, questionId);
            });
        }

        detail.scrollTop = 0;
    }

    function updateFilteredSidebarActive(catId, questionId) {
        document.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (item) {
            item.classList.toggle('active', item.dataset.fvCatId === catId && item.dataset.fvQId === questionId);
        });
    }

    // ========== ADD QUESTION DIALOG ==========
    function renderAddQuestionDialog(catId) {
        var existing = document.getElementById('add-q-overlay');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'add-q-overlay';
        overlay.className = 'dialog-overlay';

        var h = '<div class="dialog-box add-q-dialog">';
        h += '<div class="dialog-title">Add Custom Question</div>';
        h += '<div class="dialog-scroll-body">';

        h += '<div class="dialog-field">';
        h += '<label>Title <span class="dialog-req">*</span></label>';
        h += '<input type="text" id="aq-title" maxlength="80" placeholder="e.g. Two Sum With Target">';
        h += '<span class="dialog-charcount" id="aq-title-count">0/80</span>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Difficulty <span class="dialog-req">*</span></label>';
        h += '<div class="dialog-diff-chooser" id="aq-diff-chooser">';
        h += '<button class="dialog-diff-btn easy" data-diff="easy">Easy</button>';
        h += '<button class="dialog-diff-btn medium" data-diff="medium">Medium</button>';
        h += '<button class="dialog-diff-btn hard" data-diff="hard">Hard</button>';
        h += '</div>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Description</label>';
        h += '<textarea id="aq-desc" rows="3" placeholder="Problem statement..."></textarea>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Test Cases</label>';
        h += '<div id="aq-testcases"></div>';
        h += '<button class="dialog-add-tc" id="aq-add-tc">+ Add Test Case</button>';
        h += '</div>';

        // Language — 4 horizontal buttons (default C++)
        h += '<div class="dialog-field">';
        h += '<label>Language</label>';
        h += '<div class="dialog-lang-chooser" id="aq-lang-chooser">';
        h += '<button class="dialog-lang-btn selected" data-lang="cpp">C++</button>';
        h += '<button class="dialog-lang-btn" data-lang="c">C</button>';
        h += '<button class="dialog-lang-btn" data-lang="python">Python</button>';
        h += '<button class="dialog-lang-btn" data-lang="java">Java</button>';
        h += '</div>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Code</label>';
        h += '<textarea id="aq-code" rows="8" class="dialog-code-area" placeholder="// Your solution code..."></textarea>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Time Complexity</label>';
        h += '<div class="complexity-input-wrap"><span class="complexity-prefix">O(</span><input type="text" id="aq-time" class="complexity-input" placeholder="n^2"><span class="complexity-suffix">)</span></div>';
        h += '<span class="dialog-hint">Type the expression inside O(). Use ^ for superscript: n^2 → O(n²), n^(log n) → O(n<sup>log n</sup>)</span>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Space Complexity</label>';
        h += '<div class="complexity-input-wrap"><span class="complexity-prefix">O(</span><input type="text" id="aq-space" class="complexity-input" placeholder="1"><span class="complexity-suffix">)</span></div>';
        h += '</div>';;

        h += '<div class="dialog-field">';
        h += '<label>Overview</label>';
        h += '<textarea id="aq-overview" rows="3" placeholder="Brief approach overview..."></textarea>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Detailed Walkthrough</label>';
        h += '<textarea id="aq-walkthrough" rows="5" placeholder="Step-by-step explanation..."></textarea>';
        h += '</div>';

        h += '</div>'; // end dialog-scroll-body

        h += '<div class="dialog-actions-sticky">';
        h += '<button class="dialog-cancel" id="aq-cancel">Cancel</button>';
        h += '<button class="dialog-save" id="aq-save">Save Question</button>';
        h += '</div>';

        h += '</div>';
        overlay.innerHTML = h;
        document.body.appendChild(overlay);

        // State
        var selectedDiff = null;
        var selectedLang = 'cpp';
        var testCaseCount = 0;

        // Char count
        document.getElementById('aq-title').addEventListener('input', function () {
            document.getElementById('aq-title-count').textContent = this.value.length + '/80';
        });

        // Difficulty chooser
        overlay.querySelectorAll('.dialog-diff-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                selectedDiff = btn.dataset.diff;
                overlay.querySelectorAll('.dialog-diff-btn').forEach(function (b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
            });
        });

        // Language chooser (horizontal buttons)
        overlay.querySelectorAll('.dialog-lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                selectedLang = btn.dataset.lang;
                overlay.querySelectorAll('.dialog-lang-btn').forEach(function (b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
            });
        });

        // Add test case
        function addTestCaseRow() {
            testCaseCount++;
            var tcDiv = document.createElement('div');
            tcDiv.className = 'dialog-tc-row';
            tcDiv.innerHTML = '<div class="tc-row-header">Case ' + testCaseCount +
                ' <button class="tc-remove" data-tc="' + testCaseCount + '">×</button></div>' +
                '<input type="text" class="tc-input" placeholder="Input">' +
                '<input type="text" class="tc-output" placeholder="Output">' +
                '<input type="text" class="tc-explanation" placeholder="Explanation (optional)">';
            document.getElementById('aq-testcases').appendChild(tcDiv);
            tcDiv.querySelector('.tc-remove').addEventListener('click', function () {
                tcDiv.remove();
            });
        }
        document.getElementById('aq-add-tc').addEventListener('click', addTestCaseRow);

        // Cancel
        document.getElementById('aq-cancel').addEventListener('click', function () {
            overlay.remove();
        });
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.remove();
        });

        // Save
        document.getElementById('aq-save').addEventListener('click', function () {
            var title = document.getElementById('aq-title').value.trim();
            if (!title) { document.getElementById('aq-title').focus(); return; }
            if (!selectedDiff) return;

            var desc = document.getElementById('aq-desc').value.trim();
            var code = document.getElementById('aq-code').value.trim();
            var timeRaw = document.getElementById('aq-time').value.trim();
            var spaceRaw = document.getElementById('aq-space').value.trim();
            var time = timeRaw ? 'O(' + formatComplexity(timeRaw) + ')' : '';
            var space = spaceRaw ? 'O(' + formatComplexity(spaceRaw) + ')' : '';
            var overview = document.getElementById('aq-overview').value.trim();
            var walkthrough = document.getElementById('aq-walkthrough').value.trim();

            var testCases = [];
            document.querySelectorAll('.dialog-tc-row').forEach(function (row) {
                var inp = row.querySelector('.tc-input').value.trim();
                var out = row.querySelector('.tc-output').value.trim();
                var expl = row.querySelector('.tc-explanation') ? row.querySelector('.tc-explanation').value.trim() : '';
                if (inp || out) testCases.push({ input: inp, output: out, explanation: expl || undefined });
            });

            var q = {
                id: 'custom-' + Date.now(),
                title: title,
                difficulty: selectedDiff,
                description: desc,
                testCases: testCases,
                approaches: []
            };

            if (code || overview || walkthrough) {
                q.approaches.push({
                    name: 'Solution',
                    code: code,
                    language: selectedLang,
                    timeComplexity: time || 'N/A',
                    spaceComplexity: space || 'N/A',
                    description: overview,
                    detailedWalkthrough: walkthrough
                });
            }

            window.DSAStore.addCustomQuestion(catId, q);
            overlay.remove();
            renderQuestionList(catId, q.id);
        });
    }

    // ========== DELETE CONFIRM DIALOG ==========
    function renderDeleteConfirmDialog(catId, questionId, onDeleteCallback) {
        var existing = document.getElementById('delete-q-overlay');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'delete-q-overlay';
        overlay.className = 'dialog-overlay';

        var h = '<div class="dialog-box delete-q-dialog">';
        h += '<div class="dialog-title">Delete Custom Question?</div>';
        h += '<p class="dialog-msg">This action is permanent and cannot be undone.</p>';
        h += '<div class="dialog-actions-sticky">';
        h += '<button class="dialog-cancel" id="dq-cancel">Cancel</button>';
        h += '<button class="dialog-delete" id="dq-confirm">Delete</button>';
        h += '</div>';
        h += '</div>';

        overlay.innerHTML = h;
        document.body.appendChild(overlay);

        document.getElementById('dq-cancel').addEventListener('click', function () {
            overlay.remove();
        });
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.remove();
        });
        document.getElementById('dq-confirm').addEventListener('click', function () {
            window.DSAStore.deleteCustomQuestion(catId, questionId);
            overlay.remove();
            if (onDeleteCallback) { onDeleteCallback(); } else { renderQuestionList(catId); }
        });
    }

    // ========== COMPLEXITY FORMATTER (superscript support) ==========
    // Converts n^2 → n<sup>2</sup>, n^(log n) → n<sup>log n</sup>
    function formatComplexity(str) {
        if (!str) return str;
        // Normalize whitespace around ^ so no stray spaces end up near exponent
        str = str.replace(/\s*\^\s*/g, '^');
        // Convert old <sup> to <span class="exp"> (re-formatting previously saved values)
        str = str.replace(/<sup>/g, '<span class="exp">').replace(/<\/sup>/g, '</span>');
        // Handle n^(expr) — parenthesized exponent
        str = str.replace(/\^\(([^)]+)\)/g, function (match, inner) {
            return '<span class="exp">' + inner.trim() + '</span>';
        });
        // Handle n^x — single token exponent
        str = str.replace(/\^([^\s<()+*/]+)/g, function (match, exp) {
            return '<span class="exp">' + exp.trim() + '</span>';
        });
        return str;
    }

    // Strip HTML superscripts back to caret notation for editing
    function unformatComplexity(str) {
        if (!str) return '';
        // Remove O( prefix and ) suffix if present
        str = str.replace(/^O\(/, '').replace(/\)$/, '');
        // Convert <span class="exp">...</span> back to ^(...)
        str = str.replace(/<span class="exp">([^<]+)<\/span>/g, '^($1)');
        // Also handle legacy <sup>...</sup>
        str = str.replace(/<sup>([^<]+)<\/sup>/g, '^($1)');
        return str;
    }

    // ========== EDIT QUESTION DIALOG ==========
    function renderEditQuestionDialog(catId, questionId) {
        var customQs = window.DSAStore.getCustomQuestions(catId);
        var question = null;
        for (var i = 0; i < customQs.length; i++) {
            if (customQs[i].id === questionId) { question = customQs[i]; break; }
        }
        if (!question) return;

        var existing = document.getElementById('add-q-overlay');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'add-q-overlay';
        overlay.className = 'dialog-overlay';

        var approach = (question.approaches && question.approaches.length > 0) ? question.approaches[0] : {};
        var timeVal = unformatComplexity(approach.timeComplexity || '');
        var spaceVal = unformatComplexity(approach.spaceComplexity || '');
        var langVal = approach.language || 'cpp';

        var h = '<div class="dialog-box add-q-dialog">';
        h += '<div class="dialog-title">Edit Custom Question</div>';
        h += '<div class="dialog-scroll-body">';

        h += '<div class="dialog-field">';
        h += '<label>Title <span class="dialog-req">*</span></label>';
        h += '<input type="text" id="aq-title" maxlength="80" value="' + escapeHtml(question.title) + '">';
        h += '<span class="dialog-charcount" id="aq-title-count">' + question.title.length + '/80</span>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Difficulty <span class="dialog-req">*</span></label>';
        h += '<div class="dialog-diff-chooser" id="aq-diff-chooser">';
        h += '<button class="dialog-diff-btn easy' + (question.difficulty === 'easy' ? ' selected' : '') + '" data-diff="easy">Easy</button>';
        h += '<button class="dialog-diff-btn medium' + (question.difficulty === 'medium' ? ' selected' : '') + '" data-diff="medium">Medium</button>';
        h += '<button class="dialog-diff-btn hard' + (question.difficulty === 'hard' ? ' selected' : '') + '" data-diff="hard">Hard</button>';
        h += '</div>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Description</label>';
        h += '<textarea id="aq-desc" rows="3">' + escapeHtml(question.description || '') + '</textarea>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Test Cases</label>';
        h += '<div id="aq-testcases"></div>';
        h += '<button class="dialog-add-tc" id="aq-add-tc">+ Add Test Case</button>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Language</label>';
        h += '<div class="dialog-lang-chooser" id="aq-lang-chooser">';
        ['cpp', 'c', 'python', 'java'].forEach(function (lang) {
            var labels = { cpp: 'C++', c: 'C', python: 'Python', java: 'Java' };
            h += '<button class="dialog-lang-btn' + (langVal === lang ? ' selected' : '') + '" data-lang="' + lang + '">' + labels[lang] + '</button>';
        });
        h += '</div>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Code</label>';
        h += '<textarea id="aq-code" rows="8" class="dialog-code-area">' + escapeHtml(approach.code || '') + '</textarea>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Time Complexity</label>';
        h += '<div class="complexity-input-wrap"><span class="complexity-prefix">O(</span><input type="text" id="aq-time" class="complexity-input" value="' + escapeHtml(timeVal) + '" placeholder="n^2"><span class="complexity-suffix">)</span></div>';
        h += '<span class="dialog-hint">Type the expression inside O(). Use ^ for superscript: n^2 \u2192 O(n\u00b2), n^(log n) \u2192 O(n<sup>log n</sup>)</span>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Space Complexity</label>';
        h += '<div class="complexity-input-wrap"><span class="complexity-prefix">O(</span><input type="text" id="aq-space" class="complexity-input" value="' + escapeHtml(spaceVal) + '" placeholder="1"><span class="complexity-suffix">)</span></div>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Overview</label>';
        h += '<textarea id="aq-overview" rows="3">' + escapeHtml(approach.description || '') + '</textarea>';
        h += '</div>';

        h += '<div class="dialog-field">';
        h += '<label>Detailed Walkthrough</label>';
        h += '<textarea id="aq-walkthrough" rows="5">' + escapeHtml(approach.detailedWalkthrough || '') + '</textarea>';
        h += '</div>';

        h += '</div>';

        h += '<div class="dialog-actions-sticky">';
        h += '<button class="dialog-cancel" id="aq-cancel">Cancel</button>';
        h += '<button class="dialog-save" id="aq-save">Save Changes</button>';
        h += '</div>';

        h += '</div>';
        overlay.innerHTML = h;
        document.body.appendChild(overlay);

        var selectedDiff = question.difficulty;
        var selectedLang = langVal;
        var testCaseCount = 0;

        // Char count
        document.getElementById('aq-title').addEventListener('input', function () {
            document.getElementById('aq-title-count').textContent = this.value.length + '/80';
        });

        // Difficulty chooser
        overlay.querySelectorAll('.dialog-diff-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                selectedDiff = btn.dataset.diff;
                overlay.querySelectorAll('.dialog-diff-btn').forEach(function (b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
            });
        });

        // Language chooser
        overlay.querySelectorAll('.dialog-lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                selectedLang = btn.dataset.lang;
                overlay.querySelectorAll('.dialog-lang-btn').forEach(function (b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
            });
        });

        // Pre-fill test cases
        if (question.testCases && question.testCases.length > 0) {
            question.testCases.forEach(function (tc) {
                testCaseCount++;
                var tcDiv = document.createElement('div');
                tcDiv.className = 'dialog-tc-row';
                tcDiv.innerHTML = '<div class="tc-row-header">Case ' + testCaseCount +
                    ' <button class="tc-remove">\u00d7</button></div>' +
                    '<input type="text" class="tc-input" value="' + escapeHtml(tc.input || '') + '" placeholder="Input">' +
                    '<input type="text" class="tc-output" value="' + escapeHtml(tc.output || '') + '" placeholder="Output">' +
                    '<input type="text" class="tc-explanation" value="' + escapeHtml(tc.explanation || '') + '" placeholder="Explanation (optional)">';
                document.getElementById('aq-testcases').appendChild(tcDiv);
                tcDiv.querySelector('.tc-remove').addEventListener('click', function () { tcDiv.remove(); });
            });
        }

        // Add test case
        function addTestCaseRow() {
            testCaseCount++;
            var tcDiv = document.createElement('div');
            tcDiv.className = 'dialog-tc-row';
            tcDiv.innerHTML = '<div class="tc-row-header">Case ' + testCaseCount +
                ' <button class="tc-remove">\u00d7</button></div>' +
                '<input type="text" class="tc-input" placeholder="Input">' +
                '<input type="text" class="tc-output" placeholder="Output">' +
                '<input type="text" class="tc-explanation" placeholder="Explanation (optional)">';
            document.getElementById('aq-testcases').appendChild(tcDiv);
            tcDiv.querySelector('.tc-remove').addEventListener('click', function () { tcDiv.remove(); });
        }
        document.getElementById('aq-add-tc').addEventListener('click', addTestCaseRow);

        // Cancel
        document.getElementById('aq-cancel').addEventListener('click', function () { overlay.remove(); });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });

        // Save
        document.getElementById('aq-save').addEventListener('click', function () {
            var title = document.getElementById('aq-title').value.trim();
            if (!title) { document.getElementById('aq-title').focus(); return; }
            if (!selectedDiff) return;

            var desc = document.getElementById('aq-desc').value.trim();
            var code = document.getElementById('aq-code').value.trim();
            var timeRaw = document.getElementById('aq-time').value.trim();
            var spaceRaw = document.getElementById('aq-space').value.trim();
            var time = timeRaw ? 'O(' + formatComplexity(timeRaw) + ')' : '';
            var space = spaceRaw ? 'O(' + formatComplexity(spaceRaw) + ')' : '';
            var overview = document.getElementById('aq-overview').value.trim();
            var walkthrough = document.getElementById('aq-walkthrough').value.trim();

            var testCases = [];
            overlay.querySelectorAll('.dialog-tc-row').forEach(function (row) {
                var inp = row.querySelector('.tc-input').value.trim();
                var out = row.querySelector('.tc-output').value.trim();
                var expl = row.querySelector('.tc-explanation') ? row.querySelector('.tc-explanation').value.trim() : '';
                if (inp || out) testCases.push({ input: inp, output: out, explanation: expl || undefined });
            });

            // Update the question in store
            question.title = title;
            question.difficulty = selectedDiff;
            question.description = desc;
            question.testCases = testCases;
            question.approaches = [];
            if (code || overview || walkthrough) {
                question.approaches.push({
                    name: 'Solution',
                    code: code,
                    language: selectedLang,
                    timeComplexity: time || 'N/A',
                    spaceComplexity: space || 'N/A',
                    description: overview,
                    detailedWalkthrough: walkthrough
                });
            }

            window.DSAStore.updateCustomQuestion(catId, questionId, question);
            overlay.remove();
            renderQuestionList(catId, questionId);
        });
    }

    // ========== INCOMPLETE VIEW (virtual filter) ==========
    function renderIncompleteView() {
        var dsaView = document.getElementById('dsa-view');
        var data = getData();
        var diffOrder = ['easy', 'medium', 'hard'];

        // Gather all incomplete questions grouped by category
        var byCat = {};
        var totalCount = 0;
        CATEGORY_ORDER.forEach(function (catKey) {
            var cat = data[catKey];
            if (!cat) return;
            var items = [];
            cat.questions.forEach(function (q) {
                if (!window.DSAStore.hasFilter(catKey, q.id, 'completed')) {
                    items.push({ catId: catKey, questionId: q.id, q: q, isCustom: false });
                }
            });
            var customQs = window.DSAStore.getCustomQuestions(catKey);
            customQs.forEach(function (cq) {
                if (!window.DSAStore.hasFilter(catKey, cq.id, 'completed')) {
                    items.push({ catId: catKey, questionId: cq.id, q: cq, isCustom: true });
                }
            });
            if (items.length > 0) {
                // Sort by difficulty within category
                items.sort(function (a, b) {
                    var order = { easy: 0, medium: 1, hard: 2 };
                    return (order[a.q.difficulty] || 0) - (order[b.q.difficulty] || 0);
                });
                byCat[catKey] = items;
                totalCount += items.length;
            }
        });

        if (totalCount === 0) {
            var emptyH = '<div class="dsa-filtered-view">';
            emptyH += '<div class="fv-header">';
            emptyH += '<button class="fv-back" id="fv-back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> Back</button>';
            emptyH += '<div class="fv-title" style="color:#71717a">○ Incomplete</div>';
            emptyH += '<div class="fv-count">0 questions</div>';
            emptyH += '</div>';
            emptyH += '<div class="fv-empty">All questions are completed! 🎉</div>';
            emptyH += '</div>';
            dsaView.innerHTML = emptyH;
            document.getElementById('fv-back').addEventListener('click', function () { renderCategoryGrid(); });
            return;
        }

        // Build flat list for navigation
        var flatList = [];
        CATEGORY_ORDER.forEach(function (catKey) {
            if (!byCat[catKey]) return;
            byCat[catKey].forEach(function (entry) { flatList.push(entry); });
        });

        var firstEntry = flatList[0];
        var h = '<div class="dsa-question-view">';

        // Sidebar
        h += '<div class="dsa-question-sidebar floating" style="--cat-color:#71717a">';
        h += '<div class="qs-header">';
        h += '<button class="qs-back" id="fv-back-grid"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> All Categories</button>';
        h += '<div class="qs-cat-name" style="color:#71717a">○ Incomplete</div>';
        h += '<div class="qs-cat-count">' + totalCount + ' question' + (totalCount !== 1 ? 's' : '') + '</div>';
        h += '</div>';
        h += '<div class="qs-list">';

        CATEGORY_ORDER.forEach(function (catKey) {
            if (!byCat[catKey]) return;
            var catName = CAT_NAMES[catKey] || catKey;
            var catItems = byCat[catKey];
            h += '<div class="diff-group fv-sidebar-group">';
            h += '<div class="diff-group-label fv-cat-toggle" data-fv-cat="' + catKey + '">' + catName + ' (' + catItems.length + ') <span class="fv-toggle-arrow">▾</span></div>';
            h += '<div class="fv-cat-items-wrap" data-fv-cat-body="' + catKey + '">';
            catItems.forEach(function (entry) {
                var active = (entry.catId === firstEntry.catId && entry.questionId === firstEntry.questionId) ? ' active' : '';
                var dotColor = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[entry.q.difficulty] || '#525252';
                h += '<div class="qs-item' + active + '" data-fv-cat-id="' + entry.catId + '" data-fv-q-id="' + entry.questionId + '">';
                h += '<span class="fv-dot" style="background:' + dotColor + '"></span>';
                h += '<span class="qs-item-title">' + escapeHtml(entry.q.title) + '</span>';
                if (entry.isCustom) h += '<span class="q-custom-label" style="font-size:10px;margin-left:auto">★</span>';
                h += '</div>';
            });
            h += '</div></div>';
        });

        h += '</div></div>';

        // Detail area
        h += '<div class="dsa-question-detail" id="dsa-fv-detail"></div>';

        // Breadcrumb
        h += '<div class="dsa-topnav"><div class="dsa-breadcrumb">';
        h += '<span class="bc-link" id="fv-bc-dsa">DSA</span><span class="bc-sep">›</span>';
        h += '<span class="bc-link" id="fv-bc-filter" style="color:#71717a">Incomplete</span><span class="bc-sep">›</span>';
        h += '<span class="bc-current" id="fv-bc-question"></span>';
        h += '</div></div></div>';

        dsaView.innerHTML = h;

        renderVirtualFilterDetail(firstEntry.catId, firstEntry.questionId, flatList, 0, 'incomplete');

        // Sidebar clicks
        dsaView.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (el) {
            el.addEventListener('click', function () {
                var ci = el.dataset.fvCatId, qi = el.dataset.fvQId;
                var idx = 0;
                for (var fi = 0; fi < flatList.length; fi++) {
                    if (flatList[fi].catId === ci && flatList[fi].questionId === qi) { idx = fi; break; }
                }
                renderVirtualFilterDetail(ci, qi, flatList, idx, 'incomplete');
                dsaView.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (item) {
                    item.classList.toggle('active', item.dataset.fvCatId === ci && item.dataset.fvQId === qi);
                });
            });
        });

        // Collapsible headings
        dsaView.querySelectorAll('.fv-cat-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var body = dsaView.querySelector('[data-fv-cat-body="' + toggle.dataset.fvCat + '"]');
                if (body) { var h = body.style.display === 'none'; body.style.display = h ? '' : 'none'; toggle.querySelector('.fv-toggle-arrow').textContent = h ? '▾' : '▸'; }
            });
        });

        document.getElementById('fv-back-grid').addEventListener('click', function () { renderCategoryGrid(); });
        document.getElementById('fv-bc-dsa').addEventListener('click', function () { renderCategoryGrid(); });
        document.getElementById('fv-bc-filter').addEventListener('click', function () { renderCategoryGrid(); });
    }

    // ========== CUSTOM QUESTIONS VIEW (virtual filter) ==========
    function renderCustomQuestionsView() {
        var dsaView = document.getElementById('dsa-view');
        var data = getData();
        var allCustom = window.DSAStore.getAllCustomQuestions();

        var byCat = {};
        var totalCount = 0;
        CATEGORY_ORDER.forEach(function (catKey) {
            var customQs = allCustom[catKey];
            if (!customQs || customQs.length === 0) return;
            var items = customQs.map(function (cq) { return { catId: catKey, questionId: cq.id, q: cq, isCustom: true }; });
            items.sort(function (a, b) {
                var order = { easy: 0, medium: 1, hard: 2 };
                return (order[a.q.difficulty] || 0) - (order[b.q.difficulty] || 0);
            });
            byCat[catKey] = items;
            totalCount += customQs.length;
        });

        if (totalCount === 0) {
            var emptyH = '<div class="dsa-filtered-view">';
            emptyH += '<div class="fv-header">';
            emptyH += '<button class="fv-back" id="fv-back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> Back</button>';
            emptyH += '<div class="fv-title" style="color:#facc15">★ Custom Questions</div>';
            emptyH += '<div class="fv-count">0 questions</div>';
            emptyH += '</div>';
            emptyH += '<div class="fv-empty">No custom questions added yet.</div>';
            emptyH += '</div>';
            dsaView.innerHTML = emptyH;
            document.getElementById('fv-back').addEventListener('click', function () { renderCategoryGrid(); });
            return;
        }

        var flatList = [];
        CATEGORY_ORDER.forEach(function (catKey) {
            if (!byCat[catKey]) return;
            byCat[catKey].forEach(function (entry) { flatList.push(entry); });
        });

        var firstEntry = flatList[0];
        var h = '<div class="dsa-question-view">';

        h += '<div class="dsa-question-sidebar floating" style="--cat-color:#facc15">';
        h += '<div class="qs-header">';
        h += '<button class="qs-back" id="fv-back-grid"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> All Categories</button>';
        h += '<div class="qs-cat-name" style="color:#facc15">★ Custom Questions</div>';
        h += '<div class="qs-cat-count">' + totalCount + ' question' + (totalCount !== 1 ? 's' : '') + '</div>';
        h += '</div>';
        h += '<div class="qs-list">';

        CATEGORY_ORDER.forEach(function (catKey) {
            if (!byCat[catKey]) return;
            var catName = CAT_NAMES[catKey] || catKey;
            var catItems = byCat[catKey];
            h += '<div class="diff-group fv-sidebar-group">';
            h += '<div class="diff-group-label fv-cat-toggle" data-fv-cat="' + catKey + '">' + catName + ' (' + catItems.length + ') <span class="fv-toggle-arrow">▾</span></div>';
            h += '<div class="fv-cat-items-wrap" data-fv-cat-body="' + catKey + '">';
            catItems.forEach(function (entry) {
                var active = (entry.catId === firstEntry.catId && entry.questionId === firstEntry.questionId) ? ' active' : '';
                var dotColor = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' }[entry.q.difficulty] || '#525252';
                h += '<div class="qs-item' + active + '" data-fv-cat-id="' + entry.catId + '" data-fv-q-id="' + entry.questionId + '">';
                h += '<span class="qs-custom-tag" style="color:' + dotColor + '">★</span>';
                h += '<span class="qs-item-title">' + escapeHtml(entry.q.title) + '</span>';
                h += '<span class="qs-custom-icons">';
                h += '<span class="qs-edit-icon" data-edit-cat="' + entry.catId + '" data-edit-q="' + entry.questionId + '" title="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>';
                h += '<span class="qs-trash-icon" data-del-cat="' + entry.catId + '" data-del-q="' + entry.questionId + '" title="Delete"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></span>';
                h += '</span>';
                h += '</div>';
            });
            h += '</div></div>';
        });

        h += '</div></div>';

        h += '<div class="dsa-question-detail" id="dsa-fv-detail"></div>';

        h += '<div class="dsa-topnav"><div class="dsa-breadcrumb">';
        h += '<span class="bc-link" id="fv-bc-dsa">DSA</span><span class="bc-sep">›</span>';
        h += '<span class="bc-link" id="fv-bc-filter" style="color:#facc15">Custom Questions</span><span class="bc-sep">›</span>';
        h += '<span class="bc-current" id="fv-bc-question"></span>';
        h += '</div></div></div>';

        dsaView.innerHTML = h;

        renderVirtualFilterDetail(firstEntry.catId, firstEntry.questionId, flatList, 0, 'custom-questions');

        dsaView.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (el) {
            el.addEventListener('click', function () {
                var ci = el.dataset.fvCatId, qi = el.dataset.fvQId;
                var idx = 0;
                for (var fi = 0; fi < flatList.length; fi++) {
                    if (flatList[fi].catId === ci && flatList[fi].questionId === qi) { idx = fi; break; }
                }
                renderVirtualFilterDetail(ci, qi, flatList, idx, 'custom-questions');
                dsaView.querySelectorAll('.qs-item[data-fv-q-id]').forEach(function (item) {
                    item.classList.toggle('active', item.dataset.fvCatId === ci && item.dataset.fvQId === qi);
                });
            });
        });

        dsaView.querySelectorAll('.fv-cat-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var body = dsaView.querySelector('[data-fv-cat-body="' + toggle.dataset.fvCat + '"]');
                if (body) { var h = body.style.display === 'none'; body.style.display = h ? '' : 'none'; toggle.querySelector('.fv-toggle-arrow').textContent = h ? '▾' : '▸'; }
            });
        });

        // Edit icon clicks on custom questions in sidebar
        dsaView.querySelectorAll('.qs-edit-icon[data-edit-q]').forEach(function (icon) {
            icon.addEventListener('click', function (e) {
                e.stopPropagation();
                renderEditQuestionDialog(icon.dataset.editCat, icon.dataset.editQ);
            });
        });

        // Trash icon clicks on custom questions in sidebar
        dsaView.querySelectorAll('.qs-trash-icon[data-del-q]').forEach(function (icon) {
            icon.addEventListener('click', function (e) {
                e.stopPropagation();
                renderDeleteConfirmDialog(icon.dataset.delCat, icon.dataset.delQ, function () { renderCustomQuestionsView(); });
            });
        });

        document.getElementById('fv-back-grid').addEventListener('click', function () { renderCategoryGrid(); });
        document.getElementById('fv-bc-dsa').addEventListener('click', function () { renderCategoryGrid(); });
        document.getElementById('fv-bc-filter').addEventListener('click', function () { renderCategoryGrid(); });
    }

    // ========== VIRTUAL FILTER DETAIL RENDERER ==========
    function renderVirtualFilterDetail(catId, questionId, flatList, currentIdx, viewType) {
        var result = findQuestion(catId, questionId);
        if (!result) return;
        var question = result.q;
        var isCustomQuestion = result.isCustom;

        // Save position for continuation tracking
        window.DSAStore.savePosition('dsa', { catId: catId, questionId: questionId, virtualFilter: viewType });

        var detail = document.getElementById('dsa-fv-detail');
        if (!detail) return;

        var bcQ = document.getElementById('fv-bc-question');
        if (bcQ) bcQ.textContent = question.title;

        var prevEntry = currentIdx > 0 ? flatList[currentIdx - 1] : null;
        var nextEntry = currentIdx < flatList.length - 1 ? flatList[currentIdx + 1] : null;

        var h = '';
        h += '<div class="q-title-row">';
        h += '<h1 class="q-title">' + escapeHtml(question.title) + '</h1>';
        h += '<span class="diff-badge ' + question.difficulty + '">' + question.difficulty + '</span>';
        if (isCustomQuestion) h += '<span class="q-custom-label">★ Custom</span>';
        h += '</div>';

        h += '<div class="q-nav">';
        h += '<button class="q-nav-btn fv-prev"' + (prevEntry ? '' : ' disabled') + '><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> Prev</button>';
        h += '<button class="q-nav-btn fv-next"' + (nextEntry ? '' : ' disabled') + '>Next <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>';
        h += '</div>';

        // Filter buttons
        h += '<div class="q-filter-bar"><span class="q-filter-label">Mark as:</span>';
        window.DSAStore.FILTER_DEFS.forEach(function (def) {
            var isActive = window.DSAStore.hasFilter(catId, questionId, def.id);
            var entry = isActive ? window.DSAStore.getFilterEntry(catId, questionId, def.id) : null;
            var bracketLabel = '';
            if (isActive && entry && entry.level && def.levels) {
                for (var li = 0; li < def.levels.length; li++) {
                    if (def.levels[li].id === entry.level) { bracketLabel = ' (' + def.levels[li].label + ')'; break; }
                }
            }
            h += '<button class="q-filter-btn' + (isActive ? ' active' : '') + '" data-filter-id="' + def.id + '" style="--filter-color:' + def.color + '">';
            h += '<span class="qfb-icon">' + def.icon + '</span><span class="qfb-label">' + def.label + bracketLabel + '</span></button>';
        });
        h += '</div>';

        // Edit + Delete buttons for custom questions in Custom Questions view
        if (viewType === 'custom-questions' && isCustomQuestion) {
            h += '<div class="q-custom-actions">';
            h += '<button class="q-delete-custom" id="vf-delete-custom"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete Question</button>';
            h += '<button class="q-edit-custom" id="vf-edit-custom"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit Question Details</button>';
            h += '</div>';
        }

        if (question.description) {
            h += '<div class="q-description"><div class="q-description-title">Problem Description</div>';
            h += '<div class="q-description-body">' + question.description + '</div></div>';
        }

        if (question.testCases && question.testCases.length > 0) {
            h += '<div class="q-test-cases"><div class="q-test-cases-title">Test Cases</div>';
            question.testCases.forEach(function (tc, idx) {
                h += '<div class="q-test-case"><div class="tc-header">Case ' + (idx + 1) + '</div>';
                h += '<div class="tc-row"><span class="tc-label">Input:</span> <code>' + escapeHtml(tc.input) + '</code></div>';
                h += '<div class="tc-row"><span class="tc-label">Output:</span> <code>' + escapeHtml(tc.output) + '</code></div>';
                if (tc.explanation) h += '<div class="tc-row"><span class="tc-label">Explanation:</span> ' + escapeHtml(tc.explanation) + '</div>';
                h += '</div>';
            });
            h += '</div>';
        }

        if (question.approaches && question.approaches.length > 1) {
            h += '<div class="approach-tabs" id="fv-approach-tabs">';
            question.approaches.forEach(function (app, i) {
                h += '<div class="approach-tab' + (i === 0 ? ' active' : '') + '" data-approach="' + i + '">' + app.name + '</div>';
            });
            h += '</div>';
        }
        if (question.approaches && question.approaches.length > 0) {
            h += '<div id="approach-content"></div>';
        }

        var note = window.DSAStore.getNote(catId, questionId);
        var noteTitle = (note && note.title) ? escapeHtml(note.title) : '';
        var noteContent = (note && note.content) ? escapeHtml(note.content) : '';
        h += '<div class="q-notes-section">';
        h += '<input type="text" class="q-notes-title" id="q-notes-title" value="' + noteTitle + '" placeholder="Add Your Custom Notes">';
        h += '<textarea class="q-notes-textarea" id="q-notes-content" placeholder="Write your notes here...">' + noteContent + '</textarea>';
        h += '</div>';

        detail.innerHTML = h;

        if (question.approaches && question.approaches.length > 0) renderApproach(question, 0);

        detail.querySelectorAll('.approach-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                var idx = parseInt(tab.dataset.approach);
                detail.querySelectorAll('.approach-tab').forEach(function (t) { t.classList.toggle('active', parseInt(t.dataset.approach) === idx); });
                renderApproach(question, idx);
            });
        });

        var prevBtn = detail.querySelector('.fv-prev');
        var nextBtn = detail.querySelector('.fv-next');
        if (prevEntry && prevBtn) {
            prevBtn.addEventListener('click', function () {
                renderVirtualFilterDetail(prevEntry.catId, prevEntry.questionId, flatList, currentIdx - 1, viewType);
                updateFilteredSidebarActive(prevEntry.catId, prevEntry.questionId);
            });
        }
        if (nextEntry && nextBtn) {
            nextBtn.addEventListener('click', function () {
                renderVirtualFilterDetail(nextEntry.catId, nextEntry.questionId, flatList, currentIdx + 1, viewType);
                updateFilteredSidebarActive(nextEntry.catId, nextEntry.questionId);
            });
        }

        detail.querySelectorAll('.q-filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var fid = btn.dataset.filterId;
                var isActive = window.DSAStore.hasFilter(catId, questionId, fid);
                if (isActive) {
                    window.DSAStore.removeFilter(catId, questionId, fid);
                } else {
                    var fdef = getFilterDef(fid);
                    var defLevel = (fdef && fdef.levels && fdef.levels.length > 0) ? fdef.levels[0].id : null;
                    window.DSAStore.addFilter(catId, questionId, fid, defLevel);
                    if (fdef && fdef.levels && fdef.levels.length > 0) {
                        showLevelSelector(catId, questionId, fid, fdef, detail, isCustomQuestion);
                        updateFilterButtonLabels(catId, questionId, detail);
                        return;
                    }
                }
                updateFilterButtonLabels(catId, questionId, detail);
            });
        });

        var notesArea = document.getElementById('q-notes-content');
        if (notesArea) {
            function autoResizeVf() { notesArea.style.height = 'auto'; notesArea.style.height = notesArea.scrollHeight + 'px'; }
            notesArea.addEventListener('input', function () { autoResizeVf(); saveNotesDebounced(catId, questionId); });
            autoResizeVf();
        }
        var notesTitle = document.getElementById('q-notes-title');
        if (notesTitle) { notesTitle.addEventListener('input', function () { saveNotesDebounced(catId, questionId); }); }

        // Edit/Delete listeners for custom questions in Custom Questions view
        if (viewType === 'custom-questions' && isCustomQuestion) {
            var delBtn = document.getElementById('vf-delete-custom');
            var editBtn = document.getElementById('vf-edit-custom');
            if (delBtn) delBtn.addEventListener('click', function () {
                renderDeleteConfirmDialog(catId, questionId, function () { renderCustomQuestionsView(); });
            });
            if (editBtn) editBtn.addEventListener('click', function () {
                renderEditQuestionDialog(catId, questionId);
            });
        }

        detail.scrollTop = 0;
    }

    function animateCards() {
        try {
            if (typeof gsap === 'undefined') return;
            gsap.set('.dsa-grid .anim-card', { opacity: 0, y: 24 });
            gsap.to('.dsa-grid .anim-card', {
                opacity: 1, y: 0, duration: 0.4, ease: 'power3.out',
                stagger: 0.05,
                delay: 0.1
            });
        } catch (e) {
            document.querySelectorAll('.dsa-grid .anim-card').forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }

    // Public API
    window.DSARenderer = {
        renderCategoryGrid: renderCategoryGrid,
        renderQuestionList: renderQuestionList,
        renderFilteredView: renderFilteredView,
        renderIncompleteView: renderIncompleteView,
        renderCustomQuestionsView: renderCustomQuestionsView,
        getCurrentCategory: function () { return currentCategory; },
        getCurrentQuestion: function () { return currentQuestion; }
    };
})();
