# Mocking Dependencies & Database Interactions in NestJS #21

## Why is mocking important in unit tests?

Mocking is important because unit tests should focus on one specific part of the application without depending on external systems or unrelated application components.

For example, when testing my `UsersService`, I wanted to test the service logic without connecting to the real PostgreSQL database.

I created a mock repository:

```ts
const mockUserRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};
```

I could then control what the repository returned:

```ts
mockUserRepository.find.mockResolvedValue(users);
```

This makes the test predictable because the test does not depend on the current contents or availability of the real database.

Mocking also makes unit tests faster because external services, databases, and network requests do not need to run.

## How do you mock a NestJS provider, such as a service in a controller test?

NestJS providers can be replaced inside a `TestingModule`.

In my controller test, the real `UsersService` was replaced with a mocked version:

```ts
const mockUsersService = {
  findAll: jest.fn(),
  create: jest.fn(),
};
```

I registered the mock using:

```ts
{
  provide: UsersService,
  useValue: mockUsersService,
}
```

inside:

```ts
Test.createTestingModule({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useValue: mockUsersService,
    },
  ],
});
```

When NestJS creates `UsersController` during the test, it injects `mockUsersService` instead of the real `UsersService`.

This allows the controller to be tested independently from the service implementation.

## What are the benefits of mocking the database instead of using a real one?

Using a mocked database repository makes unit tests faster, isolated, and more predictable.

If a real PostgreSQL database was used, the test would depend on several additional factors, including:

```text
Database availability
Database connection
Existing database data
Database configuration
Network or Docker configuration
```

A failure in one of these areas could cause the test to fail even when the service itself is correct.

Instead, I mocked the TypeORM repository using:

```ts
{
  provide:
    getRepositoryToken(User),
  useValue:
    mockUserRepository,
}
```

This allowed me to test methods such as `findAll()` and `create()` without making real SQL queries.

Mocking also makes it easy to simulate different database responses, including successful queries, empty results, and errors.

A real database is still useful for integration and E2E testing, but it is usually unnecessary for an isolated unit test.

## How do you decide what to mock vs. what to test directly?

The main class being tested should normally use its real implementation, while its external dependencies should be mocked.

For example, when testing `UsersController`:

```text
UsersController
→ Test directly

UsersService
→ Mock
```

When testing `UsersService`:

```text
UsersService
→ Test directly

TypeORM Repository
→ Mock

Pino Logger
→ Mock
```

This ensures that a unit test focuses on one unit of behavior.

I would generally mock dependencies such as databases, external APIs, email services, loggers, and other services when they are not the main subject of the test.

I would test the actual implementation of the class whose behavior I want to verify.

This also helps identify failures more easily. If a `UsersService` unit test fails while the repository is mocked, the problem is more likely to be inside the service logic rather than PostgreSQL or another external dependency.

For mocks themselves, I use `jest.fn()` when creating a completely fake function:

```ts
const mockRepository = {
  find: jest.fn(),
};
```

I use `jest.spyOn()` when a real object already exists and I want to observe or temporarily replace one of its methods:

```ts
jest.spyOn(service, 'findAll');
```

Choosing mocks carefully keeps unit tests focused while integration and E2E tests can be used separately to verify that the real components work together.
