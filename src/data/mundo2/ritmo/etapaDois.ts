import { RitmoExercise } from './types'; // Importa o tipo do etapaUm

export const generateRitmoStageTwo = (): RitmoExercise[] => {
  const pairs = [
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/pandeiroSamba.mp3',
      melodia: '/audio/melodia/melodiaFlauta.mp3'
    },
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/bateraRock.mp3',
      melodia: '/audio/harmonia/acordesPiano.mp3'
    },
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/beatboxRap.mp3',
      melodia: '/audio/melodia/melodiaAssobio.mp3'
    },
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/ganza.mp3',
      melodia: '/audio/harmonia/acordesVocal.mp3'
    },
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/ritmoPalmas.mp3',
      melodia: '/audio/melodia/soloGuitar.mp3'
    }
  ];

  const rawExercises: Omit<RitmoExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 16 exercícios de contraste (Bateria vs Melodia)
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isBateriaA = Math.random() < 0.5;
    const srcA = isBateriaA ? randomPair.bateria : randomPair.melodia;
    const srcB = isBateriaA ? randomPair.melodia : randomPair.bateria;

    const correctAnswer: 'A' | 'B' = isBateriaA ? 'A' : 'B';

    rawExercises.push({
      stage: 2,
      title: randomPair.title,
      target: 'RITMO',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'médio'
    });
  }

  // 2. Cria 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 1; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const useBateria = Math.random() < 0.5;
    const sameSrc = useBateria ? randomPair.bateria : randomPair.melodia;

    rawExercises.push({
      stage: 2,
      title: randomPair.title,
      target: 'IGUAL',
      soundA: { label: "Som 01", src: sameSrc },
      soundB: { label: "Som 02", src: sameSrc },
      correctAnswer: 'EQUAL',
      difficulty: 'médio'
    });
  }

  // 3. Baralha o array completo
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs (iniciando em 101) e números de questão definitivos
  return shuffled.map((ex, index) => ({
    ...ex,
    id: 100 + index + 1,
    questionNumber: index + 1
  }));
};