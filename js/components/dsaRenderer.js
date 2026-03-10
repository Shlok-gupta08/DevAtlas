// =================================================================
//  dsaRenderer.js — DSA section renderer
//  Handles: category grid, question list, question detail,
//           approach tabs, navigation, breadcrumbs
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

    function getData() {
        return window.DSAData || {};
    }

    function getCategoryList() {
        var data = getData();
        var list = [];
        CATEGORY_ORDER.forEach(function (key) {
            if (data[key]) list.push(data[key]);
        });
        return list;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function buildCodeBlock(code) {
        var escaped = escapeHtml(code);
        return '<div class="code-wrapper"><div class="code-header"><span>C++</span>' +
               '<button class="copy-btn" onclick="copyCode(this)">Copy</button></div>' +
               '<pre><code class="language-cpp">' + escaped + '</code></pre></div>';
    }

    function countByDifficulty(questions) {
        var counts = { easy: 0, medium: 0, hard: 0 };
        questions.forEach(function (q) { counts[q.difficulty]++; });
        return counts;
    }

    // ========== CATEGORY GRID VIEW ==========
    function renderCategoryGrid() {
        currentCategory = null;
        currentQuestion = null;

        // Hide dev sections, show DSA view
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

        h += '</div>'; // end header-row
        h += '</div>';

        h += '<div class="dsa-grid">';
        categories.forEach(function (cat, i) {
            var counts = countByDifficulty(cat.questions);
            h += '<div class="dsa-category-card anim-card" data-cat-id="' + cat.id + '" style="--cat-color:' + cat.color + '">';
            h += '<div class="cat-icon">' + cat.icon + '</div>';
            h += '<div class="cat-name">' + cat.name + '</div>';
            h += '<div class="cat-count">' + cat.questions.length + ' Problems</div>';
            h += '<div class="cat-difficulties">';
            if (counts.easy) h += '<span class="diff-badge easy">' + counts.easy + ' Easy</span>';
            if (counts.medium) h += '<span class="diff-badge medium">' + counts.medium + ' Medium</span>';
            if (counts.hard) h += '<span class="diff-badge hard">' + counts.hard + ' Hard</span>';
            h += '</div>';
            h += '</div>';
        });
        h += '</div>';

        dsaView.innerHTML = h;

        // Attach click listeners
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

        // Default to first question
        var targetQ = questionId || cat.questions[0].id;
        currentQuestion = targetQ;
        currentApproach = 0;

        // Group questions by difficulty
        var groups = { easy: [], medium: [], hard: [] };
        var globalIdx = 0;
        cat.questions.forEach(function (q) {
            globalIdx++;
            groups[q.difficulty].push({ q: q, num: globalIdx });
        });

        var h = '<div class="dsa-question-view">';

        // === Sidebar with question list ===
        h += '<div class="dsa-question-sidebar" style="--cat-color:' + cat.color + '">';
        h += '<div class="qs-header">';
        h += '<button class="qs-back" id="qs-back-grid">';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'All Categories';
        h += '</button>';
        h += '<div class="qs-cat-name">' + cat.icon + ' ' + cat.name + '</div>';
        h += '<div class="qs-cat-count">' + cat.questions.length + ' Problems</div>';
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
                h += '<span class="qs-diff-dot ' + entry.q.difficulty + '"></span>';
                h += '<span>' + entry.q.title + '</span>';
                h += '</div>';
            });
            h += '</div>';
        });

        h += '</div>';
        h += '</div>';

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
                renderQuestionDetail(catId, el.dataset.qId);
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
    }

    // ========== QUESTION DETAIL ==========
    function renderQuestionDetail(catId, questionId) {
        var data = getData();
        var cat = data[catId];
        if (!cat) return;

        var qIndex = -1;
        var question = null;
        for (var i = 0; i < cat.questions.length; i++) {
            if (cat.questions[i].id === questionId) {
                question = cat.questions[i];
                qIndex = i;
                break;
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

        var prevQ = qIndex > 0 ? cat.questions[qIndex - 1] : null;
        var nextQ = qIndex < cat.questions.length - 1 ? cat.questions[qIndex + 1] : null;

        var h = '';

        // Title + difficulty
        h += '<div class="q-title-row">';
        h += '<h1 class="q-title">' + question.title + '</h1>';
        h += '<span class="diff-badge ' + question.difficulty + '">' + question.difficulty + '</span>';
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
        if (question.approaches.length > 1) {
            h += '<div class="approach-tabs" id="approach-tabs">';
            question.approaches.forEach(function (app, i) {
                h += '<div class="approach-tab' + (i === 0 ? ' active' : '') + '" data-approach="' + i + '">' + app.name + '</div>';
            });
            h += '</div>';
        }

        // Approach content
        h += '<div id="approach-content"></div>';

        detail.innerHTML = h;

        // Render first approach
        renderApproach(question, 0);

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

        // Scroll to top of detail
        detail.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
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
        h += '<div class="complexity-badge"><span class="cb-label">Time</span> ' + escapeHtml(app.timeComplexity) + '</div>';
        h += '<div class="complexity-badge"><span class="cb-label">Space</span> ' + escapeHtml(app.spaceComplexity) + '</div>';
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
        getCurrentCategory: function () { return currentCategory; },
        getCurrentQuestion: function () { return currentQuestion; }
    };
})();
