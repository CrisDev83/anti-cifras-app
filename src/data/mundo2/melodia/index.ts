import { generateMelodiaStageOne } from './etapaUm';
import { generateMelodiaStageTwo } from './etapaDois';
import { gerarEtapaTresMelodia } from './etapaTres'; // Importa a etapa 3
import { MelodiaExercise } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';
export * from './etapaTres'; // Exporta a etapa 3

export const allMelodiaStagesExercises: MelodiaExercise[] = [
  ...generateMelodiaStageOne(),
  ...generateMelodiaStageTwo(),
  ...gerarEtapaTresMelodia() // Inclui a etapa 3 no array geral
];