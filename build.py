"""
build.py — Creates a single self-contained index_claude.html
Reads all data_*.js files, escapes them, and embeds everything inline.
"""

# Read all data files
data_files = ['data_html.js', 'data_css.js', 'data_js.js', 'data_sql.js', 'data_git.js']
all_data_js = ''
for df in data_files:
    with open(df, 'r', encoding='utf-8') as f:
        content = f.read()
    # Escape </script> inside string literals so it doesn't break inline scripts
    content = content.replace('</script>', '<\\/script>')
    all_data_js += '\n' + content + '\n'

# Now build the complete HTML file
# We'll read parts from the current (broken) index_claude.html but honestly
# it's cleaner to just reconstruct the head, body structure

with open('index_claude.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find key line numbers
head_end = None
helper_script_start = None  
helper_script_end = None
data_start = None
data_end = None
engine_start = None

for i, line in enumerate(lines):
    stripped = line.strip()
    if 'function codeBlock(lang, code)' in line and helper_script_start is None:
        # Find the <script> tag before this
        for j in range(i, max(0, i-20), -1):
            if '<script>' in lines[j]:
                helper_script_start = j
                break
    if "function copyCode(btn)" in line:
        pass  # part of same helper block
    if '</script>' in line and helper_script_start is not None and helper_script_end is None and i > helper_script_start + 5:
        helper_script_end = i
    if "LANGUAGES['" in stripped and data_start is None:
        # Find the <script> tag before this
        for j in range(i, max(0, i-5), -1):
            if '<script>' in lines[j]:
                data_start = j
                break
    if '//  STATE' in line:
        engine_start = i
    if '<!-- RENDER ENGINE' in line:
        # Find the <script> tag after this
        for j in range(i, min(len(lines), i+5)):
            if '<script>' in lines[j]:
                engine_start = j + 1
                break

print(f"Helper script starts at line ~{helper_script_start}")
print(f"Helper script ends at line ~{helper_script_end}")
print(f"Data starts at line ~{data_start}")
print(f"Engine starts at line ~{engine_start}")

# Actually, let me just do a simple text replacement approach
# Read the whole file as one string
with open('index_claude.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the helper script block (codeBlock + copyCode)
import re

# Find everything from the first </script> after copyCode to the STATE section
# and replace it with our clean inline data

# The structure should be:
# 1. <script> ... CATEGORIES, LANGUAGES = {}, codeBlock(), copyCode() ... </script>
# 2. <script> [ALL DATA] </script>
# 3. <script> [ENGINE: state, render, events, init] </script>

# Find the section with LANGUAGES = {} and codeBlock already in one script
# Then replace the data section

# Let's find: pattern between "copyCode" closing brace+</script> and "STATE" section
helper_end_pattern = r"(copyCode\(btn\)\s*\{[^}]*\}\s*\n\s*\}\s*\n\s*</script>)"
state_pattern = r"(// ={3,}\n\s*//  STATE)"

helper_match = re.search(helper_end_pattern, html)
state_match = re.search(state_pattern, html)

if helper_match and state_match:
    before = html[:helper_match.end()]
    after = html[state_match.start():]
    
    middle = """

    <!-- ============================================================
         LANGUAGE DATA (all 5 languages inlined)
         To add a new language, copy one of these blocks and modify.
         ============================================================ -->
    <script>
""" + all_data_js + """
    </script>

    <!-- ============================================================
         RENDER ENGINE + INTERACTIONS
         ============================================================ -->
    <script>
        """
    
    html = before + middle + after
    
    with open('index_claude.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"SUCCESS! Final file size: {len(html):,} bytes, {html.count(chr(10)):,} lines")
else:
    print(f"helper_match: {helper_match}")
    print(f"state_match: {state_match}")
    # Print context around where we'd expect these
    if not helper_match:
        idx = html.find('copyCode')
        if idx >= 0:
            print(f"'copyCode' found at char {idx}")
            print(f"Context: ...{html[idx:idx+200]}...")
    if not state_match:
        idx = html.find('STATE')
        if idx >= 0:
            print(f"'STATE' found at char {idx}")
            print(f"Context: ...{html[max(0,idx-50):idx+50]}...")
