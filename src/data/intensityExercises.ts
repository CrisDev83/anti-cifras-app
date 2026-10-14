export interface IntensityExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'FORTE' | 'FRACO';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateIntensityStageOne = (): IntensityExercise[] => {
  const exercises: IntensityExercise[] = [];

  const pairs = [
   {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/portaForte.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/portaFraco.mp3' } // Ajustado para portaFraco.mp3 se for esse o nome
    },

    {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/gritoForte.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/sussurroFraco.mp3' }
    }
  ];

  for (let i = 1; i <= 5; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    const isA = Math.random() < 0.5;
    const soundAObj = isA ? randomPair.somForte : randomPair.somFraco;
    const soundBObj = isA ? randomPair.somFraco : randomPair.somForte;

    const askForForte = Math.random() < 0.5;
    const target: 'FORTE' | 'FRACO' = askForForte ? 'FORTE' : 'FRACO';

    let correctAnswer: 'A' | 'B';
    if (askForForte) {
      correctAnswer = isA ? 'A' : 'B';
    } else {
      correctAnswer = isA ? 'B' : 'A';
    }

    exercises.push({
      id: i,
      stage: 1,
      questionNumber: i,
      title: randomPair.title,
      target,
      soundA: { label: "Som 01", src: soundAObj.src },
      soundB: { label: "Som 02", src: soundBObj.src },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  return exercises;
};

export const allIntensityStagesExercises: IntensityExercise[] = generateIntensityStageOne();