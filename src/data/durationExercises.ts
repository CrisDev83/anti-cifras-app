export interface DurationExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: 'LONGO' | 'CURTO';
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateDurationStageOne = (): DurationExercise[] => {
  const exercises: DurationExercise[] = [];

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
    }
  ];

  for (let i = 1; i <= 5; i++) {
    // Sorteia o par temático
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    // Sorteia se o som LONGO fica no botão A ou no botão B
    const isLongoA = Math.random() < 0.5;
    const srcA = isLongoA ? randomPair.longo : randomPair.curto;
    const srcB = isLongoA ? randomPair.curto : randomPair.longo;

    // Sorteia se a pergunta pede a opção LONGO ou CURTO
    const askForLongo = Math.random() < 0.5;
    const target: 'LONGO' | 'CURTO' = askForLongo ? 'LONGO' : 'CURTO';

    let correctAnswer: 'A' | 'B';
    if (askForLongo) {
      correctAnswer = isLongoA ? 'A' : 'B';
    } else {
      correctAnswer = isLongoA ? 'B' : 'A';
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

export const allDurationStagesExercises: DurationExercise[] = generateDurationStageOne();