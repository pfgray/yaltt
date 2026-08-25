import * as fs from "fs/promises";
import * as path from "path";
import { Effect, pipe } from "effect";
import { DecodeQueryError, PgError, query, queryRaw, pool } from "./db";
import * as S from "@effect/schema/Schema";

const MigrationRecord = S.struct({
  filename: S.string,
  executed_at: S.string,
});

interface GenericError {
  _tag: "generic_error";
  message: string;
  cause: unknown;
}

interface MigrationError {
  _tag: "migration_error";
  filename: string;
  cause: PgError | DecodeQueryError;
}

const genericError = (message: string, cause: unknown): GenericError => ({
  _tag: "generic_error",
  message,
  cause,
});

const migrationError = (
  filename: string,
  cause: PgError | DecodeQueryError
): MigrationError => ({
  _tag: "migration_error",
  filename,
  cause,
});

const createMigrationsTable = Effect.tryPromise({
  try: () =>
    pool.query(
      `CREATE TABLE IF NOT EXISTS migrations (
        filename VARCHAR(255) PRIMARY KEY,
        executed_at TIMESTAMP DEFAULT NOW()
      )`
    ),
  catch: (error) => ({
    _tag: "pg_error" as const,
    cause: error as Error,
    query: "CREATE TABLE migrations",
  }),
});

const getExecutedMigrations = Effect.tryPromise({
  try: async () => {
    const result = await pool.query(
      "SELECT filename FROM migrations ORDER BY filename"
    );
    return result.rows.map((row: any) => row.filename as string);
  },
  catch: (error) => ({
    _tag: "pg_error" as const,
    cause: error as Error,
    query: "SELECT filename FROM migrations",
  }),
});

const getMigrationFiles = (migrationsDir: string) =>
  Effect.tryPromise({
    try: async () => {
      try {
        const files = await fs.readdir(migrationsDir);
        return files.filter((file) => file.endsWith(".sql")).sort();
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") {
          console.log(`Migrations directory ${migrationsDir} does not exist`);
          return [];
        }
        throw err;
      }
    },
    catch: (error) =>
      genericError("Failed to read migrations directory", error),
  });

const readMigrationFile = (filePath: string) =>
  Effect.tryPromise({
    try: () => fs.readFile(filePath, "utf-8"),
    catch: (error) => genericError("Failed to read migration file", error),
  });

const executeMigration = (filename: string, sql: string) =>
  Effect.tryPromise({
    try: async () => {
      try {
        await pool.query("BEGIN");
        console.log("Began migration");
        await pool.query(sql);
        console.log("Finished executing migration SQL");
        await pool.query("INSERT INTO migrations (filename) VALUES ($1)", [
          filename,
        ]);
        console.log("Finished creating migration record");
        await pool.query("COMMIT");
        console.log("Finished committing migration");
        console.log(`✓ Executed migration: ${filename}`);
      } catch (error) {
        await pool.query("ROLLBACK");
        throw error;
      }
    },
    catch: (error) =>
      migrationError(filename, {
        _tag: "pg_error" as const,
        cause: error as Error,
        query: filename,
      }),
  });

export const runMigrations = (
  migrationsDir: string = process.env.MIGRATIONS_DIR || "./migrations"
) =>
  pipe(
    Effect.succeed(void 0),
    Effect.tap(() =>
      Effect.sync(() =>
        console.log(`Using migrations directory: ${migrationsDir}`)
      )
    ),
    Effect.mapError((a) => a),
    Effect.tap(() =>
      Effect.sync(() => console.log("Setting up migrations table..."))
    ),
    Effect.flatMap(() => createMigrationsTable),
    Effect.tap(() =>
      Effect.sync(() => console.log("Getting executed migrations..."))
    ),
    Effect.bind("executedMigrations", () => getExecutedMigrations),
    Effect.tap(() =>
      Effect.sync(() => console.log("Scanning for migration files..."))
    ),
    Effect.bind("migrationFiles", () => getMigrationFiles(migrationsDir)),
    Effect.flatMap(({ executedMigrations, migrationFiles }) => {
      const pendingMigrations = migrationFiles.filter(
        (file) => !executedMigrations.includes(file)
      );

      if (pendingMigrations.length === 0) {
        return Effect.sync(() => console.log("No pending migrations"));
      }

      console.log(`Found ${pendingMigrations.length} pending migration(s):`);
      pendingMigrations.forEach((file) => console.log(`  - ${file}`));

      return Effect.forEach(
        pendingMigrations,
        (filename) =>
          pipe(
            readMigrationFile(path.join(migrationsDir, filename)),
            Effect.flatMap((sql) => executeMigration(filename, sql))
          ),
        { concurrency: 1 }
      );
    }),

    Effect.mapError((a) => a),
    Effect.tap(() =>
      Effect.sync(() => console.log("Migrations completed successfully"))
    )
  );
