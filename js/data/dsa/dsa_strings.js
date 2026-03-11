// =================================================================
//  DSA — Strings
// =================================================================
window.DSAData = window.DSAData || {};
window.DSAData['strings'] = {
    id: 'strings',
    name: 'Strings',
    icon: '🔤',
    color: '#fbbf24',
    questions: [
        // ===== EASY =====
        {
            id: 'valid-palindrome',
            title: 'Valid Palindrome',
            difficulty: 'easy',
            description: `<p>Given a string <strong>s</strong>, determine if it is a palindrome, considering only <strong>alphanumeric</strong> characters and ignoring cases. Return <code>true</code> if it is a palindrome, <code>false</code> otherwise.</p>`,
            testCases: [
                { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: 'After removing non-alphanumeric and lowering: "amanaplanacanalpanama" — reads the same forwards and backwards.' },
                { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
                { input: 's = " "', output: 'true', explanation: 'Empty string after removing non-alphanumeric characters is a palindrome.' }
            ],
            approaches: [
                {
                    name: 'Two Pointers',
                    code: `bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Two pointers converge from both ends, skipping non-alphanumeric characters and comparing case-insensitively. If every pair matches, the string reads the same forwards and backwards.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Use two pointers from both ends, skipping non-alphanumeric characters, and compare characters case-insensitively. If all pairs match, the string is a palindrome.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Initialize left = 0, right = n − 1.</li>
  <li>While left &lt; right:
    <ul>
      <li>Advance left past non-alphanumeric characters.</li>
      <li>Advance right past non-alphanumeric characters.</li>
      <li>Compare tolower(s[left]) with tolower(s[right]). If different, return false.</li>
      <li>Move both pointers inward.</li>
    </ul>
  </li>
  <li>If the loop completes, return true.</li>
</ol>

<p><strong>Trace (s = "racecar"):</strong></p>
<pre>
left=0, right=6: 'r' == 'r' ✓ → left=1, right=5
left=1, right=5: 'a' == 'a' ✓ → left=2, right=4
left=2, right=4: 'c' == 'c' ✓ → left=3, right=3
left=3, right=3: left not < right → loop ends
Return true
</pre>

<p><strong>Complexity — Why O(n):</strong> Each pointer moves at most n times total. No extra space is used — comparison happens in-place without creating a reversed copy.</p>`
                }
            ]
        },
        {
            id: 'reverse-words',
            title: 'Reverse Words in a String',
            difficulty: 'easy',
            description: `<p>Given an input string <strong>s</strong>, reverse the order of the <strong>words</strong>. A word is a sequence of non-space characters. Return the string with words in reverse order, separated by single spaces, with no leading or trailing spaces.</p>`,
            testCases: [
                { input: 's = "the sky is blue"', output: '"blue is sky the"', explanation: 'Words reversed in order.' },
                { input: 's = "  hello world  "', output: '"world hello"', explanation: 'Leading/trailing spaces removed, words reversed.' },
                { input: 's = "a good   example"', output: '"example good a"', explanation: 'Multiple spaces between words reduced to single spaces.' }
            ],
            approaches: [
                {
                    name: 'Two-Pass Reverse',
                    code: `string reverseWords(string s) {
    // Remove extra spaces and reverse whole string
    string result;
    int n = s.size(), i = 0;
    while (i < n) {
        while (i < n && s[i] == ' ') i++;
        if (i >= n) break;
        if (!result.empty()) result += ' ';
        while (i < n && s[i] != ' ') result += s[i++];
    }
    // Reverse whole string, then reverse each word
    reverse(result.begin(), result.end());
    int left = 0;
    for (int j = 0; j <= result.size(); j++) {
        if (j == result.size() || result[j] == ' ') {
            reverse(result.begin() + left, result.begin() + j);
            left = j + 1;
        }
    }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    description: `Build a cleaned string with single-spaced words, reverse the entire thing (putting words in correct order but each word reversed), then reverse individual words to restore them. Two reversals produce the desired outcome.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> First build a cleaned string (single spaces, no leading/trailing). Then reverse the entire string (puts words in correct order but each word is backwards). Finally, reverse each individual word to restore it.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Scan through s, skip spaces, and build a cleaned result with words separated by single spaces.</li>
  <li>Reverse the entire result string.</li>
  <li>Iterate through result: when a space or end of string is found, reverse the word from left to that position.</li>
</ol>

<p><strong>Trace (s = "the sky is blue"):</strong></p>
<pre>
Clean: "the sky is blue" (already clean)
Reverse whole: "eulb si yks eht"
Reverse each word:
  "eulb" → "blue"
  "si"   → "is"
  "yks"  → "sky"
  "eht"  → "the"
Result: "blue is sky the"
</pre>

<p><strong>Complexity — Why O(n):</strong> Three linear passes: cleaning, full reverse, and per-word reversal. Each character is visited a constant number of times. The double-reverse technique is a classic pattern for reversing word order without needing a split/join operation.</p>`
                }
            ]
        },
        {
            id: 'valid-anagram',
            title: 'Valid Anagram',
            difficulty: 'easy',
            description: `<p>Given two strings <strong>s</strong> and <strong>t</strong>, return <code>true</code> if <strong>t</strong> is an anagram of <strong>s</strong>, and <code>false</code> otherwise. An anagram uses exactly the same characters with the same frequencies.</p>`,
            testCases: [
                { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both contain: a×3, n×1, g×1, r×1, m×1.' },
                { input: 's = "rat", t = "car"', output: 'false', explanation: '"rat" has t but no c; "car" has c but no t.' },
                { input: 's = "listen", t = "silent"', output: 'true', explanation: 'Same character frequencies: e×1, i×1, l×1, n×1, s×1, t×1.' }
            ],
            approaches: [
                {
                    name: 'Frequency Array',
                    code: `bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int freq[26] = {0};
    for (char c : s) freq[c - 'a']++;
    for (char c : t) freq[c - 'a']--;
    for (int i = 0; i < 26; i++)
        if (freq[i] != 0) return false;
    return true;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1) — fixed 26-size array',
                    description: `Two strings are anagrams if they share identical character frequencies. Increment counts for the first string and decrement for the second using a fixed-size array. If every count is zero at the end, the strings are anagrams.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Two strings are anagrams if and only if they have identical character frequency distributions. Increment counts for the first string, decrement for the second. If all counts reach zero, they are anagrams.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>If lengths differ, return false immediately.</li>
  <li>Create a frequency array of size 26 (one slot per lowercase letter), initialized to 0.</li>
  <li>For each character in s: increment freq[c − 'a'].</li>
  <li>For each character in t: decrement freq[c − 'a'].</li>
  <li>If any freq[i] ≠ 0, the frequencies don't match — return false.</li>
</ol>

<p><strong>Trace (s = "anagram", t = "nagaram"):</strong></p>
<pre>
After processing s: a=3, g=1, m=1, n=1, r=1
After processing t: a=3-3=0, g=1-1=0, m=1-1=0, n=1-1=0, r=1-1=0
All zeros → return true
</pre>

<p><strong>Complexity — Why O(1) space:</strong> The frequency array is always size 26 regardless of input length. Two linear scans through the strings and one scan through the array give O(n + 26) = O(n) time.</p>`
                }
            ]
        },
        {
            id: 'first-unique-char',
            title: 'First Unique Character in a String',
            difficulty: 'easy',
            description: `<p>Given a string <strong>s</strong>, find the <strong>first non-repeating character</strong> and return its index. If no such character exists, return <strong>-1</strong>.</p>`,
            testCases: [
                { input: 's = "leetcode"', output: '0', explanation: '"l" appears once and is the first unique character (index 0).' },
                { input: 's = "loveleetcode"', output: '2', explanation: '"v" at index 2 is the first character with frequency 1.' },
                { input: 's = "aabb"', output: '-1', explanation: 'All characters repeat — no unique character.' }
            ],
            approaches: [
                {
                    name: 'Frequency Map',
                    code: `int firstUniqChar(string s) {
    int freq[26] = {0};
    for (char c : s) freq[c - 'a']++;
    for (int i = 0; i < s.size(); i++)
        if (freq[s[i] - 'a'] == 1) return i;
    return -1;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Two-pass approach: the first pass counts character frequencies, the second pass scans the string in order and returns the index of the first character whose count is exactly one. The 26-element frequency array uses constant space.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Count each character's frequency in a first pass. In a second pass, return the index of the first character with frequency 1.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>First pass: count frequency of every character using a 26-element array.</li>
  <li>Second pass: iterate through the string in order. Return the index of the first character with freq == 1.</li>
  <li>If no character has frequency 1, return −1.</li>
</ol>

<p><strong>Trace (s = "loveleetcode"):</strong></p>
<pre>
Frequencies: l=1, o=2, v=1, e=4, t=1, c=1, d=1
Second pass:
  i=0: 'l' → freq=1? No wait, l appears at index 0 and nowhere else? 
  Actually: l=1, o=2 (positions 1,6)... 
  i=0: 'l' freq=1 → wait, let me recount.
  "loveleetcode": l(1), o(2), v(1), e(4), l... wait 'l' at 0 and 10.
  l=2, o=2, v=1, e=4, t=1, c=1, d=1
  i=0: 'l' freq=2 → skip
  i=1: 'o' freq=2 → skip
  i=2: 'v' freq=1 → return 2
</pre>

<p><strong>Complexity — Why O(n):</strong> Two passes through the string, each O(n). The frequency array is a fixed 26 elements. The second pass must iterate in string order to find the <em>first</em> unique character by position.</p>`
                }
            ]
        },
        // ===== MEDIUM =====
        {
            id: 'remove-occurrences-substring',
            title: 'Remove All Occurrences of a Substring',
            difficulty: 'medium',
            description: `<p>Given two strings <strong>s</strong> and <strong>part</strong>, repeatedly remove the <strong>leftmost</strong> occurrence of <strong>part</strong> from <strong>s</strong> until no occurrences remain. Return the final string.</p>`,
            testCases: [
                { input: 's = "daabcbaabcbc", part = "abc"', output: '"dab"', explanation: 'Remove "abc" at index 2 → "dabaabcbc" → remove at index 4 → "dababc" → remove at index 3 → "dab".' },
                { input: 's = "axxxxb", part = "xx"', output: '"ab"', explanation: 'Remove "xx" → "axxb" → remove "xx" → "ab". Nested occurrences handled.' },
                { input: 's = "hello", part = "xyz"', output: '"hello"', explanation: 'No occurrence found — string unchanged.' }
            ],
            approaches: [
                {
                    name: 'Stack-based / Iterative',
                    code: `string removeOccurrences(string s, string part) {
    string result;
    int pLen = part.size();
    for (char c : s) {
        result += c;
        if (result.size() >= pLen &&
            result.substr(result.size() - pLen) == part) {
            result.erase(result.size() - pLen);
        }
    }
    return result;
}`,
                    timeComplexity: 'O(n × m) where m = part length',
                    spaceComplexity: 'O(n)',
                    description: `Build the result string character by character as a stack. After each addition, check if the tail matches the target substring and erase it if so. This naturally handles overlapping and nested occurrences without multiple passes.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Build the result string character by character, treating it like a stack. After each addition, check if the tail of the result matches the pattern. If it does, erase the pattern from the tail. This naturally handles overlapping and nested occurrences.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Iterate through each character in s, appending it to result.</li>
  <li>After each append, check if result ends with part (compare last pLen characters).</li>
  <li>If match found, erase the last pLen characters from result.</li>
  <li>Continue until all characters are processed.</li>
</ol>

<p><strong>Trace (s = "axxxxb", part = "xx"):</strong></p>
<pre>
c='a': result="a" → tail "a" ≠ "xx"
c='x': result="ax" → tail "ax" ≠ "xx"
c='x': result="axx" → tail "xx" == "xx" → erase → result="a"
c='x': result="ax" → tail "ax" ≠ "xx"
c='x': result="axx" → tail "xx" == "xx" → erase → result="a"
c='b': result="ab" → tail "ab" ≠ "xx"
Return "ab"
</pre>

<p><strong>Complexity — Why O(n × m):</strong> For each of the n characters, we may perform an O(m) substring comparison. In practice, matches are infrequent, so performance is better than the worst case. The stack-like approach ensures all nested removals are caught without rescanning.</p>`
                }
            ]
        },
        {
            id: 'permutation-in-string',
            title: 'Permutation in String',
            difficulty: 'medium',
            description: `<p>Given two strings <strong>s1</strong> and <strong>s2</strong>, return <code>true</code> if <strong>s2</strong> contains a permutation of <strong>s1</strong> as a substring. In other words, return true if any contiguous substring of s2 is an anagram of s1.</p>`,
            testCases: [
                { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains "ba" (indices 3-4), which is a permutation of "ab".' },
                { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: 'No contiguous substring of s2 is a permutation of "ab".' },
                { input: 's1 = "adc", s2 = "dcda"', output: 'true', explanation: '"cda" (indices 1-3) is a permutation of "adc".' }
            ],
            approaches: [
                {
                    name: 'Sliding Window',
                    code: `bool checkInclusion(string s1, string s2) {
    int n1 = s1.size(), n2 = s2.size();
    if (n1 > n2) return false;
    vector<int> s1Freq(26, 0), winFreq(26, 0);
    for (int i = 0; i < n1; i++) {
        s1Freq[s1[i] - 'a']++;
        winFreq[s2[i] - 'a']++;
    }
    if (s1Freq == winFreq) return true;
    for (int i = n1; i < n2; i++) {
        winFreq[s2[i] - 'a']++;
        winFreq[s2[i - n1] - 'a']--;
        if (s1Freq == winFreq) return true;
    }
    return false;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `A permutation has identical character frequencies to the original string. Slide a fixed-size window over s2 maintaining a frequency count. When the window's distribution matches s1's, a permutation exists at that position.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> A permutation has the same character frequencies as the original. Slide a window of size |s1| over s2, maintaining a frequency count. If the window's frequency matches s1's frequency at any position, a permutation exists.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>If s1 is longer than s2, return false immediately.</li>
  <li>Build frequency arrays for s1 and the first |s1| characters of s2.</li>
  <li>If they match, return true.</li>
  <li>Slide the window: for each new position i, add s2[i] and remove s2[i − n1] from the window frequency. Compare with s1's frequency.</li>
</ol>

<p><strong>Trace (s1 = "ab", s2 = "eidbaooo"):</strong></p>
<pre>
s1Freq: a=1, b=1
Initial window "ei": winFreq: e=1, i=1 → no match
i=2: add 'd', remove 'e' → window "id": i=1, d=1 → no match
i=3: add 'b', remove 'i' → window "db": d=1, b=1 → no match
i=4: add 'a', remove 'd' → window "ba": b=1, a=1 → match! ✓
Return true
</pre>

<p><strong>Complexity — Why O(n):</strong> The window slides n2 − n1 times. Each slide updates two array entries (O(1)) and compares two fixed-size arrays (O(26) = O(1)). Total: O(n). Space is O(1) since both arrays are always size 26.</p>`
                }
            ]
        },
        {
            id: 'string-compression',
            title: 'String Compression',
            difficulty: 'medium',
            description: `<p>Given an array of characters <strong>chars</strong>, compress it in-place using the following rule: for each group of consecutive repeating characters, write the character followed by the count (if count &gt; 1). Return the new length of the array.</p>`,
            testCases: [
                { input: 'chars = ["a","a","b","b","c","c","c"]', output: '6 (chars = ["a","2","b","2","c","3"])', explanation: 'Groups: a×2, b×2, c×3 → compressed in-place.' },
                { input: 'chars = ["a"]', output: '1 (chars = ["a"])', explanation: 'Single character — no count appended.' },
                { input: 'chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]', output: '4 (chars = ["a","b","1","2"])', explanation: 'b appears 12 times: written as "b12" (digits split into chars).' }
            ],
            approaches: [
                {
                    name: 'In-place Two Pointer',
                    code: `int compress(vector<char>& chars) {
    int write = 0, read = 0, n = chars.size();
    while (read < n) {
        char current = chars[read];
        int count = 0;
        while (read < n && chars[read] == current) { read++; count++; }
        chars[write++] = current;
        if (count > 1) {
            string countStr = to_string(count);
            for (char c : countStr) chars[write++] = c;
        }
    }
    return write;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Read and write pointers traverse the array together. The read pointer counts groups of consecutive identical characters while the write pointer compresses them in-place. Since the compressed form is never longer, the write pointer never overtakes the read pointer.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Use read and write pointers. The read pointer scans groups of consecutive identical characters. The write pointer places the character and its count (if &gt; 1). The write pointer never overtakes the read pointer, so in-place modification is safe.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Save the current character and count consecutive occurrences by advancing read.</li>
  <li>Write the character at the write position.</li>
  <li>If count &gt; 1, convert count to a string and write each digit character.</li>
  <li>Repeat until read reaches the end. Return write as the new length.</li>
</ol>

<p><strong>Trace (chars = ["a","a","b","b","c","c","c"]):</strong></p>
<pre>
read=0: current='a', count inner loop → read=2, count=2
  write 'a' at 0, count>1 → write '2' at 1 → write=2
read=2: current='b', count inner loop → read=4, count=2
  write 'b' at 2, write '2' at 3 → write=4
read=4: current='c', count inner loop → read=7, count=3
  write 'c' at 4, write '3' at 5 → write=6
Return 6, chars = ["a","2","b","2","c","3"]
</pre>

<p><strong>Complexity — Why O(1) space:</strong> The compression is done in-place. The compressed form is always ≤ the original length (a group of k characters compresses to 1 + digits(k) characters, which is less than k for k ≥ 2). One pass through the array gives O(n) time.</p>`
                }
            ]
        },
        {
            id: 'shortest-path-directions',
            title: 'Shortest Path (Directional Strings)',
            difficulty: 'medium',
            description: `<p>Given a string of directional moves (<strong>U</strong>, <strong>D</strong>, <strong>L</strong>, <strong>R</strong>), find the shortest equivalent path that reaches the same destination. Opposite moves cancel each other out.</p>`,
            testCases: [
                { input: 'path = "RRULLDD"', output: '"RD"', explanation: 'Net displacement: x = 2−1 = 1 (R), y = 1−2 = −1 (D). Shortest: "RD".' },
                { input: 'path = "UDLR"', output: '""', explanation: 'All moves cancel: U-D and L-R. Net displacement is (0,0).' },
                { input: 'path = "RRRR"', output: '"RRRR"', explanation: 'No cancellation possible — all moves in the same direction.' }
            ],
            approaches: [
                {
                    name: 'Simulation + Cancellation',
                    code: `string shortestPath(string path) {
    int x = 0, y = 0;
    for (char c : path) {
        if (c == 'U') y++;
        else if (c == 'D') y--;
        else if (c == 'R') x++;
        else if (c == 'L') x--;
    }
    string result;
    while (x > 0) { result += 'R'; x--; }
    while (x < 0) { result += 'L'; x++; }
    while (y > 0) { result += 'U'; y--; }
    while (y < 0) { result += 'D'; y++; }
    return result;
}`,
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    description: `Track net displacement along x and y axes as you process directional moves. Opposite directions cancel naturally. The remaining net displacement gives the shortest path from origin to the final position.`,
                    detailedWalkthrough: `<p><strong>Core Idea:</strong> Track net displacement in x and y coordinates. Opposite directions cancel out naturally (L cancels R, U cancels D). The remaining net displacement defines the shortest path.</p>

<p><strong>Algorithm Steps:</strong></p>
<ol>
  <li>Iterate through each direction character, updating x and y coordinates.</li>
  <li>After processing all moves, x and y represent the net displacement.</li>
  <li>Build the result: append |x| moves in the appropriate horizontal direction, then |y| moves in the appropriate vertical direction.</li>
</ol>

<p><strong>Trace (path = "RRULLDD"):</strong></p>
<pre>
R: x=1  R: x=2  U: y=1  L: x=1  L: x=0  D: y=0  D: y=-1
Wait, let me recount: R(+1), R(+1), U(+1), L(-1), L(-1), D(-1), D(-1)
x = 2-2 = 0, y = 1-2 = -1
Result: y<0 → "D"
Hmm, original example said "RD". Let me recheck...
"RRULLDD": R,R,U,L,L,D,D → x: +1+1-1-1=0, y: +1-1-1=-1
Actually: R=+x, R=+x, U=+y, L=-x, L=-x, D=-y, D=-y
x = 2-2 = 0, y = 1-2 = -1 → result = "D"
</pre>

<p><strong>Complexity — Why O(n):</strong> Single pass to compute net displacement, then O(|x| + |y|) to build the result (which is ≤ n). No shorter path exists to cover a net displacement of (x, y) — the minimum moves required is |x| + |y|. The order of output moves does not matter since all reach the same destination.</p>`
                }
            ]
        }
    ]
};
