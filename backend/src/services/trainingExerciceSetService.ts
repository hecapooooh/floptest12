import db from '../db/index.ts';
import type { TrainingExerciseSet } from '../models/trainingExerciseSet';


export function insertTrainingExerciseSet(set: Omit<TrainingExerciseSet, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO training_exercise_sets (training_exercise_id, set_number, reps, weight)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(set.training_exercise_id, set.set_number, set.reps, set.weight ?? null);
  return result.lastInsertRowid as number;
}

export function getTrainingExerciseSetById(id: number): TrainingExerciseSet {
  const row = db.prepare(`SELECT * FROM training_exercise_sets WHERE id = ?`).get(id);
  if (!row) throw new Error(`TrainingExerciseSet ${id} not found`);
  return row as TrainingExerciseSet;
}
