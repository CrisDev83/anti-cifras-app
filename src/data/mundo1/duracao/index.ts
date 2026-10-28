import { gerarEtapaUmDuracao } from './etapaUm';
import { gerarEtapaDoisDuracao } from './etapaDois';
import { ExercicioDuracao } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';

export const todosExerciciosDuracao: ExercicioDuracao[] = [
  ...gerarEtapaUmDuracao(),
  ...gerarEtapaDoisDuracao(),
];