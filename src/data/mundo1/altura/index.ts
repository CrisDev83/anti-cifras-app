import { gerarEtapaUmAltura } from './etapaUm';
import { ExercicioAltura } from './types';

export * from './types';
export * from './etapaUm'

export const todosExerciciosEtapaUm: ExercicioAltura[] = [
  ...gerarEtapaUmAltura(),
];