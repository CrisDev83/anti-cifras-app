export interface IntensityExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'FORTE' | 'FRACO' | 'IGUAL';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B' | 'EQUAL';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateIntensityStageOne = (): IntensityExercise[] => {
  const pairs = [
    {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/portaForte.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/portaFraco.mp3' }
    },

    {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/gritoForte.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/sussurroFraco.mp3' }
    },

    {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/alarmeForte.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/tickTack.mp3' }
    },

    {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/explosao.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/bombinha.mp3' }
    },

    {
      title: "Intensidade — Sons do Dia a Dia",
      somForte: { name: "FORTE", src: '/audio/intensidade/aspirador.mp3' },
      somFraco: { name: "FRACO", src: '/audio/intensidade/barbeador.mp3' }
    },

  ];

  const rawExercises: Omit<IntensityExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Criamos exatamente 16 exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
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

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target,
      soundA: { label: "Som 01", src: soundAObj.src },
      soundB: { label: "Som 02", src: soundBObj.src },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  // 2. Criamos exatamente 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const useForte = Math.random() < 0.5;
    const sameSoundObj = useForte ? randomPair.somForte : randomPair.somFraco;

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target: 'IGUAL',
      soundA: { label: "Som 01", src: sameSoundObj.src },
      soundB: { label: "Som 02", src: sameSoundObj.src },
      correctAnswer: 'EQUAL',
      difficulty: 'fácil'
    });
  }

  // 3. Baralhamos o lote completo para espalhar as questões com sons iguais
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos (1 a 10)
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allIntensityStagesExercises: IntensityExercise[] = generateIntensityStageOne();