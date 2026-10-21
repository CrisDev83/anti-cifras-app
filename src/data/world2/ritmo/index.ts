import { generateRitmoStageOne } from './etapaUm';
import { generateRitmoStageTwo } from './etapaDois';
import { RitmoExercise } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';

export const allRitmoStagesExercises: RitmoExercise[] = [
  ...generateRitmoStageOne(),
  ...generateRitmoStageTwo()
];