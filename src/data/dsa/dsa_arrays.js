// =================================================================
//  DSA — Arrays & 2D Matrices
// =================================================================
export const arraysData = {
    id: 'arrays-matrices',
    name: 'Arrays & 2D Matrices',
    icon: '📊',
    color: '#34d399',
    questions: [
        // ===== EASY =====
        {
            id: 'buy-sell-stock',
            title: 'Best Time to Buy and Sell Stock',
            difficulty: 'easy',
            description: `Given an array <strong>prices</strong> where prices[i] is the price of a stock on day i, find the maximum profit from one buy-sell transaction. You must buy before you sell.<br><br>Return 0 if no profit is possible.`,
            testCases: [
                { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6 - 1 = 5.' },
                { input: 'prices = [7, 6, 4, 3, 1]', output: '0', explanation: 'Prices only decrease — no profitable transaction exists.' },
                { input: 'prices = [2, 4, 1]', output: '2', explanation: 'Buy at 2, sell at 4. Profit = 2.' }
            ],
            approaches: [
                {
                    name: 'Single Pass',
                    code: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Track the minimum price seen so far. At each day, the maximum profit we could get by selling today is (current price - min price so far). Keep updating both the minimum price and the maximum profit as we scan left to right.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>For each day, we want the cheapest buying price before it. Maintain a running minimum and compute profit at each step — no need to look backward.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize <code>minPrice = INT_MAX</code>, <code>maxProfit = 0</code><br>Step 2 → For each price: update <code>minPrice = min(minPrice, price)</code><br>Step 3 → Compute profit: <code>maxProfit = max(maxProfit, price - minPrice)</code><br><br><strong>Trace (prices = [7, 1, 5, 3, 6, 4]):</strong><br>price=7: min=7, profit=0<br>price=1: min=1, profit=0<br>price=5: min=1, profit=4<br>price=3: min=1, profit=4<br>price=6: min=1, profit=<strong>5</strong><br>price=4: min=1, profit=5<br>Answer: 5 ✓`
                }
            ]
        },
        {
            id: 'majority-element',
            title: 'Majority Element',
            difficulty: 'easy',
            description: `Given an array of size <strong>n</strong>, find the element that appears more than <code>n/2</code> times. The majority element always exists in the input.<br><br>Can you solve it in O(1) space?`,
            testCases: [
                { input: 'nums = [3, 2, 3]', output: '3', explanation: '3 appears twice out of 3 elements (2 > 3/2).' },
                { input: 'nums = [2, 2, 1, 1, 1, 2, 2]', output: '2', explanation: '2 appears 4 times out of 7 elements.' },
                { input: 'nums = [1]', output: '1', explanation: 'Single element is trivially the majority.' }
            ],
            approaches: [
                {
                    name: "Moore's Voting Algorithm",
                    code: `int majorityElement(vector<int>& nums) {
    int candidate = nums[0], count = 1;
    for (int i = 1; i < nums.size(); i++) {
        if (count == 0) { candidate = nums[i]; count = 1; }
        else if (nums[i] == candidate) count++;
        else count--;
    }
    return candidate;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `The majority element appears more than n/2 times. We maintain a candidate and a count. When we see the candidate again, increment count; otherwise decrement. When count hits 0, pick a new candidate. The true majority element will always survive because it has more occurrences than all others combined.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Think of it as a voting system. The majority element has strictly more than half the votes. Even if every other element "cancels out" one of its votes, it still has votes remaining at the end.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Start with first element as candidate, count = 1<br>Step 2 → For each remaining element:<br>&nbsp;&nbsp;• count == 0 → adopt current as new candidate<br>&nbsp;&nbsp;• same as candidate → count++<br>&nbsp;&nbsp;• different → count-- (cancellation)<br>Step 3 → Return surviving candidate<br><br><strong>Trace (nums = [2, 2, 1, 1, 1, 2, 2]):</strong><br>Start: candidate=2, count=1<br>2 → count=2 | 1 → count=1 | 1 → count=0<br>1 → candidate=1, count=1 | 2 → count=0<br>2 → candidate=2, count=1<br>Answer: <strong>2</strong> ✓`
                }
            ]
        },
        {
            id: 'diagonal-sum-matrix',
            title: 'Diagonal Sum of a Matrix',
            difficulty: 'easy',
            description: `Given an <strong>n × n</strong> matrix, return the sum of its primary diagonal and secondary diagonal elements. If n is odd, the center element (shared by both diagonals) should be counted only once.`,
            testCases: [
                { input: 'mat = [[1,2,3],[4,5,6],[7,8,9]]', output: '25', explanation: 'Primary: 1+5+9=15. Secondary: 3+5+7=15. Center 5 shared once → 25.' },
                { input: 'mat = [[1,0],[0,1]]', output: '2', explanation: 'Primary: 1+1=2. Secondary: 0+0=0. Total: 2.' },
                { input: 'mat = [[5]]', output: '5', explanation: 'Single element matrix.' }
            ],
            approaches: [
                {
                    name: 'Single Pass',
                    code: `int diagonalSum(vector<vector<int>>& mat) {
    int n = mat.size(), sum = 0;
    for (int i = 0; i < n; i++) {
        sum += mat[i][i];           // primary diagonal
        if (i != n - 1 - i)
            sum += mat[i][n - 1 - i]; // secondary diagonal
    }
    return sum;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `For an n×n matrix, the primary diagonal elements are at (i, i) and secondary diagonal at (i, n-1-i). We iterate once through rows, adding both. We check i != n-1-i to avoid double-counting the center element in odd-sized matrices.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Primary diagonal: row index == column index. Secondary diagonal: column = n-1-row. When n is odd, both diagonals share the center cell — guard against double-counting with <code>i != n-1-i</code>.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → For each row i: add <code>mat[i][i]</code> (primary)<br>Step 2 → If <code>i != n-1-i</code>: add <code>mat[i][n-1-i]</code> (secondary, not center)<br><br><strong>Trace (mat = [[1,2,3],[4,5,6],[7,8,9]]):</strong><br>i=0: sum += 1 (primary) + 3 (secondary) = 4<br>i=1: sum += 5 (primary), skip secondary (center)<br>i=2: sum += 9 (primary) + 7 (secondary) = 20+5 = <strong>25</strong> ✓`
                }
            ]
        },
        // ===== MEDIUM =====
        {
            id: 'max-subarray-sum',
            title: 'Maximum Subarray Sum',
            difficulty: 'medium',
            description: `Given an integer array <strong>nums</strong>, find the contiguous subarray with the largest sum and return that sum.<br><br><strong>Example:</strong> nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4] → Maximum subarray is [4, -1, 2, 1] with sum 6.`,
            testCases: [
                { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'Subarray [4, -1, 2, 1] has the maximum sum of 6.' },
                { input: 'nums = [1]', output: '1', explanation: 'Single element array.' },
                { input: 'nums = [-1, -2, -3]', output: '-1', explanation: 'All negative — pick the least negative.' }
            ],
            approaches: [
                {
                    name: "Kadane's Algorithm",
                    code: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currSum = max(nums[i], currSum + nums[i]);
        maxSum = max(maxSum, currSum);
    }
    return maxSum;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `At each element, decide: either start a new subarray from current element, or extend the previous subarray. If accumulated sum becomes negative and adding current element doesn't help, start fresh. Track the global maximum throughout. This greedy approach works because a negative prefix can never improve a future subarray.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A negative running sum hurts any future extension. At each index, choose: extend the current subarray or start fresh. This local decision at every step yields the global optimum.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>currSum = maxSum = nums[0]</code><br>Step 2 → For each element: <code>currSum = max(nums[i], currSum + nums[i])</code><br>Step 3 → Update <code>maxSum = max(maxSum, currSum)</code><br><br><strong>Trace (nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]):</strong><br>-2 → curr=-2, max=-2<br>1 → curr=max(1, -1)=1, max=1<br>-3 → curr=-2, max=1<br>4 → curr=max(4, 2)=4, max=4<br>-1 → curr=3, max=4<br>2 → curr=5, max=5<br>1 → curr=6, max=<strong>6</strong><br>-5 → curr=1 | 4 → curr=5<br>Answer: 6 ✓`
                },
                {
                    name: 'Prefix Sum',
                    code: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], prefixSum = 0, minPrefix = 0;
    for (int i = 0; i < nums.size(); i++) {
        prefixSum += nums[i];
        maxSum = max(maxSum, prefixSum - minPrefix);
        minPrefix = min(minPrefix, prefixSum);
    }
    return maxSum;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `The sum of subarray [i, j] = prefix[j] - prefix[i-1]. To maximize this, for each j we want the minimum prefix sum before it. Track running prefix sum and the minimum prefix seen so far. The difference gives the maximum subarray sum ending at or before the current index.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Subarray sum [i..j] = prefix[j] - prefix[i-1]. To maximize this difference, track the minimum prefix sum seen so far and subtract it from the current prefix sum.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>prefixSum = 0, minPrefix = 0</code><br>Step 2 → At each i: <code>prefixSum += nums[i]</code><br>Step 3 → <code>maxSum = max(maxSum, prefixSum - minPrefix)</code><br>Step 4 → <code>minPrefix = min(minPrefix, prefixSum)</code><br><br><strong>Trace (nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]):</strong><br>prefix=-2: max=-2-0=-2, minP=-2<br>prefix=-1: max=-1-(-2)=1, minP=-2<br>prefix=-4: max=1, minP=-4<br>prefix=0: max=0-(-4)=4, minP=-4<br>prefix=3: max=3-(-4)=7... wait, let me recalculate:<br>Actually prefix at i=5: sum=3, max=3-(-4)=7? No — prefix[5]=(-2+1-3+4-1+2)=1, max=1-(-4)=5<br>prefix[6]=2, max=2-(-4)=<strong>6</strong> ✓`
                }
            ]
        },
        {
            id: 'two-sum',
            title: 'Two Sum / Pairs in Array',
            difficulty: 'medium',
            description: `Given an array <strong>nums</strong> and a target integer, return the indices of two numbers that add up to the target. Each input has exactly one solution, and the same element cannot be used twice.`,
            testCases: [
                { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
                { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
                { input: 'nums = [3, 3], target = 6', output: '[0, 1]', explanation: 'Both elements are 3, and 3 + 3 = 6.' }
            ],
            approaches: [
                {
                    name: 'Hash Map',
                    code: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.count(complement))
            return {mp[complement], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `For each element, compute its complement (target - current). Check if the complement exists in our hash map. If yes, we found the pair. Otherwise, store the current element's index. One pass through the array suffices since by the time we reach the second element of any valid pair, the first is already in the map.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Instead of checking every pair (O(n²)), store previously seen values in a hash map. For each new element, check whether its complement already exists — this converts a nested loop into a single pass.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → For each element, compute <code>complement = target - nums[i]</code><br>Step 2 → If complement exists in map → return {map[complement], i}<br>Step 3 → Else store nums[i] → i in map<br><br><strong>Trace (nums = [2, 7, 11, 15], target = 9):</strong><br>i=0: complement=7, map={} → miss. Store 2→0<br>i=1: complement=2, map={2:0} → hit! Return [0, 1] ✓`
                },
                {
                    name: 'Two Pointers (sorted)',
                    code: `// Assumes array is sorted or we sort it first
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}`,
                    timeComplexity: 'O(n log n) with sort, O(n) if pre-sorted',
                    spaceComplexity: 'O(1)',
                    description: `With a sorted array, use two pointers — one at start, one at end. If their sum is too small, move left pointer right to increase it. If too large, move right pointer left. They converge toward the target. This uses constant extra space but requires sorting first.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>In a sorted array, the two-pointer technique exploits monotonicity: moving left increases the sum, moving right decreases it. This binary-search-like narrowing converges in O(n).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → left = 0, right = n-1<br>Step 2 → If sum == target → found<br>Step 3 → If sum < target → left++ (need larger)<br>Step 4 → If sum > target → right-- (need smaller)<br><br><strong>Trace (sorted [2, 7, 11, 15], target = 9):</strong><br>left=0, right=3: 2+15=17 > 9 → right--<br>left=0, right=2: 2+11=13 > 9 → right--<br>left=0, right=1: 2+7=9 == 9 → return [0,1] ✓`
                }
            ]
        },
        {
            id: 'sort-012',
            title: 'Sort an Array of 0s, 1s & 2s',
            difficulty: 'medium',
            description: `Given an array containing only <strong>0</strong>, <strong>1</strong>, and <strong>2</strong>, sort it in-place without using a standard sorting algorithm. This is the classic Dutch National Flag problem.<br><br>Can you do it in a single pass?`,
            testCases: [
                { input: 'nums = [2, 0, 2, 1, 1, 0]', output: '[0, 0, 1, 1, 2, 2]', explanation: 'All 0s first, then 1s, then 2s.' },
                { input: 'nums = [2, 0, 1]', output: '[0, 1, 2]', explanation: 'One of each element.' },
                { input: 'nums = [0]', output: '[0]', explanation: 'Single element, already sorted.' }
            ],
            approaches: [
                {
                    name: 'Dutch National Flag Algorithm',
                    code: `void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1) mid++;
        else swap(nums[mid], nums[high--]);
    }
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Maintain three pointers: low (boundary of 0s), mid (current), high (boundary of 2s). Elements before low are 0, between low and mid are 1, after high are 2. If mid sees 0, swap with low and advance both. If 1, just advance mid. If 2, swap with high and shrink high (don't advance mid since swapped element is unexamined).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Partition the array into three regions using three pointers. The invariant: everything left of low is 0, everything right of high is 2, everything between low and mid is 1. Mid scans through the unsorted region.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → low = 0, mid = 0, high = n-1<br>Step 2 → While mid ≤ high:<br>&nbsp;&nbsp;• nums[mid]==0 → swap(low, mid), low++, mid++<br>&nbsp;&nbsp;• nums[mid]==1 → mid++ (already in place)<br>&nbsp;&nbsp;• nums[mid]==2 → swap(mid, high), high-- (don't advance mid)<br><br><strong>Trace (nums = [2, 0, 2, 1, 1, 0]):</strong><br>low=0, mid=0, high=5: nums[0]=2 → swap(0,5) → [0,0,2,1,1,2], high=4<br>mid=0: nums[0]=0 → swap(0,0), low=1, mid=1<br>mid=1: nums[1]=0 → swap(1,1), low=2, mid=2<br>mid=2: nums[2]=2 → swap(2,4) → [0,0,1,1,2,2], high=3<br>mid=2: nums[2]=1 → mid=3<br>mid=3: nums[3]=1 → mid=4 > high=3 → done<br>Result: [0, 0, 1, 1, 2, 2] ✓`
                }
            ]
        },
        {
            id: 'container-most-water',
            title: 'Container with Most Water',
            difficulty: 'medium',
            description: `Given an array <strong>height</strong> of n vertical lines, find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water.<br><br>The container's area is limited by the shorter line.`,
            testCases: [
                { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 (h=8) and index 8 (h=7): area = min(8,7) × 7 = 49.' },
                { input: 'height = [1, 1]', output: '1', explanation: 'min(1,1) × 1 = 1.' },
                { input: 'height = [4, 3, 2, 1, 4]', output: '16', explanation: 'Lines at index 0 and 4: min(4,4) × 4 = 16.' }
            ],
            approaches: [
                {
                    name: 'Two Pointers',
                    code: `int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        maxWater = max(maxWater, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Start with widest container (left=0, right=n-1). Area = min(heights) × width. The shorter line limits the container height, so moving the taller pointer inward can only decrease width without guaranteed height increase. Always move the shorter pointer inward to potentially find a taller line.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Start with maximum width. The bottleneck is always the shorter line. Moving the taller side inward can only reduce area (width decreases, height stays limited). Moving the shorter side has a chance of finding a taller line that compensates for reduced width.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → left = 0, right = n-1<br>Step 2 → Compute area = min(h[left], h[right]) × (right - left)<br>Step 3 → Move the shorter pointer inward<br><br><strong>Trace (height = [1,8,6,2,5,4,8,3,7]):</strong><br>l=0, r=8: min(1,7)×8 = 8<br>l=1, r=8: min(8,7)×7 = <strong>49</strong><br>l=1, r=7: min(8,3)×6 = 18<br>...continues but max stays 49 ✓`
                }
            ]
        },
        {
            id: 'product-except-self',
            title: 'Product of Array Except Self',
            difficulty: 'medium',
            description: `Given an integer array <strong>nums</strong>, return an array where <code>result[i]</code> equals the product of all elements except <code>nums[i]</code>.<br><br><strong>Constraint:</strong> Solve without using division. Expected O(n) time.`,
            testCases: [
                { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]', explanation: 'result[0] = 2×3×4=24, result[1] = 1×3×4=12, etc.' },
                { input: 'nums = [-1, 1, 0, -3, 3]', output: '[0, 0, 9, 0, 0]', explanation: 'Only result[2] is non-zero since all others multiply by 0.' },
                { input: 'nums = [2, 3]', output: '[3, 2]', explanation: 'result[0]=3, result[1]=2.' }
            ],
            approaches: [
                {
                    name: 'Prefix & Suffix',
                    code: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    // Left pass: result[i] = product of all elements to the left
    for (int i = 1; i < n; i++)
        result[i] = result[i - 1] * nums[i - 1];
    // Right pass: multiply by product of all elements to the right
    int suffix = 1;
    for (int i = n - 2; i >= 0; i--) {
        suffix *= nums[i + 1];
        result[i] *= suffix;
    }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1) — excluding output array',
                    description: `For each index i, we need the product of everything left of i times everything right of i. First pass: build prefix products from left. Second pass: maintain a running suffix product from right and multiply into the result. This avoids division and handles zeros correctly.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Product at index i = (product of everything before i) × (product of everything after i). Build prefix products in one pass, suffix in another. The output array stores prefix first, then gets multiplied by suffix in-place.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Left pass: <code>result[i] = result[i-1] * nums[i-1]</code> (prefix product)<br>Step 2 → Right pass: maintain <code>suffix</code>, multiply into result[i]<br><br><strong>Trace (nums = [1, 2, 3, 4]):</strong><br>Left pass: result = [1, 1, 2, 6]<br>&nbsp;&nbsp;(each position holds product of all elements before it)<br>Right pass: suffix starts at 1<br>&nbsp;&nbsp;i=2: suffix=4, result[2]=2×4=8<br>&nbsp;&nbsp;i=1: suffix=12, result[1]=1×12=12<br>&nbsp;&nbsp;i=0: suffix=24, result[0]=1×24=24<br>Result: [24, 12, 8, 6] ✓`
                }
            ]
        },
        {
            id: '3sum',
            title: '3 Sum Problem',
            difficulty: 'medium',
            description: `Given an integer array <strong>nums</strong>, find all unique triplets that sum to zero. The solution must not contain duplicate triplets.<br><br><strong>Example:</strong> nums = [-1, 0, 1, 2, -1, -4] → [[-1, -1, 2], [-1, 0, 1]].`,
            testCases: [
                { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'Two unique triplets sum to zero.' },
                { input: 'nums = [0, 0, 0]', output: '[[0, 0, 0]]', explanation: 'Only one valid triplet.' },
                { input: 'nums = [0, 1, 1]', output: '[]', explanation: 'No triplet sums to zero.' }
            ],
            approaches: [
                {
                    name: 'Sort + Two Pointers',
                    code: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1) — excluding output',
                    description: `Sort the array. Fix one element and use two pointers for the remaining two. Skip duplicates at every level to avoid duplicate triplets. For each fixed element i, move left/right pointers toward each other. If sum < 0, increase left; if > 0, decrease right; if == 0, record and skip duplicates.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Sorting enables two things: (1) the two-pointer technique works on the remaining subarray, and (2) duplicates become adjacent, making them trivial to skip.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort the array<br>Step 2 → Fix element i, skip if duplicate of previous<br>Step 3 → Two pointers (left = i+1, right = n-1):<br>&nbsp;&nbsp;• sum == 0 → record, skip duplicates, move both<br>&nbsp;&nbsp;• sum < 0 → left++<br>&nbsp;&nbsp;• sum > 0 → right--<br><br><strong>Trace (nums = [-4,-1,-1,0,1,2]):</strong><br>i=0 (-4): left=-1, right=2 → sum=-3 < 0...no triplet found<br>i=1 (-1): left=-1, right=2 → sum=0! Record [-1,-1,2]<br>&nbsp;&nbsp;left=0, right=1 → sum=0! Record [-1,0,1]<br>i=2: skip (duplicate of -1)<br>Answer: [[-1,-1,2], [-1,0,1]] ✓`
                }
            ]
        },
        {
            id: 'subarray-sum-k',
            title: 'Subarray Sum Equals K',
            difficulty: 'medium',
            description: `Given an integer array <strong>nums</strong> and an integer <strong>k</strong>, return the total number of contiguous subarrays whose sum equals k.<br><br>Elements can be negative, so sliding window alone won't work.`,
            testCases: [
                { input: 'nums = [1, 1, 1], k = 2', output: '2', explanation: 'Subarrays [1,1] (indices 0-1) and [1,1] (indices 1-2).' },
                { input: 'nums = [1, 2, 3], k = 3', output: '2', explanation: 'Subarrays [1,2] and [3].' },
                { input: 'nums = [1, -1, 0], k = 0', output: '3', explanation: '[1,-1], [-1,0], [1,-1,0] all sum to 0.' }
            ],
            approaches: [
                {
                    name: 'Prefix Sum + Hash Map',
                    code: `int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;
    int sum = 0, count = 0;
    for (int num : nums) {
        sum += num;
        if (prefixCount.count(sum - k))
            count += prefixCount[sum - k];
        prefixCount[sum]++;
    }
    return count;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `If prefix[j] - prefix[i] = k, then the subarray (i, j] sums to k. For each index j, we need to count how many previous prefix sums equal (prefix[j] - k). A hash map stores the frequency of each prefix sum. We initialize with 0→1 to handle subarrays starting from index 0.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Subarray sum [i+1..j] = prefix[j] - prefix[i]. If prefix[j] - k = prefix[i] for some earlier i, that subarray has sum k. Store frequency of each prefix sum to count all valid i's efficiently.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize map with {0: 1} (empty prefix)<br>Step 2 → For each element: <code>sum += num</code><br>Step 3 → <code>count += prefixCount[sum - k]</code><br>Step 4 → <code>prefixCount[sum]++</code><br><br><strong>Trace (nums = [1, 1, 1], k = 2):</strong><br>Start: map={0:1}<br>num=1: sum=1, sum-k=-1 → 0. map={0:1, 1:1}<br>num=1: sum=2, sum-k=0 → count += 1. map={0:1, 1:1, 2:1}<br>num=1: sum=3, sum-k=1 → count += 1. count = <strong>2</strong> ✓`
                }
            ]
        },
        {
            id: 'largest-subarray-sum-0',
            title: 'Largest Subarray with Sum 0',
            difficulty: 'medium',
            description: `Given an array of integers (positive and negative), find the length of the longest subarray with sum equal to 0.<br><br><strong>Example:</strong> arr = [15, -2, 2, -8, 1, 7, 10, 23] → Longest subarray with sum 0 is [-2, 2, -8, 1, 7] with length 5.`,
            testCases: [
                { input: 'arr = [15, -2, 2, -8, 1, 7, 10, 23]', output: '5', explanation: 'Subarray [-2, 2, -8, 1, 7] has sum 0 and length 5.' },
                { input: 'arr = [1, 2, -3, 3]', output: '3', explanation: 'Subarray [1, 2, -3] has sum 0.' },
                { input: 'arr = [1, 2, 3]', output: '0', explanation: 'No subarray sums to 0.' }
            ],
            approaches: [
                {
                    name: 'Prefix Sum + Hash Map',
                    code: `int maxLen(vector<int>& arr) {
    unordered_map<int, int> firstOccurrence;
    int sum = 0, maxLength = 0;
    for (int i = 0; i < arr.size(); i++) {
        sum += arr[i];
        if (sum == 0) maxLength = i + 1;
        else if (firstOccurrence.count(sum))
            maxLength = max(maxLength, i - firstOccurrence[sum]);
        else firstOccurrence[sum] = i;
    }
    return maxLength;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `If the same prefix sum appears at indices i and j (j > i), the subarray from i+1 to j has sum 0. Store the first occurrence of each prefix sum. For maximum length, we want the earliest occurrence. If prefix sum becomes 0 at index i, the subarray [0, i] itself sums to 0.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Same prefix sum at two different indices means the subarray between them sums to zero. To maximize length, store only the first index where each prefix sum appears — the earlier the first occurrence, the longer the subarray.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Track running sum and store first occurrence of each prefix sum<br>Step 2 → If sum == 0: entire prefix [0..i] is valid<br>Step 3 → If sum seen before: <code>length = i - firstOccurrence[sum]</code><br>Step 4 → Update maxLength<br><br><strong>Trace (arr = [15, -2, 2, -8, 1, 7, 10, 23]):</strong><br>sum: 15, 13, 15, 7, 8, 15, 25, 48<br>Index 0: sum=15 → store 15→0<br>Index 2: sum=15 → seen at 0 → length=2-0=2<br>Index 5: sum=15 → seen at 0 → length=5-0=<strong>5</strong> ✓`
                }
            ]
        },
        {
            id: 'next-permutation',
            title: 'Next Permutation Problem',
            difficulty: 'medium',
            description: `Given an array of integers, rearrange it into the lexicographically next greater permutation. If the array is the largest permutation, rearrange it to the smallest (sorted ascending).<br><br>Must be done in-place with O(1) extra space.`,
            testCases: [
                { input: 'nums = [1, 2, 3]', output: '[1, 3, 2]', explanation: 'Next permutation after [1,2,3] is [1,3,2].' },
                { input: 'nums = [3, 2, 1]', output: '[1, 2, 3]', explanation: 'Largest permutation wraps to smallest.' },
                { input: 'nums = [1, 1, 5]', output: '[1, 5, 1]', explanation: 'Swap 1 and 5, then reverse suffix.' }
            ],
            approaches: [
                {
                    name: 'Optimal In-place',
                    code: `void nextPermutation(vector<int>& nums) {
    int n = nums.size(), i = n - 2;
    // Step 1: Find rightmost element smaller than its next
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        // Step 2: Find rightmost element greater than nums[i]
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);
    }
    // Step 3: Reverse the suffix after i
    reverse(nums.begin() + i + 1, nums.end());
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Find the rightmost position i where nums[i] < nums[i+1] (the suffix after i is non-increasing). Swap nums[i] with the smallest element in the suffix that is larger than nums[i]. Then reverse the suffix to get the smallest permutation that is larger than the original. If no such i exists, array is fully descending — reverse all to get the smallest permutation.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>The suffix that is already in descending order cannot be made any larger. We look for the first "dip" from the right — the position where we can make a minimal increase. Swapping with the smallest larger element and reversing the suffix gives the next permutation.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Scan right-to-left: find first i where <code>nums[i] < nums[i+1]</code><br>Step 2 → Find rightmost j where <code>nums[j] > nums[i]</code>, swap them<br>Step 3 → Reverse suffix after position i<br><br><strong>Trace (nums = [1, 2, 3]):</strong><br>Step 1: i=1 (nums[1]=2 < nums[2]=3)<br>Step 2: j=2 (nums[2]=3 > 2) → swap → [1, 3, 2]<br>Step 3: reverse suffix after i=1 → [2] → stays [1, 3, 2] ✓`
                }
            ]
        },
        {
            id: 'search-2d-matrix',
            title: 'Search a 2D Matrix',
            difficulty: 'medium',
            description: `Given an <strong>m × n</strong> matrix where rows and columns are sorted in ascending order, search for a target value efficiently.<br><br>Return true if the target exists in the matrix.`,
            testCases: [
                { input: 'matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5', output: 'true', explanation: '5 is found at position (1,1).' },
                { input: 'matrix = [[1,4],[2,5],[3,6]], target = 7', output: 'false', explanation: '7 does not exist in the matrix.' },
                { input: 'matrix = [[1]], target = 1', output: 'true', explanation: 'Single element equals target.' }
            ],
            approaches: [
                {
                    name: 'Staircase Search',
                    code: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int rows = matrix.size(), cols = matrix[0].size();
    int r = 0, c = cols - 1; // Start top-right
    while (r < rows && c >= 0) {
        if (matrix[r][c] == target) return true;
        else if (matrix[r][c] > target) c--;
        else r++;
    }
    return false;
}`,
                    timeComplexity: 'O(m + n)',
                    spaceComplexity: 'O(1)',
                    description: `Start from the top-right corner. If current element equals target, found. If current > target, move left (eliminates column). If current < target, move down (eliminates row). This works because rows are sorted left to right and columns top to bottom, creating a staircase decision boundary.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>The top-right corner is special: everything to its left is smaller, everything below is larger. Each comparison eliminates an entire row or column, giving O(m+n) search in a 2D sorted matrix.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Start at (0, cols-1)<br>Step 2 → If equal → found<br>Step 3 → If current > target → move left (eliminate column)<br>Step 4 → If current < target → move down (eliminate row)<br><br><strong>Trace (matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5):</strong><br>(0,2)=7 > 5 → left<br>(0,1)=4 < 5 → down<br>(1,1)=5 == 5 → found ✓`
                }
            ]
        },
        {
            id: 'spiral-matrix',
            title: 'Spiral Matrix Traversal',
            difficulty: 'medium',
            description: `Given an <strong>m × n</strong> matrix, return all elements in spiral order (clockwise from outside in).<br><br><strong>Example:</strong> [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5].`,
            testCases: [
                { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Spiral: right → down → left → up → center.' },
                { input: 'matrix = [[1,2],[3,4]]', output: '[1,2,4,3]', explanation: 'Right → down → left.' },
                { input: 'matrix = [[1]]', output: '[1]', explanation: 'Single element.' }
            ],
            approaches: [
                {
                    name: 'Boundary Shrinking',
                    code: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) result.push_back(matrix[top][i]);
        top++;
        for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        if (top <= bottom)
            for (int i = right; i >= left; i--) result.push_back(matrix[bottom][i]);
        bottom--;
        if (left <= right)
            for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
        left++;
    }
    return result;
}`,
                    timeComplexity: 'O(m × n)',
                    spaceComplexity: 'O(1) — excluding output',
                    description: `Maintain four boundaries: top, bottom, left, right. Traverse right along top row, then down right column, then left along bottom row, then up left column. After each traversal, shrink the corresponding boundary. Additional checks prevent duplicate traversals when boundaries cross in non-square matrices.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Simulate the spiral by peeling off one layer at a time. Each layer consists of four traversals (right, down, left, up). After each layer, shrink the boundaries inward. Guard conditions between bottom/left traversals prevent duplicate reads on single-row/column remainders.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Traverse top row left→right, then top++<br>Step 2 → Traverse right column top→bottom, then right--<br>Step 3 → If top ≤ bottom: traverse bottom row right→left, then bottom--<br>Step 4 → If left ≤ right: traverse left column bottom→top, then left++<br><br><strong>Trace ([[1,2,3],[4,5,6],[7,8,9]]):</strong><br>Layer 1: right [1,2,3] → down [6,9] → left [8,7] → up [4]<br>Layer 2: right [5]<br>Result: [1,2,3,6,9,8,7,4,5] ✓`
                }
            ]
        },
        // ===== HARD =====
        {
            id: 'trapping-rainwater',
            title: 'Trapping Rainwater',
            difficulty: 'hard',
            description: `Given an array <strong>height</strong> representing an elevation map (width of each bar is 1), compute how much water can be trapped after rain.<br><br><strong>Example:</strong> height = [0,1,0,2,1,0,1,3,2,1,2,1] → 6 units of water trapped.`,
            testCases: [
                { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'Water fills the valleys between the bars.' },
                { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: 'Large container between h=4 and h=5 fills most of the volume.' },
                { input: 'height = [1, 2, 3]', output: '0', explanation: 'Strictly increasing — no water can be trapped.' }
            ],
            approaches: [
                {
                    name: 'Two Pointers',
                    code: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Water at any position = min(maxLeft, maxRight) - height. Use two pointers from both ends. The shorter side determines the water level. If left height < right height, leftMax is the bottleneck (rightMax is at least as large), so calculate water at left and advance. Vice versa for right. This guarantees correct water computation without precomputing arrays.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Water above each bar = min(tallest bar to its left, tallest to its right) - bar height. The two-pointer approach works because: if h[left] < h[right], the water at left is determined by leftMax (rightMax is guaranteed ≥ h[right] > h[left], so it doesn't limit).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → left=0, right=n-1, leftMax=rightMax=0<br>Step 2 → Process the shorter side:<br>&nbsp;&nbsp;• h[left] < h[right] → update leftMax, add leftMax-h[left], left++<br>&nbsp;&nbsp;• else → update rightMax, add rightMax-h[right], right--<br><br><strong>Trace (height = [4, 2, 0, 3, 2, 5]):</strong><br>l=0(4) < r=5(5): leftMax=4, water+=0, l=1<br>l=1(2) < r=5(5): leftMax=4, water+=4-2=2, l=2<br>l=2(0): water+=4-0=4, l=3<br>l=3(3): water+=4-3=1, l=4<br>l=4(2): water+=4-2=2, l=5<br>Total: 0+2+4+1+2 = <strong>9</strong> ✓`
                },
                {
                    name: 'Prefix Max / Suffix Max',
                    code: `int trap(vector<int>& height) {
    int n = height.size();
    vector<int> leftMax(n), rightMax(n);
    leftMax[0] = height[0];
    for (int i = 1; i < n; i++)
        leftMax[i] = max(leftMax[i - 1], height[i]);
    rightMax[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; i--)
        rightMax[i] = max(rightMax[i + 1], height[i]);
    int water = 0;
    for (int i = 0; i < n; i++)
        water += min(leftMax[i], rightMax[i]) - height[i];
    return water;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Precompute two arrays: leftMax[i] = max height from 0 to i, rightMax[i] = max height from i to n-1. Water trapped at each bar = min(leftMax[i], rightMax[i]) - height[i]. Sum all positive contributions. The minimum of the two maxes determines the water level at each position.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Directly compute water at each bar using the formula: water[i] = min(leftMax[i], rightMax[i]) - height[i]. Precomputing both max arrays in separate passes makes each lookup O(1).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Build leftMax[i] = max(height[0..i]) left to right<br>Step 2 → Build rightMax[i] = max(height[i..n-1]) right to left<br>Step 3 → Sum min(leftMax[i], rightMax[i]) - height[i] for all i<br><br><strong>Trace (height = [4, 2, 0, 3, 2, 5]):</strong><br>leftMax:  [4, 4, 4, 4, 4, 5]<br>rightMax: [5, 5, 5, 5, 5, 5]<br>water: min(4,5)-4=0, min(4,5)-2=2, min(4,5)-0=4, min(4,5)-3=1, min(4,5)-2=2, min(5,5)-5=0<br>Total: 0+2+4+1+2+0 = <strong>9</strong> ✓`
                }
            ]
        },
        {
            id: '4sum',
            title: '4 Sum Problem',
            difficulty: 'hard',
            description: `Given an array <strong>nums</strong> and a target, find all unique quadruplets that sum to the target. No duplicate quadruplets allowed.<br><br>Extends the 3Sum technique with an additional outer loop.`,
            testCases: [
                { input: 'nums = [1, 0, -1, 0, -2, 2], target = 0', output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]', explanation: 'Three unique quadruplets sum to 0.' },
                { input: 'nums = [2, 2, 2, 2, 2], target = 8', output: '[[2, 2, 2, 2]]', explanation: 'Only one unique quadruplet despite duplicates.' },
                { input: 'nums = [0, 0, 0, 0], target = 0', output: '[[0, 0, 0, 0]]', explanation: 'All zeros.' }
            ],
            approaches: [
                {
                    name: 'Sort + Two Pointers',
                    code: `vector<vector<int>> fourSum(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    int n = nums.size();
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    result.push_back({nums[i], nums[j], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < target) left++;
                else right--;
            }
        }
    }
    return result;
}`,
                    timeComplexity: 'O(n³)',
                    spaceComplexity: 'O(1) — excluding output',
                    description: `Extension of 3Sum. Fix two elements with nested loops, use two pointers for the remaining two. Sort first for deduplication and two-pointer technique. Skip duplicates at every level. Use long long for sum to avoid integer overflow. The two outer loops give O(n²) and two pointers give O(n) for O(n³) total.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Generalization of 3Sum: fix two elements (i, j), then use two pointers for the remaining pair. Sorting + duplicate skipping at all four levels ensures unique quadruplets.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Sort array<br>Step 2 → Outer loop i, inner loop j (both skip duplicates)<br>Step 3 → Two pointers: left=j+1, right=n-1<br>Step 4 → Adjust pointers based on sum comparison, skip duplicates on match<br><br><strong>Trace (nums = [-2,-1,0,0,1,2], target = 0):</strong><br>i=0(-2), j=1(-1): left=0, right=2 → sum=0 → [-2,-1,1,2]<br>i=0(-2), j=2(0): left=0, right=2 → sum=0 → [-2,0,0,2]<br>i=1(-1), j=2(0): left=0, right=1 → sum=0 → [-1,0,0,1]<br>Result: 3 unique quadruplets ✓<br><br><strong>Complexity — Why long long?</strong> Four ints can overflow 32 bits (e.g., 4 × 10⁹ > 2³¹-1). Casting to long long prevents undefined behavior.`
                }
            ]
        }
    ]
};
