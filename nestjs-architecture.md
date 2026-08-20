# NestJS Architecture #44

## What is the purpose of a module in NestJS?

A module groups related parts of an application, such as controllers and providers, into one feature area. This helps organize the codebase and makes each feature easier to manage independently.

For example:

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

This means `UsersController` and `UsersService` belong to the same `UsersModule`.

## How does a controller differ from a provider?

A controller handles incoming HTTP requests and returns responses, while a provider usually contains reusable logic such as business logic, database access, or helper functionality.

For example:

```ts
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

The controller handles the route, while the service performs the actual logic:

```ts
@Injectable()
export class UsersService {
  findAll() {
    return ['John', 'Jane'];
  }
}
```

## Why is dependency injection useful in NestJS?

Dependency injection allows NestJS to create and provide dependencies automatically instead of requiring classes to create them manually.

For example:

```ts
constructor(
  private readonly usersService: UsersService,
) {}
```

Instead of doing:

```ts
const usersService = new UsersService();
```

NestJS manages the `UsersService` instance and injects it into the controller. This reduces coupling between classes and makes the application easier to maintain and test.

## How does NestJS ensure modularity and separation of concerns?

NestJS separates different responsibilities into modules, controllers, and providers.

A typical structure looks like:

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

Each feature has its own module and related files. Controllers focus on HTTP requests, while services focus on business logic.

This separation makes the application easier to scale because new features can be added without placing all logic into the same files.
