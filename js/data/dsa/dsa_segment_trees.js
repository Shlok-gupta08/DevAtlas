// =================================================================
//  DSA — Segment Trees & Advanced
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['segment-trees'] = {
    id: 'segment-trees',
    name: 'Segment Trees',
    icon: '🌲',
    color: '#a78bfa',
    questions: [
        // ===== MEDIUM =====
        {
            id: 'segment-tree-build-query',
            title: 'Segment Tree (Build & Query)',
            difficulty: 'medium',
            description: `<p>Implement a <strong>Segment Tree</strong> that supports building from an array and answering <strong>range sum queries</strong>. Given an array of n integers, compute the sum of elements in any subarray [l, r] efficiently.</p>`,
            testCases: [
                { input: 'arr = [1, 3, 5, 7, 9, 11], query(1, 3)', output: '15', explanation: 'Sum of arr[1..3] = 3 + 5 + 7 = 15.' },
                { input: 'arr = [2, 4, 6, 8], query(0, 3)', output: '20', explanation: 'Sum of entire array = 2 + 4 + 6 + 8 = 20.' },
                { input: 'arr = [1, 2, 3, 4, 5], query(2, 2)', output: '3', explanation: 'Single element query: arr[2] = 3.' }
            ],
            approaches: [
                {
                    name: 'Recursive Build / Query',
                    code: `class SegTree {
    vector<int> tree;
    int n;
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2*node, start, mid);
        build(arr, 2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0; // Out of range
        if (l <= start && end <= r) return tree[node]; // Fully in range
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r)
             + query(2*node+1, mid+1, end, l, r);
    }
public:
    SegTree(vector<int>& arr) : n(arr.size()), tree(4 * arr.size()) {
        build(arr, 1, 0, n - 1);
    }
    int rangeSum(int l, int r) { return query(1, 0, n - 1, l, r); }
};`,
                    timeComplexity: 'Build: O(n) | Query: O(log n)',
                    spaceComplexity: 'O(n)',
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> A segment tree stores aggregate information (sum, min, max) for array ranges in a binary tree. Leaves correspond to individual elements. Each internal node stores the merged result of its two children. This allows range queries in O(log n).</p>

<p><strong>Algorithm Steps — Build:</strong></p>
<ol>
  <li>If start == end, this is a leaf — store arr[start].</li>
  <li>Otherwise, split at mid = (start + end) / 2.</li>
  <li>Recursively build left child (2×node) for [start, mid] and right child (2×node+1) for [mid+1, end].</li>
  <li>Set tree[node] = tree[left] + tree[right].</li>
</ol>

<p><strong>Algorithm Steps — Query:</strong></p>
<ol>
  <li>If current segment [start, end] is completely outside [l, r]: return 0 (identity for sum).</li>
  <li>If current segment is fully inside [l, r]: return tree[node] directly.</li>
  <li>Otherwise (partial overlap): query both children and sum the results.</li>
</ol>

<p><strong>Trace (arr = [1,3,5,7], query(1,3)):</strong></p>
<pre>
Build tree:
  Node 1: [0,3] → sum=16
    Node 2: [0,1] → sum=4
      Node 4: [0,0] → 1
      Node 5: [1,1] → 3
    Node 3: [2,3] → sum=12
      Node 6: [2,2] → 5
      Node 7: [3,3] → 7

Query(1, 0, 3, 1, 3):
  Partial overlap → query left + right
  Left: query(2, 0, 1, 1, 3)
    Partial → query(4, 0, 0, 1, 3) → 0 < 1? No, 0 < 1 → out of range → 0
             query(5, 1, 1, 1, 3) → fully inside → 3
    Result: 3
  Right: query(3, 2, 3, 1, 3) → fully inside → 12
  Total: 3 + 12 = 15
</pre>

<p><strong>Complexity — Why O(n) build, O(log n) query:</strong> Build visits every node once (2n nodes total). For queries, at each tree level, at most 2 nodes partially overlap the query range — all others are either fully in or fully out. With O(log n) levels, queries take O(log n). Tree size is 4n to handle 1-based indexing gaps safely.</p>`
                }
            ]
        },
        {
            id: 'segment-tree-update',
            title: 'Segment Tree (Point Update)',
            difficulty: 'medium',
            description: `<p>Extend the segment tree to support <strong>point updates</strong>: change the value at a single index and update all affected range sums efficiently.</p>`,
            testCases: [
                { input: 'arr = [1, 3, 5, 7], update(idx=2, val=10), query(1, 3)', output: '20', explanation: 'After update: arr = [1, 3, 10, 7]. Sum of [1..3] = 3 + 10 + 7 = 20.' },
                { input: 'arr = [2, 4, 6], update(idx=0, val=0), query(0, 2)', output: '10', explanation: 'After update: [0, 4, 6]. Sum = 10.' },
                { input: 'arr = [5, 5, 5, 5], update(idx=3, val=1), query(0, 3)', output: '16', explanation: 'After update: [5, 5, 5, 1]. Sum = 16.' }
            ],
            approaches: [
                {
                    name: 'Recursive Update',
                    code: `void update(vector<int>& tree, int node, int start, int end, int idx, int val) {
    if (start == end) { tree[node] = val; return; }
    int mid = (start + end) / 2;
    if (idx <= mid) update(tree, 2*node, start, mid, idx, val);
    else update(tree, 2*node+1, mid+1, end, idx, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(n)',
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> To update a single element, traverse from root to the target leaf, then recalculate all ancestors on the way back up. Only nodes along the root-to-leaf path are affected.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>If start == end, this is the target leaf — set tree[node] = val and return.</li>
  <li>Compute mid. If idx ≤ mid, recurse into the left child; otherwise, the right child.</li>
  <li>After recursion returns, recompute tree[node] = tree[left] + tree[right]. This propagates the change upward.</li>
</ol>

<p><strong>Trace (arr = [1,3,5,7], update idx=2 to val=10):</strong></p>
<pre>
update(node=1, [0,3], idx=2, val=10)
  mid=1, idx=2 > 1 → go right
  update(node=3, [2,3], idx=2, val=10)
    mid=2, idx=2 ≤ 2 → go left
    update(node=6, [2,2], idx=2, val=10)
      start==end → tree[6] = 10
    tree[3] = tree[6] + tree[7] = 10 + 7 = 17
  tree[1] = tree[2] + tree[3] = 4 + 17 = 21

Before: tree[1]=16, tree[3]=12, tree[6]=5
After:  tree[1]=21, tree[3]=17, tree[6]=10
</pre>

<p><strong>Complexity — Why O(log n):</strong> The update follows exactly one path from root to leaf. The tree has O(log n) levels, so O(log n) nodes are visited and updated. No other nodes are touched.</p>`
                }
            ]
        },
        // ===== HARD =====
        {
            id: 'lazy-propagation',
            title: 'Lazy Propagation (Range Update)',
            difficulty: 'hard',
            description: `<p>Implement a segment tree with <strong>lazy propagation</strong> to support both <strong>range updates</strong> (add a value to all elements in [l, r]) and <strong>range sum queries</strong> in O(log n) each.</p>`,
            testCases: [
                { input: 'arr = [0,0,0,0,0], update(0, 2, +5), query(0, 4)', output: '15', explanation: 'After adding 5 to indices 0–2: [5,5,5,0,0]. Sum = 15.' },
                { input: 'arr = [1,2,3,4,5], update(1, 3, +10), query(1, 3)', output: '39', explanation: 'After update: [1,12,13,14,5]. Sum of [1..3] = 12+13+14 = 39.' },
                { input: 'arr = [0,0,0,0], update(0, 3, +1), update(0, 3, +1), query(0, 3)', output: '8', explanation: 'Two range-add operations: [2,2,2,2]. Sum = 8.' }
            ],
            approaches: [
                {
                    name: 'Lazy Segment Tree',
                    code: `class LazySegTree {
    vector<int> tree, lazy;
    int n;
    void propagate(int node, int start, int end) {
        if (lazy[node] != 0) {
            tree[node] += (end - start + 1) * lazy[node];
            if (start != end) { lazy[2*node] += lazy[node]; lazy[2*node+1] += lazy[node]; }
            lazy[node] = 0;
        }
    }
    void updateRange(int node, int start, int end, int l, int r, int val) {
        propagate(node, start, end);
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            lazy[node] += val;
            propagate(node, start, end);
            return;
        }
        int mid = (start + end) / 2;
        updateRange(2*node, start, mid, l, r, val);
        updateRange(2*node+1, mid+1, end, l, r, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    int query(int node, int start, int end, int l, int r) {
        propagate(node, start, end);
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r)
             + query(2*node+1, mid+1, end, l, r);
    }
public:
    LazySegTree(int sz) : n(sz), tree(4*sz, 0), lazy(4*sz, 0) {}
    void update(int l, int r, int val) { updateRange(1, 0, n-1, l, r, val); }
    int rangeQuery(int l, int r) { return query(1, 0, n-1, l, r); }
};`,
                    timeComplexity: 'O(log n) per update/query',
                    spaceComplexity: 'O(n)',
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Without lazy propagation, a range update [l, r] would require updating every leaf individually — O(n). Lazy propagation defers updates: instead of pushing a change all the way down, we store a "pending" tag at the deepest node that fully covers the range. The tag is only pushed down when a future operation needs to access that node's children.</p>

<p><strong>Algorithm Steps — Propagate:</strong></p>
<ol>
  <li>If lazy[node] ≠ 0, apply the pending update: tree[node] += lazy[node] × (end − start + 1).</li>
  <li>If not a leaf, push the lazy value to both children: lazy[child] += lazy[node].</li>
  <li>Clear this node's lazy tag: lazy[node] = 0.</li>
</ol>

<p><strong>Algorithm Steps — Range Update:</strong></p>
<ol>
  <li>Call propagate to clear any old pending values.</li>
  <li>If current segment is fully outside [l, r], return.</li>
  <li>If fully inside [l, r], set lazy[node] += val, propagate immediately, and return — no need to recurse deeper.</li>
  <li>If partial overlap, recurse into both children, then recompute tree[node].</li>
</ol>

<p><strong>Algorithm Steps — Query:</strong></p>
<ol>
  <li>Call propagate first (ensures values are current).</li>
  <li>Same three-case logic as a standard segment tree query.</li>
</ol>

<p><strong>Trace (arr = [0,0,0,0,0], update(0, 2, +5)):</strong></p>
<pre>
updateRange(node=1, [0,4], l=0, r=2, val=5):
  propagate(1) → lazy=0, nothing to do
  Partial overlap → recurse both
  Left: updateRange(2, [0,2], 0, 2, 5)
    propagate(2) → clean
    Fully inside [0,2] → lazy[2] += 5, propagate:
      tree[2] += 3 × 5 = 15, push lazy to children → done
  Right: updateRange(3, [3,4], 0, 2, 5)
    propagate(3) → clean
    Fully outside → return
  tree[1] = tree[2] + tree[3] = 15 + 0 = 15

query(0, 4):
  propagate(1) → clean
  Fully inside → return tree[1] = 15
</pre>

<p><strong>Complexity — Why O(log n):</strong> Both range update and query visit at most O(log n) nodes — the same analysis as standard segment tree queries. The lazy tags ensure that deferred work is only propagated when needed, keeping each operation to O(log n) even for range updates. The key invariant: always call propagate before accessing any node's value or children.</p>`
                }
            ]
        }
    ]
};
