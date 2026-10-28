export interface ExercicioDensidade {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: 'MENOS_DENSO' | 'MAIS_DENSO' | 'IGUAL';
  somA: { rotulo: string; src: string };
  somB: { rotulo: string; src: string };
  respostaCerta: 'A' | 'B' | 'EQUAL';
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}