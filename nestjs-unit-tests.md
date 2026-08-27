# Writing Unit Test for Services & Controllers in NestJS #22

## Why is it important to test services separately from controllers?

Testing services and controllers separately makes it easier to identify which layer of the application contains a problem.

In my `UsersService` test, I focused on the service's interaction with the TypeORM repository. Instead of connecting to PostgreSQL, I mocked the repository:

```ts
const mockUserRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};
```

This allowed me to verify that `findAll()` retrieved users and that `create()` correctly created and saved a user.

For my `UsersController` test, I did not test the database again. Instead, I mocked `UsersService`:

```ts
const mockUsersService = {
  findAll: jest.fn(),
  create: jest.fn(),
};
```

The controller test then focused only on whether the controller called the correct service method and returned its result.

This separation makes tests easier to understand and helps determine whether an issue comes from the controller, service, or another dependency.

## How does mocking dependencies improve unit testing?

Mocking allows a unit test to isolate the code being tested from external dependencies.

For example, my `UsersService` normally depends on a real TypeORM repository:

```ts
@InjectRepository(User)
private readonly userRepository: Repository<User>
```

During testing, I replaced it with:

```ts
{
  provide: getRepositoryToken(User),
  useValue: mockUserRepository,
}
```

I also mocked the Pino logger used by the service:

```ts
{
  provide: getLoggerToken(
    UsersService.name,
  ),
  useValue: mockLogger,
}
```

This means the unit test does not require a running PostgreSQL database or real logging infrastructure.

Mocks also allow me to control the result of dependencies. For example:

```ts
mockUserRepository.find.mockResolvedValue(users);
```

lets me decide exactly what the repository should return.

This makes the tests faster, predictable, and easier to reproduce.

## What are common pitfalls when writing unit tests in NestJS?

One common problem is forgetting to provide all dependencies required by the class being tested.

For example, `UsersService` depends on both the `User` repository and a Pino logger. If either dependency is missing from `Test.createTestingModule()`, NestJS cannot create the service and the test fails during setup.

Another common mistake is using real external dependencies in a unit test. Connecting to a real PostgreSQL database would make the test slower and could cause failures unrelated to the service logic.

Asynchronous operations can also cause problems if `await` is forgotten:

```ts
const result = await service.findAll();
```

Tests should also avoid checking too many implementation details. The important behavior is whether the method returns the correct result and interacts with its dependencies correctly.

## How can you ensure that unit tests cover all edge cases?

Unit tests should include both successful behavior and possible failure or boundary conditions.

For example, `findAll()` could be tested for:

```text
Repository returns users
→ expected users are returned

Repository returns empty array
→ empty-state behavior is verified

Repository throws an error
→ error handling is verified
```

The `create()` method could also be tested for successful creation as well as cases where the repository fails to save the user.

Each test should focus on one expected behavior. This makes failures easier to understand and helps ensure that both normal and unexpected situations are covered.

Code coverage tools can also help identify parts of services or controllers that have not been executed by the test suite, but high coverage alone does not guarantee good tests. The tests should still represent meaningful application behavior and important edge cases.
