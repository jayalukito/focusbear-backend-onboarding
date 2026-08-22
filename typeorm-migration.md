# TypeORM Migrations Reflection

## What is the purpose of database migrations in TypeORM?

Database migrations are used to track and apply changes to the database schema over time.

For example, if a new column is added to an entity:

```ts
@Column()
phone!: string;
```

a migration can be generated to update the actual database table:

```sql
ALTER TABLE users
ADD COLUMN phone varchar;
```

This allows database changes to be applied in a controlled and repeatable way.

## How do migrations differ from seeding?

Migrations change the **structure of the database**, while seeding adds **initial or sample data** into the database.

For example:

```text
Migration
→ Create users table
→ Add email column
→ Add foreign key

Seeding
→ Insert admin account
→ Insert default categories
→ Insert sample users
```

In short:

```text
Migration
→ changes schema

Seeding
→ adds data
```

## Why is it important to version-control database schema changes?

Migration files should be committed to Git so every developer and environment can apply the same database changes in the same order.

This keeps the database schema consistent between development, testing, staging, and production environments.

It also creates a history of database changes, making it easier to understand when and why the schema was modified.

## How can you roll back a migration if an issue occurs?

TypeORM migrations normally contain an `up()` method for applying a change and a `down()` method for reversing it.

For example:

```ts
async up(queryRunner: QueryRunner) {
  await queryRunner.query(
    `ALTER TABLE "users" ADD "phone" varchar`,
  );
}

async down(queryRunner: QueryRunner) {
  await queryRunner.query(
    `ALTER TABLE "users" DROP COLUMN "phone"`,
  );
}
```

If the migration causes an issue, the latest migration can be reverted using:

```bash
typeorm migration:revert
```

TypeORM then executes the migration's `down()` method to undo the most recent schema change.
