# SQL Window Functions: A Comprehensive Guide

Window functions are powerful SQL features that allow you to perform calculations across a set of table rows that are somehow related to the current row. Unlike aggregate functions, window functions don't cause rows to become grouped into a single output row — the rows retain their separate identities.

## What are Window Functions?

Window functions operate on a set of rows and return a single value for each row from the underlying query. The set of rows is called a "window" and is defined by the `OVER` clause.

### Basic Syntax
```sql
function_name([arguments]) OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...]
    [ROWS|RANGE frame_specification]
)
```

## Setup: Import Required Libraries

First, let's import the necessary Python libraries to make this notebook interactive and runnable:


```python
!pip install sqlite3
```

    [31mERROR: Could not find a version that satisfies the requirement sqlite3 (from versions: none)[0m[31m
    [0m[31mERROR: No matching distribution found for sqlite3[0m[31m
    [0m


```python
import pandas as pd
import sqlite3
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Create an in-memory SQLite database
conn = sqlite3.connect(':memory:')

# Helper function to execute SQL and display results
def run_sql(query, description=None):
    if description:
        print(f"\n{description}")
        print("=" * len(description))
    
    try:
        result = pd.read_sql_query(query, conn)
        print(result.to_string(index=False))
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None

print("✅ Libraries imported and database connection established!")
```


    ---------------------------------------------------------------------------

    ModuleNotFoundError                       Traceback (most recent call last)

    Cell In[1], line 1
    ----&gt; 1 import pandas as pd
          2 import sqlite3
          3 from datetime import datetime


    ModuleNotFoundError: No module named 'pandas'


## Sample Data Setup

Let's create some sample data to work with:


```python
# Create the sales table
create_table_query = """
CREATE TABLE sales (
    employee_id INTEGER,
    employee_name TEXT,
    department TEXT,
    sale_date DATE,
    sale_amount REAL
);
"""

conn.execute(create_table_query)

# Insert sample data
insert_data_query = """
INSERT INTO sales VALUES
(1, 'Alice Johnson', 'Sales', '2024-01-15', 1500.00),
(2, 'Bob Smith', 'Sales', '2024-01-16', 2200.00),
(3, 'Carol Davis', 'Marketing', '2024-01-17', 1800.00),
(1, 'Alice Johnson', 'Sales', '2024-02-10', 1750.00),
(4, 'David Wilson', 'Marketing', '2024-02-12', 2100.00),
(2, 'Bob Smith', 'Sales', '2024-02-15', 1900.00),
(5, 'Eva Brown', 'IT', '2024-03-01', 2500.00),
(3, 'Carol Davis', 'Marketing', '2024-03-05', 1600.00),
(1, 'Alice Johnson', 'Sales', '2024-03-10', 2000.00),
(6, 'Frank Miller', 'IT', '2024-03-15', 2300.00);
"""

conn.execute(insert_data_query)
conn.commit()

# Display the data
run_sql("SELECT * FROM sales ORDER BY sale_date", "Sample Sales Data")
```

## Types of Window Functions

### 1. Ranking Functions

These functions assign ranks to rows within a partition.


```python
# ROW_NUMBER(): Assigns unique sequential integers
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    ROW_NUMBER() OVER (ORDER BY sale_amount DESC) as row_num,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY sale_amount DESC) as dept_row_num
FROM sales
ORDER BY sale_amount DESC
"""

run_sql(query, "ROW_NUMBER() Example")
```


```python
# RANK(): Assigns ranks with gaps for ties
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    RANK() OVER (ORDER BY sale_amount DESC) as rank_with_gaps,
    RANK() OVER (PARTITION BY department ORDER BY sale_amount DESC) as dept_rank
FROM sales
ORDER BY sale_amount DESC
"""

run_sql(query, "RANK() Example")
```


```python
# DENSE_RANK(): Assigns ranks without gaps for ties
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    DENSE_RANK() OVER (ORDER BY sale_amount DESC) as dense_rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY sale_amount DESC) as dept_dense_rank
FROM sales
ORDER BY sale_amount DESC
"""

run_sql(query, "DENSE_RANK() Example")
```


```python
# NTILE(): Divides rows into specified number of groups
query = """
SELECT 
    employee_name,
    sale_amount,
    NTILE(3) OVER (ORDER BY sale_amount DESC) as quartile,
    NTILE(4) OVER (ORDER BY sale_amount DESC) as quartile_4
FROM sales
ORDER BY sale_amount DESC
"""

run_sql(query, "NTILE() Example")
```

### 2. Aggregate Window Functions

These functions perform calculations across the window frame.


```python
# SUM() with different window frames
query = """
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    SUM(sale_amount) OVER () as total_sales,
    SUM(sale_amount) OVER (PARTITION BY department) as dept_total,
    SUM(sale_amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) as running_total
FROM sales
ORDER BY sale_date
"""

run_sql(query, "SUM() Window Function Example")
```


```python
# AVG() and COUNT() window functions
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    AVG(sale_amount) OVER () as overall_avg,
    AVG(sale_amount) OVER (PARTITION BY department) as dept_avg,
    COUNT(*) OVER (PARTITION BY department) as dept_count,
    sale_amount - AVG(sale_amount) OVER (PARTITION BY department) as diff_from_dept_avg
FROM sales
ORDER BY department, sale_amount DESC
"""

run_sql(query, "AVG() and COUNT() Window Functions Example")
```


```python
# MIN() and MAX() window functions
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    MIN(sale_amount) OVER (PARTITION BY department) as dept_min,
    MAX(sale_amount) OVER (PARTITION BY department) as dept_max,
    MAX(sale_amount) OVER (ORDER BY sale_date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) as local_max
FROM sales
ORDER BY department, sale_amount
"""

run_sql(query, "MIN() and MAX() Window Functions Example")
```

### 3. Value/Offset Functions

These functions access data from other rows relative to the current row.


```python
# LAG() and LEAD() functions
query = """
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    LAG(sale_amount, 1) OVER (PARTITION BY employee_name ORDER BY sale_date) as prev_sale,
    LEAD(sale_amount, 1) OVER (PARTITION BY employee_name ORDER BY sale_date) as next_sale,
    sale_amount - LAG(sale_amount, 1) OVER (PARTITION BY employee_name ORDER BY sale_date) as sale_change
FROM sales
WHERE employee_name IN ('Alice Johnson', 'Bob Smith', 'Carol Davis')
ORDER BY employee_name, sale_date
"""

run_sql(query, "LAG() and LEAD() Functions Example")
```


```python
# FIRST_VALUE() and LAST_VALUE() functions
query = """
SELECT 
    employee_name,
    department,
    sale_date,
    sale_amount,
    FIRST_VALUE(sale_amount) OVER (PARTITION BY department ORDER BY sale_date) as first_dept_sale,
    LAST_VALUE(sale_amount) OVER (
        PARTITION BY department 
        ORDER BY sale_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as last_dept_sale
FROM sales
ORDER BY department, sale_date
"""

run_sql(query, "FIRST_VALUE() and LAST_VALUE() Functions Example")
```


```python
# NTH_VALUE() function
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    NTH_VALUE(sale_amount, 2) OVER (
        PARTITION BY department 
        ORDER BY sale_amount DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as second_highest_in_dept
FROM sales
ORDER BY department, sale_amount DESC
"""

run_sql(query, "NTH_VALUE() Function Example")
```

## Window Frame Specifications

Window frames define which rows are included in the calculation for each row.

### Frame Types:
- `ROWS`: Physical number of rows
- `RANGE`: Logical range based on values

### Frame Boundaries:
- `UNBOUNDED PRECEDING`: From the start of the partition
- `UNBOUNDED FOLLOWING`: To the end of the partition
- `CURRENT ROW`: The current row
- `n PRECEDING`: n rows before the current row
- `n FOLLOWING`: n rows after the current row


```python
# Different frame specifications
query = """
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    -- Running total from beginning
    SUM(sale_amount) OVER (
        ORDER BY sale_date 
        ROWS UNBOUNDED PRECEDING
    ) as running_total,
    -- Moving average of last 3 sales
    AVG(sale_amount) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg_3,
    -- Total of current and next 2 rows
    SUM(sale_amount) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING
    ) as forward_sum
FROM sales
ORDER BY sale_date
"""

run_sql(query, "Window Frame Specifications Example")
```

## Advanced Examples

### Finding Top N in Each Group


```python
# Top 2 sales performers in each department
query = """
WITH ranked_sales AS (
    SELECT 
        employee_name,
        department,
        SUM(sale_amount) as total_sales,
        RANK() OVER (PARTITION BY department ORDER BY SUM(sale_amount) DESC) as dept_rank
    FROM sales
    GROUP BY employee_name, department
)
SELECT *
FROM ranked_sales
WHERE dept_rank &lt;= 2
ORDER BY department, dept_rank
"""

run_sql(query, "Top 2 Sales Performers in Each Department")
```


```python
# Percentage of total and cumulative percentage
query = """
SELECT 
    employee_name,
    department,
    sale_amount,
    ROUND(
        100.0 * sale_amount / SUM(sale_amount) OVER (), 
        2
    ) as pct_of_total,
    ROUND(
        100.0 * SUM(sale_amount) OVER (ORDER BY sale_amount DESC ROWS UNBOUNDED PRECEDING) / 
        SUM(sale_amount) OVER (), 
        2
    ) as cumulative_pct
FROM sales
ORDER BY sale_amount DESC
"""

run_sql(query, "Percentage of Total and Cumulative Percentage")
```

## Complete List of Window Functions

### Ranking Functions:
- `ROW_NUMBER()`: Unique sequential integers
- `RANK()`: Ranking with gaps for ties
- `DENSE_RANK()`: Ranking without gaps for ties
- `NTILE(n)`: Divide rows into n groups

### Aggregate Functions (can be used as window functions):
- `SUM()`: Sum of values
- `AVG()`: Average of values
- `COUNT()`: Count of rows
- `MIN()`: Minimum value
- `MAX()`: Maximum value
- `STDDEV()`: Standard deviation
- `VARIANCE()`: Variance

### Value/Offset Functions:
- `LAG(expr, offset, default)`: Value from previous row
- `LEAD(expr, offset, default)`: Value from next row
- `FIRST_VALUE(expr)`: First value in window frame
- `LAST_VALUE(expr)`: Last value in window frame
- `NTH_VALUE(expr, n)`: nth value in window frame

### Distribution Functions:
- `PERCENT_RANK()`: Relative rank as percentage
- `CUME_DIST()`: Cumulative distribution
- `PERCENTILE_CONT(percentile)`: Continuous percentile
- `PERCENTILE_DISC(percentile)`: Discrete percentile

## Practice Quiz Questions

Try to solve these problems using window functions. Solutions are provided below each question.

### Question 1
Write a query to find each employee's sales amount and what percentage it represents of their department's total sales.


```python
# Try your solution here first!
# Uncomment and modify the query below:

# query = """
# SELECT 
#     employee_name,
#     department,
#     sale_amount,
#     -- Add your window function here to calculate percentage
# FROM sales
# ORDER BY department, sale_amount DESC
# """

# run_sql(query, "Question 1 - Your Solution")
```


```python
# SOLUTION - Run this cell to see the answer
solution_q1 = """
SELECT 
    employee_name,
    department,
    sale_amount,
    ROUND(
        100.0 * sale_amount / SUM(sale_amount) OVER (PARTITION BY department), 
        2
    ) as pct_of_dept_sales
FROM sales
ORDER BY department, sale_amount DESC
"""

run_sql(solution_q1, "Question 1 Solution: Percentage of Department Sales")
```

&lt;details&gt;
&lt;summary&gt;Click to see solution&lt;/summary&gt;

```sql
SELECT 
    employee_name,
    department,
    sale_amount,
    ROUND(
        100.0 * sale_amount / SUM(sale_amount) OVER (PARTITION BY department), 
        2
    ) as pct_of_dept_sales
FROM sales
ORDER BY department, sale_amount DESC;
```
&lt;/details&gt;

### Question 2
For each sale, show the difference between the current sale amount and the previous sale amount for the same employee (ordered by date).


```python
# Try your solution here first!
# Uncomment and modify the query below:

# query = """
# SELECT 
#     employee_name,
#     sale_date,
#     sale_amount,
#     -- Add your LAG function here
# FROM sales
# ORDER BY employee_name, sale_date
# """

# run_sql(query, "Question 2 - Your Solution")
```


```python
# SOLUTION - Run this cell to see the answer
solution_q2 = """
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    LAG(sale_amount) OVER (PARTITION BY employee_name ORDER BY sale_date) as previous_sale,
    sale_amount - LAG(sale_amount) OVER (PARTITION BY employee_name ORDER BY sale_date) as sale_difference
FROM sales
ORDER BY employee_name, sale_date
"""

run_sql(solution_q2, "Question 2 Solution: Sale Differences by Employee")
```

&lt;details&gt;
&lt;summary&gt;Click to see solution&lt;/summary&gt;

```sql
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    LAG(sale_amount) OVER (PARTITION BY employee_name ORDER BY sale_date) as prev_sale,
    sale_amount - LAG(sale_amount) OVER (PARTITION BY employee_name ORDER BY sale_date) as sale_difference
FROM sales
ORDER BY employee_name, sale_date;
```
&lt;/details&gt;

### Question 3
Rank employees by their total sales amount, and show only the top 3 performers overall.


```python
# Try your solution here first!
# Uncomment and modify the query below:

# query = """
# WITH employee_totals AS (
#     SELECT 
#         employee_name,
#         department,
#         -- Add your aggregation and ranking here
#     FROM sales
#     GROUP BY employee_name, department
# )
# SELECT * FROM employee_totals
# -- Add your WHERE clause here
# """

# run_sql(query, "Question 3 - Your Solution")
```


```python
# SOLUTION - Run this cell to see the answer
solution_q3 = """
WITH employee_totals AS (
    SELECT 
        employee_name,
        department,
        SUM(sale_amount) as total_sales,
        RANK() OVER (ORDER BY SUM(sale_amount) DESC) as sales_rank
    FROM sales
    GROUP BY employee_name, department
)
SELECT *
FROM employee_totals
WHERE sales_rank &lt;= 3
ORDER BY sales_rank
"""

run_sql(solution_q3, "Question 3 Solution: Top 3 Sales Performers")
```

### Question 4
Calculate a running total of sales ordered by date, and show what percentage each running total represents of the final total.


```python
# Try your solution here first!
# Uncomment and modify the query below:

# query = """
# SELECT 
#     employee_name,
#     sale_date,
#     sale_amount,
#     -- Add your running total calculation here
#     -- Add your percentage calculation here
# FROM sales
# ORDER BY sale_date
# """

# run_sql(query, "Question 4 - Your Solution")
```


```python
# SOLUTION - Run this cell to see the answer
solution_q4 = """
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    SUM(sale_amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) as running_total,
    ROUND(
        100.0 * SUM(sale_amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) / 
        SUM(sale_amount) OVER (), 
        2
    ) as running_pct
FROM sales
ORDER BY sale_date
"""

run_sql(solution_q4, "Question 4 Solution: Running Total and Percentage")
```

### Question 5
For each department, find the employee with the highest single sale and show how much higher it is than the department average.


```python
# Try your solution here first!
# Uncomment and modify the query below:

# query = """
# WITH dept_stats AS (
#     SELECT 
#         employee_name,
#         department,
#         sale_amount,
#         -- Add your window functions here
#     FROM sales
# )
# SELECT 
#     department,
#     employee_name,
#     -- Add your calculations here
# FROM dept_stats
# -- Add your WHERE clause here
# """

# run_sql(query, "Question 5 - Your Solution")
```


```python
# SOLUTION - Run this cell to see the answer
solution_q5 = """
WITH dept_stats AS (
    SELECT 
        employee_name,
        department,
        sale_amount,
        AVG(sale_amount) OVER (PARTITION BY department) as dept_avg,
        RANK() OVER (PARTITION BY department ORDER BY sale_amount DESC) as dept_rank
    FROM sales
)
SELECT 
    department,
    employee_name,
    sale_amount as highest_sale,
    ROUND(dept_avg, 2) as dept_average,
    ROUND(sale_amount - dept_avg, 2) as above_average
FROM dept_stats
WHERE dept_rank = 1
ORDER BY department
"""

run_sql(solution_q5, "Question 5 Solution: Highest Sale vs Department Average")
```

### Question 6 (Advanced)
Create a query that shows each sale along with the 3-period moving average (current sale plus the 2 previous sales by date) for each employee.


```python
# Try your solution here first!
# Uncomment and modify the query below:

# query = """
# SELECT 
#     employee_name,
#     sale_date,
#     sale_amount,
#     -- Add your moving average calculation here
# FROM sales
# ORDER BY employee_name, sale_date
# """

# run_sql(query, "Question 6 - Your Solution")
```


```python
# SOLUTION - Run this cell to see the answer
solution_q6 = """
SELECT 
    employee_name,
    sale_date,
    sale_amount,
    ROUND(
        AVG(sale_amount) OVER (
            PARTITION BY employee_name 
            ORDER BY sale_date 
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2
    ) as moving_avg_3,
    COUNT(*) OVER (
        PARTITION BY employee_name 
        ORDER BY sale_date 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as periods_in_avg
FROM sales
ORDER BY employee_name, sale_date
"""

run_sql(solution_q6, "Question 6 Solution: 3-Period Moving Average by Employee")
```

## Key Takeaways

1. **Window functions don't reduce the number of rows** - unlike GROUP BY aggregates
2. **PARTITION BY** divides the result set into groups for the window function
3. **ORDER BY** within OVER determines the order for ranking and frame calculations
4. **Frame specifications** (ROWS/RANGE) control which rows are included in calculations
5. **Ranking functions** handle ties differently (ROW_NUMBER vs RANK vs DENSE_RANK)
6. **LAG/LEAD** are perfect for comparing current row with previous/next rows
7. **Window functions can be combined** with CTEs for complex analytical queries

Window functions are essential for analytical SQL and are supported by most modern databases including PostgreSQL, SQL Server, Oracle, MySQL 8.0+, and SQLite 3.25+.

### Running This Notebook

To run this notebook:
1. Install dependencies: `pip install -r requirements.txt`
2. Start Jupyter: `jupyter notebook`
3. Run all cells in order

The notebook uses an in-memory SQLite database, so all data is temporary and will be lost when you close the notebook.


```python
# Clean up: Close the database connection
conn.close()
print("✅ Database connection closed. Notebook session complete!")
```
