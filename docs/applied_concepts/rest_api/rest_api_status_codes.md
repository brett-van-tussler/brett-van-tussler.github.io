# HTTP Response Status Codes

HTTP response status codes are three-digit numbers that indicate the outcome of an HTTP request. They provide essential information about whether a request was successful, encountered an error, or requires additional action.

## Status Code Categories

HTTP status codes are organized into five main categories based on their first digit:

### 1xx - Informational Responses
- **Range**: 100-199
- **Purpose**: Indicate that the request was received and is being processed
- **Usage**: Rarely used in typical web applications
- **Example**: 100 Continue, 101 Switching Protocols

### 2xx - Success
- **Range**: 200-299
- **Purpose**: Indicate that the request was successfully received, understood, and accepted
- **Usage**: Most common for successful API responses
- **Example**: 200 OK, 201 Created, 204 No Content

### 3xx - Redirection
- **Range**: 300-399
- **Purpose**: Indicate that further action needs to be taken to complete the request
- **Usage**: URL redirects, caching, and resource location changes
- **Example**: 301 Moved Permanently, 302 Found, 304 Not Modified

### 4xx - Client Error
- **Range**: 400-499
- **Purpose**: Indicate that the client made an error in the request
- **Usage**: Invalid requests, authentication failures, missing resources
- **Example**: 400 Bad Request, 401 Unauthorized, 404 Not Found

### 5xx - Server Error
- **Range**: 500-599
- **Purpose**: Indicate that the server failed to fulfill a valid request
- **Usage**: Server crashes, database errors, internal failures
- **Example**: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable

## Most Common Status Codes

### Success Codes (2xx)

#### 200 OK
- **Usage**: Standard response for successful HTTP requests
- **When to use**: GET requests that return data, successful PUT/PATCH updates
- **Response body**: Usually contains the requested data

#### 201 Created
- **Usage**: Request succeeded and a new resource was created
- **When to use**: Successful POST requests that create new resources
- **Response body**: Often contains the created resource or its location

#### 204 No Content
- **Usage**: Request succeeded but there's no content to return
- **When to use**: Successful DELETE operations, PUT updates with no response data
- **Response body**: Empty

### Client Error Codes (4xx)

#### 400 Bad Request
- **Usage**: Server cannot process the request due to client error
- **When to use**: Invalid JSON, missing required fields, malformed requests
- **Response body**: Should include error details

#### 401 Unauthorized
- **Usage**: Authentication is required and has failed or not been provided
- **When to use**: Missing or invalid authentication credentials
- **Response body**: Authentication error message

#### 403 Forbidden
- **Usage**: Server understood the request but refuses to authorize it
- **When to use**: Valid authentication but insufficient permissions
- **Response body**: Authorization error message

#### 404 Not Found
- **Usage**: Requested resource could not be found
- **When to use**: Invalid URLs, deleted resources, non-existent endpoints
- **Response body**: Error message indicating resource not found

#### 409 Conflict
- **Usage**: Request conflicts with the current state of the resource
- **When to use**: Duplicate creation attempts, version conflicts
- **Response body**: Conflict details and resolution suggestions

#### 422 Unprocessable Entity
- **Usage**: Request is well-formed but contains semantic errors
- **When to use**: Validation failures, business rule violations
- **Response body**: Detailed validation error messages

### Server Error Codes (5xx)

#### 500 Internal Server Error
- **Usage**: Generic server error when no specific error is appropriate
- **When to use**: Unexpected server failures, unhandled exceptions
- **Response body**: Generic error message (avoid exposing internal details)

#### 502 Bad Gateway
- **Usage**: Server received an invalid response from an upstream server
- **When to use**: Proxy/gateway errors, microservice communication failures
- **Response body**: Gateway error message

#### 503 Service Unavailable
- **Usage**: Server is temporarily unable to handle requests
- **When to use**: Maintenance mode, overloaded servers, temporary outages
- **Response body**: Service unavailability message with retry information

## Best Practices

### Choosing the Right Status Code
1. **Be specific**: Use the most appropriate code rather than generic ones
2. **Be consistent**: Use the same codes for similar situations across your API
3. **Follow standards**: Stick to established HTTP semantics
4. **Provide context**: Include meaningful error messages in response bodies

### Common Patterns
- **GET requests**: 200 (success), 404 (not found), 500 (server error)
- **POST requests**: 201 (created), 400 (bad request), 409 (conflict)
- **PUT requests**: 200 (updated), 201 (created), 400 (bad request)
- **DELETE requests**: 204 (deleted), 404 (not found), 409 (conflict)

### Error Response Format
Consider using a consistent error response format:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Conclusion

Proper use of HTTP status codes is crucial for building intuitive and maintainable REST APIs. They provide immediate feedback about request outcomes and help clients handle different scenarios appropriately. Always choose the most semantically correct status code and provide helpful error messages to improve the developer experience.