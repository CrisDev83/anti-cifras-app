import { allRitmoStagesExercises } from './ritmo';
import { allMelodiaStagesExercises } from './melodia';
import { allHarmoniaStagesExercises } from './harmonia';

export const nosMundo2 = [
  { 
    id: 'ritmo', 
    label: 'Ritmo', 
    icon: 'music_note', 
    left: '25%', 
    top: '40%', 
    progress: '1/5',
    exercises: allRitmoStagesExercises 
  },
  { 
    id: 'melodia', 
    label: 'Melodia', 
    icon: 'audiotrack', 
    left: '75%', 
    top: '40%', 
    progress: '0/5',
    exercises: allMelodiaStagesExercises 
  },
  { 
    id: 'harmonia', 
    label: 'Harmonia', 
    icon: 'queue_music', 
    left: '50%', 
    top: '75%', 
    progress: '0/5',
    exercises: allHarmoniaStagesExercises 
  },
];