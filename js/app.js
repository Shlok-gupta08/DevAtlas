// =================================================================
//  app.js — Main initialization file
//  Loads after: data files → components → this file
//  Handles: DOMContentLoaded, landing page, branding, marquee
// =================================================================
(function () {
    'use strict';

    /* === APP BRANDING === */
    var APP_TITLE = 'DevAtlas';
    var APP_TAGLINE = "Developer's Manual Reimagined";
    var APP_DESCRIPTION = 'The Centralized Library for all Code Syntax and Problems';

    /* === SUPPORTED LANGUAGES (used for marquee + badges) ===
       Update this list whenever you add a new language data file.
       The 'key' must match the key in window.DevAtlasData.         */
    var SUPPORTED_LANGUAGES = [
        { key: 'html', name: 'HTML', color: '#fb923c', svg: '<svg viewBox="0 0 24 24"><path fill="#fb923c" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z"/><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="Arial,sans-serif">5</text></svg>' },
        { key: 'css', name: 'CSS', color: '#e879f9', svg: '<svg viewBox="0 0 24 24"><path fill="#e879f9" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z"/><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="Arial,sans-serif">3</text></svg>' },
        { key: 'javascript', name: 'JavaScript', color: '#fbbf24', svg: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="2" fill="#fbbf24"/><text x="14.5" y="18" text-anchor="middle" fill="#000" font-size="11" font-weight="bold" font-family="Arial,sans-serif">JS</text></svg>' },
        { key: 'sql', name: 'SQL', color: '#38bdf8', svg: '<svg viewBox="0 0 24 24"><path fill="#38bdf8" d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 9c-4.42 0-8-1.34-8-3v3c0 1.68 3.58 3 8 3s8-1.32 8-3v-3c0 1.66-3.58 3-8 3zm0 5c-4.42 0-8-1.34-8-3v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 1.66-3.58 3-8 3z"/></svg>' },
        { key: 'git', name: 'Git', color: '#fb7185', svg: '<svg viewBox="0 0 24 24"><path fill="#fb7185" d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.06V8.783a1.838 1.838 0 01-.998-2.41L7.629 3.64.452 10.818a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.428-10.43a1.55 1.55 0 000-2.127z"/></svg>' }
    ];

    var NUM_MARQUEE_ROWS = 10;
    var ICONS_PER_ROW = 18;

    /* Shuffle helper */
    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    /* Build marquee rows using ONLY supported language icons */
    function buildMarqueeRows() {
        var bg = document.getElementById('marquee-bg');
        if (!bg) return;
        bg.innerHTML = '';

        var baseDurations = [80, 95, 72, 88, 68, 92, 75, 85, 98, 70];

        for (var r = 0; r < NUM_MARQUEE_ROWS; r++) {
            var row = document.createElement('div');
            row.className = 'marquee-row ' + (r % 2 === 0 ? 'scroll-left' : 'scroll-right');
            row.style.setProperty('--marquee-duration', baseDurations[r % baseDurations.length] + 's');

            var items = '';
            var shuffled = shuffle(SUPPORTED_LANGUAGES);
            for (var i = 0; i < ICONS_PER_ROW; i++) {
                var icon = shuffled[i % shuffled.length];
                items += '<div class="marquee-icon">' + icon.svg + '</div>';
            }
            // Duplicate for seamless loop
            row.innerHTML = items + items;
            bg.appendChild(row);
        }
    }

    /* Build supported language badges under the CTA */
    function buildLanguageBadges() {
        var container = document.getElementById('landing-languages');
        if (!container) return;
        var h = '';
        SUPPORTED_LANGUAGES.forEach(function (lang) {
            h += '<div class="lang-badge">';
            h += '<span style="display:inline-flex;width:14px;height:14px;">' + lang.svg + '</span>';
            h += lang.name;
            h += '</div>';
        });
        container.innerHTML = h;
    }

    /* Enter the manual (leave landing page) */
    function enterManual() {
        var overlay = document.getElementById('landing-overlay');
        var tl = gsap.timeline({
            onComplete: function () {
                overlay.classList.add('hidden');
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        });
        tl.to('#marquee-bg', { opacity: 0, duration: 0.5, ease: 'power2.in' })
            .to('#landing-hero h1', { scale: 1.2, opacity: 0, duration: 0.45, ease: 'power2.in' }, '-=0.3')
            .to('#landing-hero .tagline', { opacity: 0, y: -15, duration: 0.3 }, '-=0.35')
            .to('#landing-hero .description', { opacity: 0, y: -10, duration: 0.25 }, '-=0.3')
            .to('#landing-languages', { opacity: 0, y: -5, duration: 0.2 }, '-=0.25')
            .to('#landing-cta', { opacity: 0, y: 30, duration: 0.3 }, '-=0.2')
            .to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.15');
    }

    /* Show landing page (logo click) */
    function showLandingPage() {
        var overlay = document.getElementById('landing-overlay');
        overlay.classList.remove('hidden');
        gsap.set(overlay, { opacity: 1 });
        gsap.set('#marquee-bg', { opacity: 1 });
        gsap.set('#landing-hero h1', { scale: 1, opacity: 1 });
        gsap.set('#landing-hero .tagline, #landing-hero .description', { opacity: 1, y: 0 });
        gsap.set('#landing-languages', { opacity: 1, y: 0 });
        gsap.set('#landing-cta', { opacity: 1, y: 0 });
        buildMarqueeRows();
        var tl = gsap.timeline();
        tl.from('#marquee-bg', { opacity: 0, duration: 0.6, ease: 'power2.out' })
            .from('#landing-hero h1', { opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3')
            .from('#landing-hero .tagline', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
            .from('#landing-hero .description', { opacity: 0, y: 15, duration: 0.4 }, '-=0.2')
            .from('#landing-languages', { opacity: 0, y: 10, duration: 0.3 }, '-=0.15')
            .from('#landing-cta', { opacity: 0, y: 25, duration: 0.4 }, '-=0.15');
    }

    function initLandingPage() {
        document.getElementById('hero-title').textContent = APP_TITLE;
        document.getElementById('hero-tagline').textContent = APP_TAGLINE;
        document.getElementById('hero-desc').textContent = APP_DESCRIPTION;
        buildMarqueeRows();
        buildLanguageBadges();
        gsap.from('#landing-hero h1', { opacity: 0, scale: 0.85, duration: 0.7, delay: 0.3, ease: 'back.out(1.5)' });
        gsap.from('#landing-hero .tagline', { opacity: 0, y: 20, duration: 0.5, delay: 0.7 });
        gsap.from('#landing-hero .description', { opacity: 0, y: 15, duration: 0.5, delay: 0.9 });
        gsap.from('#landing-languages', { opacity: 0, y: 10, duration: 0.4, delay: 1.0 });
        gsap.from('#landing-cta', { opacity: 0, y: 25, duration: 0.5, delay: 1.1 });
    }

    /* ========== BOOTSTRAP ========== */
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize components
        SidebarController.init();
        ContentRenderer.init();

        // Landing page
        initLandingPage();

        // CTA button
        var ctaBtn = document.getElementById('landing-cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', enterManual);
        }

        // Logo click → return to landing
        var logo = document.querySelector('#sidebar .logo');
        if (logo) {
            logo.addEventListener('click', showLandingPage);
        }
    });

    // Expose for potential external use
    window.DevAtlasApp = {
        enterManual: enterManual,
        showLandingPage: showLandingPage,
        SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES
    };
})();
