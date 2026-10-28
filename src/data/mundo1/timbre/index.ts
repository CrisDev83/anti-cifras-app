import { gerarEtapaUmTimbre } from './etapaUm';
import { gerarEtapaDoisTimbre } from './etapaDois';
import { ExercicioTimbre } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';

export const todosExerciciosEtapasTimbre: ExercicioTimbre[] = [
  ...gerarEtapaUmTimbre(),
  ...gerarEtapaDoisTimbre(),
];