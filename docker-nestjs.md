# Docker with NestJS

## How does a `Dockerfile` define a containerized NestJS application?

A `Dockerfile` defines the environment and instructions needed to run a NestJS application inside a container. It specifies the base Node.js image, working directory, dependencies, source files, exposed port, and the command used to start the NestJS server.

For example:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
```

This ensures that developers can run the application in a consistent environment without manually configuring Node.js and dependencies on their machines.

## What is the purpose of a multi-stage build in Docker?

A multi-stage build separates the build process from the final runtime image. This allows build tools and development dependencies to be used during compilation without including them in the final production image.

This helps create smaller, cleaner, and more secure Docker images. For a development environment, however, a simple single-stage Dockerfile is often sufficient.

## How does Docker Compose simplify running multiple services together?

Docker Compose allows multiple services to be defined in one file and started with a single command.

For example, a NestJS API and PostgreSQL database can be configured together:

```text
Docker Compose
├── NestJS API
└── PostgreSQL
```

Running:

```bash
docker compose up
```

starts both services, creates the required Docker network, connects the containers, and applies their ports, environment variables, and volumes automatically.

It also allows containers to communicate using service names, such as:

```text
postgres:5432
```

instead of manually configuring container IP addresses.

## How can you expose API logs and debug a running container?

Container logs can be viewed using Docker Compose:

```bash
docker compose logs api
```

For live logs:

```bash
docker compose logs -f api
```

The status of running containers can be checked with:

```bash
docker compose ps
```

A shell can also be opened inside the NestJS container:

```bash
docker compose exec api sh
```

This makes it possible to inspect files, run commands, test dependencies, and investigate errors directly inside the container.

Docker logs, container status commands, and interactive shell access make it easier to identify problems such as application crashes, database connection failures, or incorrect environment variables.
