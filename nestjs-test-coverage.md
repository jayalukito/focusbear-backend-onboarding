# NestJS Test Coverage

## What does the coverage bar track, and why is it important?

Jest's coverage report shows how much of the application's source code was executed while running the automated tests.

The main measurements are:

```text
Statements
→ executable statements that were executed

Branches
→ different conditional paths that were executed

Functions
→ functions and methods that were called

Lines
→ executable source lines that were executed
```

For example, if a service contains a `try/catch` block and my tests only cover the successful operation, the successful statements may have good line coverage while the error branch remains untested.

I used:

```bash
npm run test:cov
```

to generate the coverage report and identify parts of the application that were not being exercised by the tests.

Coverage is useful because it provides a measurable indication of which parts of the codebase are currently exercised by automated tests.

However, coverage should be treated as a diagnostic tool rather than proof that the application is completely tested.

## Why does Focus Bear enforce a minimum test coverage threshold?

A minimum coverage threshold acts as a quality gate that helps prevent new changes from significantly reducing the amount of code covered by automated tests.

For example, if a project requires a minimum line coverage and a new feature introduces many untested code paths, the coverage percentage can fall below the threshold and cause the test pipeline to fail.

This encourages developers to include appropriate tests when adding or modifying functionality.

The threshold is useful for maintaining a consistent testing baseline across a team, especially as the application becomes larger.

However, meeting the minimum percentage should not be treated as the only goal. The tests still need to verify meaningful application behavior rather than simply execute lines of code.

## How can high test coverage still lead to untested functionality?

High coverage does not necessarily mean that the application behavior has been properly verified.

For example, the following test could execute the entire `findAll()` method:

```ts
it('should find users', async () => {
  mockUserRepository.find
    .mockResolvedValue(users);

  await service.findAll();

  expect(service).toBeDefined();
});
```

The coverage report may show the lines inside `findAll()` as covered because the method was executed.

However, the test never verifies what `findAll()` returned.

The method could accidentally return the wrong value and this test could still pass.

This means that it is possible to have high line coverage while still having weak tests.

Coverage measures whether code was executed, not whether its behavior was correctly verified.

## What are examples of weak vs. strong test assertions?

A weak assertion might be:

```ts
expect(service).toBeDefined();
```

This only verifies that NestJS successfully created the service.

If I am testing `findAll()`, a stronger test would be:

```ts
const result =
  await service.findAll();

expect(result).toEqual(users);

expect(
  mockUserRepository.find,
).toHaveBeenCalledTimes(1);
```

This checks both the result of the method and its interaction with the repository.

Another strong assertion for an error scenario would be:

```ts
await expect(
  service.findAll(),
).rejects.toThrow(
  'Database unavailable',
);
```

This verifies the behavior expected when the database operation fails.

Therefore:

```text
Weak assertion
→ proves that code executed

Strong assertion
→ proves that specific expected behavior occurred
```

## Refactoring a Weak Test

One weak test I identified was a test that only checked whether the service existed:

```ts
it('should create the service', () => {
  expect(service).toBeDefined();
});
```

This test can be useful as a basic setup check, but it does not verify any actual business behavior.

A similarly weak test would be:

```ts
it('should find users', async () => {
  mockUserRepository.find
    .mockResolvedValue([
      {
        id: 1,
        name: 'John',
      },
    ]);

  await service.findAll();

  expect(service).toBeDefined();
});
```

Even though `findAll()` is executed and therefore contributes to code coverage, the test does not verify whether the method returned the correct result.

I refactored the test to include meaningful assertions:

```ts
it('should return users from the repository', async () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password',
    },
  ];

  mockUserRepository.find
    .mockResolvedValue(users);

  const result =
    await service.findAll();

  expect(result).toEqual(users);

  expect(
    mockUserRepository.find,
  ).toHaveBeenCalledTimes(1);
});
```

The refactored test now verifies two important behaviors.

First, it checks that `findAll()` returns the expected users:

```ts
expect(result).toEqual(users);
```

Second, it checks that the service actually calls the repository:

```ts
expect(
  mockUserRepository.find,
).toHaveBeenCalledTimes(1);
```

This makes the test stronger because it verifies the expected output and the interaction with the dependency.

The difference can be summarized as:

```text
Weak test
→ executes code
→ increases coverage
→ does not verify behavior properly

Refactored test
→ executes code
→ verifies expected output
→ verifies dependency interaction
→ provides more confidence
```

This exercise showed me that increasing coverage alone is not enough. A useful test should contain assertions that prove the expected behavior of the code being tested.

## How can you balance increasing coverage with writing effective tests?

I should use the coverage report to identify untested code, but I should not write tests purely to increase the percentage.

When I find an uncovered area, I should first determine what behavior that code represents.

For example, an uncovered `catch` block represents an error scenario. Instead of executing it only for coverage, I can write a test that verifies the service logs the failure and propagates the correct error.

A useful approach is:

```text
1. Run the coverage report

2. Find important uncovered paths

3. Identify the expected behavior

4. Write a test for that behavior

5. Add meaningful assertions

6. Run coverage again
```

I should prioritize important business logic, validation, error handling, authentication, and edge cases rather than trying to reach 100% coverage for its own sake.

The goal is therefore not simply:

```text
More coverage
```

but:

```text
More meaningful behavior covered
+
Strong assertions
+
Important edge cases tested
```

This provides better confidence in the application while still improving the measurable test coverage.
