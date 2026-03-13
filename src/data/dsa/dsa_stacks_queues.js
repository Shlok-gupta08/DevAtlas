// =================================================================
//  DSA — Stacks & Queues
// =================================================================
export const stacksQueuesData = {
    id: 'stacks-queues',
    name: 'Stacks & Queues',
    icon: '📚',
    color: '#f472b6',
    questions: [
        // ===== EASY =====
        {
            id: 'impl-stack-queue',
            title: 'Implement Stack/Queue using Arrays & Linked List',
            difficulty: 'easy',
            description: `Implement a <strong>stack</strong> (LIFO) and a <strong>queue</strong> (FIFO) from scratch using arrays and linked lists. Each should support standard operations in O(1) time.<br><br>Stack: push, pop, peek, isEmpty. Queue: enqueue, dequeue, front, isEmpty.`,
            testCases: [
                { input: 'push(1), push(2), pop(), peek()', output: '2, 1', explanation: 'Stack LIFO: pop returns 2, peek returns 1.' },
                { input: 'push(5), push(3), push(7), pop()', output: '7', explanation: 'Last pushed (7) is popped first.' },
                { input: 'enqueue(1), enqueue(2), dequeue()', output: '1', explanation: 'Queue FIFO: first enqueued is first dequeued.' }
            ],
            approaches: [
                {
                    name: 'Array-based Stack',
                    code: `class Stack {
    int arr[1000], top = -1;
public:
    void push(int x) { arr[++top] = x; }
    int pop() { return arr[top--]; }
    int peek() { return arr[top]; }
    bool empty() { return top == -1; }
};`,
                    timeComplexity: 'O(1) per operation',
                    spaceComplexity: 'O(n)',
                    description: `Stack follows LIFO (Last In First Out). Use a top pointer: push increments top and stores; pop returns and decrements. Queue follows FIFO: use front and rear pointers. For linked list versions, push/enqueue at one end and pop/dequeue from the other. All operations are O(1).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A stack only needs access to one end — the top. An array with a top pointer is the simplest implementation: push writes to <code>arr[++top]</code>, pop reads from <code>arr[top--]</code>. The pre/post increment/decrement ensures the pointer always reflects the current top element.<br><br><strong>Algorithm Steps:</strong><br>push(x) → Increment top, then store x at that index<br>pop() → Return the element at top, then decrement<br>peek() → Return arr[top] without modification<br>empty() → Check if top is -1 (sentinel for "empty")<br><br><strong>Trace (push 3, push 7, pop, peek):</strong><br>push(3): top=-1→0, arr[0]=3<br>push(7): top=0→1, arr[1]=7<br>pop(): return arr[1]=7, top=1→0<br>peek(): return arr[0]=3<br><br><strong>Trade-offs:</strong> Array-based has fixed capacity but O(1) operations with no allocation overhead. Linked-list-based has dynamic size but allocates a node per push. For queues, arrays need circular indexing to avoid wasted space at the front.`
                }
            ]
        },
        {
            id: 'valid-parentheses',
            title: 'Valid Parentheses',
            difficulty: 'easy',
            description: `Given a string containing only <code>(</code>, <code>)</code>, <code>{</code>, <code>}</code>, <code>[</code>, <code>]</code>, determine if the input string has valid (properly nested and matched) brackets.<br><br><strong>Example:</strong> "([{}])" → true, "(]" → false.`,
            testCases: [
                { input: 's = "([{}])"', output: 'true', explanation: 'All brackets properly nested and matched.' },
                { input: 's = "(]"', output: 'false', explanation: 'Opening ( does not match closing ].' },
                { input: 's = "{[]}"', output: 'true', explanation: 'Inner [] matched, outer {} matched.' }
            ],
            approaches: [
                {
                    name: 'Stack',
                    code: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.empty();
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Push opening brackets onto stack. For closing brackets, check if the stack top is the matching opener. If not (or stack is empty), invalid. At the end, stack must be empty (all brackets matched). The stack naturally handles nested brackets — the most recent unopened bracket is always on top.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Brackets must close in reverse order of opening — exactly LIFO behavior. A stack ensures the most recently opened bracket is always checked first when a closer appears.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Opening bracket → push onto stack<br>Step 2 → Closing bracket → check stack empty (unmatched closer), then verify top matches<br>Step 3 → After all characters: stack must be empty (no unmatched openers)<br><br><strong>Trace "([])":</strong><br>Push <code>(</code>, push <code>[</code>. See <code>]</code> → pop <code>[</code>, match ✓. See <code>)</code> → pop <code>(</code>, match ✓. Stack empty → valid.<br><br><strong>Trace "(]":</strong><br>Push <code>(</code>. See <code>]</code> → pop <code>(</code>, mismatch → invalid.<br><br><strong>Complexity — O(n) time:</strong> Each character is processed exactly once. O(n) worst-case space when all characters are openers.`
                }
            ]
        },
        {
            id: 'queue-reversal',
            title: 'Queue Reversal',
            difficulty: 'easy',
            description: `Reverse the order of elements in a queue using standard queue operations and a stack as auxiliary storage.<br><br><strong>Example:</strong> Queue [1, 2, 3, 4] → [4, 3, 2, 1].`,
            testCases: [
                { input: 'q = [1, 2, 3, 4]', output: '[4, 3, 2, 1]', explanation: 'Elements reversed using stack intermediary.' },
                { input: 'q = [10, 20]', output: '[20, 10]', explanation: 'Two elements swapped.' },
                { input: 'q = [5]', output: '[5]', explanation: 'Single element unchanged.' }
            ],
            approaches: [
                {
                    name: 'Using Stack',
                    code: `void reverseQueue(queue<int>& q) {
    stack<int> st;
    while (!q.empty()) { st.push(q.front()); q.pop(); }
    while (!st.empty()) { q.push(st.top()); st.pop(); }
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Transfer all elements from queue to stack (reverses order due to LIFO vs FIFO). Then transfer back from stack to queue. Elements are now in reversed order. Can also be done recursively without explicit stack by using the call stack.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A queue outputs FIFO, a stack outputs LIFO. Passing data through a stack reverses its order. Two transfers: queue→stack (captures in FIFO order, stores reversed), then stack→queue (restores reversed order).<br><br><strong>Algorithm Steps:</strong><br>Phase 1 → Dequeue all elements, push each onto stack<br>Phase 2 → Pop all from stack, enqueue each back into queue<br><br><strong>Trace [1, 2, 3]:</strong><br>Phase 1: dequeue 1,2,3 → stack [3,2,1] (top to bottom)<br>Phase 2: pop 3,2,1 → queue [3, 2, 1]<br><br><strong>Recursive alternative:</strong> Dequeue one element, recursively reverse the rest, then enqueue the saved element at the back. The call stack plays the same role as the explicit stack — both O(n) time and space.`
                }
            ]
        },
        // ===== MEDIUM =====
        {
            id: 'queue-using-stack',
            title: 'Queue using Stack / Stack using Queue',
            difficulty: 'medium',
            description: `Implement a <strong>queue</strong> using only two stacks, achieving amortized O(1) per operation. The queue must support push, pop, peek, and empty.<br><br>The double-reversal trick: two stacks each reverse once, restoring FIFO order.`,
            testCases: [
                { input: 'push(1), push(2), pop(), peek()', output: '1, 2', explanation: 'FIFO: pop returns first pushed (1), peek returns 2.' },
                { input: 'push(3), push(4), push(5), pop(), pop()', output: '3, 4', explanation: 'Elements dequeued in insertion order.' },
                { input: 'push(1), pop(), empty()', output: '1, true', explanation: 'After single push and pop, queue is empty.' }
            ],
            approaches: [
                {
                    name: 'Two Stacks (Amortized O(1))',
                    code: `class MyQueue {
    stack<int> input, output;
    void transfer() {
        if (output.empty())
            while (!input.empty()) {
                output.push(input.top());
                input.pop();
            }
    }
public:
    void push(int x) { input.push(x); }
    int pop() { transfer(); int val = output.top(); output.pop(); return val; }
    int peek() { transfer(); return output.top(); }
    bool empty() { return input.empty() && output.empty(); }
};`,
                    timeComplexity: 'O(1) amortized',
                    spaceComplexity: 'O(n)',
                    description: `Use two stacks: input and output. Push always goes to input. For pop/peek, if output is empty, pour all of input into output (reversing order). Then pop from output. Each element is moved between stacks at most twice — once into input, once into output — giving O(1) amortized per operation.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Reversing a reversed sequence restores original order. Stack 1 stores in LIFO. Pouring into Stack 2 reverses it to FIFO. Elements only transfer when output is empty, so each element moves exactly twice in its lifetime.<br><br><strong>Algorithm Steps:</strong><br>push(x) → Always push to input stack<br>pop()/peek() → If output is empty, transfer all from input to output, then operate on output<br>empty() → Both stacks must be empty<br><br><strong>Trace (push 1, push 2, push 3, pop, pop):</strong><br>After pushes: input=[3,2,1], output=[]<br>Pop → transfer: output=[1,2,3], input=[]. Pop returns 1.<br>Pop → output not empty, return 2. No transfer needed.<br><br><strong>Amortized analysis:</strong> Each element is pushed to input once (O(1)), transferred to output once (O(1)), and popped from output once (O(1)). Total cost per element: O(3) = O(1). A single pop may trigger O(n) transfer, but those n elements won't transfer again.`
                }
            ]
        },
        {
            id: 'next-greater-element',
            title: 'Next Greater Element',
            difficulty: 'medium',
            description: `Given an array, find the <strong>next greater element</strong> (NGE) for every element. The NGE of an element is the first element to its right that is strictly greater. If none exists, NGE is -1.<br><br><strong>Example:</strong> [4, 5, 2, 10] → [5, 10, 10, -1].`,
            testCases: [
                { input: 'arr = [4, 5, 2, 10]', output: '[5, 10, 10, -1]', explanation: 'NGE of 4 is 5, of 5 is 10, of 2 is 10, 10 has none.' },
                { input: 'arr = [3, 2, 1]', output: '[-1, -1, -1]', explanation: 'Descending — no element has a greater one to its right.' },
                { input: 'arr = [1, 3, 2, 4]', output: '[3, 4, 4, -1]', explanation: 'NGE of 1=3, 3=4, 2=4.' }
            ],
            approaches: [
                {
                    name: 'Monotonic Stack',
                    code: `vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st; // stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            result[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Maintain a stack of indices with decreasing values. For each new element, pop all smaller elements from the stack — the current element is their next greater. Push current index. Elements remaining in the stack have no next greater element (-1). Each element is pushed and popped at most once → O(n).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A monotonic decreasing stack holds "unresolved" elements waiting for their next greater. When a larger element arrives, it resolves all smaller stack elements at once. Each element enters the stack once and leaves once — total work is O(n) despite the nested while loop.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → For each element, pop all stack elements smaller than it (they just found their NGE)<br>Step 2 → Record <code>result[st.top()] = arr[i]</code> for each popped index<br>Step 3 → Push current index onto stack<br><br><strong>Trace [4, 5, 2, 10]:</strong><br>i=0: push 0 (val 4). Stack: [0]<br>i=1: 5>4, result[0]=5, pop. Push 1. Stack: [1]<br>i=2: 2<5, push 2. Stack: [1=5, 2=2]<br>i=3: 10>2, result[2]=10, pop. 10>5, result[1]=10, pop. Push 3.<br>Result: <strong>[5, 10, 10, -1]</strong> ✓<br><br><strong>Why O(n)?</strong> Each index is pushed exactly once and popped at most once. The inner while loop processes at most n pops total across all iterations.`
                }
            ]
        },
        {
            id: 'stock-span',
            title: 'Stock Span Problem',
            difficulty: 'medium',
            description: `The <strong>span</strong> of a stock's price on a given day is the number of consecutive days (starting from today, going backward) where the price was ≤ today's price.<br><br><strong>Example:</strong> Prices [100, 80, 60, 70, 60, 75] → Spans [1, 1, 1, 2, 1, 4].`,
            testCases: [
                { input: 'prices = [100, 80, 60, 70, 60, 75]', output: '[1, 1, 1, 2, 1, 4]', explanation: '75 spans back over 60, 70, 60 — 4 days total.' },
                { input: 'prices = [10, 20, 30]', output: '[1, 2, 3]', explanation: 'Strictly increasing — each spans all previous.' },
                { input: 'prices = [30, 20, 10]', output: '[1, 1, 1]', explanation: 'Strictly decreasing — each spans only itself.' }
            ],
            approaches: [
                {
                    name: 'Monotonic Stack',
                    code: `vector<int> stockSpan(vector<int>& prices) {
    int n = prices.size();
    vector<int> span(n);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && prices[st.top()] <= prices[i])
            st.pop();
        span[i] = st.empty() ? (i + 1) : (i - st.top());
        st.push(i);
    }
    return span;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Span = number of consecutive days before (including today) where price was ≤ today's price. This equals (i - index of previous greater element). Use a monotonic stack storing indices in decreasing price order. Pop elements ≤ current price. If stack is empty, span = i+1; else span = i - top index.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Span equals the distance from today to the nearest previous day with a strictly greater price. This is a "previous greater element" problem, solved with a monotonic decreasing stack of indices.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Pop all stack indices whose prices are ≤ today's price<br>Step 2 → If stack empty: span = i + 1 (no previous greater day)<br>Step 3 → If stack not empty: span = i - st.top() (distance to previous greater)<br>Step 4 → Push today's index<br><br><strong>Trace [100, 80, 60, 70, 60, 75]:</strong><br>Day 0 (100): stack empty → span=1. Stack: [0]<br>Day 1 (80): 80≤100? No. span=1-0=1. Stack: [0,1]<br>Day 2 (60): span=2-1=1. Stack: [0,1,2]<br>Day 3 (70): pop 60. span=3-1=2. Stack: [0,1,3]<br>Day 4 (60): span=4-3=1. Stack: [0,1,3,4]<br>Day 5 (75): pop 60, pop 70. span=5-1=4. Stack: [0,1,5]<br>Result: <strong>[1,1,1,2,1,4]</strong> ✓`
                }
            ]
        },
        {
            id: 'nge-circular',
            title: 'Next Greater Element II (Circular)',
            difficulty: 'medium',
            description: `Given a <strong>circular</strong> array, find the next greater element for each position. In a circular array, the element after the last is the first.<br><br><strong>Example:</strong> [1, 2, 1] → [2, -1, 2]. The NGE of the last 1 is the first element 2 (wrapping around).`,
            testCases: [
                { input: 'nums = [1, 2, 1]', output: '[2, -1, 2]', explanation: 'Last 1 wraps to find 2 at index 0.' },
                { input: 'nums = [5, 4, 3, 2, 1]', output: '[-1, 5, 5, 5, 5]', explanation: '5 is max — its NGE is -1. All others wrap to find 5.' },
                { input: 'nums = [1, 1, 1]', output: '[-1, -1, -1]', explanation: 'All same — no strictly greater element exists.' }
            ],
            approaches: [
                {
                    name: 'Monotonic Stack + Double Iteration',
                    code: `vector<int> nextGreaterCircular(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    for (int i = 0; i < 2 * n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i % n]) {
            result[st.top()] = nums[i % n];
            st.pop();
        }
        if (i < n) st.push(i);
    }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `For circular behavior, iterate through the array twice (indices 0 to 2n-1). Use modulo to wrap around. Only push indices from the first pass. Pop and assign next greater as before. The second pass handles elements whose next greater is before them in the array.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Simulate circularity by iterating 2n times with <code>i % n</code>. The first pass processes normally; the second pass resolves elements whose NGE wraps around to the beginning of the array. Only push indices during the first pass to avoid duplicates.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Loop i from 0 to 2n-1<br>Step 2 → Pop stack elements smaller than nums[i % n], record their NGE<br>Step 3 → Push index only if i < n (first pass)<br><br><strong>Trace [1, 2, 1]:</strong><br>i=0: push 0. Stack: [0]<br>i=1: 2>1, result[0]=2, pop. Push 1. Stack: [1]<br>i=2: 1<2, push 2. Stack: [1,2]<br>i=3 (i%3=0, val=1): no pops, no push<br>i=4 (i%3=1, val=2): 2>1, result[2]=2, pop. No push.<br>Result: <strong>[2, -1, 2]</strong> ✓<br><br><strong>Why only push in first pass?</strong> Pushing in the second pass would create duplicate entries — indices already on the stack from pass 1 are sufficient. The second pass only resolves remaining unmatched elements.`
                }
            ]
        },
        {
            id: 'duplicate-parentheses',
            title: 'Duplicate Parentheses',
            difficulty: 'medium',
            description: `Given a balanced expression string, check if it contains <strong>duplicate parentheses</strong> — parentheses that enclose nothing or wrap an already-parenthesized subexpression redundantly.<br><br><strong>Example:</strong> "((a+b))" has duplicates. "(a+(b))" does not.`,
            testCases: [
                { input: 's = "((a+b))"', output: 'true', explanation: 'Outer () wraps inner () redundantly.' },
                { input: 's = "(a+(b+c))"', output: 'false', explanation: 'Each pair of parentheses encloses unique content.' },
                { input: 's = "(a+b)+((c))"', output: 'true', explanation: '((c)) has redundant outer parens.' }
            ],
            approaches: [
                {
                    name: 'Stack',
                    code: `bool hasDuplicateParentheses(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == ')') {
            if (st.top() == '(') return true;
            while (st.top() != '(') st.pop();
            st.pop();
        } else {
            st.push(c);
        }
    }
    return false;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Push everything except ')'. When we see ')', check if the top is '(' — if yes, there's nothing between them, indicating duplicate parentheses. If not, pop until we find '(' and remove it. Valid parentheses always have some expression between them.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>If a closing <code>)</code> immediately follows an opening <code>(</code> on the stack, there's nothing between them — either an empty pair <code>()</code> or a redundant wrapper like <code>((expr))</code> where the inner pair already consumed the content.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Push all characters except <code>)</code><br>Step 2 → On <code>)</code>: if top is <code>(</code>, return true (duplicate!)<br>Step 3 → Otherwise: pop until reaching <code>(</code>, then pop the <code>(</code> too<br><br><strong>Trace "((a+b))":</strong><br>Push <code>(</code>, <code>(</code>, <code>a</code>, <code>+</code>, <code>b</code><br>First <code>)</code>: top is b ≠ (, pop b, +, a, then pop inner (<br>Stack: [<code>(</code>]<br>Second <code>)</code>: top is <code>(</code> → duplicate found! ✓<br><br><strong>Why it works:</strong> After removing a matched group's content, if the next closer finds <code>(</code> immediately, that outer pair enclosed only the inner pair — redundant nesting.`
                }
            ]
        },
        {
            id: 'first-non-repeating-stream',
            title: 'First Non-Repeating Letter in a Stream',
            difficulty: 'medium',
            description: `Given a stream of characters, after each character find the <strong>first non-repeating character</strong> seen so far. If all characters repeat, return '#'.<br><br><strong>Example:</strong> Stream "aabcb" → output "a#bbc".`,
            testCases: [
                { input: 'stream = "aabcb"', output: '"a#bbc"', explanation: 'After "aa": all repeat→#. After "aab": b is first non-rep. After "aabc": b. After "aabcb": c.' },
                { input: 'stream = "abcabc"', output: '"aaaaaa"... wait, "aaaabc"... "aaaa##"', explanation: 'Once all repeat, output #. a is first non-rep until a repeats at index 3.' },
                { input: 'stream = "xyz"', output: '"xxx"', explanation: 'x stays as first non-repeating throughout.' }
            ],
            approaches: [
                {
                    name: 'Queue + Frequency Array',
                    code: `string firstNonRepeating(string stream) {
    int freq[26] = {0};
    queue<char> q;
    string result;
    for (char c : stream) {
        freq[c - 'a']++;
        q.push(c);
        while (!q.empty() && freq[q.front() - 'a'] > 1)
            q.pop();
        result += q.empty() ? '#' : q.front();
    }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Queue maintains characters in order of first appearance. Frequency array tracks counts. For each new character, add to queue and increment frequency. Pop from front while the front character has become repeating. Queue's front is the first non-repeating character. If queue is empty, use '#'.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>The queue preserves insertion order of candidates. The frequency array invalidates candidates when they repeat. Lazy removal from the queue front discards characters that became repeating, leaving the true first non-repeating at the front.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Increment freq[c], push c to queue<br>Step 2 → Pop from front while front's frequency > 1 (lazy cleanup)<br>Step 3 → Queue front is the answer; empty queue means all repeat → '#'<br><br><strong>Trace "aabcb":</strong><br>'a': freq[a]=1, q=[a], result="a"<br>'a': freq[a]=2, pop a, q empty, result="a#"<br>'b': freq[b]=1, q=[b], result="a#b"<br>'c': freq[c]=1, q=[b,c], front=b (freq 1), result="a#bb"<br>'b': freq[b]=2, pop b, q=[c], result="a#bbc"<br><br><strong>Why lazy removal?</strong> Removing a character mid-queue when its frequency changes would be O(n). Instead, we only check the front — characters are discarded when they "surface" to the front with freq > 1. Total removals across the stream are O(n).`
                }
            ]
        },
        {
            id: 'interleave-queue',
            title: 'Interleave Two Halves of a Queue',
            difficulty: 'medium',
            description: `Given a queue with an even number of elements, interleave its first and second halves. The first element of the first half alternates with the first element of the second half, and so on.<br><br><strong>Example:</strong> [1,2,3,4,5,6,7,8] → [1,5,2,6,3,7,4,8].`,
            testCases: [
                { input: 'q = [1,2,3,4,5,6,7,8]', output: '[1,5,2,6,3,7,4,8]', explanation: 'First half [1,2,3,4] interleaved with second half [5,6,7,8].' },
                { input: 'q = [10, 20, 30, 40]', output: '[10, 30, 20, 40]', explanation: 'Halves: [10,20] and [30,40] interleaved.' },
                { input: 'q = [1, 2]', output: '[1, 2]', explanation: 'Halves: [1] and [2] — already interleaved.' }
            ],
            approaches: [
                {
                    name: 'Stack Approach',
                    code: `void interleave(queue<int>& q) {
    int n = q.size() / 2;
    stack<int> st;
    // Move first half to stack
    for (int i = 0; i < n; i++) { st.push(q.front()); q.pop(); }
    // Enqueue from stack (reversed first half)
    while (!st.empty()) { q.push(st.top()); st.pop(); }
    // Move second half to back
    for (int i = 0; i < n; i++) { q.push(q.front()); q.pop(); }
    // First half to stack again
    for (int i = 0; i < n; i++) { st.push(q.front()); q.pop(); }
    // Interleave
    for (int i = 0; i < n; i++) {
        q.push(st.top()); st.pop();
        q.push(q.front()); q.pop();
    }
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Split queue into first and second halves using a stack intermediary. The trick: two passes through the stack reverse then un-reverse the first half, putting it back in order. Then interleave by alternating pops from the stack (first half) with dequeues from the queue (second half). Multiple passes, all O(n).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>We need the first half in order alongside the second half. A stack reverses; two stack transfers restore original order. Then interleave by alternating sources.<br><br><strong>Algorithm Steps (queue [1,2,3,4,5,6,7,8]):</strong><br>Pass 1 → First half to stack: stack=[4,3,2,1], queue=[5,6,7,8]<br>Pass 2 → Stack to queue back: queue=[5,6,7,8,4,3,2,1]<br>Pass 3 → Rotate second half to back: queue=[4,3,2,1,5,6,7,8]<br>Pass 4 → First half to stack again: stack=[1,2,3,4], queue=[5,6,7,8]<br>Pass 5 → Interleave: pop 1, dequeue 5, pop 2, dequeue 6, ... → [1,5,2,6,3,7,4,8]<br><br><strong>Why two stack transfers?</strong> Each transfer reverses order. Reversed twice = original order. The queue rotation (pass 3) positions both halves correctly for the final interleave.`
                }
            ]
        },
        // ===== HARD =====
        {
            id: 'min-stack',
            title: 'Design a Min Stack',
            difficulty: 'hard',
            description: `Design a stack that supports push, pop, top, and <strong>getMin</strong> — all in O(1) time and O(1) extra space. The challenge: tracking the minimum as elements are pushed and popped without using an auxiliary data structure.<br><br>The encoding approach stores modified values that encode previous minimums.`,
            testCases: [
                { input: 'push(3), push(1), getMin(), pop(), getMin()', output: '1, 3', explanation: 'Min is 1 while present; after popping 1, min restores to 3.' },
                { input: 'push(2), push(2), pop(), getMin()', output: '2', explanation: 'Duplicate mins handled correctly.' },
                { input: 'push(5), push(3), push(7), getMin()', output: '3', explanation: 'Min tracks the smallest pushed value.' }
            ],
            approaches: [
                {
                    name: 'O(1) Space Formula',
                    code: `class MinStack {
    stack<long long> st;
    long long minVal;
public:
    void push(long long x) {
        if (st.empty()) { st.push(x); minVal = x; }
        else if (x >= minVal) { st.push(x); }
        else { st.push(2LL * x - minVal); minVal = x; }
    }
    void pop() {
        if (st.top() < minVal) minVal = 2LL * minVal - st.top();
        st.pop();
    }
    long long top() {
        return st.top() < minVal ? minVal : st.top();
    }
    long long getMin() { return minVal; }
};`,
                    timeComplexity: 'O(1) all operations',
                    spaceComplexity: 'O(1) extra',
                    description: `When pushing a value less than current min, store an encoded value (2*val - oldMin) instead and update minVal. This encoded value is always < new minVal, serving as a flag. On pop, if top < minVal, decode the previous min as (2*minVal - top). This avoids storing a parallel min stack.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Instead of a parallel min-tracking stack, encode the previous minimum into the stack value itself. When pushing a new minimum, store <code>2*newMin - oldMin</code> (always less than newMin, acting as a flag). On pop, if the value is flagged (< minVal), decode the previous min.<br><br><strong>Algorithm Steps:</strong><br>Push (x < minVal) → store <code>2x - minVal</code>, update <code>minVal = x</code><br>Push (x ≥ minVal) → store x as-is<br>Pop (top < minVal) → the real value is minVal; restore previous min via <code>2*minVal - top</code><br>Top (top < minVal) → return minVal (stored value is artificial)<br><br><strong>Trace (push 3, push 1, getMin, pop, getMin):</strong><br>push(3): stack=[3], min=3<br>push(1): 1<3, store 2(1)-3=-1, min=1. Stack=[3,-1]<br>getMin(): return 1 ✓<br>pop(): top=-1 < min=1, so prevMin=2(1)-(-1)=3, min=3. Pop.<br>getMin(): return 3 ✓<br><br><strong>Why long long?</strong> The expression <code>2*x - minVal</code> can overflow int range when x and minVal are large. Using long long prevents this.`
                }
            ]
        },
        {
            id: 'largest-rect-histogram',
            title: 'Largest Rectangle in Histogram',
            difficulty: 'hard',
            description: `Given an array of bar heights representing a histogram, find the area of the <strong>largest rectangle</strong> that can be formed within the histogram bars.<br><br><strong>Example:</strong> Heights [2, 1, 5, 6, 2, 3] → largest rectangle area is 10 (bars 5 and 6, width 2, height 5).`,
            testCases: [
                { input: 'heights = [2, 1, 5, 6, 2, 3]', output: '10', explanation: 'Rectangle of height 5, width 2 (indices 2-3).' },
                { input: 'heights = [2, 4]', output: '4', explanation: 'Single bar of height 4.' },
                { input: 'heights = [1, 1, 1, 1]', output: '4', explanation: 'All bars, height 1, width 4.' }
            ],
            approaches: [
                {
                    name: 'Monotonic Stack',
                    code: `int largestRectangleArea(vector<int>& heights) {
    int n = heights.size(), maxArea = 0;
    stack<int> st;
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && h < heights[st.top()]) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : (i - st.top() - 1);
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Maintain a stack of indices with increasing heights. When a shorter bar is encountered, pop and calculate area with the popped height as the smallest. Width extends from the current index to the new stack top. A sentinel height 0 at the end flushes remaining bars. Each bar is pushed and popped once.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>For each bar, determine how far it can extend left and right as the limiting (shortest) height. The stack maintains increasing heights — each pop means we've found the right boundary for that bar, and the new stack top reveals its left boundary.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → If current height < stack top's height: pop and compute rectangle<br>Step 2 → Height = popped bar. Width = <code>st.empty() ? i : (i - st.top() - 1)</code><br>Step 3 → Update maxArea. Continue popping while condition holds.<br>Step 4 → Push current index. Sentinel h=0 at i=n flushes all remaining bars.<br><br><strong>Trace [2, 1, 5, 6, 2, 3]:</strong><br>i=0: push 0 (h=2)<br>i=1: h=1 < 2. Pop 0: height=2, width=1, area=2. Push 1.<br>i=2: push 2 (h=5). i=3: push 3 (h=6).<br>i=4: h=2 < 6. Pop 3: height=6, width=1, area=6. Pop 2: height=5, width=4-1-1=2, area=10. Push 4.<br>Sentinel flushes: pop 4 (area=2×3=6), pop 1 (area=1×6=6).<br>Maximum: <strong>10</strong> ✓`
                }
            ]
        },
        {
            id: 'sliding-window-max',
            title: 'Sliding Window Maximum',
            difficulty: 'hard',
            description: `Given an array and window size <strong>k</strong>, find the maximum element in each window as it slides from left to right.<br><br><strong>Example:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3 → [3,3,5,5,6,7].`,
            testCases: [
                { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: 'Window [1,3,-1]→3, [3,-1,-3]→3, [-1,-3,5]→5, etc.' },
                { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Window of size 1.' },
                { input: 'nums = [9, 8, 7, 6], k = 2', output: '[9, 8, 7]', explanation: 'Decreasing — each window max is the left element.' }
            ],
            approaches: [
                {
                    name: 'Deque (Monotonic)',
                    code: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() <= i - k)
            dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i])
            dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(k)',
                    description: `Deque stores indices in decreasing order of values. For each new element: remove from front if out of window; remove from back if smaller than new element (they can never be window max). Push new index to back. Front of deque is always the window maximum. Each element enters and leaves deque once.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A monotonic decreasing deque: front is always the largest in the current window. Smaller elements are purged from the back (they're overshadowed by the new larger element). Expired indices are removed from the front. This maintains a "best candidates" list.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Remove expired: <code>while dq.front() ≤ i - k</code>, pop front<br>Step 2 → Remove smaller: <code>while nums[dq.back()] < nums[i]</code>, pop back<br>Step 3 → Push i to back<br>Step 4 → Once i ≥ k-1, record nums[dq.front()] as window max<br><br><strong>Trace [1,3,-1,-3,5,3,6,7], k=3:</strong><br>i=0: dq=[0]. i=1: 3>1, pop 0; dq=[1]. i=2: dq=[1,2], window max=nums[1]=3<br>i=3: dq=[1,2,3], max=3. i=4: pop all < 5; dq=[4], max=5<br>i=5: dq=[4,5], max=5. i=6: pop all < 6; dq=[6], max=6<br>i=7: pop all < 7; dq=[7], max=7<br>Result: <strong>[3,3,5,5,6,7]</strong> ✓<br><br><strong>Why O(n)?</strong> Each index enters the deque once and leaves once (either from front or back). Total deque operations across all iterations: O(2n) = O(n).`
                }
            ]
        },
        {
            id: 'lru-cache',
            title: 'Implement LRU Cache',
            difficulty: 'hard',
            description: `Design a data structure that follows <strong>Least Recently Used (LRU)</strong> cache eviction. It should support <code>get(key)</code> and <code>put(key, value)</code> in O(1) time. When the cache exceeds capacity, evict the least recently used entry.<br><br>Requires combining a hash map with a doubly linked list.`,
            testCases: [
                { input: 'cap=2, put(1,1), put(2,2), get(1), put(3,3), get(2)', output: '1, -1', explanation: 'get(1)=1. put(3) evicts key 2 (LRU). get(2)=-1 (evicted).' },
                { input: 'cap=1, put(1,10), put(2,20), get(1)', output: '-1', explanation: 'Capacity 1: put(2) evicts put(1).' },
                { input: 'cap=2, put(1,1), get(1), put(2,2), put(3,3), get(1)', output: '1, -1', explanation: 'get(1) makes it recent. put(3) evicts 2 instead. get(1)=still there? No, 1 was evicted by 3. Wait: after get(1), order is [1,2]. put(3) evicts 2. get(1)=1.' }
            ],
            approaches: [
                {
                    name: 'Hash Map + Doubly Linked List',
                    code: `class LRUCache {
    int capacity;
    list<pair<int,int>> dll; // {key, value}
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int cap) : capacity(cap) {}
    int get(int key) {
        if (!mp.count(key)) return -1;
        dll.splice(dll.begin(), dll, mp[key]);
        return mp[key]->second;
    }
    void put(int key, int value) {
        if (mp.count(key)) {
            mp[key]->second = value;
            dll.splice(dll.begin(), dll, mp[key]);
        } else {
            if (dll.size() == capacity) {
                mp.erase(dll.back().first);
                dll.pop_back();
            }
            dll.push_front({key, value});
            mp[key] = dll.begin();
        }
    }
};`,
                    timeComplexity: 'O(1) get and put',
                    spaceComplexity: 'O(capacity)',
                    description: `Doubly linked list maintains usage order (most recent at front). Hash map provides O(1) key→node lookup. Get: move accessed node to front. Put: if exists, update and move to front. If new and at capacity, evict from back (least recently used). Splice operation moves a node without allocating/deallocating.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Two data structures complement each other: the hash map gives O(1) lookup by key, the doubly linked list gives O(1) reordering by recency. Neither alone provides both. The list front = most recent, back = least recent (eviction target).<br><br><strong>Algorithm Steps:</strong><br>get(key) → If not in map: return -1. Otherwise: splice node to front, return value.<br>put(key, val) → If exists: update value, splice to front. If new: evict back if at capacity (erase from map + pop_back), then push_front and store iterator in map.<br><br><strong>Trace (cap=2, put(1,1), put(2,2), get(1), put(3,3), get(2)):</strong><br>put(1,1): dll=[1:1], map={1→it}<br>put(2,2): dll=[2:2, 1:1], map={1,2}<br>get(1): splice 1 to front. dll=[1:1, 2:2]. Return 1.<br>put(3,3): at capacity. Evict back (key 2). dll=[3:3, 1:1], map={1,3}<br>get(2): not in map → return -1.<br><br><strong>Why splice?</strong> <code>list::splice</code> moves a node by updating 4 pointers in O(1) — no allocation, no deallocation, no copying. This is why the doubly linked list is preferred over a vector or deque.`
                }
            ]
        },
        {
            id: 'celebrity-problem',
            title: 'The Celebrity Problem',
            difficulty: 'hard',
            description: `In a group of <strong>n</strong> people, a celebrity is someone who is known by everyone but knows nobody. Given a matrix <code>M</code> where M[i][j]=1 means i knows j, find the celebrity (or return -1 if none exists).<br><br>The elimination approach finds the answer in O(n) time with O(1) space.`,
            testCases: [
                { input: 'M = [[0,1,0],[0,0,0],[0,1,0]], n=3', output: '1', explanation: 'Person 1 knows nobody. Persons 0 and 2 both know person 1.' },
                { input: 'M = [[0,1],[1,0]], n=2', output: '-1', explanation: 'Both know each other — no celebrity.' },
                { input: 'M = [[0,0,1],[0,0,1],[0,0,0]], n=3', output: '2', explanation: 'Person 2 knows nobody. Everyone knows person 2.' }
            ],
            approaches: [
                {
                    name: 'Elimination',
                    code: `int findCelebrity(vector<vector<int>>& M, int n) {
    int candidate = 0;
    for (int i = 1; i < n; i++) {
        if (M[candidate][i]) candidate = i;
    }
    for (int i = 0; i < n; i++) {
        if (i != candidate) {
            if (M[candidate][i] || !M[i][candidate])
                return -1;
        }
    }
    return candidate;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `A celebrity is known by everyone but knows no one. Elimination: if A knows B, A is not a celebrity. If A doesn't know B, B is not a celebrity. One pass eliminates all but one candidate. Then verify the candidate: they must know no one, and everyone must know them.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Each comparison between two people eliminates exactly one candidate. If A knows B, A cannot be a celebrity (celebrities know nobody). If A doesn't know B, B cannot be a celebrity (celebrities are known by everyone). After n-1 comparisons, one candidate remains — verify it.<br><br><strong>Algorithm Steps:</strong><br>Phase 1 (Elimination) → Start candidate=0. For each person i: if candidate knows i, update candidate=i. Otherwise, i is eliminated.<br>Phase 2 (Verification) → Check all other people: candidate must not know anyone, and everyone must know candidate.<br><br><strong>Trace (n=3, celebrity is person 1):</strong><br>candidate=0: knows person 1? Yes → candidate=1<br>candidate=1: knows person 2? No → stay at 1<br>Verify: M[1][0]=0 ✓, M[0][1]=1 ✓, M[1][2]=0 ✓, M[2][1]=1 ✓<br>Celebrity = <strong>1</strong> ✓<br><br><strong>Why verification is needed:</strong> The elimination only guarantees the survivor wasn't eliminated by any single comparison. It doesn't confirm both conditions hold globally. The verification pass checks exhaustively in O(n).`
                }
            ]
        }
    ]
};
