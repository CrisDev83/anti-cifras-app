export interface TimbreExercise {
  id: number;
  stage: number;
  questionNumber: number;
  title: string;
  target: string;
  soundA: { label: string; src: string };
  soundB: { label: string; src: string };
  correctAnswer: 'A' | 'B' | 'EQUAL';
  difficulty: 'fácil' | 'médio' | 'difícil' | 'perito';
}

export const generateTimbreStageOne = (): TimbreExercise[] => {
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
    },
    {
      title: "Timbre — Sons do Dia a Dia",
      somA: { name: "Andando", src: '/audio/timbre/andando.mp3' },
      somB: { name: "Correndo", src: '/audio/timbre/correndo.mp3' }
    },
    {
      title: "Timbre — Sons do Dia a Dia",
      somA: { name: "Crianças Falando", src: '/audio/timbre/criancasFalando.mp3' },
      somB: { name: "Adultos Falando", src: '/audio/timbre/adultosFalando.mp3' }
    },
    {
      title: "Timbre — Sons do Dia a Dia",
      somA: { name: "Floresta", src: '/audio/timbre/floresta.mp3' },
      somB: { name: "Mar", src: '/audio/timbre/mar.mp3' }
    }
  ];

  const rawExercises: Omit<TimbreExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria exatamente 16 exercícios de contraste de timbre
  for (let i = 0; i < 16; i++) {
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

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target: targetName,
      soundA: { label: "Som 01", src: soundAObj.src },
      soundB: { label: "Som 02", src: soundBObj.src },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  // 2. Cria exatamente 4 exercícios onde os timbres tocados são IGUAIS
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const useFirst = Math.random() < 0.5;
    const sameSoundObj = useFirst ? randomPair.somA : randomPair.somB;

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target: sameSoundObj.name,
      soundA: { label: "Som 01", src: sameSoundObj.src },
      soundB: { label: "Som 02", src: sameSoundObj.src },
      correctAnswer: 'EQUAL',
      difficulty: 'fácil'
    });
  }

  // 3. Baralha o lote para espalhar os exercícios iguais
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribui os IDs e números de questão definitivos (1 a 10)
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allTimbreStagesExercises: TimbreExercise[] = generateTimbreStageOne();