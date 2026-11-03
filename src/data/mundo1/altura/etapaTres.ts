import { ExercicioAltura } from './types';

export const gerarEtapaTresAltura = (): ExercicioAltura[] => {
  const pares = [
    {
      titulo: "",
      graveAgudo: '/audio/altura/etapa3/piano2GraveAgudo.mp3',
      agudoGrave: '/audio/altura/etapa3/piano2AgudoGrave.mp3'
    },
    {
      titulo: "",
      graveAgudo: '/audio/altura/etapa3/violaoGraveAgudo.mp3',
      agudoGrave: '/audio/altura/etapa3/violaoAgudoGrave.mp3'
    },
    {
      titulo: "",
      graveAgudo: '/audio/altura/etapa3/celoGraveAgudo.mp3',
      agudoGrave: '/audio/altura/etapa3/celoAgudoGrave.mp3'
    },
    {
      titulo: "",
      graveAgudo: '/audio/altura/etapa3/pianoGraveAgudo.mp3',
      agudoGrave: '/audio/altura/etapa3/pianoAgudoGrave.mp3'
    },
    {
      titulo: "",
      graveAgudo: '/audio/altura/etapa3/bongoGraveAgudo.mp3',
      agudoGrave: '/audio/altura/etapa3/bongoAgudoGrave.mp3'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioAltura, 'id' | 'numeroQuestao'>[] = [];

  // 1. Criamos os exercícios de contraste de direção
  for (let i = 0; i < 4; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    
    // Sorteamos se o Som A vai ser o Grave->Agudo ou o Agudo->Grave
    const somAehGraveAgudo = Math.random() < 0.5;
    const fonteA = somAehGraveAgudo ? parAleatorio.graveAgudo : parAleatorio.agudoGrave;
    const fonteB = somAehGraveAgudo ? parAleatorio.agudoGrave : parAleatorio.graveAgudo;
    
    // Sorteamos qual direção o sistema vai pedir na pergunta: 'ASCENDENTE' (Grave->Agudo) ou 'DESCENDENTE' (Agudo->Grave)
    const pedirAscendente = Math.random() < 0.5;
    const alvo = pedirAscendente ? 'ASCENDENTE' : 'DESCENDENTE';
    
    let respostaCorreta: 'A' | 'B';
    if (pedirAscendente) {
      // Se pedimos o Grave->Agudo, quem tiver essa fonte é a resposta correta
      respostaCorreta = somAehGraveAgudo ? 'A' : 'B';
    } else {
      // Se pedimos o Agudo->Grave, quem tiver essa fonte é a resposta correta
      respostaCorreta = somAehGraveAgudo ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo: alvo as any,
      somA: { rotulo: "Som 01", src: fonteA },
      somB: { rotulo: "Som 02", src: fonteB },
      respostaCorreta,
      dificuldade: 'difícil'
    });
  }

  // 2. Criamos os exercícios onde os sons são IGUAIS (para testar atenção auditiva)
  for (let i = 0; i < 1; i++) {
    const parAleatorio = pares[Math.floor(Math.random() * pares.length)];
    const usarGraveAgudo = Math.random() < 0.5;
    const mesmaFonte = usarGraveAgudo ? parAleatorio.graveAgudo : parAleatorio.agudoGrave;

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: mesmaFonte },
      somB: { rotulo: "Som 02", src: mesmaFonte },
      respostaCorreta: 'EQUAL',
      dificuldade: 'difícil'
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

export const todosExerciciosEtapaTresAltura: ExercicioAltura[] = gerarEtapaTresAltura();