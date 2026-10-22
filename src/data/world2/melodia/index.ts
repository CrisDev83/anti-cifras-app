import { generateMelodiaStageOne } from './etapaUm';
import { generateMelodiaStageTwo } from './etapaDois';
import { MelodiaExercise } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';

export const allMelodiaStagesExercises: MelodiaExercise[] = [
  ...generateMelodiaStageOne(),
  ...generateMelodiaStageTwo()
];