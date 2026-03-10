// =================================================================
//  DSA — Graphs
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['graphs'] = {
    id: 'graphs',
    name: 'Graphs',
    icon: '🕸️',
    color: '#60a5fa',
    questions: [
        // ===== EASY =====
        {
            id: 'graph-repr',
            title: 'Graph Representations',
            difficulty: 'easy',
            description: `Understand the two primary ways to represent a graph in code: <strong>Adjacency List</strong> and <strong>Adjacency Matrix</strong>.<br><br>Adjacency List stores a list of neighbors for each vertex (space-efficient for sparse graphs). Adjacency Matrix uses a V×V boolean/integer matrix (fast edge lookup for dense graphs).`,
            testCases: [
                { input: 'V=4, Edges: (0,1),(1,2),(2,3)', output: 'Adj List: 0→[1], 1→[0,2], 2→[1,3], 3→[2]', explanation: 'Each edge adds both directions for undirected graph.' },
                { input: 'V=3, Edges: (0,1),(0,2),(1,2)', output: 'Matrix: row 0=[0,1,1], row 1=[1,0,1], row 2=[1,1,0]', explanation: 'Complete graph K3. Matrix is symmetric for undirected.' },
                { input: 'V=3, No edges', output: 'Adj List: 0→[], 1→[], 2→[]', explanation: 'No edges means empty neighbor lists for all vertices.' }
            ],
            approaches: [
                {
                    name: 'Adjacency List & Matrix',
                    code: `// Adjacency List
class Graph {
    int V;
    vector<vector<int>> adj;
public:
    Graph(int v) : V(v), adj(v) {}
    void addEdge(int u, int v) { adj[u].push_back(v); adj[v].push_back(u); }
};
// Adjacency Matrix
class GraphMatrix {
    int V;
    vector<vector<int>> mat;
public:
    GraphMatrix(int v) : V(v), mat(v, vector<int>(v, 0)) {}
    void addEdge(int u, int v) { mat[u][v] = 1; mat[v][u] = 1; }
};`,
                    timeComplexity: 'List: O(V+E) space | Matrix: O(V²) space',
                    spaceComplexity: 'Same as above',
                    description: `Adjacency List: each vertex stores its neighbor list. Space-efficient for sparse graphs. Edge lookup O(degree). Adjacency Matrix: V×V matrix where mat[i][j]=1 if edge exists. O(1) edge lookup but O(V²) space. List is preferred for most algorithms; matrix for dense graphs or when O(1) edge queries are needed.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Graph representation affects both space usage and operation speed. The choice depends on graph density (E relative to V²).<br><br><strong>Adjacency List:</strong><br><code>vector&lt;vector&lt;int&gt;&gt; adj(V)</code> — An array of V vectors. <code>adj[u]</code> contains all neighbors of vertex u.<br><code>addEdge(u, v)</code> — Push v into adj[u] and u into adj[v] (undirected). O(1) per edge addition.<br>Space: O(V + E) — only stores edges that exist. Edge lookup: O(degree(u)) — must scan neighbor list.<br><br><strong>Adjacency Matrix:</strong><br><code>vector&lt;vector&lt;int&gt;&gt; mat(V, vector&lt;int&gt;(V, 0))</code> — V×V grid initialized to 0.<br><code>addEdge(u, v)</code> — Set mat[u][v] = mat[v][u] = 1. O(1) per addition.<br>Space: O(V²) regardless of edge count. Edge lookup: O(1) — direct index access.<br><br><strong>When to use which:</strong><br>Sparse graph (E ≪ V²) → Adjacency List (saves memory). Dense graph (E ≈ V²) → Matrix (O(1) edge queries). Most algorithms (BFS, DFS, Dijkstra) work with adjacency lists.`
                }
            ]
        },
        {
            id: 'bfs-dfs',
            title: 'BFS & DFS Traversal',
            difficulty: 'easy',
            description: `Two fundamental graph traversal algorithms:<br><br><strong>BFS</strong> (Breadth-First Search): explores all neighbors at the current depth before moving deeper. Uses a queue. Guarantees shortest path in unweighted graphs.<br><br><strong>DFS</strong> (Depth-First Search): explores as deep as possible before backtracking. Uses recursion or a stack.`,
            testCases: [
                { input: 'Graph: 0-1, 0-2, 1-3, 2-3. BFS from 0', output: '0, 1, 2, 3', explanation: 'Level 0: {0}. Level 1: {1,2}. Level 2: {3}.' },
                { input: 'Graph: 0-1, 0-2, 1-3, 2-3. DFS from 0', output: '0, 1, 3, 2', explanation: 'Go deep: 0→1→3, backtrack to 0→2 (3 already visited).' },
                { input: 'Graph: 0-1, 1-2. BFS from 2', output: '2, 1, 0', explanation: 'BFS from node 2 explores in reverse order of distance.' }
            ],
            approaches: [
                {
                    name: 'Queue (BFS) + Recursion (DFS)',
                    code: `void bfs(vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    q.push(start); visited[start] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        // process node
        for (int nbr : adj[node])
            if (!visited[nbr]) { visited[nbr] = true; q.push(nbr); }
    }
}
void dfs(vector<vector<int>>& adj, int node, vector<bool>& visited) {
    visited[node] = true;
    // process node
    for (int nbr : adj[node])
        if (!visited[nbr]) dfs(adj, nbr, visited);
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `BFS uses a queue for level-by-level exploration. Guarantees shortest path in unweighted graphs. Mark visited before enqueueing to avoid duplicates. DFS uses recursion (or stack) for depth-first exploration. Goes as deep as possible before backtracking. Both visit all reachable vertices and edges exactly once → O(V+E).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>BFS explores in "waves" — all neighbors at distance 1, then distance 2, etc. DFS plunges depth-first down one path before backtracking to explore alternatives.<br><br><strong>BFS Steps:</strong><br>Step 1 → Mark start as visited and enqueue it.<br>Step 2 → While queue is non-empty: dequeue a node, process it, enqueue all unvisited neighbors (marking them visited first).<br>Step 3 → Marking before enqueueing prevents duplicate entries in the queue.<br><br><strong>DFS Steps:</strong><br>Step 1 → Mark current node as visited and process it.<br>Step 2 → For each unvisited neighbor, recurse.<br>Step 3 → The call stack naturally handles backtracking.<br><br><strong>Trace (graph: 0-1, 0-2, 1-3, 2-3):</strong><br>BFS from 0: Queue [0] → process 0, enqueue 1,2 → [1,2] → process 1, enqueue 3 → [2,3] → process 2 (3 already visited) → [3] → process 3. Order: 0,1,2,3.<br>DFS from 0: Visit 0 → visit 1 → visit 3 → backtrack → visit 2 (3 visited). Order: 0,1,3,2.<br><br><strong>Complexity — Why O(V + E)?</strong><br>Every vertex is visited once (O(V)). Every edge is examined once from each endpoint in an undirected graph (O(E) total). Space: O(V) for visited array plus queue/stack.`
                }
            ]
        },
        {
            id: 'has-path',
            title: 'Has Path? (using DFS)',
            difficulty: 'easy',
            description: `Given a graph, a source node, and a destination node, determine if a path exists from source to destination.<br><br>Use DFS to explore from the source. If we ever reach the destination, return true. If all paths are exhausted, return false.`,
            testCases: [
                { input: 'Graph: 0-1, 1-2, 3-4. src=0, dst=2', output: 'true', explanation: 'Path exists: 0→1→2.' },
                { input: 'Graph: 0-1, 1-2, 3-4. src=0, dst=4', output: 'false', explanation: 'Nodes 0-2 and 3-4 are in different components. No path.' },
                { input: 'Graph: 0-1, 0-2, 1-2. src=1, dst=2', output: 'true', explanation: 'Direct edge 1→2 exists.' }
            ],
            approaches: [
                {
                    name: 'DFS',
                    code: `bool hasPath(vector<vector<int>>& adj, int src, int dst, vector<bool>& visited) {
    if (src == dst) return true;
    visited[src] = true;
    for (int nbr : adj[src])
        if (!visited[nbr] && hasPath(adj, nbr, dst, visited)) return true;
    return false;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `DFS from source. If we reach destination, return true. Mark nodes as visited to avoid cycles. If all neighbors are explored without finding destination, return false. Works for both directed and undirected graphs.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Start DFS from the source. If we ever land on the destination, immediately return true. The visited array prevents infinite loops in cyclic graphs.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base case: <code>if (src == dst) return true</code> — we've reached the destination.<br>Step 2 → Mark src as visited to prevent revisiting.<br>Step 3 → For each unvisited neighbor, recursively check if a path exists from that neighbor to dst.<br>Step 4 → If any recursive call returns true, propagate true upward.<br>Step 5 → If all neighbors exhausted without finding dst, return false.<br><br><strong>Trace (graph: 0-1, 1-2, 3-4, src=0, dst=2):</strong><br>hasPath(0, 2): visit 0, check neighbors [1].<br>  hasPath(1, 2): visit 1, check neighbors [0, 2].<br>    0 is visited → skip.<br>    hasPath(2, 2): src == dst → return true.<br>  Propagate true → result: true.<br><br><strong>Complexity — Why O(V + E)?</strong><br>In the worst case, we visit all vertices and examine all edges before finding (or not finding) the destination.`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'connected-components',
            title: 'Connected Components',
            difficulty: 'medium',
            description: `Count the number of <strong>connected components</strong> in an undirected graph. A connected component is a maximal set of vertices where every pair has a path between them.`,
            testCases: [
                { input: 'V=5, Edges: (0,1),(1,2),(3,4)', output: '2', explanation: 'Component 1: {0,1,2}. Component 2: {3,4}.' },
                { input: 'V=4, No edges', output: '4', explanation: 'Each isolated vertex is its own component.' },
                { input: 'V=4, Edges: (0,1),(1,2),(2,3)', output: '1', explanation: 'All vertices are connected through a chain.' }
            ],
            approaches: [
                {
                    name: 'DFS/BFS on All Unvisited',
                    code: `int countComponents(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            // DFS/BFS from i to mark all reachable
            dfs(adj, i, visited);
        }
    }
    return count;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `Iterate through all vertices. For each unvisited vertex, start a DFS/BFS to explore its entire connected component, marking all reachable nodes. Each new DFS/BFS call means a new component. Total work is still O(V+E) since each vertex and edge is processed once.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Each DFS/BFS from an unvisited vertex discovers an entire connected component. The number of times we initiate a new traversal equals the number of components.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize visited array to all false and count = 0.<br>Step 2 → For each vertex i from 0 to n-1:<br>  - If i is not visited, increment count and run DFS/BFS from i.<br>  - The DFS/BFS marks all reachable vertices as visited.<br>Step 3 → Return count.<br><br><strong>Trace (V=5, edges: 0-1, 1-2, 3-4):</strong><br>i=0: unvisited → count=1, DFS visits {0,1,2}.<br>i=1: visited → skip.<br>i=2: visited → skip.<br>i=3: unvisited → count=2, DFS visits {3,4}.<br>i=4: visited → skip.<br>Result: 2 components.<br><br><strong>Complexity — Why O(V + E)?</strong><br>Despite the outer loop over all V vertices, each vertex is visited at most once across all DFS calls, and each edge is examined once. The total work sums to O(V + E).`
                }
            ]
        },
        {
            id: 'cycle-undirected',
            title: 'Detect Cycle in Undirected Graph',
            difficulty: 'medium',
            description: `Given an undirected graph, determine if it contains a <strong>cycle</strong>. A cycle exists when there are two distinct paths between any pair of vertices.<br><br>Use DFS with parent tracking: if we reach an already-visited neighbor that is not the parent, a cycle exists.`,
            testCases: [
                { input: 'V=4, Edges: (0,1),(1,2),(2,0)', output: 'true', explanation: 'Cycle: 0→1→2→0.' },
                { input: 'V=3, Edges: (0,1),(1,2)', output: 'false', explanation: 'Simple path, no cycle. This is a tree.' },
                { input: 'V=5, Edges: (0,1),(1,2),(3,4),(4,3)', output: 'true', explanation: 'Vertices 3 and 4 form a cycle (multi-edge or self-loop depending on representation). Edge 3-4 appears in both directions already for undirected.' }
            ],
            approaches: [
                {
                    name: 'DFS with Parent Tracking',
                    code: `bool hasCycleDFS(vector<vector<int>>& adj, int node, int parent, vector<bool>& visited) {
    visited[node] = true;
    for (int nbr : adj[node]) {
        if (!visited[nbr]) {
            if (hasCycleDFS(adj, nbr, node, visited)) return true;
        } else if (nbr != parent) return true;
    }
    return false;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `DFS while tracking the parent node. If we encounter a visited neighbor that isn't the parent, a cycle exists (we reached it via a different path). The parent check prevents false positives from the edge we just came from. Run from all unvisited nodes to handle disconnected graphs.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>In an undirected graph, every edge gives a "back edge" to the parent. We ignore that edge. If we see a visited neighbor that is NOT our parent, we must have reached it via a different path — forming a cycle.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Mark current node as visited.<br>Step 2 → For each neighbor:<br>  - If unvisited: recurse with current node as parent. If recursion finds a cycle, propagate true.<br>  - If visited AND not the parent: cycle detected → return true.<br>Step 3 → If all neighbors checked without finding a cycle, return false.<br><br><strong>Trace (V=4, edges: 0-1, 1-2, 2-0):</strong><br>DFS(0, parent=-1): visit 0, check neighbor 1 (unvisited) → DFS(1, parent=0).<br>DFS(1, parent=0): visit 1, check neighbor 0 (visited, is parent → skip), check neighbor 2 (unvisited) → DFS(2, parent=1).<br>DFS(2, parent=1): visit 2, check neighbor 0 (visited, NOT parent 1) → <strong>cycle detected!</strong><br><br><strong>Complexity — Why O(V + E)?</strong><br>Standard DFS traversal. Each vertex and edge examined once.`
                }
            ]
        },
        {
            id: 'cycle-directed',
            title: 'Detect Cycle in Directed Graph',
            difficulty: 'medium',
            description: `Given a directed graph, determine if it contains a <strong>cycle</strong>. Parent tracking (used for undirected) does not work here because directed edges have a direction.<br><br>Use a "recursion stack" to track nodes in the current DFS path. A cycle exists if we revisit a node still on the recursion stack.`,
            testCases: [
                { input: 'V=4, Edges: 0→1, 1→2, 2→0', output: 'true', explanation: 'Cycle: 0→1→2→0.' },
                { input: 'V=3, Edges: 0→1, 1→2', output: 'false', explanation: 'Simple directed path, no cycle. This is a DAG.' },
                { input: 'V=4, Edges: 0→1, 0→2, 1→3, 2→3', output: 'false', explanation: 'Diamond shape DAG. Node 3 is reachable from two paths but no cycle exists.' }
            ],
            approaches: [
                {
                    name: 'DFS Recursion Stack',
                    code: `bool hasCycleDFS(vector<vector<int>>& adj, int node,
                 vector<bool>& visited, vector<bool>& inStack) {
    visited[node] = true;
    inStack[node] = true;
    for (int nbr : adj[node]) {
        if (!visited[nbr]) {
            if (hasCycleDFS(adj, nbr, visited, inStack)) return true;
        } else if (inStack[nbr]) return true;
    }
    inStack[node] = false;
    return false;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `In directed graphs, parent tracking doesn't work. Instead, track nodes in the current recursion stack. If we encounter a neighbor already in the stack, we've found a back edge → cycle. Remove from stack when backtracking. A visited node not in the stack means it was fully processed in another DFS path — no cycle via that node.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Two arrays: <code>visited</code> (ever seen) and <code>inStack</code> (currently on the DFS path). A cycle exists iff we encounter a neighbor that is still in the current recursion stack — it means we can reach it from itself.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Mark node as visited and add to recursion stack.<br>Step 2 → For each neighbor:<br>  - Unvisited: recurse. If cycle found, propagate true.<br>  - Visited AND in stack: back edge found → cycle → return true.<br>  - Visited but NOT in stack: this node was fully explored before — no cycle via it.<br>Step 3 → After exploring all neighbors, remove from stack: <code>inStack[node] = false</code>.<br><br><strong>Trace (edges: 0→1, 1→2, 2→0):</strong><br>DFS(0): inStack = {0}. Neighbor 1 → DFS(1): inStack = {0,1}. Neighbor 2 → DFS(2): inStack = {0,1,2}. Neighbor 0: visited AND inStack → <strong>cycle!</strong><br><br><strong>Why not just check visited?</strong><br>In the diamond case (0→1, 0→2, 1→3, 2→3): when exploring from 2, node 3 is visited but NOT in our current path (it was explored via 0→1→3). No cycle exists. The recursion stack distinguishes these cases.`
                }
            ]
        },
        {
            id: 'bipartite',
            title: 'Bipartite Graph',
            difficulty: 'medium',
            description: `Determine if a graph is <strong>bipartite</strong> — whether its vertices can be divided into two sets such that every edge connects a vertex from one set to the other (no edges within the same set).<br><br>Equivalent to checking if the graph is 2-colorable.`,
            testCases: [
                { input: 'V=4, Edges: (0,1),(1,2),(2,3)', output: 'true', explanation: 'Set A={0,2}, Set B={1,3}. All edges cross sets.' },
                { input: 'V=3, Edges: (0,1),(1,2),(0,2)', output: 'false', explanation: 'Triangle: cannot 2-color. Node 2 connects to both 0 and 1 which must be different colors, but 2 needs both colors.' },
                { input: 'V=4, Edges: (0,1),(2,3)', output: 'true', explanation: 'Two disconnected edges. Each can be trivially 2-colored.' }
            ],
            approaches: [
                {
                    name: 'BFS 2-Coloring',
                    code: `bool isBipartite(vector<vector<int>>& adj, int n) {
    vector<int> color(n, -1);
    for (int i = 0; i < n; i++) {
        if (color[i] != -1) continue;
        queue<int> q; q.push(i); color[i] = 0;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            for (int nbr : adj[node]) {
                if (color[nbr] == -1) { color[nbr] = 1 - color[node]; q.push(nbr); }
                else if (color[nbr] == color[node]) return false;
            }
        }
    }
    return true;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `Try to 2-color the graph. BFS from each uncolored node. Color it 0, color all neighbors 1, their neighbors 0, etc. If any neighbor has the same color as current node, graph is not bipartite (odd cycle exists). A graph is bipartite iff it contains no odd-length cycles.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Assign colors 0 and 1 alternately. If a conflict arises (neighbor has same color as current node), the graph has an odd cycle and cannot be bipartite.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize all colors to -1 (uncolored).<br>Step 2 → For each uncolored vertex, start BFS. Color it 0.<br>Step 3 → For each node dequeued, check all neighbors:<br>  - Uncolored: assign the opposite color (<code>1 - color[node]</code>), enqueue.<br>  - Same color as current: conflict → return false.<br>  - Different color: already correctly colored, skip.<br>Step 4 → If all components processed without conflict, return true.<br><br><strong>Trace (triangle: 0-1, 1-2, 0-2):</strong><br>Color 0 as 0. Neighbors 1,2 get color 1.<br>Process node 1: neighbor 2 has color 1 == color[1]=1 → <strong>conflict!</strong> Return false.<br><br><strong>Complexity — Why O(V + E)?</strong><br>Standard BFS. Each vertex colored once, each edge checked once.`
                }
            ]
        },
        {
            id: 'number-of-islands',
            title: 'Number of Islands',
            difficulty: 'medium',
            description: `Given an m×n grid of '1's (land) and '0's (water), count the number of <strong>islands</strong>. An island is a group of adjacent '1's connected horizontally or vertically (not diagonally).`,
            testCases: [
                { input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]', output: '2', explanation: 'Top-left 3 cells form one island. Bottom-right cell forms another.' },
                { input: 'grid = [["1","1","1"],["1","1","1"]]', output: '1', explanation: 'All cells are connected — one island.' },
                { input: 'grid = [["0","0"],["0","0"]]', output: '0', explanation: 'No land cells, no islands.' }
            ],
            approaches: [
                {
                    name: 'DFS/BFS Flood Fill',
                    code: `int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size(), count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                // DFS to mark connected land
                function<void(int,int)> dfs = [&](int r, int c) {
                    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
                    grid[r][c] = '0';
                    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
                };
                dfs(i, j);
            }
        }
    }
    return count;
}`,
                    timeComplexity: 'O(m × n)',
                    spaceComplexity: 'O(m × n) worst case stack',
                    description: `Each '1' cell is land. Connected '1's (4-directional) form an island. Scan the grid; when we find '1', increment island count and DFS/BFS to mark all connected '1's as '0' (visited). Each cell is visited once. Number of DFS initiations = number of islands.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>This is the connected components problem on a grid. Each DFS from an unvisited '1' discovers one island. We "sink" the island (mark as '0') during exploration to avoid double-counting.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Scan the grid cell by cell.<br>Step 2 → When a '1' is found: increment count, then DFS to mark all connected '1's as '0'.<br>Step 3 → DFS base case: out of bounds or cell is '0' → return.<br>Step 4 → DFS marks current cell '0' then recurses in all 4 directions.<br><br><strong>Trace (grid = [["1","1","0"],["0","1","0"],["0","0","1"]]):</strong><br>Cell (0,0)='1': count=1, DFS visits and sinks (0,0), (0,1), (1,1).<br>Continue scanning... (0,1), (0,2), (1,0), (1,1), (1,2) all '0' now.<br>Cell (2,2)='1': count=2, DFS sinks (2,2).<br>Result: 2 islands.<br><br><strong>Complexity — Why O(m × n)?</strong><br>Each cell is visited at most once (either skipped as '0' or visited and sunk during DFS). Total work proportional to grid size.`
                }
            ]
        },
        {
            id: 'rotting-oranges',
            title: 'Rotting Oranges',
            difficulty: 'medium',
            description: `In an m×n grid, each cell is empty (0), a fresh orange (1), or a rotten orange (2). Every minute, fresh oranges adjacent (4-directional) to rotten ones become rotten. Return the minimum minutes until no fresh oranges remain, or -1 if impossible.`,
            testCases: [
                { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', explanation: 'Rot spreads from top-left corner. Takes 4 minutes to reach bottom-right.' },
                { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', explanation: 'Bottom-left orange (1,0) is isolated — cannot be reached by rot.' },
                { input: 'grid = [[0,2]]', output: '0', explanation: 'No fresh oranges to begin with. Answer is 0.' }
            ],
            approaches: [
                {
                    name: 'Multi-source BFS',
                    code: `int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    queue<pair<int,int>> q;
    int fresh = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.push({i, j});
            if (grid[i][j] == 1) fresh++;
        }
    int minutes = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    while (!q.empty() && fresh > 0) {
        int sz = q.size(); minutes++;
        while (sz--) {
            auto [r, c] = q.front(); q.pop();
            for (int d = 0; d < 4; d++) {
                int nr = r+dx[d], nc = c+dy[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--; q.push({nr, nc});
                }
            }
        }
    }
    return fresh == 0 ? minutes : -1;
}`,
                    timeComplexity: 'O(m × n)',
                    spaceComplexity: 'O(m × n)',
                    description: `All rotten oranges spread simultaneously — classic multi-source BFS. Add all initially rotten oranges to queue. Each BFS level = 1 minute. Fresh neighbors become rotten and join the queue. Track fresh count; if fresh > 0 after BFS ends, return -1 (unreachable oranges). BFS levels = minimum time.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Multi-source BFS starts from ALL rotten oranges simultaneously. Each BFS "level" represents one minute of time passing. This naturally computes the shortest time to reach each fresh orange from its nearest rotten source.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Scan grid: enqueue all rotten oranges, count fresh oranges.<br>Step 2 → BFS by levels: process all nodes in the current queue (one level = one minute).<br>Step 3 → For each rotten orange, check 4 neighbors. If fresh, make it rotten, decrement fresh count, enqueue.<br>Step 4 → After BFS: if fresh == 0, return minutes. Otherwise return -1.<br><br><strong>Trace (grid = [[2,1,1],[1,1,0],[0,1,1]]):</strong><br>Initial: queue = [(0,0)], fresh = 6.<br>Minute 1: (0,0) rots (0,1) and (1,0). fresh=4.<br>Minute 2: (0,1) rots (0,2), (1,0) rots (1,1). fresh=2.<br>Minute 3: (0,2) nothing new, (1,1) rots (2,1). fresh=1.<br>Minute 4: (2,1) rots (2,2). fresh=0. Return 4.<br><br><strong>Complexity — Why O(m × n)?</strong><br>Each cell is enqueued at most once and processed once. Total work proportional to grid size.`
                }
            ]
        },
        {
            id: 'topological-sort',
            title: 'Topological Sorting',
            difficulty: 'medium',
            description: `Given a <strong>Directed Acyclic Graph</strong> (DAG), find a linear ordering of vertices such that for every directed edge u→v, vertex u comes before v in the ordering.<br><br>Kahn's algorithm uses in-degree counting with BFS. The DFS approach uses post-order reversal.`,
            testCases: [
                { input: 'V=4, Edges: 0→1, 0→2, 1→3, 2→3', output: '[0, 1, 2, 3] or [0, 2, 1, 3]', explanation: '0 must come first (no prerequisites). 1 and 2 can be in either order. 3 comes last.' },
                { input: 'V=3, Edges: 2→0, 2→1', output: '[2, 0, 1] or [2, 1, 0]', explanation: 'Only constraint: 2 before 0 and 1.' },
                { input: 'V=2, Edges: 0→1', output: '[0, 1]', explanation: 'Single edge. 0 must precede 1.' }
            ],
            approaches: [
                {
                    name: "Kahn's Algorithm (BFS)",
                    code: `vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> inDeg(V, 0);
    for (int u = 0; u < V; u++)
        for (int v : adj[u]) inDeg[v]++;
    queue<int> q;
    for (int i = 0; i < V; i++) if (inDeg[i] == 0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int nbr : adj[node])
            if (--inDeg[nbr] == 0) q.push(nbr);
    }
    return order; // Size < V means cycle exists
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)',
                    description: `For DAGs only. Kahn's: compute in-degrees. Enqueue nodes with in-degree 0. Process: add to order, reduce in-degrees of neighbors. New zero in-degree nodes join queue. If result size < V, cycle exists. DFS version: run DFS, add node to stack after all descendants processed, reverse stack = topological order.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A node with in-degree 0 has no prerequisites — it can appear first. After "processing" it, reduce the in-degree of its neighbors. New zero in-degree nodes become available. This peeling-off process gives a valid topological order.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Compute in-degree for every vertex.<br>Step 2 → Enqueue all vertices with in-degree 0 (no incoming edges).<br>Step 3 → While queue is non-empty: dequeue node, add to order.<br>Step 4 → For each neighbor, decrement its in-degree. If it reaches 0, enqueue it.<br>Step 5 → If order.size() &lt; V, a cycle exists (not a DAG).<br><br><strong>Trace (V=4, edges: 0→1, 0→2, 1→3, 2→3):</strong><br>In-degrees: [0,1,1,2]. Queue: [0].<br>Process 0: order=[0]. Update: inDeg[1]=0, inDeg[2]=0. Queue: [1,2].<br>Process 1: order=[0,1]. Update: inDeg[3]=1. Queue: [2].<br>Process 2: order=[0,1,2]. Update: inDeg[3]=0. Queue: [3].<br>Process 3: order=[0,1,2,3]. Done.<br><br><strong>Complexity — Why O(V + E)?</strong><br>Computing in-degrees: O(V + E). BFS processes each vertex and edge once: O(V + E).`
                }
            ]
        },
        {
            id: 'course-schedule',
            title: 'Course Schedule I & II',
            difficulty: 'medium',
            description: `There are <strong>n</strong> courses labeled 0 to n-1 with prerequisites. <strong>Course Schedule I:</strong> determine if all courses can be finished (no circular dependency). <strong>Course Schedule II:</strong> return a valid order to take all courses.<br><br>This is topological sort applied to a prerequisite graph. A cycle means it's impossible.`,
            testCases: [
                { input: 'n=2, prerequisites=[[1,0]]', output: 'true, order=[0,1]', explanation: 'Must take 0 before 1. No cycle. Valid order: [0,1].' },
                { input: 'n=2, prerequisites=[[1,0],[0,1]]', output: 'false', explanation: 'Circular dependency: 0 needs 1 and 1 needs 0. Impossible.' },
                { input: 'n=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]', output: 'true, order=[0,1,2,3]', explanation: 'Take 0 first, then 1 and 2 (either order), then 3.' }
            ],
            approaches: [
                {
                    name: 'Topological Sort',
                    code: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDeg(numCourses, 0);
    for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); inDeg[p[0]]++; }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) if (inDeg[i] == 0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop(); count++;
        for (int nbr : adj[node]) if (--inDeg[nbr] == 0) q.push(nbr);
    }
    return count == numCourses;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V + E)',
                    description: `Course Schedule = cycle detection in directed graph. If topological sort processes all nodes, no cycle (all courses can be finished). Course Schedule II = return the topological order. Build adjacency list from prerequisites, apply Kahn's algorithm. If processed count < total courses, cycle exists (impossible to finish).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Model courses as graph nodes and prerequisites as directed edges. "Can all courses be finished?" is equivalent to "Does the prerequisite graph have a cycle?" which is equivalent to "Can we topologically sort all nodes?"<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Build adjacency list: <code>adj[p[1]].push_back(p[0])</code> means course p[1] is a prerequisite of p[0] (edge from p[1] to p[0]).<br>Step 2 → Compute in-degrees and enqueue nodes with in-degree 0.<br>Step 3 → BFS: process each node, decrement neighbor in-degrees.<br>Step 4 → If count == numCourses, all courses can be completed (no cycle).<br><br><strong>Trace (n=4, prereqs: [1,0],[2,0],[3,1],[3,2]):</strong><br>Edges: 0→1, 0→2, 1→3, 2→3. In-degrees: [0,1,1,2].<br>Queue: [0]. Process 0 → inDeg[1]=0, inDeg[2]=0. Count=1.<br>Queue: [1,2]. Process 1 → inDeg[3]=1. Count=2. Process 2 → inDeg[3]=0. Count=3.<br>Queue: [3]. Process 3. Count=4. 4 == 4 → true.<br><br><strong>Complexity — Why O(V + E)?</strong><br>Building the graph: O(E). Kahn's algorithm: O(V + E). Total: O(V + E).`
                }
            ]
        },

        // ===== HARD =====
        {
            id: 'dijkstra',
            title: "Dijkstra's Algorithm",
            difficulty: 'hard',
            description: `Find the <strong>shortest path</strong> from a single source to all other vertices in a graph with <strong>non-negative edge weights</strong>.<br><br>Dijkstra's algorithm uses a greedy approach: always process the unvisited vertex with the smallest known distance, then relax its edges.`,
            testCases: [
                { input: 'V=4, Edges: 0→1(1), 0→2(4), 1→2(2), 1→3(6), 2→3(3), src=0', output: 'dist = [0, 1, 3, 6]', explanation: 'Shortest to 2: 0→1→2 (cost 3, not direct 4). Shortest to 3: 0→1→2→3 (cost 6).' },
                { input: 'V=3, Edges: 0→1(5), 0→2(10), 1→2(3), src=0', output: 'dist = [0, 5, 8]', explanation: 'To vertex 2: direct cost 10, via 1 cost 5+3=8. Shorter via 1.' },
                { input: 'V=2, Edges: 0→1(7), src=0', output: 'dist = [0, 7]', explanation: 'Only one path from 0 to 1.' }
            ],
            approaches: [
                {
                    name: 'Priority Queue / Greedy',
                    code: `vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int src) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue; // Stale entry
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
                    timeComplexity: 'O((V + E) log V)',
                    spaceComplexity: 'O(V + E)',
                    description: `Single-source shortest path for non-negative weights. Greedy: always process the unvisited node with smallest known distance. Min-heap gives the closest node. Relax edges: if going through u to v is shorter than known dist[v], update. Skip stale heap entries where d > dist[u]. Doesn't work with negative weights (use Bellman-Ford instead).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Greedy strategy: the vertex with the smallest tentative distance is guaranteed to have its final shortest distance (for non-negative weights). Process it, then update its neighbors. A min-heap efficiently gives the next closest vertex.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize all distances to ∞ except source (0). Push (0, src) to min-heap.<br>Step 2 → Extract minimum (d, u). If d &gt; dist[u], skip (stale entry from a previous, longer path).<br>Step 3 → For each neighbor v of u: if <code>dist[u] + weight &lt; dist[v]</code>, update dist[v] and push new entry.<br>Step 4 → Repeat until heap is empty.<br><br><strong>Trace (src=0, edges: 0→1(1), 0→2(4), 1→2(2), 2→3(3)):</strong><br>Heap: [(0,0)]. Pop (0,0): relax 1 to dist=1, 2 to dist=4. Heap: [(1,1),(4,2)].<br>Pop (1,1): relax 2 to dist=1+2=3 (better than 4). Heap: [(3,2),(4,2)].<br>Pop (3,2): relax 3 to dist=3+3=6. Heap: [(4,2),(6,3)].<br>Pop (4,2): 4 &gt; dist[2]=3 → stale, skip. Pop (6,3): no neighbors.<br>Result: [0, 1, 3, 6].<br><br><strong>Complexity — Why O((V+E) log V)?</strong><br>Each vertex is extracted from the heap at most once: O(V log V). Each edge triggers at most one heap insertion: O(E log V). Total: O((V+E) log V).`
                }
            ]
        },
        {
            id: 'bellman-ford',
            title: 'Bellman Ford Algorithm',
            difficulty: 'hard',
            description: `Find shortest paths from a single source, even with <strong>negative edge weights</strong>. Also detects <strong>negative-weight cycles</strong>.<br><br>Relaxes all edges V-1 times. After that, one more pass checks for negative cycles.`,
            testCases: [
                { input: 'V=4, Edges: 0→1(1), 1→2(-1), 2→3(2), 0→3(5), src=0', output: 'dist = [0, 1, 0, 2]', explanation: 'Path 0→1→2→3 costs 1+(-1)+2=2, shorter than direct 0→3(5).' },
                { input: 'V=3, Edges: 0→1(1), 1→2(-3), 2→0(1), src=0', output: 'Negative cycle detected', explanation: 'Cycle 0→1→2→0 has total weight 1+(-3)+1=-1 < 0.' },
                { input: 'V=2, Edges: 0→1(3), src=0', output: 'dist = [0, 3]', explanation: 'Simple case with one edge.' }
            ],
            approaches: [
                {
                    name: 'DP Relaxation',
                    code: `vector<int> bellmanFord(int V, vector<tuple<int,int,int>>& edges, int src) {
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;
    for (int i = 0; i < V - 1; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
    // Check negative cycle
    for (auto [u, v, w] : edges)
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) return {}; // Negative cycle
    return dist;
}`,
                    timeComplexity: 'O(V × E)',
                    spaceComplexity: 'O(V)',
                    description: `Handles negative edge weights. Relax all edges V-1 times. In iteration i, shortest paths using at most i edges are computed. After V-1 iterations, all shortest paths are found (longest simple path has V-1 edges). One more iteration detects negative cycles: if any edge can still be relaxed, a negative cycle exists.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>In a graph with V vertices, the longest simple path has V-1 edges. Each iteration of relaxing all edges extends shortest paths by one more edge. After V-1 iterations, all shortest paths are guaranteed to be found.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize dist[src] = 0, all others = ∞.<br>Step 2 → Repeat V-1 times: for each edge (u, v, w), if <code>dist[u] + w &lt; dist[v]</code>, update dist[v].<br>Step 3 → Negative cycle check: do one more pass. If any edge can still be relaxed, a negative cycle exists (distances would decrease indefinitely).<br><br><strong>Trace (V=4, edges: 0→1(1), 1→2(-1), 2→3(2), src=0):</strong><br>Init: dist = [0, ∞, ∞, ∞].<br>Pass 1: 0→1: dist[1]=1. 1→2: dist[2]=0. 2→3: dist[3]=2.<br>Pass 2: No changes (already optimal).<br>Pass 3: No changes.<br>Negative cycle check: no further relaxation possible → no negative cycle.<br>Result: [0, 1, 0, 2].<br><br><strong>Complexity — Why O(V × E)?</strong><br>V-1 passes, each examining all E edges. Slower than Dijkstra but handles negative weights.`
                }
            ]
        },
        {
            id: 'prims',
            title: "Prim's Algorithm (MST)",
            difficulty: 'hard',
            description: `Find the <strong>Minimum Spanning Tree</strong> (MST) — the subset of edges that connects all vertices with the minimum total weight, without any cycles.<br><br>Prim's algorithm greedily grows the MST by always adding the cheapest edge connecting the MST to a non-MST vertex.`,
            testCases: [
                { input: 'V=4, Edges: 0-1(1), 0-2(4), 1-2(2), 1-3(5), 2-3(3)', output: 'MST cost = 6', explanation: 'Edges in MST: 0-1(1), 1-2(2), 2-3(3). Total = 6.' },
                { input: 'V=3, Edges: 0-1(10), 0-2(6), 1-2(5)', output: 'MST cost = 11', explanation: 'Edges: 1-2(5), 0-2(6). Total = 11.' },
                { input: 'V=2, Edges: 0-1(7)', output: 'MST cost = 7', explanation: 'Only one edge, must be in MST.' }
            ],
            approaches: [
                {
                    name: 'Priority Queue',
                    code: `int primsMST(int V, vector<vector<pair<int,int>>>& adj) {
    vector<bool> inMST(V, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0}); // {weight, node}
    int mstCost = 0;
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true; mstCost += w;
        for (auto [v, wt] : adj[u])
            if (!inMST[v]) pq.push({wt, v});
    }
    return mstCost;
}`,
                    timeComplexity: 'O((V + E) log V)',
                    spaceComplexity: 'O(V + E)',
                    description: `Greedily grow MST by always adding the cheapest edge connecting the MST to a non-MST vertex. Start from any vertex. Use a min-heap: extract minimum weight edge. If the vertex isn't in MST, add it and push all its edges to non-MST vertices. Skip if already in MST. Produces the minimum spanning tree.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Start with an empty MST. Repeatedly add the cheapest edge that connects a vertex in the MST to a vertex outside the MST. A min-heap efficiently finds this cheapest "crossing" edge.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Push (weight=0, node=0) to start from vertex 0.<br>Step 2 → Pop minimum: (w, u). If u is already in MST, skip (stale entry).<br>Step 3 → Add u to MST: <code>inMST[u] = true; mstCost += w</code>.<br>Step 4 → Push all edges from u to non-MST vertices into the heap.<br>Step 5 → Repeat until all vertices are in MST.<br><br><strong>Trace (V=4, edges: 0-1(1), 0-2(4), 1-2(2), 1-3(5), 2-3(3)):</strong><br>Start: pop (0,0). MST={0}. Push (1,1),(4,2).<br>Pop (1,1). MST={0,1}. Cost=1. Push (2,2),(5,3).<br>Pop (2,2). MST={0,1,2}. Cost=3. Push (3,3).<br>Pop (3,3). MST={0,1,2,3}. Cost=6. Done.<br>MST edges: 0-1(1), 1-2(2), 2-3(3). Total=6.<br><br><strong>Complexity — Why O((V+E) log V)?</strong><br>Each vertex is extracted once: O(V log V). Each edge produces one heap insertion: O(E log V). Total: O((V+E) log V).`
                }
            ]
        },
        {
            id: 'kruskal',
            title: "Kruskal's Algorithm (MST)",
            difficulty: 'hard',
            description: `Find the MST using a different greedy approach: sort all edges by weight and add them one by one, skipping any edge that would create a cycle.<br><br>Uses <strong>Disjoint Set Union (DSU / Union-Find)</strong> to efficiently detect cycles.`,
            testCases: [
                { input: 'V=4, Edges: 0-1(1), 1-2(2), 2-3(3), 0-2(4), 1-3(5)', output: 'MST cost = 6', explanation: 'Sorted: 1,2,3,4,5. Take 0-1(1), 1-2(2), 2-3(3). Skip 0-2(4) — would form cycle. Total=6.' },
                { input: 'V=3, Edges: 0-1(3), 0-2(1), 1-2(2)', output: 'MST cost = 3', explanation: 'Sorted: 1,2,3. Take 0-2(1), 1-2(2). Skip 0-1(3) — cycle. Total=3.' },
                { input: 'V=4, All edges weight 1', output: 'MST cost = 3', explanation: 'Any 3 edges forming a spanning tree. Cost = 3.' }
            ],
            approaches: [
                {
                    name: 'DSU (Union-Find)',
                    code: `class DSU {
    vector<int> parent, rank_;
public:
    DSU(int n) : parent(n), rank_(n, 0) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        if (rank_[x] == rank_[y]) rank_[x]++;
        return true;
    }
};
int kruskalMST(int V, vector<tuple<int,int,int>>& edges) {
    sort(edges.begin(), edges.end()); // Sort by weight
    DSU dsu(V);
    int cost = 0, edgesUsed = 0;
    for (auto [w, u, v] : edges) {
        if (dsu.unite(u, v)) { cost += w; edgesUsed++; }
        if (edgesUsed == V - 1) break;
    }
    return cost;
}`,
                    timeComplexity: 'O(E log E)',
                    spaceComplexity: 'O(V)',
                    description: `Sort all edges by weight. Greedily add the cheapest edge that doesn't create a cycle. Use Disjoint Set Union (DSU) to efficiently check if two vertices are already connected. Union by rank + path compression gives nearly O(1) per operation. Stop after V-1 edges (complete MST). DSU prevents cycles while maintaining connected components.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Process edges from cheapest to most expensive. Add an edge if it connects two different components (no cycle). Skip it if both endpoints are already in the same component. DSU makes cycle detection nearly O(1).<br><br><strong>DSU Operations:</strong><br><code>find(x)</code>: follow parent pointers to root. Path compression: <code>parent[x] = find(parent[x])</code> flattens the tree for future lookups.<br><code>unite(x, y)</code>: find roots of x and y. If same root → same component, return false (cycle). Otherwise, merge by rank (attach smaller tree under larger).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort edges by weight: O(E log E).<br>Step 2 → For each edge (w, u, v): try to unite u and v.<br>Step 3 → If <code>unite</code> succeeds (different components), add edge to MST.<br>Step 4 → If <code>unite</code> fails (same component), skip — would create cycle.<br>Step 5 → Stop after V-1 edges (MST of V vertices has exactly V-1 edges).<br><br><strong>Trace (edges sorted: 0-1(1), 1-2(2), 2-3(3), 0-2(4)):</strong><br>0-1(1): unite(0,1) → success, cost=1.<br>1-2(2): unite(1,2) → success, cost=3.<br>2-3(3): unite(2,3) → success, cost=6. edgesUsed=3=V-1 → done.<br>0-2(4): never reached.<br><br><strong>Complexity — Why O(E log E)?</strong><br>Sorting dominates: O(E log E). DSU operations with path compression and union by rank are nearly O(1) amortized — specifically O(α(n)) where α is the inverse Ackermann function.`
                }
            ]
        },
        {
            id: 'scc-kosaraju',
            title: 'Strongly Connected Components',
            difficulty: 'hard',
            description: `Find all <strong>Strongly Connected Components</strong> (SCCs) in a directed graph. An SCC is a maximal set of vertices where every vertex is reachable from every other vertex within that set.<br><br>Kosaraju's algorithm uses two DFS passes and a reversed graph.`,
            testCases: [
                { input: 'V=5, Edges: 0→1, 1→2, 2→0, 1→3, 3→4', output: 'SCCs: {0,1,2}, {3}, {4}', explanation: '0→1→2→0 form a cycle (SCC). 3 and 4 are reached but dont form cycles.' },
                { input: 'V=3, Edges: 0→1, 1→2, 2→0', output: 'SCCs: {0,1,2}', explanation: 'All vertices form one SCC — every vertex reachable from every other.' },
                { input: 'V=3, Edges: 0→1, 1→2', output: 'SCCs: {0}, {1}, {2}', explanation: 'No cycles. Each vertex is its own SCC.' }
            ],
            approaches: [
                {
                    name: "Kosaraju's Algorithm",
                    code: `void dfs1(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& order) {
    visited[node] = true;
    for (int nbr : adj[node]) if (!visited[nbr]) dfs1(nbr, adj, visited, order);
    order.push(node);
}
void dfs2(int node, vector<vector<int>>& radj, vector<bool>& visited) {
    visited[node] = true;
    for (int nbr : radj[node]) if (!visited[nbr]) dfs2(nbr, radj, visited);
}
int countSCCs(int V, vector<vector<int>>& adj) {
    stack<int> order;
    vector<bool> visited(V, false);
    for (int i = 0; i < V; i++) if (!visited[i]) dfs1(i, adj, visited, order);
    // Build reverse graph
    vector<vector<int>> radj(V);
    for (int u = 0; u < V; u++) for (int v : adj[u]) radj[v].push_back(u);
    fill(visited.begin(), visited.end(), false);
    int count = 0;
    while (!order.empty()) {
        int node = order.top(); order.pop();
        if (!visited[node]) { count++; dfs2(node, radj, visited); }
    }
    return count;
}`,
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V + E)',
                    description: `Step 1: DFS on original graph, push to stack by finish time. Step 2: Build reverse graph. Step 3: Process stack order on reverse graph — each DFS from an unvisited node finds one SCC. Works because: reversing edges preserves SCCs, and finish-time ordering ensures we start from "source" SCCs that can't reach other SCCs in the reverse graph.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Three passes: (1) DFS on original graph to get finish-time ordering, (2) reverse all edges, (3) DFS on reversed graph in finish-time order. Each DFS in pass 3 discovers one SCC.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → DFS on original graph. After fully exploring a node (all descendants done), push it to a stack. Nodes that finish later are pushed higher.<br>Step 2 → Build the reverse graph (flip all edge directions).<br>Step 3 → Pop nodes from stack. For each unvisited node, run DFS on the reversed graph. All nodes reached form one SCC. Increment count.<br><br><strong>Why does this work?</strong><br>In the reversed graph, edges point backward. If vertices u and v are in the same SCC, both u→v and v→u paths exist — reversing doesn't affect this. The finish-time ordering ensures we start DFS from "source" SCCs that shouldn't reach other SCCs in the reversed graph, preventing cross-SCC contamination.<br><br><strong>Trace (V=5, edges: 0→1, 1→2, 2→0, 1→3, 3→4):</strong><br>DFS1 order: finish order might be [4, 3, 2, 1, 0]. Stack top = 0.<br>Reverse graph: 1→0, 2→1, 0→2, 3→1, 4→3.<br>DFS2: pop 0 → DFS visits {0,2,1} (SCC 1). Pop 3 → visits {3} (SCC 2). Pop 4 → visits {4} (SCC 3).<br>Result: 3 SCCs.<br><br><strong>Complexity — Why O(V + E)?</strong><br>Two DFS passes: O(V+E) each. Reversing graph: O(V+E). Total: O(V+E).`
                }
            ]
        }
    ]
};
