import db from '../db/index.ts';
import type { Exercise } from '../models/exercise';

/**
 * Insert ou récupère un exercice existant (upsert)
 * Retourne l'ID dans tous les cas
 */
export function insertExercise(ex: Omit<Exercise, 'id'>): number {
  // 1️⃣ D'abord, essayer de trouver l'exercice existant
  const existing = db.prepare(`
    SELECT id FROM exercises 
    WHERE name = ? AND muscle_group = ?
  `).get(ex.name, ex.muscle_group) as { id: number } | undefined;

  if (existing) {
    // ✅ L'exercice existe déjà, on retourne son ID
    return existing.id;
  }

  // 2️⃣ L'exercice n'existe pas, on l'insère
  const stmt = db.prepare(`
    INSERT INTO exercises (name, muscle_group, image_url)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(ex.name, ex.muscle_group, ex.image_url ?? null);
  return result.lastInsertRowid as number;
}

export function getExerciseById(id: number): Exercise {
  const row = db.prepare(`SELECT * FROM exercises WHERE id = ?`).get(id);
  if (!row) throw new Error(`Exercise ${id} not found`);
  return row as Exercise;
}

export function getAllExerciseByGroup(muscle_group: string): Exercise[] {
  const rows = db.prepare(`SELECT * from exercises where muscle_group = ?`).all(muscle_group);
  if (rows.length === 0) throw new Error(`No exercises found for muscle group "${muscle_group}"`);
  return rows as Exercise[];
}

/**
 * Alternative avec INSERT OR IGNORE + SELECT (plus compact)
 */
export function insertExerciseAlternative(ex: Omit<Exercise, 'id'>): number {
  // Insert seulement si n'existe pas
  db.prepare(`
    INSERT OR IGNORE INTO exercises (name, muscle_group, image_url)
    VALUES (?, ?, ?)
  `).run(ex.name, ex.muscle_group, ex.image_url ?? null);

  // Récupère l'ID (existant ou nouveau)
  const result = db.prepare(`
    SELECT id FROM exercises 
    WHERE name = ? AND muscle_group = ?
  `).get(ex.name, ex.muscle_group) as { id: number };

  return result.id;
}