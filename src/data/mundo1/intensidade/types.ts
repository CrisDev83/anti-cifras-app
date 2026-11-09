export interface ExercicioIntensidade {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: 'FORTE' | 'FRACO' | 'IGUAL' | string; // <-- Permite rótulos textuais livres (ex: 'BANDA — INTENSO')
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
  respostaCerta: 'A' | 'B' | 'EQUAL';
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}