import { ExercicioIntensidade } from "./types";

export const gerarEtapaDoisIntensidade = (): ExercicioIntensidade[] => {
  // Sons base reutilizados (aproveita o mesmo ficheiro e aplica o volume por código)
  const fontesBase = [
    { titulo: "Intensidade — Instrumentos", nome: "Banda", src: '/audio/densidade/etapa2/banda_rock.mp3' },
    { titulo: "Intensidade — Instrumentos", nome: "Sinfonia", src: '/audio/densidade/etapa2/sinfonia.mp3' },
    { titulo: "Intensidade — Instrumentos", nome: "Flauta", src: '/audio/melodia/melodiaFlauta.mp3' },
    { titulo: "Intensidade — Instrumentos", nome: "Violino", src: '/audio/densidade/etapa2/solo_violino.mp3' },
    { titulo: "Intensidade — Instrumentos", nome: "Violão", src: '/audio/harmonia/acordesViolao.mp3' }
  ];

  const exerciciosBrutos: Omit<ExercicioIntensidade, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 16 exercícios de contraste de intensidade
  for (let i = 0; i < 4; i++) {
    const itemBase = fontesBase[Math.floor(Math.random() * fontesBase.length)];

    const eForteA = Math.random() < 0.5;
    
    // Atribui os volumes dinamicamente: 1.0 para forte e 0.3 para fraco
    const volumeA = eForteA ? 1.0 : 0.3;
    const volumeB = eForteA ? 0.3 : 1.0;

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
      titulo: itemBase.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: itemBase.src, volume: volumeA },
      somB: { rotulo: "Som 02", src: itemBase.src, volume: volumeB },
      respostaCerta,
      dificuldade: 'médio'
    });
  }

  // 2. Cria exatamente 4 exercícios onde os sons são IGUAIS (mesmo ficheiro e mesmo volume)
  for (let i = 0; i < 1; i++) {
    const itemBase = fontesBase[Math.floor(Math.random() * fontesBase.length)];
    const volumeIgual = Math.random() < 0.5 ? 1.0 : 0.3;

    exerciciosBrutos.push({
      etapa: 2,
      titulo: itemBase.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: itemBase.src, volume: volumeIgual },
      somB: { rotulo: "Som 02", src: itemBase.src, volume: volumeIgual },
      respostaCerta: 'EQUAL', // <-- Alinhado com o PainelExercicio ('EQUAL')
      dificuldade: 'médio'
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