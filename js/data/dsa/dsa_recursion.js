// =================================================================
//  DSA — Recursion & Backtracking
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['recursion-backtracking'] = {
    id: 'recursion-backtracking',
    name: 'Recursion & Backtracking',
    icon: '🔁',
    color: '#fb923c',
    questions: [
        // ===== EASY =====
        {
            id: 'fibonacci',
            title: 'Fibonacci Numbers',
            difficulty: 'easy',
            description: `<p>Given an integer <strong>n</strong>, return the n-th Fibonacci number. The Fibonacci sequence is defined as F(0)&nbsp;=&nbsp;0, F(1)&nbsp;=&nbsp;1, and F(n)&nbsp;=&nbsp;F(n−1)&nbsp;+&nbsp;F(n−2) for n&nbsp;≥&nbsp;2.</p>`,
            testCases: [
                { input: 'n = 5', output: '5', explanation: 'F(5) = F(4) + F(3) = 3 + 2 = 5. Sequence: 0, 1, 1, 2, 3, 5.' },
                { input: 'n = 0', output: '0', explanation: 'F(0) = 0 by definition.' },
                { input: 'n = 10', output: '55', explanation: 'Sequence up to index 10: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.' }
            ],
            approaches: [
                {
                    name: 'Recursion + Memoization',
                    code: `int fib(int n, vector<int>& dp) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];
    return dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Plain recursion recomputes the same subproblems exponentially. Memoization stores each result in a dp array so every subproblem is solved exactly once, reducing time from O(2^n) to O(n) at the cost of O(n) space.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Plain recursion is O(2^n) due to overlapping subproblems. Memoization stores computed results in an array so each subproblem is solved only once.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Create a dp array of size n+1, initialized to -1.</li>
  <li>Base cases: F(0) = 0, F(1) = 1 — return n directly.</li>
  <li>Before computing F(n), check if dp[n] != -1. If so, return the cached value.</li>
  <li>Otherwise compute dp[n] = fib(n-1) + fib(n-2), store and return.</li>
</ol>

<p><strong>Trace (n = 5):</strong></p>
<pre>
fib(5) → fib(4) + fib(3)
fib(4) → fib(3) + fib(2)
fib(3) → fib(2) + fib(1)
fib(2) → fib(1) + fib(0) = 1 + 0 = 1  → dp[2] = 1
fib(3) → 1 + 1 = 2  → dp[3] = 2
fib(4) → 2 + dp[2]=1 = 3  → dp[4] = 3   (dp[2] already cached)
fib(5) → 3 + dp[3]=2 = 5  → dp[5] = 5   (dp[3] already cached)
</pre>

<p><strong>Complexity — Why O(n):</strong> Each subproblem from 0 to n is computed exactly once and cached. The recursion visits each index at most once, giving O(n) time and O(n) space for the memo table plus the recursion stack.</p>`
                },
                {
                    name: 'Space Optimized Iterative',
                    code: `int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Since F(n) depends only on the previous two values, a full array is unnecessary. Two rolling variables track F(n-1) and F(n-2), achieving O(1) space while building up iteratively from the base cases.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Since F(n) depends only on the two preceding values, there is no need to store the entire array. Two variables suffice.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Handle base cases: if n ≤ 1, return n.</li>
  <li>Initialize prev2 = 0 (F(0)) and prev1 = 1 (F(1)).</li>
  <li>Iterate from i = 2 to n: curr = prev1 + prev2, then shift variables forward.</li>
  <li>After the loop, prev1 holds F(n).</li>
</ol>

<p><strong>Trace (n = 5):</strong></p>
<pre>
Start: prev2=0, prev1=1
i=2: curr=1+0=1, prev2=1, prev1=1
i=3: curr=1+1=2, prev2=1, prev1=2
i=4: curr=2+1=3, prev2=2, prev1=3
i=5: curr=3+2=5, prev2=3, prev1=5
Return 5
</pre>

<p><strong>Complexity — Why O(1) space:</strong> Only two variables are maintained regardless of n. The loop runs n−1 times, giving O(n) time with O(1) space.</p>`
                }
            ]
        },
        {
            id: 'tiling-problem',
            title: 'Tiling Problem',
            difficulty: 'easy',
            description: `<p>Given a 2×n board and 1×2 tiles, find the number of ways to fill the entire board. Tiles can be placed horizontally or vertically.</p>`,
            testCases: [
                { input: 'n = 4', output: '5', explanation: 'The 5 tilings of a 2×4 board: VVVV, VHH, HHV, HVHV-style combinations.' },
                { input: 'n = 1', output: '1', explanation: 'Only one way: place a single vertical tile.' },
                { input: 'n = 3', output: '3', explanation: 'Three arrangements: VVV, VHH, HHV.' }
            ],
            approaches: [
                {
                    name: 'DP / Fibonacci Pattern',
                    code: `int tilingWays(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Each column either gets a vertical tile (reducing to n-1) or pairs with the next column for two horizontal tiles (reducing to n-2). This gives the Fibonacci recurrence ways(n) = ways(n-1) + ways(n-2), solvable with two rolling variables.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> For the n-th column, either place one vertical tile (reducing the problem to 2×(n−1)) or place two horizontal tiles (reducing to 2×(n−2)). This gives the recurrence ways(n) = ways(n−1) + ways(n−2), which is the Fibonacci pattern.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Base cases: ways(1) = 1, ways(2) = 2.</li>
  <li>Iterate from 3 to n, computing curr = prev1 + prev2.</li>
  <li>Shift variables forward each iteration.</li>
</ol>

<p><strong>Trace (n = 4):</strong></p>
<pre>
Start: prev2=1, prev1=2
i=3: curr=2+1=3, prev2=2, prev1=3
i=4: curr=3+2=5, prev2=3, prev1=5
Return 5
</pre>

<p><strong>Complexity — Why O(n):</strong> Single pass from 3 to n. Only two variables maintained, so O(1) space.</p>`
                }
            ]
        },
        {
            id: 'friends-pairing',
            title: 'Friends Pairing Problem',
            difficulty: 'easy',
            description: `<p>Given <strong>n</strong> friends, each one can either remain single or be paired with another friend. Each friend can be paired only once. Find the total number of ways friends can remain single or be paired.</p>`,
            testCases: [
                { input: 'n = 3', output: '4', explanation: 'Friends {1,2,3}: {1},{2},{3} | {1,2},{3} | {1,3},{2} | {1},{2,3} → 4 ways.' },
                { input: 'n = 2', output: '2', explanation: 'Either both single {1},{2}, or paired {1,2} → 2 ways.' },
                { input: 'n = 4', output: '10', explanation: 'f(4) = f(3) + 3×f(2) = 4 + 6 = 10.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int friendsPairing(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + (i - 1) * prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Person n either stays single (f(n-1) ways for the rest) or pairs with one of n-1 others (each leaving f(n-2) arrangements). The recurrence f(n) = f(n-1) + (n-1)*f(n-2) captures both choices and is computed with two rolling variables.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Person n has two choices — stay single (leaving f(n−1) arrangements for the rest) or pair with any of the (n−1) other people (leaving f(n−2) arrangements for those remaining). This gives f(n) = f(n−1) + (n−1) × f(n−2).</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Base cases: f(1) = 1, f(2) = 2.</li>
  <li>For each i from 3 to n: curr = prev1 + (i−1) × prev2.</li>
  <li>Shift prev2 and prev1 forward.</li>
</ol>

<p><strong>Trace (n = 4):</strong></p>
<pre>
Start: prev2=1, prev1=2
i=3: curr = 2 + 2×1 = 4,  prev2=2, prev1=4
i=4: curr = 4 + 3×2 = 10, prev2=4, prev1=10
Return 10
</pre>

<p><strong>Complexity — Why O(n):</strong> Single loop from 3 to n, each step doing constant work with two variables.</p>`
                }
            ]
        },
        {
            id: 'binary-strings-no-consec-1',
            title: 'Binary Strings (No Consecutive 1s)',
            difficulty: 'easy',
            description: `<p>Count the number of binary strings of length <strong>n</strong> such that no two consecutive characters are '1'.</p>`,
            testCases: [
                { input: 'n = 3', output: '5', explanation: 'Valid strings: 000, 001, 010, 100, 101 → 5 strings.' },
                { input: 'n = 1', output: '2', explanation: 'Strings: "0" and "1".' },
                { input: 'n = 4', output: '8', explanation: '0000, 0001, 0010, 0100, 0101, 1000, 1001, 1010 → 8 strings.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int binaryStrings(int n) {
    int endZero = 1, endOne = 1; // For length 1
    for (int i = 2; i <= n; i++) {
        int newZero = endZero + endOne; // 0 can follow 0 or 1
        int newOne = endZero;           // 1 can only follow 0
        endZero = newZero;
        endOne = newOne;
    }
    return endZero + endOne;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Track strings ending in 0 and strings ending in 1 separately. Appending 0 is always valid, but appending 1 is only valid after a 0. This two-variable DP avoids consecutive 1s while counting all valid binary strings of length n.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Track two categories separately — strings ending in 0 and strings ending in 1. A '0' can follow either ending, but a '1' can only follow a '0' (to prevent consecutive 1s).</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>For length 1: endZero = 1 ("0"), endOne = 1 ("1").</li>
  <li>For each length i from 2 to n:
    <ul>
      <li>newZero = endZero + endOne (append '0' to any string).</li>
      <li>newOne = endZero (append '1' only to strings ending in '0').</li>
    </ul>
  </li>
  <li>Answer = endZero + endOne.</li>
</ol>

<p><strong>Trace (n = 3):</strong></p>
<pre>
Length 1: endZero=1, endOne=1, total=2
Length 2: endZero=1+1=2, endOne=1, total=3
Length 3: endZero=2+1=3, endOne=2, total=5
Return 5
</pre>

<p><strong>Complexity — Why O(n):</strong> One pass from 2 to n, O(1) work per step. This is equivalent to computing the (n+2)-th Fibonacci number.</p>`
                }
            ]
        },
        // ===== MEDIUM =====
        {
            id: 'print-subsets',
            title: 'Print All Subsets / Subsets II',
            difficulty: 'medium',
            description: `<p>Given an integer array <strong>nums</strong> (which may contain duplicates), return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the subsets in any order.</p>`,
            testCases: [
                { input: 'nums = [1, 2, 3]', output: '[[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]', explanation: 'All 2^3 = 8 subsets of {1,2,3}.' },
                { input: 'nums = [1, 2, 2]', output: '[[], [1], [1,2], [1,2,2], [2], [2,2]]', explanation: 'Duplicates are skipped at the same recursion level to avoid repeated subsets.' },
                { input: 'nums = [0]', output: '[[], [0]]', explanation: 'Single element: empty set and the element itself.' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `void subsets(vector<int>& nums, int idx, vector<int>& curr, vector<vector<int>>& result) {
    result.push_back(curr);
    for (int i = idx; i < nums.size(); i++) {
        if (i > idx && nums[i] == nums[i - 1]) continue; // Skip duplicates
        curr.push_back(nums[i]);
        subsets(nums, i + 1, curr, result);
        curr.pop_back();
    }
}

vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> curr;
    subsets(nums, 0, curr, result);
    return result;
}`,
                    timeComplexity: 'O(n × 2^n)',
                    spaceComplexity: 'O(n) — recursion depth',
                    description: `At each index, decide include or exclude to generate all subsets. Sort first for duplicate handling: if consecutive elements are equal and the previous was not included, skip the current to avoid duplicate subsets. Every node in the recursion tree yields a valid subset.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> At each index, decide whether to include the current element. The backtracking framework adds the current partial subset to the result at every node of the recursion tree, then explores further elements.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Sort the array (needed for duplicate handling).</li>
  <li>At each recursive call, push the current subset into the result.</li>
  <li>Loop from idx to n−1: include nums[i], recurse with i+1, then pop (backtrack).</li>
  <li>Skip duplicates: if i &gt; idx and nums[i] == nums[i−1], skip to avoid generating the same subset again.</li>
</ol>

<p><strong>Trace (nums = [1, 2, 2]):</strong></p>
<pre>
Start: curr=[] → add []
  i=0: curr=[1]  → add [1]
    i=1: curr=[1,2] → add [1,2]
      i=2: curr=[1,2,2] → add [1,2,2] → pop → [1,2]
    pop → [1]
    i=2: nums[2]==nums[1] and 2>1 → SKIP
  pop → []
  i=1: curr=[2] → add [2]
    i=2: curr=[2,2] → add [2,2] → pop → [2]
  pop → []
  i=2: nums[2]==nums[1] and 2>1 → SKIP
Result: [[], [1], [1,2], [1,2,2], [2], [2,2]]
</pre>

<p><strong>Complexity — Why O(n × 2^n):</strong> There are 2^n subsets, and copying each takes up to O(n). The duplicate-skip pruning reduces work for arrays with duplicates but worst case remains the same.</p>`
                }
            ]
        },
        {
            id: 'permutations',
            title: 'Permutations of an Array/String',
            difficulty: 'medium',
            description: `<p>Given an array <strong>nums</strong> of distinct integers, return all the possible permutations in any order.</p>`,
            testCases: [
                { input: 'nums = [1, 2, 3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', explanation: '3! = 6 permutations of three distinct elements.' },
                { input: 'nums = [0, 1]', output: '[[0,1],[1,0]]', explanation: '2! = 2 permutations.' },
                { input: 'nums = [1]', output: '[[1]]', explanation: 'Only one permutation for a single element.' }
            ],
            approaches: [
                {
                    name: 'Backtracking with Swap',
                    code: `void permute(vector<int>& nums, int idx, vector<vector<int>>& result) {
    if (idx == nums.size()) {
        result.push_back(nums);
        return;
    }
    for (int i = idx; i < nums.size(); i++) {
        swap(nums[idx], nums[i]);
        permute(nums, idx + 1, result);
        swap(nums[idx], nums[i]); // backtrack
    }
}`,
                    timeComplexity: 'O(n! × n)',
                    spaceComplexity: 'O(n) — recursion depth',
                    description: `Fix each element at position idx by swapping it with every candidate from idx to n-1. After recursing for the next position, swap back to restore the original order. This generates all n! permutations without extra data structures.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Fix each element at position idx by swapping it with every element from idx to n−1. Recurse for the next position, then swap back to restore the original order before trying the next candidate.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>If idx equals the array length, a complete permutation is formed — add it to the result.</li>
  <li>For each i from idx to n−1:
    <ul>
      <li>Swap nums[idx] with nums[i].</li>
      <li>Recurse with idx + 1.</li>
      <li>Swap back (backtrack) to restore state.</li>
    </ul>
  </li>
</ol>

<p><strong>Trace (nums = [1, 2, 3], idx = 0):</strong></p>
<pre>
idx=0, i=0: swap(0,0) → [1,2,3]
  idx=1, i=1: swap(1,1) → [1,2,3]
    idx=2, i=2: → record [1,2,3]
  idx=1, i=2: swap(1,2) → [1,3,2]
    idx=2 → record [1,3,2]
  swap back → [1,2,3]
idx=0, i=1: swap(0,1) → [2,1,3]
  ... generates [2,1,3], [2,3,1]
idx=0, i=2: swap(0,2) → [3,2,1]
  ... generates [3,2,1], [3,1,2]
</pre>

<p><strong>Complexity — Why O(n! × n):</strong> There are n! permutations. Each permutation requires O(n) to copy into the result. The recursion tree has n! leaves with depth n, so O(n) stack space.</p>`
                }
            ]
        },
        {
            id: 'combination-sum',
            title: 'Combination Sum Problem',
            difficulty: 'medium',
            description: `<p>Given an array of <strong>distinct</strong> integers <strong>candidates</strong> and a target integer <strong>target</strong>, return all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen an unlimited number of times. Return combinations in any order.</p>`,
            testCases: [
                { input: 'candidates = [2, 3, 6, 7], target = 7', output: '[[2,2,3],[7]]', explanation: '2+2+3 = 7 and 7 = 7 are the only valid combinations.' },
                { input: 'candidates = [2, 3, 5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]', explanation: 'Three unique combinations that sum to 8.' },
                { input: 'candidates = [2], target = 1', output: '[]', explanation: 'No combination of 2s can sum to 1.' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `void solve(vector<int>& candidates, int target, int idx,
           vector<int>& curr, vector<vector<int>>& result) {
    if (target == 0) { result.push_back(curr); return; }
    for (int i = idx; i < candidates.size(); i++) {
        if (candidates[i] > target) break;
        curr.push_back(candidates[i]);
        solve(candidates, target - candidates[i], i, curr, result); // i, not i+1 (reuse allowed)
        curr.pop_back();
    }
}

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> curr;
    solve(candidates, target, 0, curr, result);
    return result;
}`,
                    timeComplexity: 'O(2^target) approximately',
                    spaceComplexity: 'O(target) — max recursion depth',
                    description: `Sort candidates for early termination. Try including each candidate from the current index onwards, allowing reuse (same index passed recursively). Subtract from the remaining target and prune when a candidate exceeds it.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Sort the candidates for early termination. At each level, try including each candidate from the current index onwards. Pass the same index i (not i+1) since elements can be reused. Subtract the chosen value from the target and prune when a candidate exceeds the remaining target.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Sort candidates.</li>
  <li>If target == 0, record the current combination.</li>
  <li>For each candidate from index idx: if it exceeds target, break (sorted order guarantees no further candidate will fit).</li>
  <li>Add the candidate, recurse with reduced target and same index, then pop (backtrack).</li>
</ol>

<p><strong>Trace (candidates = [2,3,6,7], target = 7):</strong></p>
<pre>
solve(target=7, idx=0)
  pick 2 → solve(target=5, idx=0)
    pick 2 → solve(target=3, idx=0)
      pick 2 → solve(target=1, idx=0) → 2>1? No, but then 2>1 → break
      pick 3 → solve(target=0) → record [2,2,3] ✓
    pick 3 → solve(target=2, idx=1) → 3>2 → break
  pick 3 → solve(target=4, idx=1)
    pick 3 → solve(target=1, idx=1) → 3>1 → break
  pick 6 → solve(target=1, idx=2) → 6>1 → break
  pick 7 → solve(target=0) → record [7] ✓
Result: [[2,2,3],[7]]
</pre>

<p><strong>Complexity — Why O(2^target):</strong> In the worst case, the smallest candidate is 1, leading to a recursion tree of depth target. Each node branches into multiple candidates, but pruning via sorting limits the branching factor significantly in practice.</p>`
                }
            ]
        },
        {
            id: 'palindrome-partitioning',
            title: 'Palindrome Partitioning Problem',
            difficulty: 'medium',
            description: `<p>Given a string <strong>s</strong>, partition it such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of s.</p>`,
            testCases: [
                { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]', explanation: '"a"|"a"|"b" and "aa"|"b" are the two valid palindrome partitions.' },
                { input: 's = "a"', output: '[["a"]]', explanation: 'Single character is always a palindrome.' },
                { input: 's = "aba"', output: '[["a","b","a"],["aba"]]', explanation: 'Either split all characters or take the whole string (which is a palindrome).' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `bool isPalindrome(string& s, int l, int r) {
    while (l < r) if (s[l++] != s[r--]) return false;
    return true;
}

void solve(string& s, int idx, vector<string>& curr, vector<vector<string>>& result) {
    if (idx == s.size()) { result.push_back(curr); return; }
    for (int end = idx; end < s.size(); end++) {
        if (isPalindrome(s, idx, end)) {
            curr.push_back(s.substr(idx, end - idx + 1));
            solve(s, end + 1, curr, result);
            curr.pop_back();
        }
    }
}`,
                    timeComplexity: 'O(n × 2^n)',
                    spaceComplexity: 'O(n)',
                    description: `Try every possible cut position from the current index. Extend the substring one character at a time, checking if it forms a palindrome. When it does, add it to the current partition and recurse from the next position. Backtrack to explore all valid partitions.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Try every possible first-cut position. For each starting index, extend the substring and check if it forms a palindrome. If it does, add the substring to the current partition and recurse from the position right after it.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>If idx reaches the end of the string, a valid partition is complete — record it.</li>
  <li>For end from idx to n−1: extract substring s[idx..end].</li>
  <li>Check if the substring is a palindrome (two-pointer check).</li>
  <li>If palindrome, push it, recurse from end+1, then pop (backtrack).</li>
  <li>Non-palindromic substrings are simply skipped, pruning that branch.</li>
</ol>

<p><strong>Trace (s = "aab"):</strong></p>
<pre>
idx=0:
  end=0: "a" palindrome → curr=["a"]
    idx=1, end=1: "a" palindrome → curr=["a","a"]
      idx=2, end=2: "b" palindrome → curr=["a","a","b"] → record ✓
    idx=1, end=2: "ab" not palindrome → skip
  end=1: "aa" palindrome → curr=["aa"]
    idx=2, end=2: "b" palindrome → curr=["aa","b"] → record ✓
  end=2: "aab" not palindrome → skip
Result: [["a","a","b"], ["aa","b"]]
</pre>

<p><strong>Complexity — Why O(n × 2^n):</strong> There are O(2^(n−1)) possible partition points. Each partition requires O(n) to verify palindromes and copy substrings. The palindrome check prunes many branches in practice.</p>`
                }
            ]
        },
        {
            id: 'grid-ways',
            title: 'Grid Ways / Unique Paths',
            difficulty: 'medium',
            description: `<p>A robot is located at the top-left corner of an <strong>m × n</strong> grid. It can only move right or down at each step. Count the number of unique paths from the top-left to the bottom-right corner.</p>`,
            testCases: [
                { input: 'm = 3, n = 7', output: '28', explanation: 'C(8, 2) = 28. The robot needs 2 downs and 6 rights.' },
                { input: 'm = 3, n = 2', output: '3', explanation: 'Three paths: DDR, DRD, RDD.' },
                { input: 'm = 1, n = 1', output: '1', explanation: 'Already at the destination.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j - 1];
    return dp[n - 1];
}`,
                    timeComplexity: 'O(m × n)',
                    spaceComplexity: 'O(n)',
                    description: `Paths to cell (i,j) equals paths from above plus paths from the left. A 1D dp array represents the current row; updating left-to-right accumulates path counts since dp[j] += dp[j-1] incorporates both directions in a single pass per row.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> From (0,0) to (m−1, n−1), movement is restricted to right and down. The number of paths to cell (i, j) = paths to (i−1, j) + paths to (i, j−1). The first row and first column always have exactly 1 path each.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Initialize a 1D array dp of size n, all set to 1 (first row).</li>
  <li>For each row i from 1 to m−1: for each column j from 1 to n−1, dp[j] += dp[j−1].</li>
  <li>Here dp[j] (before update) represents the cell above, and dp[j−1] (after update) represents the cell to the left.</li>
  <li>Return dp[n−1].</li>
</ol>

<p><strong>Trace (m = 3, n = 3):</strong></p>
<pre>
Init: dp = [1, 1, 1]
Row 1: dp[1] += dp[0] → 2, dp[2] += dp[1] → 3  →  dp = [1, 2, 3]
Row 2: dp[1] += dp[0] → 3, dp[2] += dp[1] → 6  →  dp = [1, 3, 6]
Return 6
</pre>

<p><strong>Complexity — Why O(m × n):</strong> Two nested loops over m rows and n columns. Space is reduced from O(m×n) to O(n) by reusing a single row array.</p>`
                },
                {
                    name: 'Combinatorics',
                    code: `int uniquePaths(int m, int n) {
    // Need (m-1) downs and (n-1) rights = C(m+n-2, m-1)
    long long result = 1;
    for (int i = 1; i <= m - 1; i++) {
        result = result * (n - 1 + i) / i;
    }
    return (int)result;
}`,
                    timeComplexity: 'O(min(m, n))',
                    spaceComplexity: 'O(1)',
                    description: `The grid path problem is equivalent to choosing which moves are "down" from a total of (m+n-2) moves. The answer is C(m+n-2, m-1), computed iteratively with multiply-then-divide to stay within integer bounds.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> The robot must make exactly (m−1) down moves and (n−1) right moves, for a total of (m+n−2) moves. The number of distinct orderings is C(m+n−2, m−1) — choosing which of the total moves are "down".</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Total moves = m + n − 2. Need to choose m − 1 of them as "down".</li>
  <li>Compute C(m+n−2, m−1) iteratively: multiply and divide to avoid overflow.</li>
  <li>result = result × (n−1+i) / i for i from 1 to m−1.</li>
</ol>

<p><strong>Trace (m = 3, n = 3):</strong></p>
<pre>
C(4, 2) = ?
i=1: result = 1 × 3 / 1 = 3
i=2: result = 3 × 4 / 2 = 6
Return 6
</pre>

<p><strong>Complexity — Why O(min(m, n)):</strong> The loop runs m−1 times (or can be optimized to min(m−1, n−1)). No array storage needed — O(1) space. Much faster than DP for large grids.</p>`
                }
            ]
        },
        // ===== HARD =====
        {
            id: 'n-queens',
            title: 'N-Queens Problem',
            difficulty: 'hard',
            description: `<p>Place <strong>n</strong> queens on an <strong>n × n</strong> chessboard so that no two queens threaten each other. No two queens can share the same row, column, or diagonal. Return all distinct solutions.</p>`,
            testCases: [
                { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: 'Two valid placements exist for a 4×4 board.' },
                { input: 'n = 1', output: '[["Q"]]', explanation: 'Trivial case: single queen on a 1×1 board.' },
                { input: 'n = 8', output: '92 solutions', explanation: 'The classic 8-queens puzzle has exactly 92 distinct solutions.' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `bool isSafe(vector<string>& board, int row, int col, int n) {
    // Check column above
    for (int i = 0; i < row; i++)
        if (board[i][col] == 'Q') return false;
    // Check upper-left diagonal
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] == 'Q') return false;
    // Check upper-right diagonal
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
        if (board[i][j] == 'Q') return false;
    return true;
}

void solve(vector<string>& board, int row, int n, vector<vector<string>>& result) {
    if (row == n) { result.push_back(board); return; }
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 'Q';
            solve(board, row + 1, n, result);
            board[row][col] = '.'; // backtrack
        }
    }
}`,
                    timeComplexity: 'O(n!)',
                    spaceComplexity: 'O(n²)',
                    description: `Place queens row by row, trying every column. Before placement, verify the cell is safe by checking the column and both diagonals above. If safe, place and recurse to the next row. If no column works on a given row, backtrack to the previous row.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Place queens row by row. For each row, try every column. Before placing, verify the cell is safe — no other queen occupies the same column or either diagonal above. If safe, place and recurse to the next row. If no column works, backtrack.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Start with an empty n×n board (all '.').</li>
  <li>For each row, try columns 0 to n−1.</li>
  <li>isSafe checks: column above, upper-left diagonal, upper-right diagonal. Only upward checks are needed since rows below are unfilled.</li>
  <li>If safe, place 'Q', recurse to row+1. On return, reset to '.' (backtrack).</li>
  <li>When row == n, all queens placed successfully — record the board.</li>
