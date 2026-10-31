export interface ExercicioIntensidade {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: 'FORTE' | 'FRACO' | 'IGUAL';
  somA: { 
    rotulo: string; 
    src: string; 
    volume?: number; 
  };
  somB: { 
    rotulo: string; 
    src: string; 
    volume?: number; 
  };
  respostaCerta: 'A' | 'B' | 'EQUAL'; // <-- Alinhado para EQUAL
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}