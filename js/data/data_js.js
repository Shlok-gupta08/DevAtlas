// =================================================================
//  JAVASCRIPT REFERENCE DATA
//  Exhaustive reference — from absolute basics to rare edge cases
// =================================================================
window.DevAtlasData = window.DevAtlasData || {};
window.DevAtlasData.javascript = {
    name: 'JavaScript',
    desc: 'The language of the web. Master closures, the event loop, async patterns, proxies, generators, and the weird parts.',
    sections: [
        // -------------------------------------------------------
        //  0. ABSOLUTE BASICS
        // -------------------------------------------------------
        {
            id: 'basics',
            title: '0. Absolute Basics',
            desc: 'Variables, types, operators, and the fundamentals every JS developer must know.',
            cards: [
                {
                    title: 'Variables: var vs let vs const',
                    body: `
<table class="styled-table">
<thead><tr><th>Feature</th><th><code>var</code></th><th><code>let</code></th><th><code>const</code></th></tr></thead>
<tbody>
<tr><td>Scope</td><td>Function</td><td>Block</td><td>Block</td></tr>
<tr><td>Hoisted?</td><td>Yes (initialized as <code>undefined</code>)</td><td>Yes (but in TDZ — can't access)</td><td>Yes (but in TDZ)</td></tr>
<tr><td>Re-declarable?</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td>Re-assignable?</td><td>Yes</td><td>Yes</td><td>No (but objects are mutable!)</td></tr>
</tbody>
</table>
${codeBlock('javascript', `// var is function-scoped (leaks out of blocks!)
if (true) { var x = 10; }
console.log(x); // 10 — still accessible!

// let/const are block-scoped
if (true) { let y = 10; }
// console.log(y); // ReferenceError: y is not defined

// const prevents reassignment, NOT mutation
const arr = [1, 2, 3];
arr.push(4);      // ✅ This works — mutating the array
// arr = [5, 6];  // ❌ TypeError — can't reassign

const obj = { name: 'Alice' };
obj.name = 'Bob'; // ✅ This works — mutating the object
// obj = {};      // ❌ TypeError

// TDZ (Temporal Dead Zone)
// console.log(a); // ReferenceError — 'a' is in TDZ
let a = 5;
// The variable exists but is not accessible until declaration`)}
`
                },
                {
                    title: 'Data Types & Type Coercion',
                    body: `
${codeBlock('javascript', `// 7 Primitive types + 1 Object type
typeof 42;          // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object"   ← FAMOUS BUG (can't be fixed, would break the web)
typeof Symbol();    // "symbol"
typeof 42n;         // "bigint"
typeof {};          // "object"
typeof [];          // "object"   ← Arrays are objects!
typeof function(){};// "function" ← Functions are objects too, but typeof is special

// Check for arrays properly
Array.isArray([1,2,3]); // true

// Type coercion quirks
"5" + 3;      // "53"    — string wins, concatenation
"5" - 3;      // 2       — minus forces numeric conversion
"5" * "3";    // 15
true + true;  // 2
[] + [];       // ""      — both coerce to empty string
[] + {};       // "[object Object]"
{} + [];       // 0       — {} is parsed as empty block, not object!

// Equality gotchas
0 == "";       // true   — both coerce to 0
0 == false;    // true
"" == false;   // true
null == undefined; // true
null === undefined; // false
NaN === NaN;   // false  — NaN is not equal to ANYTHING, including itself
Number.isNaN(NaN); // true — the correct way to check

// ALWAYS use === (strict equality) to avoid coercion bugs`)}
`
                },
                {
                    title: 'Functions: All Declaration Styles',
                    body: `
${codeBlock('javascript', `// 1. Function Declaration (hoisted — can be called before definition)
greet(); // Works!
function greet() { return "Hello!"; }

// 2. Function Expression (NOT hoisted)
// sayHi(); // TypeError: sayHi is not a function
const sayHi = function() { return "Hi!"; };

// 3. Arrow Function (concise, no own 'this')
const add = (a, b) => a + b;         // Implicit return
const square = x => x * x;           // Single param: no parens needed
const getObj = () => ({ key: 'val' }); // Return object: wrap in parens

// 4. Immediately Invoked Function Expression (IIFE)
(function() {
    const secret = 42;
    // Variables here don't pollute global scope
})();

// 5. Generator Function (can pause and resume)
function* counter() {
    yield 1;
    yield 2;
    yield 3;
}

// 6. Async Function
async function fetchData() {
    const res = await fetch('/api/data');
    return res.json();
}

// Default parameters
function greet(name = 'World', greeting = 'Hello') {
    return \`\${greeting}, \${name}!\`;
}

// Rest parameters (collects remaining args into an array)
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Destructured parameters
function createUser({ name, age, role = 'user' }) {
    return { name, age, role };
}
createUser({ name: 'Alice', age: 30 });`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  1. HOISTING & SCOPE
        // -------------------------------------------------------
        {
            id: 'hoisting',
            title: '1. Hoisting & Scope',
            desc: 'How JavaScript hoists declarations and how scope chains work.',
            cards: [
                {
                    title: 'Hoisting Deep Dive',
                    body: `
<p>JavaScript doesn't "move" code to the top. During the <strong>creation phase</strong>, the engine scans for declarations and allocates memory. During the <strong>execution phase</strong>, it runs the code line by line.</p>
${codeBlock('javascript', `// What you write:
console.log(a); // undefined (not an error!)
console.log(b); // ReferenceError: Cannot access 'b' before initialization
console.log(c); // ReferenceError: Cannot access 'c' before initialization

var a = 1;
let b = 2;
const c = 3;

// How the engine sees it (conceptually):
var a;            // hoisted, initialized to undefined
// let b;         // hoisted, but in TDZ (Temporal Dead Zone)
// const c;       // hoisted, but in TDZ

console.log(a);   // undefined
// console.log(b); // TDZ error
// console.log(c); // TDZ error

a = 1;
b = 2;
c = 3;

// Function declarations are FULLY hoisted (including body):
sayHello(); // "Hello!" — works!
function sayHello() { console.log("Hello!"); }

// Function EXPRESSIONS are NOT:
// sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); };

// Class declarations are hoisted but in TDZ (like let/const):
// const dog = new Animal(); // ReferenceError
class Animal { }
const dog = new Animal(); // Works`)}
`
                },
                {
                    title: 'Scope Chain & Closures',
                    body: `
<p>A <strong>closure</strong> is a function that "remembers" the variables from its outer scope even after the outer function has returned. This is the single most important concept in JavaScript.</p>
${codeBlock('javascript', `// Closure basics
function outer() {
    let count = 0;
    return function inner() {
        count++;
        return count;
    };
}
const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
// 'count' is not accessible from outside, but inner() still has access!

// Practical: Creating private variables
function createBankAccount(initial) {
    let balance = initial; // private — not accessible outside
    return {
        deposit(amount) { balance += amount; return balance; },
        withdraw(amount) {
            if (amount > balance) throw new Error('Insufficient funds');
            balance -= amount;
            return balance;
        },
        getBalance() { return balance; }
    };
}
const account = createBankAccount(100);
account.deposit(50);     // 150
account.getBalance();    // 150
// account.balance;      // undefined — truly private!

// THE CLASSIC CLOSURE BUG (var in loops)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 (NOT 0, 1, 2)
// Because var is function-scoped, all callbacks share the same 'i'

// FIX 1: Use let (block-scoped — each iteration gets its own 'i')
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2

// FIX 2: Use IIFE to capture value
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);
    })(i);
}`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  2. THE 'THIS' KEYWORD
        // -------------------------------------------------------
        {
            id: 'this',
            title: '2. The "this" Keyword',
            desc: 'The most confusing keyword in JavaScript. Here is exactly how it works.',
            cards: [
                {
                    title: 'this Binding Rules (in order of precedence)',
                    body: `
${codeBlock('javascript', `// RULE 1: "new" binding — this = the new object
function Person(name) {
    this.name = name;
}
const alice = new Person('Alice');
console.log(alice.name); // 'Alice'

// RULE 2: Explicit binding — call, apply, bind
function greet() { return \`Hello, \${this.name}\`; }
const obj = { name: 'Bob' };

greet.call(obj);          // "Hello, Bob"
greet.apply(obj);         // "Hello, Bob"
const bound = greet.bind(obj);
bound();                  // "Hello, Bob"

// call vs apply: call takes args individually, apply takes an array
function sum(a, b) { return this.base + a + b; }
sum.call({ base: 10 }, 1, 2);    // 13
sum.apply({ base: 10 }, [1, 2]); // 13

// RULE 3: Implicit binding — this = the object calling the method
const user = {
    name: 'Charlie',
    greet() { return \`Hi, I'm \${this.name}\`; }
};
user.greet(); // "Hi, I'm Charlie"

// THE TRAP: Losing implicit binding
const fn = user.greet; // Extracting the method
fn(); // "Hi, I'm undefined" — 'this' is now global/undefined!
// FIX: const fn = user.greet.bind(user);

// RULE 4: Default binding — global object (or undefined in strict mode)
function whoAmI() { console.log(this); }
whoAmI(); // Window (browser) or global (Node) — undefined in strict mode

// ARROW FUNCTIONS: NO own 'this' — they inherit from enclosing scope
const team = {
    name: 'DevTeam',
    members: ['Alice', 'Bob'],
    printMembers() {
        // Arrow function inherits 'this' from printMembers
        this.members.forEach(m => {
            console.log(\`\${m} is on \${this.name}\`); // Works!
        });
    }
};

// If we used a regular function:
// this.members.forEach(function(m) {
//     console.log(this.name); // undefined — regular function has own 'this'
// });`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  3. EVENT LOOP & ASYNC
        // -------------------------------------------------------
        {
            id: 'event-loop',
            title: '3. Event Loop & Async',
            desc: 'Micro-tasks, macro-tasks, Promises, async/await, and execution order.',
            cards: [
                {
                    title: 'The Event Loop Explained',
                    body: `
<p>JavaScript is <strong>single-threaded</strong> but can handle async operations through the <strong>event loop</strong>. Understanding the execution order is critical.</p>
<ol>
    <li><strong>Call Stack</strong> — Executes synchronous code one frame at a time.</li>
    <li><strong>Microtask Queue</strong> — Promises (<code>.then</code>), <code>queueMicrotask()</code>, <code>MutationObserver</code>. Drained completely after each task.</li>
    <li><strong>Macrotask Queue</strong> — <code>setTimeout</code>, <code>setInterval</code>, I/O, UI rendering. One task per loop iteration.</li>
</ol>
${codeBlock('javascript', `// QUIZ: What order does this print?
console.log('1 - sync');

setTimeout(() => console.log('2 - setTimeout'), 0);

Promise.resolve().then(() => console.log('3 - microtask'));

queueMicrotask(() => console.log('4 - queueMicrotask'));

console.log('5 - sync');

// OUTPUT:
// 1 - sync
// 5 - sync
// 3 - microtask
// 4 - queueMicrotask
// 2 - setTimeout

// WHY:
// 1. Synchronous code runs first (1, 5)
// 2. Microtask queue drains BEFORE the next macrotask (3, 4)
// 3. setTimeout is a macrotask — runs last (2)

// More complex example:
setTimeout(() => {
    console.log('A');
    Promise.resolve().then(() => console.log('B'));
}, 0);

setTimeout(() => console.log('C'), 0);

Promise.resolve().then(() => {
    console.log('D');
    setTimeout(() => console.log('E'), 0);
});

// Output: D, A, B, C, E
// D runs first (microtask from main script)
// A runs (first setTimeout macrotask)
// B runs (microtask queued during A)
// C runs (second setTimeout macrotask)
// E runs (setTimeout queued during D)`)}
`
                },
                {
                    title: 'Promises In-Depth',
                    body: `
${codeBlock('javascript', `// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    // Async operation...
    const success = true;
    if (success) {
        resolve('Data loaded!');
    } else {
        reject(new Error('Failed to load'));
    }
});

// Consuming Promises
myPromise
    .then(data => {
        console.log(data);
        return 'Processed: ' + data; // Return value becomes next .then's input
    })
    .then(processed => console.log(processed))
    .catch(err => console.error(err))  // Catches ANY error in the chain
    .finally(() => console.log('Done'));  // Always runs

// Promise.all — wait for ALL (fails fast on first rejection)
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
]);

// Promise.allSettled — wait for ALL, never rejects
const results = await Promise.allSettled([
    fetch('/api/a'), fetch('/api/b'), fetch('/api/c')
]);
results.forEach(r => {
    if (r.status === 'fulfilled') console.log(r.value);
    if (r.status === 'rejected')  console.error(r.reason);
});

// Promise.race — first to settle (resolve OR reject) wins
const result = await Promise.race([
    fetch('/api/fast'),
    new Promise((_, reject) => setTimeout(() => reject('Timeout'), 5000))
]);

// Promise.any — first to RESOLVE wins (ignores rejections)
const fastest = await Promise.any([
    fetch('https://cdn1.example.com/data'),
    fetch('https://cdn2.example.com/data'),
    fetch('https://cdn3.example.com/data'),
]);`)}
`
                },
                {
                    title: 'Async/Await Patterns',
                    body: `
${codeBlock('javascript', `// Basic async/await
async function getUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        return await response.json();
    } catch (error) {
        console.error('Failed:', error.message);
        return null;
    }
}

// Parallel execution (DON'T await sequentially if independent)
// ❌ SLOW: Sequential (total = time_a + time_b)
const a = await fetchA();
const b = await fetchB();

// ✅ FAST: Parallel (total = max(time_a, time_b))
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// Async iteration (for await...of)
async function* fetchPages() {
    let page = 1;
    while (true) {
        const resp = await fetch(\`/api/items?page=\${page}\`);
        const data = await resp.json();
        if (data.length === 0) return;
        yield data;
        page++;
    }
}
for await (const pageData of fetchPages()) {
    processPage(pageData);
}

// Top-level await (in ES modules)
const config = await fetch('/config.json').then(r => r.json());

// Error handling patterns
async function resilientFetch(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`);
            return await resp.json();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential backoff
        }
    }
}`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  4. PROTOTYPES & CLASSES
        // -------------------------------------------------------
        {
            id: 'prototypes',
            title: '4. Prototypes & Classes',
            desc: 'How JavaScript inheritance actually works under the hood.',
            cards: [
                {
                    title: 'Prototypal Inheritance',
                    body: `
${codeBlock('javascript', `// Every object has a hidden [[Prototype]] link
const animal = {
    type: 'animal',
    speak() { return \`I am a \${this.type}\`; }
};

// Object.create() — create object with specified prototype
const dog = Object.create(animal);
dog.type = 'dog';
dog.bark = function() { return 'Woof!'; };

dog.speak(); // "I am a dog" — found via prototype chain
dog.bark();  // "Woof!" — own method

// The prototype chain
dog.speak();
// 1. Check dog's own properties → no 'speak'
// 2. Check dog's [[Prototype]] (animal) → found 'speak'!
// 3. If not found, goes up to Object.prototype, then null

// Checking
dog.hasOwnProperty('type');   // true (own property)
dog.hasOwnProperty('speak');  // false (inherited)
'speak' in dog;                // true (found in chain)

// Object.getPrototypeOf
Object.getPrototypeOf(dog) === animal; // true`)}
`
                },
                {
                    title: 'ES6 Classes (Syntactic Sugar)',
                    body: `
${codeBlock('javascript', `class Vehicle {
    // Private field (truly private, not accessible outside)
    #mileage = 0;

    // Static property (belongs to the class, not instances)
    static count = 0;

    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        Vehicle.count++;
    }

    // Getter (access like a property: car.info)
    get info() {
        return \`\${this.year} \${this.make} \${this.model}\`;
    }

    // Setter
    set mileage(value) {
        if (value < this.#mileage) throw new Error('Mileage can only increase');
        this.#mileage = value;
    }

    get mileage() { return this.#mileage; }

    // Instance method
    drive(km) {
        this.#mileage += km;
        return this;  // Return this for method chaining
    }

    // Private method
    #logMaintenance() {
        console.log(\`Maintenance at \${this.#mileage}km\`);
    }

    // Static method
    static compare(a, b) {
        return a.year - b.year;
    }
}

// Inheritance with extends
class ElectricCar extends Vehicle {
    #batteryLevel = 100;

    constructor(make, model, year, range) {
        super(make, model, year); // MUST call super() first
        this.range = range;
    }

    charge() {
        this.#batteryLevel = 100;
        return this;
    }

    // Override parent method
    drive(km) {
        this.#batteryLevel -= (km / this.range) * 100;
        return super.drive(km); // Call parent's drive method
    }
}

const tesla = new ElectricCar('Tesla', 'Model 3', 2024, 350);
tesla.drive(100).charge();
console.log(tesla.info);   // "2024 Tesla Model 3"
console.log(tesla instanceof ElectricCar); // true
console.log(tesla instanceof Vehicle);     // true`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  5. ADVANCED PATTERNS
        // -------------------------------------------------------
        {
            id: 'advanced',
            title: '5. Advanced Patterns',
            desc: 'Proxies, Generators, WeakMaps, Symbols, and other power features.',
            cards: [
                {
                    title: 'Proxy & Reflect',
                    body: `
<p>A <strong>Proxy</strong> wraps an object and intercepts operations like property access, assignment, and function calls. It's the mechanism behind Vue 3's reactivity system.</p>
${codeBlock('javascript', `// Basic reactive proxy
const handler = {
    get(target, property, receiver) {
        console.log(\`Reading \${property}\`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        console.log(\`Setting \${property} = \${value}\`);
        // Validation
        if (property === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        return Reflect.set(target, property, value, receiver);
    },
    deleteProperty(target, property) {
        console.log(\`Deleting \${property}\`);
        return Reflect.deleteProperty(target, property);
    },
    has(target, property) {
        // Intercept the "in" operator
        return property.startsWith('_') ? false : (property in target);
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);
user.name;         // logs "Reading name", returns "Alice"
user.age = 31;     // logs "Setting age = 31"
// user.age = "old"; // throws TypeError
'name' in user;    // true
'_secret' in user; // false (hidden by has trap)

// Practical: Auto-vivification (creating nested objects automatically)
function autoVivify() {
    return new Proxy({}, {
        get(target, property) {
            if (!(property in target)) {
                target[property] = autoVivify();
            }
            return target[property];
        }
    });
}
const config = autoVivify();
config.database.host.primary = 'localhost'; // No errors! Creates chain`)}
`
                },
                {
                    title: 'Generators & Iterators',
                    body: `
${codeBlock('javascript', `// Generator function — pauses at each yield
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
const fib = fibonacci();
fib.next(); // { value: 0, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 2, done: false }

// Generators are iterable
for (const n of fibonacci()) {
    if (n > 100) break;
    console.log(n); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
}

// Two-way communication with yield
function* conversation() {
    const name = yield 'What is your name?';
    const age = yield \`Hello, \${name}! How old are you?\`;
    return \`\${name} is \${age} years old.\`;
}
const chat = conversation();
chat.next();            // { value: "What is your name?", done: false }
chat.next('Alice');     // { value: "Hello, Alice! How old are you?", done: false }
chat.next(30);          // { value: "Alice is 30 years old.", done: true }

// yield* delegates to another generator
function* concat(...iterables) {
    for (const it of iterables) {
        yield* it;
    }
}
[...concat([1,2], [3,4], [5])]; // [1, 2, 3, 4, 5]

// Custom iterable (Symbol.iterator)
const range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        return {
            next() {
                return current <= last
                    ? { value: current++, done: false }
                    : { done: true };
            }
        };
    }
};
[...range]; // [1, 2, 3, 4, 5]
for (const n of range) console.log(n);`)}
`
                },
                {
                    title: 'WeakMap, WeakSet & WeakRef',
                    body: `
<p><strong>Weak</strong> collections hold "weak" references that don't prevent garbage collection. When the key is no longer referenced elsewhere, it can be GC'd.</p>
${codeBlock('javascript', `// WeakMap: keys must be objects, they don't prevent GC
const cache = new WeakMap();

function computeExpensive(obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = /* expensive computation */ obj.data * 2;
    cache.set(obj, result);
    return result;
}

let myObj = { data: 42 };
computeExpensive(myObj); // Computed and cached
computeExpensive(myObj); // Retrieved from cache

myObj = null; // The cache entry is automatically garbage collected!
// No memory leak, unlike a regular Map

// WeakMap practical use: Associate private data with DOM elements
const elementData = new WeakMap();
function setupElement(el) {
    elementData.set(el, {
        clickCount: 0,
        createdAt: Date.now()
    });
}
// When the DOM element is removed, the data is automatically cleaned up

// WeakSet: track objects without preventing GC
const visited = new WeakSet();
function processNode(node) {
    if (visited.has(node)) return; // Skip already-processed
    visited.add(node);
    // process...
}

// WeakRef: a weak reference to an object
let target = { name: 'important data' };
const ref = new WeakRef(target);
ref.deref();    // { name: 'important data' }
target = null;  // After GC runs...
ref.deref();    // undefined (object was collected)

// FinalizationRegistry: callback when object is GC'd
const registry = new FinalizationRegistry((heldValue) => {
    console.log(\`Object with ID \${heldValue} was garbage collected\`);
});
let obj = { data: 'temp' };
registry.register(obj, 'obj-1');
obj = null; // Eventually logs: "Object with ID obj-1 was garbage collected"`)}
<div class="warn-box">⚠️ <strong>WeakMap limitations:</strong> Keys must be objects (not primitives), and WeakMaps are not iterable — you can't loop over them or get their size. This is by design, since entries can disappear at any time.</div>
`
                },
                {
                    title: 'Symbols',
                    body: `
${codeBlock('javascript', `// Symbols are unique, immutable identifiers
const id = Symbol('user-id');
const id2 = Symbol('user-id');
id === id2; // false — every Symbol is unique!

// Use as property keys (hidden from normal iteration)
const user = {
    name: 'Alice',
    [id]: 12345
};
user[id]; // 12345
Object.keys(user);               // ['name'] — symbol not included
JSON.stringify(user);             // '{"name":"Alice"}' — symbol not included
Object.getOwnPropertySymbols(user); // [Symbol(user-id)] — special method

// Well-known Symbols — customize language behavior
class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // Custom string conversion
    [Symbol.toPrimitive](hint) {
        if (hint === 'number') return this.amount;
        if (hint === 'string') return \`\${this.amount} \${this.currency}\`;
        return this.amount;
    }

    // Custom instanceof behavior
    static [Symbol.hasInstance](instance) {
        return typeof instance.amount === 'number'
            && typeof instance.currency === 'string';
    }
}

+new Money(100, 'USD');       // 100 (number hint)
\`\${new Money(100, 'USD')}\`;  // "100 USD" (string hint)

// Symbol.for() — global symbol registry (shared across scopes)
const globalId = Symbol.for('app.userId');
Symbol.for('app.userId') === globalId; // true — same symbol!`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  6. EDGE CASES & GOTCHAS
        // -------------------------------------------------------
        {
            id: 'edge-cases',
            title: '6. Edge Cases & Gotchas',
            desc: 'Garbage collection, quirky behaviors, and the weird parts of JavaScript.',
            cards: [
                {
                    title: 'Garbage Collection & Memory Leaks',
                    body: `
${codeBlock('javascript', `// JavaScript uses "mark-and-sweep" GC
// Objects are collected when unreachable from root (global scope, stack)

// MEMORY LEAK 1: Forgotten event listeners
function setup() {
    const hugeData = new Array(1000000).fill('leak');
    document.getElementById('btn').addEventListener('click', () => {
        console.log(hugeData.length); // hugeData is held in closure!
    });
}
// FIX: Remove listeners when done:
// element.removeEventListener('click', handler);
// Or use { once: true } for one-time listeners:
// el.addEventListener('click', handler, { once: true });

// MEMORY LEAK 2: Closures holding large objects
function createProcessor() {
    const bigData = loadHugeDataset(); // 500MB
    return function process(item) {
        // Only uses item, but bigData stays in memory
        // because it's in the closure scope
        return item.id;
    };
}
// FIX: Null out references you don't need
function createProcessor() {
    let bigData = loadHugeDataset();
    const index = buildIndex(bigData);
    bigData = null; // Free the big data, keep only the index
    return function process(item) {
        return index[item.id];
    };
}

// MEMORY LEAK 3: Detached DOM nodes
const elements = [];
function addItem() {
    const el = document.createElement('div');
    document.body.appendChild(el);
    elements.push(el); // Reference in array
}
function removeItem() {
    const el = elements.pop();
    document.body.removeChild(el);
    // el is removed from DOM but still referenced in 'elements' array!
    // FIX: Remove from array AND DOM
}`)}
`
                },
                {
                    title: 'JavaScript Quirks & WAT Moments',
                    body: `
${codeBlock('javascript', `// The famous quirks
typeof null;           // "object" (bug from 1995, can never be fixed)
typeof NaN;            // "number" (NaN is a numeric value!)
NaN === NaN;           // false
0.1 + 0.2;            // 0.30000000000000004 (IEEE 754 floating point)
0.1 + 0.2 === 0.3;    // false
// FIX: Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON

// Comparison chaos
[] == false;           // true
[] == ![];             // true (yes, really)
// [] → "" → 0, ![] → false → 0, 0 == 0

// parseInt weirdness
parseInt('08');         // 8 (used to be 0 in old engines — octal!)
parseInt('0xF');        // 15 (hex)
parseInt('123abc');     // 123 (stops at first non-numeric char)
parseInt('abc');        // NaN

// map + parseInt trap
['1', '2', '3'].map(parseInt);
// [1, NaN, NaN]  ← WHY?!
// parseInt gets called as: parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)
// map passes (value, index) — index becomes the radix!
// FIX: ['1','2','3'].map(Number) → [1, 2, 3]
// OR:  ['1','2','3'].map(s => parseInt(s, 10))

// Array holes (sparse arrays)
const a = [1, , 3];     // Hole at index 1
a.length;               // 3
a[1];                    // undefined (but the slot is EMPTY, not undefined)
a.map(x => x * 2);      // [2, empty, 6] — skips holes!
[...a];                  // [1, undefined, 3] — spread fills holes

// delete doesn't change length
const arr = [1, 2, 3, 4];
delete arr[1];           // Creates a hole: [1, empty, 3, 4]
arr.length;              // 4 (unchanged!)

// Automatic semicolon insertion (ASI) gotcha
function getObject() {
    return    // ASI inserts semicolon here!
    {
        key: 'value'
    };
}
getObject(); // undefined (NOT the object!)
// FIX: Put { on the same line as return`)}
`
                },
                {
                    title: 'Destructuring, Spread & Modern Patterns',
                    body: `
${codeBlock('javascript', `// Object destructuring
const { name, age, role = 'user' } = { name: 'Alice', age: 30 };
// Rename: const { name: userName } = user;
// Nested: const { address: { city } } = user;

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1

// Spread operator
const merged = { ...defaults, ...userPrefs }; // Later wins
const combined = [...arr1, ...arr2];

// Optional chaining (?.)
const city = user?.address?.city;     // undefined if any part is null/undefined
const first = arr?.[0];               // Safe array access
const result = obj?.method?.();       // Safe method call

// Nullish coalescing (??)
const port = config.port ?? 3000;     // Uses 3000 only if port is null/undefined
// Different from ||: config.port || 3000 would also trigger for 0 or ""

// Logical assignment operators
obj.x ??= 10;    // Assign 10 only if obj.x is null/undefined
obj.y ||= 'default'; // Assign if obj.y is falsy
obj.z &&= obj.z.trim(); // Only operate if truthy

// Structured clone (deep copy, works with circular refs)
const deepCopy = structuredClone(original);

// Object.groupBy (ES2024)
const people = [
    { name: 'Alice', dept: 'Eng' },
    { name: 'Bob', dept: 'Sales' },
    { name: 'Charlie', dept: 'Eng' },
];
const byDept = Object.groupBy(people, p => p.dept);
// { Eng: [Alice, Charlie], Sales: [Bob] }`)}
`
                }
            ]
        }
    ]
};
