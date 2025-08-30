export interface TrainingExercise {
  id?: number;
  training_id: number;
  exercise_id: number;
  position: number;         // ordre dans le training
  rest_seconds: number;
}