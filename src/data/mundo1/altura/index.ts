import { gerarEtapaUmAltura } from './etapaUm';
import { gerarEtapaDoisAltura } from './etapaDois';
import { ExercicioAltura } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';

// 1. Exportamos cada etapa individualmente para o jogo carregar a que o utilizador escolher
export const exerciciosEtapaUm: ExercicioAltura[] = gerarEtapaUmAltura();
export const exerciciosEtapaDois: ExercicioAltura[] = gerarEtapaDoisAltura();

// 2. Exportamos um objeto agrupado com todas as etapas do nó de Altura
export const todosExerciciosAltura = {
  1: exerciciosEtapaUm,
  2: exerciciosEtapaDois
};