</ol>

<p><strong>Trace (n = 4, finding first solution):</strong></p>
<pre>
Row 0: try col 0 → safe → place Q at (0,0)
  Row 1: col 0 (column conflict), col 1 (diagonal), col 2 → safe → Q at (1,2)
    Row 2: all cols conflict → backtrack
  Row 1: col 3 → safe → Q at (1,3)
    Row 2: col 1 → safe → Q at (2,1)
      Row 3: all cols conflict → backtrack
    Row 2: col 2 (column conflict from row 1)
    → backtrack to row 0
Row 0: col 1 → safe → Q at (0,1)
  Row 1: col 3 → safe → Q at (1,3)
    Row 2: col 0 → safe → Q at (2,0)
      Row 3: col 2 → safe → Q at (3,2) → record solution ✓
</pre>

<p><strong>Complexity — Why O(n!):</strong> Row 0 has n choices, row 1 has at most n−1 safe columns, row 2 at most n−2, etc. This gives roughly n! combinations in the worst case. Safety checks take O(n) per cell. Total: O(n! × n), though pruning makes it much faster in practice.</p>`
                }
            ]
        },
        {
            id: 'sudoku-solver',
            title: 'Sudoku Solver',
            difficulty: 'hard',
            description: `<p>Write a program to solve a Sudoku puzzle by filling the empty cells. Each empty cell (denoted by '.') must be filled with a digit 1–9 such that every row, column, and 3×3 sub-box contains each digit exactly once.</p>`,
            testCases: [
                { input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],...]', output: 'Completed valid Sudoku grid', explanation: 'All empty cells filled such that every row, column, and 3×3 box has digits 1–9.' },
                { input: 'board with 17 clues (minimum valid)', output: 'Unique solution', explanation: '17 is the minimum number of clues for a valid Sudoku with a unique solution.' },
                { input: 'Nearly filled board (1 empty cell)', output: 'Single cell determined', explanation: 'Only one digit is missing — determined by row, column, and box constraints.' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `bool isValid(vector<vector<char>>& board, int row, int col, char num) {
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == num) return false;
        if (board[i][col] == num) return false;
        int r = 3 * (row / 3) + i / 3;
        int c = 3 * (col / 3) + i % 3;
        if (board[r][c] == num) return false;
    }
    return true;
}

