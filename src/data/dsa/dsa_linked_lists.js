// =================================================================
//  DSA — Linked Lists
// =================================================================
export const linkedListsData = {
    id: 'linked-lists',
    name: 'Linked Lists',
    icon: '🔗',
    color: '#38bdf8',
    questions: [
        // ===== EASY =====
        {
            id: 'middle-ll',
            title: 'Middle of a Linked List',
            difficulty: 'easy',
            description: `Given the head of a singly linked list, return the middle node. If there are two middle nodes (even length), return the <strong>second</strong> middle node.<br><br><strong>Example:</strong> 1→2→3→4→5 → middle is node 3.`,
            testCases: [
                { input: 'head = [1, 2, 3, 4, 5]', output: '3', explanation: 'Middle of 5 nodes is the 3rd node.' },
                { input: 'head = [1, 2, 3, 4]', output: '3', explanation: 'Even length — return second middle (3, not 2).' },
                { input: 'head = [1]', output: '1', explanation: 'Single node is the middle.' }
            ],
            approaches: [
                {
                    name: 'Slow & Fast Pointers',
                    code: `ListNode* middleNode(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Slow pointer moves one step, fast moves two steps. When fast reaches the end, slow is at the middle. For even-length lists, this gives the second middle node. Only one pass through the list is needed.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>If one pointer moves at double the speed, when the fast one finishes the list, the slow one is exactly halfway. This is a mathematical guarantee — no need to count the length first.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize both <code>slow</code> and <code>fast</code> at head<br>Step 2 → While <code>fast</code> and <code>fast->next</code> exist: advance slow by 1, fast by 2<br>Step 3 → Return slow (the middle)<br><br><strong>Trace (1→2→3→4→5):</strong><br>Step 1: slow=2, fast=3<br>Step 2: slow=3, fast=5<br>fast->next is null → stop. slow=<strong>3</strong> ✓<br><br><strong>Trace (1→2→3→4, even):</strong><br>Step 1: slow=2, fast=3<br>Step 2: slow=3, fast=null<br>fast is null → stop. slow=<strong>3</strong> (second middle) ✓<br><br><strong>Why check both conditions?</strong> <code>fast</code> being null handles even-length (fast overshoots). <code>fast->next</code> being null handles odd-length (fast lands on last node). Both prevent null dereference on <code>fast->next->next</code>.`
                }
            ]
        },
        {
            id: 'reverse-ll',
            title: 'Reverse a Linked List',
            difficulty: 'easy',
            description: `Given the head of a singly linked list, reverse the list and return the new head.<br><br><strong>Example:</strong> 1→2→3→4→5 becomes 5→4→3→2→1.`,
            testCases: [
                { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'All links reversed.' },
                { input: 'head = [1, 2]', output: '[2, 1]', explanation: 'Two-node reversal.' },
                { input: 'head = []', output: '[]', explanation: 'Empty list stays empty.' }
            ],
            approaches: [
                {
                    name: 'Iterative',
                    code: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Maintain three pointers: prev, curr, next. At each step, save curr->next, reverse the link (curr->next = prev), then advance prev and curr. After the loop, prev is the new head. This reverses all links in a single pass.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>At each node, redirect its next pointer to the previous node instead of the next. Save the forward link before breaking it, then advance. When done, the last node processed becomes the new head.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>prev = nullptr</code> (new tail will point to null), <code>curr = head</code><br>Step 2 → Save <code>next = curr->next</code> (before breaking the link)<br>Step 3 → Reverse: <code>curr->next = prev</code><br>Step 4 → Advance: <code>prev = curr</code>, <code>curr = next</code><br>Step 5 → Return <code>prev</code> (new head)<br><br><strong>Trace (1→2→3→null):</strong><br>Iter 1: next=2, 1→null, prev=1, curr=2<br>Iter 2: next=3, 2→1, prev=2, curr=3<br>Iter 3: next=null, 3→2, prev=3, curr=null<br>Return prev=3. Result: <strong>3→2→1→null</strong> ✓`
                }
            ]
        },
        {
            id: 'palindrome-ll',
            title: 'Check if Linked List is Palindrome',
            difficulty: 'easy',
            description: `Given the head of a singly linked list, determine whether it reads the same forward and backward (palindrome).<br><br><strong>Example:</strong> 1→2→2→1 is a palindrome. 1→2→3 is not.`,
            testCases: [
                { input: 'head = [1, 2, 2, 1]', output: 'true', explanation: 'Reads same forward and backward.' },
                { input: 'head = [1, 2]', output: 'false', explanation: '1→2 ≠ 2→1.' },
                { input: 'head = [1]', output: 'true', explanation: 'Single node is trivially a palindrome.' }
            ],
            approaches: [
                {
                    name: 'Find Mid + Reverse Half',
                    code: `bool isPalindrome(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    // Reverse second half
    ListNode *prev = nullptr, *curr = slow;
    while (curr) {
        ListNode* t = curr->next;
        curr->next = prev;
        prev = curr;
        curr = t;
    }
    // Compare
    ListNode *p1 = head, *p2 = prev;
    while (p2) {
        if (p1->val != p2->val) return false;
        p1 = p1->next;
        p2 = p2->next;
    }
    return true;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Find the middle using slow/fast pointers. Reverse the second half in place. Compare the first half with the reversed second half node by node. If all values match, it's a palindrome. This uses O(1) extra space by modifying the list.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A palindrome mirrors around its center. Split the list at the middle, reverse the second half, then compare both halves element by element. Three phases: find middle → reverse → compare.<br><br><strong>Algorithm Steps:</strong><br>Phase 1 → Slow/fast pointers find the middle<br>Phase 2 → Reverse the second half starting from slow<br>Phase 3 → Compare first half (from head) with reversed second half (from prev)<br><br><strong>Trace (1→2→2→1):</strong><br>Middle: slow=2 (third node)<br>Reverse second half: 1→2→null becomes prev pointing to 1→2→null reversed<br>Compare: (1==1) ✓, (2==2) ✓ → palindrome!<br><br><strong>Why use p2 for the loop condition?</strong> For odd-length lists, the reversed half is shorter by one node. Using p2 (the shorter half) avoids an out-of-bounds comparison.`
                }
            ]
        },
        {
            id: 'detect-cycle',
            title: 'Detect Cycle in Linked List',
            difficulty: 'easy',
            description: `Given the head of a linked list, determine if it contains a cycle. A cycle exists if some node's next pointer points back to a previously visited node.<br><br>Can you solve it in O(1) space?`,
            testCases: [
                { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'Tail connects to node at index 1, forming a cycle.' },
                { input: 'head = [1, 2], pos = 0', output: 'true', explanation: 'Tail connects back to the head.' },
                { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle — single node with next = null.' }
            ],
            approaches: [
                {
                    name: "Floyd's Cycle Detection",
                    code: `bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Two pointers: slow moves 1 step, fast moves 2 steps. If there's a cycle, fast will eventually catch up to slow (they'll meet inside the cycle). If fast reaches null, there's no cycle. This works because the relative speed difference of 1 means they close the gap by 1 node per iteration.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Inside a cycle, the fast pointer gains 1 node on slow per step. The gap between them shrinks by 1 each iteration: ..., 3, 2, 1, 0 — they must eventually collide. If there's no cycle, fast hits null first.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Both pointers start at head<br>Step 2 → Advance slow by 1, fast by 2<br>Step 3 → If <code>slow == fast</code> → cycle detected<br>Step 4 → If fast reaches null → no cycle<br><br><strong>Trace (1→2→3→4→2, cycle at node 2):</strong><br>Step 1: slow=2, fast=3<br>Step 2: slow=3, fast=2 (wrapped around)<br>Step 3: slow=4, fast=4 → match! Return <strong>true</strong> ✓<br><br><strong>Why not use a hash set?</strong> A hash set of visited nodes works but uses O(n) space. Floyd's algorithm achieves the same with only two pointers, regardless of list size.`
                }
            ]
        },
        // ===== MEDIUM =====
        {
            id: 'remove-nth-from-end',
            title: 'Find and Remove Nth Node from End',
            difficulty: 'medium',
            description: `Given the head of a linked list and integer <strong>n</strong>, remove the n-th node from the <strong>end</strong> of the list and return the head.<br><br><strong>Example:</strong> 1→2→3→4→5, n=2 → remove node 4 → 1→2→3→5.`,
            testCases: [
                { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: 'Node 4 (2nd from end) removed.' },
                { input: 'head = [1], n = 1', output: '[]', explanation: 'Remove the only node.' },
                { input: 'head = [1, 2], n = 1', output: '[1]', explanation: 'Remove tail node.' }
            ],
            approaches: [
                {
                    name: 'Two Pointers with Gap',
                    code: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode *fast = &dummy, *slow = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }
    ListNode* toDelete = slow->next;
    slow->next = slow->next->next;
    delete toDelete;
    return dummy.next;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Advance fast pointer n+1 steps ahead. Then move both pointers until fast reaches null. Now slow is just before the node to remove. Use a dummy node to handle edge case of removing the head. Only one pass through the list.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Create a fixed gap of n+1 between two pointers. When fast hits null, slow is exactly one node before the target. The dummy node handles the edge case where the head itself is removed.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Advance fast n+1 steps from dummy<br>Step 2 → Move both until fast is null<br>Step 3 → <code>slow->next = slow->next->next</code> (skip target)<br><br><strong>Trace (1→2→3→4→5, n=2):</strong><br>After gap: fast at node 4 (n+1=3 steps from dummy)<br>Move together: fast=5→null, slow reaches node 3<br>Remove: slow->next = slow->next->next → skip node 4<br>Result: <strong>1→2→3→5</strong> ✓<br><br><strong>Why n+1 steps?</strong> We need slow to land <em>before</em> the target node (to relink). An extra step in the gap achieves this.`
                }
            ]
        },
        {
            id: 'remove-cycle',
            title: 'Remove Cycle in Linked List',
            difficulty: 'medium',
            description: `Given the head of a linked list that may contain a cycle, detect and remove the cycle (if any) so the list becomes linear. The last node in the cycle should point to null.<br><br>This extends Floyd's detection to also find the cycle start.`,
            testCases: [
                { input: 'head = [1,2,3,4], pos=1', output: '[1,2,3,4]', explanation: 'Node 4 was pointing to node 2. After removal, 4→null.' },
                { input: 'head = [1,2], pos=0', output: '[1,2]', explanation: 'Node 2 was pointing back to head. After removal, 2→null.' },
                { input: 'head = [1], pos=-1', output: '[1]', explanation: 'No cycle to remove.' }
            ],
            approaches: [
                {
                    name: "Floyd's + Cycle Start Detection",
                    code: `void removeCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }
    if (!fast || !fast->next) return; // No cycle
    slow = head;
    if (slow == fast) { // Cycle at head
        while (fast->next != slow) fast = fast->next;
    } else {
        while (slow->next != fast->next) {
            slow = slow->next;
            fast = fast->next;
        }
    }
    fast->next = nullptr;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `First detect the cycle meeting point using Floyd's algorithm. Then to find the cycle start: reset slow to head, move both one step at a time — they meet at cycle start. To remove: advance until we find the node whose next is the cycle start, then set its next to null.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Phase 1: Detect cycle via Floyd's. Phase 2: Find cycle entry — reset slow to head, advance both by 1 until they meet (mathematical guarantee: distance from head to entry equals distance from meeting point to entry going around the cycle). Phase 3: Find the node just before the entry and set its next to null.<br><br><strong>Algorithm Steps:</strong><br>Phase 1 → Floyd's detection: if slow == fast, cycle exists<br>Phase 2 → Reset slow to head. Advance both by 1 until they converge at cycle start<br>Phase 3 → Find the last node in the cycle (its next == cycle start), set next = null<br><br><strong>Special case:</strong> If the cycle starts at head (slow == fast after reset), we can't use the normal convergence. Instead, walk fast around the cycle until <code>fast->next == slow</code>.<br><br><strong>Trace (1→2→3→4→2):</strong><br>Phase 1: slow and fast meet inside cycle<br>Phase 2: slow from head, both advance → meet at node 2 (cycle start)<br>Phase 3: walk until <code>fast->next == 2</code> → node 4. Set 4→null<br>Result: <strong>1→2→3→4→null</strong> ✓`
                }
            ]
        },
        {
            id: 'merge-sorted-lists',
            title: 'Merge Two Sorted Lists',
            difficulty: 'medium',
            description: `Merge two sorted linked lists into one sorted list. The merged list should be made by splicing together nodes from both lists.<br><br><strong>Example:</strong> 1→3→5 merged with 2→4→6 → 1→2→3→4→5→6.`,
            testCases: [
                { input: 'l1 = [1,3,5], l2 = [2,4,6]', output: '[1,2,3,4,5,6]', explanation: 'Interleave by comparing heads.' },
                { input: 'l1 = [], l2 = [1,2]', output: '[1,2]', explanation: 'Empty list + non-empty = non-empty.' },
                { input: 'l1 = [1], l2 = [1]', output: '[1,1]', explanation: 'Equal elements preserved in order.' }
            ],
            approaches: [
                {
                    name: 'Iterative Merge',
                    code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
                    timeComplexity: 'O(n + m)',
                    spaceComplexity: 'O(1)',
                    description: `Use a dummy head and tail pointer. Compare current nodes of both lists, attach the smaller one to tail, advance that list's pointer. When one list is exhausted, attach the remainder of the other. No extra nodes created — just re-linking existing nodes.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Simulate the merge step of merge sort. A dummy node avoids special-casing the first element. Tail always points to the end of the built result. When one list runs out, the other's remainder is already sorted — attach it directly.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Compare l1->val and l2->val<br>Step 2 → Attach smaller to tail, advance that list's pointer<br>Step 3 → When one list empties: <code>tail->next = l1 ? l1 : l2</code><br><br><strong>Trace (1→3→5 and 2→4→6):</strong><br>Compare 1,2: attach 1 → tail=1<br>Compare 3,2: attach 2 → tail=2<br>Compare 3,4: attach 3 → tail=3<br>Compare 5,4: attach 4 → tail=4<br>Compare 5,6: attach 5 → tail=5<br>l1 exhausted → attach 6<br>Result: <strong>1→2→3→4→5→6</strong> ✓`
                }
            ]
        },
        {
            id: 'zigzag-ll',
            title: 'Zig-Zag Linked List',
            difficulty: 'medium',
            description: `Rearrange a linked list such that elements follow a zigzag pattern: <code>a &lt; b &gt; c &lt; d &gt; e ...</code> — alternating between ascending and descending relationships.<br><br><strong>Example:</strong> 4→3→7→8→6→2→1 → 3→7→4→8→2→6→1.`,
            testCases: [
                { input: 'head = [4,3,7,8,6,2,1]', output: '[3,7,4,8,2,6,1]', explanation: '3<7>4<8>2<6>1 follows zigzag pattern.' },
                { input: 'head = [1,2,3,4]', output: '[1,3,2,4]', explanation: '1<3>2<4 is valid zigzag.' },
                { input: 'head = [1]', output: '[1]', explanation: 'Single node is trivially zigzag.' }
            ],
            approaches: [
                {
                    name: 'In-place Reorder',
                    code: `void zigzag(ListNode* head) {
    bool flag = true; // true = expect a < b
    ListNode* curr = head;
    while (curr && curr->next) {
        if (flag) {
            if (curr->val > curr->next->val)
                swap(curr->val, curr->next->val);
        } else {
            if (curr->val < curr->next->val)
                swap(curr->val, curr->next->val);
        }
        curr = curr->next;
        flag = !flag;
    }
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Rearrange so that a < b > c < d > e.... Traverse the list, alternating between expecting ascending and descending. If the current pair violates the expected order, swap their values. Toggle the flag after each step. One pass produces the zigzag pattern.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>At each position, enforce the expected relationship (ascending or descending). Fixing a violation at position i never breaks position i-1. If position i expects ascending and we swap to fix it, currval gets smaller — the previous descending relationship (prev > curr) still holds. This greedy property guarantees a single pass suffices.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → flag=true (first pair should be ascending)<br>Step 2 → If flag && curr > next → swap (need ascending)<br>Step 3 → If !flag && curr < next → swap (need descending)<br>Step 4 → Toggle flag, advance curr<br><br><strong>Trace (4→3→7→8→6→2→1):</strong><br>i=0 (asc): 4>3 → swap → 3,4,7,8,6,2,1<br>i=1 (desc): 4<7 → swap → 3,7,4,8,6,2,1<br>i=2 (asc): 4<8 → ok<br>i=3 (desc): 8>6 → ok<br>i=4 (asc): 6>2 → swap → 3,7,4,8,2,6,1<br>i=5 (desc): 6>1 → ok<br>Result: <strong>3→7→4→8→2→6→1</strong> ✓`
                }
            ]
        },
        {
            id: 'swap-pairs',
            title: 'Swap Nodes in Pairs',
            difficulty: 'medium',
            description: `Given a linked list, swap every two adjacent nodes and return the modified list. Swap actual <strong>nodes</strong>, not just values.<br><br><strong>Example:</strong> 1→2→3→4 → 2→1→4→3.`,
            testCases: [
                { input: 'head = [1, 2, 3, 4]', output: '[2, 1, 4, 3]', explanation: 'Pairs (1,2) and (3,4) swapped.' },
                { input: 'head = [1, 2, 3]', output: '[2, 1, 3]', explanation: 'Odd length — last node stays.' },
                { input: 'head = []', output: '[]', explanation: 'Empty list.' }
            ],
            approaches: [
                {
                    name: 'Iterative',
                    code: `ListNode* swapPairs(ListNode* head) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* prev = &dummy;
    while (prev->next && prev->next->next) {
        ListNode* first = prev->next;
        ListNode* second = first->next;
        first->next = second->next;
        second->next = first;
        prev->next = second;
        prev = first;
    }
    return dummy.next;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Use a dummy node before head. For each pair: save first and second nodes, re-link them (second points to first, first points to what comes after, prev points to second). Advance prev to first (now the second in the swapped pair). Handles odd-length lists naturally.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>For each pair <code>prev → first → second → rest</code>, rewire to <code>prev → second → first → rest</code>. Four pointer updates per pair. The dummy node consistent handling of the first pair.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → <code>first->next = second->next</code> (first skips to rest)<br>Step 2 → <code>second->next = first</code> (second points back to first)<br>Step 3 → <code>prev->next = second</code> (connect previous pair to new leader)<br>Step 4 → <code>prev = first</code> (advance — first is now last in this pair)<br><br><strong>Trace (1→2→3→4):</strong><br>Pair (1,2): dummy→2→1→3→4, prev=1<br>Pair (3,4): dummy→2→1→4→3, prev=3<br>No more pairs → done<br>Result: <strong>2→1→4→3</strong> ✓`
                }
            ]
        },
        // ===== HARD =====
        {
            id: 'reverse-k-group',
            title: 'Reverse Nodes in K-Group',
            difficulty: 'hard',
            description: `Given a linked list and integer <strong>k</strong>, reverse every k consecutive nodes. Nodes remaining (fewer than k at the end) stay in original order.<br><br><strong>Example:</strong> 1→2→3→4→5, k=3 → 3→2→1→4→5.`,
            testCases: [
                { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]', explanation: 'First group [1,2,3] reversed. Remaining [4,5] stays.' },
                { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]', explanation: 'Two groups reversed, last node stays.' },
                { input: 'head = [1,2,3], k = 1', output: '[1,2,3]', explanation: 'k=1 means no reversal.' }
            ],
            approaches: [
                {
                    name: 'Iterative K-Reversal',
                    code: `ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* groupPrev = &dummy;
    while (true) {
        ListNode* kth = groupPrev;
        for (int i = 0; i < k && kth; i++) kth = kth->next;
        if (!kth) break;
        ListNode* groupNext = kth->next;
        ListNode *prev = groupNext, *curr = groupPrev->next;
        for (int i = 0; i < k; i++) {
            ListNode* tmp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = tmp;
        }
        ListNode* tmp = groupPrev->next;
        groupPrev->next = kth;
        groupPrev = tmp;
    }
    return dummy.next;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Count k nodes ahead. If fewer than k remain, stop. Otherwise reverse the k-node segment: set prev = node after the group, then reverse k links. Update the connection before the group to point to the new first node (was last). Move groupPrev to the end of the reversed segment (was the first node before reversal).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Process the list in chunks of k. For each chunk: verify k nodes exist, reverse them in place, reconnect to the rest. The trick is initializing prev to the node <em>after</em> the group — so the last reversed node automatically links forward.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Check if k nodes exist (advance kth k times from groupPrev)<br>Step 2 → Save groupNext = kth->next. Set prev = groupNext<br>Step 3 → Reverse k links starting from groupPrev->next<br>Step 4 → Reconnect: groupPrev->next = kth (new group head)<br>Step 5 → Advance groupPrev to the original first node (now group tail)<br><br><strong>Trace (1→2→3→4→5, k=3):</strong><br>Group [1,2,3]: reverse → 3→2→1→4→5, groupPrev moves to 1<br>Group [4,5]: only 2 nodes, k=3 → stop<br>Result: <strong>3→2→1→4→5</strong> ✓`
                }
            ]
        },
        {
            id: 'copy-random-pointer',
            title: 'Copy List with Random Pointer',
            difficulty: 'hard',
            description: `Deep copy a linked list where each node has a <strong>next</strong> pointer and a <strong>random</strong> pointer (which can point to any node or null). Return the head of the copied list.<br><br>The challenge: random pointers reference nodes that may not yet be created.`,
            testCases: [
                { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', explanation: 'Deep copy with same structure. Random pointers correctly mapped.' },
                { input: 'head = [[1,1],[2,1]]', output: '[[1,1],[2,1]]', explanation: 'Both random pointers point to node at index 1.' },
                { input: 'head = []', output: '[]', explanation: 'Empty list.' }
            ],
            approaches: [
                {
                    name: 'Interweaving Nodes',
                    code: `Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    // Step 1: Interweave copies
    Node* curr = head;
    while (curr) {
        Node* copy = new Node(curr->val);
        copy->next = curr->next;
        curr->next = copy;
        curr = copy->next;
    }
    // Step 2: Set random pointers
    curr = head;
    while (curr) {
        if (curr->random)
            curr->next->random = curr->random->next;
        curr = curr->next->next;
    }
    // Step 3: Separate lists
    Node* newHead = head->next;
    curr = head;
    while (curr) {
        Node* copy = curr->next;
        curr->next = copy->next;
        copy->next = copy->next ? copy->next->next : nullptr;
        curr = curr->next;
    }
    return newHead;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1) — excluding output',
                    description: `Create each copy right after its original (A→A'→B→B'→...). Now original->next is the copy, so copy's random = original->random->next. Finally, separate the interweaved list into original and copy. This avoids a hash map by using the list structure itself as the mapping.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Embed copies directly into the list to create an implicit mapping: original→copy via the next pointer. This eliminates the need for a hash map. Three passes: create copies, set random pointers, then separate the two lists.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Interleave: insert A' after A, B' after B, etc. → A→A'→B→B'→C→C'<br>Step 2 → Random pointers: <code>curr->next->random = curr->random->next</code> (copy's random = original's random's copy)<br>Step 3 → Separate: restore original links, extract copy links<br><br><strong>Why this avoids a hash map:</strong><br>The interleaving creates a structural guarantee: the copy of any node X is always X->next. So finding the copy of random targets is O(1) without any auxiliary data structure.<br><br><strong>Step 3 detail:</strong><br>After interleaving A→A'→B→B': set A->next = B (skip A'), A'->next = B' (skip B). Both lists are fully restored/constructed.`
                }
            ]
        },
        {
            id: 'flatten-dll',
            title: 'Flatten a Doubly Linked List',
            difficulty: 'hard',
            description: `A doubly linked list has nodes with <strong>next</strong>, <strong>prev</strong>, and <strong>child</strong> pointers. The child pointer can reference a separate sub-list. Flatten all levels into a single-level doubly linked list.<br><br>Child lists should be inserted between the current node and its next node.`,
            testCases: [
                { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]', explanation: 'Children inserted depth-first.' },
                { input: 'head = [1,2,null,3]', output: '[1,3,2]', explanation: 'Child of node 1 is 3; spliced in.' },
                { input: 'head = []', output: '[]', explanation: 'Empty list.' }
            ],
            approaches: [
                {
                    name: 'Iterative Splicing',
                    code: `Node* flatten(Node* head) {
    Node* curr = head;
    while (curr) {
        if (curr->child) {
            Node* next = curr->next;
            Node* child = curr->child;
            curr->next = child;
            child->prev = curr;
            curr->child = nullptr;
            // Find tail of child list
            Node* tail = child;
            while (tail->next) tail = tail->next;
            tail->next = next;
            if (next) next->prev = tail;
        }
        curr = curr->next;
    }
    return head;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Traverse the list. When a node has a child, insert the child sublist between the node and its next. Find the tail of the child list, connect it to the original next. Clear the child pointer. Continue traversal — nested children are handled naturally as we encounter them.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Splice each child list inline as we encounter it. After splicing, the child's nodes become part of the main traversal, so nested children at deeper levels are encountered and processed automatically in subsequent iterations. No recursion needed.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Save <code>next = curr->next</code><br>Step 2 → Splice child in: <code>curr->next = child, child->prev = curr</code><br>Step 3 → Clear: <code>curr->child = nullptr</code><br>Step 4 → Find tail of child sublist, connect to saved next<br>Step 5 → Continue advancing<br><br><strong>Why O(n) despite inner tail-finding?</strong> Each node is visited at most twice — once during main traversal, once during tail-finding. Total work across all splice operations is O(n).`
                }
            ]
        },
        {
            id: 'merge-sort-ll',
            title: 'Merge Sort on Linked List',
            difficulty: 'hard',
            description: `Sort a linked list in O(n log n) time using merge sort. Unlike arrays, linked lists don't support random access, but splitting and merging can be done by relinking nodes — no extra space for copying.<br><br><strong>Example:</strong> 4→2→1→3 → 1→2→3→4.`,
            testCases: [
                { input: 'head = [4, 2, 1, 3]', output: '[1, 2, 3, 4]', explanation: 'Full ascending sort.' },
                { input: 'head = [-1, 5, 3, 4, 0]', output: '[-1, 0, 3, 4, 5]', explanation: 'Handles negatives.' },
                { input: 'head = []', output: '[]', explanation: 'Empty list is sorted.' }
            ],
            approaches: [
                {
                    name: 'Top-down Merge Sort',
                    code: `ListNode* getMid(ListNode* head) {
    ListNode *slow = head, *fast = head->next;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

ListNode* merge(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

ListNode* mergeSort(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* mid = getMid(head);
    ListNode* right = mid->next;
    mid->next = nullptr;
    return merge(mergeSort(head), mergeSort(right));
}`,
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(log n) — recursion stack',
                    description: `Find middle using slow/fast (fast starts at head->next to split evenly). Cut list into two halves. Recursively sort each half. Merge sorted halves. Unlike array merge sort, no extra O(n) space needed for merging since we re-link existing nodes. O(log n) space from recursion stack.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Divide-and-conquer: split the list at the midpoint, recursively sort both halves, merge them back. Linked list merge is O(1) auxiliary space (just relinking), making this more space-efficient than array merge sort.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base: 0 or 1 node → already sorted<br>Step 2 → Find middle using slow/fast (fast starts at head->next for even splits)<br>Step 3 → Cut: <code>mid->next = nullptr</code> to create two separate lists<br>Step 4 → Recurse on both halves, merge results<br><br><strong>Why fast starts at head->next:</strong><br>For a 2-node list [1,2], starting fast at head would put slow at node 2, giving splits [1,2] and [] — infinite recursion. Starting at head->next yields [1] and [2].<br><br><strong>Complexity:</strong><br>Time: O(n log n) — log n levels, each processing all n nodes during merge. Space: O(log n) recursion depth. No auxiliary arrays needed since merging relinks existing nodes.`
                }
            ]
        }
    ]
};
