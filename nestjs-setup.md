# NestJS Setup #45

## What files are included in a default NestJS project?

A default NestJS project usually includes:

```text
src/
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

The project also includes configuration files such as:

```text
package.json
tsconfig.json
tsconfig.build.json
nest-cli.json
```

The main files have different responsibilities:

* `app.controller.ts` handles incoming HTTP requests.
* `app.service.ts` contains business logic.
* `app.module.ts` groups and registers the application's components.
* `main.ts` starts the NestJS application.
* `app.controller.spec.ts` contains tests for the controller.

## How does `main.ts` bootstrap a NestJS application?

`main.ts` is the entry point of a NestJS application. It uses `NestFactory` to create the application using `AppModule`, then starts the HTTP server.

Example:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

The application flow is:

```text
main.ts
   ↓
NestFactory.create(AppModule)
   ↓
NestJS initializes modules and dependencies
   ↓
HTTP server starts
   ↓
Application listens on port 3000
```

## What is the role of `AppModule` in the project?

`AppModule` is the root module of the NestJS application. It tells NestJS which controllers, services, and other modules are part of the application.

Example:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

As the project grows, additional feature modules can be imported into `AppModule`.

For example:

```ts
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
```

## How does NestJS structure help with scalability?

NestJS uses a modular structure that separates different responsibilities into modules, controllers, and services. This makes the codebase easier to organize and maintain as the application grows.

For example:

```text
src/
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
│
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts
│   └── products.service.ts
│
└── app.module.ts
```

Each feature can be developed independently while still being connected through modules and dependency injection. This makes it easier for larger teams to work on different parts of the application without putting all functionality into the same files.
