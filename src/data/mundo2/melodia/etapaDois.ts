
import { MelodiaExercise } from './types';


export const generateMelodiaStageTwo = (): MelodiaExercise[] => {
  // 5 Pares focados no contraste entre Melodia (Linha Cantável) e Não-Melodia (Percussão/Ruído/Estático)
  const pairs = [
    {
      title: "Melodia — Elemento Melodia",
      melodia: '/audio/melodia/melodiaFlauta.mp3', 
      outro: '/audio/ritmo/bateraHipHop.mp3'   
    },
    {
      title: "Melodia — Elemento Melodia",
      melodia: '/audio/melodia/vocalSolo.mp3', 
      outro: '/audio/harmonia/acordesVocal.mp3'     
    },

    {
      title: "Melodia — Elemento Melodia",
      melodia: '/audio/melodia/melodiaAssobio.mp3', 
      outro: '/audio/ritmo/bongo.mp3'  
    },
    
    {
      title: "Melodia — Elemento Melodia",
      melodia: '/audio/melodia/soloGuitar.mp3', 
      outro: '/audio/ritmo/pandeiroSamba.mp3'  
    },

    {
      title: "Melodia — Elemento Melodia",
      melodia: '/audio/melodia/saxSolo.mp3', 
      outro: '/audio/harmonia/acordesMetais.mp3'  
    },

    
  ];

  const rawExercises: Omit<MelodiaExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 4 exercícios de contraste (Melodia vs Outro)
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isMelodiaA = Math.random() < 0.5;
    const srcA = isMelodiaA ? randomPair.melodia : randomPair.outro;
    const srcB = isMelodiaA ? randomPair.outro : randomPair.melodia;

    let correctAnswer: 'A' | 'B' = isMelodiaA ? 'A' : 'B';

    rawExercises.push({
      stage: 2,
      title: randomPair.title,
      target: 'MELODIA',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  // 2. Cria 1 exercício onde os sons são IGUAIS (ambos melodia ou ambos não-melodia)
  for (let i = 0; i < 1; i++) {
  const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
  const useMelodia = Math.random() < 0.5;
  const sameSrc = useMelodia ? randomPair.melodia : randomPair.outro;

  rawExercises.push({
    stage: 2,
    title: randomPair.title,
    target: 'IGUAL',
    soundA: { label: "Som 01", src: sameSrc },
    soundB: { label: "Som 02", src: sameSrc },
    correctAnswer: 'EQUAL',
    difficulty: 'fácil'
  });
}

  // 3. Baralha o array completo
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs e números de questão definitivos
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allMelodiaStagesExercises: MelodiaExercise[] = generateMelodiaStageTwo();