export interface ExercicioDuracao {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: string; // Atualizado para aceitar qualquer padrão rítmico (ex: 'CURTO_LONGO_CURTO', 'LONGO', etc.) ou 'IGUAL'
  padraoA?: string; // Opcional para as etapas que usam
  padraoB?: string; // Opcional para as etapas que usam
  somA: { rotulo: string; src: string };
  somB: { rotulo: string; src: string };
  respostaCerta: 'A' | 'B' | 'IGUAL';
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}