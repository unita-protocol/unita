import { createDb, type Database } from "@unita/db";

let _db: Database | null = null;

export function getDb(): Database {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL environment variable is required. Set up Supabase and add it to .env"
      );
    }
    _db = createDb(url);
  }
  return _db;
}

export const db = new Proxy({} as Database, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
