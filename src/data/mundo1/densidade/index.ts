import { gerarEtapaUmDensidade } from './etapaUm';
import { ExercicioDensidade } from './types';

export * from './types';
export * from './etapaUm';

export const todosExerciciosEtapaUm: ExercicioDensidade[] = [
  ...gerarEtapaUmDensidade(),
];