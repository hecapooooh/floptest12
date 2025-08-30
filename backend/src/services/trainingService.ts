import db from "../db/index.ts";
import type { Training } from "../models/training";

/**
 * Insère un training dans la base et retourne son ID
 */
export function insertTraining(tr: Omit<Training, 'id' | 'created_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO trainings (user_id, name, intensity, duration_minutes, is_public)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    tr.user_id ?? null,        // MVP sans user
    tr.name,
    tr.intensity ?? null,
    tr.duration_minutes ?? null,
    tr.is_public ? 1 : 0
  );
  return result.lastInsertRowid as number;
}

/**
 * Récupère un training par son ID
 * Lance une erreur si le training n'existe pas
 */
export function getTrainingById(id: number): Training {
  const row = db.prepare(`SELECT * FROM trainings WHERE id = ?`).get(id);
  if (!row) throw new Error(`Training with id ${id} not found`);
  return row as Training;
}

/**
 * Récupère tous les trainings (optionnel, utile pour debug ou liste)
 */
export function getAllTrainings(): Training[] {
  const rows = db.prepare(`SELECT * FROM trainings ORDER BY created_at DESC`).all();
  return rows as Training[];
}
