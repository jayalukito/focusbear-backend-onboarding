# NestJS API Tests

## How does Supertest help test API endpoints?

Supertest allows me to send HTTP requests to my NestJS application directly from automated tests.

For example, I tested my `/users` endpoint using:

```ts
const response = await request(
  app.getHttpServer(),
)
  .get('/users')
  .set(
    'Authorization',
    'Bearer test-jwt',
  )
  .expect(200);
```

This behaves similarly to sending a request from Postman or a frontend application, but the request is executed automatically by Jest.

Supertest also allows me to verify HTTP information such as response status codes and response bodies.

For example:

```ts
.expect(200);
```

checks that the request succeeds, while:

```ts
expect(response.body).toEqual(
  users,
);
```

checks that the API returned the expected data.

This makes Supertest useful for testing the API from the HTTP boundary rather than directly calling controller methods.

## What is the difference between unit tests and API tests?

Unit tests focus on a small piece of application logic in isolation.

For example, in a unit test for `UsersController`, I can directly execute:

```ts
await controller.findAll();
```

while mocking `UsersService`.

An API test instead sends an actual HTTP request:

```ts
request(
  app.getHttpServer(),
)
  .get('/users');
```

The request passes through more of the NestJS request lifecycle.

For example:

```text
HTTP Request
     ↓
Authentication Guard
     ↓
Validation Pipe
     ↓
Controller
     ↓
Service
     ↓
HTTP Response
```

Therefore, API tests verify how multiple parts of the application work together, while unit tests normally focus on one class or method.

## Why should authentication be mocked in integration tests?

Authentication should be mocked when authentication itself is not the main feature being tested.

My application may normally depend on an external authentication system. If every integration test required a real authentication server and real user credentials, the tests would become slower and less reliable.

For my API tests, I used a test authentication guard that accepts:

```text
Bearer test-jwt
```

This allowed me to simulate an authenticated user without contacting an external authentication provider.

I could then test both conditions:

```text
Valid test token
→ request is allowed

Missing test token
→ request is rejected
```

Mocking authentication keeps the integration test focused on the NestJS API behavior while still allowing protected endpoints to be tested.

The real authentication implementation should be tested separately where appropriate.

## How can you structure API tests to cover both success and failure cases?

API tests should verify both normal application behavior and situations where a request should fail.

For my `GET /users` endpoint, I tested the successful case:

```text
Authenticated request
→ GET /users
→ 200 OK
```

For my `POST /users` endpoint, I tested a valid request:

```text
Valid DTO
→ POST /users
→ 201 Created
```

I also tested an invalid request:

```text
Invalid email
Invalid password
→ POST /users
→ 400 Bad Request
```

Finally, I tested authentication failure:

```text
No test JWT
→ GET /users
→ Request rejected
```

A useful structure for API tests is therefore:

```text
Success cases
→ correct data
→ correct status code

Validation failures
→ invalid request data
→ expected 400 response

Authentication failures
→ missing or invalid credentials
→ request rejected

Application failures
→ service or database error
→ appropriate error response
```

Testing both successful and unsuccessful scenarios gives greater confidence that an endpoint behaves correctly not only under normal conditions but also when clients send invalid or unauthorized requests.
