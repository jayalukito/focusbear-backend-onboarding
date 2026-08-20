# NestJS CLI

## How does the NestJS CLI help streamline development?

The NestJS CLI speeds up development by generating common NestJS files and boilerplate automatically. Instead of manually creating modules, controllers, services, and test files, developers can use CLI commands that follow NestJS conventions.

For example:

```bash
nest generate controller users
nest generate service users
nest generate module users
```

These can also be shortened to:

```bash
nest g controller users
nest g service users
nest g module users
```

This saves time and reduces mistakes when setting up new features.

## What is the purpose of `nest generate`?

`nest generate` creates NestJS components based on predefined templates.

For example:

```bash
nest generate controller users
```

creates a controller for the `users` feature.

```bash
nest generate service users
```

creates a service.

```bash
nest generate module users
```

creates a module.

The CLI can also generate an entire CRUD resource:

```bash
nest generate resource users
```

This can generate the module, controller, service, DTOs, entity, and test files together.

## How does using the CLI ensure consistency across the codebase?

The CLI generates files using the same naming conventions, folder structure, decorators, and coding patterns expected by NestJS.

For example, generated services use:

```ts
@Injectable()
export class UsersService {}
```

Generated controllers use:

```ts
@Controller('users')
export class UsersController {}
```

Generated modules use:

```ts
@Module({})
export class UsersModule {}
```

Because these templates are consistent, different developers are less likely to organize features in completely different ways.

This is especially useful in larger projects where many developers are working on separate modules.

## What types of files and templates does the CLI create by default?

The NestJS CLI can generate many different application components, including:

* Modules
* Controllers
* Services
* Providers
* Guards
* Interceptors
* Middleware
* Pipes
* Filters
* Gateways
* Decorators
* Classes
* Interfaces
* Resources

For example:

```bash
nest g module products
nest g controller products
nest g service products
```

could create:

```text
src/
└── products/
    ├── products.module.ts
    ├── products.controller.ts
    ├── products.controller.spec.ts
    ├── products.service.ts
    └── products.service.spec.ts
```

By default, many generators also create `.spec.ts` files for testing.

If test files are not needed, they can usually be skipped with:

```bash
nest g controller users --no-spec
```

## Useful NestJS CLI Commands

### Start the application

```bash
nest start
```

For development with automatic reload:

```bash
nest start --watch
```

This is commonly available through:

```bash
npm run start:dev
```

### Generate files

```bash
nest generate controller users
nest generate service users
nest generate module users
```

Short form:

```bash
nest g controller users
nest g service users
nest g module users
```

### Generate a complete resource

```bash
nest g resource users
```

This is useful for quickly creating a complete feature with CRUD endpoints.

### Build the application

```bash
nest build
```

`nest build` compiles the NestJS TypeScript source code into JavaScript, usually placing the generated files inside the `dist` directory.

The general workflow is:

```text
Write TypeScript
      ↓
nest build
      ↓
Compile application
      ↓
dist/
      ↓
Run compiled JavaScript
```

Overall, the NestJS CLI supports NestJS's modular architecture by making it easy to generate features using a predictable and consistent project structure.
