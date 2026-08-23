# NestJS RBAC Reflection

## How does Auth0 store and manage user roles?

Auth0 manages roles through its Role-Based Access Control (RBAC) system. Roles such as `admin`, `manager`, or `user` can be created in Auth0 and assigned to users.

Permissions can also be assigned to each role. This allows multiple users with the same role to share the same set of permissions without configuring access individually for every user.

For example:

```text
User: Alice
   ↓
Role: admin
   ↓
Permissions:
- read:users
- create:users
- delete:users
```

When needed, user roles can be added to an Auth0 access token as a custom claim and then read by the backend.

## What is the purpose of a guard in NestJS?

A guard determines whether a request is allowed to continue to a controller endpoint.

Guards are commonly used for authentication and authorization. For example, an authentication guard can verify that a user has a valid JWT, while a roles guard can check whether the authenticated user has the required role.

The request flow can look like:

```text
Request
   ↓
Authentication Guard
   ↓
Roles Guard
   ↓
Controller
```

If the guard returns `false` or throws an exception, the request is blocked before the controller logic is executed.

## How would you restrict access to an API endpoint based on user roles?

A custom `@Roles()` decorator can define which roles are allowed to access an endpoint.

For example:

```ts
@Get('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
getAdminData() {
  return {
    message: 'Admin access granted',
  };
}
```

The authentication guard first verifies the access token and stores the authenticated user information in `request.user`.

The `RolesGuard` then reads the user's roles and compares them with the roles required by the endpoint.

```text
Required role:
admin

User roles:
["admin"]

        ↓

Access granted
```

If the user is authenticated but does not have the required role, the API should return `403 Forbidden`.

## What are the security risks of improper authorization, and how can they be mitigated?

Improper authorization can allow users to access data or functionality that they should not be able to use. For example, a normal user could potentially access an admin endpoint, modify another user's data, or perform privileged operations.

These risks can be reduced by enforcing authorization on the backend, validating access tokens correctly, using guards consistently, and following the principle of least privilege.

Frontend checks should only be used to improve the user experience, such as hiding admin buttons. They should not be treated as the main security mechanism because users can bypass the frontend and call the API directly.

Authorization should therefore always be enforced by the backend before protected business logic is executed.
