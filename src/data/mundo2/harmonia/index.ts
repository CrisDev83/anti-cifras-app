import { generateHarmoniaStageOne } from './etapaUm';
import { generateHarmoniaStageTwo } from './etapaDois';
import { gerarEtapaTresHarmonia } from './etapaTres'; // Importa a etapa 3
import { HarmoniaExercise } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';
export * from './etapaTres'; // Exporta a etapa 3

export const allHarmoniaStagesExercises: HarmoniaExercise[] = [
  ...generateHarmoniaStageOne(),
  ...generateHarmoniaStageTwo(),
  ...gerarEtapaTresHarmonia() // Inclui no array geral
];