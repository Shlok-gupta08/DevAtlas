// =================================================================
//  contentRender.js — Logic to parse data and inject HTML content
//  Handles: sidebar nav, topnav pills, main content, scroll animations,
//           scroll spy, and language switching.
//  Attaches to window.ContentRenderer
// =================================================================
(function () {
    'use strict';

    var currentLang = 'html';

    var CATEGORIES = [
        { id: 'web', name: 'Web Development', langs: ['html', 'css', 'javascript'] },
        { id: 'data', name: 'Databases', langs: ['sql'] },
        { id: 'vcs', name: 'Version Control', langs: ['git'] },
    ];

    var langColors = {
        html: '#fb923c',
        css: '#e879f9',
        javascript: '#fbbf24',
        sql: '#38bdf8',
        git: '#fb7185'
    };

    var langIcons = {
        html: '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#fb923c" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
        css: '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#e879f9" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>',
        javascript: '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#fbbf24" fill-opacity="0.18"/><path fill="#fbbf24" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.705-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
        sql: '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#38bdf8" d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 9c-4.42 0-8-1.34-8-3v3c0 1.68 3.58 3 8 3s8-1.32 8-3v-3c0 1.66-3.58 3-8 3zm0 5c-4.42 0-8-1.34-8-3v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 1.66-3.58 3-8 3z"/></svg>',
        git: '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#fb7185" d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.06V8.783a1.838 1.838 0 01-.998-2.41L7.629 3.64.452 10.818a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.428-10.43a1.55 1.55 0 000-2.127z"/></svg>'
    };

    function getLanguages() {
        return window.DevAtlasData || {};
    }

    function renderSidebar() {
        var nav = document.getElementById('sidebar-nav');
        var langs = getLanguages();
        var h = '<div class="sidebar-back-btn" id="dev-back-sections">';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
        h += 'Back to Sections';
        h += '</div>';
        CATEGORIES.forEach(function (cat) {
            h += '<div class="sidebar-category">' + cat.name + '</div>';
            cat.langs.forEach(function (id) {
                var lang = langs[id];
                if (!lang) return;
                h += '<div class="sidebar-item" data-lang-id="' + id + '">';
                h += '<span class="lang-icon">' + (langIcons[id] || '') + '</span>';
                h += '<span>' + lang.name + '</span></div>';
            });
        });
        nav.innerHTML = h;

        // Attach click listeners
        nav.querySelectorAll('.sidebar-item').forEach(function (el) {
            el.addEventListener('click', function () {
                switchLanguage(el.dataset.langId);
            });
        });

        // Back to sections
        var backBtn = document.getElementById('dev-back-sections');
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                if (window.DevAtlasApp && window.DevAtlasApp.showSectionPicker) {
                    window.DevAtlasApp.showSectionPicker();
                }
            });
        }
    }

    function renderPills() {
        var container = document.getElementById('topnav-pills');
        var langs = getLanguages();
        var lang = langs[currentLang];
        if (!lang) return;
        container.innerHTML = lang.sections.map(function (s) {
            return '<div class="pill" data-section="' + s.id + '">' + s.title + '</div>';
        }).join('');

        container.querySelectorAll('.pill').forEach(function (el) {
            el.addEventListener('click', function () {
                scrollToSection(el.dataset.section);
            });
        });
    }

    function renderContent() {
        var area = document.getElementById('content-area');
        var langs = getLanguages();
        var lang = langs[currentLang];
        if (!lang) {
            area.innerHTML = '<div style="padding:80px 48px;color:#333;">Select a language.</div>';
            return;
        }
        var h = '<div class="section-hero"><h1>' + lang.name + '</h1><p>' + (lang.desc || '') + '</p></div>';
        lang.sections.forEach(function (sec) {
            h += '<div class="section-divider"></div>';
            h += '<div id="section-' + sec.id + '" class="section-block">';
            h += '<h2 class="subsection-header">' + sec.title + '</h2>';
            if (sec.desc) h += '<p class="subsection-desc">' + sec.desc + '</p>';
            sec.cards.forEach(function (card) {
                h += '<div class="content-card anim-card">';
                if (card.title) h += '<h3>' + card.title + '</h3>';
                h += card.body;
                h += '</div>';
            });
            h += '</div>';
        });
        area.innerHTML = h;
        document.querySelectorAll('pre code').forEach(function (el) { hljs.highlightElement(el); });
        setupScrollAnimations();
        setupScrollSpy();
    }

    function switchLanguage(id) {
        currentLang = id;
        document.body.setAttribute('data-lang', id);
        document.querySelectorAll('.sidebar-item').forEach(function (el) {
            el.classList.toggle('active', el.dataset.langId === id);
        });
        renderPills();
        renderContent();
        window.scrollTo({ top: 0, behavior: 'instant' });
        // Save position for continue progress
        if (window.DSAStore) {
            window.DSAStore.savePosition('dev', { langId: id });
        }
    }

    function scrollToSection(sectionId) {
        var el = document.getElementById('section-' + sectionId);
        if (el) {
            var offset = 64;
            var top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    }

    function setupScrollAnimations() {
        try {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
            gsap.set('.anim-card', { opacity: 0, y: 24 });
            requestAnimationFrame(function () {
                ScrollTrigger.refresh(true);
                gsap.utils.toArray('.anim-card').forEach(function (card) {
                    gsap.to(card, {
                        opacity: 1, y: 0, duration: 0.45, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 96%',
                            once: true,
                            invalidateOnRefresh: true
                        }
                    });
                });
            });
        } catch (e) {
            document.querySelectorAll('.anim-card').forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }

    function setupScrollSpy() {
        var sections = document.querySelectorAll('.section-block');
        var pills = document.querySelectorAll('.pill');
        if (!sections.length) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id.replace('section-', '');
                    pills.forEach(function (p) { p.classList.toggle('active', p.dataset.section === id); });
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(function (s) { observer.observe(s); });
    }

    // Public API
    window.ContentRenderer = {
        init: function (langId) {
            renderSidebar();
            switchLanguage(langId || 'html');
        },
        switchLanguage: switchLanguage,
        getCategories: function () { return CATEGORIES; },
        getLangIcons: function () { return langIcons; },
        getLangColors: function () { return langColors; },
        getCurrentLang: function () { return currentLang; }
    };
})();
