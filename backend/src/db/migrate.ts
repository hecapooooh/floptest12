import fs from 'fs';
import path from 'path';

export async function applyMigrations(db) {
  // Table pour suivre les migrations déjà appliquées
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const applied = db.prepare('SELECT name FROM migrations').all().map(r => r.name);

  const migrationsDir = path.resolve('src/db/migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!applied.includes(file)) {
      console.log(`🚀 Applying migration: ${file}`);
      // Import dynamique ES module
      const migration = await import(path.join(migrationsDir, file));
      await migration.up(db); // ta fonction up peut aussi être async
      db.prepare('INSERT INTO migrations (name) VALUES (?)').run(file);
    }
  }
}
