export interface DensityExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'MENOS_DENSO' | 'MAIS_DENSO'; // Atualizado
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateDensityStageOne = (): DensityExercise[] => {
  const exercises: DensityExercise[] = [];

  const pairs = [
    {
      title: "Densidade — Pingo de Água vs Chuvarada",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/pingo.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/densidade/chuva.mp3' }
    },
    {
      title: "Densidade — Sapo Solitário vs Coro de Sapos",
      somMenosDenso: { name: "MENOS DENSO", src: '/audio/densidade/sapoUm.mp3' },
      somMaisDenso: { name: "MAIS DENSO", src: '/audio/densidade/sapoCoro.mp3' }
    }
  ];

  for (let i = 1; i <= 5; i++) {
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

export const allDensityStagesExercises: DensityExercise[] = generateDensityStageOne();