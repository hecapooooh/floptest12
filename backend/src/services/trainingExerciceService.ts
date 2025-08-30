import db from '../db/index.ts';
import type { TrainingExercise } from '../models/trainingExercise';

export function insertTrainingExercise(te: Omit<TrainingExercise, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO training_exercises (training_id, exercise_id, position, rest_seconds)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(te.training_id, te.exercise_id, te.position, te.rest_seconds);
  return result.lastInsertRowid as number;
}

export function getTrainingExerciseById(id: number): TrainingExercise {
  const row = db.prepare(`SELECT * FROM training_exercises WHERE id = ?`).get(id);
  if (!row) throw new Error(`TrainingExercise ${id} not found`);
  return row as TrainingExercise;
}
