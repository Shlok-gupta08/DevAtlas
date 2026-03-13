/* ──────────────────────────────────────────────────────────────
   helpers.js — Shared utility functions used by data files and
   components. Includes codeBlock / sqlOutput HTML generators
   (kept as raw-HTML builders so data files stay identical to the
   original DevAtlas format).
   ────────────────────────────────────────────────────────────── */

/**
 * Build an HTML string for a syntax-highlighted code block.
 * Called inside data file template literals at import time.
 */
export function codeBlock(lang, code) {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return (
    '<div class="code-wrapper"><div class="code-header"><span>' +
    lang.toUpperCase() +
    '</span><button class="copy-btn" data-copy>Copy</button></div><pre><code class="language-' +
    lang +
    '">' +
    escaped +
    '</code></pre></div>'
  );
}

/**
 * Build an HTML string for a collapsible SQL query result table.
 */
export function sqlOutput(headers, rows, rowCount) {
  let h =
    '<details class="sql-output"><summary>\u{1F4CA} Query Output (' +
    (rowCount || rows.length) +
    ' rows)</summary>';
  h += '<table class="output-table"><thead><tr>';
  headers.forEach((col) => {
    h += '<th>' + col + '</th>';
  });
  h += '</tr></thead><tbody>';
  rows.forEach((row) => {
    h += '<tr>';
    row.forEach((cell) => {
      h += '<td>' + cell + '</td>';
    });
    h += '</tr>';
  });
  h += '</tbody></table></details>';
  return h;
}

/**
 * Escape HTML entities in a string (for safe rendering).
 */
export function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Format complexity strings: n^2 → n<span class="exp">2</span>
 */
export function formatComplexity(str) {
  if (!str) return str;
  str = str.replace(/\s*\^\s*/g, '^');
  str = str.replace(/<sup>/g, '<span class="exp">').replace(/<\/sup>/g, '</span>');
  str = str.replace(/\^\(([^)]+)\)/g, (_, inner) => '<span class="exp">' + inner.trim() + '</span>');
  str = str.replace(/\^([^\s<()+*/]+)/g, (_, exp) => '<span class="exp">' + exp.trim() + '</span>');
  return str;
}

/**
 * Strip HTML superscripts back to caret notation (for editing).
 */
export function unformatComplexity(str) {
  if (!str) return '';
  str = str.replace(/^O\(/, '').replace(/\)$/, '');
  str = str.replace(/<span class="exp">([^<]+)<\/span>/g, '^($1)');
  str = str.replace(/<sup>([^<]+)<\/sup>/g, '^($1)');
  return str;
}

// Attach to window so data files that use template-literal calls work
if (typeof window !== 'undefined') {
  window.codeBlock = codeBlock;
  window.sqlOutput = sqlOutput;
}
