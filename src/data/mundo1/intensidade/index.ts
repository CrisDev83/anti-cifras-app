import { gerarEtapaUmIntensidade } from './etapaUm';
import { gerarEtapaDoisIntensidade } from './etapaDois';
import { gerarEtapaTresIntensidade } from './etapaTres'; // <-- Importa o gerador da Etapa 3
import { ExercicioIntensidade } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';
export * from './etapaTres'; // <-- Exporta a Etapa 3

export const todosExerciciosIntensidade: ExercicioIntensidade[] = [
  ...gerarEtapaUmIntensidade(),
  ...gerarEtapaDoisIntensidade(),
  ...gerarEtapaTresIntensidade(), // <-- Inclui no array geral de exercícios do nó
];