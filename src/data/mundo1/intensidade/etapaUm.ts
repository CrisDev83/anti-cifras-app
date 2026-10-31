import { ExercicioIntensidade } from './types';

export const gerarEtapaUmIntensidade = (): ExercicioIntensidade[] => {
  const par = [
    {
      titulo: "Intensidade — Sons do Dia a Dia",
      somForte: { nome: "FORTE", src: '/audio/intensidade/portaForte.mp3' },
      somFraco: { nome: "FRACO", src: '/audio/intensidade/portaFraco.mp3' }
    },
    {
      titulo: "Intensidade — Sons do Dia a Dia",
      somForte: { nome: "FORTE", src: '/audio/intensidade/gritoForte.mp3' },
      somFraco: { nome: "FRACO", src: '/audio/intensidade/sussurroFraco.mp3' }
    },
    {
      titulo: "Intensidade — Sons do Dia a Dia",
      somForte: { nome: "FORTE", src: '/audio/intensidade/alarmeForte.mp3' },
      somFraco: { nome: "FRACO", src: '/audio/intensidade/tickTack.mp3' }
    },
    {
      titulo: "Intensidade — Sons do Dia a Dia",
      somForte: { nome: "FORTE", src: '/audio/intensidade/explosao.mp3' },
      somFraco: { nome: "FRACO", src: '/audio/intensidade/bombinha.mp3' }
    },
    {
      titulo: "Intensidade — Sons do Dia a Dia",
      somForte: { nome: "FORTE", src: '/audio/intensidade/aspirador.mp3' },
      somFraco: { nome: "FRACO", src: '/audio/intensidade/barbeador.mp3' }
    }
  ];

  const exerciciosBrutos: Omit<ExercicioIntensidade, 'id' | 'numeroQuestao'>[] = [];

  // 1. Criamos exatamente 16 exercícios de contraste normal
  for (let i = 0; i < 4; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];

    const eA = Math.random() < 0.5;
    const objetoSomA = eA ? parAleatorio.somForte : parAleatorio.somFraco;
    const objetoSomB = eA ? parAleatorio.somFraco : parAleatorio.somForte;

    const solicitarForte = Math.random() < 0.5;
    const alvo: 'FORTE' | 'FRACO' = solicitarForte ? 'FORTE' : 'FRACO';

    let respostaCerta: 'A' | 'B';
    if (solicitarForte) {
      respostaCerta = eA ? 'A' : 'B';
    } else {
      respostaCerta = eA ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: objetoSomA.src },
      somB: { rotulo: "Som 02", src: objetoSomB.src },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Criamos exatamente 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 1; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const usarForte = Math.random() < 0.5;
    const objetoSomIgual = usarForte ? parAleatorio.somForte : parAleatorio.somFraco;

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: objetoSomIgual.src },
      somB: { rotulo: "Som 02", src: objetoSomIgual.src },
      respostaCerta: 'EQUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralhamos o lote completo para espalhar as questões com sons iguais
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosIntensidade: ExercicioIntensidade[] = gerarEtapaUmIntensidade();