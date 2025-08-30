import db from '../db/index.ts';
import type { CompleteTraining } from '../models/completeTraining';
import * as trainingService from './trainingService.ts';
import * as exerciseService from './exerciseService.ts';
import * as trainingExerciseService from './trainingExerciceService.ts';
import * as trainingExerciseSetService from './trainingExerciceSetService.ts';

/**
 * Insère un CompleteTraining dans la base (Training + exercises + sets)
 * Tout se fait dans une transaction
 */
export function insertCompleteTraining(training: Omit<CompleteTraining, 'id' | 'created_at'>): void {
  console.log("Insertion en base séance complète");
  const transaction = db.transaction(() => {
    // 1️⃣ Insérer le Training
    const trainingId = trainingService.insertTraining({
      name: training.name,
      intensity: training.intensity,
      duration_minutes: training.duration_minutes,
      is_public: training.is_public
    });

    // 2️⃣ Insérer chaque exercise
    for (const ex of training.exercises) {
      const exerciseId = ex.exercise.id || exerciseService.insertExercise(ex.exercise);

      // 3️⃣ Insérer le lien TrainingExercise
      const trainingExId = trainingExerciseService.insertTrainingExercise({
        training_id: trainingId,
        exercise_id: exerciseId,
        position: ex.position,
        rest_seconds: ex.rest_seconds
      });

      // 4️⃣ Insérer les sets
      for (const set of ex.sets) {
        trainingExerciseSetService.insertTrainingExerciseSet({
          training_exercise_id: trainingExId,
          set_number: set.set_number,
          reps: set.reps,
          weight: set.weight
        });
      }
    }
  });

  transaction();
}