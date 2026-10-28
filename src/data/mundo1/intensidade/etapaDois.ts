import { ExercicioIntensidade } from "./types";

export const gerarEtapaDoisIntensidade = (): ExercicioIntensidade[] => {
  const par = [
    {
      titulo: "Intensidade — Sons Dinâmicos",
      fraco: '/audio/intensidade/sussurroFraco.mp3',
      forte: '/audio/intensidade/gritoForte.mp3'
    },
    {
      titulo: "Intensidade — Sons Dinâmicos",
      fraco: '/audio/intensidade/baixoFraco.mp3',
      forte: '/audio/intensidade/altoForte.mp3'
    },
    {
      titulo: "Intensidade — Sons Dinâmicos",
      fraco: '/audio/intensidade/ventoFraco.mp3',
      forte: '/audio/intensidade/trovaoForte.mp3'
    },
    {
      titulo: "Intensidade — Sons Dinâmicos",
      fraco: '/audio/intensidade/passosFracos.mp3',
      forte: '/audio/intensidade/batidaForte.mp3'
    },
    {
      titulo: "Intensidade — Sons Dinâmicos",
      fraco: '/audio/intensidade/chuvaFraca.mp3',
      forte: '/audio/intensidade/tempestadeForte.mp3'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioIntensidade, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 4 exercícios de contraste para teste
  for (let i = 0; i < 4; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const eForteA = Math.random() < 0.5;
    const fonteA = eForteA ? parAleatorio.forte : parAleatorio.fraco;
    const fonteB = eForteA ? parAleatorio.fraco : parAleatorio.forte;
    const solicitarForte = Math.random() < 0.5;
    const alvo: 'FORTE' | 'FRACO' = solicitarForte ? 'FORTE' : 'FRACO';

    let respostaCerta: 'A' | 'B';
    if (solicitarForte) {
      respostaCerta = eForteA ? 'A' : 'B';
    } else {
      respostaCerta = eForteA ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: fonteA },
      somB: { rotulo: "Som 02", src: fonteB },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Cria exatamente 1 exercício onde os sons são IGUAIS para teste
  for (let i = 0; i < 1; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const utilizarForte = Math.random() < 0.5;
    const fonteIgual = utilizarForte ? parAleatorio.forte : parAleatorio.fraco;

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: fonteIgual },
      somB: { rotulo: "Som 02", src: fonteIgual },
      respostaCerta: 'IGUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralha o array completo
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui os IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaDoisIntensidade: ExercicioIntensidade[] = gerarEtapaDoisIntensidade();