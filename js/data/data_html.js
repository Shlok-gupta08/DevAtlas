// =================================================================
//  HTML REFERENCE DATA
//  Exhaustive reference for HTML — from absolute basics to edge cases
// =================================================================
window.DevAtlasData = window.DevAtlasData || {};
window.DevAtlasData.html = {
    name: 'HTML',
    desc: 'The backbone of every web page. Master semantic markup, accessibility, forms, media, and modern HTML5 APIs.',
    sections: [
        // -------------------------------------------------------
        //  0. ABSOLUTE BASICS
        // -------------------------------------------------------
        {
            id: 'basics',
            title: '0. Absolute Basics',
            desc: 'The foundational building blocks every developer must know cold.',
            cards: [
                {
                    title: 'Document Structure',
                    body: `
<p>Every valid HTML page starts with a <span class="kw">DOCTYPE</span> declaration and follows this skeleton:</p>
${codeBlock('html', `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Your content here -->
</body>
</html>`)}
<ul>
    <li><strong>&lt;!DOCTYPE html&gt;</strong> — Tells the browser to use HTML5 standards mode. Without it, the browser falls into "quirks mode" and renders things unpredictably.</li>
    <li><strong>&lt;html lang="en"&gt;</strong> — The root element. The <code>lang</code> attribute is critical for screen readers and search engines.</li>
    <li><strong>&lt;meta charset="UTF-8"&gt;</strong> — Ensures the page can display virtually any character (emojis, Chinese, Arabic, etc.).</li>
    <li><strong>&lt;meta name="viewport"&gt;</strong> — Makes the page responsive on mobile devices. Without this, mobile browsers render the page at desktop width and zoom out.</li>
</ul>`
                },
                {
                    title: 'Headings & Paragraphs',
                    body: `
<p>HTML has six heading levels. Use them to create a logical document outline, <strong>not</strong> for styling.</p>
${codeBlock('html', `<h1>Main Page Title</h1>       <!-- Only ONE per page (SEO rule) -->
<h2>Major Section</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Minor heading</h5>
<h6>Smallest heading</h6>

<p>This is a paragraph. Browsers automatically add vertical
   spacing above and below paragraphs.</p>

<p>Use the <br> tag for a line break<br>within a paragraph.
   Use <hr> for a thematic break (horizontal rule).</p>`)}
<div class="warn-box">⚠️ <strong>Common mistake:</strong> Never skip heading levels (e.g., jumping from h2 to h4). Screen readers use the heading hierarchy to build a navigable table of contents.</div>`
                },
                {
                    title: 'Text Formatting & Inline Elements',
                    body: `
<table class="styled-table">
<thead><tr><th>Element</th><th>Purpose</th><th>Example</th></tr></thead>
<tbody>
<tr><td><code>&lt;strong&gt;</code></td><td>Strong importance (bold by default)</td><td><strong>Important text</strong></td></tr>
<tr><td><code>&lt;em&gt;</code></td><td>Emphasis (italic by default)</td><td><em>Emphasized text</em></td></tr>
<tr><td><code>&lt;mark&gt;</code></td><td>Highlighted/marked text</td><td>Search result highlight</td></tr>
<tr><td><code>&lt;small&gt;</code></td><td>Side comments, legal text</td><td>Fine print</td></tr>
<tr><td><code>&lt;del&gt;</code></td><td>Deleted/removed text (strikethrough)</td><td><del>Old price</del></td></tr>
<tr><td><code>&lt;ins&gt;</code></td><td>Inserted text (underline)</td><td><ins>New price</ins></td></tr>
<tr><td><code>&lt;sub&gt;</code> / <code>&lt;sup&gt;</code></td><td>Subscript / Superscript</td><td>H<sub>2</sub>O, x<sup>2</sup></td></tr>
<tr><td><code>&lt;abbr&gt;</code></td><td>Abbreviation with tooltip</td><td>&lt;abbr title="HyperText"&gt;HTML&lt;/abbr&gt;</td></tr>
<tr><td><code>&lt;code&gt;</code></td><td>Inline code</td><td><code>console.log()</code></td></tr>
<tr><td><code>&lt;kbd&gt;</code></td><td>Keyboard input</td><td>Press <kbd>Ctrl+S</kbd></td></tr>
<tr><td><code>&lt;time&gt;</code></td><td>Machine-readable date/time</td><td>&lt;time datetime="2024-01-15"&gt;</td></tr>
</tbody>
</table>
<div class="tip-box">💡 <strong>Semantic vs. Presentational:</strong> Use <code>&lt;strong&gt;</code> for importance (not <code>&lt;b&gt;</code>) and <code>&lt;em&gt;</code> for emphasis (not <code>&lt;i&gt;</code>). The semantic versions convey <em>meaning</em> to assistive tech; the presentational ones are purely visual.</div>`
                },
                {
                    title: 'Links & Navigation',
                    body: `
${codeBlock('html', `<!-- Basic link -->
<a href="https://example.com">Visit Example</a>

<!-- Open in new tab (ALWAYS add rel for security) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
</a>

<!-- Link to a section on the same page -->
<a href="#section-id">Jump to Section</a>
<section id="section-id">Target Section</section>

<!-- Email and telephone links -->
<a href="mailto:hello@example.com">Send Email</a>
<a href="tel:+1234567890">Call Us</a>

<!-- Download link -->
<a href="/files/report.pdf" download="annual-report.pdf">
    Download Report
</a>`)}
<div class="warn-box">⚠️ <strong>Security:</strong> When using <code>target="_blank"</code>, ALWAYS add <code>rel="noopener noreferrer"</code>. Without it, the new page can access your page's <code>window.opener</code> object and potentially redirect your page to a phishing site (known as "tabnapping").</div>`
                },
                {
                    title: 'Lists',
                    body: `
${codeBlock('html', `<!-- Unordered list -->
<ul>
    <li>First item</li>
    <li>Second item
        <ul>
            <li>Nested item</li>
        </ul>
    </li>
</ul>

<!-- Ordered list -->
<ol type="1" start="5" reversed>
    <li>Item 5 (counting down)</li>
    <li>Item 4</li>
</ol>

<!-- Description list (great for glossaries / FAQs) -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language — the structure of web pages.</dd>

    <dt>CSS</dt>
    <dd>Cascading Style Sheets — the presentation layer.</dd>
</dl>`)}
<table class="styled-table">
<thead><tr><th>Attribute</th><th>Applies To</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>type="a"</code></td><td>&lt;ol&gt;</td><td>Lowercase letters (a, b, c)</td></tr>
<tr><td><code>type="A"</code></td><td>&lt;ol&gt;</td><td>Uppercase letters (A, B, C)</td></tr>
<tr><td><code>type="i"</code></td><td>&lt;ol&gt;</td><td>Lowercase Roman numerals</td></tr>
<tr><td><code>start="5"</code></td><td>&lt;ol&gt;</td><td>Start counting from 5</td></tr>
<tr><td><code>reversed</code></td><td>&lt;ol&gt;</td><td>Count backwards</td></tr>
<tr><td><code>value="10"</code></td><td>&lt;li&gt; in &lt;ol&gt;</td><td>Override the number for that item</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'Images',
                    body: `
${codeBlock('html', `<!-- Basic image (alt is MANDATORY for accessibility) -->
<img src="photo.jpg"
     alt="A golden retriever playing in the park"
     width="800"
     height="600"
     loading="lazy">

<!-- Specifying width/height prevents layout shift (CLS) -->
<!-- loading="lazy" defers offscreen images until user scrolls near them -->`)}
<div class="tip-box">💡 <strong>Alt text rules:</strong>
<br>• Describe the image content, not the file name.
<br>• If the image is purely decorative (e.g., a background swirl), use <code>alt=""</code> (empty string) so screen readers skip it.
<br>• Never start with "Image of..." — screen readers already announce it as an image.</div>`
                }
            ]
        },
        // -------------------------------------------------------
        //  1. SEMANTIC HTML
        // -------------------------------------------------------
        {
            id: 'semantic',
            title: '1. Semantic HTML',
            desc: 'Semantic elements give meaning to your markup. They improve accessibility, SEO, and code readability.',
            cards: [
                {
                    title: 'Page Layout Semantics',
                    body: `
${codeBlock('html', `<body>
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main> <!-- Only ONE <main> per page -->
        <article>
            <header>
                <h1>Article Title</h1>
                <time datetime="2024-03-15">March 15, 2024</time>
            </header>
            <section>
                <h2>Introduction</h2>
                <p>Article content...</p>
            </section>
            <section>
                <h2>Main Points</h2>
                <p>More content...</p>
            </section>
            <footer>
                <p>Written by <address>John Doe</address></p>
            </footer>
        </article>

        <aside>
            <h2>Related Articles</h2>
            <nav aria-label="Related articles">
                <ul>
                    <li><a href="#">Article 2</a></li>
                </ul>
            </nav>
        </aside>
    </main>

    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>`)}
<table class="styled-table">
<thead><tr><th>Element</th><th>Usage</th></tr></thead>
<tbody>
<tr><td><code>&lt;header&gt;</code></td><td>Introductory content for a page or section. Can appear multiple times.</td></tr>
<tr><td><code>&lt;nav&gt;</code></td><td>Major navigation blocks. Use <code>aria-label</code> if more than one nav exists.</td></tr>
<tr><td><code>&lt;main&gt;</code></td><td>The dominant content of the page. Only ONE per page. Skip-nav target.</td></tr>
<tr><td><code>&lt;article&gt;</code></td><td>Self-contained content (blog post, news story, product card).</td></tr>
<tr><td><code>&lt;section&gt;</code></td><td>Thematic grouping of content, typically with a heading.</td></tr>
<tr><td><code>&lt;aside&gt;</code></td><td>Tangentially related content (sidebar, callout, ad).</td></tr>
<tr><td><code>&lt;footer&gt;</code></td><td>Closing info for a page or section (copyright, links).</td></tr>
<tr><td><code>&lt;address&gt;</code></td><td>Contact info for the nearest article or body ancestor.</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'The <figure> & <figcaption> Pattern',
                    body: `
<p>Use <code>&lt;figure&gt;</code> for self-contained media with a caption. It's not just for images — it works for code snippets, charts, quotes, and tables.</p>
${codeBlock('html', `<figure>
    <img src="chart.png" alt="Sales growth chart showing 40% increase">
    <figcaption>Fig 1. Quarterly sales growth, 2024.</figcaption>
</figure>

<!-- Figure for a code example -->
<figure>
    <pre><code>console.log("Hello, World!");</code></pre>
    <figcaption>Example 1. A basic Hello World program.</figcaption>
</figure>

<!-- Figure for a blockquote -->
<figure>
    <blockquote cite="https://example.com/source">
        <p>The best way to predict the future is to invent it.</p>
    </blockquote>
    <figcaption>— Alan Kay</figcaption>
</figure>`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  2. FORMS & VALIDATION
        // -------------------------------------------------------
        {
            id: 'forms',
            title: '2. Forms & Validation',
            desc: 'HTML5 provides powerful built-in form validation and input types that reduce the need for JavaScript.',
            cards: [
                {
                    title: 'Complete Form Anatomy',
                    body: `
${codeBlock('html', `<form action="/api/submit" method="POST" novalidate>
    <!-- Text inputs with labels (ALWAYS use labels) -->
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username"
               required
               minlength="3"
               maxlength="20"
               pattern="[a-zA-Z0-9_]+"
               placeholder="e.g. john_doe"
               autocomplete="username"
               aria-describedby="username-help">
        <small id="username-help">3-20 characters, letters/numbers/underscores only.</small>
    </div>

    <!-- Email -->
    <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required
               autocomplete="email"
               placeholder="you@example.com">
    </div>

    <!-- Password with strength requirements -->
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password"
               required
               minlength="8"
               pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
               autocomplete="new-password"
               aria-describedby="pw-rules">
        <small id="pw-rules">Min 8 chars, must include uppercase, lowercase, and a number.</small>
    </div>

    <!-- Number with range -->
    <div>
        <label for="age">Age</label>
        <input type="number" id="age" name="age"
               min="13" max="120" step="1">
    </div>

    <!-- Date, Time, and DateTime-Local -->
    <input type="date" name="birthday" min="1900-01-01" max="2024-12-31">
    <input type="time" name="meeting-time" min="09:00" max="17:00">
    <input type="datetime-local" name="appointment">

    <!-- Range slider -->
    <label for="volume">Volume: <output id="vol-out">50</output></label>
    <input type="range" id="volume" name="volume"
           min="0" max="100" value="50"
           oninput="document.getElementById('vol-out').value = this.value">

    <!-- Color picker -->
    <input type="color" name="fav-color" value="#ff6600">

    <!-- URL and telephone -->
    <input type="url" name="website" placeholder="https://...">
    <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890">

    <!-- File upload -->
    <input type="file" name="avatar" accept="image/*,.pdf" multiple>

    <!-- Hidden field (for CSRF tokens, IDs, etc.) -->
    <input type="hidden" name="csrf_token" value="abc123">

    <button type="submit">Submit</button>
    <button type="reset">Reset Form</button>
</form>`)}
<table class="styled-table">
<thead><tr><th>Input Type</th><th>Built-in Behavior</th></tr></thead>
<tbody>
<tr><td><code>email</code></td><td>Validates email format. Shows email keyboard on mobile.</td></tr>
<tr><td><code>url</code></td><td>Validates URL format (must include protocol).</td></tr>
<tr><td><code>tel</code></td><td>Shows phone keypad on mobile. No validation (formats vary globally).</td></tr>
<tr><td><code>number</code></td><td>Numeric input with spinner. Respects min/max/step.</td></tr>
<tr><td><code>date</code></td><td>Native date picker. Value format: YYYY-MM-DD.</td></tr>
<tr><td><code>search</code></td><td>Like text but may show a clear button. Submits on Enter.</td></tr>
<tr><td><code>color</code></td><td>Color picker. Value is hex (#rrggbb).</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'Select, Textarea, Fieldset & Datalist',
                    body: `
${codeBlock('html', `<!-- Dropdown select -->
<label for="country">Country</label>
<select id="country" name="country" required>
    <option value="">-- Choose --</option>
    <optgroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
    </optgroup>
    <optgroup label="Europe">
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
    </optgroup>
</select>

<!-- Multi-line text -->
<label for="bio">Bio</label>
<textarea id="bio" name="bio" rows="4" cols="50"
          maxlength="500" placeholder="Tell us about yourself..."></textarea>

<!-- Grouping related fields -->
<fieldset>
    <legend>Shipping Address</legend>
    <label for="street">Street</label>
    <input type="text" id="street" name="street" autocomplete="street-address">
    <label for="city">City</label>
    <input type="text" id="city" name="city" autocomplete="address-level2">
</fieldset>

<!-- Datalist: autocomplete suggestions for any input -->
<label for="browser">Preferred Browser</label>
<input list="browsers" id="browser" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>

<!-- Radio buttons (only one selectable in a group) -->
<fieldset>
    <legend>Plan</legend>
    <label><input type="radio" name="plan" value="free" checked> Free</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>
</fieldset>

<!-- Checkboxes (multiple selectable) -->
<fieldset>
    <legend>Interests</legend>
    <label><input type="checkbox" name="interests" value="coding"> Coding</label>
    <label><input type="checkbox" name="interests" value="design"> Design</label>
</fieldset>`)}
`
                },
                {
                    title: 'Constraint Validation API (Advanced)',
                    body: `
<p>HTML5 provides a JavaScript API to interact with the browser's built-in form validation:</p>
${codeBlock('javascript', `const form = document.querySelector('form');
const email = document.getElementById('email');

// Check if an input is valid
email.checkValidity();        // returns true/false
email.reportValidity();       // shows the browser's validation popup

// Access the validation state
email.validity.valueMissing;  // true if required and empty
email.validity.typeMismatch;  // true if not a valid email format
email.validity.tooShort;      // true if below minlength
email.validity.patternMismatch; // true if doesn't match pattern
email.validity.rangeOverflow; // true if above max
email.validity.valid;         // true if ALL constraints pass

// Set a custom error message
email.setCustomValidity('Please enter a company email address.');
// IMPORTANT: Reset the custom validity to "" when input changes,
// otherwise the field will always be invalid:
email.addEventListener('input', () => email.setCustomValidity(''));

// Prevent default form submission, validate manually
form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        // Highlight invalid fields, show custom messages, etc.
    }
});`)}
<div class="tip-box">💡 The <code>novalidate</code> attribute on <code>&lt;form&gt;</code> disables the browser's default validation popups, letting you implement your own UI while still using the Constraint Validation API.</div>`
                }
            ]
        },
        // -------------------------------------------------------
        //  3. MODERN HTML5 ELEMENTS
        // -------------------------------------------------------
        {
            id: 'modern',
            title: '3. Modern HTML5 Elements',
            desc: 'Powerful native elements that replace libraries and custom JS widgets.',
            cards: [
                {
                    title: '&lt;dialog&gt; — Native Modal/Dialog',
                    body: `
<p>The <code>&lt;dialog&gt;</code> element provides a native, accessible modal with built-in backdrop, focus trapping, and Escape key handling — no JavaScript library needed.</p>
${codeBlock('html', `<dialog id="my-dialog">
    <h2>Confirm Action</h2>
    <p>Are you sure you want to delete this item?</p>
    <form method="dialog"> <!-- method="dialog" closes on submit -->
        <button value="cancel">Cancel</button>
        <button value="confirm">Confirm</button>
    </form>
</dialog>

<button onclick="document.getElementById('my-dialog').showModal()">
    Open Modal
</button>`)}
${codeBlock('javascript', `const dialog = document.getElementById('my-dialog');

// Open as modal (with backdrop, focus trap, Esc to close)
dialog.showModal();

// Open as non-modal (no backdrop, no focus trap)
dialog.show();

// Close programmatically
dialog.close('return-value');

// Listen for close
dialog.addEventListener('close', () => {
    console.log(dialog.returnValue); // "cancel" or "confirm"
});

// Click outside to close (click on backdrop)
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});`)}
${codeBlock('css', `/* Style the backdrop */
dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
}

