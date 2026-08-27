# Security Best Practices in NestJS #26

## What are the most common security vulnerabilities in a NestJS backend?

Some common security vulnerabilities in a NestJS backend include injection attacks, incorrect CORS configuration, weak authentication or authorization, exposed secrets, missing input validation, and API abuse.

Injection attacks can happen when untrusted user input is directly included in a database query. In my project, I use TypeORM repositories such as:

```ts
await this.userRepository.find();
await this.userRepository.save(user);
```

Using TypeORM repository methods helps avoid manually building unsafe SQL queries from user input.

Another possible issue is CORS misconfiguration. For example:

```ts
app.enableCors({
  origin: '*',
});
```

allows browser requests from any origin. A safer approach is to explicitly allow the frontend that should communicate with the NestJS API:

```ts
app.enableCors({
  origin: 'http://localhost:5173',
});
```

Other risks include accidentally committing database passwords or API keys, exposing sensitive information through logs, and allowing unlimited requests to an endpoint.

## How does `@fastify/helmet` improve application security?

`@fastify/helmet` improves application security by adding security-related HTTP response headers.

It can add headers such as:

```text
X-Content-Type-Options
X-Frame-Options
Content-Security-Policy
Referrer-Policy
```

These headers provide additional instructions to browsers and can help reduce risks such as MIME-type sniffing, clickjacking, and unsafe content execution.

In my NestJS Fastify application, Helmet can be registered globally using:

```ts
await app.register(helmet);
```

This applies the security headers across the application without requiring every controller to configure them individually.

## Why is rate limiting important for preventing abuse?

Rate limiting restricts how many requests a client can send within a certain period of time.

Without rate limiting, a client could repeatedly call an endpoint such as:

```text
GET /users
```

many times in a short period. This could increase server and database load and potentially affect application availability.

For my implementation, I used `@fastify/rate-limit` and configured it in `main.ts`:

```ts
import rateLimit from '@fastify/rate-limit';

await app.register(rateLimit, {
  max: 3,
  timeWindow: '1 minute',
});
```

This configuration allows a client to make a maximum of three requests within one minute.

I tested the rate limiter by repeatedly calling the `/users` endpoint:

```text
Request 1 → 200 OK
Request 2 → 200 OK
Request 3 → 200 OK
Request 4 → 429 Too Many Requests
```

This demonstrates that the rate limiter successfully prevents excessive requests after the configured limit is reached.

In a real application, the limit would normally be increased depending on the endpoint and expected traffic, but using a small value made it easier to verify that the feature was working.

## How can sensitive configuration values be protected in a production environment?

Sensitive values such as database passwords, API keys, authentication secrets, and other credentials should never be hardcoded into source code.

For example, this should be avoided:

```ts
const databasePassword = 'my-secret-password';
```

Instead, my NestJS project uses environment variables with `@nestjs/config`:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=nestdb
```

The application can retrieve these values using `ConfigService`:

```ts
configService.get<string>('DB_PASSWORD');
```

The actual `.env` file should not be committed to Git. A `.env.example` file can instead be committed to show which configuration values are required without exposing real secrets.

For production, sensitive values should be provided through the deployment platform's environment configuration or a dedicated secrets-management system rather than being stored in the repository.
