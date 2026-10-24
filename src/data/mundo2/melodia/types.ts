export interface MelodiaExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'MELODIA' | 'IGUAL';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B' | 'EQUAL';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}