bool solve(vector<vector<char>>& board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == '.') {
                for (char c = '1'; c <= '9'; c++) {
                    if (isValid(board, i, j, c)) {
                        board[i][j] = c;
                        if (solve(board)) return true;
                        board[i][j] = '.';
                    }
                }
                return false; // No valid number, backtrack
            }
        }
    }
    return true; // All cells filled
}`,
                    timeComplexity: 'O(9^(empty cells))',
                    spaceComplexity: 'O(1) — modifies board in place',
                    description: `Scan for the first empty cell and try digits 1–9. Validate each against row, column, and 3x3 box constraints. If valid, place it and recurse. If recursion succeeds, propagate success; otherwise reset the cell and try the next digit.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Scan the board for the first empty cell. Try placing digits 1–9 in that cell. For each digit, validate against Sudoku constraints (no duplicate in row, column, or 3×3 box). If valid, place it and recurse. If recursion succeeds, propagate success. If no digit works, reset and backtrack.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Scan cells row by row. Find the first cell with '.'.</li>
  <li>Try digits '1' through '9' in that cell.</li>
  <li>isValid checks the row, column, and the 3×3 sub-box using index arithmetic: box start = (row/3)*3, (col/3)*3.</li>
  <li>If valid, place the digit and recurse. If solve() returns true, the puzzle is solved.</li>
  <li>If no digit fits, reset the cell to '.' and return false to trigger backtracking in the caller.</li>
  <li>If no empty cell is found, all cells are filled — return true.</li>
