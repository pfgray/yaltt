import * as fs from "fs/promises";
import * as path from "path";
import { Effect, pipe } from "effect";
import { DecodeQueryError, PgError, query, queryRaw } from "./db";
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

const createMigrationsTable = queryRaw(
  `CREATE TABLE IF NOT EXISTS migrations (
    filename VARCHAR(255) PRIMARY KEY,
    executed_at TIMESTAMP DEFAULT NOW()
  )`,
  []
);

const getExecutedMigrations = pipe(
  query(S.struct({ filename: S.string }))(
    "SELECT filename FROM migrations ORDER BY filename",
    []
  ),
  Effect.map((rows) => rows.map((row) => row.filename))
);

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
  pipe(
    queryRaw("BEGIN", []),
    Effect.map((a) => {
      console.log("Began migration");
      return a;
    }),
    Effect.flatMap(() => queryRaw(sql, [])),
    Effect.map((a) => {
      console.log("Finished executing migration SQL");
      return a;
    }),
    Effect.flatMap(() =>
      queryRaw("INSERT INTO migrations (filename) VALUES ($1)", [filename])
    ),
    Effect.map((a) => {
      console.log("Finished creating migration record");
      return a;
    }),
    Effect.flatMap(() => queryRaw("COMMIT", [])),
    Effect.map((a) => {
      console.log("Finished committing migration");
      return a;
    }),
    Effect.tap(() =>
      Effect.sync(() => console.log(`✓ Executed migration: ${filename}`))
    ),
    Effect.catchAll((cause) => {
      return pipe(
        queryRaw("ROLLBACK", []),
        Effect.flatMap(() => Effect.fail(migrationError(filename, cause)))
      );
    }),
    Effect.map(() => void 0)
  );

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