/* Style the dialog itself */
dialog {
    border: none;
    border-radius: 16px;
    padding: 2rem;
    max-width: 400px;
}

/* Animation */
dialog[open] {
    animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
}`)}
`
                },
                {
                    title: '&lt;details&gt; & &lt;summary&gt; — Native Accordion',
                    body: `
${codeBlock('html', `<!-- Basic accordion -->
<details>
    <summary>Click to expand</summary>
    <p>Hidden content revealed when clicked.</p>
</details>

<!-- Open by default -->
<details open>
    <summary>FAQ: How does billing work?</summary>
    <p>You are billed monthly on the date you signed up...</p>
</details>

<!-- Exclusive accordion (only one open at a time, HTML5.2+) -->
<details name="faq-group">
    <summary>Question 1</summary>
    <p>Answer 1</p>
</details>
<details name="faq-group">
    <summary>Question 2</summary>
    <p>Answer 2</p>
</details>`)}
${codeBlock('javascript', `// Listen for toggle
const details = document.querySelector('details');
details.addEventListener('toggle', () => {
    console.log(details.open ? 'Opened' : 'Closed');
});`)}
`
                },
                {
                    title: '&lt;picture&gt; — Responsive & Art-Directed Images',
                    body: `
<p>The <code>&lt;picture&gt;</code> element lets the browser choose the best image source based on viewport size, pixel density, or format support.</p>
${codeBlock('html', `<picture>
    <!-- Modern format (WebP) for browsers that support it -->
    <source srcset="hero.avif" type="image/avif">
    <source srcset="hero.webp" type="image/webp">

    <!-- Art direction: different crop for mobile -->
    <source media="(max-width: 768px)" srcset="hero-mobile.jpg">
    <source media="(max-width: 1200px)" srcset="hero-tablet.jpg">

    <!-- Responsive images with density descriptors -->
    <source srcset="hero-1x.jpg 1x, hero-2x.jpg 2x, hero-3x.jpg 3x">

    <!-- Fallback for old browsers -->
    <img src="hero.jpg" alt="Hero banner" loading="lazy"
         width="1200" height="600">
</picture>

<!-- srcset with size descriptors (no <picture> needed) -->
<img srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1000px) 800px,
            1200px"
     src="large.jpg"
     alt="Responsive image">`)}
<div class="tip-box">💡 <strong>Format priority:</strong> AVIF > WebP > JPEG. AVIF offers ~50% smaller files than JPEG at the same quality. Always provide a JPEG fallback.</div>`
                },
                {
                    title: '&lt;template&gt; & &lt;slot&gt; — Reusable HTML Fragments',
                    body: `
<p><code>&lt;template&gt;</code> holds HTML that is NOT rendered until you clone it with JavaScript. It's the native way to create reusable UI patterns.</p>
${codeBlock('html', `<template id="card-template">
    <div class="card">
        <h3 class="card-title"></h3>
        <p class="card-body"></p>
    </div>
</template>`)}
${codeBlock('javascript', `const template = document.getElementById('card-template');

function createCard(title, body) {
    // Clone the template content
    const clone = template.content.cloneNode(true);
    clone.querySelector('.card-title').textContent = title;
    clone.querySelector('.card-body').textContent = body;
    document.getElementById('card-container').appendChild(clone);
}

createCard('My Title', 'My body text');
createCard('Another Card', 'More content');`)}
`
                },
                {
                    title: 'Content Editable & Miscellaneous',
                    body: `
${codeBlock('html', `<!-- Make any element editable -->
<div contenteditable="true">
    Click here and start typing...
</div>

<!-- Progress bar -->
<label for="file-progress">Upload progress:</label>
<progress id="file-progress" value="70" max="100">70%</progress>

<!-- Meter (gauge) — for known ranges -->
<label for="disk">Disk usage:</label>
<meter id="disk" value="0.7" min="0" max="1"
       low="0.3" high="0.7" optimum="0.2">70%</meter>

<!-- Output element (for calculated values) -->
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
    <input type="number" id="a" value="10"> +
    <input type="number" id="b" value="20"> =
    <output name="result" for="a b">30</output>
</form>`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  4. ACCESSIBILITY (A11Y)
        // -------------------------------------------------------
        {
            id: 'accessibility',
            title: '4. Accessibility (A11Y)',
            desc: 'ARIA attributes, keyboard navigation, and common accessibility pitfalls.',
            cards: [
                {
                    title: 'ARIA Roles, States, and Properties',
                    body: `
<p>ARIA (Accessible Rich Internet Applications) bridges the gap between custom UI and assistive technology. The <strong>#1 rule:</strong> Don't use ARIA if a native HTML element does the job.</p>
${codeBlock('html', `<!-- ARIA Roles — redefine what an element "is" to screen readers -->
<div role="alert">Form submitted successfully!</div>
<div role="status" aria-live="polite">3 items in cart</div>
<nav role="navigation" aria-label="Breadcrumb">...</nav>
<div role="tablist">
    <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
    <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
</div>
<div role="tabpanel" id="panel1">Panel 1 content</div>

<!-- ARIA States — dynamic properties that change -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" aria-hidden="true">...</ul>

<button aria-pressed="false">Toggle Dark Mode</button>
<input aria-invalid="true" aria-errormessage="email-error">
<span id="email-error" role="alert">Please enter a valid email.</span>

<!-- ARIA Properties — static descriptors -->
<input aria-label="Search" type="search" placeholder="Search...">
<input aria-describedby="pw-hint" type="password">
<p id="pw-hint">Must be at least 8 characters.</p>
<div aria-labelledby="section-title">
    <h2 id="section-title">Recent Posts</h2>
</div>`)}
<table class="styled-table">
<thead><tr><th>ARIA Attribute</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><code>aria-label</code></td><td>Labels an element when there's no visible text label.</td></tr>
<tr><td><code>aria-labelledby</code></td><td>Points to another element's ID that serves as the label.</td></tr>
<tr><td><code>aria-describedby</code></td><td>Points to an element providing additional description.</td></tr>
<tr><td><code>aria-hidden="true"</code></td><td>Hides element from screen readers (still visible on screen).</td></tr>
<tr><td><code>aria-live="polite"</code></td><td>Announces changes to screen readers without interrupting.</td></tr>
<tr><td><code>aria-live="assertive"</code></td><td>Immediately announces changes (use for errors/alerts).</td></tr>
<tr><td><code>aria-expanded</code></td><td>Indicates if a collapsible element is open or closed.</td></tr>
<tr><td><code>aria-controls</code></td><td>Points to the ID of the element this button controls.</td></tr>
<tr><td><code>role="alert"</code></td><td>Immediately announces content to screen readers.</td></tr>
</tbody>
</table>
<div class="danger-box">🚨 <strong>ARIA Gotcha:</strong> <code>aria-hidden="true"</code> on a parent hides ALL children from screen readers, even focusable ones. Never put it on elements that contain interactive controls unless they're truly hidden.</div>`
                },
                {
                    title: 'Skip Navigation & Focus Management',
                    body: `
${codeBlock('html', `<!-- Skip nav link (first element in body) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- ... header, nav, etc ... -->

<main id="main-content" tabindex="-1">
    <!-- Main content here -->
</main>

<style>
    .skip-link {
        position: absolute;
        top: -100%;
        left: 0;
        padding: 8px 16px;
        background: #000;
        color: #fff;
        z-index: 9999;
    }
    .skip-link:focus {
        top: 0;
    }
</style>`)}
<div class="tip-box">💡 <strong>tabindex values:</strong>
<br>• <code>tabindex="0"</code> — Makes a non-interactive element focusable in normal tab order.
<br>• <code>tabindex="-1"</code> — Makes an element focusable via JS (<code>el.focus()</code>) but NOT in tab order.
<br>• <code>tabindex="1+"</code> — NEVER USE. Sets a custom tab order and causes chaos.</div>`
                },
                {
                    title: 'Color Contrast & WCAG 2.2 Standards',
                    body: `
<p>WCAG (Web Content Accessibility Guidelines) define minimum contrast ratios for text legibility. <strong>Failing contrast is the #1 accessibility violation on the web.</strong></p>
<table class="styled-table">
<thead><tr><th>Level</th><th>Normal Text</th><th>Large Text (18pt / 14pt bold)</th><th>UI Components</th></tr></thead>
<tbody>
<tr><td><strong>AA</strong> (minimum)</td><td>4.5:1</td><td>3:1</td><td>3:1</td></tr>
<tr><td><strong>AAA</strong> (enhanced)</td><td>7:1</td><td>4.5:1</td><td>N/A</td></tr>
</tbody>
</table>
${codeBlock('css', `/* Check contrast in browser DevTools or use tools like:
   https://webaim.org/resources/contrastchecker/
   https://accessible-colors.com/

   Common passing combinations (dark bg): */
--text-primary:   #e5e5e5; /* on #000 → 17.9:1 ✅ */
--text-secondary: #a3a3a3; /* on #000 → 7.0:1 ✅ AA */
--text-muted:     #737373; /* on #000 → 4.6:1 ✅ AA */
--text-disabled:  #404040; /* on #000 → 1.9:1 ❌ */

/* Focus indicator must ALSO meet 3:1 contrast:*/
:focus-visible {
    outline: 2px solid #3b82f6;   /* blue */
    outline-offset: 3px;
    /* Blue on white = 4.5:1 ✅ */
}`)}
<table class="styled-table">
<thead><tr><th>WCAG 2.2 Success Criteria</th><th>What Changed</th></tr></thead>
<tbody>
<tr><td>2.4.11 Focus Appearance</td><td>Focus indicators must have min 3:1 contrast and cover enough area.</td></tr>
<tr><td>2.4.12 Focus Not Obscured</td><td>Focused element must not be fully hidden by sticky headers/overlays.</td></tr>
<tr><td>2.5.3 Label in Name</td><td>Visible button text must be contained in the accessible name.</td></tr>
<tr><td>3.2.6 Consistent Help</td><td>Help links must appear in the same location across pages.</td></tr>
<tr><td>3.3.7 Redundant Entry</td><td>Don't ask users to re-enter info already provided in the same session.</td></tr>
<tr><td>3.3.8 Accessible Authentication</td><td>No cognitive tests (CAPTCHA) for auth unless alternatives exist.</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'Accessible Custom Components',
                    body: `
<p>When building custom UI components (tabs, accordions, dropdowns), always follow the <a href="https://www.w3.org/WAI/ARIA/apg/" style="color:var(--accent)">ARIA Authoring Practices Guide (APG)</a> patterns for keyboard interaction and ARIA roles.</p>
${codeBlock('html', `<!-- Accessible Tab Component -->
<div role="tablist" aria-label="Settings sections">
    <button role="tab" id="tab-profile" aria-selected="true" aria-controls="panel-profile"
            tabindex="0">Profile</button>
    <button role="tab" id="tab-security" aria-selected="false" aria-controls="panel-security"
            tabindex="-1">Security</button>
</div>
<div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile">
    Profile content...
</div>
<div role="tabpanel" id="panel-security" aria-labelledby="tab-security" hidden>
    Security content...
</div>

<!-- Accessible Dropdown Menu -->
<button id="menu-btn" aria-haspopup="true" aria-expanded="false"
        aria-controls="menu-list">Actions ▾</button>
<ul id="menu-list" role="menu" aria-labelledby="menu-btn" hidden>
    <li role="menuitem" tabindex="-1">Edit</li>
    <li role="menuitem" tabindex="-1">Delete</li>
</ul>

<!-- Accessible Error Message -->
<label for="email">Email address</label>
<input type="email" id="email" aria-invalid="true"
       aria-describedby="email-error">
<p id="email-error" role="alert" aria-live="assertive">
    ⚠ Please enter a valid email address.
</p>`)}
<table class="styled-table">
<thead><tr><th>Widget</th><th>Key Interactions Required</th></tr></thead>
<tbody>
<tr><td>Tabs</td><td>Arrow keys navigate tabs; Enter/Space selects; Home/End goes to first/last</td></tr>
<tr><td>Dropdown Menu</td><td>Enter/Space opens; Arrows navigate; Escape closes; Tab closes + moves focus</td></tr>
<tr><td>Dialog/Modal</td><td>Escape closes; Focus trapped inside; focus returns to trigger on close</td></tr>
<tr><td>Accordion</td><td>Enter/Space toggles; Tab moves between headers</td></tr>
<tr><td>Slider</td><td>Left/Right/Up/Down arrows adjust value; Home/End go to min/max</td></tr>
<tr><td>Combobox</td><td>Type to filter; Down arrow opens list; Escape closes; Enter selects</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'ARIA Live Regions & Dynamic Content',
                    body: `
<p>Live regions announce DOM changes to screen readers without requiring focus movement. Essential for SPAs, chat apps, notifications, and loading states.</p>
${codeBlock('html', `<!-- Status messages (non-urgent) -->
<div aria-live="polite" aria-atomic="true" id="status-msg">
    <!-- Inject messages here dynamically -->
</div>

<!-- Urgent alerts (interrupts current reading) -->
<div role="alert" aria-live="assertive" id="error-msg"></div>

<!-- Loading indicator -->
<div aria-live="polite" aria-busy="true" id="loading-region">
    Loading results...
</div>
<!-- When done: -->
<div aria-live="polite" aria-busy="false" id="loading-region">
    35 results found.
</div>

<!-- Log (appends, not replaces) -->
<div role="log" aria-live="polite" aria-label="Chat messages">
    <p>Alice: Hello!</p>
    <p>Bob: Hi there!</p>
</div>`)}
${codeBlock('javascript', `// Best practice: inject content INTO the live region (don't show/hide the region itself)
const statusEl = document.getElementById('status-msg');

function announceStatus(message) {
    // Clear then set — ensures re-reads same message
    statusEl.textContent = '';
    requestAnimationFrame(() => {
        statusEl.textContent = message;
    });
}

announceStatus('Your changes have been saved.');`)}
<table class="styled-table">
<thead><tr><th>Attribute</th><th>Values</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><code>aria-live</code></td><td>off / polite / assertive</td><td>When to announce changes. <code>polite</code> waits; <code>assertive</code> interrupts immediately.</td></tr>
<tr><td><code>aria-atomic</code></td><td>true / false</td><td><code>true</code> = announce entire region when any part changes. <code>false</code> = announce only changed nodes.</td></tr>
<tr><td><code>aria-relevant</code></td><td>additions / removals / text / all</td><td>Which types of DOM changes to announce.</td></tr>
<tr><td><code>aria-busy</code></td><td>true / false</td><td>Suppress announcements while content is still loading (set to false when done).</td></tr>
<tr><td><code>role="status"</code></td><td>—</td><td>Implied <code>aria-live="polite"</code> + <code>aria-atomic="true"</code>. For status messages.</td></tr>
<tr><td><code>role="alert"</code></td><td>—</td><td>Implied <code>aria-live="assertive"</code> + <code>aria-atomic="true"</code>. For urgent errors.</td></tr>
<tr><td><code>role="log"</code></td><td>—</td><td>Implied <code>aria-live="polite"</code>. For chat / log that grows over time.</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'Multimedia & Images Accessibility',
                    body: `
${codeBlock('html', `<!-- Video with captions, audio description, and transcript -->
<video controls aria-label="Product demo video">
    <source src="demo.mp4" type="video/mp4">
    <!-- Captions (REQUIRED for deaf users) -->
    <track kind="captions" label="English captions" src="captions-en.vtt"
           srclang="en" default>
    <!-- Audio description (for blind users) -->
    <track kind="descriptions" label="Audio descriptions" src="descriptions.vtt"
           srclang="en">
    <!-- Subtitles in other languages -->
    <track kind="subtitles" label="Spanish" src="subtitles-es.vtt" srclang="es">
    <!-- Fallback -->
    <p>Your browser doesn't support video. <a href="demo.mp4">Download the video</a>.</p>
</video>

<!-- Link to separate transcript (best practice) -->
<p><a href="demo-transcript.html">Read the full video transcript</a></p>

<!-- Audio element -->
<audio controls aria-label="Podcast episode 12">
    <source src="ep12.mp3" type="audio/mpeg">
    <source src="ep12.ogg" type="audio/ogg">
</audio>

<!-- Accessible SVG (informational) -->
<svg role="img" aria-labelledby="chart-title chart-desc">
    <title id="chart-title">Q4 Revenue Chart</title>
    <desc id="chart-desc">Bar chart showing 40% revenue growth in Q4 2024.</desc>
    <!-- SVG content here -->
</svg>

<!-- Decorative SVG (should be hidden from screen readers) -->
<svg aria-hidden="true" focusable="false">
    <!-- decorative icon -->
</svg>`)}
<table class="styled-table">
<thead><tr><th>Media Type</th><th>Accessibility Requirement</th></tr></thead>
<tbody>
<tr><td>Video (prerecorded)</td><td>Captions (AA) + Audio descriptions or transcript (AAA)</td></tr>
<tr><td>Audio only</td><td>Transcript (AA)</td></tr>
<tr><td>Live video/audio</td><td>Real-time captions (AA)</td></tr>
<tr><td>Images</td><td><code>alt</code> text (descriptive or empty <code>alt=""</code> if decorative)</td></tr>
<tr><td>Complex images (charts)</td><td>Long description via <code>aria-describedby</code> or linked page</td></tr>
<tr><td>Animated GIFs</td><td>Must not flash more than 3 times/sec. Provide pause control.</td></tr>
</tbody>
</table>`
                }
            ]
        },
        // -------------------------------------------------------
        //  5. TABLES & DATA
        // -------------------------------------------------------
        {
            id: 'tables',
            title: '5. Tables & Structured Data',
            desc: 'Semantic table markup, meta tags, Open Graph, and structured data.',
            cards: [
                {
                    title: 'Complete Semantic Table',
                    body: `
${codeBlock('html', `<table>
    <caption>Q1 2024 Sales Report</caption>
    <colgroup>
        <col>
        <col span="3" style="background: #f8f8f0;">
    </colgroup>
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">January</th>
            <th scope="col">February</th>
            <th scope="col">March</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Widgets</th>
            <td>1,200</td>
            <td>1,450</td>
            <td>1,789</td>
        </tr>
        <tr>
            <th scope="row">Gadgets</th>
            <td>850</td>
            <td>920</td>
            <td>1,100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>2,050</td>
            <td>2,370</td>
            <td>2,889</td>
        </tr>
    </tfoot>
</table>`)}
<ul>
    <li><code>&lt;caption&gt;</code> — Acts as the table's title. Critical for accessibility.</li>
    <li><code>scope="col"</code> / <code>scope="row"</code> — Tells screen readers which cells a header applies to.</li>
    <li><code>&lt;colgroup&gt;</code> — Allows styling entire columns.</li>
    <li><code>colspan</code> / <code>rowspan</code> — Merge cells across columns/rows.</li>
</ul>`
                },
                {
                    title: 'Meta Tags & SEO',
                    body: `
${codeBlock('html', `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title — Brand Name</title>
    <meta name="description" content="A concise 155-char description for search results.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://example.com/page">

    <!-- Open Graph (Facebook, LinkedIn, Discord) -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Share description.">
    <meta property="og:image" content="https://example.com/og-image.jpg">
    <meta property="og:url" content="https://example.com/page">
    <meta property="og:type" content="website">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Tweet description.">
    <meta name="twitter:image" content="https://example.com/twitter-image.jpg">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Preconnect to critical third-party origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://cdn.example.com">
</head>`)}
`
                },
                {
                    title: 'Responsive Table Patterns',
                    body: `
<p>Tables on small screens need special treatment — a wide table in a 320px viewport is unusable. Here are proven patterns:</p>
${codeBlock('html', `<!-- Pattern 1: Horizontal scroll wrapper (simplest) -->
<div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
    <table>...</table>
</div>

<!-- Pattern 2: Stacked rows on mobile using data attributes -->
<table class="responsive-table">
    <thead>
        <tr><th>Name</th><th>Role</th><th>Salary</th></tr>
    </thead>
    <tbody>
        <tr>
            <td data-label="Name">Alice Chen</td>
            <td data-label="Role">VP Engineering</td>
            <td data-label="Salary">$155,000</td>
        </tr>
    </tbody>
</table>`)}
${codeBlock('css', `/* Pattern 2 CSS: Stack cells on mobile */
@media (max-width: 640px) {
    .responsive-table thead { display: none; } /* Hide headers */
    .responsive-table tr {
        display: block; border: 1px solid #333;
        margin-bottom: 12px; border-radius: 8px; padding: 8px;
    }
    .responsive-table td {
        display: flex; justify-content: space-between;
        padding: 6px 12px; border-bottom: 1px solid #1a1a1a;
    }
    .responsive-table td::before {
        content: attr(data-label); /* Show label */
        font-weight: 700; color: #a3a3a3; margin-right: 16px;
    }
}`)}
<div class="tip-box">💡 <strong>Accessibility note for responsive tables:</strong> When you hide the <code>&lt;thead&gt;</code>, use <code>role="columnheader"</code> and <code>aria-label</code> on each <code>&lt;td&gt;</code> to maintain screen reader context, or the <code>data-label</code> + CSS <code>content: attr()</code> technique above which is the most common approach.</div>`
                },
                {
                    title: 'JSON-LD Structured Data (Schema.org)',
                    body: `
<p>JSON-LD tells search engines what your content <em>means</em> — it powers rich results (star ratings, FAQs, recipes, breadcrumbs in search results). Always place it in the <code>&lt;head&gt;</code> or at the end of <code>&lt;body&gt;</code>.</p>
${codeBlock('html', `<!-- Article Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Tips for Faster CSS",
  "author": { "@type": "Person", "name": "Jane Doe" },
  "datePublished": "2024-03-15",
  "dateModified": "2024-06-01",
  "image": "https://example.com/css-tips.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "DevBlog",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  }
}
<\/script>

<!-- FAQ Schema (shows accordion in SERPs) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a CSS reset?",
      "acceptedAnswer": { "@type": "Answer", "text": "A CSS reset removes default browser styles..." }
    }
  ]
}
<\/script>

<!-- Product Schema (shows price + rating in search) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ergonomic Chair",
  "description": "Adjustable lumbar support...",
  "offers": {
    "@type": "Offer",
    "price": "499.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "342" }
}
<\/script>

<!-- Breadcrumb Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Article Title" }
  ]
}
<\/script>`)}
<div class="tip-box">💡 Validate your structured data: <strong>Rich Results Test</strong> (search.google.com/test/rich-results) and <strong>Schema Markup Validator</strong> (validator.schema.org).</div>`
                },
                {
                    title: 'Web App Manifest & PWA Meta Tags',
                    body: `
${codeBlock('html', `<!-- Link to Web App Manifest (enables "Add to Home Screen" + install prompt) -->
<link rel="manifest" href="/manifest.webmanifest">

<!-- iOS specific (Safari doesn't fully support manifest yet) -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="My App">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">

<!-- Theme color for browser chrome -->
<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">`)}
${codeBlock('json', `// manifest.webmanifest
{
  "name": "My Awesome App",
  "short_name": "AwesomeApp",
  "description": "The best app in the world",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#000000",
  "theme_color": "#0a0a0a",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "screenshots": [
    { "src": "/screenshots/home.png", "sizes": "1280x720", "type": "image/png", "form_factor": "wide" }
  ],
  "shortcuts": [
    { "name": "New Post", "url": "/new", "icons": [{ "src": "/icons/new.png", "sizes": "96x96" }] }
  ]
}`)}
<table class="styled-table">
<thead><tr><th>Manifest Field</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><code>display</code></td><td><code>standalone</code> (no browser UI), <code>minimal-ui</code>, <code>fullscreen</code>, <code>browser</code></td></tr>
<tr><td><code>purpose: maskable</code></td><td>Icon is designed to be clipped to a circle/squircle on Android</td></tr>
<tr><td><code>scope</code></td><td>URL path within which the app operates. Navigation outside opens in browser.</td></tr>
<tr><td><code>prefer_related_applications</code></td><td><code>true</code> = suggest native app over PWA</td></tr>
<tr><td><code>protocol_handlers</code></td><td>Register app to handle custom URL protocols (e.g., <code>web+app://</code>)</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'Internationalization & Language Attributes',
                    body: `
${codeBlock('html', `<!-- Root language declaration -->
<html lang="en">
<!-- Alternate language links (critical for multilingual SEO) -->
<link rel="alternate" hreflang="es" href="https://example.com/es/">
<link rel="alternate" hreflang="fr" href="https://example.com/fr/">
<link rel="alternate" hreflang="x-default" href="https://example.com/">

<!-- Inline language override -->
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
<p>In Arabic: <span lang="ar" dir="rtl">مرحباً</span></p>

<!-- Bidirectional text -->
<p dir="auto">This paragraph's direction is determined automatically.</p>

<!-- Language subtag examples -->
<!-- lang="en"    → English (any region) -->
<!-- lang="en-US" → American English -->
<!-- lang="en-GB" → British English -->
<!-- lang="zh-Hans" → Simplified Chinese -->
<!-- lang="zh-Hant" → Traditional Chinese -->
<!-- lang="pt-BR"   → Brazilian Portuguese -->`)}
<table class="styled-table">
<thead><tr><th>Attribute</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><code>lang</code></td><td>Declares the human language of the element's content. Affects screen reader pronunciation, spell-checking, hyphenation, and text-to-speech.</td></tr>
<tr><td><code>dir</code></td><td><code>ltr</code> (left-to-right, default), <code>rtl</code> (right-to-left for Arabic/Hebrew), <code>auto</code> (sniff from content)</td></tr>
<tr><td><code>translate</code></td><td><code>yes</code> or <code>no</code> — hints to browser translation tools whether to translate this content</td></tr>
<tr><td><code>hreflang</code></td><td>On <code>&lt;link&gt;</code> tags in <code>&lt;head&gt;</code>, signals to Google which language version to show per region</td></tr>
</tbody>
</table>`
                }
            ]
        },
        // -------------------------------------------------------
        //  6. EDGE CASES & GOTCHAS
        // -------------------------------------------------------
        {
            id: 'edge-cases',
            title: '6. Edge Cases & Gotchas',
            desc: 'Things that trip up even experienced developers.',
            cards: [
                {
                    title: 'Common HTML Gotchas',
                    body: `
<ul>
    <li><strong>Void elements can't have children:</strong> <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code> are self-closing. Writing <code>&lt;br&gt;&lt;/br&gt;</code> creates TWO line breaks in some browsers.</li>
    <li><strong>&lt;a&gt; cannot nest &lt;a&gt;:</strong> Anchor tags inside anchor tags produce undefined behavior. Interactive elements (buttons, links) should never be nested inside each other.</li>
    <li><strong>Block inside inline:</strong> Pre-HTML5, putting a <code>&lt;div&gt;</code> inside a <code>&lt;span&gt;</code> was invalid. In HTML5, it's technically valid but still a bad practice—browsers may rearrange your DOM.</li>
    <li><strong>Character encoding issues:</strong> If your page shows Ã© instead of é, the file was saved in one encoding but the meta tag declares another. Always save as UTF-8 and declare <code>&lt;meta charset="UTF-8"&gt;</code>.</li>
    <li><strong>Boolean attributes:</strong> Attributes like <code>disabled</code>, <code>checked</code>, <code>required</code>, <code>readonly</code> don't need a value. Their mere presence is "true." Writing <code>disabled="false"</code> still disables the element!</li>
</ul>
${codeBlock('html', `<!-- WRONG: disabled="false" still disables it! -->
<input type="text" disabled="false">

<!-- CORRECT: remove the attribute entirely to enable -->
<input type="text">

<!-- All of these are equivalent: -->
<input required>
<input required="">
<input required="required">
<input required="yes">    <!-- AVOID: confusing but still "true" -->`)}
<div class="warn-box">⚠️ <strong>White-space sensitivity:</strong> Inline elements respect whitespace. Two <code>&lt;span&gt;</code>s on separate lines will have a visible gap between them. Fix with <code>font-size: 0</code> on the parent or by removing the whitespace in HTML.</div>`
                },
                {
                    title: 'Loading Performance Attributes',
                    body: `
<table class="styled-table">
<thead><tr><th>Attribute</th><th>Element</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>loading="lazy"</code></td><td>img, iframe</td><td>Defers loading until near viewport. Massive perf win for long pages.</td></tr>
<tr><td><code>loading="eager"</code></td><td>img, iframe</td><td>Default behavior — load immediately.</td></tr>
<tr><td><code>fetchpriority="high"</code></td><td>img, script, link</td><td>Hints the browser to prioritize this resource (e.g., LCP image).</td></tr>
<tr><td><code>decoding="async"</code></td><td>img</td><td>Allows the browser to decode the image off the main thread.</td></tr>
<tr><td><code>defer</code></td><td>script</td><td>Downloads in parallel, executes AFTER HTML parsing (in order).</td></tr>
<tr><td><code>async</code></td><td>script</td><td>Downloads in parallel, executes immediately when ready (out of order).</td></tr>
<tr><td><code>rel="preload"</code></td><td>link</td><td>Tells browser to fetch this resource ASAP (fonts, critical CSS).</td></tr>
<tr><td><code>rel="prefetch"</code></td><td>link</td><td>Low-priority fetch for resources likely needed on next navigation.</td></tr>
</tbody>
</table>
${codeBlock('html', `<!-- Preload critical resources -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">

<!-- Script loading strategies -->
<script src="analytics.js" async><\/script>    <!-- Non-critical, order doesn't matter -->
<script src="app.js" defer><\/script>          <!-- Critical, must run after DOM ready -->
<script type="module" src="modern.js"><\/script> <!-- Deferred by default, ES modules -->`)}
`
                },
                {
                    title: 'Custom Data Attributes (dataset)',
                    body: `
<p><code>data-*</code> attributes let you attach arbitrary data to HTML elements — accessible via <code>el.dataset</code> in JavaScript. No custom elements needed, no hidden inputs.</p>
${codeBlock('html', `<!-- Data attributes on HTML elements -->
<button data-action="delete" data-item-id="42" data-confirm="true">
    Delete Item
</button>

<li data-user-id="8" data-role="admin" data-joined="2024-01-15">
    Alice
</li>

<!-- CSS can read data attributes (though no logic) -->
<div data-theme="dark" data-size="large">...</div>`)}
${codeBlock('javascript', `// Accessing data attributes
const btn = document.querySelector('[data-action="delete"]');
console.log(btn.dataset.action);    // "delete"
console.log(btn.dataset.itemId);    // "42"  (camelCase auto-converted)
console.log(btn.dataset.confirm);   // "true" (always a string!)

// Setting data attributes
btn.dataset.status = 'pending';     // Adds data-status="pending"
delete btn.dataset.confirm;         // Removes data-confirm

// Query by data attribute
const admins = document.querySelectorAll('[data-role="admin"]');

// Event delegation with data attributes
document.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'delete') {
        const id = e.target.dataset.itemId;
        confirm(\`Delete item \${id}?\`);
    }
});`)}
${codeBlock('css', `/* CSS attribute selectors for data attributes */
[data-status="pending"] { opacity: 0.6; }
[data-theme="dark"]     { background: #000; color: #fff; }
[data-size="large"]     { font-size: 1.5rem; }
li[data-role="admin"]::after { content: " (admin)"; color: gold; }`)}
<div class="tip-box">💡 <strong>Naming rules:</strong> <code>data-</code> followed by at least one character. No capital letters in kebab-case name (data-user-id → dataset.userId). Names cannot start with "xml". Avoid storing sensitive data (visible in dev tools).</div>`
                },
                {
                    title: 'HTML Entities & Special Characters',
                    body: `
<p>HTML entities are needed when you want to display characters that have special meaning in HTML or are not on your keyboard.</p>
<table class="styled-table">
<thead><tr><th>Character</th><th>Named Entity</th><th>Numeric</th><th>Use When</th></tr></thead>
<tbody>
<tr><td>&lt;</td><td><code>&amp;lt;</code></td><td><code>&amp;#60;</code></td><td>Displaying <code>&lt;</code> in text/code</td></tr>
<tr><td>&gt;</td><td><code>&amp;gt;</code></td><td><code>&amp;#62;</code></td><td>Displaying <code>&gt;</code> in text</td></tr>
<tr><td>&amp;</td><td><code>&amp;amp;</code></td><td><code>&amp;#38;</code></td><td>Displaying <code>&amp;</code> in text/URLs</td></tr>
<tr><td>"</td><td><code>&amp;quot;</code></td><td><code>&amp;#34;</code></td><td>Inside attribute values</td></tr>
<tr><td>'</td><td><code>&amp;apos;</code></td><td><code>&amp;#39;</code></td><td>Inside attribute values (HTML5 only)</td></tr>
<tr><td>&nbsp;</td><td><code>&amp;nbsp;</code></td><td><code>&amp;#160;</code></td><td>Non-breaking space (prevents wrapping)</td></tr>
<tr><td>©</td><td><code>&amp;copy;</code></td><td><code>&amp;#169;</code></td><td>Copyright symbol</td></tr>
<tr><td>®</td><td><code>&amp;reg;</code></td><td><code>&amp;#174;</code></td><td>Registered trademark</td></tr>
<tr><td>™</td><td><code>&amp;trade;</code></td><td><code>&amp;#8482;</code></td><td>Trademark symbol</td></tr>
<tr><td>—</td><td><code>&amp;mdash;</code></td><td><code>&amp;#8212;</code></td><td>Em dash (punctuation, not a hyphen)</td></tr>
<tr><td>–</td><td><code>&amp;ndash;</code></td><td><code>&amp;#8211;</code></td><td>En dash (ranges: 2020–2024)</td></tr>
<tr><td>…</td><td><code>&amp;hellip;</code></td><td><code>&amp;#8230;</code></td><td>Ellipsis (…)</td></tr>
<tr><td>←→↑↓</td><td><code>&amp;larr; &amp;rarr; &amp;uarr; &amp;darr;</code></td><td>—</td><td>Arrow symbols</td></tr>
<tr><td>✓</td><td><code>&amp;check;</code></td><td><code>&amp;#10003;</code></td><td>Check mark</td></tr>
<tr><td>✗</td><td>—</td><td><code>&amp;#10007;</code></td><td>Ballot X</td></tr>
<tr><td>°</td><td><code>&amp;deg;</code></td><td><code>&amp;#176;</code></td><td>Degrees (temperature, angles)</td></tr>
<tr><td>½ ¼ ¾</td><td><code>&amp;frac12; &amp;frac14; &amp;frac34;</code></td><td>—</td><td>Fractions</td></tr>
</tbody>
</table>
<div class="tip-box">💡 In HTML5 with UTF-8 encoding, you can type most characters directly (©, —, ↓) without entities. Entities are mainly needed for <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, and <code>&quot;</code> in attribute values.</div>`
                },
                {
                    title: 'Web Components & Shadow DOM',
                    body: `
<p>Web Components are a suite of native browser APIs for creating reusable, encapsulated custom elements — no framework required.</p>
${codeBlock('javascript', `// Define a Custom Element
class ToastNotification extends HTMLElement {
    // Observed attributes (changes trigger attributeChangedCallback)
    static get observedAttributes() { return ['message', 'type']; }

    constructor() {
        super(); // Always call super first
        // Attach shadow root (encapsulated DOM + CSS)
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Called when element is added to the page
        this.render();
        setTimeout(() => this.remove(), 3000);
    }

    disconnectedCallback() {
        // Called when element is removed from the page
        clearTimeout(this.timer);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Called when observed attributes change
        this.render();
    }

    render() {
        const type = this.getAttribute('type') || 'info';
        const msg = this.getAttribute('message') || '';
        this.shadow.innerHTML = \`
            <style>
                :host { display: block; }  /* :host = the custom element itself */
                .toast {
                    padding: 12px 20px; border-radius: 8px;
                    background: \${type === 'error' ? '#ef4444' : '#22c55e'};
                    color: white; font-family: system-ui;
                }
            </style>
            <div class="toast">\${msg}</div>
        \`;
    }
}

// Register the element — tag names MUST contain a hyphen
customElements.define('toast-notification', ToastNotification);`)}
${codeBlock('html', `<!-- Use your custom element like any HTML element -->
<toast-notification message="Saved successfully!" type="success">
</toast-notification>

<!-- HTML Templates + Slots -->
<template id="card-component">
    <style>
        :host { display: block; border: 1px solid #333; border-radius: 8px; }
        ::slotted(h2) { margin: 0; color: gold; }  /* Style slotted content */
    </style>
    <div class="card-header">
        <slot name="title">Default Title</slot>
    </div>
    <div class="card-body">
        <slot></slot>  <!-- Default slot catches all unslotted content -->
    </div>
</template>

<!-- Using slots -->
<my-card>
    <h2 slot="title">My Card</h2>  <!-- Goes into named slot -->
    <p>Body content here.</p>      <!-- Goes into default slot -->
</my-card>`)}
<div class="tip-box">💡 <code>mode: 'open'</code> allows JS outside the component to access <code>el.shadowRoot</code>. <code>mode: 'closed'</code> returns <code>null</code> for <code>el.shadowRoot</code> — useful for battery widgets or security-sensitive components.</div>`
                },
                {
                    title: 'Security: XSS, CSP & Safe HTML Practices',
                    body: `
<p>Cross-Site Scripting (XSS) lets attackers inject malicious scripts into your page. HTML is the primary attack vector.</p>
${codeBlock('javascript', `// ❌ DANGEROUS: Never insert user input as raw HTML
element.innerHTML = userInput;             // XSS if userInput = <script>alert(1)<\/script>
document.write(userInput);                 // Obsolete AND dangerous
el.insertAdjacentHTML('beforeend', str);   // Dangerous without sanitization

// ✅ SAFE: Escape or use textContent
element.textContent = userInput;           // Always safe — text only, no HTML parsed
element.setAttribute('title', userInput);  // Safe for attributes

// ✅ SAFE: Sanitize HTML if you must render it
// Use DOMPurify: npm install dompurify
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// ✅ SAFE: Trusted Types API (modern browsers)
const policy = trustedTypes.createPolicy('default', {
    createHTML: (s) => DOMPurify.sanitize(s),
});
element.innerHTML = policy.createHTML(userInput);`)}
${codeBlock('html', `<!-- Content Security Policy (CSP) via meta tag (prefer HTTP header) -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://trusted-cdn.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               img-src 'self' data: https:;
               font-src 'self' https://fonts.gstatic.com;
               connect-src 'self' https://api.example.com;
               frame-ancestors 'none';">

<!-- X-Frame-Options (prevent clickjacking) — prefer HTTP header -->
<meta http-equiv="X-Frame-Options" content="DENY">

<!-- Referrer Policy -->
<meta name="referrer" content="strict-origin-when-cross-origin">`)}
<table class="styled-table">
<thead><tr><th>CSP Directive</th><th>Controls</th><th>Recommended Value</th></tr></thead>
<tbody>
<tr><td><code>default-src</code></td><td>Fallback for all resource types</td><td><code>'self'</code></td></tr>
<tr><td><code>script-src</code></td><td>JavaScript sources</td><td><code>'self'</code> + specific CDN hashes/nonces</td></tr>
<tr><td><code>style-src</code></td><td>CSS sources</td><td><code>'self'</code> + trusted CDNs</td></tr>
<tr><td><code>img-src</code></td><td>Image sources</td><td><code>'self' data: https:</code></td></tr>
<tr><td><code>frame-ancestors</code></td><td>Who can embed your page in an iframe</td><td><code>'none'</code> (replaces X-Frame-Options)</td></tr>
<tr><td><code>upgrade-insecure-requests</code></td><td>Force HTTP → HTTPS for all subresources</td><td>Include it</td></tr>
</tbody>
</table>
<div class="danger-box">🚨 <strong>Never use <code>'unsafe-inline'</code> or <code>'unsafe-eval'</code></strong> in <code>script-src</code> — they nullify most XSS protections. If you need inline scripts, use <strong>nonces</strong> or <strong>hashes</strong> instead.</div>`
                }
            ]
        }
    ]
};
