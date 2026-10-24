import { gerarEtapaUmTimbre } from './etapaUm';
import { ExercicioTimbre } from './types';

export * from './types';
export * from './etapaUm';

export const todosExerciciosEtapasTimbre: ExercicioTimbre[] = [
  ...gerarEtapaUmTimbre(),
];