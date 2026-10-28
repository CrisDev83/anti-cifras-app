import { gerarEtapaUmDensidade } from './etapaUm';
import { gerarEtapaDoisDensidade } from './etapaDois';
import { ExercicioDensidade } from './types';

export * from './types';

// 1. Exportamos cada etapa individualmente para o jogo carregar a que o utilizador escolher
export const exerciciosEtapaUm: ExercicioDensidade[] = gerarEtapaUmDensidade();
export const exerciciosEtapaDois: ExercicioDensidade[] = gerarEtapaDoisDensidade();

// 2. Exportamos um objeto agrupado com todas as etapas do nó de Densidade
export const todosExerciciosDensidade = {
  1: exerciciosEtapaUm,
  2: exerciciosEtapaDois
};