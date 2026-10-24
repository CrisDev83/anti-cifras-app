import { gerarEtapaUmDuracao } from './etapaUm';
import { ExercicioDuracao } from './types';

export * from './types';
export * from './etapaUm';

export const todosExerciciosDuracao: ExercicioDuracao[] = [
  ...gerarEtapaUmDuracao(),
];