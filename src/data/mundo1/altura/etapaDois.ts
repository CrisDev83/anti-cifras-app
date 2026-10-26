import { ExercicioAltura } from './types';

export const gerarEtapaDoisAltura = (): ExercicioAltura[] => {
  const pares = [
    {
      titulo: "Altura - Instrumentos",
      grave: '/audio/altura/etapa2/violao_A2.mp3',
      agudo: '/audio/altura/etapa2/violao_C4.mp3'
    },
    {
      titulo: "Altura — Instrumentos",
      grave: '/audio/altura/etapa2/piano_E2.mp3',
      agudo: '/audio/altura/etapa2/piano_E4.mp3'
    },
    {
      titulo: "Altura — Instrumentos",
      grave: '/audio/altura/etapa2/violao_C3.mp3',
      agudo: '/audio/altura/etapa2/violao_G4.mp3'
    },
    {
      titulo: "Altura — Instrumentos",
      grave: '/audio/altura/etapa2/pam_G3.mp3',
      agudo: '/audio/altura/etapa2/pam_A4.mp3'
    },
    {
      titulo: "Altura — Instrumentos",
      grave: '/audio/altura/etapa2/trumpet_D3.mp3',
      agudo: '/audio/altura/etapa2/trumpet_B3.mp3'
    },
    {
      titulo: "Altura — Instrumentos",
      grave: '/audio/altura/etapa2/violino_C5.mp3',
      agudo: '/audio/altura/etapa2/violino_E6.mp3'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioAltura, 'id' | 'numeroQuestao'>[] = [];

  // 1. Criamos os exercícios de contraste normal (com os pares de oitavas)
  for (let i = 0; i < 8; i++) {
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
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: fonteA },
      somB: { rotulo: "Som 02", src: fonteB },
      respostaCorreta,
      dificuldade: 'médio'
    });
  }

  // 2. Criamos os exercícios onde os sons são IGUAIS (para testar atenção auditiva)
  for (let i = 0; i < 2; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const usarAgudo = Math.random() < 0.5;
    const mesmaFonte = usarAgudo ? parAleatorio.agudo : parAleatorio.grave;

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: mesmaFonte },
      somB: { rotulo: "Som 02", src: mesmaFonte },
      respostaCorreta: 'EQUAL',
      dificuldade: 'médio'
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

export const todosExerciciosEtapaDoisAltura: ExercicioAltura[] = gerarEtapaDoisAltura();