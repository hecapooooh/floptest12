export function up(db) {
    
  db.exec(`
    -- Table users
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );

    -- Table exercises
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      muscle_group TEXT NOT NULL,
      UNIQUE(name, muscle_group)
    );
    CREATE INDEX IF NOT EXISTS idx_exercises_muscle_group ON exercises(muscle_group);

    -- Table trainings
    CREATE TABLE IF NOT EXISTS trainings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,          -- NULL si public
      name TEXT NOT NULL,
      intensity TEXT,
      duration_minutes INTEGER,
      is_public INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE INDEX IF NOT EXISTS idx_trainings_user_id ON trainings(user_id);
    CREATE INDEX IF NOT EXISTS idx_trainings_is_public ON trainings(is_public);

    -- Table training_exercises
    CREATE TABLE IF NOT EXISTS training_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      training_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      rest_seconds INTEGER NOT NULL DEFAULT 60,
      FOREIGN KEY(training_id) REFERENCES trainings(id),
      FOREIGN KEY(exercise_id) REFERENCES exercises(id)
    );
    CREATE INDEX IF NOT EXISTS idx_training_exercises_training_id ON training_exercises(training_id);

    -- Table training_exercise_sets
    CREATE TABLE IF NOT EXISTS training_exercise_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      training_exercise_id INTEGER NOT NULL,
      set_number INTEGER NOT NULL,
      reps INTEGER NOT NULL,
      weight REAL,
      FOREIGN KEY(training_exercise_id) REFERENCES training_exercises(id)
    );
    CREATE INDEX IF NOT EXISTS idx_sets_training_exercise_id ON training_exercise_sets(training_exercise_id);
  `);
}
