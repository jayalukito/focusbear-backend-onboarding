# NestJS Environment Configuration Reflection

## How does `@nestjs/config` help manage environment variables?

`@nestjs/config` provides a structured way to load and access environment variables in a NestJS application.

For example, variables can be stored in a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
```

Then `ConfigModule` can load them:

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
```

The values can be accessed through `ConfigService`:

```ts
const port = configService.get<number>('PORT');
```

This keeps configuration separate from application logic and makes the configuration easier to manage.

## Why should secrets never be stored in source code?

Secrets such as API keys, database passwords, and authentication credentials should not be written directly in source code because the code may be committed to Git or shared with other developers.

For example, this should be avoided:

```ts
const password = 'my-secret-password';
```

Instead, secrets should be stored in environment variables:

```env
DB_PASSWORD=my-secret-password
```

The `.env` file should normally be added to `.gitignore` so that sensitive information is not pushed to the repository.

A `.env.example` file can be committed instead to show other developers which variables are required without exposing the actual values.

## How can you validate environment variables before the app starts?

Environment variables can be validated when `ConfigModule` is initialized.

One approach is to use a validation library such as Joi:

```ts
ConfigModule.forRoot({
  validationSchema: Joi.object({
    PORT: Joi.number().default(3000),

    DB_HOST: Joi.string().required(),

    DB_PORT: Joi.number().required(),

    DB_USER: Joi.string().required(),

    DB_PASSWORD: Joi.string().required(),

    DB_NAME: Joi.string().required(),
  }),
});
```

If a required variable is missing or has an invalid value, NestJS will stop during startup instead of running with incorrect configuration.

This helps detect configuration problems early.

## How can you separate configuration for different environments?

Different environment files can be used for different environments.

For example:

```text
.env.local
.env.development
.env.test
.env.production
```

Then the correct environment file can be loaded based on `NODE_ENV`.

```ts
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
  isGlobal: true,
});
```

For example:

```text
NODE_ENV=development
→ .env.development

NODE_ENV=production
→ .env.production
```

This allows each environment to have different database connections, API URLs, ports, and other settings without changing the application source code.
