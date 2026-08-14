# PostgreSQL with Docker Reflection

## What are the benefits of running PostgreSQL in a Docker container?

Running PostgreSQL in a Docker container makes the database environment easier to set up and keep consistent.

Instead of installing PostgreSQL directly on my computer, I can run a specific PostgreSQL version using a Docker image. This is useful because every developer can use the same database version and configuration.

For example:

```bash
docker run --name postgres-db \
  -e POSTGRES_USER=developer \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres:17
```

Some benefits are:

- Easier setup and removal
- The PostgreSQL version can be controlled
- It does not require as much configuration directly on the host machine
- Different projects can run different PostgreSQL versions
- The development environment is easier to reproduce for other developers

For backend development, I find this useful because I can start the database when I need it and remove the container without having to uninstall PostgreSQL from my machine.

## How do Docker volumes help persist PostgreSQL data?

Containers are designed to be replaceable. If PostgreSQL stores its data only inside the container and that container is removed, the database data may also be lost.

Docker volumes solve this by storing the database files separately from the container.

For example, in Docker Compose:

```yaml
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Here, `postgres_data` is a Docker volume.

The important part is:

```yaml
postgres_data:/var/lib/postgresql/data
```

PostgreSQL stores its database files in `/var/lib/postgresql/data`, and Docker maps that directory to the `postgres_data` volume.

This means I can remove and recreate the PostgreSQL container while keeping the database data.

For example:

```bash
docker compose down
docker compose up -d
```

The data should still be available because the volume was not removed.

However, if I run:

```bash
docker compose down -v
```

the `-v` option also removes the volumes, so the PostgreSQL data stored in that volume can be deleted.

## How can you connect to a running PostgreSQL container?

There are several ways to connect to PostgreSQL running inside Docker.

First, I can check whether the container is running:

```bash
docker ps
```

If the container is called `postgres-db`, I can open PostgreSQL's command-line client inside the container using:

```bash
docker exec -it postgres-db psql -U developer -d mydb
```

After connecting, I should see something similar to:

```text
mydb=#
```

Then I can run PostgreSQL commands such as:

```sql
SELECT version();
```

or:

```sql
\dt
```

To exit:

```text
\q
```

I can also connect from my local machine or from tools such as DBeaver, DataGrip, or pgAdmin if PostgreSQL's port has been exposed.

For example, if the Compose configuration contains:

```yaml
ports:
  - "5432:5432"
```

I can normally connect using:

```text
Host: localhost
Port: 5432
Database: mydb
Username: developer
Password: password
```

If another Docker container needs to connect to PostgreSQL in the same Docker Compose setup, it usually should not use `localhost`. Instead, it can use the PostgreSQL service name.

For example:

```yaml
services:
  backend:
    environment:
      DATABASE_HOST: postgres

  postgres:
    image: postgres:17
```

The backend can then connect using:

```text
postgres:5432
```

because Docker Compose provides networking between the services automatically.

My main takeaway is that Docker makes PostgreSQL easier to run consistently, while Docker volumes make sure important database data is not tied to the lifetime of a single container.
