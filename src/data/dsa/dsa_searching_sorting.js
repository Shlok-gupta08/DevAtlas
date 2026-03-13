// =================================================================
//  DSA — Searching & Sorting Applications
// =================================================================
export const searchingSortingData = {
    id: 'searching-sorting',
    name: 'Searching & Sorting',
    icon: '🔍',
    color: '#f472b6',
    questions: [
        // ===== EASY =====
        {
            id: 'binary-search',
            title: 'Binary Search (Iterative & Recursive)',
            difficulty: 'easy',
            description: `<p>Given a sorted array of integers <strong>arr</strong> and a <strong>target</strong> value, return the index of the target if found, or <strong>-1</strong> if not present.</p>`,
            testCases: [
                { input: 'arr = [1, 3, 5, 7, 9, 11], target = 7', output: '3', explanation: 'arr[3] = 7, so return index 3.' },
                { input: 'arr = [2, 4, 6, 8], target = 5', output: '-1', explanation: '5 is not present in the array.' },
                { input: 'arr = [10], target = 10', output: '0', explanation: 'Single-element array; target found at index 0.' }
            ],
            approaches: [
                {
                    name: 'Iterative',
                    code: `int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(1)',
                    description: `Maintain a search range [low, high] and repeatedly compare the middle element with the target. Each comparison eliminates exactly half the remaining candidates, giving logarithmic performance on any sorted array.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Maintain a search range [low, high]. At each step, compare the middle element with the target and eliminate half the range.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Initialize low = 0, high = n − 1.</li>
  <li>While low ≤ high: compute mid = low + (high − low) / 2 (prevents overflow).</li>
  <li>If arr[mid] == target, return mid.</li>
  <li>If arr[mid] &lt; target, discard left half: low = mid + 1.</li>
  <li>If arr[mid] &gt; target, discard right half: high = mid − 1.</li>
  <li>If loop ends without finding target, return −1.</li>
</ol>

<p><strong>Trace (arr = [1,3,5,7,9,11], target = 7):</strong></p>
<pre>
low=0, high=5 → mid=2, arr[2]=5 < 7 → low=3
low=3, high=5 → mid=4, arr[4]=9 > 7 → high=3
low=3, high=3 → mid=3, arr[3]=7 == 7 → return 3
</pre>

<p><strong>Complexity — Why O(log n):</strong> Each iteration halves the search space. After k iterations, the range is n/2^k. The loop runs at most log₂(n) times. No extra space beyond a few variables.</p>`
                },
                {
                    name: 'Recursive',
                    code: `int binarySearch(vector<int>& arr, int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearch(arr, mid + 1, high, target);
    return binarySearch(arr, low, mid - 1, target);
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(log n) — recursion stack',
                    description: `Same halving logic as iterative binary search, expressed through recursive calls. The function calls itself with a narrower range each time, terminating when the element is found or the range is empty.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Same halving logic as the iterative version, but expressed through recursive calls. Each call reduces the search range by half.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Base case: if low &gt; high, the element is not present — return −1.</li>
  <li>Compute mid. If arr[mid] == target, return mid.</li>
  <li>If arr[mid] &lt; target, recurse on [mid+1, high].</li>
  <li>Otherwise, recurse on [low, mid−1].</li>
</ol>

<p><strong>Trace (arr = [2,4,6,8], target = 6):</strong></p>
<pre>
Call: low=0, high=3 → mid=1, arr[1]=4 < 6 → recurse(2, 3)
Call: low=2, high=3 → mid=2, arr[2]=6 == 6 → return 2
</pre>

<p><strong>Complexity — Why O(log n) space:</strong> Each recursive call adds a stack frame. Maximum recursion depth is log₂(n). The iterative version is preferred for very large arrays to avoid stack overflow.</p>`
                }
            ]
        },
        {
            id: 'basic-sorts',
            title: 'Bubble, Selection, and Insertion Sort',
            difficulty: 'easy',
            description: `<p>Implement the three fundamental O(n²) sorting algorithms: <strong>Bubble Sort</strong>, <strong>Selection Sort</strong>, and <strong>Insertion Sort</strong>. Sort the given array in ascending order.</p>`,
            testCases: [
                { input: 'arr = [64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]', explanation: 'All three algorithms produce the same sorted output.' },
                { input: 'arr = [5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]', explanation: 'Standard unsorted array sorted in ascending order.' },
                { input: 'arr = [1, 2, 3, 4, 5]', output: '[1, 2, 3, 4, 5]', explanation: 'Already sorted — Bubble Sort with early termination finishes in O(n).' }
            ],
            approaches: [
                {
                    name: 'Three Basic Sorts',
                    code: `// Bubble Sort
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++)
            if (arr[j] > arr[j + 1]) { swap(arr[j], arr[j + 1]); swapped = true; }
        if (!swapped) break; // Already sorted
    }
}

// Selection Sort
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        swap(arr[i], arr[minIdx]);
    }
}

// Insertion Sort
void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
        arr[j + 1] = key;
    }
}`,
                    timeComplexity: 'O(n²) worst/avg, O(n) best for Bubble & Insertion',
                    spaceComplexity: 'O(1)',
                    description: `Three fundamental comparison-based sorts. Bubble sort repeatedly swaps adjacent elements, selection sort picks the minimum for each position, and insertion sort shifts elements to place each item in its correct position within the sorted prefix.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Three approaches to sorting with O(n²) time complexity, each with different strategies for organizing elements.</p>

<p><strong>Algorithm Steps — Bubble Sort:</strong></p>
<ol>
  <li>Compare adjacent elements; swap if out of order.</li>
  <li>After each pass, the largest unsorted element "bubbles" to its correct position.</li>
  <li>Optimization: if no swaps occur in a pass, the array is sorted — break early.</li>
  <li>Best case O(n) for already-sorted arrays due to the early termination flag.</li>
</ol>

<p><strong>Algorithm Steps — Selection Sort:</strong></p>
<ol>
  <li>Find the minimum element in the unsorted portion.</li>
  <li>Swap it with the first unsorted position.</li>
  <li>Repeat, advancing the boundary of the sorted portion.</li>
  <li>Always O(n²) — no early termination possible.</li>
</ol>

<p><strong>Algorithm Steps — Insertion Sort:</strong></p>
<ol>
  <li>Build the sorted portion from left to right.</li>
  <li>For each new element, shift larger elements rightward to find its correct position.</li>
  <li>Insert the element. Best case O(n) for nearly sorted data.</li>
</ol>

<p><strong>Trace — Insertion Sort (arr = [5, 1, 4]):</strong></p>
<pre>
i=1: key=1, shift 5 right → [5,5,4] → insert 1 → [1,5,4]
i=2: key=4, shift 5 right → [1,5,5] → insert 4 → [1,4,5]
</pre>

<p><strong>Complexity — Why O(n²):</strong> All three use nested loops. Outer loop runs n times, inner loop runs up to n times per iteration. Total comparisons: approximately n²/2. All sort in-place with O(1) extra space. Insertion Sort is preferred among these for small or nearly sorted datasets.</p>`
                }
            ]
        },
        // ===== MEDIUM =====
        {
            id: 'search-rotated-array',
            title: 'Search in Rotated Sorted Array',
            difficulty: 'medium',
            description: `<p>Given an integer array <strong>nums</strong> sorted in ascending order and then rotated at an unknown pivot, and a <strong>target</strong> value, return the index of the target or <strong>-1</strong> if not found. You must achieve O(log n) runtime.</p>`,
            testCases: [
                { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4', explanation: 'Array was rotated at index 4. Element 0 is at index 4.' },
                { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1', explanation: '3 is not present in the array.' },
                { input: 'nums = [1], target = 1', output: '0', explanation: 'Single element matches the target.' }
            ],
            approaches: [
                {
                    name: 'Modified Binary Search',
                    code: `int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        // Left half is sorted
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(1)',
                    description: `In a rotated sorted array, at least one half around mid is always properly sorted. Identify the sorted half, check if the target falls within that range, and search accordingly. This preserves O(log n) even when the array is rotated.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> In a rotated sorted array, at least one half (left or right of mid) is always properly sorted. Determine which half is sorted and check whether the target lies within that sorted range.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Compute mid. If nums[mid] == target, return mid.</li>
  <li>If nums[low] ≤ nums[mid], the left half [low..mid] is sorted.
    <ul>
      <li>If target falls in [nums[low], nums[mid]), search left: high = mid − 1.</li>
      <li>Otherwise, search right: low = mid + 1.</li>
    </ul>
  </li>
  <li>Else the right half [mid..high] is sorted.
    <ul>
      <li>If target falls in (nums[mid], nums[high]], search right: low = mid + 1.</li>
      <li>Otherwise, search left: high = mid − 1.</li>
    </ul>
  </li>
</ol>

<p><strong>Trace (nums = [4,5,6,7,0,1,2], target = 0):</strong></p>
<pre>
low=0, high=6 → mid=3, nums[3]=7 ≠ 0
  Left sorted: nums[0]=4 ≤ nums[3]=7
  target=0 not in [4,7) → low=4
low=4, high=6 → mid=5, nums[5]=1 ≠ 0
  Left sorted: nums[4]=0 ≤ nums[5]=1
  target=0 in [0,1) → high=4
low=4, high=4 → mid=4, nums[4]=0 == 0 → return 4
</pre>

<p><strong>Complexity — Why O(log n):</strong> Each iteration eliminates half the search space, identical to standard binary search. The rotation only affects which half we identify as sorted, not the halving rate.</p>`
                }
            ]
        },
        {
            id: 'peak-mountain-array',
            title: 'Peak Index in a Mountain Array',
            difficulty: 'medium',
            description: `<p>Given a mountain array (strictly increases then strictly decreases), return the index of the <strong>peak</strong> element. A mountain array has at least 3 elements.</p>`,
            testCases: [
                { input: 'arr = [0, 2, 1, 0]', output: '1', explanation: 'arr[1] = 2 is the peak (greater than neighbors).' },
                { input: 'arr = [0, 10, 5, 2]', output: '1', explanation: 'Peak is at index 1 with value 10.' },
                { input: 'arr = [3, 5, 3, 2, 0]', output: '1', explanation: 'arr increases to index 1 then decreases.' }
            ],
            approaches: [
                {
                    name: 'Binary Search',
                    code: `int peakIndexInMountainArray(vector<int>& arr) {
    int low = 0, high = arr.size() - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] < arr[mid + 1]) low = mid + 1;
        else high = mid;
    }
    return low;
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(1)',
                    description: `Compare mid with mid+1 to determine which slope of the mountain you're on. If ascending, the peak is to the right; if descending, the peak is at mid or to the left. This binary decision eliminates half the search space each step.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> If arr[mid] &lt; arr[mid+1], the sequence is still ascending, so the peak lies to the right. Otherwise, mid could be the peak or the peak is to the left.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Initialize low = 0, high = n − 1.</li>
  <li>While low &lt; high: compute mid.</li>
  <li>If arr[mid] &lt; arr[mid+1], the ascending slope means peak is at mid+1 or beyond → low = mid + 1.</li>
  <li>Otherwise, mid might be the peak → high = mid (do not exclude mid).</li>
  <li>When low == high, both point to the peak index.</li>
</ol>

<p><strong>Trace (arr = [0, 2, 1, 0]):</strong></p>
<pre>
low=0, high=3 → mid=1, arr[1]=2 > arr[2]=1 → high=1
low=0, high=1 → mid=0, arr[0]=0 < arr[1]=2 → low=1
low=1, high=1 → return 1
</pre>

<p><strong>Complexity — Why O(log n):</strong> Each iteration narrows the range by roughly half. The loop condition low &lt; high (not low ≤ high) ensures convergence since high = mid keeps mid in the search space.</p>`
                }
            ]
        },
        {
            id: 'single-element-sorted',
            title: 'Single Element in Sorted Array',
            difficulty: 'medium',
            description: `<p>Given a sorted array where every element appears exactly twice except for one element that appears once, find the single element. You must solve it in O(log n) time and O(1) space.</p>`,
            testCases: [
                { input: 'nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]', output: '2', explanation: 'Every number appears twice except 2.' },
                { input: 'nums = [3, 3, 7, 7, 10, 11, 11]', output: '10', explanation: '10 is the only element without a pair.' },
                { input: 'nums = [1]', output: '1', explanation: 'Single element array — that element is the answer.' }
            ],
            approaches: [
                {
                    name: 'Binary Search on Pairs',
                    code: `int singleNonDuplicate(vector<int>& nums) {
    int low = 0, high = nums.size() - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (mid % 2 == 1) mid--; // Ensure mid is even
        if (nums[mid] == nums[mid + 1]) low = mid + 2;
        else high = mid;
    }
    return nums[low];
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(1)',
                    description: `In a sorted array where every element except one appears twice, pairs start at even indices. The single element disrupts this pattern. By checking whether the pair at mid is intact, we determine which half contains the unique element.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> In a properly paired sorted array, pairs start at even indices (0-1, 2-3, 4-5, ...). The single element disrupts this pairing. Binary search determines which side of mid the disruption lies on.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Ensure mid is even (if odd, decrement by 1). This aligns mid to a pair start.</li>
  <li>If nums[mid] == nums[mid+1], the pair at mid is intact — the single element is to the right → low = mid + 2.</li>
  <li>If nums[mid] ≠ nums[mid+1], the pairing is disrupted at or before mid → high = mid.</li>
  <li>When low == high, we've found the single element.</li>
</ol>

<p><strong>Trace (nums = [1,1,2,3,3,4,4,8,8]):</strong></p>
<pre>
low=0, high=8 → mid=4 (even) → nums[4]=3 == nums[5]=4? No → high=4
low=0, high=4 → mid=2 (even) → nums[2]=2 == nums[3]=3? No → high=2
low=0, high=2 → mid=0 (even) → nums[0]=1 == nums[1]=1? Yes → low=2
low=2, high=2 → return nums[2] = 2
</pre>

<p><strong>Complexity — Why O(log n):</strong> Each iteration eliminates half the search space. We always jump by 2 (skipping full pairs), effectively performing binary search over n/2 pairs.</p>`
                }
            ]
        },
        {
            id: 'merge-quick-sort',
            title: 'Merge Sort & Quick Sort',
            difficulty: 'medium',
            description: `<p>Implement the two fundamental O(n log n) sorting algorithms: <strong>Merge Sort</strong> (stable, guaranteed O(n log n)) and <strong>Quick Sort</strong> (in-place, average O(n log n)).</p>`,
            testCases: [
                { input: 'arr = [38, 27, 43, 3, 9, 82, 10]', output: '[3, 9, 10, 27, 38, 43, 82]', explanation: 'Both algorithms produce the correctly sorted array.' },
                { input: 'arr = [5, 4, 3, 2, 1]', output: '[1, 2, 3, 4, 5]', explanation: 'Reverse-sorted input — worst case for naive Quick Sort pivot selection.' },
                { input: 'arr = [1, 1, 1, 1]', output: '[1, 1, 1, 1]', explanation: 'All identical elements — stable sort preserves relative order.' }
            ],
            approaches: [
                {
                    name: 'Merge Sort',
                    code: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= m) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = l; k <= r; k++) arr[k] = temp[k - l];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    description: `Divide-and-conquer approach: recursively split the array into halves until you reach single elements (which are trivially sorted), then merge pairs of sorted halves by comparing elements from each side. The merge step does the actual sorting work.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Divide-and-conquer: recursively split the array into halves until single elements, then merge adjacent sorted halves by comparing elements from each side.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Base case: single element (l ≥ r) is already sorted.</li>
  <li>Compute mid = l + (r − l) / 2. Recurse on [l, mid] and [mid+1, r].</li>
  <li>Merge: use two pointers i and j on the left and right halves. Compare and place the smaller element into a temporary array.</li>
  <li>Copy remaining elements from whichever half isn't exhausted.</li>
  <li>Write the merged result back into the original array.</li>
</ol>

<p><strong>Trace (arr = [38, 27, 43, 3]):</strong></p>
<pre>
Split: [38,27] [43,3]
Split: [38] [27] → merge → [27,38]
Split: [43] [3]  → merge → [3,43]
Merge [27,38] + [3,43]:
  3 < 27 → take 3
  27 < 43 → take 27
  38 < 43 → take 38
  take 43
  → [3, 27, 38, 43]
</pre>

<p><strong>Complexity — Why O(n log n):</strong> There are log n levels of recursion, and each level processes all n elements during the merge step. Total: O(n log n). Guaranteed for all inputs. Requires O(n) extra space for the temporary array. Stable sort — equal elements maintain their relative order.</p>`
                },
                {
                    name: 'Quick Sort',
                    code: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
                    timeComplexity: 'O(n log n) avg, O(n²) worst',
                    spaceComplexity: 'O(log n) — recursion stack',
                    description: `Choose a pivot and partition the array so smaller elements go left and larger go right, placing the pivot in its final position. Then recurse on both halves. Average case is O(n log n) but worst case degrades to O(n²) with bad pivot choices.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Choose a pivot element, then partition the array so all elements smaller than the pivot are to its left and larger ones to its right. The pivot is now in its final sorted position. Recurse on the left and right partitions.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Choose pivot (here, the last element arr[high]).</li>
  <li>Partition: maintain pointer i for the boundary of elements &lt; pivot. Scan with j; if arr[j] &lt; pivot, increment i and swap arr[i] with arr[j].</li>
  <li>After scanning, swap arr[i+1] with the pivot. Now pivot is at index i+1.</li>
  <li>Recurse on [low, pi−1] and [pi+1, high].</li>
</ol>

<p><strong>Trace (arr = [3, 6, 8, 10, 1, 2, 1], pivot = arr[6] = 1):</strong></p>
<pre>
pivot = 1, i = -1
j=0: 3 < 1? No
j=1: 6 < 1? No
j=2: 8 < 1? No
j=3: 10 < 1? No
j=4: 1 < 1? No
j=5: 2 < 1? No
swap arr[0] with pivot → [1, 6, 8, 10, 1, 2, 3], pi = 0
Recurse: left = empty, right = [6, 8, 10, 1, 2, 3]
</pre>

<p><strong>Complexity — Why O(n²) worst case:</strong> If the pivot is always the smallest or largest element (already sorted input with last-element pivot), one partition is empty and the other has n−1 elements — giving n + (n−1) + ... + 1 = O(n²). Randomized pivot selection avoids this, yielding O(n log n) expected time. In-place sorting with O(log n) stack space on average.</p>`
                }
            ]
        },
        {
            id: 'count-inversions',
            title: 'Count Inversions Problem',
            difficulty: 'medium',
            description: `<p>Given an array of integers, count the number of <strong>inversions</strong>. An inversion is a pair (i, j) where i &lt; j but arr[i] &gt; arr[j]. This measures how far the array is from being sorted.</p>`,
            testCases: [
                { input: 'arr = [2, 4, 1, 3, 5]', output: '3', explanation: 'Inversions: (2,1), (4,1), (4,3) → 3 pairs.' },
                { input: 'arr = [1, 2, 3, 4, 5]', output: '0', explanation: 'Already sorted — no inversions.' },
                { input: 'arr = [5, 4, 3, 2, 1]', output: '10', explanation: 'Reverse sorted — maximum inversions: C(5,2) = 10.' }
            ],
            approaches: [
                {
                    name: 'Modified Merge Sort',
                    code: `long long mergeCount(vector<int>& arr, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    long long count = 0;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else {
            count += (m - i + 1); // All remaining in left > arr[j]
            temp.push_back(arr[j++]);
        }
    }
    while (i <= m) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = l; k <= r; k++) arr[k] = temp[k - l];
    return count;
}

long long countInversions(vector<int>& arr, int l, int r) {
    if (l >= r) return 0;
    int m = l + (r - l) / 2;
    long long count = countInversions(arr, l, m) + countInversions(arr, m + 1, r);
    return count + mergeCount(arr, l, m, r);
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    description: `Piggyback on merge sort's merge step: when a right-half element is placed before remaining left-half elements, each of those left elements forms an inversion. Count these cross-inversions during merge and combine with inversions from recursive calls.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> During the merge step of merge sort, when an element from the right half is placed before elements from the left half, every remaining element in the left half forms an inversion with it. Count these cross-inversions during merge, and add inversions found within each half from recursive calls.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Recursively split the array and count inversions in each half.</li>
  <li>During merge: two pointers i (left half) and j (right half).</li>
  <li>If arr[i] ≤ arr[j], no inversion — take from left.</li>
  <li>If arr[i] &gt; arr[j], all elements from i to m in the left half are greater than arr[j] — add (m − i + 1) inversions. Take from right.</li>
  <li>Total inversions = left inversions + right inversions + cross inversions.</li>
</ol>

<p><strong>Trace (arr = [2, 4, 1, 3, 5]):</strong></p>
<pre>
Split: [2,4] [1,3,5]
Left [2,4]: split [2],[4] → merge → 0 inversions (2<4)
Right [1,3,5]: split [1],[3,5] → [3],[5] merge → 0
  merge [1] + [3,5] → 0 inversions
Merge [2,4] + [1,3,5]:
  i=0,j=0: 2 > 1 → count += 2 (both 2,4 > 1), take 1
  i=0,j=1: 2 < 3 → take 2
  i=1,j=1: 4 > 3 → count += 1 (only 4 > 3), take 3
  i=1,j=2: 4 < 5 → take 4, take 5
Total cross inversions = 3, total = 0 + 0 + 3 = 3
</pre>

<p><strong>Complexity — Why O(n log n):</strong> Same as merge sort — log n levels, O(n) work per level. The inversion counting adds only O(1) extra work per comparison. A brute-force approach checking all pairs would be O(n²).</p>`
                }
            ]
        },
        // ===== HARD =====
        {
            id: 'book-allocation',
            title: 'Book Allocation / Allocate Books',
            difficulty: 'hard',
            description: `<p>Given an array <strong>pages</strong> where pages[i] is the number of pages in the i-th book, and <strong>m</strong> students, allocate books such that each student gets at least one contiguous set of books. Minimize the <strong>maximum</strong> number of pages any student has to read.</p>`,
            testCases: [
                { input: 'pages = [12, 34, 67, 90], students = 2', output: '113', explanation: 'Optimal split: [12, 34, 67] and [90] → max = 113. Or [12] and [34, 67, 90] → max = 191. Best is 113.' },
                { input: 'pages = [10, 20, 30, 40], students = 2', output: '60', explanation: 'Split: [10, 20, 30] and [40] → max = 60.' },
                { input: 'pages = [15, 17, 20], students = 3', output: '20', explanation: 'Each student gets one book. Maximum is max(15, 17, 20) = 20.' }
            ],
            approaches: [
                {
                    name: 'Binary Search on Answer',
                    code: `bool canAllocate(vector<int>& pages, int students, int maxPages) {
    int count = 1, currentSum = 0;
    for (int p : pages) {
        if (currentSum + p > maxPages) {
            count++;
            currentSum = p;
            if (count > students) return false;
        } else currentSum += p;
    }
    return true;
}

int allocateBooks(vector<int>& pages, int students) {
    if (students > pages.size()) return -1;
    int low = *max_element(pages.begin(), pages.end());
    int high = accumulate(pages.begin(), pages.end(), 0);
    int result = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canAllocate(pages, students, mid)) {
            result = mid;
            high = mid - 1;
        } else low = mid + 1;
    }
    return result;
}`,
                    timeComplexity: 'O(n log(sum))',
                    spaceComplexity: 'O(1)',
                    description: `Binary search on the answer: the maximum pages any student reads. The search range is [max(pages), sum(pages)]. For each candidate value, a greedy check assigns books left-to-right, starting a new student when the limit would be exceeded, verifying feasibility.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Binary search on the answer — the maximum pages any student reads. The minimum possible answer is max(pages[i]) (every student must be able to handle at least the largest book). The maximum is sum(pages) (one student reads everything). For each candidate, greedily verify if the allocation is feasible.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Set low = max(pages), high = sum(pages).</li>
  <li>Binary search: mid = candidate for max pages per student.</li>
  <li>Greedy check (canAllocate): assign books left to right. If adding the next book exceeds mid, assign to a new student. If student count exceeds m, return false.</li>
  <li>If feasible, record result and try smaller (high = mid − 1).</li>
  <li>If not feasible, need more capacity (low = mid + 1).</li>
</ol>

<p><strong>Trace (pages = [12,34,67,90], students = 2):</strong></p>
<pre>
low=90, high=203
mid=146: [12,34,67]=113, [90]=90 → 2 students ≤ 2 → feasible → result=146, high=145
mid=117: [12,34,67]=113, [90]=90 → feasible → result=117, high=116
mid=103: [12,34]=46, [67]=67... [67,90]? 67+90=157>103 → [12,34,67]=113>103 → [12,34]=46,[67]=67,[90] → 3 students > 2 → not feasible → low=104
mid=110: [12,34]=46, [67]=67... 46+67=113>110 → [12,34]=46,[67,90]? 67+90=157>110 → 3 students → not feasible → low=111
mid=113: [12,34,67]=113, [90]=90 → 2 students → feasible → result=113, high=112
low=113 > high=112 → return 113
</pre>

<p><strong>Complexity — Why O(n log(sum)):</strong> Binary search runs O(log(sum − max)) iterations. Each iteration performs a linear scan O(n) for the greedy check. Total: O(n × log(sum)).</p>`
                }
            ]
        },
        {
            id: 'painters-partition',
            title: "Painter's Partition Problem",
            difficulty: 'hard',
            description: `<p>Given an array <strong>boards</strong> representing the length of each board segment and <strong>k</strong> painters, each painter paints consecutive boards. Minimize the <strong>maximum</strong> time any painter spends (assuming each unit of board takes 1 unit of time).</p>`,
            testCases: [
                { input: 'boards = [10, 20, 30, 40], painters = 2', output: '60', explanation: 'Optimal: painter 1 paints [10,20,30]=60, painter 2 paints [40]=40. Max = 60.' },
                { input: 'boards = [5, 10, 30, 20, 15], painters = 3', output: '35', explanation: 'Split: [5,10,30] is too much. Optimal: [5,10],[30],[20,15] → max 35.' },
                { input: 'boards = [100, 200, 300], painters = 1', output: '600', explanation: 'Single painter must paint everything: 100+200+300 = 600.' }
            ],
            approaches: [
                {
                    name: 'Binary Search on Answer',
                    code: `bool canPaint(vector<int>& boards, int painters, int maxTime) {
    int count = 1, currentTime = 0;
    for (int b : boards) {
        if (currentTime + b > maxTime) {
            count++;
            currentTime = b;
            if (count > painters) return false;
        } else currentTime += b;
    }
    return true;
}

int minTimeToPaint(vector<int>& boards, int painters) {
    int low = *max_element(boards.begin(), boards.end());
    int high = accumulate(boards.begin(), boards.end(), 0);
    int result = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canPaint(boards, painters, mid)) {
            result = mid;
            high = mid - 1;
        } else low = mid + 1;
    }
    return result;
}`,
                    timeComplexity: 'O(n log(sum))',
                    spaceComplexity: 'O(1)',
                    description: `Same structure as Book Allocation. Binary search on the maximum time any painter works. Painters must handle contiguous boards, so a greedy left-to-right assignment checks whether the candidate limit is feasible for the given number of painters.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Identical structure to Book Allocation. Binary search on the maximum time any painter works. Each painter must paint a contiguous set of boards. The greedy check assigns boards left to right, starting a new painter when the current load would exceed the candidate limit.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>low = max(boards) (a painter must handle at least the longest board).</li>
  <li>high = sum(boards) (one painter does everything).</li>
  <li>Binary search: for candidate mid, greedily assign consecutive boards to painters.</li>
  <li>If adding the next board exceeds mid, give it to a new painter.</li>
  <li>If all boards fit within k painters, try a smaller limit. Otherwise, increase.</li>
</ol>

<p><strong>Trace (boards = [10,20,30,40], painters = 2):</strong></p>
<pre>
low=40, high=100
mid=70: [10,20,30]=60 ≤ 70, next 40: 60+40=100>70 → painter 2: [40]=40 → 2 painters ✓ → result=70, high=69
mid=54: [10,20]=30, next 30: 30+30=60>54 → painter 2: [30,40]? 30+40=70>54 → painter 3 → count>2 → not feasible → low=55
mid=62: [10,20,30]=60 ≤ 62, [40]=40 → 2 painters ✓ → result=62, high=61
mid=58: [10,20]=30, [30]=30... 30+30=60>58 → painter 2: [30,40]? 70>58 → painter 3 → fail → low=59
mid=60: [10,20,30]=60, [40]=40 → 2 painters ✓ → result=60, high=59
low=60 > high=59 → return 60
</pre>

<p><strong>Complexity — Why O(n log(sum)):</strong> Binary search over the range [max, sum] takes O(log(sum)) iterations. Each iteration does an O(n) greedy scan. Same pattern as book allocation and aggressive cows.</p>`
                }
            ]
        },
        {
            id: 'aggressive-cows',
            title: 'Aggressive Cows Problem',
            difficulty: 'hard',
            description: `<p>Given an array of <strong>stall</strong> positions and <strong>k</strong> cows, place the cows in stalls such that the <strong>minimum distance</strong> between any two cows is maximized. Return this largest minimum distance.</p>`,
            testCases: [
                { input: 'stalls = [1, 2, 4, 8, 9], cows = 3', output: '3', explanation: 'Place cows at stalls 1, 4, 8 → distances: 3, 4. Minimum = 3.' },
                { input: 'stalls = [1, 2, 3], cows = 2', output: '2', explanation: 'Place at stalls 1 and 3 → distance = 2.' },
                { input: 'stalls = [0, 3, 4, 7, 10, 9], cows = 4', output: '3', explanation: 'After sorting: [0,3,4,7,9,10]. Place at 0,3,7,10 → min distance = 3.' }
            ],
            approaches: [
                {
                    name: 'Binary Search on Answer',
                    code: `bool canPlace(vector<int>& stalls, int cows, int minDist) {
    int count = 1, lastPos = stalls[0];
    for (int i = 1; i < stalls.size(); i++) {
        if (stalls[i] - lastPos >= minDist) {
            count++;
            lastPos = stalls[i];
            if (count == cows) return true;
        }
    }
    return false;
}

int aggressiveCows(vector<int>& stalls, int cows) {
    sort(stalls.begin(), stalls.end());
    int low = 1, high = stalls.back() - stalls[0];
    int result = 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canPlace(stalls, cows, mid)) {
            result = mid;
            low = mid + 1;
        } else high = mid - 1;
    }
    return result;
}`,
                    timeComplexity: 'O(n log(range))',
                    spaceComplexity: 'O(1)',
                    description: `Binary search on the minimum distance between any two cows. For each candidate distance, greedily place cows at the earliest valid stall maintaining that minimum gap. If all cows fit, the candidate is feasible; search for a larger distance.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Binary search on the answer — the minimum distance between any two cows. For each candidate distance, greedily check if all cows can be placed: put the first cow at the first stall, then place each subsequent cow at the earliest stall that is at least the candidate distance away.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Sort the stalls array.</li>
  <li>low = 1, high = stalls[n−1] − stalls[0] (maximum possible distance).</li>
  <li>Binary search: mid = candidate minimum distance.</li>
  <li>Greedy placement: place cow 1 at stalls[0]. For each subsequent stall, if distance from the last placed cow ≥ mid, place another cow.</li>
  <li>If all k cows placed, try a larger distance (low = mid + 1). Otherwise, reduce (high = mid − 1).</li>
</ol>

<p><strong>Trace (stalls = [1,2,4,8,9], cows = 3):</strong></p>
<pre>
Sorted: [1,2,4,8,9], low=1, high=8
mid=4: place at 1. Next ≥ 5: stall 8 (dist=7 ≥ 4 ✓). Next ≥ 12: stall 9 (dist=1 < 4). Only 2 cows → fail → high=3
mid=2: place at 1, 4 (dist=3≥2), 8 (dist=4≥2) → 3 cows ✓ → result=2, low=3
mid=3: place at 1, 4 (dist=3≥3), 8 (dist=4≥3) → 3 cows ✓ → result=3, low=4
low=4 > high=3 → return 3
</pre>

<p><strong>Complexity — Why O(n log(range)):</strong> Binary search covers the range [1, max−min] in O(log(range)) iterations. Each greedy check scans all n stalls in O(n). Sorting is O(n log n), dominated by the binary search phase for large ranges.</p>`
                }
            ]
        }
    ]
};
