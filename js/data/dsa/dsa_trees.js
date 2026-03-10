// =================================================================
//  DSA — Binary Trees
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['binary-trees'] = {
    id: 'binary-trees',
    name: 'Binary Trees',
    icon: '🌳',
    color: '#34d399',
    questions: [
        // ===== EASY =====
        {
            id: 'tree-traversals',
            title: 'Preorder, Inorder, Postorder & Level Order',
            difficulty: 'easy',
            description: `Given a binary tree, perform all four standard traversals:<br><br>
<strong>Preorder:</strong> Visit root, then left subtree, then right subtree.<br>
<strong>Inorder:</strong> Visit left subtree, then root, then right subtree.<br>
<strong>Postorder:</strong> Visit left subtree, then right subtree, then root.<br>
<strong>Level Order:</strong> Visit all nodes level by level from left to right.<br><br>
Return each traversal as a list of node values in the respective order.`,
            testCases: [
                { input: 'root = [1, 2, 3]', output: 'Preorder: [1,2,3], Inorder: [2,1,3], Postorder: [2,3,1], Level: [[1],[2,3]]', explanation: 'Root 1, left child 2, right child 3. Each traversal visits these three nodes in its defined order.' },
                { input: 'root = [1, null, 2, 3]', output: 'Preorder: [1,2,3], Inorder: [1,3,2], Postorder: [3,2,1], Level: [[1],[2],[3]]', explanation: 'Root 1 has no left child. Right child is 2 with left child 3.' },
                { input: 'root = []', output: 'All traversals: []', explanation: 'An empty tree returns an empty list for every traversal.' }
            ],
            approaches: [{
                name: 'Recursive + BFS',
                code: `void preorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    res.push_back(root->val);
    preorder(root->left, res);
    preorder(root->right, res);
}
void inorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}
void postorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    postorder(root->left, res);
    postorder(root->right, res);
    res.push_back(root->val);
}
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                description: `Preorder: Root → Left → Right (useful for serialization). Inorder: Left → Root → Right (gives sorted order for BST). Postorder: Left → Right → Root (useful for deletion, expression trees). Level Order: BFS using queue — process all nodes at current depth before next. Each visits every node exactly once.`,
                detailedWalkthrough: `<strong>Recursive Traversals — Preorder, Inorder, Postorder:</strong><br>All three share the same skeleton: a base case <code>if (!root) return;</code> that stops recursion at null nodes. They differ only in <em>when</em> we record <code>root-&gt;val</code>.<br><br><strong>Preorder</strong> pushes the value <em>before</em> recursing: Root → Left → Right. For tree <code>[1,2,3]</code>, output is <code>[1,2,3]</code>. Useful for serializing a tree because the root always comes first.<br><br><strong>Inorder</strong> pushes <em>between</em> left and right calls: Left → Root → Right. For a BST this yields sorted order, making it essential for BST validation.<br><br><strong>Postorder</strong> pushes <em>after</em> both children: Left → Right → Root. Useful when you need child results before processing the parent (e.g., computing subtree sizes, deleting nodes).<br><br><strong>Level Order (BFS):</strong><br>We use a <code>queue</code> initialized with the root. Each iteration measures <code>sz = q.size()</code> — that is exactly how many nodes sit on the current level. We pop <code>sz</code> nodes, collect their values into a <code>level</code> vector, and enqueue their non-null children. This guarantees one complete level is processed per outer-loop iteration.<br><br><strong>Complexity:</strong> Every node is visited once → O(n) time. Recursion stack is O(h) for recursive versions; the queue holds at most O(n) nodes for level order.`
            }]
        },
        {
            id: 'tree-height-count',
            title: 'Height & Count of Nodes',
            difficulty: 'easy',
            description: `Given a binary tree, compute:<br>
<strong>Height:</strong> The number of nodes on the longest path from root to a leaf (root-only tree has height 1).<br>
<strong>Count:</strong> The total number of nodes in the tree.`,
            testCases: [
                { input: 'root = [1, 2, 3, 4, 5]', output: 'Height: 3, Count: 5', explanation: 'Longest path is 1→2→4 or 1→2→5 (3 nodes). Total nodes: 5.' },
                { input: 'root = [1]', output: 'Height: 1, Count: 1', explanation: 'A single-node tree has height 1 and count 1.' },
                { input: 'root = [1, 2, null, 3, null, 4]', output: 'Height: 4, Count: 4', explanation: 'Left-skewed chain 1→2→3→4 gives height 4. All 4 nodes counted.' }
            ],
            approaches: [{
                name: 'Recursive',
                code: `int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}
int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h) — recursion stack',
                description: `Height: max of left and right subtree heights + 1. Base case: null node has height 0. Count: total nodes = 1 (current) + left subtree count + right subtree count. Both use simple post-order style recursion. Height can also be defined as edges (then null = -1).`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Both functions follow the same recursive pattern — solve for children, combine results at the parent. The only difference is the combining operation: <code>max</code> for height, <code>sum</code> for count.<br><br><strong>Algorithm Steps — Height:</strong><br>The base case <code>if (!root) return 0;</code> defines a null subtree's height as 0. For any non-null node, we recursively compute the height of the left and right subtrees, take the <code>max</code>, and add 1 for the current node.<br><br>A node with children of heights 3 and 5 has height 6 — the deeper side determines the answer. A single-node tree has both children null (height 0), so height = 1 + max(0,0) = 1.<br><br><strong>Algorithm Steps — Count:</strong><br>Same structure: base case returns 0 for null. Otherwise, count = 1 (this node) + count of left subtree + count of right subtree. Unlike height, we <em>sum</em> rather than take max because every node in both subtrees contributes to the total.<br><br><strong>Trace (count on [1, 2, 3]):</strong><br>• <code>countNodes(1)</code> = 1 + <code>countNodes(2)</code> + <code>countNodes(3)</code> = 1 + 1 + 1 = 3.<br><br><strong>Complexity — Why O(n):</strong><br>Both functions visit every node exactly once. Stack space is O(h) where h is tree height — O(log n) for balanced trees, O(n) worst case for skewed trees.`
            }]
        },
        {
            id: 'identical-subtree',
            title: 'Identical Trees / Subtree of Another Tree',
            difficulty: 'easy',
            description: `Given two binary trees <code>p</code> and <code>q</code>, check if they are <strong>structurally identical</strong> with the same node values.<br><br>
<strong>Follow-up:</strong> Given trees <code>root</code> and <code>sub</code>, determine whether <code>sub</code> is a subtree of <code>root</code> — i.e., there exists a node in <code>root</code> such that the subtree rooted at that node is identical to <code>sub</code>.`,
            testCases: [
                { input: 'p = [1,2,3], q = [1,2,3]', output: 'isSame: true', explanation: 'Both trees have the same structure and node values at every position.' },
                { input: 'p = [1,2], q = [1,null,2]', output: 'isSame: false', explanation: 'Tree p has 2 as left child, tree q has 2 as right child — different structure.' },
                { input: 'root = [3,4,5,1,2], sub = [4,1,2]', output: 'isSubtree: true', explanation: 'The left subtree rooted at node 4 in root matches sub exactly.' }
            ],
            approaches: [{
                name: 'Recursive Comparison',
                code: `bool isSame(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q || p->val != q->val) return false;
    return isSame(p->left, q->left) && isSame(p->right, q->right);
}
bool isSubtree(TreeNode* root, TreeNode* sub) {
    if (!root) return false;
    if (isSame(root, sub)) return true;
    return isSubtree(root->left, sub) || isSubtree(root->right, sub);
}`,
                timeComplexity: 'O(m × n) for subtree check',
                spaceComplexity: 'O(h)',
                description: `Identical: recursively compare corresponding nodes — both null = true, one null or different values = false, else check both children. Subtree: at each node in the main tree, check if the subtree rooted here is identical to the target tree. If not, recurse into children.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Two trees are identical if and only if every corresponding pair of nodes matches in value and structure. For the subtree problem, we check this condition at every node in the larger tree.<br><br><strong>Algorithm Steps — isSame:</strong><br>Three cases handle the comparison:<br>1. Both nodes null → structurally identical at this point, return <code>true</code>.<br>2. One null and the other is not, or values differ → return <code>false</code>.<br>3. Values match → recursively verify both left children match AND both right children match.<br><br><strong>Algorithm Steps — isSubtree:</strong><br>At every node in the main tree, we ask: "Is the subtree rooted here identical to <code>sub</code>?" If <code>isSame(root, sub)</code> returns true, we found it. Otherwise, we recurse into <code>root-&gt;left</code> and <code>root-&gt;right</code>, using OR because finding a match in either side suffices.<br><br><strong>Trace (isSame on [1,2,3] vs [1,2,3]):</strong><br>Compare 1==1 ✓, then left subtrees (2==2 ✓, both children null ✓), then right subtrees (3==3 ✓, both children null ✓) → <code>true</code>.<br><br><strong>Complexity — Why O(m × n):</strong><br>For each of the m nodes in the main tree, we might call <code>isSame</code> which visits up to n nodes (size of <code>sub</code>). In practice, mismatches cause early termination so average performance is much better.`
            }]
        },
        {
            id: 'sum-of-nodes',
            title: 'Sum of Nodes',
            difficulty: 'easy',
            description: `Given a binary tree, return the sum of all node values in the tree.`,
            testCases: [
                { input: 'root = [5, 3, 8]', output: '16', explanation: '5 + 3 + 8 = 16.' },
                { input: 'root = [1, 2, 3, 4, 5]', output: '15', explanation: '1 + 2 + 3 + 4 + 5 = 15.' },
                { input: 'root = [-1, -2, 3]', output: '0', explanation: '-1 + (-2) + 3 = 0. Negative values are summed normally.' }
            ],
            approaches: [{
                name: 'Recursive',
                code: `int sumOfNodes(TreeNode* root) {
    if (!root) return 0;
    return root->val + sumOfNodes(root->left) + sumOfNodes(root->right);
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `Simple recursion: return current node's value plus the sum of left subtree plus the sum of right subtree. Base case: null node contributes 0. This visits every node exactly once.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Every node's value must be added exactly once. Recursion naturally visits every node, and we accumulate as we return.<br><br><strong>Algorithm Steps:</strong><br>The base case <code>if (!root) return 0;</code> ensures null nodes contribute nothing to the sum — this is the recursion's stopping point.<br><br>For a non-null node, we return <code>root-&gt;val + sumOfNodes(root-&gt;left) + sumOfNodes(root-&gt;right)</code>. This follows a <strong>post-order pattern</strong>: we need the results from both children before we can compute the current node's total contribution.<br><br><strong>Trace ([5, 3, 8]):</strong><br>• <code>sumOfNodes(3)</code> → 3 + 0 + 0 = 3<br>• <code>sumOfNodes(8)</code> → 8 + 0 + 0 = 8<br>• <code>sumOfNodes(5)</code> → 5 + 3 + 8 = 16<br><br><strong>Complexity — Why O(n):</strong><br>Each node is visited once. Space is O(h) due to the recursion stack — the maximum depth of nested calls equals the tree height. For a balanced tree this is O(log n); for a skewed tree it degrades to O(n). No extra data structures are used beyond the implicit call stack.`
            }]
        },
        // ===== MEDIUM =====
        {
            id: 'tree-diameter',
            title: 'Diameter of a Binary Tree',
            difficulty: 'medium',
            description: `The <strong>diameter</strong> of a binary tree is the length of the longest path between any two nodes. This path may or may not pass through the root.<br><br>
The length of a path is measured by the number of <strong>edges</strong> between nodes. Return the diameter.`,
            testCases: [
                { input: 'root = [1, 2, 3, 4, 5]', output: '3', explanation: 'Longest path: 4→2→1→3 or 5→2→1→3, which has 3 edges.' },
                { input: 'root = [1, 2]', output: '1', explanation: 'Only one edge: 2→1.' },
                { input: 'root = [1, 2, 3, 4, null, null, null, 5]', output: '3', explanation: 'Longest path: 5→4→2→1→3 has 4 edges, but the path 5→4→2→1 already gives diameter 3 from the left chain.' }
            ],
            approaches: [{
                name: 'O(N) Postorder',
                code: `int diameter(TreeNode* root, int& maxDia) {
    if (!root) return 0;
    int lh = diameter(root->left, maxDia);
    int rh = diameter(root->right, maxDia);
    maxDia = max(maxDia, lh + rh);
    return 1 + max(lh, rh);
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `Diameter = longest path between any two nodes = max(leftHeight + rightHeight) across all nodes. Compute height while simultaneously updating a global max diameter. For each node, the path through it has length leftHeight + rightHeight. Return height (1 + max child height) for the parent's computation.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>The diameter passes through some node where it uses the full left height + right height. We must check this at <em>every</em> node, not just the root.<br><br><strong>Algorithm Steps:</strong><br><code>if (!root) return 0;</code> — Null nodes have height 0; this is our recursion base case.<br><br><code>int lh = diameter(root-&gt;left, maxDia);</code> — Recursively compute the left subtree's height while updating <code>maxDia</code> along the way.<br><br><code>int rh = diameter(root-&gt;right, maxDia);</code> — Same for the right subtree.<br><br><code>maxDia = max(maxDia, lh + rh);</code> — The path through the current node has length <code>lh + rh</code> (edges from deepest left leaf → current node → deepest right leaf). Update the global maximum if this is the longest path seen so far.<br><br><code>return 1 + max(lh, rh);</code> — Return the height of this subtree to the parent. The parent only cares about the longest single branch, so we take the max of children and add 1.<br><br><strong>Trace ([1, 2, 3, 4, 5]):</strong><br>At node 2: lh=1 (from 4), rh=1 (from 5), maxDia = max(0, 1+1) = 2. At node 1: lh=2 (from 2), rh=1 (from 3), maxDia = max(2, 2+1) = 3.<br><br><strong>Complexity — Why O(n):</strong><br>Each node is visited exactly once — height and diameter are computed simultaneously, avoiding the naive O(n²) approach of calling height separately at each node.`
            }]
        },
        {
            id: 'top-view',
            title: 'Top View of a Binary Tree',
            difficulty: 'medium',
            description: `Given a binary tree, return its <strong>top view</strong> — the set of nodes visible when the tree is viewed from above, ordered from left to right.<br><br>
Each node is assigned a horizontal distance (HD): root has HD 0, left child has HD−1, right child has HD+1. The top view is the first (topmost) node at each unique HD.`,
            testCases: [
                { input: 'root = [1, 2, 3, 4, 5, 6, 7]', output: '[4, 2, 1, 3, 7]', explanation: 'HD mapping: 4→-2, 2→-1, 1→0, 3→1, 7→2. Nodes 5 and 6 at HD 0 and HD 0 are hidden by 1.' },
                { input: 'root = [1, 2, 3, null, 4, null, null, 5]', output: '[2, 1, 3]', explanation: 'Nodes 4 (HD 0) and 5 (HD -1) are below existing top-view nodes at those HDs.' },
                { input: 'root = [1]', output: '[1]', explanation: 'Single node, only one position visible.' }
            ],
            approaches: [{
                name: 'BFS + Horizontal Distance Map',
                code: `vector<int> topView(TreeNode* root) {
    map<int, int> topMap; // HD -> first node value
    queue<pair<TreeNode*, int>> q;
    q.push({root, 0});
    while (!q.empty()) {
        auto [node, hd] = q.front(); q.pop();
        if (!topMap.count(hd)) topMap[hd] = node->val;
        if (node->left) q.push({node->left, hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    vector<int> res;
    for (auto& [hd, val] : topMap) res.push_back(val);
    return res;
}`,
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                description: `Assign horizontal distance (HD) 0 to root, -1 to left child, +1 to right child. BFS ensures we see the topmost node at each HD first. Use a sorted map (HD → value), only storing the first node seen at each HD. Map's natural ordering gives left-to-right top view.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Assign HD 0 to the root. Moving left decreases HD by 1; moving right increases it by 1. The "top view" consists of the first node visible at each HD when looking from above.<br><br><strong>Algorithm Steps:</strong><br>BFS (level-order) processes nodes top-to-bottom. The <em>first</em> node encountered at each HD is guaranteed to be the topmost — exactly what we want for the top view.<br><br><code>map&lt;int, int&gt; topMap;</code> — A sorted map from HD → node value. Sorted because we want left-to-right output order.<br><br><code>q.push({root, 0});</code> — Start BFS with root at HD 0.<br><br><code>if (!topMap.count(hd)) topMap[hd] = node-&gt;val;</code> — Only store the <em>first</em> node at this HD. Later nodes at the same HD are below and hidden from the top view.<br><br><code>hd - 1</code> for left child, <code>hd + 1</code> for right child — Propagate horizontal distances naturally to children.<br><br><strong>Trace ([1, 2, 3, 4, 5, 6, 7]):</strong><br>BFS order: 1(HD0), 2(HD-1), 3(HD1), 4(HD-2), 5(HD0), 6(HD0), 7(HD2). First at each HD: {-2:4, -1:2, 0:1, 1:3, 2:7}. Output: <code>[4, 2, 1, 3, 7]</code>.<br><br><strong>Complexity — Why O(n log n):</strong><br>Each node is visited once (O(n)), but the sorted map has O(log n) insertions/lookups. The map size is bounded by the tree width, which is at most O(n).`
            }]
        },
        {
            id: 'lca-bt',
            title: 'Lowest Common Ancestor (LCA)',
            difficulty: 'medium',
            description: `Given a binary tree and two nodes <code>p</code> and <code>q</code>, find their <strong>Lowest Common Ancestor (LCA)</strong> — the deepest node that is an ancestor of both <code>p</code> and <code>q</code>.<br><br>
A node is considered an ancestor of itself.`,
            testCases: [
                { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', explanation: 'Node 5 is in the left subtree, node 1 in the right. Their paths diverge at root 3.' },
                { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5', explanation: 'Node 4 is in the subtree of node 5, so 5 is the LCA (a node is its own ancestor).' },
                { input: 'root = [1, 2], p = 1, q = 2', output: '1', explanation: 'Root 1 is the ancestor of both itself and its child 2.' }
            ],
            approaches: [{
                name: 'Single Traversal',
                code: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `If current node is null or matches p/q, return it. Recurse left and right. If both return non-null, current node is the LCA (p and q are in different subtrees). If only one returns non-null, that side contains both nodes — propagate upward. Single traversal, O(n) time.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>The LCA is the deepest node where one target is in the left subtree and the other is in the right. We find it in a single pass by leveraging what the recursive calls return.<br><br><strong>Algorithm Steps:</strong><br><code>if (!root || root == p || root == q) return root;</code> — Three base cases: (1) null node returns null, (2) if the current node <em>is</em> p or q, return it immediately — no need to look deeper, as this node is either the LCA or needs to be reported upward.<br><br><code>TreeNode* left = lowestCommonAncestor(root-&gt;left, p, q);</code><br><code>TreeNode* right = lowestCommonAncestor(root-&gt;right, p, q);</code><br>Search both subtrees for p and q.<br><br><code>if (left &amp;&amp; right) return root;</code> — Both sides returned non-null, meaning p is in one subtree and q is in the other. The current node is where their paths diverge — it is the LCA.<br><br><code>return left ? left : right;</code> — Only one side returned a result, so both p and q are in that subtree. Pass that result upward; the LCA was found deeper down.<br><br><strong>Trace (root=[3,5,1,6,2,0,8], p=5, q=1):</strong><br>Root 3's left returns 5 (found p), right returns 1 (found q). Both non-null → LCA is 3.<br><br><strong>Complexity — Why O(n):</strong><br>Each node is visited at most once. The recursion terminates early when a target is found, so on average fewer than n nodes are visited. This assumes both p and q exist in the tree.`
            }]
        },
        {
            id: 'kth-level',
            title: 'Kth Level of a Binary Tree',
            difficulty: 'medium',
            description: `Given a binary tree and an integer <code>k</code>, return all node values at the <strong>kth level</strong> (0-indexed, where the root is at level 0).`,
            testCases: [
                { input: 'root = [1, 2, 3, 4, 5], k = 2', output: '[4, 5]', explanation: 'Level 0: [1], Level 1: [2, 3], Level 2: [4, 5].' },
                { input: 'root = [1, 2, 3, 4, 5, 6, 7], k = 1', output: '[2, 3]', explanation: 'Level 1 contains the root\'s direct children.' },
                { input: 'root = [1], k = 0', output: '[1]', explanation: 'Level 0 is just the root node.' }
            ],
            approaches: [{
                name: 'Recursive',
                code: `void kthLevel(TreeNode* root, int k, vector<int>& result) {
    if (!root) return;
    if (k == 0) { result.push_back(root->val); return; }
    kthLevel(root->left, k - 1, result);
    kthLevel(root->right, k - 1, result);
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `Decrement k as we go deeper. When k reaches 0, we're at the target level — add the node's value. Recurse into both children with k-1. Alternatively, use BFS and stop at the kth level. Both visit at most all nodes.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>The root is at level 0. Each recursive call decrements k by 1 as we descend one level deeper. When <code>k == 0</code>, we have reached the target level.<br><br><strong>Algorithm Steps:</strong><br><code>if (!root) return;</code> — Base case: null node means this path ended before reaching level k. No action needed.<br><br><code>if (k == 0) { result.push_back(root-&gt;val); return; }</code> — We are at the target level. Record this node's value and stop recursing deeper — nodes below this level are not part of the answer.<br><br><code>kthLevel(root-&gt;left, k - 1, result);</code><br><code>kthLevel(root-&gt;right, k - 1, result);</code><br>Recurse into both children with <code>k-1</code>. This naturally explores all paths from root to level k.<br><br><strong>Trace ([1, 2, 3, 4, 5], k=2):</strong><br>• <code>kthLevel(1, 2)</code> → recurses to children<br>• <code>kthLevel(2, 1)</code> → recurses to children<br>• <code>kthLevel(4, 0)</code> → adds 4 ✓<br>• <code>kthLevel(5, 0)</code> → adds 5 ✓<br>Result: <code>[4, 5]</code>.<br><br><strong>Complexity — Why O(n):</strong><br>In the worst case all nodes are visited to reach the target level. Space is O(h) from the recursion stack. BFS alternative processes level by level — run the BFS loop k times, then the queue contains exactly the kth-level nodes.`
            }]
        },
        {
            id: 'build-tree-pre-in',
            title: 'Build Tree from Preorder & Inorder',
            difficulty: 'medium',
            description: `Given two integer arrays <code>preorder</code> and <code>inorder</code> representing the preorder and inorder traversals of a binary tree, construct and return the tree.<br><br>
You may assume that all values are unique and both arrays contain the same elements.`,
            testCases: [
                { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]', explanation: 'Root is 3 (first in preorder). In inorder, 9 is left of 3 (left subtree), [15,20,7] is right.' },
                { input: 'preorder = [1,2], inorder = [2,1]', output: '[1,2]', explanation: 'Root is 1, 2 is in the left subtree (appears before 1 in inorder).' },
                { input: 'preorder = [1], inorder = [1]', output: '[1]', explanation: 'Single element — the tree is just the root.' }
            ],
            approaches: [{
                name: 'Recursive',
                code: `TreeNode* build(vector<int>& pre, int preStart, int preEnd,
                vector<int>& in, int inStart, int inEnd,
                unordered_map<int,int>& inMap) {
    if (preStart > preEnd || inStart > inEnd) return nullptr;
    TreeNode* root = new TreeNode(pre[preStart]);
    int inIdx = inMap[root->val];
    int leftSize = inIdx - inStart;
    root->left = build(pre, preStart+1, preStart+leftSize, in, inStart, inIdx-1, inMap);
    root->right = build(pre, preStart+leftSize+1, preEnd, in, inIdx+1, inEnd, inMap);
    return root;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                description: `Preorder's first element is the root. Find root in inorder to determine left/right subtree sizes. Elements left of root in inorder = left subtree, right = right subtree. Use a hash map for O(1) inorder lookups. Recurse with appropriate index ranges for each subtree.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Preorder visits Root first, so <code>pre[preStart]</code> is always the root of the current subtree. Inorder splits nodes into left subtree (before root) and right subtree (after root).<br><br><strong>Algorithm Steps:</strong><br><code>if (preStart &gt; preEnd || inStart &gt; inEnd) return nullptr;</code> — Empty range means no subtree exists here.<br><br><code>TreeNode* root = new TreeNode(pre[preStart]);</code> — The first element in the preorder range is the root of this subtree.<br><br><code>int inIdx = inMap[root-&gt;val];</code> — Find root's position in inorder using the hash map (O(1) lookup vs O(n) linear scan).<br><br><code>int leftSize = inIdx - inStart;</code> — Everything to the left of root in inorder belongs to the left subtree. This count tells us how many preorder elements also belong to the left subtree.<br><br>Recursive calls — index arithmetic:<br>• Left subtree preorder: <code>[preStart+1, preStart+leftSize]</code> — the next <code>leftSize</code> elements after root.<br>• Left subtree inorder: <code>[inStart, inIdx-1]</code> — everything before root.<br>• Right subtree preorder: <code>[preStart+leftSize+1, preEnd]</code> — remaining elements.<br>• Right subtree inorder: <code>[inIdx+1, inEnd]</code> — everything after root.<br><br><strong>Trace (pre=[3,9,20,15,7], in=[9,3,15,20,7]):</strong><br>Root=3, inIdx=1 in inorder, leftSize=1 (just node 9). Right subtree builds from pre=[20,15,7], in=[15,20,7].<br><br><strong>Complexity — Why O(n):</strong><br>Each node is processed once. The hash map provides O(1) lookups, avoiding repeated linear scans. Total O(n) time and O(n) space for the map and recursion stack.`
            }]
        },
        {
            id: 'sum-tree',
            title: 'Transform to Sum Tree',
            difficulty: 'medium',
            description: `Convert a binary tree to a <strong>sum tree</strong>, where each node's value is replaced by the sum of all values in its left and right subtrees.<br><br>
Leaf nodes become 0 (they have no subtrees). The function should also return the total sum of the original tree.`,
            testCases: [
                { input: 'root = [10, -2, 6, 8, -4, 7, 5]', output: 'Sum tree: [20, 4, 12, 0, 0, 0, 0]', explanation: 'Node -2 becomes 8+(-4)=4. Node 6 becomes 7+5=12. Root 10 becomes 4+(-2)+12+6=20.' },
                { input: 'root = [1, 2, 3]', output: 'Sum tree: [5, 0, 0]', explanation: 'Leaves become 0. Root becomes 2+3=5.' },
                { input: 'root = [5]', output: 'Sum tree: [0]', explanation: 'A single node is a leaf — it becomes 0.' }
            ],
            approaches: [{
                name: 'Postorder',
                code: `int toSumTree(TreeNode* root) {
    if (!root) return 0;
    int oldVal = root->val;
    root->val = toSumTree(root->left) + toSumTree(root->right);
    return root->val + oldVal;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `In a sum tree, each node's value = sum of its left and right subtrees (leaves become 0). Post-order: save old value, set new value = sum of children's returned values (which include their original values). Return the new value + old value so the parent can accumulate correctly.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Each node's value is replaced by the sum of all values in its left and right subtrees. The function returns the total sum including the original value so parents can accumulate correctly.<br><br><strong>Algorithm Steps:</strong><br><code>if (!root) return 0;</code> — Null nodes contribute 0 to their parent's sum.<br><br><code>int oldVal = root-&gt;val;</code> — Save the original value before overwriting. We need it for the return value.<br><br><code>root-&gt;val = toSumTree(root-&gt;left) + toSumTree(root-&gt;right);</code> — Replace this node's value with the sum returned by both children. The returned values include original values of all descendants — exactly what we need for the sum tree property.<br><br><code>return root-&gt;val + oldVal;</code> — Return the new value (subtree sum) plus the original value. The parent needs the <em>total</em> sum of this entire subtree, which includes the original value of this node.<br><br><strong>Trace ([10, -2, 6, 8, -4, 7, 5]):</strong><br>• Leaf 8: oldVal=8, node becomes 0, returns 8<br>• Leaf -4: oldVal=-4, node becomes 0, returns -4<br>• Node -2: oldVal=-2, node becomes 8+(-4)=4, returns 4+(-2)=2<br>• Similarly for the right subtree. Root accumulates all descendant sums.<br><br><strong>Complexity — Why O(n):</strong><br>Post-order traversal visits every node once. We must process children before the parent since the parent's new value depends on children's results. Space is O(h) for the recursion stack.`
            }]
        },
        {
            id: 'min-dist-nodes',
            title: 'Minimum Distance between 2 Nodes',
            difficulty: 'medium',
            description: `Given a binary tree and two node values <code>a</code> and <code>b</code>, find the <strong>minimum number of edges</strong> on the path between them.<br><br>
The approach uses the Lowest Common Ancestor: distance(a, b) = distance(LCA, a) + distance(LCA, b).`,
            testCases: [
                { input: 'root = [1,2,3,4,5], a = 4, b = 5', output: '2', explanation: 'LCA of 4 and 5 is node 2. dist(2,4)=1, dist(2,5)=1. Total = 2.' },
                { input: 'root = [1,2,3,4,5], a = 4, b = 3', output: '3', explanation: 'LCA is node 1. dist(1,4)=2, dist(1,3)=1. Total = 3.' },
                { input: 'root = [1,2,3], a = 2, b = 3', output: '2', explanation: 'LCA is root 1. dist(1,2)=1, dist(1,3)=1. Total = 2.' }
            ],
            approaches: [{
                name: 'LCA + Distance',
                code: `int findDist(TreeNode* root, int target, int dist) {
    if (!root) return -1;
    if (root->val == target) return dist;
    int left = findDist(root->left, target, dist + 1);
    if (left != -1) return left;
    return findDist(root->right, target, dist + 1);
}
int minDistance(TreeNode* root, int a, int b) {
    TreeNode* lca = lowestCommonAncestor(root, a, b);
    return findDist(lca, a, 0) + findDist(lca, b, 0);
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `Distance between two nodes = dist(LCA,a) + dist(LCA,b). First find the LCA. Then find the distance from LCA to each target node using DFS. The LCA is the closest common ancestor, so the path through it is the shortest path between the two nodes.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>The shortest path between any two nodes in a tree always passes through their Lowest Common Ancestor. So: distance(a, b) = distance(LCA, a) + distance(LCA, b).<br><br><strong>Algorithm Steps — findDist:</strong><br><code>if (!root) return -1;</code> — Node not found in this subtree.<br><br><code>if (root-&gt;val == target) return dist;</code> — Found the target. Return how far we have traveled from the starting point. The <code>dist</code> parameter counts edges as we descend.<br><br><code>int left = findDist(root-&gt;left, target, dist + 1);</code> — Search left subtree, incrementing distance by 1.<br><br><code>if (left != -1) return left;</code> — If found in left subtree, return immediately (no need to check right).<br><br><code>return findDist(root-&gt;right, target, dist + 1);</code> — Otherwise check right subtree.<br><br><strong>Algorithm Steps — minDistance:</strong><br>First find the LCA of nodes a and b using the standard LCA algorithm. Then call <code>findDist</code> twice from the LCA — once to a, once to b — starting with distance 0. Sum the two distances.<br><br><strong>Trace ([1,2,3,4,5], a=4, b=5):</strong><br>LCA is node 2. dist(2,4)=1, dist(2,5)=1. Total distance = 2.<br><br><strong>Complexity — Why O(n):</strong><br>Finding LCA is O(n), and each findDist call is O(n) worst case. Total O(n). Starting from LCA avoids overcounting edges above the meeting point.`
            }]
        },
        // ===== HARD =====
        {
            id: 'max-width-bt',
            title: 'Maximum Width of Binary Tree',
            difficulty: 'hard',
            description: `Given a binary tree, return the <strong>maximum width</strong> — the maximum number of nodes between the leftmost and rightmost non-null nodes at any level (including null nodes in between).<br><br>
Use positional indexing: root at index 0, left child at 2i+1, right child at 2i+2.`,
            testCases: [
                { input: 'root = [1,3,2,5,3,null,9]', output: '4', explanation: 'Level 2 has nodes 5,3,null,9 spanning indices 0 to 3. Width = 3 - 0 + 1 = 4.' },
                { input: 'root = [1,3,null,5,3]', output: '2', explanation: 'Level 2 has two nodes (5 and 3). Width = 2.' },
                { input: 'root = [1]', output: '1', explanation: 'Single node, width is 1.' }
            ],
            approaches: [{
                name: 'BFS with Indices',
                code: `int widthOfBinaryTree(TreeNode* root) {
    if (!root) return 0;
    int maxWidth = 0;
    queue<pair<TreeNode*, unsigned long long>> q;
    q.push({root, 0});
    while (!q.empty()) {
        int sz = q.size();
        unsigned long long minIdx = q.front().second;
        unsigned long long first, last;
        for (int i = 0; i < sz; i++) {
            auto [node, idx] = q.front(); q.pop();
            idx -= minIdx; // Normalize to prevent overflow
            if (i == 0) first = idx;
            if (i == sz - 1) last = idx;
            if (node->left) q.push({node->left, 2 * idx + 1});
            if (node->right) q.push({node->right, 2 * idx + 2});
        }
        maxWidth = max(maxWidth, (int)(last - first + 1));
    }
    return maxWidth;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                description: `Assign positional indices: root=0, left child=2i+1, right child=2i+2. Width at each level = rightmost index - leftmost index + 1 (including nulls between them). BFS with index tracking. Normalize indices per level by subtracting the minimum to prevent integer overflow in deep trees.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Treat the tree as if embedded in a complete binary tree. Root gets index 0. For any node at index <code>i</code>: left child = <code>2i + 1</code>, right child = <code>2i + 2</code>. The width at any level = rightmost index - leftmost index + 1, counting all positions including gaps.<br><br><strong>Algorithm Steps:</strong><br><code>q.push({root, 0});</code> — Start BFS with root at index 0.<br><br><code>unsigned long long minIdx = q.front().second;</code> — The leftmost index at the current level, used for normalization.<br><br><code>idx -= minIdx;</code> — Normalize indices by subtracting the level minimum. Without this, indices grow exponentially (2^depth), causing overflow even with 64-bit integers in deep, skewed trees.<br><br><code>if (i == 0) first = idx;</code> — Track the first (leftmost) normalized index.<br><code>if (i == sz - 1) last = idx;</code> — Track the last (rightmost) normalized index.<br><br><code>maxWidth = max(maxWidth, (int)(last - first + 1));</code> — Update the answer with this level's width.<br><br><strong>Trace ([1,3,2,5,null,null,9]):</strong><br>Level 0: [1] at idx 0, width=1. Level 1: [3,2] at idx 0,1, width=2. Level 2: [5,9] at normalized idx 0,3, width=4.<br><br><strong>Complexity — Why O(n):</strong><br>Each node is visited once via BFS. The queue holds at most O(n) nodes. Normalization prevents index overflow while preserving relative positions within each level.`
            }]
        },
        {
            id: 'morris-traversal',
            title: 'Morris Inorder Traversal',
            difficulty: 'hard',
            description: `Perform an <strong>inorder traversal</strong> of a binary tree using <strong>O(1) extra space</strong> — no recursion stack, no explicit stack.<br><br>
Morris traversal achieves this by temporarily creating "threads" (right pointers back to ancestors) and later removing them to restore the original tree structure.`,
            testCases: [
                { input: 'root = [1, null, 2, 3]', output: '[1, 3, 2]', explanation: 'Inorder: left(null)→1→left of 2 (which is 3)→2. Output: [1,3,2].' },
                { input: 'root = [4, 2, 6, 1, 3, 5, 7]', output: '[1, 2, 3, 4, 5, 6, 7]', explanation: 'BST inorder gives sorted order. Morris traversal produces the same result as recursive inorder.' },
                { input: 'root = [1]', output: '[1]', explanation: 'Single node has no left child, so value is recorded directly.' }
            ],
            approaches: [{
                name: 'Threaded Binary Tree',
                code: `vector<int> morrisInorder(TreeNode* root) {
    vector<int> result;
    TreeNode* curr = root;
    while (curr) {
        if (!curr->left) {
            result.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* pred = curr->left;
            while (pred->right && pred->right != curr)
                pred = pred->right;
            if (!pred->right) {
                pred->right = curr; // Create thread
                curr = curr->left;
            } else {
                pred->right = nullptr; // Remove thread
                result.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return result;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                description: `Achieves inorder traversal without stack or recursion. Key idea: before going left, find the inorder predecessor and create a temporary "thread" (right pointer) back to current node. When we return via the thread, we know the left subtree is done. Remove the thread to restore the tree. Each edge is visited at most twice → O(n).`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Standard inorder uses O(h) space (recursion stack or explicit stack). Morris achieves O(1) space by temporarily modifying the tree using "threads." For each node with a left child, the inorder predecessor's right pointer temporarily points back to the current node — acting as a return address.<br><br><strong>Algorithm Steps:</strong><br>Two cases when visiting a node with a left child:<br><br>1. <code>if (!pred-&gt;right)</code> — Predecessor's right is null: <em>first visit</em>. Create the thread (<code>pred-&gt;right = curr</code>), then move left (<code>curr = curr-&gt;left</code>).<br><br>2. <code>else</code> (pred->right == curr) — Thread already exists: <em>second visit</em>. The left subtree is fully processed. Remove the thread (<code>pred-&gt;right = nullptr</code>), record the current value, move right.<br><br>No left child: <code>if (!curr-&gt;left)</code> — No left subtree to process. Record the value immediately and move right (which may follow a thread back up).<br><br><strong>Trace ([4, 2, 6, 1, 3, 5, 7]):</strong><br>Start at 4. Has left child 2, predecessor of 4 is 3 (rightmost in left subtree). Thread 3→4 created. Move to 2. Predecessor of 2 is 1. Thread 1→2 created. Move to 1. No left child: record 1, follow thread to 2. Record 2, remove thread, move to 3. No left child: record 3, follow thread to 4. Record 4, etc. Result: [1,2,3,4,5,6,7].<br><br><strong>Complexity — Why O(n):</strong><br>Each edge is traversed at most twice (once to create a thread, once to remove it). The predecessor search across all nodes totals O(n) amortized. Trade-off: O(1) space but temporarily mutates the tree.`
            }]
        },
        {
            id: 'flatten-bt',
            title: 'Flatten Binary Tree to Linked List',
            difficulty: 'hard',
            description: `Given a binary tree, flatten it <strong>in-place</strong> into a right-skewed "linked list" following <strong>preorder</strong> order.<br><br>
After flattening, every node's <code>left</code> pointer should be <code>null</code> and <code>right</code> should point to the next node in preorder sequence.`,
            testCases: [
                { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]', explanation: 'Preorder: [1,2,3,4,5,6]. The tree becomes a right-only chain in this order.' },
                { input: 'root = [1, null, 2]', output: '[1, null, 2]', explanation: 'Already a right-skewed list. No change needed.' },
                { input: 'root = []', output: '[]', explanation: 'Empty tree remains empty.' }
            ],
            approaches: [{
                name: 'Reverse Postorder',
                code: `TreeNode* prev = nullptr;
void flatten(TreeNode* root) {
    if (!root) return;
    flatten(root->right);
    flatten(root->left);
    root->right = prev;
    root->left = nullptr;
    prev = root;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `Flatten to a right-skewed list in preorder. Process in reverse preorder (right, left, root). Maintain a prev pointer. Each node's right becomes prev, left becomes null. Building from the tail backward avoids losing references. The result is a linked list using right pointers in preorder sequence.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>If we process in preorder, we would overwrite <code>root-&gt;left</code> and <code>root-&gt;right</code> before visiting those subtrees — losing references. Instead, we process in <strong>reverse preorder</strong> (Right → Left → Root), building the list from the tail backward. By the time we modify a node, its children are already processed.<br><br><strong>Algorithm Steps:</strong><br><code>if (!root) return;</code> — Base case, nothing to flatten.<br><br><code>flatten(root-&gt;right);</code> — Process the right subtree first. After this call, everything in the right subtree is already flattened and linked via <code>prev</code>.<br><br><code>flatten(root-&gt;left);</code> — Process the left subtree next. Now <code>prev</code> points to the head of the flattened left subtree.<br><br><code>root-&gt;right = prev;</code> — Link this node's right pointer to whatever was processed most recently (the flattened left, or if no left, the flattened right).<br><br><code>root-&gt;left = nullptr;</code> — Clear the left pointer since we are building a right-only linked list.<br><br><code>prev = root;</code> — Update <code>prev</code> to this node. The next node processed (the parent) will point its right to us.<br><br><strong>Trace ([1,2,5,3,4,null,6]):</strong><br>Processing order is 6→5→4→3→2→1. After processing 6: prev=6. After 5: 5→6 (prev=5). After 4: 4→5 (prev=4). After 3: 3→4 (prev=3). After 2: 2→3 (prev=2). After 1: 1→2 (prev=1). Result: 1→2→3→4→5→6.<br><br><strong>Complexity — Why O(n):</strong><br>Every node visited exactly once. O(h) space for the recursion stack.`
            }]
        },
        {
            id: 'kth-ancestor',
            title: 'Kth Ancestor of a Node',
            difficulty: 'hard',
            description: `Given a binary tree, a <code>target</code> node value, and an integer <code>k</code>, return the value of the <strong>kth ancestor</strong> of the target node.<br><br>
The 1st ancestor is the parent, the 2nd ancestor is the grandparent, and so on. Return -1 if the kth ancestor does not exist.`,
            testCases: [
                { input: 'root = [1,2,3,4,5], target = 4, k = 2', output: '1', explanation: 'Parent of 4 is 2 (1st ancestor), parent of 2 is 1 (2nd ancestor). Answer: 1.' },
                { input: 'root = [1,2,3,4,5], target = 5, k = 1', output: '2', explanation: 'Parent of 5 is 2. The 1st ancestor is 2.' },
                { input: 'root = [1,2,3], target = 1, k = 1', output: '-1', explanation: 'Node 1 is the root and has no parent. The 1st ancestor does not exist.' }
            ],
            approaches: [{
                name: 'DFS with Backtracking',
                code: `int findKthAncestor(TreeNode* root, int target, int k) {
    // Returns distance to target, -1 if not found
    static int result;
    function<int(TreeNode*)> dfs = [&](TreeNode* node) -> int {
        if (!node) return -1;
        if (node->val == target) return 0;
        int left = dfs(node->left);
        int right = dfs(node->right);
        int dist = -1;
        if (left != -1) dist = left + 1;
        else if (right != -1) dist = right + 1;
        if (dist == k) result = node->val;
        return dist;
    };
    result = -1;
    dfs(root);
    return result;
}`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                description: `DFS to find the target node, then backtrack counting distance. When the target is found, return 0. Each parent adds 1 to the returned distance. When distance equals k, that node is the kth ancestor. Store the result globally since we're bubbling up through recursion.`,
                detailedWalkthrough: `<strong>Core Idea:</strong><br>Find the target via DFS, then count ancestors as we backtrack through the recursion stack. The kth node encountered during backtracking is the answer.<br><br><strong>Algorithm Steps:</strong><br><code>if (!node) return -1;</code> — Null node: target not found in this direction.<br><br><code>if (node-&gt;val == target) return 0;</code> — Found the target. Return distance 0. This starts the counting as we unwind the recursion.<br><br><code>int left = dfs(node-&gt;left);</code> / <code>int right = dfs(node-&gt;right);</code> — Search both subtrees for the target.<br><br><code>if (left != -1) dist = left + 1;</code> — If found in the left subtree, the current node is one step further from the target. Similarly for the right subtree.<br><br><code>if (dist == k) result = node-&gt;val;</code> — If our distance from the target equals k, this node is the kth ancestor. Store it in <code>result</code>.<br><br><code>return dist;</code> — Pass the distance upward so grandparent nodes can continue counting.<br><br><strong>Trace ([1,2,3,4,5], target=4, k=2):</strong><br>• DFS finds node 4 → returns 0<br>• Node 2 gets dist = 0+1 = 1 (not k=2)<br>• Node 1 gets dist = 1+1 = 2 → matches k=2, so result = 1.<br><br><strong>Complexity — Why O(n):</strong><br>Single DFS traversal. Each node visited at most once. A global result variable captures the answer deep in recursion without disrupting the return-value chain that tracks distances.`
            }]
        }
    ]
};
