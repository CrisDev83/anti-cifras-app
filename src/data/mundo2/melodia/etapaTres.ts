import { MelodiaExercise } from './types';

export const gerarEtapaTresMelodia = (): MelodiaExercise[] => {
  // Pares focados em variações melódicas mais avançadas para a Etapa 3
  const pares = [
    {
      titulo: "Melodia — Variação Melódica Avançada",
      melodia: '/audio/melodia/melodiaFlauta.mp3', 
      outro: '/audio/melodia/vocalSolo.mp3'   
    },
    
  ];

  const exerciciosBrutos: Omit<MelodiaExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 4 exercícios de contraste ou escolha avançada
  for (let i = 0; i < 4; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const ehMelodiaA = Math.random() < 0.5;
    const srcA = ehMelodiaA ? parAleatorio.melodia : parAleatorio.outro;
    const srcB = ehMelodiaA ? parAleatorio.outro : parAleatorio.melodia;

    let respostaCorreta: 'A' | 'B' = ehMelodiaA ? 'A' : 'B';

    exerciciosBrutos.push({
      stage: 3,
      title: parAleatorio.titulo,
      target: 'MELODIA',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer: respostaCorreta,
      difficulty: 'difícil'
    });
  }

  // 2. Cria 1 exercício onde os sons são IGUAIS
  for (let i = 0; i < 1; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const usarMelodia = Math.random() < 0.5;
    const mesmoSrc = usarMelodia ? parAleatorio.melodia : parAleatorio.outro;

    exerciciosBrutos.push({
      stage: 3,
      title: parAleatorio.titulo,
      target: 'IGUAL',
      soundA: { label: "Som 01", src: mesmoSrc },
      soundB: { label: "Som 02", src: mesmoSrc },
      correctAnswer: 'EQUAL',
      difficulty: 'difícil'
    });
  }

  // 3. Embaralha o array completo
  const embaralhados = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs (iniciando em 200 para diferenciar) e números de questão definitivos
  return embaralhados.map((ex, indice) => ({
    ...ex,
    id: 200 + indice + 1,
    questionNumber: indice + 1
  }));
};