import { gerarEtapaUmIntensidade } from './etapaUm';
import { ExercicioIntensidade } from './types';

export * from './types';
export * from './etapaUm';

export const todosExerciciosIntensidade: ExercicioIntensidade[] = [
  ...gerarEtapaUmIntensidade(),
];