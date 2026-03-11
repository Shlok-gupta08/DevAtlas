# 📚 DevAtlas

### Developer's Manual Reimagined

> **The Centralized Library for all Code Syntax and Problems**

DevAtlas is a comprehensive, beautifully designed developer reference that brings together syntax guides, code patterns, problem-solving techniques, and best practices across multiple programming languages and domains — all in one place. No more context-switching between dozens of tabs, docs, and scattered notes.

---

## 🚀 What is DevAtlas?

DevAtlas is your single source of truth for developer knowledge. Whether you're revisiting a tricky SQL join, debugging a Git rebase, figuring out the right HTML semantic element, or brushing up on algorithmic complexity — DevAtlas has you covered.

It's built as a fast, offline-capable, single-page reference with:

- **Zero dependencies at runtime** — pure HTML, CSS, and JavaScript
- **Syntax-highlighted code blocks** with one-click copy
- **Dark-mode-first, premium UI** designed for long reading sessions
- **Collapsible sidebar navigation** with per-language section browsing
- **Sticky top-nav pills** for quick in-page section jumping

---

## 📖 What's Inside

DevAtlas is organized into major domains, each broken down into exhaustive sections:

### 🌐 Languages & Markup
| Topic | Coverage |
|-------|----------|
| **HTML** | Document structure, semantic elements, forms & validation, tables, media, accessibility (ARIA), meta tags, Open Graph, and advanced APIs |
| **CSS** | Selectors, box model, Flexbox, Grid, responsive design, animations, transitions, custom properties, pseudo-elements, and modern layout techniques |
| **JavaScript** | Variables & scope, data types, functions, closures, DOM manipulation, async/await, promises, error handling, ES6+ features, modules, and Web APIs |
| **SQL** | DDL/DML, joins, subqueries, window functions, CTEs, indexing, transactions, stored procedures, and query optimization |
| **Git** | Init, staging, branching, merging, rebasing, stashing, cherry-picking, reflog, tagging, Git workflows, and troubleshooting |

### � Data Structures & Algorithms
| Category | Problems | Topics Covered |
|----------|----------|----------------|
| **Arrays & Matrices** | 15+ | Two pointers, sliding window, prefix sums, matrix traversal, Kadane's algorithm |
| **Searching & Sorting** | 10+ | Binary search variants, merge sort, quicksort, count inversions, binary search on answer |
| **Strings** | 8+ | Palindromes, anagrams, sliding window, string compression, KMP |
| **Recursion & Backtracking** | 13+ | Subsets, permutations, N-Queens, Sudoku, rat in a maze, knights tour |
| **Linked Lists** | 10+ | Reversal, cycle detection, merging, Floyd's algorithm, LRU cache |
| **Stacks & Queues** | 10+ | Monotonic stack, NGE, sliding window maximum, LFU cache |
| **Greedy Algorithms** | 7+ | Activity selection, fractional knapsack, job sequencing, gas station |
| **Binary Trees** | 15+ | All traversals, LCA, diameter, Morris traversal, tree construction |
| **BST** | 10+ | Insertion, deletion, validation, kth smallest, balanced BST |
| **Heaps** | 5+ | Build heap, heap sort, k-nearest points, connect ropes |
| **Hashing & Tries** | 9+ | Hash map internals, trie operations, word break, prefix matching |
| **Graphs** | 16+ | BFS/DFS, topological sort, Dijkstra, Bellman-Ford, Prim's, Kruskal, SCC |
| **Dynamic Programming** | 15+ | 0/1 knapsack, LCS, LIS, matrix chain, coin change, interval DP |
| **Segment Trees** | 3+ | Build, range query, point update, lazy propagation |
| **Math & Bit Manipulation** | 8+ | Bit tricks, sieve, GCD, fast exponentiation |

All DSA problems include a **problem description**, **3 test cases**, **C++ solution** with complexity analysis, and a **detailed walkthrough** with step-by-step trace.