</ol>

<p><strong>Trace (partial — one empty cell at (0,2)):</strong></p>
<pre>
Board has '.' at (0,2). Row 0: [5,3,.,.,7,.,.,.,.] 
Try '1': check row (no 1), column (no 1), box (no 1) → valid → place '1'
  Recurse → find next empty cell (0,3) → try digits...
  If stuck later, backtrack to (0,2) → reset to '.', try '2', '4', etc.
</pre>

<p><strong>Complexity — Why O(9^E):</strong> E = number of empty cells. Each cell can try up to 9 digits. Constraint checking prunes most branches early, making practical performance much better than the worst case. The board is modified in-place, so space is O(1) beyond the recursion stack (max depth 81).</p>`
                }
            ]
        },
        {
            id: 'rat-in-maze',
            title: 'Rat in a Maze',
            difficulty: 'hard',
            description: `<p>Given an <strong>n × n</strong> binary matrix where 1 represents an open cell and 0 represents a blocked cell, find all paths from the top-left corner (0,0) to the bottom-right corner (n−1, n−1). The rat can move in four directions: Down, Left, Right, Up. Return paths in lexicographic order.</p>`,
            testCases: [
                { input: 'maze = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]', output: '["DDRDRR","DRDDRR"]', explanation: 'Two valid paths from (0,0) to (3,3) navigating through open cells.' },
                { input: 'maze = [[1,0],[1,1]]', output: '["DR","RD"]... wait — [[1,0],[1,1]] → only "DR" is invalid (blocked). Path: "DD" then "R"? Actually "DR"', explanation: 'Only path DDRR... simplified: the rat moves D then R to reach (1,1).' },
                { input: 'maze = [[1,1],[1,1]]', output: '["DR","RD"]', explanation: 'Two paths on a 2×2 fully open grid: Down-Right or Right-Down.' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `void solve(vector<vector<int>>& maze, int r, int c, int n,
           string& path, vector<string>& result, vector<vector<bool>>& visited) {
    if (r == n - 1 && c == n - 1) { result.push_back(path); return; }
    // Directions: D, L, R, U (lexicographic)
    int dr[] = {1, 0, 0, -1};
    int dc[] = {0, -1, 1, 0};
    char dir[] = {'D', 'L', 'R', 'U'};
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i], nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n &&
            maze[nr][nc] == 1 && !visited[nr][nc]) {
            visited[nr][nc] = true;
            path += dir[i];
            solve(maze, nr, nc, n, path, result, visited);
            path.pop_back();
            visited[nr][nc] = false;
        }
    }
}`,
                    timeComplexity: 'O(4^(n²))',
                    spaceComplexity: 'O(n²)',
                    description: `From the start cell, explore all four directions in lexicographic order (D, L, R, U). Mark cells visited to avoid revisiting. When the destination is reached, record the accumulated path string. Backtrack by unmarking and removing the last direction.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> From (0,0), explore all four directions in lexicographic order (D, L, R, U). Mark cells as visited to avoid revisiting. When the destination (n−1, n−1) is reached, record the accumulated path string. Backtrack by unmarking the cell and removing the last direction character.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Start at (0,0), mark it visited.</li>
  <li>Try all 4 directions in order D → L → R → U (lexicographic for sorted output).</li>
  <li>For each direction: compute new row/col. If within bounds, cell is 1, and not visited → proceed.</li>
  <li>Mark visited, append direction char, recurse.</li>
  <li>After recursion, pop the char and unmark (backtrack).</li>
  <li>If current cell is (n−1, n−1), push the path string to results.</li>
