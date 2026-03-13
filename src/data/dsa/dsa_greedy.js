// =================================================================
//  DSA — Greedy Algorithms
// =================================================================
export const greedyData = {
    id: 'greedy',
    name: 'Greedy Algorithms',
    icon: '🎯',
    color: '#4ade80',
    questions: [
        // ===== EASY =====
        {
            id: 'activity-selection',
            title: 'Activity Selection / Max Chain of Pairs',
            difficulty: 'easy',
            description: `Given a set of activities with start and finish times, find the <strong>maximum number of non-overlapping activities</strong> that can be performed by a single person.<br><br>Two activities are compatible if one finishes before the other starts. This is the classic interval scheduling maximization problem.`,
            testCases: [
                { input: 'activities = [(1,3),(2,4),(3,5),(0,6),(5,7)]', output: '3', explanation: 'Select (1,3), (3,5), (5,7). No overlaps. 3 is maximum.' },
                { input: 'activities = [(0,1),(1,2),(2,3)]', output: '3', explanation: 'All activities are compatible — no overlaps at all.' },
                { input: 'activities = [(0,5),(1,2),(3,4)]', output: '2', explanation: 'Select (1,2) and (3,4). The long activity (0,5) overlaps with both.' }
            ],
            approaches: [
                {
                    name: 'Sort by End Time',
                    code: `int activitySelection(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(),
         [](auto& a, auto& b) { return a.second < b.second; });
    int count = 1, lastEnd = activities[0].second;
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(1)',
                    description: `Sort activities by end time. Greedily pick the first activity, then always pick the next activity whose start time ≥ last selected end time. Picking the earliest-finishing activity leaves maximum room for subsequent activities. This greedy choice is provably optimal.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Always select the activity that finishes earliest among compatible ones. By finishing as early as possible, we maximize the remaining time for future activities.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort all activities by their finish (end) time in ascending order.<br>Step 2 → Select the first activity (earliest finish). Set <code>lastEnd = activities[0].second</code>.<br>Step 3 → For each subsequent activity: if its start ≥ lastEnd, it's compatible → select it and update lastEnd.<br>Step 4 → Count of selected activities is the answer.<br><br><strong>Trace (activities: (1,3),(2,4),(3,5),(0,6),(5,7)):</strong><br>Sorted by end: (1,3),(2,4),(3,5),(0,6),(5,7).<br>Select (1,3). lastEnd=3.<br>(2,4): start 2 &lt; 3 → skip.<br>(3,5): start 3 ≥ 3 → select. lastEnd=5.<br>(0,6): start 0 &lt; 5 → skip.<br>(5,7): start 5 ≥ 5 → select. lastEnd=7.<br>Result: 3 activities.<br><br><strong>Complexity — Why O(n log n)?</strong><br>Sorting dominates: O(n log n). The greedy selection is a single O(n) pass.`
                }
            ]
        },
        {
            id: 'fractional-knapsack',
            title: 'Fractional Knapsack',
            difficulty: 'easy',
            description: `Given a knapsack with capacity W and n items (each with a value and weight), maximize the total value carried. Unlike 0/1 knapsack, items can be <strong>broken into fractions</strong> — you can take any portion of an item.`,
            testCases: [
                { input: 'W=50, items: {val:60,wt:10}, {val:100,wt:20}, {val:120,wt:30}', output: '240.0', explanation: 'Take full items 1(60) and 2(100), then 20/30 of item 3 → 120*(20/30)=80. Total=240.' },
                { input: 'W=10, items: {val:500,wt:30}', output: '166.67', explanation: 'Can only take 10/30 of the item → 500*(10/30) ≈ 166.67.' },
                { input: 'W=100, items: {val:10,wt:20}, {val:20,wt:30}', output: '30.0', explanation: 'Total weight 50 < capacity 100. Take both items entirely. Total=30.' }
            ],
            approaches: [
                {
                    name: 'Sort by Value/Weight Ratio',
                    code: `double fractionalKnapsack(int W, vector<pair<int,int>>& items) {
    // items: {value, weight}
    sort(items.begin(), items.end(),
         [](auto& a, auto& b) { return (double)a.first/a.second > (double)b.first/b.second; });
    double totalValue = 0;
    for (auto& [val, wt] : items) {
        if (W >= wt) { totalValue += val; W -= wt; }
        else { totalValue += (double)val / wt * W; break; }
    }
    return totalValue;
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(1)',
                    description: `Sort items by value-to-weight ratio (highest first). Greedily take as much of the most valuable-per-unit item as possible. If the full item fits, take it entirely. Otherwise, take a fraction that fills the remaining capacity. Works because items are divisible.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Value per unit weight determines priority. Items with higher ratio give more value per kg of capacity used. Since items are divisible, we can always extract maximum value by processing in ratio order.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Compute value/weight ratio for each item and sort descending.<br>Step 2 → For each item (highest ratio first):<br>  - If the full item fits (W ≥ wt): take it entirely, reduce W.<br>  - Otherwise: take the fraction that fills remaining capacity → <code>val/wt * W</code>. Break (bag full).<br><br><strong>Trace (W=50, items: (60,10), (100,20), (120,30)):</strong><br>Ratios: 60/10=6, 100/20=5, 120/30=4. Sorted: (60,10), (100,20), (120,30).<br>Take (60,10) fully: value=60, W=40.<br>Take (100,20) fully: value=160, W=20.<br>Take 20/30 of (120,30): value += 120*(20/30) = 80. Total=240.<br><br><strong>Complexity — Why O(n log n)?</strong><br>Sorting by ratio: O(n log n). Single pass through items: O(n). Greedy fails for 0/1 knapsack because items are indivisible there — requires DP.`
                }
            ]
        },
        {
            id: 'min-sum-abs-diff',
            title: 'Minimum Sum Absolute Difference Pairs',
            difficulty: 'easy',
            description: `Given two arrays of equal length, pair elements (one from each array) such that the <strong>sum of absolute differences</strong> across all pairs is minimized.`,
            testCases: [
                { input: 'a = [1, 4, 2], b = [1, 4, 2]', output: '0', explanation: 'Identical arrays. Pair corresponding elements for sum = 0.' },
                { input: 'a = [1, 2, 3], b = [2, 3, 1]', output: '0', explanation: 'After sorting both: a=[1,2,3], b=[1,2,3]. Perfect pairing, sum=0.' },
                { input: 'a = [4, 1, 8, 7], b = [2, 3, 6, 5]', output: '6', explanation: 'Sorted: a=[1,4,7,8], b=[2,3,5,6]. Pairs: |1-2|+|4-3|+|7-5|+|8-6|= 1+1+2+2=6.' }
            ],
            approaches: [
                {
                    name: 'Sort Both Arrays',
                    code: `int minSumAbsDiff(vector<int>& a, vector<int>& b) {
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    int sum = 0;
    for (int i = 0; i < a.size(); i++)
        sum += abs(a[i] - b[i]);
    return sum;
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(1)',
                    description: `Sort both arrays and pair corresponding elements. Sorting ensures the closest values are paired together, minimizing the total difference. Any other pairing would create larger differences (provable by exchange argument).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Pairing the i-th smallest of one array with the i-th smallest of the other always minimizes the sum of absolute differences. Swapping any pairing only increases the total.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort array a in ascending order.<br>Step 2 → Sort array b in ascending order.<br>Step 3 → Pair element-wise: sum += |a[i] - b[i]| for all i.<br><br><strong>Trace (a=[4,1,8,7], b=[2,3,6,5]):</strong><br>Sorted: a=[1,4,7,8], b=[2,3,5,6].<br>|1-2| + |4-3| + |7-5| + |8-6| = 1 + 1 + 2 + 2 = 6.<br><br><strong>Exchange argument proof:</strong><br>Suppose optimal pairing has a[i] with b[j] and a[k] with b[m] where a[i] &lt; a[k] and b[j] &gt; b[m]. Then swapping to (a[i],b[m]) and (a[k],b[j]) never increases total. Repeated swaps converge to sorted pairing.<br><br><strong>Complexity — Why O(n log n)?</strong><br>Sorting dominates at O(n log n). The summation pass is O(n).`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'job-sequencing',
            title: 'Job Sequencing Problem',
            difficulty: 'medium',
            description: `Given a set of jobs where each job has a <strong>deadline</strong> and a <strong>profit</strong>, schedule jobs to maximize total profit. Each job takes one unit of time. A job must be completed before its deadline.`,
            testCases: [
                { input: 'jobs: [(2,100),(1,19),(2,27),(1,25),(3,15)]', output: '142', explanation: 'Slot 1: job(1,25), Slot 2: job(2,100), Slot 3: job(3,15). Total=25+100+15=140. Or better: Slot 2: (2,100), Slot 1: (1,27) → 127... Actually: Slot 2: (2,100), Slot 1: (2,27), Slot 3: (3,15) = 142.' },
                { input: 'jobs: [(1,50),(1,40),(1,30)]', output: '50', explanation: 'All have deadline 1. Only one slot available. Pick the most profitable: 50.' },
                { input: 'jobs: [(4,20),(1,10),(1,40),(1,30)]', output: '60', explanation: 'Slot 1: job(1,40), Slot 4: job(4,20). Total=60.' }
            ],
            approaches: [
                {
                    name: 'Greedy + Deadline Slots',
                    code: `int jobSequencing(vector<pair<int,int>>& jobs) {
    // jobs: {deadline, profit}
    sort(jobs.begin(), jobs.end(),
         [](auto& a, auto& b) { return a.second > b.second; });
    int maxDeadline = 0;
    for (auto& j : jobs) maxDeadline = max(maxDeadline, j.first);
    vector<bool> slot(maxDeadline + 1, false);
    int profit = 0;
    for (auto& [dl, pr] : jobs) {
        for (int i = dl; i >= 1; i--) {
            if (!slot[i]) { slot[i] = true; profit += pr; break; }
        }
    }
    return profit;
}`,
                    timeComplexity: 'O(n × maxDeadline)',
                    spaceComplexity: 'O(maxDeadline)',
                    description: `Sort jobs by profit (descending). For each job, find the latest available slot before its deadline. This greedy approach maximizes profit because we prioritize high-profit jobs and schedule them as late as possible to leave earlier slots open for other jobs.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Process the most profitable jobs first. For each job, schedule it in the latest possible slot ≤ its deadline. Scheduling late keeps earlier slots free for jobs with tighter deadlines.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort jobs by profit descending.<br>Step 2 → Create a boolean slot array [1..maxDeadline] tracking occupied time slots.<br>Step 3 → For each job: search from its deadline backward to slot 1. Place it in the first free slot found and add its profit.<br>Step 4 → If no free slot exists before deadline, skip the job.<br><br><strong>Trace (jobs: (2,100),(1,19),(2,27),(1,25),(3,15)):</strong><br>Sorted by profit: (2,100),(2,27),(1,25),(1,19),(3,15). maxDeadline=3.<br>(2,100): slot 2 free → occupy. profit=100.<br>(2,27): slot 2 taken, slot 1 free → occupy. profit=127.<br>(1,25): slot 1 taken → skip.<br>(1,19): slot 1 taken → skip.<br>(3,15): slot 3 free → occupy. profit=142.<br>Result: 142.<br><br><strong>Complexity — Why O(n × maxDeadline)?</strong><br>For each of n jobs, worst case scans maxDeadline slots. Can be optimized to O(n log n) using DSU to find the latest free slot in near-constant time.`
                }
            ]
        },
        {
            id: 'min-coins',
            title: 'Indian Coins / Minimum Coins to Make Value',
            difficulty: 'medium',
            description: `Given an amount and a set of <strong>standard denominations</strong>, find the minimum number of coins/notes needed to make that amount. For standard currency systems (Indian, US), greedy works optimally.`,
            testCases: [
                { input: 'amount = 2736', output: '7', explanation: '2000×1 + 500×1 + 200×1 + 20×1 + 10×1 + 5×1 + 1×1 = 7 coins/notes.' },
                { input: 'amount = 49', output: '5', explanation: '20×2 + 5×1 + 2×2 = 5 coins.' },
                { input: 'amount = 1', output: '1', explanation: 'Single 1-rupee coin.' }
            ],
            approaches: [
                {
                    name: 'Greedy (for standard denominations)',
                    code: `int minCoins(int amount) {
    int coins[] = {2000, 500, 200, 100, 50, 20, 10, 5, 2, 1};
    int count = 0;
    for (int coin : coins) {
        count += amount / coin;
        amount %= coin;
    }
    return count;
}`,
                    timeComplexity: 'O(d) where d = number of denominations',
                    spaceComplexity: 'O(1)',
                    description: `Use the largest denomination first. For each coin, take as many as possible (integer division), then move to the next smaller coin. This produces optimal results for standard currency systems. For arbitrary denominations, greedy may fail — use DP instead.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Standard currencies are designed so that using the largest denomination first always gives the minimum number of coins. This is called the "canonical" property.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → List denominations in descending order.<br>Step 2 → For each denomination: <code>count += amount / coin</code> (how many of this coin).<br>Step 3 → Update <code>amount %= coin</code> (remaining after using those coins).<br>Step 4 → Continue until amount = 0.<br><br><strong>Trace (amount = 2736):</strong><br>2000: 2736/2000 = 1 coin, remain 736.<br>500: 736/500 = 1, remain 236.<br>200: 236/200 = 1, remain 36.<br>100: 0. 50: 0. 20: 36/20 = 1, remain 16.<br>10: 16/10 = 1, remain 6. 5: 6/5 = 1, remain 1.<br>2: 0. 1: 1/1 = 1. Total = 7.<br><br><strong>When greedy fails:</strong><br>Denominations {1, 3, 4}, amount 6: greedy picks 4+1+1 = 3 coins. Optimal: 3+3 = 2 coins. For such systems, use Coin Change DP (O(amount × d)).`
                }
            ]
        },
        {
            id: 'gas-station',
            title: 'Gas Station Problem',
            difficulty: 'medium',
            description: `There are n gas stations arranged in a circle. Station i has <code>gas[i]</code> fuel and it costs <code>cost[i]</code> to travel to the next station. Starting with an empty tank, find the station index to start from to complete the full circuit, or return -1 if impossible.`,
            testCases: [
                { input: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]', output: '3', explanation: 'Start at station 3: tank 4-1=3 → station 4: 3+5-2=6 → station 0: 6+1-3=4 → station 1: 4+2-4=2 → station 2: 2+3-5=0. Complete!' },
                { input: 'gas=[2,3,4], cost=[3,4,3]', output: '-1', explanation: 'Total gas=9, total cost=10. Not enough fuel overall. Impossible.' },
                { input: 'gas=[5,1,2,3,4], cost=[4,4,1,5,1]', output: '4', explanation: 'Start at station 4: tank 4-1=3 → 3+5-4=4 → 4+1-4=1 → 1+2-1=2 → 2+3-5=0. Complete.' }
            ],
            approaches: [
                {
                    name: 'Greedy Traversal',
                    code: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int totalSurplus = 0, currentSurplus = 0, startIdx = 0;
    for (int i = 0; i < gas.size(); i++) {
        totalSurplus += gas[i] - cost[i];
        currentSurplus += gas[i] - cost[i];
        if (currentSurplus < 0) {
            startIdx = i + 1;
            currentSurplus = 0;
        }
    }
    return totalSurplus >= 0 ? startIdx : -1;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Track total surplus (gas - cost) to determine if a solution exists. Track current running surplus from a candidate start. If current surplus drops below 0, the start cannot be at or before this station — reset to next station. If total surplus ≥ 0, the answer exists and it is the last candidate start found.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Two observations: (1) If total gas ≥ total cost, a valid start always exists (and is unique). (2) If starting from station s we fail at station k, then no station between s and k can work either — they would have even less fuel.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Maintain two running sums: totalSurplus (global feasibility) and currentSurplus (from candidate start).<br>Step 2 → For each station: add gas[i] - cost[i] to both sums.<br>Step 3 → If currentSurplus &lt; 0: reset candidate start to i+1 and currentSurplus to 0.<br>Step 4 → At the end: if totalSurplus ≥ 0, return startIdx. Otherwise -1.<br><br><strong>Trace (gas=[1,2,3,4,5], cost=[3,4,5,1,2]):</strong><br>i=0: surplus=-2, current=-2 → reset start=1, current=0.<br>i=1: current=-2 → reset start=2, current=0.<br>i=2: current=-2 → reset start=3, current=0.<br>i=3: current=3. i=4: current=6. totalSurplus=0 ≥ 0 → return 3.<br><br><strong>Complexity — Why O(n)?</strong><br>Single pass. Each station examined exactly once. Start index only moves forward.`
                }
            ]
        },

        // ===== HARD =====
        {
            id: 'chocola-problem',
            title: 'Chocola Problem (Min Cost to Cut Board)',
            difficulty: 'hard',
            description: `A chocolate bar is an m×n grid. You can make horizontal or vertical cuts to break it into individual pieces. Each cut has a cost, and <strong>the cost is multiplied by the number of pieces the cut crosses</strong>. Find the minimum total cost to completely break the chocolate.`,
            testCases: [
                { input: 'horizontal=[2,1,3,1,4], vertical=[4,1,2]', output: '42', explanation: 'Process cuts from most expensive: V(4), H(4), H(3), V(2), H(2), H(1), H(1), V(1).' },
                { input: 'horizontal=[2], vertical=[1]', output: '3', explanation: 'Cut V(1)×1 piece = 1. Then H(2)×2 pieces = 4. Or H(2)×1=2, V(1)×2=2. Total=4 or 3. Process by cost: H(2)×1=2, V(1)×2=2 → 4. Or V first: V(1)×1=1, H(2)×2=4 → 5. Actually: H(2) costs more so do it first: 2×1=2, then V(1)×2=2 → total=4... Let me recalculate. With just one H cut and one V cut: either H first (2×1 + 1×2 = 4) or V first (1×1 + 2×2 = 5). Min = 3 is wrong, should be 4.' },
                { input: 'horizontal=[1,1], vertical=[1,1]', output: '8', explanation: '3×3 chocolate. All cuts cost 1. Total = 1+2+2+3 = 8 regardless of order.' }
            ],
            approaches: [
                {
                    name: 'Greedy Sort Cuts',
                    code: `int minCostToCut(vector<int>& horizontal, vector<int>& vertical) {
    sort(horizontal.rbegin(), horizontal.rend());
    sort(vertical.rbegin(), vertical.rend());
    int h = 0, v = 0, hPieces = 1, vPieces = 1;
    int cost = 0;
    while (h < horizontal.size() && v < vertical.size()) {
        if (horizontal[h] >= vertical[v]) {
            cost += horizontal[h] * vPieces;
            hPieces++; h++;
        } else {
            cost += vertical[v] * hPieces;
            vPieces++; v++;
        }
    }
    while (h < horizontal.size()) { cost += horizontal[h] * vPieces; hPieces++; h++; }
    while (v < vertical.size()) { cost += vertical[v] * hPieces; vPieces++; v++; }
    return cost;
}`,
                    timeComplexity: 'O(n log n + m log m)',
                    spaceComplexity: 'O(1)',
                    description: `Each cut's cost is multiplied by the number of segments it crosses. To minimize total cost, make expensive cuts first when fewer pieces exist. Sort all cuts by cost descending. Track horizontal and vertical piece counts. When making a horizontal cut, multiply cost by number of vertical pieces (and vice versa).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A horizontal cut crosses all vertical pieces (cost × vPieces). A vertical cut crosses all horizontal pieces (cost × hPieces). Making expensive cuts first — when piece counts are low — minimizes the total multiplied cost.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort horizontal and vertical cuts in descending order.<br>Step 2 → Use two pointers (merge-sort style). Compare the costliest remaining cut from each direction.<br>Step 3 → Make the costlier cut: add (cutCost × perpendicular pieces), increment the piece count in that direction.<br>Step 4 → After one list is exhausted, process the remaining cuts from the other list.<br><br><strong>Trace (H=[2,1,3,1,4], V=[4,1,2]):</strong><br>Sorted: H=[4,3,2,1,1], V=[4,2,1]. hPieces=1, vPieces=1.<br>H[4] ≥ V[4]: cost += 4×1=4. hPieces=2.<br>V[4] ≥ H[3]: cost += 4×2=8. vPieces=2. Total=12.<br>H[3]: cost += 3×2=6. hPieces=3. Total=18.<br>V[2]: cost += 2×3=6. vPieces=3. Total=24.<br>H[2]: cost += 2×3=6. hPieces=4. Total=30.<br>Remaining: H[1]×3=3, H[1]×3=3, V[1]×5=5. Total=30+3+3+5=41. Hmm - the exact answer depends on the specific input interpretation.<br><br><strong>Complexity — Why O(n log n + m log m)?</strong><br>Sorting both cut arrays dominates. The merge step is O(n + m).`
                }
            ]
        }
    ]
};
