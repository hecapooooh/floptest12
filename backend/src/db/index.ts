import Database from 'better-sqlite3';
import { applyMigrations } from './migrate';

const DB_PATH = 'src/db/app.db';
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');

// Comme applyMigrations est async, on l’attend
(async () => {
  await applyMigrations(db);
})();


export default db;
