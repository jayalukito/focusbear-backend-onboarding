# Introduction to Testing in Nest JS #23

## What are the key differences between unit, integration, and E2E tests?

Unit tests focus on a small part of the application in isolation, such as a single service or function. Dependencies such as databases or external services are usually replaced with mocks.

For example, in my `UsersService` test, I mocked the TypeORM repository:

```ts
const mockUserRepository = {
  find: jest.fn(),
};
```

This allowed me to test `UsersService.findAll()` without connecting to the real PostgreSQL database.

Integration tests test how multiple parts of an application work together. For example, an integration test could test a service together with a real test database or verify that several NestJS providers interact correctly.

E2E (end-to-end) tests test the application from the outside, similar to how a real client would use it. For example, an E2E test could send:

```text
GET /users
```

to a running NestJS application and verify the HTTP status and response body.

The main difference can be summarized as:

```text
Unit Test
→ Tests one small part in isolation

Integration Test
→ Tests multiple components working together

E2E Test
→ Tests the complete application flow through the API
```

## Why is testing important for a NestJS backend?

Testing helps verify that backend functionality continues to behave correctly when the application changes.

For example, if `UsersService.findAll()` is expected to return users from the repository, a test can automatically verify that behavior. If a future change accidentally breaks the service, the test can detect the problem before the application is deployed.

Tests also make refactoring safer because developers can change internal implementation while checking that existing behavior still works.

In a team environment, automated tests also provide a consistent way to verify code before it is merged or deployed.

## How does NestJS use `@nestjs/testing` to simplify testing?

NestJS provides the `@nestjs/testing` package to create a testing environment that works with NestJS dependency injection.

In my test, I used:

```ts
const module = await Test.createTestingModule({
  providers: [UsersService],
}).compile();
```

This creates a `TestingModule`, which works similarly to a normal NestJS module but is specifically created for tests.

Dependencies can then be replaced with mocks:

```ts
{
  provide: getRepositoryToken(User),
  useValue: mockUserRepository,
}
```

This allowed `UsersService` to receive a fake TypeORM repository instead of connecting to the real database.

I could then retrieve the service from the testing module using:

```ts
usersService = module.get<UsersService>(UsersService);
```

This makes testing NestJS services easier because I can still use NestJS's dependency injection system while controlling the dependencies used during the test.

## What are the challenges of writing tests for a NestJS application?

One challenge is understanding how to mock dependencies correctly.

A NestJS service may depend on repositories, loggers, configuration services, or other providers. When testing the service independently, these dependencies need to be provided by the testing module.

For example, my `UsersService` depends on a TypeORM repository, so I needed to provide:

```ts
{
  provide: getRepositoryToken(User),
  useValue: mockUserRepository,
}
```

Another challenge is deciding what should be mocked and what should be tested together. Unit tests should normally isolate dependencies, while integration and E2E tests may intentionally use more of the real application.

Testing asynchronous methods can also require additional attention because database operations and many service methods return Promises. The test therefore needs to use `async` and `await` before checking the result.

Overall, the main challenge is creating a testing environment that is isolated enough to be reliable while still accurately representing the behavior that needs to be tested.
