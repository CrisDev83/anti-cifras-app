import { generateHarmoniaStageOne } from './etapaUm';
import { generateHarmoniaStageTwo } from './etapaDois';
import { HarmoniaExercise } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois'; // Adicionado aqui!

export const allHarmoniaStagesExercises: HarmoniaExercise[] = [
  ...generateHarmoniaStageOne(),
  ...generateHarmoniaStageTwo()
];