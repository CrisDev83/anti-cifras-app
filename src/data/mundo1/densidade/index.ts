import { gerarEtapaUmDensidade } from './etapaUm';
import { gerarEtapaDoisDensidade } from './etapaDois';
import { gerarEtapaTresDensidade } from './etapaTres'; // 1. Importar a nova etapa 3
import { ExercicioDensidade } from './types';

export * from './types';

// 2. Exportamos cada etapa individualmente para o jogo carregar a que o utilizador escolher
export const exerciciosEtapaUm: ExercicioDensidade[] = gerarEtapaUmDensidade();
export const exerciciosEtapaDois: ExercicioDensidade[] = gerarEtapaDoisDensidade();
export const exerciciosEtapaTres: ExercicioDensidade[] = gerarEtapaTresDensidade(); // Exportação individual

// 3. Exportamos um objeto agrupado com todas as etapas do nó de Densidade
export const todosExerciciosDensidade = {
  1: exerciciosEtapaUm,
  2: exerciciosEtapaDois,
  3: exerciciosEtapaTres // Adicionado ao objeto global do nó
};