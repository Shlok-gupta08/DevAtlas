// =================================================================
//  DSA — Hashing & Tries
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['hashing-tries'] = {
    id: 'hashing-tries',
    name: 'Hashing & Tries',
    icon: '#️⃣',
    color: '#fb7185',
    questions: [
        // ===== EASY =====
        {
            id: 'hashmap-impl',
            title: 'Implement HashMap (Internals)',
            difficulty: 'easy',
            description: `Implement a basic <strong>HashMap</strong> that supports put, get, and remove operations. Use <strong>chaining</strong> (linked list per bucket) to handle hash collisions.`,
            testCases: [
                { input: 'put(1, 10), put(2, 20), get(1)', output: '10', explanation: 'Key 1 maps to value 10. get(1) returns 10.' },
                { input: 'put(1, 10), put(1, 30), get(1)', output: '30', explanation: 'Duplicate key updates the value. get(1) returns 30.' },
                { input: 'put(1, 10), remove(1), get(1)', output: '-1', explanation: 'After removal, key 1 no longer exists. get returns -1.' }
            ],
            approaches: [
                {
                    name: 'Chaining with Linked List',
                    code: `class HashMap {
    static const int SIZE = 1000;
    list<pair<int,int>> table[SIZE];
    int hash(int key) { return key % SIZE; }
public:
    void put(int key, int val) {
        int h = hash(key);
        for (auto& p : table[h]) {
            if (p.first == key) { p.second = val; return; }
        }
        table[h].push_back({key, val});
    }
    int get(int key) {
        int h = hash(key);
        for (auto& p : table[h])
            if (p.first == key) return p.second;
        return -1;
    }
    void remove(int key) {
        int h = hash(key);
        table[h].remove_if([key](auto& p) { return p.first == key; });
    }
};`,
                    timeComplexity: 'O(1) average, O(n) worst',
                    spaceComplexity: 'O(n)',
                    description: `Hash map stores key-value pairs using a hash function to map keys to bucket indices. Collisions are handled by chaining (linked list per bucket). Put: hash key, search bucket for existing key (update) or append. Get: hash key, linear search in bucket. Average O(1) with good hash function and load factor.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A hash function converts a key into an array index. Multiple keys can map to the same index (collision). Chaining stores all colliding pairs in a linked list at that index.<br><br><strong>Algorithm Steps:</strong><br><code>hash(key)</code>: <code>key % SIZE</code> maps any integer to a bucket in [0, 999].<br><br><code>put(key, val)</code>:<br>Step 1 → Compute bucket index h.<br>Step 2 → Search chain at table[h] for existing key → update value if found.<br>Step 3 → If key not found → append {key, val} to chain.<br><br><code>get(key)</code>:<br>Step 1 → Compute bucket h. Step 2 → Linear search chain for matching key. Return value or -1.<br><br><code>remove(key)</code>:<br>Use <code>remove_if</code> to delete the matching pair from the chain.<br><br><strong>Trace (put(1,10), put(1001,20), get(1)):</strong><br>hash(1) = 1, hash(1001) = 1 — collision! Both go to bucket 1.<br>table[1] = [{1,10}, {1001,20}]. get(1) scans chain → finds {1,10} → returns 10.<br><br><strong>Complexity — Why O(1) average?</strong><br>With a good hash function and load factor &lt; 1, chains are short (average length ~1). Worst case: all keys hash to one bucket → O(n) per operation.`
                }
            ]
        },
        {
            id: 'count-distinct',
            title: 'Count Distinct Elements',
            difficulty: 'easy',
            description: `Given an array of integers, count the number of <strong>distinct (unique) elements</strong>. Duplicates should only be counted once.`,
            testCases: [
                { input: 'arr = [1, 2, 2, 3, 3, 3]', output: '3', explanation: 'Distinct elements: 1, 2, 3.' },
                { input: 'arr = [5, 5, 5, 5]', output: '1', explanation: 'Only one distinct element: 5.' },
                { input: 'arr = [1, 2, 3, 4, 5]', output: '5', explanation: 'All elements are unique.' }
            ],
            approaches: [
                {
                    name: 'Hash Set',
                    code: `int countDistinct(vector<int>& arr) {
    unordered_set<int> s(arr.begin(), arr.end());
    return s.size();
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Insert all elements into a hash set. Duplicates are automatically ignored. The set size equals the number of distinct elements. One pass, O(1) per insertion on average.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A hash set only stores unique values — inserting a duplicate has no effect. The final size of the set is the distinct count.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Construct a hash set from the array: <code>unordered_set&lt;int&gt; s(arr.begin(), arr.end())</code>.<br>Step 2 → Return <code>s.size()</code>.<br><br><strong>Trace (arr = [1, 2, 2, 3, 3, 3]):</strong><br>Insert 1: set = {1}. Insert 2: {1,2}. Insert 2: duplicate, ignored → {1,2}.<br>Insert 3: {1,2,3}. Insert 3: ignored. Insert 3: ignored.<br>Size = 3.<br><br><strong>Complexity — Why O(n)?</strong><br>The range constructor iterates through all n elements. Each hash set insertion is O(1) average. Total: O(n) time, O(n) space for the set.`
                }
            ]
        },
        {
            id: 'union-intersection',
            title: 'Union & Intersection of Arrays',
            difficulty: 'easy',
            description: `Given two arrays, compute their <strong>union</strong> (all distinct elements from both) and <strong>intersection</strong> (elements common to both). Each element should appear at most once in the result.`,
            testCases: [
                { input: 'a = [1, 2, 3], b = [2, 3, 4]', output: 'Union: [1,2,3,4], Intersection: [2,3]', explanation: 'Union combines all unique elements. Intersection picks shared ones.' },
                { input: 'a = [1, 1, 2], b = [2, 2, 3]', output: 'Union: [1,2,3], Intersection: [2]', explanation: 'Duplicates within arrays are handled by the set.' },
                { input: 'a = [1, 2], b = [3, 4]', output: 'Union: [1,2,3,4], Intersection: []', explanation: 'No common elements. Intersection is empty.' }
            ],
            approaches: [
                {
                    name: 'Hash Set',
                    code: `vector<int> unionArrays(vector<int>& a, vector<int>& b) {
    unordered_set<int> s(a.begin(), a.end());
    s.insert(b.begin(), b.end());
    return vector<int>(s.begin(), s.end());
}
vector<int> intersection(vector<int>& a, vector<int>& b) {
    unordered_set<int> sa(a.begin(), a.end());
    vector<int> result;
    for (int x : b)
        if (sa.erase(x)) result.push_back(x);
    return result;
}`,
                    timeComplexity: 'O(n + m)',
                    spaceComplexity: 'O(n + m)',
                    description: `Union: insert both arrays into a set (handles duplicates). Intersection: put first array in a set, iterate second array and check existence. Using erase for intersection ensures each common element appears once.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Sets naturally handle uniqueness. Union = merge both into one set. Intersection = find elements present in both.<br><br><strong>Union:</strong><br>Step 1 → Build set from array a.<br>Step 2 → Insert all elements from b (duplicates ignored).<br>Step 3 → Convert set to vector.<br><br><strong>Intersection (using erase trick):</strong><br>Step 1 → Build set from array a.<br>Step 2 → For each element x in b: <code>sa.erase(x)</code> returns 1 if x existed (and removes it), 0 otherwise.<br>Step 3 → If erase returns 1, x is common → add to result.<br><br><strong>Why erase instead of count?</strong><br>If b = [2, 2, 3] and sa = {2, 3}: using <code>count</code> would add 2 twice. Using <code>erase</code>: first 2 erases from set and adds to result, second 2 finds nothing → skipped. Each common element appears exactly once.<br><br><strong>Complexity — Why O(n + m)?</strong><br>Building set from a: O(n). Inserting/scanning b: O(m). Total: O(n + m).`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'itinerary-tickets',
            title: 'Find Itinerary from Tickets',
            difficulty: 'medium',
            description: `Given a list of airline tickets as (source, destination) pairs, reconstruct the <strong>complete itinerary</strong> in order. The itinerary starts from the city that never appears as a destination.`,
            testCases: [
                { input: 'tickets: Chennai→Bangalore, Mumbai→Chennai, Goa→Mumbai', output: 'Goa → Mumbai → Chennai → Bangalore', explanation: 'Goa is never a destination. Follow the chain.' },
                { input: 'tickets: A→B, B→C, C→D', output: 'A → B → C → D', explanation: 'A is not a destination. Linear chain.' },
                { input: 'tickets: X→Y, Z→X', output: 'Z → X → Y', explanation: 'Z is not a destination. Chain: Z→X→Y.' }
            ],
            approaches: [
                {
                    name: 'HashMap Tracing',
                    code: `vector<string> findItinerary(vector<pair<string,string>>& tickets) {
    unordered_map<string, string> mp;
    unordered_set<string> destinations;
    for (auto& [from, to] : tickets) {
        mp[from] = to;
        destinations.insert(to);
    }
    // Find starting city (not a destination)
    string start;
    for (auto& [from, to] : tickets)
        if (!destinations.count(from)) { start = from; break; }
    vector<string> route;
    while (mp.count(start)) {
        route.push_back(start);
        start = mp[start];
    }
    route.push_back(start);
    return route;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Map each source to its destination. The starting city is the one that never appears as a destination. Follow the chain from start until no mapping exists (final destination). O(n) total.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Each ticket is a directed edge. The itinerary forms a simple path. The start node is the only city that has no incoming edge (never appears as a destination).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Build a map: <code>mp[from] = to</code> for each ticket.<br>Step 2 → Collect all destinations in a set.<br>Step 3 → Find the starting city: the <code>from</code> city not in the destinations set.<br>Step 4 → Follow the chain: <code>start → mp[start] → mp[mp[start]] → ...</code> until no mapping exists.<br><br><strong>Trace (Chennai→Bangalore, Mumbai→Chennai, Goa→Mumbai):</strong><br>Map: {Chennai:Bangalore, Mumbai:Chennai, Goa:Mumbai}.<br>Destinations: {Bangalore, Chennai, Mumbai}.<br>Start: Goa (not in destinations).<br>Chain: Goa → Mumbai → Chennai → Bangalore.<br><br><strong>Complexity — Why O(n)?</strong><br>Building map: O(n). Finding start: O(n). Following chain: O(n). Each ticket visited once.`
                }
            ]
        },
        {
            id: 'trie-impl',
            title: 'Trie Implementation',
            difficulty: 'medium',
            description: `Implement a <strong>Trie</strong> (prefix tree) that supports three operations:<br>• <code>insert(word)</code> — adds a word<br>• <code>search(word)</code> — returns true if the exact word exists<br>• <code>startsWith(prefix)</code> — returns true if any word starts with the given prefix`,
            testCases: [
                { input: 'insert("apple"), search("apple")', output: 'true', explanation: '"apple" was inserted and found.' },
                { input: 'insert("apple"), search("app")', output: 'false', explanation: '"app" is a prefix of "apple" but not a complete word.' },
                { input: 'insert("apple"), startsWith("app")', output: 'true', explanation: '"apple" starts with "app".' }
            ],
            approaches: [
                {
                    name: 'Standard Trie',
                    code: `struct TrieNode {
    TrieNode* children[26] = {};
    bool isEnd = false;
};
class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c-'a'])
                node->children[c-'a'] = new TrieNode();
            node = node->children[c-'a'];
        }
        node->isEnd = true;
    }
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c-'a']) return false;
            node = node->children[c-'a'];
        }
        return node->isEnd;
    }
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children[c-'a']) return false;
            node = node->children[c-'a'];
        }
        return true;
    }
};`,
                    timeComplexity: 'O(L) per operation (L = word length)',
                    spaceComplexity: 'O(N × L) total',
                    description: `Trie stores strings character by character. Each node has 26 children (for a-z) and an end-of-word flag. Insert creates nodes along the path. Search follows the path and checks isEnd. StartsWith follows the path without checking isEnd. O(L) per operation regardless of dictionary size.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A trie organizes strings by shared prefixes. Each level represents one character position. Shared prefixes share nodes, saving space and enabling fast prefix queries.<br><br><strong>TrieNode:</strong><br><code>children[26]</code> — pointers to child nodes (one per lowercase letter). Initially all null.<br><code>isEnd</code> — marks whether this node completes a valid word.<br><br><strong>insert(word):</strong><br>Step 1 → Start at root.<br>Step 2 → For each character: if child doesn't exist, create a new node. Move to child.<br>Step 3 → After all characters, mark last node: <code>isEnd = true</code>.<br><br><strong>search(word):</strong><br>Step 1 → Start at root.<br>Step 2 → For each character: if child is null → word not in trie, return false.<br>Step 3 → After traversal: return <code>node->isEnd</code>. (It could be a prefix of another word.)<br><br><strong>startsWith(prefix):</strong><br>Same as search but return true after successful traversal (ignore isEnd).<br><br><strong>Trace (insert "apple", search "app"):</strong><br>Insert creates nodes: root → a → p → p → l → e (isEnd=true).<br>Search "app": root → a → p → p (exists). isEnd=false → return false.<br><br><strong>Complexity — Why O(L)?</strong><br>Each operation traverses exactly L nodes. No comparison with other stored words. This makes tries ideal for prefix matching and autocomplete.`
                }
            ]
        },
        {
            id: 'word-break',
            title: 'Word Break Problem',
            difficulty: 'medium',
            description: `Given a string s and a dictionary of words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.<br><br>Example: "leetcode" with dictionary ["leet", "code"] → true ("leet code").`,
            testCases: [
                { input: 's = "leetcode", dict = ["leet", "code"]', output: 'true', explanation: '"leetcode" = "leet" + "code". Both in dictionary.' },
                { input: 's = "applepenapple", dict = ["apple", "pen"]', output: 'true', explanation: '"apple" + "pen" + "apple". Words can be reused.' },
                { input: 's = "catsandog", dict = ["cats","dog","sand","and","cat"]', output: 'false', explanation: 'No valid segmentation exists. "cats" + "and" leaves "og" which is not in dict.' }
            ],
            approaches: [
                {
                    name: 'DP with Hash Set',
                    code: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            if (dp[j] && dict.count(s.substr(j, i - j)))
                { dp[i] = true; break; }
    return dp[n];
}`,
                    timeComplexity: 'O(n² × L)',
                    spaceComplexity: 'O(n)',
                    description: `dp[i] = true if s[0..i-1] can be segmented into dictionary words. For each position i, check all split points j: if dp[j] is true and s[j..i-1] is in dictionary, then dp[i] is true. Hash set gives O(1) dictionary lookups. Answer is dp[n].`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Build up from left to right. If we know s[0..j-1] is breakable (dp[j] = true), and s[j..i-1] is a dictionary word, then s[0..i-1] is also breakable (dp[i] = true).<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base case: dp[0] = true (empty string is trivially segmentable).<br>Step 2 → For each position i (1 to n): try every split point j (0 to i-1).<br>Step 3 → Check: dp[j] (prefix is breakable) AND dict.count(s.substr(j, i-j)) (remaining is a word).<br>Step 4 → If both true: dp[i] = true, break (no need to check other j values).<br>Step 5 → Return dp[n].<br><br><strong>Trace (s = "leetcode", dict = {"leet", "code"}):</strong><br>dp[0] = true.<br>i=1: check j=0, "l" not in dict. dp[1]=false.<br>i=2: "le" not in dict. dp[2]=false.<br>i=3: "lee" not in dict. dp[3]=false.<br>i=4: j=0, dp[0]=true, "leet" in dict → dp[4]=true.<br>i=5..7: no valid split found.<br>i=8: j=4, dp[4]=true, "code" in dict → dp[8]=true. Return true.<br><br><strong>Complexity — Why O(n² × L)?</strong><br>O(n) positions × O(n) split points × O(L) substring creation. Hash lookup itself is O(L) for hashing the substring.`
                }
            ]
        },
        {
            id: 'prefix-starts-with',
            title: 'Prefix Problem & startsWith',
            difficulty: 'medium',
            description: `Given a dictionary of words stored in a Trie, find the <strong>shortest prefix</strong> of a given word that exists as a complete word in the dictionary. If no prefix exists, return the original word.`,
            testCases: [
                { input: 'dict: ["cat","catch"], word: "catching"', output: '"cat"', explanation: '"cat" is the shortest prefix of "catching" that is a dictionary word.' },
                { input: 'dict: ["app","apple"], word: "application"', output: '"app"', explanation: 'Both "app" and "apple" are prefixes, but "app" is shorter.' },
                { input: 'dict: ["hello"], word: "world"', output: '"world"', explanation: 'No prefix of "world" is in the dictionary. Return the word itself.' }
            ],
            approaches: [
                {
                    name: 'Trie Prefix Search',
                    code: `// Uses the Trie implementation above
string shortestPrefix(Trie& trie, string word) {
    TrieNode* node = trie.root;
    string prefix;
    for (char c : word) {
        if (!node->children[c - 'a']) break;
        node = node->children[c - 'a'];
        prefix += c;
        if (node->isEnd) return prefix;
    }
    return word; // No prefix found, return whole word
}`,
                    timeComplexity: 'O(L)',
                    spaceComplexity: 'O(1) extra',
                    description: `Walk the trie character by character. At each step, check if the current node is an end-of-word. If yes, we found the shortest prefix that is a complete dictionary word. If we reach a null child or exhaust the word without finding a complete prefix, no valid prefix exists.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Traverse the trie following the characters of the query word. The first node with isEnd = true gives the shortest matching prefix — because we process characters left to right.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Start at trie root.<br>Step 2 → For each character c in the word:<br>  - If child node for c doesn't exist → no prefix possible, break.<br>  - Move to child. Append c to prefix.<br>  - If child's isEnd is true → this is the shortest prefix, return it.<br>Step 3 → If loop ends without finding a prefix, return the original word.<br><br><strong>Trace (dict: ["cat","catch"], word: "catching"):</strong><br>root → c → a → t (isEnd = true!) → return "cat".<br>We never even check "catch" because "cat" is found first.<br><br><strong>Complexity — Why O(L)?</strong><br>At most L characters traversed, where L is the word length. Each step is O(1) — direct array index into children.`
                }
            ]
        },

        // ===== HARD =====
        {
            id: 'unique-substrings',
            title: 'Count Unique Substrings',
            difficulty: 'hard',
            description: `Given a string, count the number of <strong>distinct substrings</strong> (including the empty string). Use a Trie to efficiently enumerate all unique substrings by inserting all suffixes.`,
            testCases: [
                { input: 's = "abc"', output: '7', explanation: 'Substrings: "", "a", "b", "c", "ab", "bc", "abc". All distinct.' },
                { input: 's = "aab"', output: '6', explanation: '""", "a", "b", "aa", "ab", "aab". "a" counted once despite two occurrences.' },
                { input: 's = "aaa"', output: '4', explanation: '"", "a", "aa", "aaa". Many duplicates collapsed.' }
            ],
            approaches: [
                {
                    name: 'Trie Node Counting',
                    code: `int countUniqueSubstrings(string s) {
    TrieNode* root = new TrieNode();
    int count = 0;
    for (int i = 0; i < s.size(); i++) {
        TrieNode* node = root;
        for (int j = i; j < s.size(); j++) {
            int idx = s[j] - 'a';
            if (!node->children[idx]) {
                node->children[idx] = new TrieNode();
                count++; // New unique substring
            }
            node = node->children[idx];
        }
    }
    return count + 1; // +1 for empty string
}`,
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(n²)',
                    description: `Insert all suffixes of the string into a trie. Each new node created corresponds to a unique substring. Count of new nodes + 1 (empty string) = total distinct substrings. Every substring is a prefix of some suffix, so inserting all suffixes covers every possible substring.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Every substring of a string is a prefix of some suffix. By inserting all n suffixes into a trie, every unique substring creates exactly one trie node. Counting new nodes = counting unique substrings.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → For each starting position i (each suffix s[i..n-1]):<br>Step 2 → Insert the suffix character by character into the trie.<br>Step 3 → Each time a new child node is created → a new unique substring is discovered → increment count.<br>Step 4 → If the child already exists → this substring was seen before → move forward without counting.<br>Step 5 → Return count + 1 (for the empty string).<br><br><strong>Trace (s = "aab"):</strong><br>Suffix "aab" (i=0): insert a(new,count=1)→a(new,count=2)→b(new,count=3).<br>Suffix "ab" (i=1): a(exists)→b(new,count=4).<br>Suffix "b" (i=2): b(new,count=5).<br>Total = 5 + 1 (empty) = 6. Substrings: "", "a", "aa", "aab", "ab", "b".<br><br><strong>Complexity — Why O(n²)?</strong><br>n suffixes, each up to length n. Total characters inserted ≤ n(n+1)/2. Each insertion step is O(1). Space: O(n²) nodes in the worst case (all characters distinct).`
                }
            ]
        },
        {
            id: 'longest-word-prefixes',
            title: 'Longest Word with All Prefixes',
            difficulty: 'hard',
            description: `Given a list of words, find the <strong>longest word</strong> such that every prefix of that word is also a word in the list. If there are ties, return the lexicographically smallest one.<br><br>Example: words = ["a", "ap", "app", "appl", "apple"] → "apple" (every prefix "a", "ap", "app", "appl" is also in the list).`,
            testCases: [
                { input: 'words = ["a","ap","app","appl","apple"]', output: '"apple"', explanation: 'All prefixes of "apple" ("a","ap","app","appl") are in the list.' },
                { input: 'words = ["a","banana","app","appl","ap","apple","apply"]', output: '"apple"', explanation: 'Both "apple" and "apply" have length 5 with all prefixes. "apple" < "apply" lexicographically.' },
                { input: 'words = ["cat","dog"]', output: '""', explanation: 'Neither "c" nor "d" is in the list. No word has all prefixes present.' }
            ],
            approaches: [
                {
                    name: 'Trie DFS',
                    code: `string longestWord(vector<string>& words) {
    Trie trie;
    for (auto& w : words) trie.insert(w);
    string result, current;
    function<void(TrieNode*)> dfs = [&](TrieNode* node) {
        for (int i = 0; i < 26; i++) {
            if (node->children[i] && node->children[i]->isEnd) {
                current += ('a' + i);
                if (current.size() > result.size()) result = current;
                dfs(node->children[i]);
                current.pop_back();
            }
        }
    };
    dfs(trie.root);
    return result;
}`,
                    timeComplexity: 'O(N × L + 26 × nodes)',
                    spaceComplexity: 'O(N × L)',
                    description: `Insert all words into a trie. DFS from root, only following paths where each node is a word end (meaning all prefixes exist as complete words). Track the longest word found. Iterating children a-z ensures lexicographically smallest result among ties.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Insert all words into a trie. Then DFS from the root with a constraint: only follow child nodes that have isEnd = true. This ensures every prefix along the path is a valid word in the dictionary.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Insert all words into the trie.<br>Step 2 → DFS from root. For each child (a to z order):<br>  - If child exists AND child->isEnd is true → this prefix is a valid word, so we can extend.<br>  - Add the character to current path, update result if longer, recurse deeper.<br>  - Backtrack: remove the character.<br>Step 3 → Iterating a-z ensures lexicographic order — first found wins among equal-length words.<br><br><strong>Trace (words: ["a","ap","app","appl","apple"]):</strong><br>Trie: root→a(end)→p(end)→p(end)→l(end)→e(end).<br>DFS: root → a (isEnd, current="a") → p (isEnd, "ap") → p (isEnd, "app") → l (isEnd, "appl") → e (isEnd, "apple").<br>result = "apple" (length 5).<br><br><strong>Complexity — Why O(N × L)?</strong><br>Trie construction: O(N × L) where N is number of words, L is average length. DFS visits at most all trie nodes: O(total characters). Overall: O(N × L).`
                }
            ]
        }
    ]
};
