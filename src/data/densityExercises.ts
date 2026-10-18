export interface DensityExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'MENOS_DENSO' | 'MAIS_DENSO' | 'IGUAL';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B' | 'EQUAL';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateDensityStageOne = (): DensityExercise[] => {
  const pairs = [
    {
      title: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/pingo.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/densidade/chuva.mp3' }
    },
    {
      title: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/sapoUm.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/densidade/sapoCoro.mp3' }
    },
    {
      title: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/umaVoz.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/timbre/adultosFalando.mp3' }
    },
    {
      title: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/palma.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/densidade/aplausos.mp3' }
    },
    {
      title: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/umPassaro.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/densidade/variosPassaros.mp3' }
    }
  ];

  const rawExercises: Omit<DensityExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Criamos exatamente 16 exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    const isA = Math.random() < 0.5;
    const soundAObj = isA ? randomPair.somMenosDenso : randomPair.somMaisDenso;
    const soundBObj = isA ? randomPair.somMaisDenso : randomPair.somMenosDenso;

    const askForMenosDenso = Math.random() < 0.5;
    const target: 'MENOS_DENSO' | 'MAIS_DENSO' = askForMenosDenso ? 'MENOS_DENSO' : 'MAIS_DENSO';

    let correctAnswer: 'A' | 'B';
    if (askForMenosDenso) {
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
    const useMenosDenso = Math.random() < 0.5;
    const sameSoundObj = useMenosDenso ? randomPair.somMenosDenso : randomPair.somMaisDenso;

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

  // 3. Baralhamos o lote completo para espalhar os exercícios iguais
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos (1 a 10)
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allDensityStagesExercises: DensityExercise[] = generateDensityStageOne();