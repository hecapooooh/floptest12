import db from '../db/index.ts';
import type { Exercise } from '../models/exercise';


export function insertExercise(ex: Omit<Exercise, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO exercises (name, muscle_group)
    VALUES (?, ?)
  `);
  const result = stmt.run(ex.name, ex.muscle_group);
  return result.lastInsertRowid as number;
}

export function getExerciseById(id: number): Exercise {
  const row = db.prepare(`SELECT * FROM exercises WHERE id = ?`).get(id);
  if (!row) throw new Error(`Exercise ${id} not found`);
  return row as Exercise;
}

export function getAllExerciseByGroup(muscle_group:string): Exercise[]{
    const rows = db.prepare(`SELECT * from exercises where muscle_group = ?`).all(muscle_group);
    if (rows.length === 0) throw new Error(`No exercises found for muscle group "${muscle_group}"`);
    return rows as Exercise[];
}
