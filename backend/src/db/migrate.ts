import { readdir } from 'fs/promises';
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
  
  try {
    // Utilisation de la version async de readdir
    const files = (await readdir(migrationsDir))
      .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
      .sort((a, b) => a.localeCompare(b));

    for (const file of files) {
      if (!applied.includes(file)) {
        console.log(`🚀 Applying migration: ${file}`);
        
        // Import dynamique avec URL complète pour éviter les warnings
        const migrationPath = path.join(migrationsDir, file);
        const migrationUrl = `file://${migrationPath.replace(/\\/g, '/')}`;
        
        const migration = await import(migrationUrl);
        await migration.up(db);
        
        db.prepare('INSERT INTO migrations (name) VALUES (?)').run(file);
      }
    }
  } catch (error) {
    console.error('❌ Error applying migrations:', error);
    throw error;
  }
}
