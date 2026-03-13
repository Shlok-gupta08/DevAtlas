// =================================================================
//  DSA — Binary Search Trees (BST)
// =================================================================
export const bstData = {
    id: 'bst',
    name: 'Binary Search Trees',
    icon: '🌲',
    color: '#2dd4bf',
    questions: [
        // ===== EASY =====
        {
            id: 'bst-search-insert-delete',
            title: 'Search, Insert, Delete in BST',
            difficulty: 'easy',
            description: `Implement three core BST operations: <strong>Search</strong> (find a given key), <strong>Insert</strong> (add a new value while maintaining BST order), and <strong>Delete</strong> (remove a node and restructure the tree).<br><br>BST Property: For every node, all values in its left subtree are smaller, and all values in its right subtree are larger.`,
            testCases: [
                { input: 'BST = [5, 3, 8, 1, 4], search(4)', output: 'true', explanation: 'Start at 5 → 4 < 5 go left → at 3 → 4 > 3 go right → at 4, found.' },
                { input: 'BST = [5, 3, 8], insert(6)', output: '[5, 3, 8, null, null, 6]', explanation: '6 > 5 → go right to 8 → 6 < 8 → insert as left child of 8.' },
                { input: 'BST = [5, 3, 8, 1, 4], delete(3)', output: '[5, 4, 8, 1]', explanation: 'Node 3 has two children. Inorder successor is 4. Replace 3 with 4, delete 4 from right subtree.' }
            ],
            approaches: [
                {
                    name: 'Recursive',
                    code: `TreeNode* search(TreeNode* root, int key) {
    if (!root || root->val == key) return root;
    return key < root->val ? search(root->left, key) : search(root->right, key);
}
TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}
TreeNode* deleteNode(TreeNode* root, int key) {
    if (!root) return nullptr;
    if (key < root->val) root->left = deleteNode(root->left, key);
    else if (key > root->val) root->right = deleteNode(root->right, key);
    else {
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        TreeNode* succ = root->right;
        while (succ->left) succ = succ->left;
        root->val = succ->val;
        root->right = deleteNode(root->right, succ->val);
    }
    return root;
}`,
                    timeComplexity: 'O(h) — O(log n) balanced, O(n) skewed',
                    spaceComplexity: 'O(h)',
                    description: `Search: compare with root, go left if smaller, right if larger. Insert: search for position, create node at null spot. Delete: three cases — leaf (remove), one child (replace with child), two children (replace with inorder successor, delete successor from right subtree). BST property maintained throughout.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>All three operations exploit the BST ordering property: left subtree values &lt; node &lt; right subtree values. This lets us halve the search space at each step, like binary search on a tree.<br><br><strong>Algorithm Steps:</strong><br><strong>Search:</strong><br>Step 1 → If root is null or its value matches the key, return root.<br>Step 2 → If key &lt; root, recurse left. Otherwise recurse right.<br><br><strong>Insert:</strong><br>Step 1 → If root is null, create a new node — this is the correct position.<br>Step 2 → If val &lt; root, recurse left. Otherwise recurse right.<br>Step 3 → Return root so the parent's child pointer is updated.<br><br><strong>Delete:</strong><br>Step 1 → Locate the node by comparing key with root value.<br>Step 2 → <em>No left child:</em> return right child (bypass node).<br>Step 3 → <em>No right child:</em> return left child.<br>Step 4 → <em>Two children:</em> find inorder successor (smallest in right subtree — go right once, then left as far as possible). Copy successor's value into the target node, then recursively delete the successor from the right subtree.<br><br><strong>Trace (delete 3 from [5,3,8,1,4]):</strong><br>At root 5: 3 &lt; 5 → go left to node 3.<br>Node 3 has two children (1 and 4). Inorder successor = 4 (right child, no left).<br>Copy 4 into node 3's position. Delete 4 from right subtree → done.<br>Result: [5, 4, 8, 1].<br><br><strong>Complexity — Why O(h)?</strong><br>Each operation follows a single root-to-node path. Height h = O(log n) for balanced trees, O(n) for skewed trees (worst case).`
                }
            ]
        },
        {
            id: 'root-to-leaf',
            title: 'Root to Leaf Paths',
            difficulty: 'easy',
            description: `Given a binary tree, return all root-to-leaf paths. A <strong>leaf</strong> is a node with no children.<br><br>Each path should be represented as a list of node values from root to leaf.`,
            testCases: [
                { input: 'root = [1, 2, 3]', output: '[[1,2], [1,3]]', explanation: 'Two leaves: 2 and 3. Paths: root→left = [1,2], root→right = [1,3].' },
                { input: 'root = [1, 2, 3, 4, 5]', output: '[[1,2,4], [1,2,5], [1,3]]', explanation: 'Three leaves: 4, 5, 3. DFS finds all paths.' },
                { input: 'root = [1]', output: '[[1]]', explanation: 'Single node is both root and leaf. One path: [1].' }
            ],
            approaches: [
                {
                    name: 'DFS Backtracking',
                    code: `void paths(TreeNode* root, vector<int>& path, vector<vector<int>>& result) {
    if (!root) return;
    path.push_back(root->val);
    if (!root->left && !root->right) result.push_back(path);
    paths(root->left, path, result);
    paths(root->right, path, result);
    path.pop_back();
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    description: `DFS from root, maintaining current path. When a leaf is reached (no children), record the path. Backtrack by popping the last element after exploring both children. Each node is visited once.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Use the "choose, explore, un-choose" backtracking pattern. As we descend, we build a path vector. When we hit a leaf, we snapshot the current path. When we return from a subtree, we undo the choice (pop).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base case: if root is null, return (went past a leaf).<br>Step 2 → <strong>Choose:</strong> <code>path.push_back(root-&gt;val)</code> — add current node to path.<br>Step 3 → If this is a leaf (no children), copy path to result.<br>Step 4 → <strong>Explore:</strong> recurse into left and right children.<br>Step 5 → <strong>Un-choose:</strong> <code>path.pop_back()</code> — remove current node so the path is correct for sibling branches.<br><br><strong>Trace (tree = [1, 2, 3]):</strong><br>path = [1] → go left → path = [1,2] → leaf → record [1,2].<br>pop → path = [1] → go right → path = [1,3] → leaf → record [1,3].<br>pop → path = [1] → pop → path = [].<br>Result: [[1,2], [1,3]].<br><br><strong>Complexity — Why O(n)?</strong><br>Each node is visited exactly once. The push/pop pair per node is O(1). Copying a path at a leaf takes O(h), and there are at most n/2 leaves, but total copy work is bounded by O(n·h) in the worst case.`
                }
            ]
        },
        {
            id: 'min-dist-bst',
            title: 'Min Distance between BST Nodes',
            difficulty: 'easy',
            description: `Given a BST, find the <strong>minimum absolute difference</strong> between values of any two nodes in the tree.<br><br>Since it's a BST, the minimum difference must occur between two consecutive values in the inorder traversal (which yields a sorted sequence).`,
            testCases: [
                { input: 'root = [4, 2, 6, 1, 3]', output: '1', explanation: 'Inorder: [1,2,3,4,6]. Consecutive diffs: 1,1,1,2. Minimum is 1.' },
                { input: 'root = [1, null, 3, 2]', output: '1', explanation: 'Inorder: [1,2,3]. Consecutive diffs: 1,1. Minimum is 1.' },
                { input: 'root = [10, 5, 15]', output: '5', explanation: 'Inorder: [5,10,15]. Diffs: 5,5. Minimum is 5.' }
            ],
            approaches: [
                {
                    name: 'Inorder Traversal',
                    code: `int minDiffBST(TreeNode* root) {
    int minDiff = INT_MAX, prev = -1;
    function<void(TreeNode*)> inorder = [&](TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev != -1) minDiff = min(minDiff, node->val - prev);
        prev = node->val;
        inorder(node->right);
    };
    inorder(root);
    return minDiff;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    description: `Inorder traversal of BST gives sorted order. Minimum difference must be between consecutive elements in sorted order. Track the previous value during inorder traversal and compute differences. The smallest among all consecutive differences is the answer.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>An inorder traversal of a BST visits nodes in sorted (ascending) order. The minimum difference between any two nodes must occur between two consecutive values in this sorted sequence — skipping values can only produce larger gaps.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize <code>minDiff = INT_MAX</code> and <code>prev = -1</code> (sentinel for "no previous node yet").<br>Step 2 → Perform inorder traversal (left → root → right).<br>Step 3 → At each node, if prev exists, compute <code>node-&gt;val - prev</code> and update minDiff.<br>Step 4 → Update <code>prev = node-&gt;val</code> for the next comparison.<br><br><strong>Trace (root = [4, 2, 6, 1, 3]):</strong><br>Inorder visits: 1 (prev=-1, skip), 2 (diff=2-1=1, minDiff=1), 3 (diff=3-2=1), 4 (diff=4-3=1), 6 (diff=6-4=2).<br>Result: 1.<br><br><strong>Complexity — Why O(n)?</strong><br>Full inorder traversal visits every node once. Space is O(h) for the recursion stack where h is the tree height.`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'validate-bst',
            title: 'Validate Binary Search Tree',
            difficulty: 'medium',
            description: `Given a binary tree, determine if it is a valid BST. A valid BST requires that for every node, all values in the left subtree are <strong>strictly less</strong> and all values in the right subtree are <strong>strictly greater</strong>.<br><br>Simply checking left child &lt; node &lt; right child is <strong>not sufficient</strong> — you must consider all ancestors.`,
            testCases: [
                { input: 'root = [2, 1, 3]', output: 'true', explanation: '1 < 2, 3 > 2. All constraints satisfied.' },
                { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false', explanation: 'Node 4 is in right subtree of 5 but 4 < 5. Invalid.' },
                { input: 'root = [5, 4, 6, null, null, 3, 7]', output: 'false', explanation: 'Node 3 is in right subtree of 5 (via 6), but 3 < 5. Invalid.' }
            ],
            approaches: [
                {
                    name: 'Min/Max Range',
                    code: `bool isValidBST(TreeNode* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValidBST(root->left, minVal, root->val) &&
           isValidBST(root->right, root->val, maxVal);
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    description: `Pass an allowed range [min, max] to each node. Root: (-∞, ∞). Left child must be in (min, parent's val). Right child must be in (parent's val, max). If any node violates its range, not a valid BST. Using long prevents edge cases with INT_MIN/MAX node values.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Instead of only checking that left child &lt; parent &lt; right child (which only validates one level), propagate a valid range <code>[minVal, maxVal]</code> down the tree. Every node must fall strictly within its inherited range.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Start with range (-∞, +∞). Use <code>long</code> to handle INT_MIN/INT_MAX node values.<br>Step 2 → If root is null, return true (empty tree is valid BST).<br>Step 3 → If root's value ≤ minVal or ≥ maxVal, return false (violated range).<br>Step 4 → For the left subtree, tighten upper bound to root's value.<br>Step 5 → For the right subtree, tighten lower bound to root's value.<br><br><strong>Trace (root = [5, 1, 7, null, null, 4, 8]):</strong><br>Root 5: range (-∞, ∞) → valid.<br>Left 1: range (-∞, 5) → 1 in range → valid.<br>Right 7: range (5, ∞) → 7 in range → valid.<br>7's left child 4: range (5, 7) → 4 &lt; 5 → <strong>invalid</strong>. A naive local check would miss this because 4 &lt; 7 looks fine.<br><br><strong>Complexity — Why O(n)?</strong><br>Each node is visited once with O(1) work per node. The range propagation adds no extra cost.`
                }
            ]
        },
        {
            id: 'kth-smallest-bst',
            title: 'Kth Smallest Element in BST',
            difficulty: 'medium',
            description: `Given the root of a BST and an integer <strong>k</strong>, return the kth smallest value in the tree.<br><br>The key insight is that an inorder traversal of a BST visits nodes in ascending order.`,
            testCases: [
                { input: 'root = [3, 1, 4, null, 2], k = 1', output: '1', explanation: 'Inorder: [1,2,3,4]. 1st smallest = 1.' },
                { input: 'root = [5, 3, 6, 2, 4, null, null, 1], k = 3', output: '3', explanation: 'Inorder: [1,2,3,4,5,6]. 3rd smallest = 3.' },
                { input: 'root = [1, null, 2], k = 2', output: '2', explanation: 'Inorder: [1,2]. 2nd smallest = 2.' }
            ],
            approaches: [
                {
                    name: 'Inorder Traversal',
                    code: `int kthSmallest(TreeNode* root, int k) {
    int count = 0, result = 0;
    function<void(TreeNode*)> inorder = [&](TreeNode* node) {
        if (!node || count >= k) return;
        inorder(node->left);
        if (++count == k) { result = node->val; return; }
        inorder(node->right);
    };
    inorder(root);
    return result;
}`,
                    timeComplexity: 'O(h + k)',
                    spaceComplexity: 'O(h)',
                    description: `Inorder traversal visits BST nodes in ascending order. Count nodes as we visit them. When count reaches k, we've found the kth smallest. Early termination: stop once k is found. Average case visits h + k nodes (h to reach leftmost, then k inorder steps).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Inorder traversal of a BST yields elements in ascending order. The kth node visited in an inorder walk is the kth smallest — no sorting needed.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize count = 0 and result = 0.<br>Step 2 → Recurse left (smaller values first).<br>Step 3 → At current node, increment count. If count == k, record value and return.<br>Step 4 → Guard: <code>count &gt;= k</code> at the start prunes unnecessary exploration.<br>Step 5 → Recurse right (only if k hasn't been reached).<br><br><strong>Trace (root = [3, 1, 4, null, 2], k = 1):</strong><br>Go left to 1 → go left to null → back at 1: count=1, k=1 → result = 1, return.<br>Early termination: never visit nodes 2, 3, or 4.<br><br><strong>Complexity — Why O(h + k)?</strong><br>We descend h levels to reach the leftmost node, then visit at most k nodes inorder. For k=1 (minimum), only the leftmost path is traversed — O(h). For k=n, the entire tree is traversed — O(n).`
                }
            ]
        },
        {
            id: 'lca-bst',
            title: 'Lowest Common Ancestor in BST',
            difficulty: 'medium',
            description: `Given a BST and two nodes <strong>p</strong> and <strong>q</strong>, find their <strong>Lowest Common Ancestor</strong> (LCA) — the deepest node that is an ancestor of both p and q.<br><br>The BST property makes this much simpler than for a general binary tree.`,
            testCases: [
                { input: 'root = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 8', output: '6', explanation: '2 < 6 and 8 > 6 → they split at root 6, which is the LCA.' },
                { input: 'root = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 4', output: '2', explanation: '4 is in the subtree of 2. The LCA is 2 itself.' },
                { input: 'root = [6, 2, 8, 0, 4, 7, 9], p = 7, q = 9', output: '8', explanation: 'Both 7 and 9 are greater than 6, both in right subtree. At 8: 7 < 8, 9 > 8 → split → LCA is 8.' }
            ],
            approaches: [
                {
                    name: 'BST Property',
                    code: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val) root = root->left;
        else if (p->val > root->val && q->val > root->val) root = root->right;
        else return root;
    }
    return nullptr;
}`,
                    timeComplexity: 'O(h)',
                    spaceComplexity: 'O(1)',
                    description: `In a BST, if both p and q are smaller than root, LCA is in the left subtree. If both larger, it's in the right subtree. If they're on different sides (or one equals root), root is the LCA. Iterative approach uses O(1) space. Much simpler than general binary tree LCA.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>The BST ordering property means we can determine which subtree contains p and q just by comparing values. The LCA is the first node where p and q "split" into different subtrees.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Compare both p and q values with root.<br>Step 2 → If both are smaller, both are in the left subtree → move left.<br>Step 3 → If both are larger, both are in the right subtree → move right.<br>Step 4 → Otherwise, this is the split point — root is the LCA. This covers three scenarios: (a) p left and q right, (b) root equals p, (c) root equals q.<br><br><strong>Trace (root = [6,2,8,0,4,7,9], p=2, q=8):</strong><br>At 6: p=2 &lt; 6 but q=8 &gt; 6 → split → return 6.<br><br>Another trace (p=2, q=4):<br>At 6: both 2 &lt; 6 and 4 &lt; 6 → go left to 2.<br>At 2: p=2 == root and q=4 &gt; 2 → split → return 2.<br><br><strong>Complexity — Why O(h) time, O(1) space?</strong><br>We follow a single root-to-LCA path. The iterative approach avoids recursion stack overhead, using constant space.`
                }
            ]
        },
        {
            id: 'sorted-arr-to-bst',
            title: 'Sorted Array to Balanced BST',
            difficulty: 'medium',
            description: `Given a sorted array in ascending order, convert it into a <strong>height-balanced BST</strong> — a BST where the depth of the two subtrees of every node never differs by more than 1.`,
            testCases: [
                { input: 'nums = [-10, -3, 0, 5, 9]', output: '[0, -3, 9, -10, null, 5]', explanation: 'Middle element 0 becomes root. Left half [-10,-3] and right half [5,9] form balanced subtrees.' },
                { input: 'nums = [1, 3]', output: '[3, 1] or [1, null, 3]', explanation: 'Either element can be root when array has even length.' },
                { input: 'nums = [1, 2, 3, 4, 5, 6, 7]', output: '[4, 2, 6, 1, 3, 5, 7]', explanation: 'Perfect binary tree: mid=4, left subtree from [1,2,3], right from [5,6,7].' }
            ],
            approaches: [
                {
                    name: 'Recursive Mid-point',
                    code: `TreeNode* sortedArrayToBST(vector<int>& nums, int left, int right) {
    if (left > right) return nullptr;
    int mid = left + (right - left) / 2;
    TreeNode* root = new TreeNode(nums[mid]);
    root->left = sortedArrayToBST(nums, left, mid - 1);
    root->right = sortedArrayToBST(nums, mid + 1, right);
    return root;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(log n)',
                    description: `Choose the middle element as root — guarantees equal-sized subtrees for a balanced tree. Recursively build left subtree from left half and right subtree from right half. Each element becomes a node exactly once. The resulting BST has minimum possible height ⌊log n⌋.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Choosing the middle element of a sorted subarray as root guarantees roughly equal numbers of elements on each side, producing a balanced (minimum-height) tree. This is a classic divide-and-conquer strategy.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base case: <code>left &gt; right</code> → return null (empty subarray).<br>Step 2 → Compute mid index using overflow-safe formula: <code>left + (right - left) / 2</code>.<br>Step 3 → Create a node with <code>nums[mid]</code> as root.<br>Step 4 → Build left subtree from <code>[left, mid-1]</code> (all smaller values).<br>Step 5 → Build right subtree from <code>[mid+1, right]</code> (all larger values).<br><br><strong>Trace (nums = [1,2,3,4,5,6,7]):</strong><br>mid = 3 → root = 4.<br>Left: [1,2,3] → mid=1 → root=2. Left: [1] → leaf 1. Right: [3] → leaf 3.<br>Right: [5,6,7] → mid=5 → root=6. Left: [5] → leaf 5. Right: [7] → leaf 7.<br>Result: perfectly balanced BST with height 2.<br><br><strong>Complexity — Why O(n) time, O(log n) space?</strong><br>Each element is processed once (O(n) time). Recursion depth equals the tree height = O(log n), which is also the space used by the call stack.`
                }
            ]
        },
        {
            id: 'bst-iterator',
            title: 'BST Iterator',
            difficulty: 'medium',
            description: `Implement an iterator over a BST that returns elements in <strong>ascending order</strong>. The iterator should support:<br><br>• <code>next()</code> — returns the next smallest element.<br>• <code>hasNext()</code> — returns whether there are more elements.<br><br>Both operations should run in <strong>O(1) amortized</strong> time and O(h) space.`,
            testCases: [
                { input: 'BST = [7, 3, 15, null, null, 9, 20], next(), next(), hasNext()', output: '3, 7, true', explanation: 'Inorder: [3,7,9,15,20]. First two next() calls return 3 and 7. hasNext() is true.' },
                { input: 'BST = [3, 1, 4], next(), next(), next(), hasNext()', output: '1, 3, 4, false', explanation: 'Three elements, three next() calls exhaust them. hasNext() returns false.' },
                { input: 'BST = [1], next(), hasNext()', output: '1, false', explanation: 'Single element tree. One next() returns 1, then hasNext() is false.' }
            ],
            approaches: [
                {
                    name: 'Controlled Inorder via Stack',
                    code: `class BSTIterator {
    stack<TreeNode*> st;
    void pushLeft(TreeNode* node) {
        while (node) { st.push(node); node = node->left; }
    }
public:
    BSTIterator(TreeNode* root) { pushLeft(root); }
    int next() {
        TreeNode* node = st.top(); st.pop();
        pushLeft(node->right);
        return node->val;
    }
    bool hasNext() { return !st.empty(); }
};`,
                    timeComplexity: 'O(1) amortized per next()',
                    spaceComplexity: 'O(h)',
                    description: `Simulate inorder traversal using an explicit stack. Push all left children initially. next(): pop top (smallest unvisited), push left children of its right child. This lazily processes the inorder successor on demand. Stack never holds more than h nodes (tree height). Each node enters and leaves the stack once → O(1) amortized.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A normal inorder traversal runs to completion. Here we need to "pause" after each node and resume on demand. An explicit stack replaces the implicit call stack, giving us that control.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>pushLeft(root)</code>: push root and all its left descendants onto the stack. After this, stack top = smallest element.<br>Step 2 → <code>next()</code>: pop the top (current smallest). If the popped node has a right child, push that child and its entire left chain onto the stack. Return the popped value.<br>Step 3 → <code>hasNext()</code>: simply check if stack is non-empty.<br><br><strong>Trace (BST = [7, 3, 15, null, null, 9, 20]):</strong><br>Init: pushLeft(7) → stack = [7, 3]. Top = 3 (smallest).<br>next() → pop 3, no right child → return 3. Stack: [7].<br>next() → pop 7, pushLeft(15) → stack = [15, 9]. Return 7.<br>next() → pop 9, no right child → return 9. Stack: [15].<br>next() → pop 15, pushLeft(20) → stack = [20]. Return 15.<br>next() → pop 20 → return 20. Stack empty.<br><br><strong>Complexity — Why O(1) amortized?</strong><br>Each node is pushed once and popped once across all <code>next()</code> calls. A single call might push multiple nodes, but the total pushes across n calls is exactly n. Average cost per call = O(n)/n = O(1).`
                }
            ]
        },

        // ===== HARD =====
        {
            id: 'bst-from-preorder',
            title: 'Construct BST from Preorder',
            difficulty: 'hard',
            description: `Given a preorder traversal sequence of a BST, reconstruct the original BST.<br><br>In preorder, the root appears first, followed by all left subtree nodes, then all right subtree nodes. Use the BST property to determine where the left subtree ends.`,
            testCases: [
                { input: 'preorder = [8, 5, 1, 7, 10, 12]', output: '[8, 5, 10, 1, 7, null, 12]', explanation: 'Root=8. Left subtree (values < 8): [5,1,7]. Right subtree (values > 8): [10,12].' },
                { input: 'preorder = [1, 2, 3]', output: '[1, null, 2, null, 3]', explanation: 'Each value > previous → right-skewed BST.' },
                { input: 'preorder = [3, 1, 2]', output: '[3, 1, null, null, 2]', explanation: 'Root=3, left child=1, right child of 1 = 2.' }
            ],
            approaches: [
                {
                    name: 'Upper Bound Approach',
                    code: `TreeNode* build(vector<int>& pre, int& idx, int bound) {
    if (idx >= pre.size() || pre[idx] > bound) return nullptr;
    TreeNode* root = new TreeNode(pre[idx++]);
    root->left = build(pre, idx, root->val);
    root->right = build(pre, idx, bound);
    return root;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Preorder processes root before children. Maintain an upper bound for valid BST values. Left child's bound = parent's value. Right child inherits parent's bound. If next preorder value exceeds the bound, return null (that value belongs to an ancestor's right subtree). O(n) single-pass construction.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>In preorder, the root comes first, then left subtree nodes, then right subtree nodes. We reconstruct the tree in a single pass by using an upper bound to determine when a value no longer belongs to the current subtree.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>int&amp; idx</code> is a shared index passed by reference — each value is consumed exactly once.<br>Step 2 → If idx is out of bounds or the next value exceeds the bound, return null — this value belongs to an ancestor's right subtree.<br>Step 3 → Create a node from <code>pre[idx++]</code>.<br>Step 4 → Build left subtree with bound = root's value (left children must be smaller).<br>Step 5 → Build right subtree with bound = parent's bound (right children must respect ancestor constraints).<br><br><strong>Trace (preorder = [8, 5, 1, 7, 10, 12]):</strong><br>Root=8 (bound=∞). Left: root=5 (bound=8).<br>  Left of 5: root=1 (bound=5). Left/right of 1: both null (no more values &lt; 5).<br>  Right of 5: root=7 (bound=8). Left/right of 7: null.<br>Right of 8: root=10 (bound=∞). Right: root=12 (bound=∞). Done.<br><br><strong>Complexity — Why O(n)?</strong><br>Each element is processed exactly once (idx increments from 0 to n-1). No searching or partitioning needed — the upper bound naturally determines subtree boundaries.`
                }
            ]
        },
        {
            id: 'merge-bsts',
            title: 'Merge Two Binary Search Trees',
            difficulty: 'hard',
            description: `Given two BSTs, merge them into a single <strong>balanced BST</strong> containing all elements from both trees.<br><br>The approach uses three phases: extract sorted arrays via inorder traversal, merge the arrays, build a balanced BST from the merged array.`,
            testCases: [
                { input: 'BST1 = [2, 1, 3], BST2 = [5, 4, 6]', output: '[3, 1, 5, null, 2, 4, 6]', explanation: 'Inorder arrays: [1,2,3] and [4,5,6]. Merged: [1,2,3,4,5,6]. Mid=3 → balanced BST.' },
                { input: 'BST1 = [1], BST2 = [2]', output: '[1, null, 2] or [2, 1]', explanation: 'Merged array [1,2]. Either element can be root.' },
                { input: 'BST1 = [3, 1, 5], BST2 = [2, null, 4]', output: 'Balanced BST with [1,2,3,4,5]', explanation: 'Merged sorted array: [1,2,3,4,5]. Mid=3 → root. Balanced result.' }
            ],
            approaches: [
                {
                    name: 'Inorder + Merge + Build',
                    code: `void inorder(TreeNode* root, vector<int>& arr) {
    if (!root) return;
    inorder(root->left, arr);
    arr.push_back(root->val);
    inorder(root->right, arr);
}
TreeNode* build(vector<int>& arr, int l, int r) {
    if (l > r) return nullptr;
    int mid = (l + r) / 2;
    TreeNode* node = new TreeNode(arr[mid]);
    node->left = build(arr, l, mid - 1);
    node->right = build(arr, mid + 1, r);
    return node;
}
TreeNode* mergeBSTs(TreeNode* r1, TreeNode* r2) {
    vector<int> a1, a2;
    inorder(r1, a1); inorder(r2, a2);
    // Merge sorted arrays
    vector<int> merged;
    int i = 0, j = 0;
    while (i < a1.size() && j < a2.size())
        merged.push_back(a1[i] <= a2[j] ? a1[i++] : a2[j++]);
    while (i < a1.size()) merged.push_back(a1[i++]);
    while (j < a2.size()) merged.push_back(a2[j++]);
    return build(merged, 0, merged.size() - 1);
}`,
                    timeComplexity: 'O(m + n)',
                    spaceComplexity: 'O(m + n)',
                    description: `Get sorted arrays from both BSTs via inorder traversal. Merge these two sorted arrays (like merge sort's merge). Build a balanced BST from the merged sorted array using the mid-point recursive approach. Total: O(m+n) time and space.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Three distinct phases, each optimal for its task: inorder extraction gives sorted arrays, two-pointer merge combines them, and mid-point build creates a balanced BST.<br><br><strong>Algorithm Steps:</strong><br><strong>Phase 1 — Extract sorted arrays:</strong><br>Inorder traversal of each BST produces a sorted array. This leverages the BST property directly.<br><br><strong>Phase 2 — Merge sorted arrays:</strong><br>Two-pointer technique (identical to merge sort's merge step): compare <code>a1[i]</code> and <code>a2[j]</code>, take the smaller one, advance that pointer. O(m+n) time.<br><br><strong>Phase 3 — Build balanced BST:</strong><br>Pick middle element as root, recurse on left and right halves. Guarantees minimum-height output.<br><br><strong>Trace (BST1 = [1,3,5], BST2 = [2,4,6]):</strong><br>Inorder arrays: [1,3,5] and [2,4,6].<br>Merge: 1&lt;2→[1], 3&gt;2→[1,2], 3&lt;4→[1,2,3], 5&gt;4→[1,2,3,4], 5&lt;6→[1,2,3,4,5], remainder→[1,2,3,4,5,6].<br>Build: mid=3 → root 3, left from [1,2] (root 1), right from [4,5,6] (root 5).<br><br><strong>Complexity — Why O(m + n)?</strong><br>Each of the three phases is O(m+n). Inserting one BST's nodes into the other would cost O(n·h) — significantly worse.`
                }
            ]
        },
        {
            id: 'recover-bst',
            title: 'Recover BST (Swapped Nodes)',
            difficulty: 'hard',
            description: `Two nodes in a BST were <strong>swapped by mistake</strong>. Recover the tree by swapping them back, without changing the tree structure.<br><br>The key observation: inorder traversal of a valid BST is strictly sorted. Swapped nodes create one or two "inversions" in this sequence.`,
            testCases: [
                { input: 'root = [1, 3, null, null, 2]', output: '[3, 1, null, null, 2]', explanation: 'Swapped nodes: 1 and 3. Inorder [3,1,2] has inversion at 3>1. Swap back.' },
                { input: 'root = [3, 1, 4, null, null, 2]', output: '[2, 1, 4, null, null, 3]', explanation: 'Swapped 2 and 3. Inorder [1,3,2,4] → inversions: 3>2. first=3, second=2. Swap.' },
                { input: 'root = [2, 3, 1]', output: '[2, 1, 3]', explanation: 'Swapped 1 and 3. Inorder [3,2,1]: inversions at 3>2 and 2>1. first=3, second=1. Swap.' }
            ],
            approaches: [
                {
                    name: 'Inorder + Detect Swaps',
                    code: `void recoverTree(TreeNode* root) {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    function<void(TreeNode*)> inorder = [&](TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev && prev->val > node->val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        inorder(node->right);
    };
    inorder(root);
    swap(first->val, second->val);
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    description: `Two nodes are swapped in a BST. Inorder should be sorted. Find violations where prev > current. First violation: first = prev. Second violation (or same one if adjacent): second = current. There will be exactly one or two adjacent violations. Swap the values of first and second to fix the BST.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A valid BST's inorder traversal is strictly sorted. If exactly two nodes are swapped, one or two "inversions" (places where <code>prev &gt; current</code>) appear in the inorder sequence. Identifying the two swapped nodes from these inversions lets us fix the tree with a single swap.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Perform inorder traversal, tracking <code>prev</code> (last visited node).<br>Step 2 → When <code>prev-&gt;val &gt; node-&gt;val</code> (inversion found):<br>  - First inversion: <code>first = prev</code> (the larger misplaced value).<br>  - Always set <code>second = node</code> (the smaller misplaced value).<br>Step 3 → After traversal, swap values of first and second.<br><br><strong>Trace (correct = [1,2,3,4,5], swapped 2↔4 = [1,4,3,2,5]):</strong><br>Inorder: 1, 4, 3, 2, 5.<br>At 4→3: inversion! first=4, second=3.<br>At 3→2: inversion! second updated to 2.<br>Swap 4↔2 → fixed: [1,2,3,4,5].<br><br><strong>Why adjacent swaps produce one inversion:</strong><br>If [1,<strong>3</strong>,<strong>2</strong>,4] — only one inversion (3&gt;2). first=3, second=2. Swap fixes it.<br><br><strong>Complexity — Why O(n)?</strong><br>Single inorder traversal visits every node once. The swap at the end is O(1).`
                }
            ]
        },
        {
            id: 'largest-bst-subtree',
            title: 'Size of Largest BST in Binary Tree',
            difficulty: 'hard',
            description: `Given a binary tree (not necessarily a BST), find the size of the <strong>largest subtree</strong> that is a valid BST.<br><br>Use a bottom-up approach: each node reports whether its subtree is a valid BST, along with size, min, and max values.`,
            testCases: [
                { input: 'root = [10, 5, 15, 1, 8, null, 7]', output: '3', explanation: 'Subtree rooted at 5 (nodes 5,1,8) is a valid BST of size 3. Node 15 has 7 in right subtree which is < 15 → invalid.' },
                { input: 'root = [5, 2, 4, 1, 3]', output: '2', explanation: 'Left subtree [2,1,3] is a BST of size 3. But 4 < 5 in right subtree breaks BST at root. Largest BST subtree: [2,1,3] with size 3.' },
                { input: 'root = [3, 2, 4, 1]', output: '4', explanation: 'The entire tree is a valid BST. Size = 4.' }
            ],
            approaches: [
                {
                    name: 'Bottom-up Validation',
                    code: `struct Info { int size, min, max; bool isBST; };
Info largestBST(TreeNode* root, int& maxSize) {
    if (!root) return {0, INT_MAX, INT_MIN, true};
    auto left = largestBST(root->left, maxSize);
    auto right = largestBST(root->right, maxSize);
    if (left.isBST && right.isBST &&
        root->val > left.max && root->val < right.min) {
        int sz = left.size + right.size + 1;
        maxSize = max(maxSize, sz);
        return {sz, min(root->val, left.min), max(root->val, right.max), true};
    }
    return {0, 0, 0, false};
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    description: `Bottom-up: each node returns {size, min, max, isBST} of its subtree. A subtree rooted at node is a valid BST if: left subtree is BST, right subtree is BST, node > left.max, node < right.min. If valid, combine sizes. Track the maximum BST size found. Null nodes return {0, INT_MAX, INT_MIN, true} as valid empty BSTs.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Each node computes and returns an <code>Info</code> struct containing everything a parent needs to check the BST property. By working bottom-up, we avoid redundant re-validation — each subtree is checked exactly once.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Null nodes return <code>{0, INT_MAX, INT_MIN, true}</code>. Sentinel values ensure any parent's value satisfies <code>val &gt; INT_MIN</code> (left.max) and <code>val &lt; INT_MAX</code> (right.min).<br>Step 2 → Recursively compute info for left and right subtrees.<br>Step 3 → Check: <code>left.isBST && right.isBST && root-&gt;val &gt; left.max && root-&gt;val &lt; right.min</code>.<br>Step 4 → If valid: combine sizes, update maxSize, return combined info with updated min/max.<br>Step 5 → If invalid: return <code>{0, 0, 0, false}</code>. Any ancestor including this subtree will also fail.<br><br><strong>Trace (root = [10, 5, 15, 1, 8, null, 7]):</strong><br>Leaves 1, 8, 7 → valid BSTs of size 1.<br>Node 5: left.max=1 &lt; 5 &lt; right.min=8 → valid BST, size=3, maxSize=3.<br>Node 15: left is null (valid), right is 7. 15 &gt; null's max (INT_MIN) but 15 is NOT &lt; 7 → invalid. right.min=7 &lt; 15 fails.<br>Node 10: right subtree invalid → root invalid. maxSize stays 3.<br><br><strong>Complexity — Why O(n)?</strong><br>Each node is visited once, performing O(1) comparisons. Total: O(n).`
                }
            ]
        }
    ]
};
