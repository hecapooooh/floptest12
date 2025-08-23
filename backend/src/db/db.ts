// db.ts
import Database from "better-sqlite3";

const db = new Database("app.db");

// exemple de création de table
db.exec(`
CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  muscle_group TEXT
);
`);
console.log("✅ Base SQLite initialisée !");

export default db;
