import { HarmoniaExercise } from './types'; // Ajusta o caminho dos tipos se necessário

export const gerarEtapaTresHarmonia = (): HarmoniaExercise[] => {
  // Pares focados em variações harmônicas mais avançadas para a Etapa 3
  const pares = [
    {
      titulo: "Harmonia — Variação Harmônica Avançada",
      harmonia: '/audio/melodia/notaAssobio.mp3', 
      outro: '/audio/melodia/notaSino.mp3'   
    },
 
  ];

  const exerciciosBrutos: Omit<HarmoniaExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 4 exercícios de contraste ou escolha avançada
  for (let i = 0; i < 4; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const ehHarmoniaA = Math.random() < 0.5;
    const srcA = ehHarmoniaA ? parAleatorio.harmonia : parAleatorio.outro;
    const srcB = ehHarmoniaA ? parAleatorio.outro : parAleatorio.harmonia;

    let respostaCorreta: 'A' | 'B' = ehHarmoniaA ? 'A' : 'B';

    exerciciosBrutos.push({
      stage: 3, // Etapa 3
      title: parAleatorio.titulo,
      target: 'HARMONIA',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer: respostaCorreta,
      difficulty: 'difícil'
    });
  }

  // 2. Cria 1 exercício onde os sons são IGUAIS
  for (let i = 0; i < 1; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const usarHarmonia = Math.random() < 0.5;
    const mesmoSrc = usarHarmonia ? parAleatorio.harmonia : parAleatorio.outro;

    exerciciosBrutos.push({
      stage: 3, // Etapa 3
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

  // 4. Atribui IDs (iniciando em 150) e números de questão definitivos
  return embaralhados.map((ex, indice) => ({
    ...ex,
    id: 150 + indice + 1,
    questionNumber: indice + 1
  }));
};