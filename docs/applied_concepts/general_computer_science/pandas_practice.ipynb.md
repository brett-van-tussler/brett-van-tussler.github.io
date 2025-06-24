---
title: "Pandas Practice Tutorial"
description: "A comprehensive guide to pandas with hands-on exercises for data manipulation and analysis"
keywords: ["pandas", "python", "data analysis", "dataframes", "data manipulation"]
---

# Pandas Practice Tutorial

This notebook provides a comprehensive introduction to pandas, Python's most popular data manipulation and analysis library, along with practical exercises to reinforce your learning.

## Table of Contents
1. [Introduction to Pandas](#introduction)
2. [Installation](#installation)
3. [Core Data Structures](#data-structures)
4. [Data Loading and Saving](#data-io)
5. [Data Exploration](#exploration)
6. [Data Cleaning](#cleaning)
7. [Data Manipulation](#manipulation)
8. [Grouping and Aggregation](#grouping)
9. [Merging and Joining](#merging)
10. [Time Series Analysis](#time-series)
11. [Practice Exercises](#exercises)
12. [Additional Resources](#resources)

## Introduction to Pandas {#introduction}

Pandas is a powerful, open-source data analysis and manipulation library built on top of NumPy. It provides data structures and functions needed to work with structured data seamlessly.

### Key Features:
- **DataFrame and Series**: Primary data structures for handling structured data
- **Data Alignment**: Automatic alignment of data based on labels
- **Missing Data Handling**: Robust tools for dealing with missing data
- **Data Import/Export**: Read/write data from various formats (CSV, Excel, JSON, SQL, etc.)
- **Data Transformation**: Powerful tools for reshaping, pivoting, and transforming data
- **Time Series**: Comprehensive time series functionality

## Installation {#installation}

```python
# Install pandas using pip
!pip install pandas

# Install additional dependencies for full functionality
!pip install openpyxl xlrd matplotlib seaborn
```

```python
# Import necessary libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Set display options
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', 50)

print(f"Pandas version: {pd.__version__}")
print(f"NumPy version: {np.__version__}")
```

## Core Data Structures {#data-structures}

### Series
A Series is a one-dimensional labeled array capable of holding any data type.

```python
# Creating a Series
data = [10, 20, 30, 40, 50]
index = ['a', 'b', 'c', 'd', 'e']
series = pd.Series(data, index=index, name='my_series')
print("Series:")
print(series)
print(f"\nData type: {series.dtype}")
print(f"Index: {series.index.tolist()}")
print(f"Values: {series.values}")
```

```python
# Series from dictionary
dict_data = {'apple': 5, 'banana': 3, 'orange': 8, 'grape': 12}
fruit_series = pd.Series(dict_data)
print("\nFruit Series:")
print(fruit_series)
```

### DataFrame
A DataFrame is a two-dimensional labeled data structure with columns of potentially different types.

```python
# Creating a DataFrame from dictionary
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Age': [25, 30, 35, 28, 32],
    'City': ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'],
    'Salary': [50000, 60000, 70000, 55000, 65000],
    'Department': ['IT', 'Finance', 'IT', 'HR', 'Finance']
}

df = pd.DataFrame(data)
print("DataFrame:")
print(df)
print(f"\nShape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(f"Index: {df.index.tolist()}")
```

```python
# DataFrame info
print("\nDataFrame Info:")
print(df.info())
print("\nData Types:")
print(df.dtypes)
```

## Data Loading and Saving {#data-io}

```python
# Create sample data for demonstration
sample_data = {
    'product_id': range(1, 101),
    'product_name': [f'Product_{i}' for i in range(1, 101)],
    'category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home'], 100),
    'price': np.random.uniform(10, 500, 100).round(2),
    'quantity_sold': np.random.randint(1, 100, 100),
    'rating': np.random.uniform(1, 5, 100).round(1),
    'date_sold': pd.date_range('2023-01-01', periods=100, freq='D')
}

products_df = pd.DataFrame(sample_data)
print("Sample Products DataFrame:")
print(products_df.head())
```

```python
# Save to CSV
products_df.to_csv('products.csv', index=False)
print("Data saved to products.csv")

# Read from CSV
loaded_df = pd.read_csv('products.csv')
print("\nLoaded DataFrame:")
print(loaded_df.head())
```

```python
# Other file formats
# Save to Excel
products_df.to_excel('products.xlsx', index=False, sheet_name='Products')

# Save to JSON
products_df.to_json('products.json', orient='records', date_format='iso')

# Read from JSON
json_df = pd.read_json('products.json')
print("\nJSON DataFrame shape:", json_df.shape)
```

## Data Exploration {#exploration}

```python
# Basic exploration methods
print("First 5 rows:")
print(products_df.head())

print("\nLast 5 rows:")
print(products_df.tail())

print("\nRandom sample:")
print(products_df.sample(3))
```

```python
# Statistical summary
print("Statistical Summary:")
print(products_df.describe())

print("\nValue counts for category:")
print(products_df['category'].value_counts())

print("\nUnique values in category:")
print(products_df['category'].unique())
print(f"Number of unique categories: {products_df['category'].nunique()}")
```

```python
# Data selection and indexing
print("Select single column:")
print(products_df['product_name'].head())

print("\nSelect multiple columns:")
print(products_df[['product_name', 'price', 'category']].head())

print("\nSelect rows by index:")
print(products_df.iloc[0:3])  # First 3 rows

print("\nSelect rows by condition:")
expensive_products = products_df[products_df['price'] > 400]
print(f"Products with price > 400: {len(expensive_products)}")
print(expensive_products[['product_name', 'price']].head())
```

## Data Cleaning {#cleaning}

```python
# Create data with missing values for demonstration
clean_data = products_df.copy()
# Introduce some missing values
clean_data.loc[5:10, 'rating'] = np.nan
clean_data.loc[15:20, 'price'] = np.nan
clean_data.loc[25, 'category'] = np.nan

print("Missing values:")
print(clean_data.isnull().sum())

print("\nPercentage of missing values:")
print((clean_data.isnull().sum() / len(clean_data) * 100).round(2))
```

```python
# Handling missing values
# Drop rows with any missing values
clean_df_dropped = clean_data.dropna()
print(f"Original shape: {clean_data.shape}")
print(f"After dropping NaN: {clean_df_dropped.shape}")

# Fill missing values
clean_df_filled = clean_data.copy()
clean_df_filled['rating'].fillna(clean_df_filled['rating'].mean(), inplace=True)
clean_df_filled['price'].fillna(clean_df_filled['price'].median(), inplace=True)
clean_df_filled['category'].fillna('Unknown', inplace=True)

print("\nAfter filling missing values:")
print(clean_df_filled.isnull().sum())
```

```python
# Remove duplicates
print(f"Original shape: {clean_df_filled.shape}")
clean_df_no_duplicates = clean_df_filled.drop_duplicates()
print(f"After removing duplicates: {clean_df_no_duplicates.shape}")

# Data type conversion
print("\nData types before conversion:")
print(clean_df_filled.dtypes)

# Convert date column to datetime
clean_df_filled['date_sold'] = pd.to_datetime(clean_df_filled['date_sold'])
print("\nData types after conversion:")
print(clean_df_filled.dtypes)
```

## Data Manipulation {#manipulation}

```python
# Adding new columns
df_manipulated = clean_df_filled.copy()
df_manipulated['revenue'] = df_manipulated['price'] * df_manipulated['quantity_sold']
df_manipulated['price_category'] = pd.cut(df_manipulated['price'], 
                                         bins=[0, 50, 150, 300, 500], 
                                         labels=['Low', 'Medium', 'High', 'Premium'])

print("DataFrame with new columns:")
print(df_manipulated[['product_name', 'price', 'quantity_sold', 'revenue', 'price_category']].head())
```

```python
# Sorting data
print("Top 5 products by revenue:")
top_revenue = df_manipulated.nlargest(5, 'revenue')
print(top_revenue[['product_name', 'price', 'quantity_sold', 'revenue']])

print("\nSorted by price (descending):")
sorted_by_price = df_manipulated.sort_values('price', ascending=False)
print(sorted_by_price[['product_name', 'price']].head())
```

```python
# String operations
print("String operations:")
df_manipulated['product_name_upper'] = df_manipulated['product_name'].str.upper()
df_manipulated['product_name_length'] = df_manipulated['product_name'].str.len()
df_manipulated['contains_product'] = df_manipulated['product_name'].str.contains('Product')

print(df_manipulated[['product_name', 'product_name_upper', 'product_name_length', 'contains_product']].head())
```

## Grouping and Aggregation {#grouping}

```python
# Group by category
category_stats = df_manipulated.groupby('category').agg({
    'price': ['mean', 'min', 'max'],
    'quantity_sold': 'sum',
    'revenue': ['sum', 'mean'],
    'rating': 'mean'
}).round(2)

print("Statistics by category:")
print(category_stats)
```

```python
# Multiple grouping
price_category_stats = df_manipulated.groupby(['category', 'price_category']).agg({
    'revenue': 'sum',
    'quantity_sold': 'mean',
    'rating': 'mean'
}).round(2)

print("\nStatistics by category and price category:")
print(price_category_stats)
```

```python
# Pivot tables
pivot_table = df_manipulated.pivot_table(
    values='revenue',
    index='category',
    columns='price_category',
    aggfunc='sum',
    fill_value=0
)

print("\nPivot table - Revenue by Category and Price Category:")
print(pivot_table)
```

## Merging and Joining {#merging}

```python
# Create additional DataFrames for merging
suppliers = pd.DataFrame({
    'product_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'supplier_name': ['Supplier_A', 'Supplier_B', 'Supplier_A', 'Supplier_C', 'Supplier_B',
                     'Supplier_A', 'Supplier_C', 'Supplier_B', 'Supplier_A', 'Supplier_C'],
    'supplier_country': ['USA', 'Germany', 'USA', 'Japan', 'Germany',
                        'USA', 'Japan', 'Germany', 'USA', 'Japan']
})

print("Suppliers DataFrame:")
print(suppliers)
```

```python
# Merge DataFrames
merged_df = pd.merge(df_manipulated, suppliers, on='product_id', how='left')
print("\nMerged DataFrame (first 10 rows):")
print(merged_df[['product_name', 'category', 'price', 'supplier_name', 'supplier_country']].head(10))

print(f"\nOriginal shape: {df_manipulated.shape}")
print(f"Merged shape: {merged_df.shape}")
```

```python
# Different types of joins
inner_join = pd.merge(df_manipulated, suppliers, on='product_id', how='inner')
outer_join = pd.merge(df_manipulated, suppliers, on='product_id', how='outer')

print(f"Inner join shape: {inner_join.shape}")
print(f"Outer join shape: {outer_join.shape}")
print(f"Left join shape: {merged_df.shape}")
```

## Time Series Analysis {#time-series}

```python
# Time series operations
df_time = merged_df.copy()
df_time['date_sold'] = pd.to_datetime(df_time['date_sold'])
df_time.set_index('date_sold', inplace=True)

print("Time series DataFrame:")
print(df_time.head())
```

```python
# Resample data by month
monthly_sales = df_time.resample('M').agg({
    'revenue': 'sum',
    'quantity_sold': 'sum',
    'price': 'mean'
}).round(2)

print("\nMonthly sales summary:")
print(monthly_sales)
```

```python
# Rolling statistics
df_time['revenue_7day_avg'] = df_time['revenue'].rolling(window=7).mean()
df_time['revenue_cumsum'] = df_time['revenue'].cumsum()

print("\nTime series with rolling statistics:")
print(df_time[['revenue', 'revenue_7day_avg', 'revenue_cumsum']].head(10))
```

## Practice Exercises {#exercises}

### Exercise 1: Sales Analysis
**Task**: Analyze the sales data to answer the following questions:

```python
# Exercise 1 - Sales Analysis
print("=== EXERCISE 1: SALES ANALYSIS ===")
print("\nYour tasks:")
print("1. Find the top 3 categories by total revenue")
print("2. Calculate the average rating for each price category")
print("3. Identify products with rating above 4.5 and price below 100")
print("4. Create a summary showing total quantity sold by supplier country")

# Solution space - try to solve before looking at the solution
def exercise_1_solution():
    # Task 1: Top 3 categories by total revenue
    top_categories = merged_df.groupby('category')['revenue'].sum().nlargest(3)
    print("\n1. Top 3 categories by total revenue:")
    print(top_categories)
    
    # Task 2: Average rating by price category
    avg_rating_by_price = merged_df.groupby('price_category')['rating'].mean().round(2)
    print("\n2. Average rating by price category:")
    print(avg_rating_by_price)
    
    # Task 3: High-rated, low-priced products
    high_rated_low_price = merged_df[(merged_df['rating'] > 4.5) & (merged_df['price'] < 100)]
    print(f"\n3. Products with rating > 4.5 and price < 100: {len(high_rated_low_price)} products")
    if len(high_rated_low_price) > 0:
        print(high_rated_low_price[['product_name', 'price', 'rating']].head())
    
    # Task 4: Quantity sold by supplier country
    qty_by_country = merged_df.groupby('supplier_country')['quantity_sold'].sum().sort_values(ascending=False)
    print("\n4. Total quantity sold by supplier country:")
    print(qty_by_country)

# Uncomment to see the solution
# exercise_1_solution()
```

### Exercise 2: Data Transformation
**Task**: Transform and clean the data according to specifications:

```python
# Exercise 2 - Data Transformation
print("\n=== EXERCISE 2: DATA TRANSFORMATION ===")
print("\nYour tasks:")
print("1. Create a new column 'profit_margin' assuming 30% profit margin")
print("2. Categorize products as 'Bestseller' (quantity_sold > 75) or 'Regular'")
print("3. Create a pivot table showing average price by category and price_category")
print("4. Find the month with the highest total revenue")

def exercise_2_solution():
    df_ex2 = merged_df.copy()
    
    # Task 1: Profit margin
    df_ex2['profit_margin'] = df_ex2['price'] * 0.30
    print("\n1. Added profit_margin column")
    print(df_ex2[['product_name', 'price', 'profit_margin']].head())
    
    # Task 2: Bestseller categorization
    df_ex2['sales_category'] = df_ex2['quantity_sold'].apply(lambda x: 'Bestseller' if x > 75 else 'Regular')
    print("\n2. Sales category distribution:")
    print(df_ex2['sales_category'].value_counts())
    
    # Task 3: Pivot table
    price_pivot = df_ex2.pivot_table(
        values='price',
        index='category',
        columns='price_category',
        aggfunc='mean'
    ).round(2)
    print("\n3. Average price by category and price category:")
    print(price_pivot)
    
    # Task 4: Month with highest revenue
    df_ex2['month'] = pd.to_datetime(df_ex2['date_sold']).dt.to_period('M')
    monthly_revenue = df_ex2.groupby('month')['revenue'].sum()
    highest_month = monthly_revenue.idxmax()
    highest_revenue = monthly_revenue.max()
    print(f"\n4. Month with highest revenue: {highest_month} (${highest_revenue:,.2f})")

# Uncomment to see the solution
# exercise_2_solution()
```

### Exercise 3: Advanced Analysis
**Task**: Perform advanced data analysis:

```python
# Exercise 3 - Advanced Analysis
print("\n=== EXERCISE 3: ADVANCED ANALYSIS ===")
print("\nYour tasks:")
print("1. Calculate correlation between price and rating")
print("2. Find the supplier with the highest average product rating")
print("3. Create a time series showing daily revenue trend")
print("4. Identify outliers in the price column using IQR method")

def exercise_3_solution():
    # Task 1: Correlation between price and rating
    correlation = merged_df['price'].corr(merged_df['rating'])
    print(f"\n1. Correlation between price and rating: {correlation:.3f}")
    
    # Task 2: Supplier with highest average rating
    supplier_ratings = merged_df.groupby('supplier_name')['rating'].mean().sort_values(ascending=False)
    print("\n2. Suppliers by average product rating:")
    print(supplier_ratings)
    
    # Task 3: Daily revenue trend
    daily_revenue = merged_df.groupby('date_sold')['revenue'].sum()
    print("\n3. Daily revenue trend (first 10 days):")
    print(daily_revenue.head(10))
    
    # Task 4: Price outliers using IQR
    Q1 = merged_df['price'].quantile(0.25)
    Q3 = merged_df['price'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = merged_df[(merged_df['price'] < lower_bound) | (merged_df['price'] > upper_bound)]
    print(f"\n4. Price outliers (IQR method): {len(outliers)} products")
    print(f"   Lower bound: ${lower_bound:.2f}, Upper bound: ${upper_bound:.2f}")
    if len(outliers) > 0:
        print("   Outlier products:")
        print(outliers[['product_name', 'price']].head())

# Uncomment to see the solution
# exercise_3_solution()
```

## Visualization with Pandas {#visualization}

```python
# Basic plotting with pandas
import matplotlib.pyplot as plt

# Set up the plotting style
plt.style.use('default')
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# 1. Revenue by category
category_revenue = merged_df.groupby('category')['revenue'].sum()
category_revenue.plot(kind='bar', ax=axes[0,0], title='Total Revenue by Category')
axes[0,0].set_ylabel('Revenue ($)')
axes[0,0].tick_params(axis='x', rotation=45)

# 2. Price distribution
merged_df['price'].hist(bins=20, ax=axes[0,1], title='Price Distribution')
axes[0,1].set_xlabel('Price ($)')
axes[0,1].set_ylabel('Frequency')

# 3. Rating vs Price scatter plot
merged_df.plot.scatter(x='price', y='rating', ax=axes[1,0], title='Rating vs Price')
axes[1,0].set_xlabel('Price ($)')
axes[1,0].set_ylabel('Rating')

# 4. Daily revenue trend
daily_revenue = merged_df.groupby('date_sold')['revenue'].sum()
daily_revenue.plot(ax=axes[1,1], title='Daily Revenue Trend')
axes[1,1].set_xlabel('Date')
axes[1,1].set_ylabel('Revenue ($)')
axes[1,1].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

print("Visualization plots created successfully!")
```

## Performance Tips {#performance}

```python
# Performance tips for pandas
print("=== PANDAS PERFORMANCE TIPS ===")

# 1. Use vectorized operations instead of loops
import time

# Slow way (using loops)
start_time = time.time()
result_slow = []
for price in merged_df['price']:
    result_slow.append(price * 1.1)
slow_time = time.time() - start_time

# Fast way (vectorized)
start_time = time.time()
result_fast = merged_df['price'] * 1.1
fast_time = time.time() - start_time

print(f"Loop method time: {slow_time:.6f} seconds")
print(f"Vectorized method time: {fast_time:.6f} seconds")
print(f"Speedup: {slow_time/fast_time:.1f}x faster")

# 2. Use appropriate data types
print("\n2. Memory usage optimization:")
print(f"Original memory usage: {merged_df.memory_usage(deep=True).sum() / 1024:.2f} KB")

# Optimize data types
df_optimized = merged_df.copy()
df_optimized['product_id'] = df_optimized['product_id'].astype('int16')
df_optimized['quantity_sold'] = df_optimized['quantity_sold'].astype('int8')
df_optimized['category'] = df_optimized['category'].astype('category')
df_optimized['supplier_name'] = df_optimized['supplier_name'].astype('category')

print(f"Optimized memory usage: {df_optimized.memory_usage(deep=True).sum() / 1024:.2f} KB")
print(f"Memory reduction: {(1 - df_optimized.memory_usage(deep=True).sum() / merged_df.memory_usage(deep=True).sum()) * 100:.1f}%")

# 3. Use query() for complex filtering
print("\n3. Query method for filtering:")
# Traditional filtering
filtered_traditional = merged_df[(merged_df['price'] > 100) & (merged_df['rating'] > 4.0) & (merged_df['category'] == 'Electronics')]

# Using query (more readable)
filtered_query = merged_df.query('price > 100 and rating > 4.0 and category == "Electronics"')

print(f"Traditional filtering result: {len(filtered_traditional)} rows")
print(f"Query method result: {len(filtered_query)} rows")
print("Query method is more readable and often faster for complex conditions")
```

## Common Pitfalls and Best Practices {#best-practices}

```python
print("=== COMMON PITFALLS AND BEST PRACTICES ===")

# 1. Chained assignment warning
print("1. Avoiding chained assignment:")
# Bad practice (may cause SettingWithCopyWarning)
# df_subset = merged_df[merged_df['price'] > 100]
# df_subset['new_column'] = 'value'  # This might not work as expected

# Good practice
df_subset = merged_df[merged_df['price'] > 100].copy()
df_subset['new_column'] = 'value'
print("Use .copy() when creating subsets that you plan to modify")

# 2. Efficient string operations
print("\n2. Efficient string operations:")
# Use vectorized string methods
product_names_upper = merged_df['product_name'].str.upper()
print("Use .str accessor for vectorized string operations")

# 3. Memory-efficient iteration
print("\n3. Memory-efficient iteration:")
# Use itertuples() instead of iterrows() for better performance
print("Use itertuples() instead of iterrows() for iteration")
for row in merged_df.head(3).itertuples():
    print(f"Product {row.product_id}: {row.product_name} - ${row.price}")

# 4. Proper handling of missing data
print("\n4. Missing data best practices:")
print("- Always check for missing data before analysis")
print("- Choose appropriate strategy: drop, fill, or interpolate")
print("- Document your missing data handling decisions")

# 5. Index usage
print("\n5. Efficient index usage:")
print("- Set meaningful indexes for faster lookups")
print("- Use .loc and .iloc for explicit indexing")
print("- Reset index when necessary to avoid confusion")
```

## Additional Resources {#resources}

### Official Documentation
- [Pandas Official Documentation](https://pandas.pydata.org/docs/)
- [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [Pandas Cookbook](https://pandas.pydata.org/docs/user_guide/cookbook.html)

### Recommended Books
- "Python for Data Analysis" by Wes McKinney (creator of pandas)
- "Pandas in Action" by Boris Paskhaver
- "Effective Pandas" by Matt Harrison

### Online Resources
- [Kaggle Learn - Pandas Course](https://www.kaggle.com/learn/pandas)
- [DataCamp Pandas Tutorials](https://www.datacamp.com/tutorial/pandas)
- [Real Python Pandas Tutorials](https://realpython.com/pandas-python-explore-dataset/)

### Practice Datasets
- [Kaggle Datasets](https://www.kaggle.com/datasets)
- [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php)
- [FiveThirtyEight Data](https://github.com/fivethirtyeight/data)
- [Our World in Data](https://ourworldindata.org/)

### Advanced Topics to Explore
1. **Multi-indexing**: Working with hierarchical indexes
2. **Categorical Data**: Efficient handling of categorical variables
3. **Time Series**: Advanced time series analysis and forecasting
4. **Performance Optimization**: Using Dask for larger-than-memory datasets
5. **Integration**: Working with SQL databases, APIs, and other data sources

## Summary

This tutorial covered the essential aspects of pandas:

✅ **Core Concepts**: Series and DataFrame structures
✅ **Data I/O**: Reading and writing various file formats
✅ **Data Exploration**: Basic statistics and data inspection
✅ **Data Cleaning**: Handling missing values and duplicates
✅ **Data Manipulation**: Filtering, sorting, and transforming data
✅ **Grouping & Aggregation**: Summarizing data by groups
✅ **Merging & Joining**: Combining multiple datasets
✅ **Time Series**: Working with temporal data
✅ **Performance**: Optimization techniques and best practices

### Next Steps
1. Practice with real datasets from Kaggle or other sources
2. Explore advanced pandas features like multi-indexing
3. Learn complementary libraries (NumPy, Matplotlib, Seaborn)
4. Consider Dask for big data scenarios
5. Integrate pandas with machine learning workflows

Remember: The key to mastering pandas is practice! Start with small datasets and gradually work your way up to more complex analyses.

---

*Happy data analyzing! 🐼📊*