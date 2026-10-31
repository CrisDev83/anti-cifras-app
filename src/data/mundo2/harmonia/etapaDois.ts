import { HarmoniaExercise } from './types';

export const generateHarmoniaStageTwo = (): HarmoniaExercise[] => {
  // 5 Pares focados no contraste entre Harmonia (Bloco Sonoro / Acordes) e Não-Harmonia (Percussão / Nota Solo)
  const pairs = [
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordesPiano.mp3', 
      outro: '/audio/ritmo/ganza.mp3'   
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordesVocal.mp3', 
      outro: '/audio/ritmo/bateraRock.mp3'     
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordesViolao.mp3', 
      outro: '/audio/melodia/melodiaAssobio.mp3'  
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordesSinos.mp3', 
      outro: '/audio/ritmo/bongo.mp3'  
    },
    {
      title: "Harmonia — Elemento Harmonia",
      harmonia: '/audio/harmonia/acordesMetais.mp3', 
      outro: '/audio/melodia/soloGuitar.mp3'  
    },
  ];

  const rawExercises: Omit<HarmoniaExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 16 exercícios de contraste (Harmonia vs Outro)
  for (let i = 0; i < 4; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const isHarmoniaA = Math.random() < 0.5;
    const srcA = isHarmoniaA ? randomPair.harmonia : randomPair.outro;
    const srcB = isHarmoniaA ? randomPair.outro : randomPair.harmonia;

    let correctAnswer: 'A' | 'B' = isHarmoniaA ? 'A' : 'B';

    rawExercises.push({
      stage: 2, // Corrigido para 2!
      title: randomPair.title,
      target: 'HARMONIA',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer,
      difficulty: 'médio'
    });
  }

  // 2. Cria 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 1; i++) {
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const useHarmonia = Math.random() < 0.5;
    const sameSrc = useHarmonia ? randomPair.harmonia : randomPair.outro;

    rawExercises.push({
      stage: 2, // Corrigido para 2!
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