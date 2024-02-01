import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./src/db/schema/*",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
  verbose: true,
  strict: true,
});
