import { RitmoExercise } from './types'; // Importa o tipo do ritmo

export const gerarEtapaTresRitmo = (): RitmoExercise[] => {
  // Pares focados em variações rítmicas mais avançadas para a Etapa 3
  const pares = [
    {
      titulo: "Ritmo — Variação Rítmica Avançada",
      bateria: '/audio/ritmo/pandeiroSamba.mp3',
      melodia: '/audio/ritmo/bateraRock.mp3'
    },
   
  ];

  const exerciciosBrutos: Omit<RitmoExercise, 'id' | 'questionNumber'>[] = [];

  // 1. Cria 4 exercícios de contraste ou escolha avançada
  for (let i = 0; i < 4; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const ehBateriaA = Math.random() < 0.5;
    const srcA = ehBateriaA ? parAleatorio.bateria : parAleatorio.melodia;
    const srcB = ehBateriaA ? parAleatorio.melodia : parAleatorio.bateria;

    const respostaCorreta: 'A' | 'B' = ehBateriaA ? 'A' : 'B';

    exerciciosBrutos.push({
      stage: 3,
      title: parAleatorio.titulo,
      target: 'RITMO',
      soundA: { label: "Som 01", src: srcA },
      soundB: { label: "Som 02", src: srcB },
      correctAnswer: respostaCorreta,
      difficulty: 'difícil'
    });
  }

  // 2. Cria 1 exercício onde os sons são IGUAIS
  for (let i = 0; i < 1; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const usarBateria = Math.random() < 0.5;
    const mesmoSrc = usarBateria ? parAleatorio.bateria : parAleatorio.melodia;

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

  // 4. Atribui IDs (iniciando em 250 para diferenciar) e números de questão definitivos
  return embaralhados.map((ex, indice) => ({
    ...ex,
    id: 250 + indice + 1,
    questionNumber: indice + 1
  }));
};