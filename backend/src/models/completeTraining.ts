import type { Exercise } from "./exercise";
import type { Training } from "./training";
import type { TrainingExerciseSet } from "./trainingExerciseSet";

export interface CompleteTraining extends Training {
  exercises: Array<{
    exercise: Exercise;
    position: number;
    rest_seconds: number;
    sets: TrainingExerciseSet[];
  }>;
}
