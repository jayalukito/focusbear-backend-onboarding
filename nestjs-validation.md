# NestJS Validation

## What is the purpose of pipes in NestJS?

Pipes are used to transform or validate incoming request data before it reaches a controller handler. They help ensure that the controller receives data in the expected format.

For example, `ParseIntPipe` can convert a route parameter from a string into a number:

```ts
@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.usersService.findOne(id);
}
```

## How does `ValidationPipe` improve API security and data integrity?

`ValidationPipe` checks incoming request data against validation rules defined in DTOs. Invalid requests can be rejected before they reach the controller or service.

For example:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

This can remove or reject unexpected fields and help ensure that only valid data is processed by the application.

## What is the difference between built-in and custom pipes?

Built-in pipes are provided by NestJS for common tasks such as converting or validating route parameters.

Examples include:

```text
ParseIntPipe
ParseBoolPipe
ParseUUIDPipe
ValidationPipe
```

Custom pipes are created by developers when application-specific validation or transformation is required.

For example, a custom pipe could check whether a value follows a specific business rule before allowing the request to continue.

## How do decorators like `@IsString()` and `@IsNumber()` work with DTOs?

Decorators such as `@IsString()` and `@IsNumber()` come from `class-validator` and define validation rules on DTO properties.

For example:

```ts
import {
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNumber()
  age!: number;
}
```

When `ValidationPipe` receives request data, it reads these validation rules and checks whether the incoming values match them.

For example:

```json
{
  "name": 123,
  "email": "invalid-email",
  "age": "twenty"
}
```

would fail validation because the values do not match the DTO requirements.

The request flow is:

```text
HTTP Request
     ↓
ValidationPipe
     ↓
Check DTO decorators
     ↓
Valid?
 ┌───┴────┐
Yes       No
 ↓         ↓
Controller 400 Bad Request
```
