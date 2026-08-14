# Docker Debugging Reflection

## How can you check logs from a running container?

To check logs from a running Docker container, I can use the `docker logs` command followed by the container name or container ID.

For example:

```bash
docker logs backend
```

This shows the logs that have already been produced by the container.

If I want to keep watching the logs while the application is running, I can use:

```bash
docker logs -f backend
```

The `-f` option means "follow", so new logs will continue to appear in the terminal.

I can also limit the output to the latest lines:

```bash
docker logs --tail 100 backend
```

When the application is running with Docker Compose, I can check logs for all services with:

```bash
docker compose logs
```

Or only one service:

```bash
docker compose logs backend
```

To continuously follow the logs of a specific Compose service:

```bash
docker compose logs -f backend
```

I think logs are usually one of the first things I should check when a container is running but the application is not behaving as expected. For a NestJS backend, the logs can show errors such as failed database connections, missing environment variables, application startup failures, or runtime exceptions.

## What is the difference between `docker exec` and `docker attach`?

Both commands let me interact with a running container, but they work differently.

`docker exec` starts a new command or process inside an already running container.

For example:

```bash
docker exec -it backend sh
```

This opens a new shell inside the `backend` container while the main application continues running normally.

I can then run commands such as:

```bash
ls
```

or:

```bash
printenv
```

This is useful for debugging because I can inspect files, environment variables, network connectivity, or other things inside the container without directly interacting with the main application process.

`docker attach`, on the other hand, connects my terminal directly to the standard input, output, and error streams of the container's main process.

For example:

```bash
docker attach backend
```

If the main process is a NestJS application, I would be attaching directly to that running process rather than opening a separate shell.

Because of this, I would normally use `docker exec` when I need to inspect or debug something inside a container. I would use `docker attach` when I specifically need to interact with the container's main process.

Another thing I need to be careful about is exiting from an attached container. Depending on how the process is running, sending an interrupt such as `Ctrl+C` may also affect or stop the main process. For simply viewing logs, `docker logs` is usually safer and more convenient.

## How do you restart a container without losing data?

A running container can be restarted using:

```bash
docker restart backend
```

For a Docker Compose service, I can use:

```bash
docker compose restart backend
```

Restarting a container stops its main process and starts the same container again. A normal restart does not remove and recreate the container.

This means that data in the existing container filesystem normally remains after a restart. However, I should not rely on the container filesystem for important persistent data because containers may eventually be removed or recreated.

For important data, especially database data, I should use Docker volumes.

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

With this setup, PostgreSQL data is stored in the `postgres_data` volume instead of depending only on the lifetime of the PostgreSQL container.

This means I can restart the database container:

```bash
docker compose restart postgres
```

or even recreate it, and the data can still be available as long as the volume is kept.

For example:

```bash
docker compose down
docker compose up -d
```

normally keeps named volumes.

However, I need to be careful with:

```bash
docker compose down -v
```

because the `-v` option removes the Compose volumes as well. If the PostgreSQL data is stored in one of those volumes, removing the volume can also remove the database data.

My understanding is that restarting a container itself is normally safe for its existing data, but important application data should still be stored in a persistent volume.

## How can you troubleshoot database connection issues inside a containerized NestJS app?

If a NestJS application cannot connect to its database, I would troubleshoot it step by step instead of immediately assuming the database itself is broken.

### 1. Check whether the containers are running

First, I would check the running containers:

```bash
docker ps
```

If the project uses Docker Compose, I can use:

```bash
docker compose ps
```

I would check that both the NestJS backend and PostgreSQL services are running.

For example, I might expect to see services similar to:

```text
backend
postgres
```

If PostgreSQL is stopped or constantly restarting, the NestJS application will not be able to connect to it.

### 2. Check the NestJS logs

Next, I would check the backend logs:

```bash
docker compose logs backend
```

Or follow them in real time:

```bash
docker compose logs -f backend
```

I would look for errors such as connection refused, authentication failed, unknown host, timeout, or database not found.

