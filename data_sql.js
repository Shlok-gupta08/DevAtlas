// =================================================================
//  SQL REFERENCE DATA (v2)
//  Exhaustive reference with a reference database + query output tables
// =================================================================
LANGUAGES['sql'] = {
    name: 'SQL',
    desc: 'The universal language for querying and manipulating relational databases. Master joins, window functions, CTEs, and performance tuning.',
    sections: [
        // -------------------------------------------------------
        //  0. THE REFERENCE DATABASE
        // -------------------------------------------------------
        {
            id: 'ref-db',
            title: '0. Reference Database',
            desc: 'All examples in this guide use the following tables. Refer back here anytime.',
            cards: [
                {
                    title: 'employees',
                    body: `
<p>The <code>employees</code> table — 8 employees across 3 departments with salaries, managers, and hire dates.</p>
${codeBlock('sql', `CREATE TABLE employees (
    id        INT PRIMARY KEY,
    name      VARCHAR(50),
    department VARCHAR(30),
    role       VARCHAR(30),
    salary     NUMERIC(10,2),
    manager_id INT REFERENCES employees(id),
    hire_date  DATE
);`)}
<table class="styled-table">
<thead><tr><th>id</th><th>name</th><th>department</th><th>role</th><th>salary</th><th>manager_id</th><th>hire_date</th></tr></thead>
<tbody>
<tr><td>1</td><td>Alice Chen</td><td>Engineering</td><td>VP Engineering</td><td>155,000</td><td>NULL</td><td>2019-03-15</td></tr>
<tr><td>2</td><td>Bob Patel</td><td>Engineering</td><td>Senior Dev</td><td>125,000</td><td>1</td><td>2020-07-01</td></tr>
<tr><td>3</td><td>Charlie Kim</td><td>Engineering</td><td>Junior Dev</td><td>78,000</td><td>2</td><td>2023-01-10</td></tr>
<tr><td>4</td><td>Diana Lopez</td><td>Marketing</td><td>Marketing Lead</td><td>110,000</td><td>NULL</td><td>2020-01-20</td></tr>
<tr><td>5</td><td>Eve Tanaka</td><td>Marketing</td><td>Content Writer</td><td>72,000</td><td>4</td><td>2022-06-15</td></tr>
<tr><td>6</td><td>Frank Osei</td><td>Sales</td><td>Sales Director</td><td>130,000</td><td>NULL</td><td>2018-11-01</td></tr>
<tr><td>7</td><td>Grace Miller</td><td>Sales</td><td>Account Exec</td><td>95,000</td><td>6</td><td>2021-09-01</td></tr>
<tr><td>8</td><td>Hiro Sato</td><td>Engineering</td><td>DevOps</td><td>115,000</td><td>1</td><td>2021-04-10</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'orders & products',
                    body: `
<p>The <code>orders</code> and <code>products</code> tables — an e-commerce dataset with customers, orders, and line items.</p>
${codeBlock('sql', `CREATE TABLE products (
    id    INT PRIMARY KEY,
    name  VARCHAR(60),
    category VARCHAR(30),
    price  NUMERIC(10,2),
    stock  INT
);

CREATE TABLE orders (
    id          INT PRIMARY KEY,
    customer    VARCHAR(50),
    product_id  INT REFERENCES products(id),
    quantity    INT,
    total       NUMERIC(10,2),
    status      VARCHAR(20),
    created_at  DATE
);`)}
<table class="styled-table">
<thead><tr><th>id</th><th>name</th><th>category</th><th>price</th><th>stock</th></tr></thead>
<tbody>
<tr><td>1</td><td>Laptop Pro</td><td>Electronics</td><td>1,299.99</td><td>45</td></tr>
<tr><td>2</td><td>Wireless Mouse</td><td>Electronics</td><td>29.99</td><td>500</td></tr>
<tr><td>3</td><td>Desk Lamp</td><td>Home</td><td>49.99</td><td>200</td></tr>
<tr><td>4</td><td>Notebook Set</td><td>Office</td><td>12.50</td><td>1,000</td></tr>
<tr><td>5</td><td>Monitor 27"</td><td>Electronics</td><td>449.99</td><td>80</td></tr>
</tbody>
</table>
<table class="styled-table" style="margin-top:16px;">
<thead><tr><th>id</th><th>customer</th><th>product_id</th><th>quantity</th><th>total</th><th>status</th><th>created_at</th></tr></thead>
<tbody>
<tr><td>101</td><td>John</td><td>1</td><td>1</td><td>1,299.99</td><td>completed</td><td>2024-01-15</td></tr>
<tr><td>102</td><td>Sarah</td><td>2</td><td>3</td><td>89.97</td><td>completed</td><td>2024-01-20</td></tr>
<tr><td>103</td><td>John</td><td>5</td><td>2</td><td>899.98</td><td>shipped</td><td>2024-02-01</td></tr>
<tr><td>104</td><td>Mike</td><td>3</td><td>1</td><td>49.99</td><td>pending</td><td>2024-02-10</td></tr>
<tr><td>105</td><td>Sarah</td><td>4</td><td>5</td><td>62.50</td><td>completed</td><td>2024-02-15</td></tr>
<tr><td>106</td><td>Lisa</td><td>1</td><td>1</td><td>1,299.99</td><td>completed</td><td>2024-03-01</td></tr>
<tr><td>107</td><td>John</td><td>2</td><td>2</td><td>59.98</td><td>pending</td><td>2024-03-05</td></tr>
<tr><td>108</td><td>Mike</td><td>5</td><td>1</td><td>449.99</td><td>shipped</td><td>2024-03-10</td></tr>
</tbody>
</table>`
                }
            ]
        },
        // -------------------------------------------------------
        //  1. BASICS (CRUD)
        // -------------------------------------------------------
        {
            id: 'basics',
            title: '1. Core CRUD',
            desc: 'Reading, inserting, updating, and deleting data — the four fundamental operations.',
            cards: [
                {
                    title: 'SELECT — Reading Data',
                    body: `
${codeBlock('sql', `-- Get all engineers sorted by salary
SELECT name, role, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;`)}
${sqlOutput(
                        ['name', 'role', 'salary'],
                        [
                            ['Alice Chen', 'VP Engineering', '155,000.00'],
                            ['Bob Patel', 'Senior Dev', '125,000.00'],
                            ['Hiro Sato', 'DevOps', '115,000.00'],
                            ['Charlie Kim', 'Junior Dev', '78,000.00']
                        ]
                    )}
${codeBlock('sql', `-- WHERE clause operators
SELECT * FROM orders WHERE
    status = 'completed'              -- exact match
    AND total > 100                    -- comparison
    AND customer IN ('John', 'Sarah')  -- IN list
    AND created_at BETWEEN '2024-01-01' AND '2024-02-28';`)}
${sqlOutput(
                        ['id', 'customer', 'product_id', 'qty', 'total', 'status', 'created_at'],
                        [
                            ['101', 'John', '1', '1', '1,299.99', 'completed', '2024-01-15'],
                            ['102', 'Sarah', '2', '3', '89.97', 'completed', '2024-01-20']
                        ]
                    )}
${codeBlock('sql', `-- DISTINCT, LIKE, IS NULL, ORDER BY with CASE
SELECT DISTINCT department FROM employees;

SELECT * FROM employees WHERE name LIKE 'A%';  -- starts with A

SELECT name FROM employees WHERE manager_id IS NULL;  -- top-level managers

-- Custom sort order
SELECT name, department FROM employees
ORDER BY CASE department
    WHEN 'Engineering' THEN 1
    WHEN 'Sales' THEN 2
    ELSE 3 END;`)}
`
                },
                {
                    title: 'INSERT, UPDATE, DELETE',
                    body: `
${codeBlock('sql', `-- INSERT single row
INSERT INTO employees (id, name, department, role, salary, manager_id, hire_date)
VALUES (9, 'Ivy Reed', 'Engineering', 'QA Engineer', 85000, 1, '2024-06-01');

-- INSERT multiple rows
INSERT INTO products (id, name, category, price, stock) VALUES
    (6, 'USB Hub', 'Electronics', 34.99, 150),
    (7, 'Pen Pack', 'Office', 8.99, 2000);

-- UPDATE with conditions
UPDATE products SET price = price * 0.9 WHERE category = 'Office';`)}
${sqlOutput(
                        ['id', 'name', 'category', 'price', 'stock'],
                        [
                            ['4', 'Notebook Set', 'Office', '11.25', '1,000'],
                            ['7', 'Pen Pack', 'Office', '8.09', '2,000']
                        ]
                    )}
<p style="font-size:13px;color:#404040;margin:-6px 0 8px;">↑ Office products after 10% discount</p>
${codeBlock('sql', `-- DELETE with conditions
DELETE FROM orders WHERE status = 'pending' AND created_at < '2024-03-01';

-- TRUNCATE (fast wipe — no row-level logging, resets auto-increment)
TRUNCATE TABLE temp_logs RESTART IDENTITY;`)}
`
                },
                {
                    title: 'Aggregate Functions & GROUP BY',
                    body: `
${codeBlock('sql', `-- Department statistics
SELECT
    department,
    COUNT(*) AS headcount,
    ROUND(AVG(salary), 2) AS avg_salary,
    MIN(salary) AS lowest,
    MAX(salary) AS highest,
    SUM(salary) AS total_payroll
FROM employees
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY avg_salary DESC;`)}
${sqlOutput(
                        ['department', 'headcount', 'avg_salary', 'lowest', 'highest', 'total_payroll'],
                        [
                            ['Engineering', '4', '118,250.00', '78,000', '155,000', '473,000'],
                            ['Sales', '2', '112,500.00', '95,000', '130,000', '225,000'],
                            ['Marketing', '2', '91,000.00', '72,000', '110,000', '182,000']
                        ]
                    )}
${codeBlock('sql', `-- Order analytics
SELECT
    customer,
    COUNT(*) AS orders,
    SUM(total) AS total_spent,
    ROUND(AVG(total), 2) AS avg_order
FROM orders
GROUP BY customer
ORDER BY total_spent DESC;`)}
${sqlOutput(
                        ['customer', 'orders', 'total_spent', 'avg_order'],
                        [
                            ['John', '3', '2,259.95', '753.32'],
                            ['Lisa', '1', '1,299.99', '1,299.99'],
                            ['Sarah', '2', '152.47', '76.24'],
                            ['Mike', '2', '499.98', '249.99']
                        ]
                    )}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  2. JOINS
        // -------------------------------------------------------
        {
            id: 'joins',
            title: '2. Joins',
            desc: 'Every type of join explained with our reference database.',
            cards: [
                {
                    title: 'Join Types',
                    body: `
<table class="styled-table">
<thead><tr><th>Join Type</th><th>Returns</th><th>Use When</th></tr></thead>
<tbody>
<tr><td><code>INNER JOIN</code></td><td>Only matching rows from both tables</td><td>Need records existing in BOTH tables</td></tr>
<tr><td><code>LEFT JOIN</code></td><td>All left + matching right (NULLs if no match)</td><td>Want all left records regardless</td></tr>
<tr><td><code>FULL OUTER JOIN</code></td><td>All rows from both tables</td><td>Finding unmatched in either table</td></tr>
<tr><td><code>CROSS JOIN</code></td><td>Cartesian product (every × every)</td><td>Generating combinations</td></tr>
<tr><td><code>SELF JOIN</code></td><td>Table joined to itself</td><td>Hierarchies, finding duplicates</td></tr>
</tbody>
</table>
${codeBlock('sql', `-- INNER JOIN: Orders with product details
SELECT o.id AS order_id, o.customer, p.name AS product, o.quantity, o.total
FROM orders o
INNER JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed';`)}
${sqlOutput(
                        ['order_id', 'customer', 'product', 'quantity', 'total'],
                        [
                            ['101', 'John', 'Laptop Pro', '1', '1,299.99'],
                            ['102', 'Sarah', 'Wireless Mouse', '3', '89.97'],
                            ['105', 'Sarah', 'Notebook Set', '5', '62.50'],
                            ['106', 'Lisa', 'Laptop Pro', '1', '1,299.99']
                        ]
                    )}
${codeBlock('sql', `-- SELF JOIN: Employee with their manager's name
SELECT
    e.name AS employee,
    e.role,
    COALESCE(m.name, '— (Top Level)') AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY e.department, e.salary DESC;`)}
${sqlOutput(
                        ['employee', 'role', 'manager'],
                        [
                            ['Alice Chen', 'VP Engineering', '— (Top Level)'],
                            ['Bob Patel', 'Senior Dev', 'Alice Chen'],
                            ['Hiro Sato', 'DevOps', 'Alice Chen'],
                            ['Charlie Kim', 'Junior Dev', 'Bob Patel'],
                            ['Diana Lopez', 'Marketing Lead', '— (Top Level)'],
                            ['Eve Tanaka', 'Content Writer', 'Diana Lopez'],
                            ['Frank Osei', 'Sales Director', '— (Top Level)'],
                            ['Grace Miller', 'Account Exec', 'Frank Osei']
                        ]
                    )}
${codeBlock('sql', `-- Find products that have NEVER been ordered (anti-join)
SELECT p.name
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
WHERE o.id IS NULL;`)}
${sqlOutput(['name'], [['Desk Lamp']])}
<p style="font-size:13px;color:#525252;margin-top:4px;">↑ Desk Lamp (id=3) has no orders in the orders table.</p>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  3. WINDOW FUNCTIONS
        // -------------------------------------------------------
        {
            id: 'windows',
            title: '3. Window Functions',
            desc: 'RANK, ROW_NUMBER, LEAD/LAG, running totals — analytics without collapsing rows.',
            cards: [
                {
                    title: 'Ranking Functions',
                    body: `
<p>Window functions perform calculations across related rows <strong>without collapsing them</strong> like GROUP BY.</p>
${codeBlock('sql', `-- Rank employees by salary within each department
SELECT
    name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS company_rank
FROM employees;`)}
${sqlOutput(
                        ['name', 'department', 'salary', 'rank', 'company_rank'],
                        [
                            ['Alice Chen', 'Engineering', '155,000', '1', '1'],
                            ['Bob Patel', 'Engineering', '125,000', '2', '3'],
                            ['Hiro Sato', 'Engineering', '115,000', '3', '4'],
                            ['Charlie Kim', 'Engineering', '78,000', '4', '7'],
                            ['Diana Lopez', 'Marketing', '110,000', '1', '5'],
                            ['Eve Tanaka', 'Marketing', '72,000', '2', '8'],
                            ['Frank Osei', 'Sales', '130,000', '1', '2'],
                            ['Grace Miller', 'Sales', '95,000', '2', '6']
                        ]
                    )}
${codeBlock('sql', `-- Top N per group: Highest-paid employee per department
WITH ranked AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
)
SELECT name, department, salary FROM ranked WHERE rn = 1;`)}
${sqlOutput(
                        ['name', 'department', 'salary'],
                        [
                            ['Alice Chen', 'Engineering', '155,000'],
                            ['Diana Lopez', 'Marketing', '110,000'],
                            ['Frank Osei', 'Sales', '130,000']
                        ]
                    )}
`
                },
                {
                    title: 'LEAD, LAG & Running Totals',
                    body: `
${codeBlock('sql', `-- Running total of order revenue over time
SELECT
    id, customer, total, created_at,
    SUM(total) OVER (ORDER BY created_at) AS running_total,
    LAG(total) OVER (ORDER BY created_at) AS prev_order_total
FROM orders
ORDER BY created_at;`)}
${sqlOutput(
                        ['id', 'customer', 'total', 'created_at', 'running_total', 'prev_total'],
                        [
                            ['101', 'John', '1,299.99', '2024-01-15', '1,299.99', 'NULL'],
                            ['102', 'Sarah', '89.97', '2024-01-20', '1,389.96', '1,299.99'],
                            ['103', 'John', '899.98', '2024-02-01', '2,289.94', '89.97'],
                            ['104', 'Mike', '49.99', '2024-02-10', '2,339.93', '899.98'],
                            ['105', 'Sarah', '62.50', '2024-02-15', '2,402.43', '49.99'],
                            ['106', 'Lisa', '1,299.99', '2024-03-01', '3,702.42', '62.50'],
                            ['107', 'John', '59.98', '2024-03-05', '3,762.40', '1,299.99'],
                            ['108', 'Mike', '449.99', '2024-03-10', '4,212.39', '59.98']
                        ]
                    )}
${codeBlock('sql', `-- Compare each employee's salary to department average
SELECT
    name, department, salary,
    ROUND(AVG(salary) OVER (PARTITION BY department), 0) AS dept_avg,
    salary - ROUND(AVG(salary) OVER (PARTITION BY department), 0) AS diff
FROM employees
ORDER BY department, salary DESC;`)}
${sqlOutput(
                        ['name', 'department', 'salary', 'dept_avg', 'diff'],
                        [
                            ['Alice Chen', 'Engineering', '155,000', '118,250', '+36,750'],
                            ['Bob Patel', 'Engineering', '125,000', '118,250', '+6,750'],
                            ['Hiro Sato', 'Engineering', '115,000', '118,250', '-3,250'],
                            ['Charlie Kim', 'Engineering', '78,000', '118,250', '-40,250'],
                            ['Diana Lopez', 'Marketing', '110,000', '91,000', '+19,000'],
                            ['Eve Tanaka', 'Marketing', '72,000', '91,000', '-19,000'],
                            ['Frank Osei', 'Sales', '130,000', '112,500', '+17,500'],
                            ['Grace Miller', 'Sales', '95,000', '112,500', '-17,500']
                        ]
                    )}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  4. CTEs & RECURSIVE QUERIES
        // -------------------------------------------------------
        {
            id: 'ctes',
            title: '4. CTEs & Recursive Queries',
            desc: 'Common Table Expressions, recursive queries for hierarchies.',
            cards: [
                {
                    title: 'Common Table Expressions (WITH)',
                    body: `
<p>CTEs create named temporary result sets — think of them as "staging areas" within your query.</p>
${codeBlock('sql', `-- Multi-step analysis: High-value customers
WITH customer_stats AS (
    SELECT
        customer,
        COUNT(*) AS order_count,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY customer
),
high_value AS (
    SELECT * FROM customer_stats WHERE total_spent > 500
)
SELECT * FROM high_value ORDER BY total_spent DESC;`)}
${sqlOutput(
                        ['customer', 'order_count', 'total_spent'],
                        [
                            ['John', '3', '2,259.95'],
                            ['Lisa', '1', '1,299.99']
                        ]
                    )}
`
                },
                {
                    title: 'Recursive CTEs (Hierarchies)',
                    body: `
<p>Recursive CTEs let you traverse hierarchical data like org charts directly in SQL.</p>
${codeBlock('sql', `-- Build the full org chart with depth and path
WITH RECURSIVE org_tree AS (
    -- Base: top-level managers (no manager_id)
    SELECT id, name, role, manager_id, 1 AS depth,
           name::TEXT AS chain
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: employees reporting to previous level
    SELECT e.id, e.name, e.role, e.manager_id, ot.depth + 1,
           ot.chain || ' → ' || e.name
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT depth, name, role, chain FROM org_tree ORDER BY chain;`)}
${sqlOutput(
                        ['depth', 'name', 'role', 'chain'],
                        [
                            ['1', 'Alice Chen', 'VP Engineering', 'Alice Chen'],
                            ['2', 'Bob Patel', 'Senior Dev', 'Alice Chen → Bob Patel'],
                            ['3', 'Charlie Kim', 'Junior Dev', 'Alice Chen → Bob Patel → Charlie Kim'],
                            ['2', 'Hiro Sato', 'DevOps', 'Alice Chen → Hiro Sato'],
                            ['1', 'Diana Lopez', 'Marketing Lead', 'Diana Lopez'],
                            ['2', 'Eve Tanaka', 'Content Writer', 'Diana Lopez → Eve Tanaka'],
                            ['1', 'Frank Osei', 'Sales Director', 'Frank Osei'],
                            ['2', 'Grace Miller', 'Account Exec', 'Frank Osei → Grace Miller']
                        ]
                    )}
<div class="warn-box">⚠️ <strong>Infinite loop prevention:</strong> Always ensure the recursive step terminates. Add <code>WHERE depth &lt; 20</code> or use PostgreSQL 14+ <code>CYCLE</code> detection.</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  5. ADVANCED FEATURES
        // -------------------------------------------------------
        {
            id: 'advanced',
            title: '5. Advanced Features',
            desc: 'UPSERT, VIEWs, JSONB queries, subqueries, and CASE expressions.',
            cards: [
                {
                    title: 'UPSERT (INSERT ... ON CONFLICT)',
                    body: `
${codeBlock('sql', `-- Insert a product, or update if SKU already exists
INSERT INTO products (id, name, category, price, stock)
VALUES (2, 'Wireless Mouse Pro', 'Electronics', 34.99, 200)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock = products.stock + EXCLUDED.stock;`)}
${sqlOutput(
                        ['id', 'name', 'category', 'price', 'stock'],
                        [['2', 'Wireless Mouse Pro', 'Electronics', '34.99', '700']]
                    )}
<p style="font-size:13px;color:#525252;">↑ Stock was 500, now 500 + 200 = 700. Name and price updated.</p>
${codeBlock('sql', `-- DO NOTHING (silently skip duplicates)
INSERT INTO products (id, name, category, price, stock)
VALUES (1, 'Laptop Pro', 'Electronics', 1299.99, 45)
ON CONFLICT (id) DO NOTHING;
-- No error, no change — the existing row stays as-is.`)}
`
                },
                {
                    title: 'VIEWs — Virtual Tables',
                    body: `
<p>A <strong>VIEW</strong> is a saved query that acts like a virtual table. It doesn't store data — it runs the underlying query each time you access it.</p>
${codeBlock('sql', `-- Create a view for easy access to order details
CREATE VIEW order_details AS
SELECT
    o.id AS order_id,
    o.customer,
    p.name AS product,
    p.category,
    o.quantity,
    o.total,
    o.status,
    o.created_at
FROM orders o
JOIN products p ON o.product_id = p.id;

-- Now query it like a regular table!
SELECT * FROM order_details WHERE customer = 'John';`)}
${sqlOutput(
                        ['order_id', 'customer', 'product', 'category', 'qty', 'total', 'status', 'date'],
                        [
                            ['101', 'John', 'Laptop Pro', 'Electronics', '1', '1,299.99', 'completed', '2024-01-15'],
                            ['103', 'John', 'Monitor 27"', 'Electronics', '2', '899.98', 'shipped', '2024-02-01'],
                            ['107', 'John', 'Wireless Mouse', 'Electronics', '2', '59.98', 'pending', '2024-03-05']
                        ]
                    )}
${codeBlock('sql', `-- Materialized View (caches results — much faster for expensive queries)
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
    DATE_TRUNC('month', created_at)::DATE AS month,
    COUNT(*) AS orders,
    SUM(total) AS revenue
FROM orders
WHERE status = 'completed'
GROUP BY 1;

SELECT * FROM monthly_revenue;`)}
${sqlOutput(
                        ['month', 'orders', 'revenue'],
                        [
                            ['2024-01-01', '2', '1,389.96'],
                            ['2024-02-01', '1', '62.50'],
                            ['2024-03-01', '1', '1,299.99']
                        ]
                    )}
${codeBlock('sql', `-- Refresh when underlying data changes
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;

-- Drop views
DROP VIEW order_details;
DROP MATERIALIZED VIEW monthly_revenue;`)}
<table class="styled-table">
<thead><tr><th>Feature</th><th>Regular VIEW</th><th>MATERIALIZED VIEW</th></tr></thead>
<tbody>
<tr><td>Stores data?</td><td>No — runs query each time</td><td>Yes — cached result</td></tr>
<tr><td>Speed</td><td>Same as underlying query</td><td>Fast reads (pre-computed)</td></tr>
<tr><td>Freshness</td><td>Always current</td><td>Stale until REFRESH</td></tr>
<tr><td>Updatable?</td><td>Sometimes (simple views)</td><td>No</td></tr>
<tr><td>Use case</td><td>Simplify complex queries</td><td>Dashboards, reports</td></tr>
</tbody>
</table>`
                },
                {
                    title: 'Subqueries & EXISTS',
                    body: `
${codeBlock('sql', `-- Scalar subquery: Compare each salary to company average
SELECT name, salary,
    salary - (SELECT ROUND(AVG(salary)) FROM employees) AS diff_from_avg
FROM employees
ORDER BY diff_from_avg DESC;`)}
${sqlOutput(
                        ['name', 'salary', 'diff_from_avg'],
                        [
                            ['Alice Chen', '155,000', '+45,000'],
                            ['Frank Osei', '130,000', '+20,000'],
                            ['Bob Patel', '125,000', '+15,000'],
                            ['Hiro Sato', '115,000', '+5,000'],
                            ['Diana Lopez', '110,000', '0'],
                            ['Grace Miller', '95,000', '-15,000'],
                            ['Charlie Kim', '78,000', '-32,000'],
                            ['Eve Tanaka', '72,000', '-38,000']
                        ]
                    )}
${codeBlock('sql', `-- EXISTS: Find customers who ordered Electronics
SELECT DISTINCT o.customer
FROM orders o
WHERE EXISTS (
    SELECT 1 FROM products p
    WHERE p.id = o.product_id AND p.category = 'Electronics'
);`)}
${sqlOutput(['customer'], [['John'], ['Sarah'], ['Lisa'], ['Mike']])}
`
                },
                {
                    title: 'CASE Expressions',
                    body: `
${codeBlock('sql', `-- Categorize employees by salary band
SELECT name, salary,
    CASE
        WHEN salary >= 130000 THEN 'Senior'
        WHEN salary >= 90000  THEN 'Mid-Level'
        ELSE 'Junior'
    END AS band
FROM employees
ORDER BY salary DESC;`)}
${sqlOutput(
                        ['name', 'salary', 'band'],
                        [
                            ['Alice Chen', '155,000', 'Senior'],
                            ['Frank Osei', '130,000', 'Senior'],
                            ['Bob Patel', '125,000', 'Mid-Level'],
                            ['Hiro Sato', '115,000', 'Mid-Level'],
                            ['Diana Lopez', '110,000', 'Mid-Level'],
                            ['Grace Miller', '95,000', 'Mid-Level'],
                            ['Charlie Kim', '78,000', 'Junior'],
                            ['Eve Tanaka', '72,000', 'Junior']
                        ]
                    )}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  6. INDEXING & PERFORMANCE
        // -------------------------------------------------------
        {
            id: 'performance',
            title: '6. Indexing & Performance',
            desc: 'Index types, EXPLAIN analysis, and query optimization.',
            cards: [
                {
                    title: 'Index Types & Strategies',
                    body: `
${codeBlock('sql', `-- B-Tree index (default — for =, <, >, BETWEEN, ORDER BY)
CREATE INDEX idx_emp_department ON employees (department);

-- Composite index (column order MATTERS)
CREATE INDEX idx_orders_customer_date
ON orders (customer, created_at DESC);
-- Helps: WHERE customer = 'John' ORDER BY created_at DESC
-- Does NOT help: WHERE created_at > '2024-01-01' (leading column missing)

-- Partial index (smaller, faster — only index a subset of rows)
CREATE INDEX idx_orders_pending
ON orders (created_at) WHERE status = 'pending';

-- Expression index (index on computed values)
CREATE INDEX idx_emp_lower_name ON employees (LOWER(name));

-- Covering index (avoid table lookups entirely)
CREATE INDEX idx_products_cat_covering
ON products (category) INCLUDE (name, price);`)}
`
                },
                {
                    title: 'EXPLAIN & Query Optimization',
                    body: `
${codeBlock('sql', `-- See the query execution plan
EXPLAIN ANALYZE
SELECT e.name, e.salary
FROM employees e
WHERE e.department = 'Engineering'
ORDER BY e.salary DESC;

-- What to look for:
-- ✅ "Index Scan" — using an index (fast)
-- ⚠️ "Seq Scan" — full table scan (slow for big tables)
-- 🚨 High actual vs estimated rows — run ANALYZE to update stats`)}
<div class="tip-box">💡 <strong>Performance rules:</strong><br>
• Never <code>SELECT *</code> in production — only fetch columns you need<br>
• Add indexes on <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code> columns<br>
• Avoid functions on indexed columns in WHERE: <code>WHERE YEAR(date) = 2024</code> → <code>WHERE date >= '2024-01-01'</code><br>
• Use <code>LIMIT</code> for pagination<br>
• Use materialized views for expensive aggregations</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  7. EDGE CASES
        // -------------------------------------------------------
        {
            id: 'edge-cases',
            title: '7. Edge Cases & Gotchas',
            desc: 'NULL behavior, transaction pitfalls, and common SQL mistakes.',
            cards: [
                {
                    title: 'NULL: The Billion Dollar Mistake',
                    body: `
${codeBlock('sql', `-- NULL is NOT a value — it's the ABSENCE of a value
SELECT NULL = NULL;         -- NULL (not TRUE!)
SELECT NULL != NULL;        -- NULL
SELECT NULL + 10;           -- NULL (any op with NULL = NULL)

-- Correct NULL checks
SELECT name FROM employees WHERE manager_id IS NULL;`)}
${sqlOutput(
                        ['name'],
                        [['Alice Chen'], ['Diana Lopez'], ['Frank Osei']]
                    )}
${codeBlock('sql', `-- COALESCE: first non-NULL value
SELECT name, COALESCE(manager_id::TEXT, 'Top Level') AS reports_to
FROM employees;

-- NULLIF: returns NULL if two values are equal (avoids division by zero)
SELECT total / NULLIF(quantity, 0) AS unit_price FROM orders;

-- NULL gotcha in NOT IN — returns NO ROWS if list contains NULL!
-- FIX: Use NOT EXISTS instead of NOT IN when NULLs are possible.`)}
`
                },
                {
                    title: 'Transactions & ACID',
                    body: `
${codeBlock('sql', `-- Transaction: Transfer money between accounts
BEGIN;
    UPDATE accounts SET balance = balance - 500 WHERE id = 1;
    UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;  -- Both succeed or both fail

-- Savepoints: Partial rollback
BEGIN;
    INSERT INTO orders (...) VALUES (...);
    SAVEPOINT before_items;
    INSERT INTO order_items (...) VALUES (...);  -- Error!
    ROLLBACK TO before_items;  -- Undo only the items
    INSERT INTO order_items (...) VALUES (...);  -- Retry
COMMIT;

-- Isolation levels
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Row-level locking (prevent concurrent modification)
SELECT * FROM products WHERE id = 1 FOR UPDATE;
-- Row is locked until you COMMIT or ROLLBACK`)}
<table class="styled-table">
<thead><tr><th>Level</th><th>Dirty Reads</th><th>Non-Repeatable</th><th>Phantom Reads</th></tr></thead>
<tbody>
<tr><td><code>READ UNCOMMITTED</code></td><td>✅ Possible</td><td>✅ Possible</td><td>✅ Possible</td></tr>
<tr><td><code>READ COMMITTED</code></td><td>✗ No</td><td>✅ Possible</td><td>✅ Possible</td></tr>
<tr><td><code>REPEATABLE READ</code></td><td>✗ No</td><td>✗ No</td><td>✅ Possible</td></tr>
<tr><td><code>SERIALIZABLE</code></td><td>✗ No</td><td>✗ No</td><td>✗ No</td></tr>
</tbody>
</table>`
                }
            ]
        }
    ]
};
