import { gerarEtapaUmIntensidade } from './etapaUm';
import { gerarEtapaDoisIntensidade } from './etapaDois';
import { ExercicioIntensidade } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';

export const todosExerciciosIntensidade: ExercicioIntensidade[] = [
  ...gerarEtapaUmIntensidade(),
  ...gerarEtapaDoisIntensidade(),
];