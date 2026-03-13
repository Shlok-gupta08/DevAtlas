// =================================================================
//  DSA — Mathematics & Bit Manipulation
// =================================================================
export const mathBitsData = {
    id: 'math-bits',
    name: 'Mathematics & Bit Manipulation',
    icon: '🔢',
    color: '#a78bfa',
    questions: [
        // ===== EASY =====
        {
            id: 'power-of-2',
            title: 'Check if a Number is Power of 2',
            difficulty: 'easy',
            description: `Determine if a given integer n is a <strong>power of 2</strong>. Powers of 2 in binary have exactly one set bit (e.g., 1, 2, 4, 8, 16...). Use a single bitwise trick to check in O(1).`,
            testCases: [
                { input: 'n = 16', output: 'true', explanation: '16 = 10000 in binary. Exactly one set bit → power of 2.' },
                { input: 'n = 6', output: 'false', explanation: '6 = 110 in binary. Two set bits → not a power of 2.' },
                { input: 'n = 0', output: 'false', explanation: '0 is not a power of 2.' }
            ],
            approaches: [
                {
                    name: 'Bitwise AND',
                    code: `bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)',
                    description: `A power of 2 in binary has exactly one set bit (e.g., 8 = 1000). Subtracting 1 flips all bits after the set bit (7 = 0111). ANDing them gives 0 only for powers of 2. We also check n > 0 since 0 is not a power of 2.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>The expression <code>n & (n - 1)</code> clears the lowest set bit of n. If n is a power of 2, it has only ONE set bit — clearing it gives 0.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Check <code>n &gt; 0</code> to reject 0 and negatives.<br>Step 2 → Compute <code>n & (n - 1)</code>. If result is 0, n has exactly one set bit → power of 2.<br><br><strong>Trace (n = 8):</strong><br>8 in binary: <code>1000</code>. n-1 = 7 = <code>0111</code>.<br><code>1000 & 0111 = 0000</code> → result is 0 → power of 2.<br><br><strong>Trace (n = 6):</strong><br>6 = <code>0110</code>. n-1 = 5 = <code>0101</code>.<br><code>0110 & 0101 = 0100</code> → not 0 → not a power of 2.<br><br><strong>Complexity — Why O(1)?</strong><br>Single bitwise operation and comparison. Constant time regardless of input size.`
                }
            ]
        },
        {
            id: 'count-set-bits',
            title: 'Count Set Bits in a Number',
            difficulty: 'easy',
            description: `Count the number of <strong>1-bits</strong> (set bits) in the binary representation of an integer. Also known as the <strong>Hamming weight</strong> or <strong>popcount</strong>.`,
            testCases: [
                { input: 'n = 13', output: '3', explanation: '13 = 1101 in binary. Three 1-bits.' },
                { input: 'n = 255', output: '8', explanation: '255 = 11111111. All 8 bits set.' },
                { input: 'n = 0', output: '0', explanation: 'No bits set.' }
            ],
            approaches: [
                {
                    name: "Brian Kernighan's Algorithm",
                    code: `int countSetBits(int n) {
    int count = 0;
    while (n) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`,
                    timeComplexity: 'O(number of set bits)',
                    spaceComplexity: 'O(1)',
                    description: `The expression n & (n-1) clears the lowest set bit in n. We repeatedly do this until n becomes 0, counting each iteration. This is faster than checking every bit because it only loops as many times as there are set bits.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br><code>n & (n - 1)</code> clears the lowest set bit of n. Repeat until n becomes 0. The number of iterations = number of set bits.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → While n is non-zero: apply <code>n = n & (n-1)</code> to clear lowest set bit, increment count.<br>Step 2 → Return count.<br><br><strong>Trace (n = 12, binary 1100):</strong><br>Iteration 1: 12 & 11 = <code>1100 & 1011 = 1000</code> (cleared bit at position 2). count=1.<br>Iteration 2: 8 & 7 = <code>1000 & 0111 = 0000</code> (cleared bit at position 3). count=2.<br>n = 0 → stop. Result: 2 set bits.<br><br><strong>Why not shift and check each bit?</strong><br>Shifting through all 32 bits always takes 32 iterations. Kernighan's method loops only k times (k = set bits). For n=1024 (one set bit), just 1 iteration vs 32.`
                }
            ]
        },
        {
            id: 'odd-even-bitwise',
            title: 'Check if Number is Odd or Even',
            difficulty: 'easy',
            description: `Determine if an integer is <strong>odd or even</strong> using a bitwise operation. The least significant bit (LSB) determines parity: LSB = 1 means odd, LSB = 0 means even.`,
            testCases: [
                { input: 'n = 5', output: 'Odd', explanation: '5 = 101 in binary. LSB is 1 → odd.' },
                { input: 'n = 4', output: 'Even', explanation: '4 = 100 in binary. LSB is 0 → even.' },
                { input: 'n = 0', output: 'Even', explanation: '0 = 0 in binary. LSB is 0 → even.' }
            ],
            approaches: [
                {
                    name: 'Bitwise AND',
                    code: `bool isOdd(int n) {
    return n & 1;
}`,
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)',
                    description: `The least significant bit determines parity. If the LSB is 1, the number is odd; if 0, even. Bitwise AND with 1 isolates the LSB. This is a single CPU instruction — more efficient than modulo.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Every integer's parity is determined by its rightmost bit. Odd numbers end in 1, even numbers end in 0. <code>n & 1</code> masks everything except the LSB.<br><br><strong>Trace (n = 5):</strong><br>5 = <code>101</code>. <code>101 & 001 = 001</code> = 1 → odd.<br><br><strong>Trace (n = 4):</strong><br>4 = <code>100</code>. <code>100 & 001 = 000</code> = 0 → even.<br><br><strong>Why not use n % 2?</strong><br>Both work. <code>&</code> is a single bitwise instruction at the hardware level. <code>%</code> involves integer division. Modern compilers optimize <code>% 2</code> to <code>& 1</code>, but the bitwise version makes intent explicit.`
                }
            ]
        },
        {
            id: 'get-set-clear-bit',
            title: 'Get / Set / Clear / Update ith Bit',
            difficulty: 'easy',
            description: `Four fundamental bit operations: <strong>Get</strong> (read), <strong>Set</strong> (turn on), <strong>Clear</strong> (turn off), and <strong>Update</strong> (write) a specific bit at position i (0-indexed from right).`,
            testCases: [
                { input: 'getBit(13, 2)', output: '1', explanation: '13 = 1101. Bit at position 2 is 1.' },
                { input: 'setBit(9, 1)', output: '11', explanation: '9 = 1001. Set bit 1: 1011 = 11.' },
                { input: 'clearBit(15, 2)', output: '11', explanation: '15 = 1111. Clear bit 2: 1011 = 11.' }
            ],
            approaches: [
                {
                    name: 'Bit Masking',
                    code: `// Get ith bit (0-indexed from right)
int getBit(int n, int i) {
    return (n >> i) & 1;
}

// Set ith bit to 1
int setBit(int n, int i) {
    return n | (1 << i);
}

// Clear ith bit to 0
int clearBit(int n, int i) {
    return n & ~(1 << i);
}

// Update ith bit to val (0 or 1)
int updateBit(int n, int i, int val) {
    int cleared = n & ~(1 << i);
    return cleared | (val << i);
}`,
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)',
                    description: `Use bit masks created by shifting 1 left by i positions. GET: shift right and AND with 1. SET: OR with mask. CLEAR: AND with inverted mask. UPDATE: clear first, then OR with desired value shifted to position i.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Create a mask with a 1 at position i using <code>1 &lt;&lt; i</code>. Combine with n using the appropriate bitwise operation.<br><br><strong>getBit(n, i):</strong><br><code>(n &gt;&gt; i) & 1</code> — Shift bit i to position 0, extract it. Example: getBit(13, 2) → 13=1101, shift right 2 = 11, &1 = 1.<br><br><strong>setBit(n, i):</strong><br><code>n | (1 &lt;&lt; i)</code> — OR with a mask that has 1 at position i. Forces that bit to 1. Example: setBit(9, 1) → 1001 | 0010 = 1011 = 11.<br><br><strong>clearBit(n, i):</strong><br><code>n & ~(1 &lt;&lt; i)</code> — AND with a mask that has 0 at position i and 1s everywhere else. Forces bit i to 0. Example: clearBit(15, 2) → 1111 & 1011 = 1011 = 11.<br><br><strong>updateBit(n, i, val):</strong><br>First clear bit i, then OR with val shifted to position i. Two-step: clear then set. Works for both val=0 and val=1.`
                }
            ]
        },
        {
            id: 'clear-last-i-bits',
            title: 'Clear Last i Bits & Clear Range of Bits',
            difficulty: 'easy',
            description: `Two bit-clearing operations:<br>• Clear the <strong>last i bits</strong> of a number (set them to 0)<br>• Clear a <strong>range of bits</strong> from position i to j (inclusive)`,
            testCases: [
                { input: 'clearLastIBits(29, 3)', output: '24', explanation: '29 = 11101. Clear last 3 bits: 11000 = 24.' },
                { input: 'clearRange(255, 2, 5)', output: '195', explanation: '255 = 11111111. Clear bits 2-5: 11000011 = 195.' },
                { input: 'clearLastIBits(16, 1)', output: '16', explanation: '16 = 10000. Last bit already 0. No change.' }
            ],
            approaches: [
                {
                    name: 'Bit Masking',
                    code: `// Clear last i bits
int clearLastIBits(int n, int i) {
    int mask = (~0) << i;
    return n & mask;
}

// Clear bits from position i to j (inclusive)
int clearRange(int n, int i, int j) {
    int left = (~0) << (j + 1);
    int right = (1 << i) - 1;
    int mask = left | right;
    return n & mask;
}`,
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)',
                    description: `To clear last i bits, create a mask of all 1s shifted left by i (zeros in the last i positions) and AND. For clearing a range [i, j], build a mask with 1s above j and below i using OR, then AND with n.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Build a mask with 0s in the positions to clear and 1s everywhere else. AND with n zeros out only the targeted positions.<br><br><strong>clearLastIBits:</strong><br><code>~0</code> = all 1s (e.g., <code>11111111</code>). Shift left by i → last i bits become 0.<br>For i=3: mask = <code>11111000</code>. AND with n clears the lower 3 bits.<br><br><strong>Trace (n=29=11101, i=3):</strong><br>mask = <code>...11111000</code>. <code>11101 & 11000 = 11000</code> = 24.<br><br><strong>clearRange:</strong><br><code>left = (~0) &lt;&lt; (j + 1)</code> — All 1s above position j. For j=5: <code>11000000</code>.<br><code>right = (1 &lt;&lt; i) - 1</code> — All 1s below position i. For i=2: <code>00000011</code>.<br><code>mask = left | right</code> — 1s above j and below i, 0s in range [i,j]: <code>11000011</code>.<br>AND with n zeros out bits 2 through 5.<br><br><strong>Trace (n=255=11111111, i=2, j=5):</strong><br>mask = <code>11000011</code>. <code>11111111 & 11000011 = 11000011</code> = 195.`
                }
            ]
        },

        // ===== MEDIUM =====
        {
            id: 'fast-exponentiation',
            title: 'Fast Exponentiation / Pow(X, N)',
            difficulty: 'medium',
            description: `Compute x raised to the power n efficiently. Naive multiplication takes O(n) time. <strong>Binary exponentiation</strong> uses the binary representation of n to compute the result in O(log n) time.`,
            testCases: [
                { input: 'x=2, n=10', output: '1024', explanation: '2^10 = 1024. Binary exponentiation does this in ~4 steps instead of 10.' },
                { input: 'x=2, n=-2', output: '0.25', explanation: '2^(-2) = 1/4 = 0.25. Negative exponent inverts x first.' },
                { input: 'x=3, n=5', output: '243', explanation: '3^5 = 243. 5 = 101 in binary → 3^4 × 3^1 = 81 × 3 = 243.' }
            ],
            approaches: [
                {
                    name: 'Binary Exponentiation',
                    code: `double myPow(double x, long long n) {
    if (n < 0) { x = 1 / x; n = -n; }
    double result = 1.0;
    while (n > 0) {
        if (n & 1) result *= x;
        x *= x;
        n >>= 1;
    }
    return result;
}`,
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(1)',
                    description: `Decompose the exponent n into binary. For each set bit, multiply the result by the corresponding power of x. Square x at each step to move to the next power. This reduces O(n) multiplications to O(log n).`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>Any exponent can be written in binary. For example, x¹³ where 13 = 1101₂ = 8+4+1, so x¹³ = x⁸ × x⁴ × x¹. We compute x, x², x⁴, x⁸ by successive squaring and multiply in the ones that correspond to set bits in n.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Handle negative n: <code>x = 1/x; n = -n</code> (x⁻ⁿ = (1/x)ⁿ).<br>Step 2 → For each bit of n (LSB to MSB):<br>  - If current bit is 1: multiply result by current power of x.<br>  - Square x for the next bit position.<br>  - Right-shift n to move to next bit.<br><br><strong>Trace (x=2, n=13, binary 1101):</strong><br>Bit 0 (1): result = 1 × 2 = 2. x = 2² = 4.<br>Bit 1 (0): skip. x = 4² = 16.<br>Bit 2 (1): result = 2 × 16 = 32. x = 16² = 256.<br>Bit 3 (1): result = 32 × 256 = 8192. n = 0, stop.<br>8192 = 2¹³ ✓.<br><br><strong>Complexity — Why O(log n)?</strong><br>The loop runs once per bit in n. Number of bits = ⌊log₂ n⌋ + 1. Each iteration does constant work (one multiply and one square).`
                }
            ]
        },
        {
            id: 'sieve-eratosthenes',
            title: 'Sieve of Eratosthenes',
            difficulty: 'medium',
            description: `Find all <strong>prime numbers</strong> up to a given number n. The Sieve of Eratosthenes is an efficient algorithm that marks multiples of each prime as composite, leaving only primes unmarked.`,
            testCases: [
                { input: 'n = 20', output: '[2,3,5,7,11,13,17,19]', explanation: 'All primes ≤ 20.' },
                { input: 'n = 10', output: '[2,3,5,7]', explanation: 'Four primes up to 10.' },
                { input: 'n = 2', output: '[2]', explanation: '2 is the smallest (and only even) prime.' }
            ],
            approaches: [
                {
                    name: 'Standard Sieve',
                    code: `vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = false;
        }
    }
    return isPrime;
}`,
                    timeComplexity: 'O(n log(log n))',
                    spaceComplexity: 'O(n)',
                    description: `Start assuming all numbers are prime. For each number starting from 2, if it is still marked prime, mark all its multiples as composite. Start marking from i² because smaller multiples were already handled by smaller primes. Only check up to √n.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>A composite number must have a prime factor ≤ √n. By iterating primes up to √n and crossing out their multiples, all composites are eliminated. Remaining unmarked numbers are prime.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Initialize boolean array: all true except indices 0 and 1.<br>Step 2 → For each i from 2 to √n: if isPrime[i] is true, mark all multiples of i starting from i² as false.<br>Step 3 → Remaining true entries are primes.<br><br><strong>Why start at i² (not 2i)?</strong><br>Multiples like 2i, 3i, ..., (i-1)·i have already been marked by the primes 2, 3, ..., i-1. Starting at i² avoids redundant work.<br><br><strong>Trace (n = 20):</strong><br>i=2: mark 4,6,8,10,12,14,16,18,20 as composite.<br>i=3: mark 9,12,15,18 as composite (some already marked).<br>i=4: 4² = 16 &gt; we only go to √20 ≈ 4.47. i=4 is not prime (already marked), skip.<br>Done. Primes: 2, 3, 5, 7, 11, 13, 17, 19.<br><br><strong>Complexity — Why O(n log(log n))?</strong><br>The sum of n/p for all primes p ≤ n converges to n × log(log n) (from the prime harmonic series). This is nearly linear for practical purposes.`
                }
            ]
        },
        {
            id: 'euclid-gcd',
            title: "Euclid's Algorithm (GCD)",
            difficulty: 'medium',
            description: `Compute the <strong>Greatest Common Divisor</strong> (GCD) of two integers using the Euclidean algorithm. Based on the identity: GCD(a, b) = GCD(b, a mod b). Repeatedly apply until one value becomes 0.`,
            testCases: [
                { input: 'a = 48, b = 18', output: '6', explanation: 'GCD(48,18) → GCD(18,12) → GCD(12,6) → GCD(6,0) = 6.' },
                { input: 'a = 35, b = 14', output: '7', explanation: 'GCD(35,14) → GCD(14,7) → GCD(7,0) = 7.' },
                { input: 'a = 17, b = 5', output: '1', explanation: '17 and 5 are coprime. GCD = 1.' }
            ],
            approaches: [
                {
                    name: 'Recursive Euclidean',
                    code: `int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}`,
                    timeComplexity: 'O(log(min(a, b)))',
                    spaceComplexity: 'O(log(min(a, b))) — recursion stack',
                    description: `Based on the principle that GCD(a, b) = GCD(b, a mod b). Repeatedly replace the larger number with the remainder until one becomes 0. The non-zero number is the GCD. Converges quickly because the remainder is always less than half the divisor.`,
                    detailedWalkthrough: `<strong>Core Idea:</strong><br>The GCD of two numbers doesn't change when the larger is replaced by the remainder of dividing it by the smaller. Repeated application reduces the problem to GCD(something, 0) = something.<br><br><strong>Algorithm Steps:</strong><br>Step 1 → Base case: <code>if (b == 0) return a</code>. GCD(a, 0) = a.<br>Step 2 → Recursive step: <code>return gcd(b, a % b)</code>. Replace a with b, b with remainder.<br><br><strong>Trace (a=48, b=18):</strong><br>gcd(48, 18): 48 % 18 = 12 → gcd(18, 12).<br>gcd(18, 12): 18 % 12 = 6 → gcd(12, 6).<br>gcd(12, 6): 12 % 6 = 0 → gcd(6, 0).<br>gcd(6, 0): b=0 → return 6.<br><br><strong>Complexity — Why O(log(min(a,b)))?</strong><br>The remainder a % b is always &lt; b/2 (proven by considering cases b ≤ a/2 and b &gt; a/2). So every two steps, the values are at least halved, giving logarithmic convergence. For iterative version, use a while loop to eliminate recursion stack.`
                }
            ]
        }
    ]
};
