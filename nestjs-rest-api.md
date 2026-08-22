# NestJS REST API

## What is the role of a controller in NestJS?

A controller handles incoming HTTP requests and returns responses to the client. It defines API routes using decorators such as `@Get()`, `@Post()`, `@Patch()`, and `@Delete()`.

For example:

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'Get all users';
  }
}
```

This maps the `GET /users` request to the `findAll()` method.

## How should business logic be separated from the controller?

Controllers should focus on handling HTTP requests, while business logic should be placed inside services.

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

The service contains the actual logic:

```ts
@Injectable()
export class UsersService {
  findAll() {
    return ['John', 'Jane'];
  }
}
```

This keeps the controller simple and makes responsibilities clearer.

## Why is it important to use services instead of handling logic inside controllers?

Using services keeps business logic separate from HTTP-related code. This makes the logic easier to reuse, test, maintain, and update without making controllers large and difficult to manage.

Services can also be injected into multiple controllers or other providers using NestJS dependency injection.

## How does NestJS automatically map request methods (`GET`, `POST`, etc.) to handlers?

NestJS uses decorators to define which HTTP method and route should call a controller method.

For example:

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'Get users';
  }

  @Post()
  create() {
    return 'Create user';
  }

  @Delete(':id')
  remove() {
    return 'Delete user';
  }
}
```

NestJS maps these methods as:

```text
GET    /users      → findAll()
POST   /users      → create()
DELETE /users/:id  → remove()
```

The `@Controller()` decorator defines the base route, while decorators such as `@Get()`, `@Post()`, and `@Delete()` define the HTTP method and additional route path for each handler.
