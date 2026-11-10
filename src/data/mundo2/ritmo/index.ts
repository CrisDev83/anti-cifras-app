import { generateRitmoStageOne } from './etapaUm';
import { generateRitmoStageTwo } from './etapaDois';
import { gerarEtapaTresRitmo } from './etapaTres'; // Certifica-te que está importado
import { RitmoExercise } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';
export * from './etapaTres'; // Exporta a etapa 3

export const allRitmoStagesExercises: RitmoExercise[] = [
  ...generateRitmoStageOne(),
  ...generateRitmoStageTwo(),
  ...gerarEtapaTresRitmo() // Inclui no array geral do Mundo 2
];