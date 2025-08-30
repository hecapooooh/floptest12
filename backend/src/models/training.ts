export interface Training {
  id?: number;
  user_id?: number | null; // NULL pour MVP sans user
  name: string;
  intensity?: string;
  duration_minutes?: number;
  is_public: boolean;
  created_at: string;
}