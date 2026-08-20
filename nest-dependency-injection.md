# NestJS Dependency Injection #43

## How does dependency injection improve maintainability?

Dependency injection reduces tight coupling between classes because a class does not need to manually create its own dependencies.

Instead of:

```ts
const usersService = new UsersService();
```

NestJS allows the dependency to be provided through the constructor:

```ts
constructor(
  private readonly usersService: UsersService,
) {}
```

This makes dependencies easier to replace, test, and maintain. For example, a real database service can be replaced with a mock service during testing without changing the controller logic.

## What is the purpose of the `@Injectable()` decorator?

The `@Injectable()` decorator tells NestJS that a class can be managed by the dependency injection container and used as a provider.

For example:

```ts
@Injectable()
export class UsersService {
  findAll() {
    return ['John', 'Jane'];
  }
}
```

The service can then be registered in a module:

```ts
@Module({
  providers: [UsersService],
})
export class UsersModule {}
```

After that, NestJS can inject `UsersService` into another class such as a controller.

## What are the different types of provider scopes, and when would you use each?

NestJS provides three main provider scopes:

### Singleton / Default

```ts
@Injectable()
export class UsersService {}
```

Singleton is the default scope. NestJS creates one instance of the provider and shares it throughout the application.

It should be used for most services because it is efficient and avoids repeatedly creating new objects.

### Request

```ts
@Injectable({
  scope: Scope.REQUEST,
})
export class UsersService {}
```

A request-scoped provider creates a new instance for every incoming request.

This can be useful when a service needs data that belongs specifically to one request, such as request tracking, per-request caching, or tenant-specific information.

### Transient

```ts
@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {}
```

A transient provider creates a separate instance for each class that injects it.

This can be useful when different consumers need independent instances of the same service.

In summary:

```text
DEFAULT / SINGLETON
→ One shared instance
→ Best for most services

REQUEST
→ One instance per HTTP request
→ Useful for request-specific state

TRANSIENT
→ New instance for each consumer
→ Useful when consumers need independent instances
```

## How does NestJS automatically resolve dependencies?

NestJS uses an Inversion of Control container to manage providers and their dependencies.

For example:

```ts
@Injectable()
export class UsersService {}
```

The provider is registered inside a module:

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

The controller then declares that it needs `UsersService`:

```ts
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
}
```

When NestJS creates `UsersController`, it detects the `UsersService` dependency, finds the registered provider, creates or retrieves the appropriate instance, and injects it into the controller.

The dependency resolution flow is:

```text
UsersController
      ↓
Needs UsersService
      ↓
NestJS DI Container
      ↓
Finds UsersService provider
      ↓
Creates or retrieves instance
      ↓
Injects it into UsersController
```

NestJS also resolves nested dependencies automatically. If `UsersService` depends on another provider, NestJS resolves that provider first and builds the dependency graph in the required order.
