import { gerarEtapaUmAltura } from './etapaUm';
import { gerarEtapaDoisAltura } from './etapaDois';
import { gerarEtapaTresAltura } from './etapaTres'; // <-- 1. Importar a etapa 3
import { ExercicioAltura } from './types';

export * from './types';
export * from './etapaUm';
export * from './etapaDois';
export * from './etapaTres'; // <-- 2. Exportar a etapa 3

// 1. Exportamos cada etapa individualmente para o jogo carregar a que o utilizador escolher
export const exerciciosEtapaUm: ExercicioAltura[] = gerarEtapaUmAltura();
export const exerciciosEtapaDois: ExercicioAltura[] = gerarEtapaDoisAltura();
export const exerciciosEtapaTres: ExercicioAltura[] = gerarEtapaTresAltura(); // <-- 3. Instanciar a etapa 3

// 2. Exportamos um objeto agrupado com todas as etapas do nó de Altura
export const todosExerciciosAltura = {
  1: exerciciosEtapaUm,
  2: exerciciosEtapaDois,
  3: exerciciosEtapaTres // <-- 4. Adicionar ao dicionário global de etapas
};