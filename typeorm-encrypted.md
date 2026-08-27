# Using typeorm-encrypted for Data Encryption #25

## Why does Focus Bear double encrypt sensitive data instead of relying on database encryption alone?

Focus Bear states that sensitive habit data is double encrypted. This is particularly important because habit information may contain private information related to a user's health, lifestyle, or other personal circumstances.

Using multiple encryption layers provides defense in depth. Database-level encryption can protect stored database files, disks, and backups, while application-level field encryption can protect individual sensitive values before they are stored in the database.

For example:

```text
Sensitive habit data
        ↓
Application-level encryption
        ↓
Encrypted database field
        ↓
Database/storage encryption
```

This means that compromising only one layer does not necessarily expose the original sensitive information.

The public Focus Bear privacy information confirms that habit data is double encrypted, although it does not publicly specify the exact technologies used for each encryption layer.

## How does `typeorm-encrypted` integrate with TypeORM entities?

`typeorm-encrypted` integrates with TypeORM through column transformers.

In my implementation, I added an encrypted `privateNote` field to the `User` entity:

```ts
@Column({
  type: 'text',
  nullable: true,
  transformer: userEncryptionTransformer,
})
privateNote?: string;
```

The transformer automatically encrypts the value before TypeORM writes it to PostgreSQL and decrypts it when TypeORM retrieves the entity.

The application can therefore continue working with:

```text
"This is sensitive information"
```

while PostgreSQL stores ciphertext instead of the original plaintext.

I tested this by creating a user through the API and then querying PostgreSQL directly. The database contained the encrypted value, while retrieving the user through the NestJS API returned the decrypted value.

## What are the best practices for securely managing encryption keys?

Encryption keys should never be hardcoded in application source code or committed to Git.

For local development, I configured the key using an environment variable:

```env
USER_ENCRYPTION_KEY=
```

The real value is stored in `.env`, while `.env.example` only documents the name of the required variable.

The encryption key should also be stored separately from the encrypted database data. Otherwise, an attacker who obtains the database could potentially obtain both the ciphertext and the key required to decrypt it.

In production, a dedicated secrets or key-management system such as AWS KMS, Azure Key Vault, HashiCorp Vault, or an HSM is preferable. Applications should also have a strategy for encryption key rotation and key-compromise recovery.

## What are the trade-offs between encrypting at the database level vs. the application level?

Database-level encryption is generally easier to apply across an entire database and is useful for protecting database files, storage devices, and backups. However, the database system usually decrypts the data transparently when an authorized query accesses it.

Application-level encryption encrypts sensitive information before it reaches the database. This provides additional protection if raw database records are exposed because the attacker may still only obtain ciphertext.

However, application-level encryption introduces additional complexity. Encrypted fields can be difficult to search, index, sort, or enforce uniqueness on because the database does not understand the original plaintext value.

For sensitive data, combining database-level and application-level encryption can provide stronger defense in depth, while less sensitive data may not require the added complexity of field-level encryption.
