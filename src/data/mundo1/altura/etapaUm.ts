import { ExercicioAltura } from './types';

export const gerarEtapaUmAltura = (): ExercicioAltura[] => {
  const pares = [
    {
      titulo: "Altura — Sons do Dia a Dia (E1)",
      grave: '/audio/altura/latidoGrave.mp3',
      agudo: '/audio/altura/latidoAgudo.mp3'
    },
    {
      titulo: "Altura — Sons do Dia a Dia (E1)",
      grave: '/audio/altura/motorGrave.mp3',
      agudo: '/audio/altura/motorAgudo.mp3'
    },
    {
      titulo: "Altura — Sons do Dia a Dia (E1)",
      grave: '/audio/timbre/rugidoLeao.mp3',
      agudo: '/audio/timbre/miadoGato.mp3'
    },
    {
      titulo: "Altura — Sons do Dia a Dia (E1)",
      grave: '/audio/altura/vozMasculina.mp3',
      agudo: '/audio/altura/vozFeminina.mp3'
    },
    {
      titulo: "Altura — Sons do Dia a Dia (E1)",
      grave: '/audio/altura/buzinaNavio.mp3',
      agudo: '/audio/altura/buzinaMoto.mp3'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioAltura, 'id' | 'numeroQuestao'>[] = [];

  // 1. Criamos os exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const eAgudoA = Math.random() < 0.5;
    const fonteA = eAgudoA ? parAleatorio.agudo : parAleatorio.grave;
    const fonteB = eAgudoA ? parAleatorio.grave : parAleatorio.agudo;
    const pedirAguda = Math.random() < 0.5;
    const alvo: 'AGUDA' | 'GRAVE' = pedirAguda ? 'AGUDA' : 'GRAVE';
    
    let respostaCorreta: 'A' | 'B';
    if (pedirAguda) {
      respostaCorreta = eAgudoA ? 'A' : 'B';
    } else {
      respostaCorreta = eAgudoA ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: fonteA },
      somB: { rotulo: "Som 02", src: fonteB },
      respostaCorreta,
      dificuldade: 'fácil'
    });
  }

  // 2. Criamos os exercícios onde os sons são IGUAIS
  for (let i = 0; i < 4; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const usarAgudo = Math.random() < 0.5;
    const mesmaFonte = usarAgudo ? parAleatorio.agudo : parAleatorio.grave;

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: mesmaFonte },
      somB: { rotulo: "Som 02", src: mesmaFonte },
      respostaCorreta: 'IGUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralhamos o array completo
  const embaralhar = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos
  return embaralhar.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaAltura: ExercicioAltura[] = gerarEtapaUmAltura();