</ol>

<p><strong>Trace (maze = [[1,1],[1,1]], start (0,0)):</strong></p>
<pre>
(0,0) visited
  D → (1,0) visited, path="D"
    L → out of bounds
    R → (1,1) = destination → record "DR" ✓
    U → (0,0) already visited
  backtrack (1,0)
  R → (0,1) visited, path="R"
    D → (1,1) = destination → record "RD" ✓
  backtrack (0,1)
Result: ["DR", "RD"]
</pre>

<p><strong>Complexity — Why O(4^(n²)):</strong> Each cell can branch into 4 directions. With n² cells, the theoretical worst case is 4^(n²). In practice, the visited array and blocked cells prune most branches. Space is O(n²) for the visited matrix and recursion stack.</p>`
                }
            ]
        },
        {
            id: 'knights-tour',
            title: "Knight's Tour Problem",
            difficulty: 'hard',
            description: `<p>Given an <strong>n × n</strong> chessboard, find a sequence of moves for a knight such that it visits every square exactly once. The knight moves in an L-shape: two squares in one direction and one square perpendicular. Return the board with move numbers, or determine if a tour exists.</p>`,
            testCases: [
                { input: 'n = 5, start = (0, 0)', output: 'Valid tour board with moves 0–24', explanation: 'A knight can complete a tour on a 5×5 board starting from (0,0).' },
                { input: 'n = 8, start = (0, 0)', output: 'Valid tour board with moves 0–63', explanation: 'The classic chess board always admits a knight\'s tour.' },
                { input: 'n = 3, start = (0, 0)', output: 'No solution', explanation: 'A 3×3 board is too small — a knight cannot visit all 9 squares.' }
            ],
            approaches: [
                {
                    name: 'Backtracking',
                    code: `bool solve(vector<vector<int>>& board, int r, int c, int move, int n) {
    if (move == n * n) return true;
    int dr[] = {-2, -2, -1, -1, 1, 1, 2, 2};
    int dc[] = {-1, 1, -2, 2, -2, 2, -1, 1};
    for (int i = 0; i < 8; i++) {
        int nr = r + dr[i], nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1) {
            board[nr][nc] = move;
            if (solve(board, nr, nc, move + 1, n)) return true;
            board[nr][nc] = -1; // backtrack
        }
    }
    return false;
}`,
                    timeComplexity: 'O(8^(n²))',
                    spaceComplexity: 'O(n²)',
                    description: `Visit every cell on an n×n board exactly once using L-shaped knight moves. From each position, try all 8 possible moves. Mark each cell with a move number, recurse for the next move, and backtrack if no valid continuation exists.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> A knight must visit every cell on an n×n board exactly once. Use backtracking: from the current cell, try all 8 possible L-shaped moves. If the target cell is valid and unvisited, mark it with the move number and recurse. If all n² cells are visited, return success. Otherwise, reset and try the next move.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Initialize an n×n board with all cells set to −1 (unvisited). Place the knight at the start cell with move 0.</li>
  <li>From the current position, try all 8 knight moves (combinations of ±1, ±2).</li>
  <li>For each valid and unvisited target cell: set board[nr][nc] = move, recurse with move+1.</li>
  <li>If recursion returns true (tour complete), propagate success.</li>
  <li>If none of the 8 moves leads to a solution, reset the cell to −1 and return false.</li>
  <li>Tour is complete when move == n×n.</li>
</ol>

<p><strong>Trace (n = 5, start (0,0), partial):</strong></p>
<pre>
board[0][0] = 0
Move 1: try 8 moves from (0,0)
  (−2,−1) out of bounds, (−2,1) out of bounds, (−1,−2) out of bounds
  (−1,2) out of bounds, (1,−2) out of bounds
  (1,2) valid → board[1][2] = 1
    Move 2: from (1,2), try 8 moves
      (−1,0) valid → board[−1][0]? No, out of bounds
      (3,1) valid → board[3][1] = 2
        ... continue until move 24 or backtrack
</pre>

<p><strong>Complexity — Why O(8^(n²)):</strong> Each cell can branch into up to 8 knight moves. With n² cells to fill, the worst case is 8^(n²). In practice, the search space is much smaller due to boundary constraints and the visited check. Warnsdorff's heuristic (choose the cell with fewest onward moves first) dramatically improves performance but doesn't change the theoretical worst case.</p>`
                }
            ]
        }
    ]
};
