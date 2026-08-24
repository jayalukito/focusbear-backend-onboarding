# NestJS Logging Reflection #27

## What are the benefits of using `nestjs-pino` for logging?

`nestjs-pino` provides structured logging for NestJS applications. Instead of only printing plain text, logs can contain additional fields that make them easier to understand and search.

For example, in my `UsersService`, I used:

```ts
this.logger.info(
  {
    operation: 'findAll',
    userCount: users.length,
  },
  'Users retrieved successfully',
);
```

This produces a log containing useful information such as:

```text
context: "UsersService"
operation: "findAll"
userCount: 1
```

Pino also automatically logs HTTP request information such as:

```text
method: GET
url: /users
statusCode: 200
responseTime: 72
```

This makes debugging easier because I can identify which service generated the log, what operation was being performed, and how long the request took.

## How does global exception handling improve API consistency?

Global exception handling allows errors from different endpoints to use the same response format.

I created an `HttpExceptionFilter` that formats errors like:

```ts
response.status(status).json({
  success: false,
  statusCode: status,
  message,
  path: request.url,
  timestamp: new Date().toISOString(),
});
```

For example, when my users endpoint throws:

```ts
throw new HttpException(
  'No users found',
  404,
);
```

the filter can return:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No users found",
  "path": "/users",
  "timestamp": "..."
}
```

This is better than allowing every controller to return a different error structure. It also reduces duplicated error-handling code because the filter can be registered globally using `APP_FILTER`.

## What is the difference between a logging interceptor and an exception filter?

A logging interceptor is used to observe request execution before and after a controller method runs. It can be used to record information such as execution time, request details, or successful responses.

An exception filter is specifically used when an exception is thrown. Its responsibility is to catch the exception and determine how the error should be returned to the client.

The difference can be represented as:

```text
Request
   ↓
Logging Interceptor
   ↓
Controller
   ↓
Service
   ↓
Response
```

If an error occurs:

```text
Controller / Service
       ↓
Exception thrown
       ↓
HttpExceptionFilter
       ↓
Formatted error response
```

In my project, I did not need to create a logging interceptor for basic HTTP logging because `nestjs-pino` already logs requests and responses automatically. I used the exception filter separately to control the API error response format.

## How can logs be structured to provide useful debugging information?

Logs should contain contextual fields that explain what operation was happening when the log was created.

For example, my user creation log contains:

```ts
this.logger.info(
  {
    operation: 'createUser',
    userId: savedUser.id,
  },
  'User created successfully',
);
```

This gives more useful information than only logging:

```text
User created successfully
```

because I can also see:

```text
context: UsersService
operation: createUser
userId: 1
```

For debugging, useful fields can include the operation name, service context, user ID, HTTP method, request path, status code, response time, and error information.

Sensitive information should not be included in logs. In my Pino configuration, headers such as authorization tokens and cookies can be redacted so they are not exposed in Docker logs.
