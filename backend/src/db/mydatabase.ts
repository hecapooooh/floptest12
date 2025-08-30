import fs from 'fs';
import Database from 'better-sqlite3';

const DB_PATH = 'src/db/app.db';
const isNewDatabase = !fs.existsSync(DB_PATH);

// Crée ou ouvre la base
const db = new Database(DB_PATH);

// Toujours utile
db.pragma('journal_mode = WAL');

// Si c’est une nouvelle base, on crée les tables
if (isNewDatabase) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image_url TEXT,
      muscle_group TEXT
    );
  `);

  console.log('✅ Base de données initialisée avec la table exercises.');
} else {
  console.log('📂 Base de données existante ouverte.');
}

export default db;
