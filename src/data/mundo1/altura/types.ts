export interface ExercicioAltura {
  id: number;
  etapa: number;
  numeroQuestao: number;
  titulo: string;
  alvo: 'AGUDA' | 'GRAVE' | 'IGUAL';
  somA: { rotulo: string; src: string };
  somB: { rotulo: string; src: string };
  respostaCorreta: 'A' | 'B' | 'EQUAL';
  dificuldade: 'fácil' | 'médio' | 'difícil' | 'perito';
}