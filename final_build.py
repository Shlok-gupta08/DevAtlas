"""
final_build.py — Creates index_claude.html: one self-contained file.
v2: True black theme, Space Grotesk fonts, sidebar fix, wider layout, SQL output tables
"""

# Read all data files
data_files = ['data_html.js', 'data_css.js', 'data_js.js', 'data_sql.js', 'data_git.js']
all_data = ''
for df in data_files:
    with open(df, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('</script>', '<\\/script>')
    all_data += c + '\n\n'

output = r'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Developer Reference | Lifetime Cheat Sheet</title>
    <meta name="description" content="The ultimate, exhaustive lifetime developer reference for HTML, CSS, JavaScript, SQL, and Git.">

    <!-- Google Fonts: Space Grotesk (headings) + Inter (body) + JetBrains Mono (code) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Highlight.js -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/tokyo-night-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/sql.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js"></script>

    <!-- GSAP + ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        /* ========== BASE ========== */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: #000;
            color: #d4d4d8;
            overflow-x: hidden;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
            letter-spacing: -0.02em;
        }

        /* ========== SCROLLBAR ========== */
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #262626; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #404040; }

        /* ========== ACCENT SYSTEM ========== */
        :root { --accent: #facc15; --accent-rgb: 250,204,21; --accent-dim: #facc1520; }
        [data-lang="html"]       { --accent: #fb923c; --accent-rgb: 251,146,60;  --accent-dim: #fb923c20; }
        [data-lang="css"]        { --accent: #e879f9; --accent-rgb: 232,121,249; --accent-dim: #e879f920; }
        [data-lang="javascript"] { --accent: #fbbf24; --accent-rgb: 251,191,36;  --accent-dim: #fbbf2420; }
        [data-lang="sql"]        { --accent: #38bdf8; --accent-rgb: 56,189,248;  --accent-dim: #38bdf820; }
        [data-lang="git"]        { --accent: #fb7185; --accent-rgb: 251,113,133; --accent-dim: #fb718520; }

        /* ========== SIDEBAR ========== */
        #sidebar {
            position: fixed; top: 0; left: 0; bottom: 0;
            width: 260px; z-index: 50;
            background: #000;
            border-right: 1px solid #171717;
            display: flex; flex-direction: column;
            transform: translateX(0);
            transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        #sidebar.collapsed { transform: translateX(-260px); }
        #sidebar .logo {
            padding: 22px 20px 14px;
            border-bottom: 1px solid #171717;
        }
        #sidebar .logo-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 20px; font-weight: 700; color: #fafafa;
            letter-spacing: -0.03em;
        }
        #sidebar .logo-sub {
            font-size: 11px; color: #525252; margin-top: 2px;
            font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase;
        }
        #sidebar .nav-section { padding: 12px 0; flex: 1; overflow-y: auto; }
        .sidebar-category {
            padding: 8px 20px; font-size: 10px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 2px; color: #404040; margin-top: 10px;
            font-family: 'Space Grotesk', sans-serif;
        }
        .sidebar-item {
            display: flex; align-items: center; gap: 10px;
            padding: 9px 20px; cursor: pointer;
            color: #737373; font-size: 14px; font-weight: 500;
            border-left: 3px solid transparent;
            transition: all 0.2s ease;
        }
        .sidebar-item:hover { color: #a3a3a3; background: #0a0a0a; }
        .sidebar-item.active {
            color: var(--accent); background: var(--accent-dim);
            border-left-color: var(--accent);
        }
        .sidebar-item .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* ========== SIDEBAR TOGGLE ========== */
        #sidebar-toggle {
            position: fixed; top: 14px; left: 14px; z-index: 60;
            width: 38px; height: 38px; border-radius: 10px;
            background: #0a0a0a; border: 1px solid #1f1f1f;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: #737373;
            transition: all 0.25s ease;
        }
        #sidebar-toggle:hover { background: #171717; color: #d4d4d8; }
        #sidebar-toggle.shifted { left: 14px; }

        /* ========== TOP NAV ========== */
        #topnav {
            position: sticky; top: 0; z-index: 40;
            background: rgba(0,0,0,0.85); backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 1px solid #171717;
            padding: 0 32px;
            display: flex; align-items: center; height: 52px; gap: 6px;
            margin-left: 260px;
            transition: margin-left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pill {
            padding: 5px 16px; border-radius: 999px;
            font-size: 12.5px; font-weight: 600; cursor: pointer;
            color: #525252; background: transparent;
            border: 1px solid transparent;
            transition: all 0.25s ease; white-space: nowrap;
            font-family: 'Space Grotesk', sans-serif;
        }
        .pill:hover { color: #a3a3a3; background: #0a0a0a; }
        .pill.active { color: var(--accent); background: var(--accent-dim); border-color: rgba(var(--accent-rgb), 0.25); }

        /* ========== MAIN ========== */
        #main {
            margin-left: 260px; min-height: 100vh; padding-bottom: 120px;
            transition: margin-left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        #main.expanded { margin-left: 0; }

        .section-block { padding: 48px 48px 24px; max-width: 1100px; margin: 0 auto; }

        /* ========== HERO ========== */
        .section-hero { padding: 80px 48px 40px; max-width: 1100px; margin: 0 auto; }
        .section-hero h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 64px; font-weight: 700;
            background: linear-gradient(135deg, var(--accent) 0%, #fff 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; line-height: 1.05;
            margin: 0 0 16px; letter-spacing: -0.04em;
        }
        .section-hero p {
            font-size: 17px; color: #525252; max-width: 600px; line-height: 1.7;
        }

        /* ========== SUBSECTION HEADERS ========== */
        .subsection-header {
            font-size: 38px; font-weight: 700; color: #fafafa;
            margin: 0 0 8px; padding-top: 24px;
            letter-spacing: -0.03em;
        }
        .subsection-desc { font-size: 14px; color: #525252; margin: 0 0 28px; line-height: 1.6; }

        /* ========== CARDS ========== */
        .content-card {
            background: #0a0a0a; border: 1px solid #1a1a1a;
            border-radius: 16px; padding: 28px 32px; margin-bottom: 20px;
            position: relative;
            transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .content-card:hover {
            border-color: rgba(var(--accent-rgb), 0.2);
            box-shadow: 0 0 40px rgba(var(--accent-rgb), 0.04);
            transform: translateY(-1px);
        }
        .content-card h3 {
            font-size: 20px; font-weight: 700; margin: 0 0 14px; color: #e5e5e5;
            letter-spacing: -0.02em;
        }
        .content-card p, .content-card li { font-size: 14.5px; line-height: 1.8; color: #a3a3a3; }
        .content-card ul, .content-card ol { padding-left: 20px; }
        .content-card li { margin-bottom: 5px; }
        .content-card strong { color: #d4d4d8; }

        /* ========== CODE BLOCKS ========== */
        .code-wrapper {
            position: relative; margin: 14px 0; border-radius: 12px;
            overflow: hidden; background: #0a0a0a; border: 1px solid #1a1a1a;
        }
        .code-wrapper .code-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 7px 14px; background: #0f0f0f;
            border-bottom: 1px solid #1a1a1a;
            font-size: 11px; font-weight: 600; color: #404040;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase; letter-spacing: 1px;
        }
        .code-wrapper .copy-btn {
            background: #171717; border: 1px solid #262626;
            color: #525252; padding: 3px 10px; border-radius: 6px;
            font-size: 10px; cursor: pointer; font-family: 'Space Grotesk', sans-serif;
            font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
            transition: all 0.2s ease;
        }
        .code-wrapper .copy-btn:hover { background: #262626; color: #a3a3a3; }
        .code-wrapper pre { margin: 0; padding: 18px; overflow-x: auto; background: transparent !important; }
        .code-wrapper code {
            font-family: 'JetBrains Mono', monospace !important;
            font-size: 13px; line-height: 1.7; background: transparent !important;
        }

        /* ========== TABLES ========== */
        .styled-table {
            width: 100%; border-collapse: collapse; margin: 14px 0;
            font-size: 13.5px; border-radius: 12px; overflow: hidden;
        }
        .styled-table thead { background: #0f0f0f; }
        .styled-table th {
            padding: 11px 16px; text-align: left; font-weight: 700;
            color: #a3a3a3; border-bottom: 2px solid rgba(var(--accent-rgb), 0.2);
            font-family: 'Space Grotesk', sans-serif; font-size: 12.5px;
            text-transform: uppercase; letter-spacing: 0.5px;
        }
        .styled-table td { padding: 9px 16px; color: #737373; border-bottom: 1px solid #141414; }
        .styled-table tbody tr:hover { background: #0a0a0a; }
        .styled-table code {
            background: #141414; padding: 2px 7px; border-radius: 4px;
            font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--accent);
        }

        /* ========== DIVIDER ========== */
        .section-divider {
            height: 1px; margin: 40px auto; max-width: 1100px;
            background: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.12), transparent);
        }

        /* ========== CALLOUT BOXES ========== */
        .tip-box {
            background: #0a0f1a; border-left: 3px solid #3b82f6;
            padding: 12px 18px; border-radius: 0 10px 10px 0;
            margin: 12px 0; font-size: 13.5px; color: #7da0c9; line-height: 1.7;
        }
        .warn-box {
            background: #14100a; border-left: 3px solid #f59e0b;
            padding: 12px 18px; border-radius: 0 10px 10px 0;
            margin: 12px 0; font-size: 13.5px; color: #c9a055; line-height: 1.7;
        }
        .danger-box {
            background: #140a0c; border-left: 3px solid #ef4444;
            padding: 12px 18px; border-radius: 0 10px 10px 0;
            margin: 12px 0; font-size: 13.5px; color: #c97a7a; line-height: 1.7;
        }

        /* ========== ATMOSPHERIC GLOW ========== */
        .glow-orb {
            position: fixed; pointer-events: none; z-index: 0; border-radius: 50%;
            background: radial-gradient(circle, rgba(var(--accent-rgb), 0.03) 0%, transparent 70%);
        }
        .kw { color: var(--accent); font-weight: 600; }

        /* ========== SQL OUTPUT TABLE (collapsible) ========== */
        .sql-output { margin: 10px 0; }
        .sql-output summary {
            cursor: pointer; font-size: 13px; font-weight: 600;
            color: #404040; padding: 8px 14px;
            background: #080808; border: 1px solid #1a1a1a;
            border-radius: 8px; transition: all 0.2s ease;
            font-family: 'Space Grotesk', sans-serif;
            display: flex; align-items: center; gap: 8px;
        }
        .sql-output summary:hover { color: #737373; background: #0a0a0a; }
        .sql-output[open] summary { border-radius: 8px 8px 0 0; border-bottom-color: transparent; }
        .sql-output .output-table {
            width: 100%; border-collapse: collapse; font-size: 12.5px;
            background: #050505; border: 1px solid #1a1a1a; border-top: 0;
            border-radius: 0 0 8px 8px; overflow: hidden;
        }
        .sql-output .output-table th {
            padding: 8px 12px; text-align: left; font-weight: 600;
            color: var(--accent); background: #0a0a0a;
            border-bottom: 1px solid #1a1a1a;
            font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
        }
        .sql-output .output-table td {
            padding: 6px 12px; color: #737373; border-bottom: 1px solid #0f0f0f;
            font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
        }
        .sql-output .output-table tbody tr:hover { background: #0a0a0a; }
        .sql-output .output-table tbody tr:last-child td { border-bottom: 0; }
        .sql-output .row-count {
            font-size: 11px; color: #333; padding: 4px 12px;
            background: #050505; border: 1px solid #1a1a1a; border-top: 0;
            border-radius: 0 0 8px 8px;
            font-family: 'JetBrains Mono', monospace;
        }
    </style>
</head>
<body>
    <button id="sidebar-toggle" aria-label="Toggle sidebar">
        <svg id="toggle-icon-open" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
        <svg id="toggle-icon-close" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
    </button>
    <div class="glow-orb" style="width:600px;height:600px;top:-200px;right:-150px;"></div>
    <div class="glow-orb" style="width:500px;height:500px;bottom:-100px;left:-100px;"></div>
    <nav id="sidebar">
        <div class="logo">
            <div class="logo-title">&#x1F4DA; DevRef</div>
            <div class="logo-sub">Lifetime Reference</div>
        </div>
        <div class="nav-section" id="sidebar-nav"></div>
    </nav>
    <header id="topnav">
        <div id="topnav-pills" style="display:flex;gap:5px;overflow-x:auto;padding:4px 0;"></div>
    </header>
    <main id="main">
        <div id="content-area"></div>
    </main>
'''

# Helper + global definitions
output += r'''
    <script>
        var CATEGORIES = [
            { id: 'web', name: 'Web Development', langs: ['html', 'css', 'javascript'] },
            { id: 'data', name: 'Databases', langs: ['sql'] },
            { id: 'vcs', name: 'Version Control', langs: ['git'] },
        ];
        var LANGUAGES = {};

        function codeBlock(lang, code) {
            var escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            return '<div class="code-wrapper"><div class="code-header"><span>' + lang.toUpperCase() + '<\/span><button class="copy-btn" onclick="copyCode(this)">Copy<\/button><\/div><pre><code class="language-' + lang + '">' + escaped + '<\/code><\/pre><\/div>';
        }

        function sqlOutput(headers, rows, rowCount) {
            var h = '<details class="sql-output"><summary>&#x1F4CA; Query Output (' + (rowCount || rows.length) + ' rows)</summary>';
            h += '<table class="output-table"><thead><tr>';
            headers.forEach(function(col) { h += '<th>' + col + '<\/th>'; });
            h += '<\/tr><\/thead><tbody>';
            rows.forEach(function(row) {
                h += '<tr>';
                row.forEach(function(cell) { h += '<td>' + cell + '<\/td>'; });
                h += '<\/tr>';
            });
            h += '<\/tbody><\/table><\/details>';
            return h;
        }

        function copyCode(btn) {
            var code = btn.closest('.code-wrapper').querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(function() {
                btn.textContent = 'Copied!';
                btn.style.color = 'var(--accent)';
                setTimeout(function() { btn.textContent = 'Copy'; btn.style.color = ''; }, 1500);
            });
        }
    </script>
'''

# Add data
output += '    <script>\n'
output += all_data
output += '    <' + '/script>\n\n'

# Render engine
output += r'''    <script>
        var currentLang = 'html';
        var sidebarOpen = true;
        var langColors = { html:'#fb923c', css:'#e879f9', javascript:'#fbbf24', sql:'#38bdf8', git:'#fb7185' };

        function renderSidebar() {
            var nav = document.getElementById('sidebar-nav');
            var h = '';
            CATEGORIES.forEach(function(cat) {
                h += '<div class="sidebar-category">' + cat.name + '<\/div>';
                cat.langs.forEach(function(id) {
                    var lang = LANGUAGES[id];
                    if (!lang) return;
                    h += '<div class="sidebar-item" data-lang-id="' + id + '" onclick="switchLanguage(\'' + id + '\')">';
                    h += '<div class="dot" style="background:' + langColors[id] + '"><\/div>';
                    h += '<span>' + lang.name + '<\/span><\/div>';
                });
            });
            nav.innerHTML = h;
        }

        function renderPills() {
            var container = document.getElementById('topnav-pills');
            var lang = LANGUAGES[currentLang];
            if (!lang) return;
            container.innerHTML = lang.sections.map(function(s) {
                return '<div class="pill" data-section="' + s.id + '" onclick="scrollToSection(\'' + s.id + '\')">' + s.title + '<\/div>';
            }).join('');
        }

        function renderContent() {
            var area = document.getElementById('content-area');
            var lang = LANGUAGES[currentLang];
            if (!lang) { area.innerHTML = '<div style="padding:80px 48px;color:#333;">Select a language.<\/div>'; return; }
            var h = '<div class="section-hero"><h1>' + lang.name + '<\/h1><p>' + (lang.desc || '') + '<\/p><\/div>';
            lang.sections.forEach(function(sec) {
                h += '<div class="section-divider"><\/div>';
                h += '<div id="section-' + sec.id + '" class="section-block">';
                h += '<h2 class="subsection-header">' + sec.title + '<\/h2>';
                if (sec.desc) h += '<p class="subsection-desc">' + sec.desc + '<\/p>';
                sec.cards.forEach(function(card) {
                    h += '<div class="content-card anim-card">';
                    if (card.title) h += '<h3>' + card.title + '<\/h3>';
                    h += card.body;
                    h += '<\/div>';
                });
                h += '<\/div>';
            });
            area.innerHTML = h;
            document.querySelectorAll('pre code').forEach(function(el) { hljs.highlightElement(el); });
            setupScrollAnimations();
            setupScrollSpy();
        }

        function switchLanguage(id) {
            currentLang = id;
            document.body.setAttribute('data-lang', id);
            document.querySelectorAll('.sidebar-item').forEach(function(el) {
                el.classList.toggle('active', el.dataset.langId === id);
            });
            renderPills();
            renderContent();
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        function scrollToSection(sectionId) {
            var el = document.getElementById('section-' + sectionId);
            if (el) {
                var offset = 64;
                var top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        }

        /* SIDEBAR TOGGLE */
        document.getElementById('sidebar-toggle').addEventListener('click', function() {
            sidebarOpen = !sidebarOpen;
            var sidebar = document.getElementById('sidebar');
            var main = document.getElementById('main');
            var topnav = document.getElementById('topnav');
            var iconOpen = document.getElementById('toggle-icon-open');
            var iconClose = document.getElementById('toggle-icon-close');

            sidebar.classList.toggle('collapsed', !sidebarOpen);
            main.classList.toggle('expanded', !sidebarOpen);
            topnav.style.marginLeft = sidebarOpen ? '260px' : '0';

            if (sidebarOpen) {
                iconOpen.style.display = '';
                iconClose.style.display = 'none';
            } else {
                iconOpen.style.display = 'none';
                iconClose.style.display = '';
            }
        });

        function setupScrollAnimations() {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.getAll().forEach(function(t) { t.kill(); });
            gsap.utils.toArray('.anim-card').forEach(function(card) {
                gsap.fromTo(card, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
                });
            });
        }

        function setupScrollSpy() {
            var sections = document.querySelectorAll('.section-block');
            var pills = document.querySelectorAll('.pill');
            if (!sections.length) return;
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.id.replace('section-', '');
                        pills.forEach(function(p) { p.classList.toggle('active', p.dataset.section === id); });
                    }
                });
            }, { rootMargin: '-20% 0px -70% 0px' });
            sections.forEach(function(s) { observer.observe(s); });
        }

        document.addEventListener('DOMContentLoaded', function() {
            renderSidebar();
            switchLanguage('html');
        });
    </script>
</body>
</html>
'''

with open('index_claude.html', 'w', encoding='utf-8') as f:
    f.write(output)

print('SUCCESS! File: index_claude.html')
print('Size: {:,} bytes'.format(len(output)))
print('Lines: {:,}'.format(output.count('\n')))
