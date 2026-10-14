export interface Exercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'AGUDA' | 'GRAVE';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateStageOne = (): Exercise[] => {
  const exercises: Exercise[] = [];

  // Pares temáticos coerentes com os nomes exatos dos arquivos
  const pairs = [
    {
      title: "Altura — Sons do Dia a Dia",
      grave: '/audio/altura/latidoGrave.mp3',
      agudo: '/audio/altura/latidoAgudo.mp3'
    },
    {
      title: "Altura — Sons do Dia a Dia",
      grave: '/audio/altura/motorGrave.mp3',
      agudo: '/audio/altura/motorAgudo.mp3'
    }
  ];

  for (let i = 1; i <= 5; i++) {
    // Sorteia aleatoriamente entre Cães e Motores para esta questão
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    // Sorteia se o som agudo fica no A ou no B
    const isAgudoA = Math.random() < 0.5;
    const srcA = isAgudoA ? randomPair.agudo : randomPair.grave;
    const srcB = isAgudoA ? randomPair.grave : randomPair.agudo;

    // Sorteia se o objetivo é encontrar o mais AGUDO ou o mais GRAVE
    const askForAguda = Math.random() < 0.5;
    const target: 'AGUDA' | 'GRAVE' = askForAguda ? 'AGUDA' : 'GRAVE';

    let correctAnswer: 'A' | 'B';
    if (askForAguda) {
      correctAnswer = isAgudoA ? 'A' : 'B';
    } else {
      correctAnswer = isAgudoA ? 'B' : 'A';
    }

    exercises.push({
      id: i,
      stage: 1,
      questionNumber: i,
      title: randomPair.title,
      target,
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'fácil'
    });
  }
  return exercises;
};

export const allStagesExercises: Exercise[] = generateStageOne();