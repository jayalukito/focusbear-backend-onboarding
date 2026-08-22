# NestJS TypeORM Reflection

## How does `@nestjs/typeorm` simplify database interactions?

`@nestjs/typeorm` integrates TypeORM with NestJS's module and dependency injection system. It allows repositories to be registered with `TypeOrmModule.forFeature()` and injected directly into services using `@InjectRepository()`.

This reduces manual database setup and keeps database access consistent with NestJS architecture.

## What is the difference between an entity and a repository in TypeORM?

An entity represents the structure of a database table, including its columns and relationships.

For example:

```ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
```

A repository is used to perform database operations on that entity, such as retrieving, creating, updating, or deleting records.

For example:

```ts
this.userRepository.find();
this.userRepository.save(user);
this.userRepository.delete(id);
```

In short:

```text
Entity
→ defines the data structure

Repository
→ performs database operations
```

## How does TypeORM handle migrations in a NestJS project?

TypeORM migrations store database schema changes in versioned migration files. When an entity changes, a migration can be generated and reviewed before being applied to the database.

For example:

```text
Update Entity
     ↓
Generate Migration
     ↓
Review Database Changes
     ↓
Run Migration
     ↓
Database Schema Updated
```

Migrations are useful because database changes can be tracked in Git and applied consistently across different environments.

They are safer for production than relying on `synchronize: true`, because schema changes happen explicitly instead of automatically.

## What are the advantages of using PostgreSQL over other databases in a NestJS app?

PostgreSQL is a reliable relational database with strong support for transactions, relationships, constraints, indexing, and complex queries.

It also provides advanced features such as JSON and JSONB while still maintaining relational database capabilities. PostgreSQL works well with NestJS and TypeORM and is suitable for applications that require structured data and strong data consistency.
