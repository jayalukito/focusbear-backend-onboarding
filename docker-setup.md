# Docker Compose Reflection

## What is the difference between `docker run` and `docker compose up`?

`docker run` is usually used to create and start a single container directly from a Docker image. When using it, I need to provide the configuration manually through command-line options, such as ports, environment variables, volumes, and container names.

For example:

```bash
docker run -d -p 8080:80 nginx
```

On the other hand, `docker compose up` is used when the application configuration is already defined inside a `compose.yaml` or `docker-compose.yml` file.

For example:

```bash
docker compose up -d
```

With Docker Compose, I do not need to write a long command every time. Docker reads the services and their configurations from the Compose file and starts them for me.

I see `docker run` as useful for quickly running one container, while Docker Compose is more suitable for applications that have several services or more complicated configurations.

## How does Docker Compose help when working with multiple services?

Docker Compose makes it much easier to manage applications that depend on multiple services.

For example, a backend application might need:

- A backend API
- PostgreSQL
- Redis

Without Docker Compose, I may need to start each container separately and manually configure their ports, networks, environment variables, and other settings.

With Docker Compose, all of those services can be defined in one file.

For example:

```yaml
services:
  backend:
    build: .
    ports:
      - "3000:3000"

  postgres:
    image: postgres:17

  redis:
    image: redis:7
```

Then I can start everything with:

```bash
docker compose up -d
```

This makes the development environment easier to reproduce because other developers can use the same Compose configuration instead of setting up every service manually.

## What commands can you use to check logs from a running container?

The main command I can use is:

```bash
docker logs <container-name>
```

For example:

```bash
docker logs backend
```

This displays the logs produced by the container.

If I want to continuously watch new logs as they are generated, I can use:

```bash
docker logs -f backend
```

The `-f` option means "follow".

I can also display only the latest logs:

```bash
docker logs --tail 100 backend
```

When working with Docker Compose, I can use:

```bash
docker compose logs
```

to see logs from all services.

For a specific service:

```bash
docker compose logs backend
```

And to continuously follow the logs:

```bash
docker compose logs -f backend
```

These commands are especially useful when debugging backend errors because I can see exceptions, database connection problems, request logs, and other runtime information.

## What happens when you restart a container? Does data persist?

When a container is restarted, Docker stops the running process inside the container and then starts the same container again.

For example:

```bash
docker restart backend
```

The container keeps its existing configuration, such as its port mappings, environment variables, and attached volumes.

Data stored inside the container's writable filesystem will normally still exist after a simple restart because Docker is restarting the same container rather than creating a new one.

However, this does not mean the data is permanently safe.

If the container is deleted and recreated, data stored only inside the container can be lost.

For important data, such as PostgreSQL database files, Docker volumes should be used.

For example:

```yaml
services:
  postgres:
    image: postgres:17
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

With a volume, the database data is stored separately from the container itself. This means the PostgreSQL container can be stopped, restarted, or even recreated while the database data can still remain.

So my understanding is:

- Restarting the same container → data usually remains.
- Stopping and starting the same container → data remains.
- Removing and recreating a container → data inside the container can be lost.
- Using Docker volumes → important data can persist independently from the container.
