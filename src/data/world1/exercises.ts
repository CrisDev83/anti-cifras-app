export interface Exercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'AGUDA' | 'GRAVE' | 'IGUAL';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B' | 'EQUAL';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateStageOne = (): Exercise[] => {
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
    },
    {
      title: "Altura — Sons do Dia a Dia",
      grave: '/audio/timbre/rugidoLeao.mp3',
      agudo: '/audio/timbre/miadoGato.mp3'
    },
    {
      title: "Altura — Sons do Dia a Dia",
      grave: '/audio/altura/vozMasculina.mp3',
      agudo: '/audio/altura/vozFeminina.mp3'
    },
    {
      title: "Altura — Sons do Dia a Dia",
      grave: '/audio/altura/buzinaNavio.mp3',
      agudo: '/audio/altura/buzinaMoto.mp3'
    }
  ];

  const rawExercises: Omit<Exercise, 'id' | 'questionNumber'>[] = [];

  // 1. Criamos os exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isAgudoA = Math.random() < 0.5;
    const srcA = isAgudoA ? randomPair.agudo : randomPair.grave;
    const srcB = isAgudoA ? randomPair.grave : randomPair.agudo;
    const askForAguda = Math.random() < 0.5;
    const target: 'AGUDA' | 'GRAVE' = askForAguda ? 'AGUDA' : 'GRAVE';
    
    let correctAnswer: 'A' | 'B';
    if (askForAguda) {
      correctAnswer = isAgudoA ? 'A' : 'B';
    } else {
      correctAnswer = isAgudoA ? 'B' : 'A';
    }

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target,
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  // 2. Criamos os exercícios onde os sons são IGUAIS
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const useAgudo = Math.random() < 0.5;
    const sameSrc = useAgudo ? randomPair.agudo : randomPair.grave;

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target: 'IGUAL',
      soundA: { label: "Som 01", src: sameSrc },
      soundB: { label: "Som 02", src: sameSrc },
      correctAnswer: 'EQUAL',
      difficulty: 'fácil'
    });
  }

  // 3. Baralhamos o array completo
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos com base no total gerado
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allStagesExercises: Exercise[] = generateStageOne();