### 🔧 DSA Features
| Feature | Description |
|---------|-------------|
| **Multi-Filter System** | Mark questions with multiple filters (Completed, Review Later, Revisit, In Progress, Skipped) — not exclusive, a question can carry several labels at once |
| **Difficulty-Based Tick Marks** | Completed questions show colored tick marks based on question difficulty (green / yellow / red) rather than filter level |
| **Level Selector** | Filters with levels (Completed, Revisit) show a temporary inline level chooser that auto-dismisses after selection, displayed as bracket label on the button |
| **Personal Notes** | Auto-expanding textarea at the bottom of every question for personal annotations — saved per-question to localStorage |
| **Custom Questions** | Add your own questions to any category with title, difficulty, test cases, multi-language code (C++, C, Python, Java), overview, and detailed walkthrough |
| **Custom Question Grouping** | Custom questions listed as a single sorted list in sidebar with hover-visible edit and trash icons (SVG) |
| **Edit Custom Questions** | Edit any custom question's title, difficulty, test cases, code, complexity, overview, and walkthrough — same dialog as creation, pre-filled with existing data |
| **Filtered View** | Full question view with floating sidebar organized by data structure category, collapsible headings, difficulty-colored dots, level labels in (Easy)/(Medium)/(Hard) format, prev/next navigation, and all approach tabs |
| **Compact Inline Filters** | DSA homepage shows progress filters as a single compact row — no collapse/expand needed |
| **Universal Continue Progress** | Resume from last position across both DSA and Dev sections from the landing page — shows "Continue: DSA (Category)" or "Continue: Dev (LANG)" label. DSA continuation supports filtered view positions |
| **Add Question Dialog** | Wider dialog with inner scroll, persistent half-and-half Cancel (red) / Save (green) buttons, 4 horizontal language buttons (C++ default), overview and walkthrough fields, complexity fields displayed within O() wrapper with superscript conversion (n^2 → n²) |
| **GSAP Animations** | Filter selection, card reveals, level selector appearance/dismissal, and view transitions all use smooth GSAP animations |

### 🧩 Coming Soon
| Topic | Planned Coverage |
|-------|------------------|
| **Python** | Core syntax, data structures, OOP, decorators, generators, file I/O, virtual environments, and popular libraries |
| **Java** | OOP principles, collections framework, generics, multithreading, streams API, JVM internals, and design patterns |
| **C / C++** | Memory management, pointers, structs, STL, templates, RAII, and systems-level concepts |
| **TypeScript** | Type system, interfaces, generics, utility types, type guards, and integration with frameworks |
| **System Design** | Scalability patterns, load balancing, caching, database sharding, message queues, microservices, and API design |
| **CI/CD & DevOps** | GitHub Actions, Docker, Kubernetes, Jenkins, deployment pipelines, environment management, infrastructure as code, and monitoring |
| **Shell / Bash Scripting** | File operations, text processing, cron jobs, environment variables, piping, and automation scripts |
| **Networking & APIs** | HTTP methods, REST principles, GraphQL, WebSockets, CORS, authentication (OAuth, JWT), and API design best practices |
| **Databases** | PostgreSQL, MongoDB, Redis, database design, normalization, indexing strategies, and ORM patterns |
| **Testing** | Unit testing, integration testing, TDD, mocking, test coverage, and framework-specific guides (Jest, PyTest, JUnit) |
| **Security** | OWASP top 10, XSS, CSRF, SQL injection, input validation, encryption, secure headers, and authentication best practices |

---

## 🎨 Design Philosophy

DevAtlas isn't just another cheat sheet — it's designed to be a tool you'd actually *want* to use:

- **True black background** (`#000`) to reduce eye strain during long sessions
- **Vibrant, per-language accent colors** for visual distinction (HTML: orange, CSS: purple, JS: amber, SQL: sky blue, Git: rose)
- **Premium typography** — Bricolage Grotesque for headings, Google Sans / DM Sans for body text, monospaced fonts for code
- **Glassmorphic sidebar** with smooth collapse/expand animations
- **Micro-animations** via GSAP for card reveals and scroll-triggered effects
- **Responsive layout** that stretches to use full screen width

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS (custom properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Syntax Highlighting | [Highlight.js](https://highlightjs.org/) |
| Animations | [GSAP](https://greensock.com/gsap/) + ScrollTrigger |
| Icons | [Lucide Icons](https://lucide.dev/) |
| Build | None — zero build step, just open `index.html` |

---

## 📂 Project Structure

```
DevAtlas/
├── index.html                  # Entry point — just double-click to run
│
├── css/
│   ├── main.css                # Base styles, CSS variables, typography
│   ├── layout.css              # Grid, flexbox, structural layout, landing page
│   ├── sidebar.css             # Sidebar specific styling
│   └── dsa.css                 # DSA section styles
│
├── js/
│   ├── data/
│   │   ├── dev/
│   │   │   ├── data_html.js    # HTML reference
│   │   │   ├── data_css.js     # CSS reference
│   │   │   ├── data_js.js      # JavaScript reference
│   │   │   ├── data_sql.js     # SQL reference
│   │   │   └── data_git.js     # Git reference
│   │   └── dsa/
│   │       ├── dsa_arrays.js           # Arrays & Matrices (15+ problems)
│   │       ├── dsa_bst.js              # Binary Search Trees (10+ problems)
│   │       ├── dsa_dp.js               # Dynamic Programming (15+ problems)
│   │       ├── dsa_graphs.js           # Graphs (16+ problems)
│   │       ├── dsa_greedy.js           # Greedy Algorithms (7+ problems)
│   │       ├── dsa_hashing_tries.js    # Hashing & Tries (9+ problems)
│   │       ├── dsa_heaps.js            # Heaps / Priority Queues (5+ problems)
│   │       ├── dsa_linked_lists.js     # Linked Lists (10+ problems)
│   │       ├── dsa_math_bits.js        # Mathematics & Bit Manipulation (8+ problems)
│   │       ├── dsa_recursion.js        # Recursion & Backtracking (13+ problems)
│   │       ├── dsa_searching_sorting.js # Searching & Sorting (10+ problems)
│   │       ├── dsa_segment_trees.js    # Segment Trees (3+ problems)
│   │       ├── dsa_stacks_queues.js    # Stacks & Queues (10+ problems)
│   │       ├── dsa_strings.js          # Strings (8+ problems)
│   │       └── dsa_trees.js            # Binary Trees (15+ problems)
│   │
│   ├── components/
│   │   ├── sidebar.js          # Sidebar toggle logic (window.SidebarController)
│   │   ├── contentRender.js    # Dev content rendering engine (window.ContentRenderer)
│   │   ├── dsaStore.js         # DSA persistence layer — filters, notes, position (window.DSAStore)
│   │   └── dsaRenderer.js      # DSA rendering engine (window.DSARenderer)
│   │
│   └── app.js                  # Main init — landing page, branding, bootstrap
│
└── README.md                   # You are here
```

> **No build step required.** All modularity is achieved through sequential `<script>` tags and the global `window` object. Works perfectly on `file://` protocol.

---

## 💻 Getting Started

### View Locally

Simply open `index.html` in any modern browser — no build step or server required.

```bash
# Clone the repo
git clone https://github.com/Shlok-gupta08/DevAtlas.git

# Open directly
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

### Adding New Language Content

1. Create a new `js/data/data_<language>.js` file following the existing pattern:
   ```js
   window.DevAtlasData = window.DevAtlasData || {};
   window.DevAtlasData.yourlang = { name: 'YourLang', desc: '...', sections: [...] };
   ```
2. Add a `<script src="js/data/data_yourlang.js"></script>` tag in `index.html` (before the components)
3. Register the language in the `CATEGORIES` array inside `js/components/contentRender.js`
4. Add an entry to the `SUPPORTED_LANGUAGES` array in `js/app.js` (for the landing page marquee)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

- **Add new language references** — Follow the existing data module pattern
- **Expand existing content** — More examples, edge cases, and best practices
- **Fix errors** — Spot a mistake? Open an issue or PR
- **Improve accessibility** — Better ARIA labels, keyboard nav, screen reader support
- **Suggest new domains** — DSA, DevOps, System Design, etc.

---

## 📋 Roadmap

- [x] HTML comprehensive reference
- [x] CSS comprehensive reference
- [x] JavaScript comprehensive reference
- [x] SQL comprehensive reference with query output tables
- [x] Git comprehensive reference
- [x] Data Structures & Algorithms (DSA) — 150+ problems across 15 categories
- [x] Multi-filter progress tracking system
- [x] Personal notes per question
- [x] Custom question support with multi-language code
- [x] Filtered view with full sidebar navigation
- [x] Universal continue progress (DSA + Dev)
- [ ] Python reference
- [ ] Java reference
- [ ] C/C++ reference
- [ ] TypeScript reference
- [ ] System Design patterns
- [ ] CI/CD & DevOps guides
- [ ] Shell scripting reference
- [ ] Networking & API design
- [x] Search / filter functionality
- [ ] Bookmark & favorites system
- [x] Landing homepage with animated marquee
- [ ] PWA support for offline access
- [ ] Dark/light theme toggle

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 👤 Author

Built by [**Shlok-gupta08**](https://github.com/Shlok-gupta08)

---

<p align="center">
  <strong>DevAtlas</strong> — All your dev knowledge, one atlas away. 🗺️
</p>
