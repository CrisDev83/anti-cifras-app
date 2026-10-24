import { RitmoExercise } from './types';

export const generateRitmoStageOne = (): RitmoExercise[] => {
  // Pares focados no contraste entre Bateria (Ritmo) e Melodia
  const pairs = [
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/palmaIsolada.mp3',
      melodia: '/audio/melodia/notaSax.mp3'
    },
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/blocoMadeira.mp3',
      melodia: '/audio/harmonia/acordePiano.mp3'
    },
    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/golpeCaixa.mp3',
      melodia: '/audio/melodia/notaViolao.mp3'
    },

    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/toqueBongo.mp3',
      melodia: '/audio/melodia/notaAssobio.mp3'
    },

    {
      title: "Ritmo — Elemento Ritmo",
      bateria: '/audio/ritmo/toqueBumbo.mp3',
      melodia: '/audio/harmonia/acordeVocal.mp3'
    }

  ];

  const rawExercises: Omit<RitmoExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 4 exercícios de contraste (Bateria vs Melodia)
  for (let i = 0; i < 16; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isBateriaA = Math.random() < 0.5;
    const srcA = isBateriaA ? randomPair.bateria : randomPair.melodia;
    const srcB = isBateriaA ? randomPair.melodia : randomPair.bateria;

    let correctAnswer: 'A' | 'B' = isBateriaA ? 'A' : 'B';

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target: 'RITMO',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  // 2. Cria 1 exercício onde os sons são IGUAIS (ambos bateria ou ambos melodia)
  for (let i = 0; i < 4; i++) {
  const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
  const useBateria = Math.random() < 0.5;
  const sameSrc = useBateria ? randomPair.bateria : randomPair.melodia;

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

  // 3. Baralha o array completo para espalhar a questão igual ao acaso
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribui os IDs e números de questão definitivos
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allRitmoStagesExercises: RitmoExercise[] = generateRitmoStageOne();