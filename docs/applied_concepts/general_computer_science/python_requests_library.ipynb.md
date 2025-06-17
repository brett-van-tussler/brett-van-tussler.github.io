# Python Requests Library Tutorial

This comprehensive tutorial covers the Python `requests` library, one of the most popular libraries for making HTTP requests in Python. You'll learn everything from basic GET requests to advanced features like authentication, sessions, and concurrent requests.

## Table of Contents

1. [Installation and Basic Setup](#installation)
2. [Basic HTTP Methods](#basic-methods)
3. [Working with Headers](#headers)
4. [Authentication](#authentication)
5. [Sessions and Cookies](#sessions)
6. [Error Handling](#error-handling)
7. [Working with JSON](#json)
8. [File Operations](#files)
9. [Advanced Features](#advanced)
10. [Practice Questions](#practice)

---

## Installation and Basic Setup {#installation}

First, let's install the requests library and import it:


```python
# Install requests (run this in terminal or uncomment the line below)
# !pip install requests

import requests
import json
from pprint import pprint

print(f"Requests version: {{requests.__version__}}")
```

    Requests version: 2.32.4


## Basic HTTP Methods {#basic-methods}

The requests library supports all major HTTP methods. Let's start with the most common ones:

### GET Requests

GET requests are used to retrieve data from a server:


```python
# Basic GET request
response = requests.get('https://httpbin.org/get')

print(f"Status Code: {{response.status_code}}")
print(f"Content Type: {{response.headers['content-type']}}")
print(f"Response Text (first 200 chars): {{response.text[:200]}}...")
```

    Status Code: 200
    Content Type: application/json
    Response Text (first 200 chars): \{
      "args": \{\}, 
      "headers": \{
        "Accept": "*/*", 
        "Accept-Encoding": "gzip, deflate, br, zstd", 
        "Host": "httpbin.org", 
        "User-Agent": "python-requests/2.32.4", 
        "X-Amzn-Trace-Id":...



```python
# GET request with query parameters
params = {
    'name': 'John Doe',
    'age': 30,
    'city': 'New York'
}

response = requests.get('https://httpbin.org/get', params=params)
data = response.json()

print("Query parameters sent:")
pprint(data['args'])
```

### POST Requests

POST requests are used to send data to a server:


```python
# POST request with form data
form_data = {
    'username': 'johndoe',
    'password': 'secretpassword',
    'email': 'john@example.com'
}

response = requests.post('https://httpbin.org/post', data=form_data)
result = response.json()

print("Form data sent:")
pprint(result['form'])
```


```python
# POST request with JSON data
json_data = {
    'user': {
        'name': 'Jane Smith',
        'email': 'jane@example.com',
        'preferences': {
            'theme': 'dark',
            'notifications': True
        }
    }
}

response = requests.post('https://httpbin.org/post', json=json_data)
result = response.json()

print("JSON data sent:")
pprint(result['json'])
```

### Other HTTP Methods

The requests library supports all HTTP methods:


```python
# PUT request (update resource)
put_data = {'name': 'Updated Name', 'status': 'active'}
put_response = requests.put('https://httpbin.org/put', json=put_data)
print(f"PUT Status: {{put_response.status_code}}")

delete_response = requests.delete('https://httpbin.org/delete')
print(f"DELETE Status: {{delete_response.status_code}}")

# PATCH request
patch_data = {'status': 'inactive'}
patch_response = requests.patch('https://httpbin.org/patch', json=patch_data)
print(f"PATCH Status: {{patch_response.status_code}}")
```

## Working with Headers {#headers}

Headers provide metadata about the request and response:


```python
# Custom headers
headers = {
    'User-Agent': 'My Python App 1.0',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Custom-Header': 'CustomValue'
}

response = requests.get('https://httpbin.org/headers', headers=headers)
result = response.json()

print("Headers sent:")
pprint(result['headers'])
```


```python
# Examining response headers
response = requests.get('https://httpbin.org/get')

print("Response Headers:")
for header, value in response.headers.items():
    print(f"{{header}}: {{value}}")
```

## Authentication {#authentication}

The requests library supports various authentication methods:

### Basic Authentication

HTTP Basic Authentication sends credentials in the Authorization header:


```python
from requests.auth import HTTPBasicAuth

# Method 1: Using HTTPBasicAuth
response1 = requests.get(
    'https://httpbin.org/basic-auth/user/pass',
    auth=HTTPBasicAuth('user', 'pass')
)

# Method 2: Using tuple (shorthand)
response2 = requests.get(
    'https://httpbin.org/basic-auth/user/pass',
    auth=('user', 'pass')
)

print(f"Basic Auth Status: {{response1.status_code}}")
print(f"Authenticated user: {{response1.json()['authenticated']}}")
print(f"User: {{response1.json()['user']}}")
```

### Bearer Token Authentication

Many modern APIs use Bearer tokens for authentication:


```python
# Bearer token authentication
token = 'your-api-token-here'

headers = {
    'Authorization': f'Bearer {{token}}',
    'Content-Type': 'application/json'
}

# Simulate API call with bearer token
response = requests.get('https://httpbin.org/bearer', headers=headers)

if response.status_code == 200:
    print("✅ Bearer token authentication successful")
    pprint(response.json())
else:
    print(f"❌ Authentication failed: {{response.status_code}}")
```

## Sessions and Cookies {#sessions}

Sessions allow you to persist certain parameters across requests and automatically handle cookies:


```python
# Creating a session
session = requests.Session()

# Set default headers for all requests in this session
session.headers.update({
    'User-Agent': 'My Session App 1.0',
    'Accept': 'application/json'
})

# Make requests using the session
response1 = session.get('https://httpbin.org/cookies/set/session_id/12345')
response2 = session.get('https://httpbin.org/cookies')

print("Cookies in session:")
pprint(response2.json()['cookies'])

# Close the session when done
session.close()
```


```python
# Using session as context manager (recommended)
with requests.Session() as session:
    # Set authentication for all requests
    session.auth = ('user', 'pass')
    
    # Set common headers
    session.headers.update({'X-API-Version': '2.0'})
    
    # Make multiple requests
    response1 = session.get('https://httpbin.org/get')
    response2 = session.post('https://httpbin.org/post', json={'data': 'test'})
    
    print(f"Request 1 status: {{response1.status_code}}")
    print(f"Request 2 status: {{response2.status_code}}")
    
# Session is automatically closed here
```

## Error Handling {#error-handling}

Proper error handling is crucial when working with HTTP requests:


```python
import requests
from requests.exceptions import RequestException, Timeout, ConnectionError

def safe_request(url, **kwargs):
    """Make a safe HTTP request with comprehensive error handling."""
    try:
        response = requests.get(url, timeout=5, **kwargs)
        
        # Raise an exception for bad status codes
        response.raise_for_status()
        
        return {
            'success': True,
            'data': response.json() if 'application/json' in response.headers.get('content-type', '') else response.text,
            'status_code': response.status_code
        }
        
    except Timeout:
        return {'success': False, 'error': 'Request timed out'}
        
    except ConnectionError:
        return {'success': False, 'error': 'Connection error'}
        
    except requests.exceptions.HTTPError as e:
        return {'success': False, 'error': f'HTTP error: {e}'}
        
    except RequestException as e:
        return {'success': False, 'error': f'Request error: {e}'}
        
    except ValueError as e:
        return {'success': False, 'error': f'JSON decode error: {e}'}

# Test the safe request function
print("Testing successful request:")
result1 = safe_request('https://httpbin.org/get')
print(f"Success: {{result1['success']}}")

print("\nTesting 404 error:")
result2 = safe_request('https://httpbin.org/status/404')
print(f"Success: {{result2['success']}}")
print(f"Error: {{result2['error']}}")

print("\nTesting timeout:")
result3 = safe_request('https://httpbin.org/delay/10', timeout=2)
print(f"Success: {{result3['success']}}")
print(f"Error: {{result3['error']}}")
```

## Working with JSON {#json}

JSON is the most common data format for web APIs:


```python
# Working with JSON responses
response = requests.get('https://jsonplaceholder.typicode.com/posts/1')

if response.status_code == 200:
    # Parse JSON response
    post = response.json()
    
    print("Post details:")
    print(f"Title: {{post['title']}}")
    print(f"User ID: {{post['userId']}}")
    print(f"Body: {{post['body'][:100]}}...")
else:
    print(f"Error: {{response.status_code}}")
```


```python
# Sending JSON data
new_post = {
    'title': 'My New Post',
    'body': 'This is the content of my new post.',
    'userId': 1
}

response = requests.post(
    'https://jsonplaceholder.typicode.com/posts',
    json=new_post  # This automatically sets Content-Type to application/json
)

if response.status_code == 201:
    created_post = response.json()
    print(f"✅ Post created with ID: {{created_post['id']}}")
    print(f"Title: {{created_post['title']}}")
else:
    print(f"❌ Failed to create post: {{response.status_code}}")
```

## File Operations {#files}

The requests library makes it easy to download and upload files:

### Downloading Files

Here's how to download files efficiently:


```python
import os

def download_file(url, filename):
    """Download a file from URL and save it locally."""
    try:
        # Use stream=True for large files to avoid loading everything into memory
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Get file size if available
        total_size = int(response.headers.get('content-length', 0))
        
        with open(filename, 'wb') as file:
            downloaded = 0
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    file.write(chunk)
                    downloaded += len(chunk)
                    
                    # Show progress for large files
                    if total_size &gt; 0:
                        percent = (downloaded / total_size) * 100
                        print(f"\rDownloading: {{percent:.1f}}%", end='', flush=True)
                    
        print(f"\n✅ Downloaded {{filename}} ({{downloaded}} bytes)")
        
    except Exception as e:
        print(f"❌ Download failed: {{e}}")
        return False

# Example: Download a small image
image_url = 'https://httpbin.org/image/png'
success = download_file(image_url, 'sample_image.png')

if success and os.path.exists('sample_image.png'):
    file_size = os.path.getsize('sample_image.png')
    print(f"File saved successfully: {{file_size}} bytes")
```

### Uploading Files

Here's how to upload files to a server:


```python
# Create a sample text file to upload
sample_content = """This is a sample file for upload testing.
It contains multiple lines of text.
Created by the Python requests tutorial."""

with open('sample_upload.txt', 'w') as f:
    f.write(sample_content)

# Upload the file
with open('sample_upload.txt', 'rb') as file:
    files = {'file': ('sample_upload.txt', file, 'text/plain')}
    
    # Additional form data
    data = {
        'description': 'Sample file upload',
        'category': 'test'
    }
    
    response = requests.post('https://httpbin.org/post', files=files, data=data)

if response.status_code == 200:
    result = response.json()
    print("✅ File uploaded successfully!")
    print(f"Filename: {{result['files']['file'][:50]}}...")
    print(f"Form data: {{result['form']}}")
else:
    print(f"❌ Upload failed: {{response.status_code}}")

# Clean up
import os
if os.path.exists('sample_upload.txt'):
    os.remove('sample_upload.txt')
if os.path.exists('sample_image.png'):
    os.remove('sample_image.png')
```

## Advanced Features {#advanced}

Let's explore some advanced features of the requests library:

### Timeouts and Retries

Always set timeouts and implement retry logic for production applications:


```python
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

def create_session_with_retries():
    """Create a session with automatic retries."""
    session = requests.Session()
    
    # Define retry strategy
    retry_strategy = Retry(
        total=3,  # Total number of retries
        backoff_factor=1,  # Wait time between retries
        status_forcelist=[429, 500, 502, 503, 504],  # HTTP status codes to retry
        method_whitelist=["HEAD", "GET", "OPTIONS"]  # HTTP methods to retry
    )
    
    # Mount adapter with retry strategy
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    return session

# Test the retry mechanism
session = create_session_with_retries()

try:
    # This will retry automatically on failure
    response = session.get('https://httpbin.org/status/500', timeout=5)
    print(f"Response status: {{response.status_code}}")
except Exception as e:
    print(f"Request failed after retries: {{e}}")

session.close()
```

### Concurrent Requests

For better performance, you can make multiple requests concurrently:


```python
import concurrent.futures
import time

def fetch_url(url):
    """Fetch a single URL and return the result."""
    try:
        response = requests.get(url, timeout=5)
        return {
            'url': url,
            'status': response.status_code,
            'size': len(response.content),
            'success': True
        }
    except Exception as e:
        return {
            'url': url,
            'error': str(e),
            'success': False
        }

# URLs to fetch concurrently
urls = [
    'https://httpbin.org/delay/1',
    'https://httpbin.org/delay/2',
    'https://httpbin.org/get',
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
]

# Sequential requests (for comparison)
start_time = time.time()
sequential_results = []
for url in urls:
    result = fetch_url(url)
    sequential_results.append(result)
sequential_time = time.time() - start_time

print(f"Sequential requests took: {{sequential_time:.2f}} seconds")

# Concurrent requests
start_time = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    concurrent_results = list(executor.map(fetch_url, urls))
concurrent_time = time.time() - start_time

print(f"Concurrent requests took: {{concurrent_time:.2f}} seconds")
print(f"Speed improvement: {{sequential_time/concurrent_time:.1f}}x faster")

# Show results
print("\nResults:")
for result in concurrent_results:
    if result['success']:
        print(f"✅ {{result['url']}}: {{result['status']}} ({{result['size']}} bytes)")
    else:
        print(f"❌ {{result['url']}}: {{result['error']}}")
```

## Practice Questions {#practice}

Now let's test your understanding with some practice questions!

### Question 1: Basic API Interaction

Create a function that fetches user information from the JSONPlaceholder API and returns a formatted string with the user's name, email, and company name.

**Requirements:**
- Use the endpoint: `https://jsonplaceholder.typicode.com/users/{user_id}`
- Handle errors gracefully
- Return a formatted string like: "John Doe (john@example.com) works at ACME Corp"

&lt;details&gt;
&lt;summary&gt;💡 Click for hint&lt;/summary&gt;

```python
def get_user_info(user_id):
    url = f"https://jsonplaceholder.typicode.com/users/{{user_id}}"
    # Your code here
    # 1. Make GET request
    # 2. Check status code
    # 3. Parse JSON
    # 4. Extract name, email, company.name
    # 5. Return formatted string
```

&lt;/details&gt;


```python
# Your solution here
def get_user_info(user_id):
    # Write your code here
    pass

# Test your function
# result = get_user_info(1)
# print(result)
```


```python
# Solution
def get_user_info(user_id):
    try:
        url = f"https://jsonplaceholder.typicode.com/users/{{user_id}}"
        response = requests.get(url)
        response.raise_for_status()
        
        user = response.json()
        name = user['name']
        email = user['email']
        company = user['company']['name']
        
        return f"{{name}} ({{email}}) works at {{company}}"
        
    except requests.exceptions.RequestException as e:
        return f"Error fetching user data: {{e}}"
    except KeyError as e:
        return f"Missing data in response: {{e}}"

# Test the solution
result = get_user_info(1)
print(result)
```

### Question 2: POST Request with Authentication

Create a function that simulates creating a new post with authentication. The function should:

**Requirements:**
- Accept title, body, and user_id as parameters
- Use Bearer token authentication
- Send data as JSON
- Return the created post's ID if successful
- Use endpoint: `https://jsonplaceholder.typicode.com/posts`

&lt;details&gt;
&lt;summary&gt;💡 Click for hint&lt;/summary&gt;

```python
def create_post(title, body, user_id, token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    data = {
        # Your data structure here
    }
    # Make POST request and handle response
```

&lt;/details&gt;


```python
# Your solution here
def create_post(title, body, user_id, token):
    # Write your code here
    pass

# Test your function
# result = create_post("Test Title", "Test Body", 1, "fake-token")
# print(result)
```


```python
# Solution
def create_post(title, body, user_id, token):
    try:
        url = "https://jsonplaceholder.typicode.com/posts"
        
        headers = {
            'Authorization': f'Bearer {{token}}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'title': title,
            'body': body,
            'userId': user_id
        }
        
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        
        post = response.json()
        return f"Post created successfully with ID: {{post['id']}}"
        
    except requests.exceptions.RequestException as e:
        return f"Error creating post: {{e}}"

# Test the solution
result = create_post("My Test Post", "This is a test post body", 1, "fake-token-123")
print(result)
```

### Question 3: Session-based API Client

Create a simple API client class that uses sessions to maintain state across requests.

**Requirements:**
- Use a session for all requests
- Set a default User-Agent header
- Implement methods for GET and POST
- Include proper error handling
- Add a close method to clean up the session

&lt;details&gt;
&lt;summary&gt;💡 Click for hint&lt;/summary&gt;

```python
class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        # Set default headers
        
    def get(self, endpoint):
        # Implement GET method
        
    def post(self, endpoint, data=None):
        # Implement POST method
        
    def close(self):
        # Close session
```

&lt;/details&gt;


```python
# Your solution here
class APIClient:
    def __init__(self, base_url):
        # Write your code here
        pass
    
    def get(self, endpoint):
        # Write your code here
        pass
    
    def post(self, endpoint, data=None):
        # Write your code here
        pass
    
    def close(self):
        # Write your code here
        pass

# Test your class
# client = APIClient('https://jsonplaceholder.typicode.com')
# result = client.get('/posts/1')
# print(result)
# client.close()
```


```python
# Solution
class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        
        # Set default headers
        self.session.headers.update({
            'User-Agent': 'Python APIClient 1.0',
            'Accept': 'application/json'
        })
    
    def get(self, endpoint):
        try:
            url = f"{{self.base_url}}{{endpoint}}"
            response = self.session.get(url)
            response.raise_for_status()
            
            return {
                'success': True,
                'data': response.json(),
                'status_code': response.status_code
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def post(self, endpoint, data=None):
        try:
            url = f"{{self.base_url}}{{endpoint}}"
            response = self.session.post(url, json=data)
            response.raise_for_status()
            
            return {
                'success': True,
                'data': response.json(),
                'status_code': response.status_code
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def close(self):
        self.session.close()

# Test the solution
client = APIClient('https://jsonplaceholder.typicode.com')

# Test GET request
result1 = client.get('/posts/1')
if result1['success']:
    print(f"✅ GET request: {{result1['data']['title']}}")

# Test POST request
post_data = {'title': 'Test Post', 'body': 'Test content', 'userId': 1}
result2 = client.post('/posts', data=post_data)
if result2['success']:
    print(f"✅ POST request: Created post with ID {{result2['data']['id']}}")

client.close()
print("APIClient test completed!")
```

### Question 4: Advanced API Client with Rate Limiting

Create an advanced API client that includes rate limiting, retries, and caching.

**Requirements:**
- Implement rate limiting (max requests per second)
- Add automatic retries with exponential backoff
- Include simple response caching
- Add request/response logging
- Support custom headers and authentication

&lt;details&gt;
&lt;summary&gt;💡 Click for hint&lt;/summary&gt;

```python
import time
from datetime import datetime, timedelta

class AdvancedAPIClient:
    def __init__(self, base_url, rate_limit=1.0):
        # Initialize session, rate limiting, cache
        self.rate_limit = rate_limit  # requests per second
        self.last_request_time = 0
        self.cache = {}
        
    def _rate_limit(self):
        # Implement rate limiting logic
        
    def _get_cache_key(self, method, url, params):
        # Generate cache key
        
    def request(self, method, endpoint, **kwargs):
        # Main request method with retries and caching
```

&lt;/details&gt;


```python
# Your solution here
import time
from datetime import datetime, timedelta
import hashlib

class AdvancedAPIClient:
    def __init__(self, base_url, rate_limit=1.0):
        # Write your code here
        pass
    
    def _rate_limit(self):
        # Write your code here
        pass
    
    def request(self, method, endpoint, **kwargs):
        # Write your code here
        pass

# Test your class
# client = AdvancedAPIClient('https://jsonplaceholder.typicode.com', rate_limit=2.0)
# result = client.request('GET', '/posts/1')
# print(result)
```


```python
# Solution
import time
from datetime import datetime, timedelta
import hashlib
import json

class AdvancedAPIClient:
    def __init__(self, base_url, rate_limit=1.0, cache_ttl=300):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.rate_limit = rate_limit  # requests per second
        self.last_request_time = 0
        self.cache = {}
        self.cache_ttl = cache_ttl  # cache time-to-live in seconds
        
        # Set default headers
        self.session.headers.update({
            'User-Agent': 'Advanced Python APIClient 1.0',
            'Accept': 'application/json'
        })
    
    def _rate_limit(self):
        """Implement rate limiting."""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        min_interval = 1.0 / self.rate_limit
        
        if time_since_last &lt; min_interval:
            sleep_time = min_interval - time_since_last
            print(f"Rate limiting: sleeping for {{sleep_time:.2f}} seconds")
            time.sleep(sleep_time)
        
        self.last_request_time = time.time()
    
    def _get_cache_key(self, method, url, params=None):
        """Generate a cache key for the request."""
        cache_data = f"{{method}}:{{url}}:{{json.dumps(params, sort_keys=True) if params else ''}}"
        return hashlib.md5(cache_data.encode()).hexdigest()
    
    def _get_from_cache(self, cache_key):
        """Get response from cache if valid."""
        if cache_key in self.cache:
            cached_data, timestamp = self.cache[cache_key]
            if time.time() - timestamp &lt; self.cache_ttl:
                print("📦 Cache hit")
                return cached_data
            else:
                # Cache expired
                del self.cache[cache_key]
        return None
    
    def _save_to_cache(self, cache_key, data):
        """Save response to cache."""
        self.cache[cache_key] = (data, time.time())
    
    def request(self, method, endpoint, use_cache=True, max_retries=3, **kwargs):
        """Make a request with rate limiting, caching, and retries."""
        url = f"{{self.base_url}}{{endpoint}}"
        
        # Check cache for GET requests
        if method.upper() == 'GET' and use_cache:
            cache_key = self._get_cache_key(method, url, kwargs.get('params'))
            cached_response = self.cache.get(cache_key)
            if cached_response:
                data, timestamp = cached_response
                if time.time() - timestamp &lt; self.cache_ttl:
                    return data
        
        # Rate limiting
        self._wait_for_rate_limit()
        
        # Make request with retries
        for attempt in range(max_retries):
            try:
                response = requests.request(method, url, **kwargs)
                response.raise_for_status()
                
                # Cache successful GET responses
                if method.upper() == 'GET' and use_cache:
                    self._cache_response(cache_key, response.json())
                
                return response.json()
            except requests.exceptions.RequestException as e:
                if attempt == max_retries - 1:
                    raise e
                time.sleep(2 ** attempt)  # Exponential backoff

# Example usage
api = AdvancedAPIClient('https://api.example.com')

# This will use caching and rate limiting
response = api.request('GET', '/users')
print(response)
```
