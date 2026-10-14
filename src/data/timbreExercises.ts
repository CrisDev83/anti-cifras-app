export interface TimbreExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: string;
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateTimbreStageOne = (): TimbreExercise[] => {
  const exercises: TimbreExercise[] = [];

  const pairs = [
    {
      title: "Timbre — Sons do Dia a Dia",
      somA: { name: "Objeto de Vidro", src: '/audio/timbre/copoVidro.mp3' },
      somB: { name: "Objeto de Madeira", src: '/audio/timbre/objetoMadeira.mp3' }
    },

    {
      title: "Timbre — Sons do Dia a Dia",
      somA: { name: "Rugido de Leão", src: '/audio/timbre/rugidoLeao.mp3' },
      somB: { name: "Miado de Gato", src: '/audio/timbre/miadoGato.mp3' }
    }
  ];

  for (let i = 1; i <= 5; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    const isA = Math.random() < 0.5;
    const soundAObj = isA ? randomPair.somA : randomPair.somB;
    const soundBObj = isA ? randomPair.somB : randomPair.somA;

    const askForA = Math.random() < 0.5;
    const targetName = askForA ? randomPair.somA.name : randomPair.somB.name;

    let correctAnswer: 'A' | 'B';
    if (askForA) {
      correctAnswer = isA ? 'A' : 'B';
    } else {
      correctAnswer = isA ? 'B' : 'A';
    }

    exercises.push({
      id: i,
      stage: 1,
      questionNumber: i,
      title: randomPair.title,
      target: targetName,
      soundA: { label: "Som 01", src: soundAObj.src },
      soundB: { label: "Som 02", src: soundBObj.src },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  return exercises;
};

export const allTimbreStagesExercises: TimbreExercise[] = generateTimbreStageOne();