// =================================================================
//  DSA — Heaps / Priority Queues
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['heaps'] = {
    id: 'heaps',
    name: 'Heaps / Priority Queues',
    icon: '⛰️',
    color: '#e879f9',
    questions: [
        // ===== EASY =====
        {
            id: 'heap-impl',
            title: 'Heap Implementation (Insert, Delete, Peek)',
            difficulty: 'easy',
            description: `Implement a <strong>Min Heap</strong> using an array with three operations:<br>• <code>insert(val)</code> — add a value, maintaining heap property<br>• <code>peek()</code> — return the minimum without removing it<br>• <code>extractMin()</code> — remove and return the minimum<br><br>A heap is a complete binary tree where each parent is ≤ its children (min-heap).`,
            testCases: [
                { input: 'insert(5), insert(3), insert(8), peek()', output: '3', explanation: 'Min heap: 3 is at the root (smallest element).' },
                { input: 'insert(5), insert(3), extractMin(), peek()', output: '5', explanation: 'extractMin removes 3. Next minimum is 5.' },
                { input: 'insert(10), insert(20), insert(5), extractMin(), extractMin()', output: '10', explanation: 'Extract 5, then 10. Second extractMin returns 10.' }
            ],
            approaches: [
                {
                    name: 'Array-based Min Heap',
                    code: `class MinHeap {
    vector<int> heap;
    void heapifyUp(int i) {
        while (i > 0 && heap[(i-1)/2] > heap[i]) {
            swap(heap[(i-1)/2], heap[i]);
            i = (i - 1) / 2;
        }
    }
    void heapifyDown(int i) {
        int n = heap.size(), smallest = i;
        int l = 2*i+1, r = 2*i+2;
        if (l < n && heap[l] < heap[smallest]) smallest = l;
        if (r < n && heap[r] < heap[smallest]) smallest = r;
        if (smallest != i) { swap(heap[i], heap[smallest]); heapifyDown(smallest); }
    }
public:
    void insert(int val) { heap.push_back(val); heapifyUp(heap.size()-1); }
    int peek() { return heap[0]; }
    int extractMin() {
        int val = heap[0]; heap[0] = heap.back(); heap.pop_back();
        if (!heap.empty()) heapifyDown(0);
        return val;
    }
};`,
                    timeComplexity: 'O(log n) insert/delete, O(1) peek',
                    spaceComplexity: 'O(n)',
                    description: `Heap is a complete binary tree stored as an array. Parent at index i, children at 2i+1 and 2i+2. Insert adds at end and bubbles up. ExtractMin replaces root with last element and bubbles down. Complete binary tree ensures O(log n) height.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Store a complete binary tree in an array. For node at index i: parent = (i-1)/2, left child = 2i+1, right child = 2i+2. No pointers needed.<br><br><strong>heapifyUp(i):</strong><br>After inserting at the end, the new element might be smaller than its parent. Repeatedly swap it upward until the heap property is restored. Each swap moves up one level → at most O(log n) swaps.<br><br><strong>heapifyDown(i):</strong><br>After replacing the root with the last element, it might be too large. Compare with both children, swap with the <strong>smaller</strong> child. Repeat downward. Picking the smaller child ensures the new root of the subtree satisfies the min-heap property.<br><br><strong>Trace (insert 5, 3, 8):</strong><br>Insert 5: heap=[5].<br>Insert 3: heap=[5,3]. heapifyUp: 3 &lt; 5 → swap → [3,5].<br>Insert 8: heap=[3,5,8]. 8 &gt; 3 → no swap needed.<br>peek() = 3 (root).<br><br><strong>Complexity — Why O(log n)?</strong><br>A complete binary tree with n nodes has height ⌊log₂ n⌋. Both heapifyUp and heapifyDown traverse at most this many levels.`
                }
            ]
        },
        {
            id: 'heap-sort',
            title: 'Heap Sort Algorithm',
            difficulty: 'easy',
            description: `Sort an array using a <strong>max heap</strong>. Build the heap in-place, then repeatedly extract the maximum and place it at the end. O(n log n) guaranteed, in-place, but not stable.`,
            testCases: [
                { input: 'arr = [4, 10, 3, 5, 1]', output: '[1, 3, 4, 5, 10]', explanation: 'Build max heap, then extract max elements to the end.' },
                { input: 'arr = [5, 4, 3, 2, 1]', output: '[1, 2, 3, 4, 5]', explanation: 'Reverse sorted array. Max heap built, then sorted.' },
                { input: 'arr = [1]', output: '[1]', explanation: 'Single element is already sorted.' }
            ],
            approaches: [
                {
                    name: 'In-place Heap Sort',
                    code: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) { swap(arr[i], arr[largest]); heapify(arr, n, largest); }
}
void heapSort(vector<int>& arr) {
    int n = arr.size();
    // Build max heap
    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);
    // Extract elements
    for (int i = n-1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(1)',
                    description: `Phase 1: Build a max heap from the array using bottom-up heapify (O(n)). Phase 2: Repeatedly swap the root (maximum) with the last unsorted element and reduce heap size. Heapify the new root. After all extractions, array is sorted ascending. In-place with O(1) extra space.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A max heap puts the largest element at the root. Swap it to the end (its final sorted position), shrink the heap by 1, and restore the heap. Repeat until the heap is empty — the array is sorted.<br><br><strong>Phase 1 — Build max heap:</strong><br><code>for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i)</code><br>Start from the last non-leaf node (n/2-1) and heapify downward. Leaves are trivially valid heaps. Working bottom-up ensures children are valid heaps before fixing the parent. This is O(n) — not O(n log n) — because most nodes are near the bottom and do minimal work.<br><br><strong>Phase 2 — Sort:</strong><br><code>swap(arr[0], arr[i])</code> — Max element goes to its final position at index i.<br><code>heapify(arr, i, 0)</code> — Restore heap property for the remaining i elements.<br><br><strong>Trace (arr = [4, 10, 3, 5, 1]):</strong><br>Build heap: [10, 5, 3, 4, 1].<br>Swap 10↔1: [1,5,3,4,10]. Heapify → [5,4,3,1,|10].<br>Swap 5↔1: [1,4,3,|5,10]. Heapify → [4,1,3,|5,10].<br>Swap 4↔3: [3,1,|4,5,10]. Heapify → [3,1,|4,5,10].<br>Swap 3↔1: [1,|3,4,5,10]. Done: [1,3,4,5,10].<br><br><strong>Complexity — Why O(n log n)?</strong><br>Build heap: O(n). Extraction: n-1 heapify calls, each O(log n). Total: O(n log n). Always guaranteed (no worst case like quicksort).`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'k-nearest',
            title: 'Nearby Cars (K Nearest Points to Origin)',
            difficulty: 'medium',
            description: `Given an array of points on a 2D plane and an integer k, find the <strong>k closest points</strong> to the origin (0, 0). Distance is measured using Euclidean distance (but we compare squared distances to avoid sqrt).`,
            testCases: [
                { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]', explanation: 'Distances²: 18, 26, 20. Two closest: (3,3) and (-2,4).' },
                { input: 'points = [[1,0],[0,1]], k = 1', output: '[[1,0]] or [[0,1]]', explanation: 'Both have distance 1. Either is valid.' },
                { input: 'points = [[0,0],[1,1],[2,2]], k = 2', output: '[[0,0],[1,1]]', explanation: 'Distances²: 0, 2, 8. Two closest: (0,0) and (1,1).' }
            ],
            approaches: [
                {
                    name: 'Max Heap of Size K',
                    code: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    // Max heap: keep k smallest distances
    auto cmp = [](vector<int>& a, vector<int>& b) {
        return a[0]*a[0]+a[1]*a[1] < b[0]*b[0]+b[1]*b[1];
    };
    priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> pq(cmp);
    for (auto& p : points) {
        pq.push(p);
        if (pq.size() > k) pq.pop();
    }
    vector<vector<int>> result;
    while (!pq.empty()) { result.push_back(pq.top()); pq.pop(); }
    return result;
}`,
                    timeComplexity: 'O(n log k)',
                    spaceComplexity: 'O(k)',
                    description: `Maintain a max heap of size k. For each point, push it. If heap exceeds k, pop the farthest (max distance). After processing all points, heap contains k closest. Using max heap ensures we can efficiently remove the farthest among our k candidates.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>We want the k smallest distances. A max heap of size k keeps the largest distance at the top. When a new point is closer than the farthest in our heap, it replaces it. After processing all points, only the k closest remain.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Push each point onto the max heap (ordered by squared distance).<br>Step 2 → If heap size exceeds k, pop the top (farthest point).<br>Step 3 → After all points processed, heap contains exactly k closest.<br><br><strong>Why max heap instead of min heap?</strong><br>A min heap would require inserting all n points (O(n log n) to build, equivalent to sorting). A max heap of size k evicts the farthest point at each step, keeping only k elements. Each operation costs O(log k), and n operations give O(n log k). When k ≪ n, this is significantly faster.<br><br><strong>Trace (points: [3,3],[5,-1],[-2,4], k=2):</strong><br>Push (3,3) dist²=18. Heap: [(3,3)].<br>Push (5,-1) dist²=26. Heap: [(5,-1),(3,3)]. Size=2=k, no pop.<br>Push (-2,4) dist²=20. Heap: [(5,-1),(3,3),(-2,4)]. Size=3 &gt; k → pop max (5,-1).<br>Result: [(3,3),(-2,4)].<br><br><strong>Complexity — Why O(n log k)?</strong><br>n insertions/pops on a heap of size ≤ k. Each costs O(log k). Total: O(n log k).`
                }
            ]
        },
        {
            id: 'connect-ropes',
            title: 'Connect N Ropes with Minimum Cost',
            difficulty: 'medium',
            description: `Given n ropes of different lengths, connect them into one rope. The cost to connect two ropes is the <strong>sum of their lengths</strong>. Find the minimum total cost to connect all ropes.`,
            testCases: [
                { input: 'ropes = [4, 3, 2, 6]', output: '29', explanation: 'Connect 2+3=5 (cost 5). Connect 4+5=9 (cost 14). Connect 6+9=15 (cost 29).' },
                { input: 'ropes = [1, 2, 3]', output: '9', explanation: 'Connect 1+2=3 (cost 3). Connect 3+3=6 (cost 9).' },
                { input: 'ropes = [5, 5]', output: '10', explanation: 'Only one connection needed: 5+5=10.' }
            ],
            approaches: [
                {
                    name: 'Min Heap',
                    code: `int minCostRopes(vector<int>& ropes) {
    priority_queue<int, vector<int>, greater<int>> pq(ropes.begin(), ropes.end());
    int cost = 0;
    while (pq.size() > 1) {
        int first = pq.top(); pq.pop();
        int second = pq.top(); pq.pop();
        cost += first + second;
        pq.push(first + second);
    }
    return cost;
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    description: `Always connect the two shortest ropes first. Use a min heap to efficiently get the two smallest. Connect them (cost = sum), push the result back. Repeat until one rope remains. Connecting short ropes early reduces the number of times their lengths contribute to future costs.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>When you connect two ropes, that combined rope participates in ALL future connections. Longer ropes connected early accumulate more cost in subsequent operations. Therefore, always connect the two shortest ropes first.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Build a min heap from all rope lengths.<br>Step 2 → While more than one rope: extract two smallest, connect them (add their sum to cost), push combined rope back.<br>Step 3 → Return total cost.<br><br><strong>Trace (ropes = [4, 3, 2, 6]):</strong><br>Heap: [2, 3, 4, 6].<br>Connect 2+3=5, cost=5. Heap: [4, 5, 6].<br>Connect 4+5=9, cost=14. Heap: [6, 9].<br>Connect 6+9=15, cost=29. Heap: [15]. Done.<br>Total cost = 29.<br><br>If we had connected 4+6=10 first instead: cost=10, then 3+10=13, cost=23, then 2+13=15, cost=38. Much worse! Short ropes first is optimal.<br><br><strong>Complexity — Why O(n log n)?</strong><br>Building heap: O(n). n-1 iterations, each with two pops and one push: O(log n) each. Total: O(n log n).`
                }
            ]
        },
        {
            id: 'weakest-soldiers',
            title: 'Weakest Soldier Rows',
            difficulty: 'medium',
            description: `Given a binary matrix where each row represents a company of soldiers (1s before 0s), find the <strong>k weakest rows</strong> (fewest soldiers). If two rows have the same count, the one with the smaller index is weaker.`,
            testCases: [
                { input: 'mat = [[1,1,0],[1,0,0],[1,1,1],[0,0,0]], k=2', output: '[3, 1]', explanation: 'Soldiers: [2,1,3,0]. Weakest: row 3 (0), row 1 (1).' },
                { input: 'mat = [[1,0],[1,1],[0,0]], k=1', output: '[2]', explanation: 'Soldiers: [1,2,0]. Weakest: row 2 (0 soldiers).' },
                { input: 'mat = [[1,1],[1,1]], k=2', output: '[0, 1]', explanation: 'Same count (2 each). Smaller index first.' }
            ],
            approaches: [
                {
                    name: 'Max Heap of Size K',
                    code: `vector<int> kWeakestRows(vector<vector<int>>& mat, int k) {
    auto cmp = [](pair<int,int>& a, pair<int,int>& b) {
        return a.first < b.first || (a.first == b.first && a.second < b.second);
    };
    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
    for (int i = 0; i < mat.size(); i++) {
        int soldiers = 0;
        for (int v : mat[i]) if (v == 1) soldiers++; else break;
        pq.push({soldiers, i});
        if (pq.size() > k) pq.pop();
    }
    vector<int> result(k);
    for (int i = k-1; i >= 0; i--) { result[i] = pq.top().second; pq.pop(); }
    return result;
}`,
                    timeComplexity: 'O(m × n + m log k)',
                    spaceComplexity: 'O(k)',
                    description: `Count soldiers per row (1s at the beginning). Use a max heap of size k to keep the k weakest. Compare by soldier count, then by row index. After processing all rows, extract from heap in reverse order. The max heap evicts the strongest row when it exceeds size k.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>We want k rows with the fewest soldiers. A max heap of size k keeps the "strongest" (most soldiers / highest index) at the top. When the heap exceeds k, we pop the strongest — effectively keeping only the k weakest.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → For each row, count soldiers (1s at the start).<br>Step 2 → Push {soldiers, rowIndex} onto max heap.<br>Step 3 → If heap size &gt; k, pop the top (strongest row).<br>Step 4 → Extract remaining k elements in reverse order (heap gives strongest first).<br><br><strong>Comparator:</strong><br><code>a.first &lt; b.first</code> — rows with MORE soldiers go to the top (to be popped).<br><code>a.first == b.first && a.second &lt; b.second</code> — same soldier count → higher index goes to top (weaker = smaller index survives).<br><br><strong>Trace (mat = [[1,1,0],[1,0,0],[1,1,1],[0,0,0]], k=2):</strong><br>Row 0: 2 soldiers. Push (2,0). Heap: [(2,0)].<br>Row 1: 1 soldier. Push (1,1). Heap: [(2,0),(1,1)].<br>Row 2: 3 soldiers. Push (3,2). Size=3 &gt; k=2 → pop (3,2). Heap: [(2,0),(1,1)].<br>Row 3: 0 soldiers. Push (0,3). Size=3 → pop (2,0). Heap: [(1,1),(0,3)].<br>Extract reverse: [3, 1].<br><br><strong>Complexity — Why O(m × n + m log k)?</strong><br>Counting soldiers: O(m × n). Heap operations: O(m log k).`
                }
            ]
        }
    ]
};
