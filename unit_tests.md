# Jest Testing Reflection #98

## Why is automated testing important in software development?

Automated testing is important because it helps verify that application features continue to work correctly as the codebase changes.

Instead of manually testing the same functionality after every change, automated tests can be executed repeatedly and consistently. This helps detect regressions early and gives developers more confidence when refactoring or adding new features.

For example, if a service method is expected to return all users, a Jest test can verify that behavior automatically. If a future code change accidentally breaks that method, the test can fail immediately and show that something needs to be fixed.

Automated testing is also useful in team projects because tests provide a shared definition of expected behavior and can be included in CI/CD pipelines before code is merged or deployed.

## What did you find challenging when writing your first Jest test?

The most challenging part was understanding how to isolate the component being tested from its dependencies.

For example, a NestJS service may depend on a TypeORM repository:

```ts
constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
) {}
```

When testing the service, I do not want the test to connect to the real PostgreSQL database. Instead, I need to provide a mocked repository and define what methods such as `find()` or `save()` should return.

For example:

```ts
const mockUserRepository = {
  find: jest.fn(),
  save: jest.fn(),
};
```

This required me to understand the difference between testing the actual service logic and testing external dependencies such as the database.

I also found it challenging at first to understand Jest concepts such as `describe()`, `it()`, `expect()`, and mocked functions. After using them, the structure became clearer:

```text
describe()
→ groups related tests

it()
→ describes one behavior being tested

expect()
→ checks the expected result

jest.fn()
→ creates a mock function
```

Writing the first test helped me understand that a good unit test should focus on one piece of behavior and replace external dependencies with controlled mocks.

# Mocking API Calls in Jest #96

## Why is it important to mock API calls in tests?

Mocking API calls is important because unit tests should focus on the behavior of the component being tested without depending on external services.

In my test, I mocked the `fetchUsers()` function using:

```js
jest.mock('../api/usersApi', () => ({
  fetchUsers: jest.fn(),
}));
```

Then I controlled the API response using:

```js
fetchUsers.mockResolvedValue([
  {
    id: 1,
    name: 'John Doe',
  },
]);
```

This allowed the test to verify that the component correctly displayed the returned user without making a real network request.

Mocking also makes tests faster and more reliable. A test should not fail just because the internet connection is unavailable or because an external API is temporarily down.

It also makes it easier to test different scenarios, such as successful responses and failed API calls.

## What are some common pitfalls when testing asynchronous code?

One common pitfall is checking the UI before the asynchronous operation has finished.

For example, after rendering a component that fetches data, the result may not be available immediately because the API call returns a Promise.

Instead of using:

```js
screen.getByText('John Doe');
```

immediately, I used:

```js
await screen.findByText('John Doe');
```

This waits until the expected element appears in the rendered component.

Another common issue is forgetting to use `await` with asynchronous operations. This can cause the test to finish before the API response has been processed.

Tests can also become unreliable if mocks are not reset between test cases. I used:

```js
beforeEach(() => {
  jest.clearAllMocks();
});
```

to prevent one test's mock history from affecting another test.

Another pitfall is only testing the successful case. Asynchronous code should also be tested for loading and failure states, such as:

```js
fetchUsers.mockRejectedValue(
  new Error('API failed'),
);
```

This helps ensure the component behaves correctly when the API request does not succeed.
