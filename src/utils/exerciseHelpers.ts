import { 
  generateStageOne, allStagesExercises,
  generateDurationStageOne, allDurationStagesExercises,
  allTimbreStagesExercises,
  generateIntensityStageOne, allIntensityStagesExercises,
  generateDensityStageOne, allDensityStagesExercises 
} from '@/data/world1';

export const fetchExercisesForNode = (node: string) => {
  if (node === 'duracao') {
    return generateDurationStageOne ? generateDurationStageOne() : allDurationStagesExercises;
  } else if (node === 'timbre') {
    return allTimbreStagesExercises.filter(ex => ex.stage === 1);
  } else if (node === 'intensidade') {
    return generateIntensityStageOne ? generateIntensityStageOne() : allIntensityStagesExercises;
  } else if (node === 'densidade') {
    return generateDensityStageOne ? generateDensityStageOne() : allDensityStagesExercises;
  } else {
    return generateStageOne ? generateStageOne() : allStagesExercises.filter(ex => ex.stage === 1);
  }
};

export const getTargetLabel = (exercise: any, activeNode: string) => {
  const targetRaw = exercise?.target;
  switch (activeNode) {
    case 'duracao':
      return targetRaw === 'LONGO' ? 'LONGO' : 'CURTO';
    case 'intensidade':
      return targetRaw === 'FORTE' ? 'FORTE' : 'FRACO';
    case 'densidade':
      return targetRaw === 'MAIS_DENSO' ? 'MAIS DENSO' : 'MENOS DENSO';
    case 'timbre':
      return targetRaw;
    default:
      return targetRaw === 'AGUDA' ? 'AGUDA' : 'GRAVE';
  }
};

export const getOptionLabel = (letter: string, exercise: any, activeNode: string) => {
  const targetLabel = getTargetLabel(exercise, activeNode);

  if (activeNode === 'timbre') return `Som ${letter} é ${targetLabel}`;
  if (activeNode === 'densidade') return `Som ${letter} é ${targetLabel?.toLowerCase()}`;
  if (activeNode === 'duracao') return `Som ${letter} é mais ${targetLabel?.toLowerCase()}`;
  if (activeNode === 'intensidade') return `Som ${letter} é mais ${targetLabel?.toLowerCase()}`;
  return `Som ${letter} é mais ${targetLabel === 'AGUDA' ? 'agudo' : 'grave'}`;
};