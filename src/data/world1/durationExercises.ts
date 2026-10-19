export interface DurationExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'LONGO' | 'CURTO' | 'IGUAL';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B' | 'EQUAL';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateDurationStageOne = (): DurationExercise[] => {
  // Apenas o par de áudios que já existem na pasta public/audio/duracao/
  const pairs = [
    {
      title: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/latidoCurto.mp3',
      longo: '/audio/duracao/uivoLongo.mp3'
    },
    {
      title: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/buzinaCurta.mp3',
      longo: '/audio/duracao/sireneLonga.mp3'
    },
    {
      title: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/alermaCurto.mp3',
      longo: '/audio/duracao/alermeLongo.mp3'
    },
    {
      title: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/portaFechando.mp3',
      longo: '/audio/duracao/portaAbrindo.mp3'
    },
    {
      title: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/chuvaCurta.mp3',
      longo: '/audio/duracao/chuvaLonga.mp3'
    }
  ];

  const rawExercises: Omit<DurationExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria exatamente 16 exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isLongoA = Math.random() < 0.5;
    const srcA = isLongoA ? randomPair.longo : randomPair.curto;
    const srcB = isLongoA ? randomPair.curto : randomPair.longo;
    const askForLongo = Math.random() < 0.5;
    const target: 'LONGO' | 'CURTO' = askForLongo ? 'LONGO' : 'CURTO';

    let correctAnswer: 'A' | 'B';
    if (askForLongo) {
      correctAnswer = isLongoA ? 'A' : 'B';
    } else {
      correctAnswer = isLongoA ? 'B' : 'A';
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

  // 2. Cria exatamente 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const useLongo = Math.random() < 0.5;
    const sameSrc = useLongo ? randomPair.longo : randomPair.curto;

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

  // 3. Baralha o array completo para espalhar as questões iguais ao acaso
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribui os IDs e números de questão definitivos (1 a 10)
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allDurationStagesExercises: DurationExercise[] = generateDurationStageOne();