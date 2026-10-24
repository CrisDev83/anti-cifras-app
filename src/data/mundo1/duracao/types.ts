export interface ExercicioDuracao {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: 'LONGO' | 'CURTO' | 'IGUAL';
  somA: { rotulo: string; src: string };
  somB: { rotulo: string; src: string };
  respostaCerta: 'A' | 'B' | 'IGUAL';
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}