# NestJS Introduction

## What are the key differences between NestJS and Express.js?

Express.js is a lightweight and flexible Node.js web framework that gives developers freedom to structure applications however they want. NestJS is a higher-level framework that provides a structured architecture using modules, controllers, services, dependency injection, and decorators.

NestJS actually uses Express by default underneath, but adds conventions and architecture that make larger applications easier to organize and maintain.

## Why does NestJS use decorators extensively?

NestJS uses decorators to provide metadata about classes and methods. Decorators such as `@Controller()`, `@Get()`, and `@Injectable()` tell NestJS how different parts of the application should behave.

For example:

```ts
@Controller("users")
export class UsersController {}
```

The `@Controller("users")` decorator tells NestJS that the class handles requests starting with `/users`.

Similarly:

```ts
@Injectable()
export class UsersService {}
```

The `@Injectable()` decorator tells NestJS that the service can be managed and injected through NestJS's dependency injection system.

## How does NestJS handle dependency injection?

NestJS has a built-in dependency injection system. Instead of manually creating dependencies, NestJS creates and provides them automatically through the constructor.

For example:

```ts
@Injectable()
export class UsersService {
  getUsers() {
    return ["John", "Jane"];
  }
}
```

The service can then be injected into a controller:

```ts
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
```

NestJS creates the `UsersService` instance and passes it to `UsersController`. This reduces tight coupling between classes and makes the application easier to test and maintain.

## What benefits does modular architecture provide in a large-scale app?

NestJS modules group related functionality together, such as controllers, services, and providers.

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

This modular structure makes large applications easier to organize, maintain, test, and scale. Each feature can be developed independently without putting all application logic into the same files.

## NestJS Architecture

The three main parts of a basic NestJS feature are:

* **Module** — groups related controllers and services together.
* **Controller** — handles incoming HTTP requests and returns responses.
* **Service** — contains business logic and reusable functionality.

A typical request flow looks like:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Database / Other Services
     ↓
Controller
     ↓
HTTP Response
```
