// =================================================================
//  DSA — Dynamic Programming
// =================================================================
export const dpData = {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    icon: '📊',
    color: '#f472b6',
    questions: [
        // ===== EASY =====
        {
            id: 'fibonacci',
            title: 'Fibonacci Number',
            difficulty: 'easy',
            description: `Given an integer <strong>n</strong>, return the n-th Fibonacci number. The Fibonacci sequence is defined as: <code>F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)</code> for n &gt; 1.<br><br>This is the most classic DP problem and a perfect gateway into understanding memoization and tabulation — the two fundamental DP techniques.`,
            testCases: [
                { input: 'n = 5', output: '5', explanation: 'F(5) = F(4) + F(3) = 3 + 2 = 5. Sequence: 0, 1, 1, 2, 3, 5.' },
                { input: 'n = 0', output: '0', explanation: 'Base case: F(0) = 0.' },
                { input: 'n = 10', output: '55', explanation: 'Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.' }
            ],
            approaches: [
                {
                    name: 'Memoization (Top-Down)',
                    code: `int fib(int n, vector<int>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1, memo) + fib(n-2, memo);
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Top-down DP: recursion with memoization. Each subproblem fib(i) computed once and cached. Recursive tree collapses from exponential to linear because each node is visited only once. The memo array prevents redundant recomputation.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Naive recursion computes fib(3) multiple times when calculating fib(5). Memoization says: "If I've already solved this subproblem, just look up the answer instead of recomputing it." It's like writing answers on a sticky note so you never solve the same sub-problem twice.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Check base cases: <code>if (n &lt;= 1) return n</code> — fib(0)=0 and fib(1)=1.<br>Step 2 → Check memo: <code>if (memo[n] != -1) return memo[n]</code> — already solved? Return instantly.<br>Step 3 → Compute and cache: <code>memo[n] = fib(n-1, memo) + fib(n-2, memo)</code> — solve, store, return.<br><br><strong>Trace (n = 5):</strong><br>fib(5) → needs fib(4) + fib(3)<br>  fib(4) → needs fib(3) + fib(2)<br>    fib(3) → needs fib(2) + fib(1)<br>      fib(2) → needs fib(1) + fib(0) = 1 + 0 = 1 → memo[2] = 1<br>      fib(1) = 1<br>    fib(3) = 1 + 1 = 2 → memo[3] = 2<br>    fib(2) → memo hit! Returns 1<br>  fib(4) = 2 + 1 = 3 → memo[4] = 3<br>  fib(3) → memo hit! Returns 2<br>fib(5) = 3 + 2 = <strong>5</strong><br><br><strong>Complexity — Why O(n)?</strong> Each subproblem fib(0) through fib(n) is computed exactly once, giving n+1 computations total. Without memoization, the recursive tree has O(2^n) nodes.`
                },
                {
                    name: 'Tabulation (Bottom-Up)',
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
                    description: `Bottom-up: build from base cases iteratively. Since fib(i) only depends on fib(i-1) and fib(i-2), we only need two variables — O(1) space. This is the space-optimized tabulation approach. No recursion overhead.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Instead of starting from fib(n) and breaking down (top-down), we start from fib(0) and fib(1) and build UP. Since each Fibonacci number only depends on the previous two, we don't need to store the entire table — just two rolling variables.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Handle edge case: <code>if (n &lt;= 1) return n</code><br>Step 2 → Initialize: <code>prev2 = 0</code> (fib(0)), <code>prev1 = 1</code> (fib(1))<br>Step 3 → Loop from 2 to n: compute <code>curr = prev1 + prev2</code>, then slide window forward<br>Step 4 → Return <code>prev1</code> which now holds fib(n)<br><br><strong>Trace (n = 5):</strong><br>Start: prev2=0, prev1=1<br>i=2: curr = 1+0 = 1 → prev2=1, prev1=1<br>i=3: curr = 1+1 = 2 → prev2=1, prev1=2<br>i=4: curr = 2+1 = 3 → prev2=2, prev1=3<br>i=5: curr = 3+2 = 5 → prev2=3, prev1=<strong>5</strong><br>Return 5 ✓<br><br><strong>Complexity — Why O(1) Space?</strong> We only ever look at the two most recent values. An entire array is unnecessary — two variables sliding forward give us everything we need. This also eliminates recursion stack overhead.`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'climbing-stairs',
            title: 'Climbing Stairs',
            difficulty: 'medium',
            description: `You are climbing a staircase with <strong>n</strong> steps. Each time you can climb <strong>1 or 2</strong> steps. In how many distinct ways can you reach the top?<br><br><strong>Constraints:</strong> 1 ≤ n ≤ 45<br><br>This is essentially Fibonacci in disguise — the number of ways to reach step n equals the sum of ways to reach step n-1 (take 1 step) and step n-2 (take 2 steps).`,
            testCases: [
                { input: 'n = 5', output: '8', explanation: 'Ways: [1+1+1+1+1], [1+1+1+2], [1+1+2+1], [1+2+1+1], [2+1+1+1], [1+2+2], [2+1+2], [2+2+1] = 8 ways.' },
                { input: 'n = 1', output: '1', explanation: 'Only one way: take 1 step.' },
                { input: 'n = 3', output: '3', explanation: 'Three ways: [1+1+1], [1+2], [2+1].' }
            ],
            approaches: [
                {
                    name: 'DP (Fibonacci Variant)',
                    code: `int climbStairs(int n) {
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
                    description: `At each step, you can take 1 or 2 steps. Ways to reach step n = ways to reach step (n-1) + ways to reach step (n-2). Same recurrence as Fibonacci. Base cases: 1 way for step 1, 2 ways for step 2. Space-optimized since each state depends only on the previous two.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>To reach step n, your last move was either from step n-1 (took 1 step) or step n-2 (took 2 steps). So the total ways = ways(n-1) + ways(n-2). This is Fibonacci with different seeds!<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base cases: ways(1) = 1, ways(2) = 2<br>Step 2 → For each step i from 3 to n: <code>curr = prev1 + prev2</code><br>Step 3 → Slide the window: <code>prev2 = prev1, prev1 = curr</code><br>Step 4 → Return <code>prev1</code><br><br><strong>Trace (n = 5):</strong><br>Start: prev2=1 (ways(1)), prev1=2 (ways(2))<br>i=3: curr = 2+1 = 3 → [1+1+1, 1+2, 2+1]<br>i=4: curr = 3+2 = 5<br>i=5: curr = 5+3 = <strong>8</strong><br><br><strong>Complexity — Why O(n) time, O(1) space?</strong> We visit each step exactly once. Since ways(i) depends only on ways(i-1) and ways(i-2), two rolling variables suffice — no array needed.`
                }
            ]
        },
        {
            id: '0-1-knapsack',
            title: '0/1 Knapsack Problem',
            difficulty: 'medium',
            description: `Given <strong>n</strong> items, each with a weight and a value, and a knapsack of capacity <strong>W</strong>, find the maximum total value you can carry. Each item can be taken at most once (0/1 choice).<br><br><strong>Constraints:</strong> Items cannot be broken. You either take the whole item or leave it.<br><br><strong>Example:</strong> weights = [2, 3], values = [3, 4], W = 5 → Take both items for value 7.`,
            testCases: [
                { input: 'W=5, wt=[2,3], val=[3,4], n=2', output: '7', explanation: 'Take both items: weight 2+3=5 ≤ W, value 3+4=7.' },
                { input: 'W=0, wt=[1,2], val=[5,6], n=2', output: '0', explanation: 'No capacity means no items can be taken.' },
                { input: 'W=4, wt=[4,5], val=[1,2], n=2', output: '1', explanation: 'Only item 1 fits (weight 4 ≤ 4), value = 1.' }
            ],
            approaches: [
                {
                    name: '2D DP',
                    code: `int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w]; // Don't take item i
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w - wt[i-1]] + val[i-1]);
        }
    }
    return dp[n][W];
}`,
                    timeComplexity: 'O(n × W)',
                    spaceComplexity: 'O(n × W)',
                    description: `For each item, two choices: take it or skip it. dp[i][w] = max value using first i items with capacity w. If we skip item i: dp[i-1][w]. If we take it (and it fits): dp[i-1][w-wt[i]] + val[i]. Classic 2D DP.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>For each item we face a binary decision: take it or leave it. If we take it, we gain its value but lose capacity. If we leave it, capacity remains. We want to make the globally optimal set of these binary decisions.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Create table <code>dp[n+1][W+1]</code> initialized to 0<br>Step 2 → For each item i (1 to n) and each capacity w (0 to W):<br>&nbsp;&nbsp;• Default: skip item → <code>dp[i][w] = dp[i-1][w]</code><br>&nbsp;&nbsp;• If item fits (<code>wt[i-1] ≤ w</code>): consider taking it → <code>dp[i-1][w-wt[i-1]] + val[i-1]</code><br>&nbsp;&nbsp;• Keep the maximum of both choices<br>Step 3 → Answer at <code>dp[n][W]</code><br><br><strong>Trace (W=5, wt=[2,3], val=[3,4]):</strong><br><code>dp[0][*] = 0</code> (no items)<br>Item 1 (wt=2, val=3):<br>&nbsp;&nbsp;dp[1][2] = max(dp[0][2], dp[0][0]+3) = max(0, 3) = 3<br>&nbsp;&nbsp;dp[1][5] = 3<br>Item 2 (wt=3, val=4):<br>&nbsp;&nbsp;dp[2][3] = max(dp[1][3], dp[1][0]+4) = max(3, 4) = 4<br>&nbsp;&nbsp;dp[2][5] = max(dp[1][5], dp[1][2]+4) = max(3, 7) = <strong>7</strong><br><br><strong>Complexity — Why O(n × W)?</strong> We fill an n×W table with O(1) work per cell. It's pseudo-polynomial because W is a numeric value, not the input length.`
                },
                {
                    name: '1D DP (Space Optimized)',
                    code: `int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W+1, 0);
    for (int i = 0; i < n; i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}`,
                    timeComplexity: 'O(n × W)',
                    spaceComplexity: 'O(W)',
                    description: `Since dp[i] only depends on dp[i-1], we can use a 1D array. Iterate capacity in reverse (right to left) to ensure each item is used at most once.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>In the 2D table, each row only looks at the row above it. So we can flatten to a single row — but we must iterate right-to-left so that when we read <code>dp[w-wt[i]]</code>, it still holds the "previous row" value (not yet updated for this item).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Create 1D array <code>dp[W+1]</code> initialized to 0<br>Step 2 → For each item: iterate capacity from W down to wt[i]<br>Step 3 → <code>dp[w] = max(dp[w], dp[w-wt[i]] + val[i])</code><br><br><strong>Trace (W=5, wt=[2,3], val=[3,4]):</strong><br>Start: dp = [0, 0, 0, 0, 0, 0]<br>Item 0 (wt=2, val=3): iterate w=5→2<br>&nbsp;&nbsp;dp[5]=3, dp[4]=3, dp[3]=3, dp[2]=3<br>dp = [0, 0, 3, 3, 3, 3]<br>Item 1 (wt=3, val=4): iterate w=5→3<br>&nbsp;&nbsp;dp[5] = max(3, dp[2]+4) = max(3, 7) = <strong>7</strong><br>&nbsp;&nbsp;dp[4] = max(3, dp[1]+4) = 4<br>&nbsp;&nbsp;dp[3] = max(3, dp[0]+4) = 4<br>dp = [0, 0, 3, 4, 4, 7]<br><br><strong>Complexity — Why reverse?</strong> Left-to-right would let item i update dp[w-wt[i]] before we read it, effectively using item i twice (unbounded knapsack). Right-to-left preserves the 0/1 constraint.`
                }
            ]
        },
        {
            id: 'lcs',
            title: 'Longest Common Subsequence',
            difficulty: 'medium',
            description: `Given two strings <strong>s1</strong> and <strong>s2</strong>, return the length of their longest common subsequence (LCS). A subsequence is derived by deleting some (or no) characters without changing the order of the remaining characters.<br><br><strong>Example:</strong> s1 = "ABCDE", s2 = "ACE" → LCS = "ACE", length = 3.`,
            testCases: [
                { input: 's1 = "ABCDE", s2 = "ACE"', output: '3', explanation: 'LCS is "ACE" — characters A, C, E appear in both strings in the same order.' },
                { input: 's1 = "ABC", s2 = "DEF"', output: '0', explanation: 'No common characters at all.' },
                { input: 's1 = "ABAB", s2 = "BABA"', output: '3', explanation: 'LCS is "ABA" or "BAB", both length 3.' }
            ],
            approaches: [
                {
                    name: '2D DP',
                    code: `int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
                    timeComplexity: 'O(m × n)',
                    spaceComplexity: 'O(m × n)',
                    description: `dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]. If characters match, extend LCS by 1. If not, take the best of excluding one character from either string.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Compare characters one at a time from each string. If they match, both contribute to the LCS. If they don't, we must skip at least one — try skipping from each string and take the better result.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Create <code>dp[m+1][n+1]</code> table, all zeros<br>Step 2 → For each pair (i, j):<br>&nbsp;&nbsp;• If <code>s1[i-1] == s2[j-1]</code>: match → <code>dp[i][j] = dp[i-1][j-1] + 1</code><br>&nbsp;&nbsp;• Else: skip one → <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code><br>Step 3 → Answer at <code>dp[m][n]</code><br><br><strong>Trace (s1="ABCDE", s2="ACE"):</strong><br>&nbsp;&nbsp;dp[1][1]: A==A → dp[0][0]+1 = <strong>1</strong><br>&nbsp;&nbsp;dp[3][2]: C==C → dp[2][1]+1 = <strong>2</strong><br>&nbsp;&nbsp;dp[5][3]: E==E → dp[4][2]+1 = <strong>3</strong><br>Answer: dp[5][3] = 3 ✓<br><br><strong>Complexity — Why O(m × n)?</strong> We fill an m×n table with O(1) work per cell. Each cell considers only its three neighbors (diagonal, up, left).`
                }
            ]
        },
        {
            id: 'lis',
            title: 'Longest Increasing Subsequence',
            difficulty: 'medium',
            description: `Given an integer array <strong>nums</strong>, return the length of the longest strictly increasing subsequence.<br><br><strong>Example:</strong> nums = [10, 9, 2, 5, 3, 7, 101] → LIS length = 4 (e.g., [2, 3, 7, 101]).`,
            testCases: [
                { input: 'nums = [10, 9, 2, 5, 3, 7, 101]', output: '4', explanation: 'One LIS is [2, 3, 7, 101]. Another is [2, 5, 7, 101].' },
                { input: 'nums = [0, 1, 0, 3, 2, 3]', output: '4', explanation: 'LIS is [0, 1, 2, 3].' },
                { input: 'nums = [7, 7, 7, 7]', output: '1', explanation: 'All elements equal — strictly increasing subsequence has length 1.' }
            ],
            approaches: [
                {
                    name: 'DP O(n²)',
                    code: `int lis(vector<int>& nums) {
    int n = nums.size(), ans = 1;
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++)
            if (nums[j] < nums[i])
                dp[i] = max(dp[i], dp[j] + 1);
        ans = max(ans, dp[i]);
    }
    return ans;
}`,
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(n)',
                    description: `dp[i] = length of LIS ending at index i. For each i, check all j < i: if nums[j] < nums[i], extend. Answer is max over all dp[i].`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>For each element, ask: "What is the longest increasing subsequence that ends exactly HERE?" To answer, look at every previous element that is smaller — the best one to extend from gives us dp[i].<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize dp[i] = 1 for all i (each element alone is length 1)<br>Step 2 → For each i, scan all j &lt; i:<br>&nbsp;&nbsp;• If <code>nums[j] &lt; nums[i]</code>: <code>dp[i] = max(dp[i], dp[j]+1)</code><br>Step 3 → Track global max<br><br><strong>Trace (nums = [10, 9, 2, 5, 3, 7, 101]):</strong><br>dp[0]=1, dp[1]=1, dp[2]=1<br>dp[3]=2 (extends from 2: [2,5])<br>dp[4]=2 (extends from 2: [2,3])<br>dp[5]=3 (extends from 5 or 3: [2,3,7])<br>dp[6]=4 (extends from 7: [2,3,7,101])<br>Answer: <strong>4</strong>`
                },
                {
                    name: 'Binary Search O(n log n)',
                    code: `int lis(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    description: `Maintain 'tails' array where tails[i] = smallest tail of an increasing subsequence of length i+1. Binary search for position. Extend or replace. Length of tails = LIS length.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>We maintain a "patience sorting" tableau. The key insight: we want the smallest possible tail for each subsequence length, because a smaller tail gives more room for future extensions. Binary search finds exactly where each new element fits.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → For each element x:<br>&nbsp;&nbsp;• Binary search <code>lower_bound</code> in tails for x<br>&nbsp;&nbsp;• If x &gt; all tails → <code>push_back(x)</code> (extend)<br>&nbsp;&nbsp;• Else → replace first tail ≥ x (keep tails small)<br>Step 2 → Answer = <code>tails.size()</code><br><br><strong>Trace (nums = [10, 9, 2, 5, 3, 7, 101]):</strong><br>Process 10: tails = [10]<br>Process 9: 9 replaces 10 → [9]<br>Process 2: 2 replaces 9 → [2]<br>Process 5: extend → [2, 5]<br>Process 3: 3 replaces 5 → [2, 3]<br>Process 7: extend → [2, 3, 7]<br>Process 101: extend → [2, 3, 7, 101]<br>Answer: <strong>4</strong><br><br><strong>Note:</strong> tails is NOT the actual LIS — it's a bookkeeping structure. Its length always equals the LIS length.`
                }
            ]
        },
        {
            id: 'coin-change',
            title: 'Coin Change',
            difficulty: 'medium',
            description: `Given an array of coin denominations and a target <strong>amount</strong>, return the minimum number of coins needed to make that amount. Each coin may be used unlimited times. Return -1 if impossible.<br><br><strong>Example:</strong> coins = [1, 3, 4], amount = 6 → Answer: 2 (using 3+3).`,
            testCases: [
                { input: 'coins = [1, 3, 4], amount = 6', output: '2', explanation: '3 + 3 = 6 with just 2 coins.' },
                { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Cannot make 3 from only denomination 2.' },
                { input: 'coins = [1], amount = 0', output: '0', explanation: 'Zero amount requires zero coins.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i)
                dp[i] = min(dp[i], dp[i - c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
                    timeComplexity: 'O(amount × coins)',
                    spaceComplexity: 'O(amount)',
                    description: `dp[i] = minimum coins to make amount i. For each amount, try each coin. Initialize dp[0]=0, rest to infinity. Unbounded knapsack variant — each coin reusable.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>"If I use coin c to contribute to amount i, I need 1 + the optimal solution for amount i-c." Try every coin and take the minimum. Unlimited usage is natural since dp[i-c] may itself include coin c.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>dp[0] = 0</code>, everything else = amount+1 (practical infinity)<br>Step 2 → For each amount i: try each coin c ≤ i → <code>dp[i] = min(dp[i], dp[i-c]+1)</code><br>Step 3 → If dp[amount] &gt; amount → return -1<br><br><strong>Trace (coins = [1,3,4], amount = 6):</strong><br>dp[0]=0, dp[1]=1, dp[2]=2<br>dp[3] = min(dp[2]+1, dp[0]+1) = min(3, 1) = <strong>1</strong> (coin 3)<br>dp[4] = min(dp[3]+1, dp[1]+1, dp[0]+1) = <strong>1</strong> (coin 4)<br>dp[5] = min(dp[4]+1, dp[2]+1, dp[1]+1) = <strong>2</strong><br>dp[6] = min(dp[5]+1, dp[3]+1, dp[2]+1) = min(3, <strong>2</strong>, 3) = <strong>2</strong><br>Answer: 2 (coins 3+3) ✓`
                }
            ]
        },
        {
            id: 'subset-sum',
            title: 'Subset Sum Problem',
            difficulty: 'medium',
            description: `Given an array of non-negative integers and a target sum, determine if there exists a subset whose elements sum to exactly the target.<br><br><strong>Example:</strong> nums = [3, 1, 5], target = 4 → True (subset {3, 1}).`,
            testCases: [
                { input: 'nums = [3, 1, 5], target = 4', output: 'true', explanation: 'Subset {3, 1} sums to 4.' },
                { input: 'nums = [2, 4, 6], target = 5', output: 'false', explanation: 'No subset of even numbers can sum to odd 5.' },
                { input: 'nums = [1, 2, 3], target = 0', output: 'true', explanation: 'Empty subset sums to 0.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums)
        for (int j = target; j >= num; j--)
            dp[j] = dp[j] || dp[j - num];
    return dp[target];
}`,
                    timeComplexity: 'O(n × target)',
                    spaceComplexity: 'O(target)',
                    description: `dp[j] = can we form sum j? Base: dp[0] = true (empty set). For each number, iterate right-to-left to ensure 0/1 usage.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Start knowing sum 0 is achievable (empty set). For each new number, every previously achievable sum s can now also reach s+num. Propagate reachability backward to avoid counting an element twice.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>dp[0] = true</code>, rest false<br>Step 2 → For each num: iterate j from target down to num<br>&nbsp;&nbsp;• <code>dp[j] = dp[j] || dp[j-num]</code><br>Step 3 → Return <code>dp[target]</code><br><br><strong>Trace (nums = [3,1,5], target = 4):</strong><br>Start: dp = [T, F, F, F, F]<br>Process 3: dp[3] = dp[0] = <strong>T</strong> → dp = [T, F, F, T, F]<br>Process 1: dp[4] = dp[3] = <strong>T</strong> 🎉 dp[1] = dp[0] = T<br>dp[4] = true → subset {3,1} sums to 4 ✓<br><br><strong>Complexity — Why right-to-left?</strong> Left-to-right with num=3 would set dp[3]=T, then dp[6]=T using 3 twice. Reverse prevents this echo.`
                }
            ]
        },
        {
            id: 'matrix-chain',
            title: 'Matrix Chain Multiplication',
            difficulty: 'medium',
            description: `Given a chain of matrices with dimensions in array <strong>dims</strong> (matrix i has size dims[i] × dims[i+1]), find the minimum scalar multiplications to compute the product.<br><br>Matrix multiplication is associative — different parenthesizations lead to vastly different costs.`,
            testCases: [
                { input: 'dims = [10, 30, 5, 60]', output: '4500', explanation: '(AB)C costs 10×30×5 + 10×5×60 = 1500+3000 = 4500. A(BC) costs 27000.' },
                { input: 'dims = [5, 10, 3]', output: '150', explanation: 'Only one way: A×B costs 5×10×3 = 150.' },
                { input: 'dims = [1, 2, 3, 4]', output: '18', explanation: '(AB)C = 6+12 = 18. A(BC) = 24+8 = 32. Optimal: 18.' }
            ],
            approaches: [
                {
                    name: 'Interval DP',
                    code: `int matrixChain(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++)
                dp[i][j] = min(dp[i][j],
                    dp[i][k] + dp[k+1][j]
                    + dims[i] * dims[k+1] * dims[j+1]);
        }
    }
    return dp[0][n-1];
}`,
                    timeComplexity: 'O(n³)',
                    spaceComplexity: 'O(n²)',
                    description: `dp[i][j] = min cost to multiply matrices i through j. Try every split k. Fill by increasing chain length. Classic interval DP.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>To multiply matrices i..j, split at k: compute (i..k) and (k+1..j) separately, then combine. The final multiplication costs dims[i]×dims[k+1]×dims[j+1]. Try every k, take the minimum.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base: dp[i][i] = 0 (single matrix)<br>Step 2 → Fill by increasing length (2, 3, ..., n)<br>Step 3 → For each [i,j], try all k: <code>dp[i][j] = min(dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1])</code><br><br><strong>Trace (dims = [10, 30, 5, 60]):</strong><br>A(10×30), B(30×5), C(5×60)<br>len=2: dp[0][1]=10×30×5=1500, dp[1][2]=30×5×60=9000<br>len=3: dp[0][2]:<br>&nbsp;&nbsp;k=0: 0+9000+18000 = 27000<br>&nbsp;&nbsp;k=1: 1500+0+3000 = <strong>4500</strong> ✓<br><br><strong>Complexity — Why O(n³)?</strong> O(n²) subproblems × O(n) split points per subproblem.`
                }
            ]
        },
        {
            id: 'edit-distance',
            title: 'Edit Distance',
            difficulty: 'medium',
            description: `Given two strings <strong>word1</strong> and <strong>word2</strong>, return the minimum number of operations (insert, delete, replace) to convert word1 into word2.<br><br><strong>Example:</strong> "horse" → "ros" requires 3 operations.`,
            testCases: [
                { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse → rorse (replace h→r) → rose (remove r) → ros (remove e).' },
                { input: 'word1 = "", word2 = "abc"', output: '3', explanation: 'Insert a, b, c — 3 operations.' },
                { input: 'word1 = "abc", word2 = "abc"', output: '0', explanation: 'Identical strings need no operations.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int editDistance(string& word1, string& word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i-1] == word2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j-1],
                    dp[i-1][j], dp[i][j-1]});
        }
    }
    return dp[m][n];
}`,
                    timeComplexity: 'O(m × n)',
                    spaceComplexity: 'O(m × n)',
                    description: `dp[i][j] = min ops to convert word1[0..i-1] to word2[0..j-1]. Match → inherit diagonal. Mismatch → 1 + min(replace, delete, insert).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>At position (i, j), if characters match, no edit needed — move diagonally (free). If they don't match, exactly three choices: replace (diagonal+1), delete from word1 (up+1), insert into word1 (left+1). DP finds the globally optimal path.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base: dp[i][0]=i (delete all), dp[0][j]=j (insert all)<br>Step 2 → Match: <code>dp[i][j] = dp[i-1][j-1]</code><br>&nbsp;&nbsp;Mismatch: <code>1 + min(replace, delete, insert)</code><br>Step 3 → Answer at dp[m][n]<br><br><strong>Trace (word1="horse", word2="ros"):</strong><br>dp[1][1]: h≠r → 1+min(0,1,1) = 1 (replace)<br>...building through the table...<br>dp[5][3] = <strong>3</strong> ✓ (replace h→r, delete r, delete e)<br><br><strong>Complexity — Why three operations?</strong> Replace aligns characters. Delete shortens word1. Insert lengthens word1 to match word2. Together they cover every possible single-step transformation.`
                }
            ]
        },

        // ===== HARD =====
        {
            id: 'word-break',
            title: 'Word Break',
            difficulty: 'hard',
            description: `Given a string <strong>s</strong> and a dictionary of words, determine if s can be segmented into a space-separated sequence of dictionary words.<br><br><strong>Example:</strong> s = "leetcode", dict = ["leet", "code"] → True.<br>The same word may be reused multiple times.`,
            testCases: [
                { input: 's = "leetcode", dict = ["leet", "code"]', output: 'true', explanation: '"leet" + "code" = "leetcode".' },
                { input: 's = "catsandog", dict = ["cats","dog","sand","and","cat"]', output: 'false', explanation: 'No valid full segmentation exists.' },
                { input: 's = "a", dict = ["a"]', output: 'true', explanation: 'Single character matches.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            if (dp[j] && dict.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
    return dp[n];
}`,
                    timeComplexity: 'O(n² × k)',
                    spaceComplexity: 'O(n)',
                    description: `dp[i] = can s[0..i-1] be segmented? Try all split points j: if dp[j]=true and s[j..i-1] is a dictionary word → dp[i]=true.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A prefix s[0..i-1] is breakable if we find some j where: (1) s[0..j-1] is breakable (dp[j]=true), and (2) s[j..i-1] is a dictionary word. Build left to right.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Hash set for O(1) lookups. dp[0] = true.<br>Step 2 → For each i, try all j: <code>dp[j] && dict.count(s.substr(j, i-j))</code><br>Step 3 → Return dp[n]<br><br><strong>Trace (s="leetcode", dict={"leet","code"}):</strong><br>dp[0]=true<br>dp[4]: j=0 → dp[0]=true, "leet" ∈ dict → <strong>dp[4]=true</strong><br>dp[8]: j=4 → dp[4]=true, "code" ∈ dict → <strong>dp[8]=true</strong> ✓`
                }
            ]
        },
        {
            id: 'partition-equal-subset',
            title: 'Partition Equal Subset Sum',
            difficulty: 'hard',
            description: `Given a non-empty array of positive integers, determine if it can be partitioned into two subsets with equal sum.<br><br><strong>Key Reduction:</strong> Equivalent to: "Does a subset exist with sum = total/2?"<br><br><strong>Example:</strong> [1, 5, 11, 5] → True (subsets {11} and {1, 5, 5}).`,
            testCases: [
                { input: 'nums = [1, 5, 11, 5]', output: 'true', explanation: '{11} and {1,5,5} both sum to 11.' },
                { input: 'nums = [1, 2, 3, 5]', output: 'false', explanation: 'Total=11 is odd → impossible.' },
                { input: 'nums = [1, 1]', output: 'true', explanation: 'Each element forms a subset summing to 1.' }
            ],
            approaches: [
                {
                    name: 'DP (Subset Sum)',
                    code: `bool canPartition(vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2 != 0) return false;
    int target = total / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums)
        for (int j = target; j >= num; j--)
            dp[j] = dp[j] || dp[j - num];
    return dp[target];
}`,
                    timeComplexity: 'O(n × sum/2)',
                    spaceComplexity: 'O(sum/2)',
                    description: `Reduce to subset sum with target = total/2. If total is odd, immediately impossible.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>If total is odd → impossible. If even, find a subset summing to total/2 — the rest automatically sums to the other half. Classic reduction to subset sum.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Compute total. Odd → false<br>Step 2 → target = total/2. Run subset sum DP.<br>Step 3 → Return dp[target]<br><br><strong>Trace (nums = [1,5,11,5]):</strong><br>total=22, target=11<br>Process 1: dp[1]=true<br>Process 5: dp[6]=true, dp[5]=true<br>Process 11: dp[11] = dp[11] || dp[0] = <strong>true</strong> 🎉<br>Subset {11} works ✓`
                }
            ]
        },
        {
            id: 'rod-cutting',
            title: 'Rod Cutting Problem',
            difficulty: 'hard',
            description: `Given a rod of length <strong>n</strong> and price table where <code>price[i]</code> = price of rod length i+1, find the maximum revenue by cutting and selling pieces.<br><br><strong>Example:</strong> price = [1, 5, 8, 9], n = 4 → Max revenue = 10 (two pieces of length 2).`,
            testCases: [
                { input: 'price = [1, 5, 8, 9], n = 4', output: '10', explanation: 'Two pieces of length 2: 5+5 = 10.' },
                { input: 'price = [5], n = 1', output: '5', explanation: 'Sell the whole rod.' },
                { input: 'price = [1, 5], n = 2', output: '5', explanation: 'No cut needed — length 2 rod sells for 5 > 1+1=2.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int rodCutting(vector<int>& price, int n) {
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= i; j++)
            dp[i] = max(dp[i], price[j-1] + dp[i-j]);
    return dp[n];
}`,
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(n)',
                    description: `dp[i] = max revenue from rod of length i. Try all first-cut lengths j. Unbounded: each length can repeat.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>For rod of length i, decide the first cut of length j. Sell that piece for price[j-1], optimally solve the remainder (dp[i-j]). Any cut can repeat since dp[i-j] might cut another piece of length j.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → dp[0]=0<br>Step 2 → For each i, try all j from 1 to i:<br>&nbsp;&nbsp;<code>dp[i] = max(dp[i], price[j-1] + dp[i-j])</code><br><br><strong>Trace (price=[1,5,8,9], n=4):</strong><br>dp[1] = 1<br>dp[2] = max(1+1, 5+0) = <strong>5</strong><br>dp[3] = max(1+5, 5+1, 8+0) = <strong>8</strong><br>dp[4] = max(1+8, 5+5, 8+1, 9+0) = <strong>10</strong><br>Two length-2 pieces (5+5) ✓`
                }
            ]
        },
        {
            id: 'longest-palindromic-subseq',
            title: 'Longest Palindromic Subsequence',
            difficulty: 'hard',
            description: `Given a string <strong>s</strong>, find the length of its longest palindromic subsequence.<br><br><strong>Example:</strong> s = "bbbab" → LPS = "bbbb" (length 4).<br><strong>Alternative:</strong> LPS(s) = LCS(s, reverse(s)).`,
            testCases: [
                { input: 's = "bbbab"', output: '4', explanation: 'LPS is "bbbb" (skip the "a").' },
                { input: 's = "cbbd"', output: '2', explanation: 'LPS is "bb".' },
                { input: 's = "a"', output: '1', explanation: 'Single character is a palindrome.' }
            ],
            approaches: [
                {
                    name: 'DP',
                    code: `int longestPalinSubseq(string& s) {
    int n = s.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int i = 0; i < n; i++) dp[i][i] = 1;
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            if (s[i] == s[j])
                dp[i][j] = dp[i+1][j-1] + 2;
            else
                dp[i][j] = max(dp[i+1][j], dp[i][j-1]);
        }
    }
    return dp[0][n-1];
}`,
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(n²)',
                    description: `dp[i][j] = LPS length in s[i..j]. If endpoints match, add 2. Otherwise skip one end and take the better result. Build by increasing length.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A palindrome is symmetric. If s[i]==s[j], both are part of the palindrome — look inward. If not, skip one end and take the better result.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base: dp[i][i] = 1 (single char)<br>Step 2 → Fill by increasing length<br>Step 3 → Match: <code>dp[i][j] = dp[i+1][j-1] + 2</code><br>&nbsp;&nbsp;Mismatch: <code>dp[i][j] = max(dp[i+1][j], dp[i][j-1])</code><br><br><strong>Trace (s = "bbbab"):</strong><br>len=2: dp[0][1]=2 (b==b), dp[1][2]=2 (b==b)<br>len=3: dp[0][2]=3 (b==b → dp[1][1]+2)<br>len=5: dp[0][4]: b==b → dp[1][3]+2 = 2+2 = <strong>4</strong> ✓`
                }
            ]
        },
        {
            id: 'egg-dropping',
            title: 'Egg Dropping Problem',
            difficulty: 'hard',
            description: `Given <strong>K</strong> identical eggs and <strong>N</strong> floors, find the minimum worst-case trials to determine the critical floor (highest floor where egg doesn't break).<br><br><strong>Rules:</strong> Broken egg cannot be reused. Unbroken egg can. We need a strategy minimizing worst-case drops.`,
            testCases: [
                { input: 'K = 2, N = 10', output: '4', explanation: 'Optimal strategy: drop from floor 4, then adjust. At most 4 trials.' },
                { input: 'K = 1, N = 5', output: '5', explanation: '1 egg → must test linearly. Worst case: 5 drops.' },
                { input: 'K = 2, N = 1', output: '1', explanation: 'Only 1 floor to test.' }
            ],
            approaches: [
                {
                    name: 'DP with Binary Search',
                    code: `int eggDrop(int K, int N) {
    vector<vector<int>> dp(K+1, vector<int>(N+1, 0));
    for (int n = 1; n <= N; n++) dp[1][n] = n;
    for (int k = 2; k <= K; k++) {
        for (int n = 1; n <= N; n++) {
            dp[k][n] = INT_MAX;
            int lo = 1, hi = n;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                int breakCase = dp[k-1][mid-1];
                int noBreak = dp[k][n-mid];
                int worst = 1 + max(breakCase, noBreak);
                dp[k][n] = min(dp[k][n], worst);
                if (breakCase < noBreak) lo = mid + 1;
                else hi = mid - 1;
            }
        }
    }
    return dp[K][N];
}`,
                    timeComplexity: 'O(K × N × log N)',
                    spaceComplexity: 'O(K × N)',
                    description: `Drop from floor x: breaks → (k-1 eggs, x-1 floors below), survives → (k eggs, n-x floors above). Minimize worst case. Binary search exploits monotonicity of break vs no-break costs.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>When dropping from floor x: break cost rises with x (more floors below), no-break cost falls (fewer above). These are monotonic — binary search finds the crossover point where the worst case is minimized.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base: dp[1][n]=n (1 egg → linear search)<br>Step 2 → For each (k,n): binary search for optimal floor<br>&nbsp;&nbsp;• <code>worst = 1 + max(breakCase, noBreak)</code><br>&nbsp;&nbsp;• Adjust search based on which side is larger<br><br><strong>Trace (K=2, N=10):</strong><br>dp[1][*] = [0,1,2,...,10]<br>dp[2][1]=1, dp[2][2]=2, dp[2][3]=2<br>dp[2][6]=3, dp[2][10]=<strong>4</strong><br>Strategy: drop from 4, then 7, 9, 10 ✓<br><br><strong>Complexity — Why binary search?</strong> Without it: O(K×N²). With it: O(K×N×logN). The break/no-break monotonicity makes this valid.`
                }
            ]
        },
        {
            id: 'max-profit-stocks',
            title: 'Best Time to Buy and Sell Stock (unlimited txns)',
            difficulty: 'hard',
            description: `Given stock prices where <code>prices[i]</code> is the price on day i, find maximum profit with <strong>unlimited transactions</strong>. Must sell before buying again.<br><br><strong>Key insight:</strong> Capture every upward movement — greedy works because profits are additive.`,
            testCases: [
                { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '7', explanation: 'Buy at 1, sell at 5 (+4). Buy at 3, sell at 6 (+3). Total: 7.' },
                { input: 'prices = [1, 2, 3, 4, 5]', output: '4', explanation: 'Buy at 1, sell at 5. Or collect daily gains: 1+1+1+1 = 4.' },
                { input: 'prices = [7, 6, 4, 3, 1]', output: '0', explanation: 'Only decreasing — no profit possible.' }
            ],
            approaches: [
                {
                    name: 'Greedy / DP',
                    code: `int maxProfit(vector<int>& prices) {
    int profit = 0;
    for (int i = 1; i < prices.size(); i++)
        if (prices[i] > prices[i-1])
            profit += prices[i] - prices[i-1];
    return profit;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Capture every positive daily difference. Equivalent to buying at every local min and selling at every local max. Sum of positive consecutive differences = max profit.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Any multi-day profit (buy A, sell B) decomposes into daily profits: price[B]-price[A] = sum of daily gains between A and B. So collect every positive daily difference to capture ALL possible profit!<br><br><strong>Algorithm Steps:</strong><br>Step 1 → profit = 0<br>Step 2 → For each consecutive pair: if price went up, add the gain<br>Step 3 → Return total<br><br><strong>Trace (prices = [7,1,5,3,6,4]):</strong><br>1→5: +4 (total: 4)<br>3→6: +3 (total: <strong>7</strong>)<br>Others: skip (price dropped)<br>Answer: 7 ✓<br><br><strong>Complexity — Why greedy = optimal here?</strong> With unlimited transactions, every profitable day-pair is worth taking. Greedy is globally optimal because profits don't interfere.`
                }
            ]
        }
    ]
};
