
import { HarmoniaExercise } from './types';

export const generateHarmoniaStageOne = (): HarmoniaExercise[] => {
  // 5 Pares focados no contraste entre Harmonia (Bloco Sonoro / Acordes) e Não-Harmonia (Percussão / Nota Solo)
  const pairs = [
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordePiano.mp3', 
      outro: '/audio/ritmo/toqueBumbo.mp3'   
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/harmoniaMetais.mp3', 
      outro: '/audio/ritmo/toqueCaixa.mp3'     
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordeVocal.mp3', 
      outro: '/audio/melodia/notaVocal.mp3'  
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordeSintetizador.mp3', 
      outro: '/audio/ritmo/blocoMadeira.mp3'  
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordeGuitar.mp3', 
      outro: '/audio/melodia/notaAssobio.mp3'  
    },
  ];

  const rawExercises: Omit<HarmoniaExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 4 exercícios de contraste (Harmonia vs Outro)
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isHarmoniaA = Math.random() < 0.5;
    const srcA = isHarmoniaA ? randomPair.harmonia : randomPair.outro;
    const srcB = isHarmoniaA ? randomPair.outro : randomPair.harmonia;

    let correctAnswer: 'A' | 'B' = isHarmoniaA ? 'A' : 'B';

    rawExercises.push({
      stage: 1,
      title: randomPair.title,
      target: 'HARMONIA',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'fácil'
    });
  }

  // 2. Cria 1 exercício onde os sons são IGUAIS (ambos harmonia ou ambos não-harmonia)
  for (let i = 0; i < 1; i++) {
  const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
  const useHarmonia = Math.random() < 0.5;
  const sameSrc = useHarmonia ? randomPair.harmonia : randomPair.outro;

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

  // 3. Baralha o array completo
  const shuffled = rawExercises.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs e números de questão definitivos
  return shuffled.map((ex, index) => ({
    ...ex,
    id: index + 1,
    questionNumber: index + 1
  }));
};

export const allHarmoniaStagesExercises: HarmoniaExercise[] = generateHarmoniaStageOne();