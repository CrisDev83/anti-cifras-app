export interface ExercicioTimbre {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: string;
  somA: { rotulo: string; src: string };
  somB: { rotulo: string; src: string };
  respostaCerta: 'A' | 'B' | 'EQUAL';
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}