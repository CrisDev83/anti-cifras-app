import { gerarEtapaUmDuracao } from './etapaUm';
import { gerarEtapaDoisDuracao } from './etapaDois';
import { gerarEtapaTresDuracao } from './etapaTres'
import { ExercicioDuracao } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';
export * from './etapaTres';

export const todosExerciciosDuracao: ExercicioDuracao[] = [
  ...gerarEtapaUmDuracao(),
  ...gerarEtapaDoisDuracao(),
  ...gerarEtapaTresDuracao()
];