These messages usually give me a better idea of whether the problem is related to networking, credentials, configuration, or the database itself.

### 3. Check the PostgreSQL logs

I would also check the PostgreSQL container:

```bash
docker compose logs postgres
```

This can help confirm whether PostgreSQL started successfully and whether it is receiving or rejecting connection attempts.

### 4. Check the database environment variables

I would then verify the database configuration being used by the NestJS container.

For example, the application might use:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=developer
DB_PASSWORD=password
DB_NAME=mydb
```

One important thing I learned is that if NestJS and PostgreSQL are both running as services in the same Docker Compose project, the database host should normally be the Compose service name.

For example:

```env
DB_HOST=postgres
```

instead of:

```env
DB_HOST=localhost
```

Inside the NestJS container, `localhost` refers to the NestJS container itself, not the PostgreSQL container.

A Compose setup might look like:

```yaml
services:
  backend:
    build: .
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: developer
      DB_PASSWORD: password
      DB_NAME: mydb

  postgres:
    image: postgres:17
    environment:
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
```

Docker Compose allows services on the same Compose network to find each other by their service names.

### 5. Check the configuration inside the backend container

I can open a shell inside the running NestJS container:

```bash
docker compose exec backend sh
```

Then I can inspect whether the expected environment variables are available.

For example:

```bash
printenv DB_HOST
```

and:

```bash
printenv DB_PORT
```

I should avoid sharing passwords or other secrets when copying debugging output.

### 6. Check whether the database hostname can be resolved

From inside the backend container, I can test whether the database service name can be resolved.

Depending on which utilities are installed in the image, I might use:

```bash
getent hosts postgres
```

If the container does not have that command, I may need to use another available networking utility or inspect the Docker network from the host.

The main thing I want to confirm is that the backend can find the `postgres` service through Docker's network.

### 7. Check the correct port

Another common mistake is mixing up the host port and the container port.

For example:

```yaml
postgres:
  image: postgres:17
  ports:
    - "5433:5432"
```

From my computer, I would connect to PostgreSQL using:

```text
localhost:5433
```

But another container in the same Compose network should normally connect using:

```text
postgres:5432
```

The backend container communicates with PostgreSQL using the database container's internal port, not the port published to my host machine.

### 8. Check the database credentials and database name

I would make sure the values used by NestJS match the PostgreSQL configuration.

For example:

```yaml
POSTGRES_USER: developer
POSTGRES_PASSWORD: password
POSTGRES_DB: mydb
```

should match the values that the NestJS application is using.

A mismatch could result in authentication or database-not-found errors.

### 9. Check whether PostgreSQL is actually ready

A container being in a running state does not always mean the service inside it is immediately ready to accept connections.

For example, NestJS may start quickly while PostgreSQL is still initializing. This can cause the first database connection attempt to fail.

A health check can help Docker Compose determine whether PostgreSQL is ready.

For example:

```yaml
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U developer -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build: .
    depends_on:
      postgres:
        condition: service_healthy
```

This makes the relationship between the services clearer and can prevent the backend from starting before PostgreSQL is ready.

### 10. Restart the services after fixing the configuration

After correcting the configuration, I can restart the services:

```bash
docker compose restart
```

If I changed something that requires the containers or images to be recreated, I can use:

```bash
docker compose up -d --build
```

Then I would check the logs again:

```bash
docker compose logs -f backend
```

## Conclusion

From this exercise, I learned that Docker debugging is mostly about checking each layer separately.

For a containerized NestJS application, my basic debugging flow would be:

1. Check whether the containers are running.
2. Read the backend logs.
3. Read the database logs.
4. Verify environment variables.
5. Make sure the backend uses the database service name instead of `localhost`.
6. Check the internal database port.
7. Verify the credentials and database name.
8. Make sure the database is ready before the backend connects.
9. Restart or rebuild the services if necessary.

I also learned that `docker exec` is especially useful for debugging because it lets me inspect a running container without directly interfering with its main application process. Combined with `docker logs` and Docker Compose commands, it gives me a practical way to investigate problems in a containerized backend environment.
