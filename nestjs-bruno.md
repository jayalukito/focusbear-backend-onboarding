# NestJS Bruno Reflection

## How does Bruno help with API testing compared to Postman or cURL?

Bruno helps with API testing by providing a graphical interface for creating, sending, and organizing HTTP requests.

Compared with cURL, Bruno is easier to use for repeated API testing because I do not need to rewrite long commands every time I want to test an endpoint.

For example, a cURL request may look like:

```bash
curl -X GET \
  http://localhost:3000/users \
  -H "Authorization: Bearer test-token"
```

In Bruno, I can save the request once and run it again whenever needed.

Bruno is also similar to Postman because both provide an interface for API testing, but Bruno stores collections as files that can be kept directly inside a project repository.

This makes it useful for development teams because API requests can be version-controlled together with the backend source code.

For a NestJS backend, Bruno can be used to manually verify endpoints such as:

```text
GET /users
POST /users
PUT /users/:id
DELETE /users/:id
```

and inspect their request bodies, headers, HTTP status codes, and responses.

## How do you send an authenticated request in Bruno?

An authenticated request can be sent by adding an authorization header to the request.

For a Bearer token, the request would include:

```text
Authorization: Bearer <token>
```

For example:

```text
Authorization: Bearer test-jwt
```

In Bruno, this can be configured through the request's authentication settings or by manually adding the `Authorization` header.

A request to a protected NestJS endpoint could therefore look like:

```text
GET http://localhost:3000/users
```

with:

```text
Authorization: Bearer test-jwt
```

The flow is:

```text
Bruno
  ↓
Authorization header
  ↓
NestJS authentication guard
  ↓
Token is validated
  ↓
Controller
  ↓
API response
```

Using environment variables is preferable to hardcoding real access tokens directly inside saved requests.

For example, a Bruno environment could contain:

```text
baseUrl = http://localhost:3000
accessToken = <token>
```

The request can then use those variables rather than storing credentials directly in the collection.

## What are the advantages of organizing API requests in collections?

Collections make API requests easier to organize, reuse, and share.

Instead of manually recreating requests each time, related endpoints can be grouped together.

For example:

```text
Users
├── Get All Users
├── Create User
├── Get User
├── Update User
└── Delete User
```

This makes it easier to understand what endpoints are available in the backend.

Collections are also useful because request configuration can be saved, including:

```text
HTTP method
URL
Headers
Authentication
Request body
Environment variables
```

For a team project, storing the Bruno collection in Git also allows developers to use the same API requests.

If a new endpoint is added, the corresponding Bruno request can be committed together with the backend change.

This makes the collection a useful development and testing resource in addition to API documentation.

## How would you structure a Bruno collection for a NestJS backend project?

I would organize the Bruno collection based on the main NestJS modules or API resources.

For example:

```text
bruno/
├── Auth/
│   ├── Login
│   ├── Register
│   └── Profile
│
├── Users/
│   ├── Get All Users
│   ├── Get User
│   ├── Create User
│   ├── Update User
│   └── Delete User
│
├── Health/
│   └── Health Check
│
└── environments/
    ├── local
    └── development
```

This structure reflects how the NestJS application itself may be separated into modules such as:

```text
AuthModule
UsersModule
HealthModule
```

I would also use environment variables for values that change between environments.

For example:

```text
Local

baseUrl = http://localhost:3000
```

and:

```text
Development

baseUrl = https://development-api.example.com
```

Requests could then use:

```text
{{baseUrl}}/users
```

instead of hardcoding the full URL.

Sensitive values such as JWTs, API keys, or secrets should not be committed directly into the collection. They should be stored using environment-specific or local configuration that is excluded from version control where appropriate.

Structuring the collection this way keeps the API requests aligned with the NestJS backend architecture and makes them easier to maintain as the application grows.
