import { allRitmoStagesExercises } from '@/data/world2/ritmo';
import { allMelodiaStagesExercises } from '@/data/world2/melodia';
import { allHarmoniaStagesExercises } from '@/data/world2/harmonia';

export const fetchWorld2Exercises = (node: string) => {
  switch (node) {
    case 'ritmo':
      return allRitmoStagesExercises;
    case 'melodia':
      return allMelodiaStagesExercises;
    case 'harmonia':
      return allHarmoniaStagesExercises;
    default:
      return [];
  }
};

export const getWorld2TargetLabel = (exercise: any, activeNode: string) => {
  return activeNode.toUpperCase();
};

export const getWorld2OptionLabel = (letter: string, exercise: any) => {
  if (letter === 'EQUAL') return 'Ambos são iguais';
  return `O Som ${letter} é o alvo correto`;
};

export const getWorld2Instruction = (activeNode: string, selectedStage: number, exercise: any) => {
  switch (activeNode) {
    case 'ritmo':
      if (selectedStage === 2) {
        return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">RITMO</span>?</>;
      }
      return <>Ouça os dois sons. Qual deles é um <span className="text-primary font-bold">SOM PERCUSSIVO</span>?</>;
    case 'melodia':
      if (selectedStage === 2) {
        return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">MELODIA</span>?</>;
      }
      return <>Ouça os dois sons. Qual deles é uma <span className="text-primary font-bold">NOTA SÓ</span>?</>;
    case 'harmonia':
      if (selectedStage === 2) {
        return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">HARMONIA</span>?</>;
      }
      return <>Ouça os dois sons. Qual deles traz <span className="text-primary font-bold">VÁRIAS NOTAS JUNTAS</span>?</>;
    default:
      return <>Ouça os dois sons e escolha a resposta correta.</>;
  }
};