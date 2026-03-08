// =================================================================
//  CSS REFERENCE DATA
//  Exhaustive reference for CSS — from absolute basics to edge cases
// =================================================================
LANGUAGES['css'] = {
    name: 'CSS',
    desc: 'The language of visual design on the web. Master layout, animations, modern selectors, and the quirks that trip up everyone.',
    sections: [
        // -------------------------------------------------------
        //  0. ABSOLUTE BASICS
        // -------------------------------------------------------
        {
            id: 'basics',
            title: '0. Absolute Basics',
            desc: 'Selectors, specificity, the box model, and how CSS actually works.',
            cards: [
                {
                    title: 'Selectors Reference',
                    body: `
<table class="styled-table">
<thead><tr><th>Selector</th><th>Example</th><th>What it selects</th></tr></thead>
<tbody>
<tr><td>Universal</td><td><code>*</code></td><td>Every element</td></tr>
<tr><td>Type</td><td><code>p</code></td><td>All &lt;p&gt; elements</td></tr>
<tr><td>Class</td><td><code>.card</code></td><td>Elements with class="card"</td></tr>
<tr><td>ID</td><td><code>#hero</code></td><td>The element with id="hero"</td></tr>
<tr><td>Attribute</td><td><code>[type="email"]</code></td><td>Elements with type="email"</td></tr>
<tr><td>Attribute (contains)</td><td><code>[class*="btn"]</code></td><td>class attribute contains "btn"</td></tr>
<tr><td>Attribute (starts)</td><td><code>[href^="https"]</code></td><td>href starts with "https"</td></tr>
<tr><td>Attribute (ends)</td><td><code>[src$=".png"]</code></td><td>src ends with ".png"</td></tr>
<tr><td>Descendant</td><td><code>nav a</code></td><td>&lt;a&gt; anywhere inside &lt;nav&gt;</td></tr>
<tr><td>Child</td><td><code>nav > a</code></td><td>&lt;a&gt; that is a direct child of &lt;nav&gt;</td></tr>
<tr><td>Adjacent sibling</td><td><code>h2 + p</code></td><td>&lt;p&gt; immediately after &lt;h2&gt;</td></tr>
<tr><td>General sibling</td><td><code>h2 ~ p</code></td><td>All &lt;p&gt; siblings after &lt;h2&gt;</td></tr>
</tbody>
</table>
`
                },
                {
                    title: 'Pseudo-classes & Pseudo-elements',
                    body: `
<table class="styled-table">
<thead><tr><th>Pseudo-class</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><code>:hover</code></td><td>Mouse over the element</td></tr>
<tr><td><code>:focus</code></td><td>Element has keyboard focus</td></tr>
<tr><td><code>:focus-visible</code></td><td>Focus via keyboard only (not click) — use for focus rings</td></tr>
<tr><td><code>:focus-within</code></td><td>Any child inside has focus</td></tr>
<tr><td><code>:active</code></td><td>Element being clicked/pressed</td></tr>
<tr><td><code>:first-child</code></td><td>First child of its parent</td></tr>
<tr><td><code>:last-child</code></td><td>Last child of its parent</td></tr>
<tr><td><code>:nth-child(2n)</code></td><td>Every even child</td></tr>
<tr><td><code>:nth-child(3n+1)</code></td><td>Every 3rd starting from 1st</td></tr>
<tr><td><code>:nth-of-type(2)</code></td><td>2nd element of its type among siblings</td></tr>
<tr><td><code>:not(.hidden)</code></td><td>Elements NOT matching the selector</td></tr>
<tr><td><code>:empty</code></td><td>Elements with no children or text</td></tr>
<tr><td><code>:checked</code></td><td>Checked checkboxes/radios</td></tr>
<tr><td><code>:disabled</code></td><td>Disabled form elements</td></tr>
<tr><td><code>:valid / :invalid</code></td><td>Form elements passing/failing validation</td></tr>
<tr><td><code>:placeholder-shown</code></td><td>Input currently showing placeholder</td></tr>
<tr><td><code>:required / :optional</code></td><td>Required vs optional form fields</td></tr>
</tbody>
</table>
${codeBlock('css', `/* Pseudo-ELEMENTS (use :: double colon) */
p::before  { content: "→ "; color: gold; }      /* Insert before content */
p::after   { content: " ←"; color: gold; }       /* Insert after content */
p::first-line  { font-weight: bold; }            /* First line of text */
p::first-letter { font-size: 2em; float: left; } /* Drop-cap effect */
::selection { background: #d946ef; color: white; } /* Text selection color */
::placeholder { color: #888; font-style: italic; }  /* Placeholder text */
li::marker { color: #f97316; }                    /* List bullet/number */`)}
`
                },
                {
                    title: 'Specificity & the Cascade',
                    body: `
<p>When multiple rules target the same element, <strong>specificity</strong> determines which wins. Think of it as a scoring system:</p>
<table class="styled-table">
<thead><tr><th>Level</th><th>Score</th><th>Examples</th></tr></thead>
<tbody>
<tr><td>Inline styles</td><td><code>1,0,0,0</code></td><td>style="color: red"</td></tr>
<tr><td>IDs</td><td><code>0,1,0,0</code></td><td>#hero</td></tr>
<tr><td>Classes, attrs, pseudos</td><td><code>0,0,1,0</code></td><td>.card, [type], :hover</td></tr>
<tr><td>Elements, pseudo-els</td><td><code>0,0,0,1</code></td><td>p, div, ::before</td></tr>
</tbody>
</table>
${codeBlock('css', `/* Specificity: 0,0,1,1 → class + element */
p.intro { color: blue; }

/* Specificity: 0,1,0,0 → ID (wins!) */
#hero { color: red; }

/* Specificity: 0,0,2,1 → two classes + element */
div.card.featured { color: green; }

/* !important overrides EVERYTHING (avoid in production) */
p { color: purple !important; }

/* The :where() pseudo-class has ZERO specificity */
:where(.card, .panel, .box) { padding: 1rem; }  /* 0,0,0,0 */

/* The :is() pseudo-class takes the HIGHEST specificity of its arguments */
:is(#hero, .card) { margin: 0; }  /* 0,1,0,0 (takes #hero's specificity) */`)}
<div class="tip-box">💡 <strong>Cascade layers</strong> (<code>@layer</code>) let you control which group of styles wins regardless of specificity. Styles NOT in a layer beat styles IN a layer.</div>
${codeBlock('css', `@layer base, components, utilities;

@layer base {
    p { color: gray; }      /* Lowest priority */
}
@layer components {
    .card p { color: white; } /* Medium priority */
}
@layer utilities {
    .text-red { color: red; } /* Highest layer priority */
}
/* Unlayered styles beat ALL layers */
p.special { color: gold; }  /* Wins over everything in layers */`)}
`
                },
                {
                    title: 'The Box Model',
                    body: `
${codeBlock('css', `/* The box model: content + padding + border + margin */
.box {
    width: 300px;          /* Content width */
    padding: 20px;         /* Inside the border */
    border: 2px solid #333; /* The border itself */
    margin: 16px;          /* Outside the border */

    /* DEFAULT: width = content only (total = 300+40+4 = 344px) */
    box-sizing: content-box;

    /* RECOMMENDED: width INCLUDES padding + border (total = 300px) */
    box-sizing: border-box;
}

/* Universal reset — apply border-box to everything */
*, *::before, *::after {
    box-sizing: border-box;
}

/* Margin collapsing: vertical margins COLLAPSE into the larger one */
.top    { margin-bottom: 30px; }
.bottom { margin-top: 20px; }
/* Gap between them = 30px (not 50px!) */

/* Margin collapsing does NOT happen with:
   - Flexbox/Grid children
   - Elements with overflow other than visible
   - Floated elements
   - Absolutely positioned elements */`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  1. FLEXBOX
        // -------------------------------------------------------
        {
            id: 'flexbox',
            title: '1. Flexbox',
            desc: 'One-dimensional layout powerhouse. Perfect for navbars, cards, centering, and dynamic spacing.',
            cards: [
                {
                    title: 'Flex Container Properties',
                    body: `
${codeBlock('css', `/* Enable flexbox */
.container {
    display: flex;           /* or inline-flex */

    /* Main axis direction */
    flex-direction: row;            /* → (default) */
    flex-direction: row-reverse;    /* ← */
    flex-direction: column;         /* ↓ */
    flex-direction: column-reverse; /* ↑ */

    /* Wrapping */
    flex-wrap: nowrap;    /* All items on one line (default) */
    flex-wrap: wrap;      /* Items wrap to next line */
    flex-wrap: wrap-reverse; /* Wrap upward */

    /* Shorthand: direction + wrap */
    flex-flow: row wrap;

    /* Main axis alignment (horizontal if row) */
    justify-content: flex-start;    /* Pack to start (default) */
    justify-content: flex-end;      /* Pack to end */
    justify-content: center;        /* Center items */
    justify-content: space-between; /* Equal space BETWEEN items */
    justify-content: space-around;  /* Equal space AROUND items */
    justify-content: space-evenly;  /* Perfectly equal spacing */

    /* Cross axis alignment (vertical if row) */
    align-items: stretch;     /* Fill the container height (default) */
    align-items: flex-start;  /* Align to top */
    align-items: flex-end;    /* Align to bottom */
    align-items: center;      /* Vertically center */
    align-items: baseline;    /* Align text baselines */

    /* Multi-line cross axis alignment */
    align-content: flex-start;
    align-content: center;
    align-content: space-between;

    /* Gap between items (modern, replaces margins) */
    gap: 16px;           /* Both row and column gap */
    row-gap: 20px;       /* Vertical gap */
    column-gap: 12px;    /* Horizontal gap */
}`)}
`
                },
                {
                    title: 'Flex Item Properties',
                    body: `
${codeBlock('css', `/* Individual item control */
.item {
    /* How much the item should GROW to fill extra space */
    flex-grow: 0;    /* Don't grow (default) */
    flex-grow: 1;    /* Take equal share of remaining space */
    flex-grow: 2;    /* Take 2x share */

    /* How much the item should SHRINK if space is tight */
    flex-shrink: 1;  /* Shrink equally (default) */
    flex-shrink: 0;  /* Never shrink (useful for fixed-width items) */

    /* The starting size before grow/shrink is applied */
    flex-basis: auto;  /* Use the item's content/width (default) */
    flex-basis: 200px; /* Start at 200px, then grow/shrink */
    flex-basis: 0;     /* Ignore content size, distribute space purely by grow ratio */

    /* Shorthand: grow shrink basis */
    flex: 0 1 auto;    /* Default (don't grow, can shrink, auto basis) */
    flex: 1;           /* Same as: flex: 1 1 0 (grow equally, ignore content size) */
    flex: none;        /* Same as: flex: 0 0 auto (rigid, no grow or shrink) */

    /* Override align-items for this specific item */
    align-self: center;
    align-self: flex-end;

    /* Control order (default is 0) */
    order: -1;  /* Move to the front */
    order: 99;  /* Move to the end */
}`)}
<div class="tip-box">💡 <strong>Common patterns:</strong>
<br>• <code>flex: 1</code> on all items = equal-width columns
<br>• <code>margin-left: auto</code> on an item = push it to the far right (like a spacer)
<br>• <code>justify-content: center; align-items: center;</code> = perfect centering</div>
`
                },
                {
                    title: 'Flexbox Layout Recipes',
                    body: `
${codeBlock('css', `/* 1. Perfectly center anything */
.center-me {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* 2. Navbar with logo left, links right */
.navbar {
    display: flex;
    align-items: center;
    gap: 16px;
}
.navbar .spacer { margin-left: auto; }
/* OR: .navbar { justify-content: space-between; } */

/* 3. Card row that wraps responsively */
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}
.card-grid .card {
    flex: 1 1 300px; /* Grow, shrink, min 300px before wrapping */
}

/* 4. Sticky footer layout */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
main { flex: 1; } /* Main content grows to push footer down */
footer { /* stays at bottom */ }

/* 5. Holy Grail layout */
.holy-grail {
    display: flex;
}
.sidebar-left  { flex: 0 0 250px; }
.main-content  { flex: 1; }
.sidebar-right { flex: 0 0 200px; }`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  2. CSS GRID
        // -------------------------------------------------------
        {
            id: 'grid',
            title: '2. CSS Grid',
            desc: 'Two-dimensional layout system. The most powerful layout tool in CSS.',
            cards: [
                {
                    title: 'Grid Container Properties',
                    body: `
${codeBlock('css', `/* Enable grid */
.grid {
    display: grid;

    /* Define columns */
    grid-template-columns: 200px 1fr 200px;   /* Fixed-Flex-Fixed */
    grid-template-columns: repeat(3, 1fr);      /* Three equal columns */
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive! */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* Responsive + collapse */

    /* Define rows */
    grid-template-rows: 80px 1fr auto;

    /* Implicit row sizing (for auto-generated rows) */
    grid-auto-rows: minmax(100px, auto);

    /* Gap */
    gap: 24px;
    row-gap: 20px;
    column-gap: 16px;

    /* Named grid areas (visual layout!) */
    grid-template-areas:
        "header  header  header"
        "sidebar content aside"
        "footer  footer  footer";

    /* Alignment (same as flexbox) */
    justify-items: center;   /* Horizontal align of items within their cell */
    align-items: center;     /* Vertical align of items within their cell */
    justify-content: center; /* Horizontal align of the entire grid */
    align-content: center;   /* Vertical align of the entire grid */

    /* Auto-flow direction */
    grid-auto-flow: row;         /* Fill rows first (default) */
    grid-auto-flow: column;      /* Fill columns first */
    grid-auto-flow: row dense;   /* Fill rows, backfill gaps */
}`)}
<div class="tip-box">💡 <strong>auto-fill vs auto-fit:</strong>
<br>• <code>auto-fill</code> creates as many tracks as fit, even if empty (preserves space).
<br>• <code>auto-fit</code> collapses empty tracks, letting items stretch to fill the row.</div>
`
                },
                {
                    title: 'Grid Item Placement',
                    body: `
${codeBlock('css', `/* Place items by line numbers */
.item {
    grid-column: 1 / 3;       /* Start line 1, end line 3 (span 2 columns) */
    grid-row: 2 / 4;          /* Start line 2, end line 4 (span 2 rows) */

    /* Shorthand: row-start / col-start / row-end / col-end */
    grid-area: 2 / 1 / 4 / 3;

    /* Span syntax */
    grid-column: span 2;          /* Span 2 columns from wherever placed */
    grid-row: 1 / span 3;         /* Start at row 1, span 3 rows */

    /* Named areas */
    grid-area: header;    /* Place in the "header" named area */
    grid-area: sidebar;
    grid-area: content;
}

/* Named lines */
.grid {
    grid-template-columns: [sidebar-start] 250px [sidebar-end content-start] 1fr [content-end];
}
.sidebar { grid-column: sidebar-start / sidebar-end; }

/* Self alignment (override container alignment for one item) */
.item {
    justify-self: end;
    align-self: stretch;
}

/* Full-width item in a multi-column grid */
.full-width {
    grid-column: 1 / -1;  /* -1 = last line */
}`)}
`
                },
                {
                    title: 'Subgrid (Modern CSS)',
                    body: `
<p><code>subgrid</code> lets a child grid inherit the track sizing of its parent grid, keeping everything aligned.</p>
${codeBlock('css', `/* Parent grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

/* Each card is also a grid that uses parent's columns */
.card {
    display: grid;
    grid-row: span 3;
    grid-template-rows: subgrid; /* Inherit parent's row tracks */
    gap: 0; /* Override gap if needed */
}

/* Without subgrid: card headers, bodies, and footers
   would be different heights across columns.
   With subgrid: they all line up perfectly. */`)}
<div class="warn-box">⚠️ <code>subgrid</code> is supported in all modern browsers as of 2024. Check <a href="https://caniuse.com/css-subgrid" style="color:var(--accent);">caniuse.com</a> for current support.</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  3. MODERN CSS FEATURES
        // -------------------------------------------------------
        {
            id: 'modern',
            title: '3. Modern CSS',
            desc: 'Container Queries, :has(), :is(), clamp(), and other cutting-edge features.',
            cards: [
                {
                    title: ':has() — The Parent Selector',
                    body: `
<p>The most requested CSS feature for 20 years. <code>:has()</code> selects a parent based on its children.</p>
${codeBlock('css', `/* Select <a> that contains an <img> */
a:has(img) {
    display: block;
    border: none;
}

/* Card that has an image gets different padding */
.card:has(img) { padding: 0; }
.card:has(img) .card-body { padding: 1.5rem; }

/* Form group with an invalid input */
.form-group:has(:invalid) {
    border-color: red;
}

/* Style a label when its sibling input is focused */
label:has(+ input:focus) {
    color: var(--accent);
}

/* Navigation that contains a dropdown */
nav:has(.dropdown.open) {
    background: rgba(0,0,0,0.9);
}

/* Select elements that do NOT have certain children */
section:not(:has(h2)) {
    padding-top: 0;
}`)}
`
                },
                {
                    title: ':is() and :where()',
                    body: `
${codeBlock('css', `/* :is() — Group selectors with compact syntax */
/* OLD way: */
header a:hover, nav a:hover, footer a:hover { color: gold; }
/* NEW way: */
:is(header, nav, footer) a:hover { color: gold; }

/* Deeply nested selectors made clean */
:is(h1, h2, h3, h4):is(:first-child, .featured) {
    margin-top: 0;
}

/* :where() — IDENTICAL but with ZERO specificity */
:where(header, nav, footer) a { color: gray; }
/* Easy to override since specificity is 0,0,0,1 (just the 'a') */

/* Practical use: CSS resets with :where() */
:where(ul, ol) { list-style: none; padding: 0; margin: 0; }
/* Since specificity is 0, any later style will easily override */`)}
<table class="styled-table">
<thead><tr><th>Feature</th><th><code>:is()</code></th><th><code>:where()</code></th></tr></thead>
<tbody>
<tr><td>Specificity</td><td>Highest argument</td><td>Always zero</td></tr>
<tr><td>Use case</td><td>Grouping selectors</td><td>Low-specificity resets/defaults</td></tr>
<tr><td>Forgiving?</td><td>Yes (ignores invalid selectors)</td><td>Yes</td></tr>
</tbody>
</table>
`
                },
                {
                    title: 'Container Queries',
                    body: `
<p>Media queries respond to the <em>viewport</em>. Container queries respond to the <em>parent container's size</em> — a game-changer for component-based design.</p>
${codeBlock('css', `/* 1. Define a containment context */
.card-wrapper {
    container-type: inline-size;  /* Track inline (width) size */
    container-name: card;         /* Optional name for targeting */
}

/* 2. Query the container's size */
@container card (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;
    }
    .card img {
        width: 40%;
    }
}

@container card (max-width: 399px) {
    .card {
        flex-direction: column;
    }
    .card img {
        width: 100%;
    }
}

/* Container query units */
.card-title {
    font-size: clamp(1rem, 3cqi, 2rem);
    /* cqi = 1% of container's inline size */
    /* cqb = 1% of container's block size */
    /* cqw/cqh = container query width/height */
}

/* Style queries (check computed styles — experimental) */
@container style(--theme: dark) {
    .card { background: #1a1a2e; }
}`)}
`
                },
                {
                    title: 'clamp(), min(), max() & Fluid Typography',
                    body: `
${codeBlock('css', `/* clamp(minimum, preferred, maximum) */
.container {
    width: clamp(320px, 80vw, 1200px);
    /* At least 320px, prefers 80% viewport, max 1200px */
}

/* Fluid typography — no media queries needed! */
h1 {
    font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
    /* Smoothly scales between 2rem and 4.5rem based on viewport */
}

p {
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
}

/* min() and max() */
.sidebar {
    width: min(300px, 30vw);   /* Whichever is SMALLER */
}
.main {
    width: max(600px, 60vw);   /* Whichever is LARGER */
}

/* Fluid spacing */
.section {
    padding: clamp(1rem, 3vw, 4rem);
    gap: clamp(0.5rem, 2vw, 2rem);
}

/* Responsive without media queries */
.grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    /* Handles single-column on mobile automatically */
}`)}
`
                },
                {
                    title: 'Custom Properties (CSS Variables)',
                    body: `
${codeBlock('css', `/* Define variables on :root (global) or any element */
:root {
    --color-primary: #6366f1;
    --color-surface: #1a1a2e;
    --radius-md: 12px;
    --font-size-base: 1rem;
    --spacing: 8px;
}

/* Use with var() — with optional fallback */
.card {
    background: var(--color-surface);
    border-radius: var(--radius-md);
    padding: calc(var(--spacing) * 3);
    font-size: var(--font-size-base, 16px); /* fallback if not defined */
}

/* Override for specific contexts (scoped theming) */
.dark-theme {
    --color-primary: #818cf8;
    --color-surface: #0a0a14;
}

/* Dynamic manipulation with JavaScript */
// document.documentElement.style.setProperty('--color-primary', '#f97316');

/* Using variables in calc() */
.grid {
    gap: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 4);
}

/* Variable in media queries (NOT supported — use @property instead) */
@property --gradient-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}
.rainbow {
    --gradient-angle: 0deg;
    background: conic-gradient(from var(--gradient-angle), red, blue, red);
    animation: spin 3s linear infinite;
}
@keyframes spin {
    to { --gradient-angle: 360deg; }
}`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  4. ANIMATIONS & TRANSITIONS
        // -------------------------------------------------------
        {
            id: 'animations',
            title: '4. Animations & Transitions',
            desc: 'Smooth transitions, keyframe animations, and performance considerations.',
            cards: [
                {
                    title: 'Transitions',
                    body: `
${codeBlock('css', `/* Transition specific properties */
.button {
    background: #333;
    color: white;
    transform: scale(1);
    transition:
        background 0.3s ease,
        transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); /* spring */
}
.button:hover {
    background: #6366f1;
    transform: scale(1.05);
}

/* Transition ALL (convenient but less performant) */
.card {
    transition: all 0.3s ease;
}

/* Timing functions */
transition-timing-function: ease;          /* Default — slow start/end */
transition-timing-function: ease-in;       /* Slow start */
transition-timing-function: ease-out;      /* Slow end */
transition-timing-function: ease-in-out;   /* Slow start and end */
transition-timing-function: linear;        /* Constant speed */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* Custom spring */
transition-timing-function: steps(5);      /* Discrete steps (sprite animation) */

/* Delay */
.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 100ms; }
.item:nth-child(3) { transition-delay: 200ms; }

/* Properties that CAN'T be transitioned: display, content, grid-template */
/* Workaround for display: use opacity + visibility */
.modal {
    opacity: 0; visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
}
.modal.open {
    opacity: 1; visibility: visible;
}`)}
`
                },
                {
                    title: 'Keyframe Animations',
                    body: `
${codeBlock('css', `/* Define the animation */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.05); }
}

@keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Apply the animation */
.card {
    animation: slideInUp 0.6s ease-out both;
    /* name | duration | timing | fill-mode */
}

/* Full longhand */
.element {
    animation-name: pulse;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;  /* or a number */
    animation-direction: alternate;       /* normal, reverse, alternate */
    animation-fill-mode: forwards;        /* none, forwards, backwards, both */
    animation-play-state: running;        /* or paused */
}

/* Staggered animations with nth-child */
.card:nth-child(1) { animation-delay: 0.0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
/* Template: animation-delay: calc(var(--i, 0) * 100ms); */

/* Respecting user preferences */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}`)}
`
                },
                {
                    title: 'Performance: What to Animate',
                    body: `
<table class="styled-table">
<thead><tr><th>Category</th><th>Properties</th><th>Performance</th></tr></thead>
<tbody>
<tr><td>Composite-only ✅</td><td><code>transform</code>, <code>opacity</code></td><td>GPU-accelerated, ~60fps</td></tr>
<tr><td>Layout-triggering ⚠️</td><td><code>width</code>, <code>height</code>, <code>top</code>, <code>margin</code>, <code>padding</code></td><td>Forces reflow — slow, janky</td></tr>
<tr><td>Paint-triggering 🟡</td><td><code>color</code>, <code>background</code>, <code>box-shadow</code>, <code>border</code></td><td>Moderate cost</td></tr>
</tbody>
</table>
<div class="tip-box">💡 <strong>Rule of thumb:</strong> Only animate <code>transform</code> and <code>opacity</code> for butter-smooth animations. Use <code>transform: translateX()</code> instead of <code>left:</code>, and <code>transform: scale()</code> instead of <code>width/height</code>.
<br><br>Force GPU acceleration with: <code>will-change: transform;</code> (use sparingly — it reserves GPU memory).</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  5. STACKING CONTEXT & Z-INDEX
        // -------------------------------------------------------
        {
            id: 'stacking',
            title: '5. Stacking & Z-Index',
            desc: 'The most misunderstood feature in CSS. Here is how it actually works.',
            cards: [
                {
                    title: 'Stacking Context Deep Dive',
                    body: `
<p>A <strong>stacking context</strong> is a three-dimensional concept. Each context is an independent layer. Z-index only works <em>within</em> the same stacking context — you can <strong>never</strong> z-index your way out of a parent's context.</p>
<p><strong>What creates a new stacking context:</strong></p>
<ul>
    <li><code>position: relative/absolute/fixed/sticky</code> + any <code>z-index</code> value (even 0)</li>
    <li><code>opacity</code> less than 1</li>
    <li><code>transform</code>, <code>filter</code>, <code>perspective</code>, <code>clip-path</code>, <code>mask</code></li>
    <li><code>isolation: isolate</code></li>
    <li><code>will-change</code> with transform/opacity</li>
    <li>Flex/Grid children with z-index set</li>
    <li><code>mix-blend-mode</code> other than normal</li>
    <li><code>contain: layout</code> or <code>contain: paint</code></li>
</ul>
${codeBlock('css', `/* THE CLASSIC BUG: */
.parent {
    position: relative;
    z-index: 1; /* Creates a stacking context! */
}
.child {
    position: absolute;
    z-index: 99999; /* STILL can't go above .other-parent below */
}
.other-parent {
    position: relative;
    z-index: 2; /* This entire context is ABOVE .parent's context */
}

/* THE FIX: Use isolation: isolate to create stacking contexts
   without needing position/z-index */
.modal-overlay {
    isolation: isolate;
    z-index: 9999;
}

/* Debugging tip: If z-index isn't working, check if the element
   has position set (it must be non-static for z-index to work,
   UNLESS it's a flex/grid child). */`)}
<div class="danger-box">🚨 <strong>The #1 z-index mistake:</strong> Using <code>z-index: 99999</code> to "force" an element on top. This only works within the same stacking context. If the parent has a lower z-index than a sibling, no amount of z-index on the child will fix it. The solution is to restructure your HTML or manage stacking contexts with <code>isolation: isolate</code>.</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  6. EDGE CASES & GOTCHAS
        // -------------------------------------------------------
        {
            id: 'edge-cases',
            title: '6. Edge Cases & Gotchas',
            desc: 'Things that confuse even senior developers.',
            cards: [
                {
                    title: 'Units Reference',
                    body: `
<table class="styled-table">
<thead><tr><th>Unit</th><th>Relative To</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><code>px</code></td><td>Absolute</td><td>Borders, shadows, fine details</td></tr>
<tr><td><code>rem</code></td><td>Root font size (16px default)</td><td>Font sizes, spacing, padding — scales globally</td></tr>
<tr><td><code>em</code></td><td>Parent's font size</td><td>Component-relative sizing (beware compounding!)</td></tr>
<tr><td><code>%</code></td><td>Parent element</td><td>Width of children relative to parent</td></tr>
<tr><td><code>vw / vh</code></td><td>1% of viewport width/height</td><td>Full-screen sections, hero images</td></tr>
<tr><td><code>dvh</code></td><td>Dynamic viewport height</td><td>Mobile-safe 100vh (accounts for browser chrome)</td></tr>
<tr><td><code>svh / lvh</code></td><td>Small/Large viewport height</td><td>Smallest/largest possible viewport</td></tr>
<tr><td><code>ch</code></td><td>Width of "0" character</td><td>Limiting text width (max-width: 65ch)</td></tr>
<tr><td><code>lh</code></td><td>Line height</td><td>Vertical spacing relative to text</td></tr>
</tbody>
</table>
<div class="warn-box">⚠️ <strong>100vh on mobile:</strong> On iOS Safari, <code>100vh</code> includes the area behind the URL bar, causing content to be cut off. Use <code>100dvh</code> (dynamic viewport height) instead, which adjusts when the URL bar shows/hides.</div>
`
                },
                {
                    title: 'Common CSS Gotchas',
                    body: `
<ul>
    <li><strong>Percentage height requires parent height:</strong> <code>height: 50%</code> does nothing unless the parent has an explicit height or is a flex/grid child.</li>
    <li><strong>em compounding:</strong> If a parent is <code>1.2em</code> and a child is <code>1.2em</code>, the child's actual size is 1.2 × 1.2 = 1.44× the root. Use <code>rem</code> to avoid this.</li>
    <li><strong>Inline elements ignore width/height:</strong> <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code> are inline by default. Set <code>display: inline-block</code> or <code>display: block</code> to give them dimensions.</li>
    <li><strong>Collapsing margins:</strong> Vertical margins between siblings/parent-child collapse into the larger margin. Padding, borders, flexbox, and grid prevent this.</li>
    <li><strong>outline vs border:</strong> <code>outline</code> doesn't take up space and doesn't affect layout. <code>border</code> does. For focus indicators, prefer <code>outline</code>.</li>
    <li><strong>position: sticky requires a scrolling ancestor:</strong> Sticky won't work if any ancestor has <code>overflow: hidden</code> (a very common bug).</li>
</ul>
${codeBlock('css', `/* Sticky gotcha fix */
.parent {
    overflow: hidden;  /* This BREAKS position: sticky on children! */
    overflow: clip;    /* Use clip instead — doesn't create a scroll context */
}

/* Min-height doesn't work with percentage children */
.parent {
    min-height: 500px;   /* Child's height: 50% is based on "auto", not 500px */
    height: 500px;       /* This works */
    /* OR use flexbox/grid which handles this correctly */
}`)}
`
                }
            ]
        }
    ]
};
