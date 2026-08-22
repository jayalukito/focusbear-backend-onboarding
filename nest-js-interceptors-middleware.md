# NestJS Interceptors and Middleware

## What is the difference between an interceptor and middleware in NestJS?

Middleware runs before the request reaches the route handler and is commonly used for tasks such as logging requests, modifying request objects, authentication checks, or adding headers.

An interceptor runs around the controller method, meaning it can execute logic both before and after the controller handler runs. It can also modify responses, measure execution time, and handle errors.

A simplified request flow looks like:

```text
Request
   ↓
Middleware
   ↓
Controller / Route Handler
   ↑
Interceptor wraps around this execution
   ↓
Response
```

For example, middleware may log:

```text
POST /users
```

while an interceptor can measure how long the controller takes:

```text
POST /users completed in 120ms
```

## When would you use an interceptor instead of middleware?

I would use an interceptor when I need access to the execution of a specific controller or route, especially when logic needs to happen before and after the handler runs.

Common interceptor use cases include:

* Logging controller execution time
* Transforming API responses
* Handling or logging errors
* Adding response metadata
* Caching responses

Middleware is more suitable for general request-level processing that happens before routing.

## How does `LoggerErrorInterceptor` help?

`LoggerErrorInterceptor` helps centralize error logging instead of requiring every controller or service to manually log errors.

For example, if a controller or service throws an error:

```text
Request
   ↓
Controller
   ↓
Service
   ↓
Error thrown
   ↓
LoggerErrorInterceptor
   ↓
Log useful information
   ↓
Error continues to NestJS error handling
```

The interceptor can log useful information such as the request method, endpoint, error message, stack trace, and execution context.

This makes debugging easier and keeps error logging consistent across the application. It also reduces duplicated `try/catch` and logging code inside controllers.
