import { ExercicioIntensidade } from "./types";

export const gerarEtapaTresIntensidade = (): ExercicioIntensidade[] => {
  // 1. Lista única com os sons base e as respetivas intensidades/rótulos alvo
  const bancoDeSons = [
    { src: '/audio/intensidade/etapa3/caixaFracoForteFraco.mp3', rotuloAlvo: 'FRACO - FORTE - FRACO' },
    { src: '/audio/intensidade/etapa3/pianoForteFracoFraco.mp3', rotuloAlvo: 'FORTE - FRACO - FRACO' },
    { src: '/audio/intensidade/etapa3/pratoForteForteForte.mp3', rotuloAlvo: 'FORTE - FORTE - FORTE' },
    { src: '/audio/intensidade/etapa3/violaoForteFracoForte.mp3', rotuloAlvo: 'FORTE - FRACO - FORTE' },
    { src: '/audio/intensidade/etapa3/vocalFracoFracoForte.mp3', rotuloAlvo: 'FRACO - FRACO - FORTE' }
  ];

  const exerciciosBrutos: Omit<ExercicioIntensidade, 'id' | 'numeroQuestao'>[] = [];

  // Função auxiliar para escolher um item aleatório do array
  const pegarItemAleatorio = (lista: typeof bancoDeSons) => 
    lista[Math.floor(Math.random() * lista.length)];

  // 1. Cria exatamente 4 exercícios de contraste com variação de volume dinâmica e pares aleatórios
  for (let i = 0; i < 4; i++) {
    const somItem1 = pegarItemAleatorio(bancoDeSons);
    
    let somItem2 = pegarItemAleatorio(bancoDeSons);
    while (somItem2.src === somItem1.src) {
      somItem2 = pegarItemAleatorio(bancoDeSons);
    }

    const inverter = Math.random() < 0.5;

    // Na intensidade, aplicamos também volumes diferentes para testar a perceção (ex: 1.0 vs 0.3)
    const volumeAVal = inverter ? 0.3 : 1.0;
    const volumeBVal = inverter ? 1.0 : 0.3;

    const srcA = inverter ? somItem2.src : somItem1.src;
    const srcB = inverter ? somItem1.src : somItem2.src;
    const alvoA = inverter ? somItem2.rotuloAlvo : somItem1.rotuloAlvo;
    const alvoB = inverter ? somItem1.rotuloAlvo : somItem2.rotuloAlvo;

    const solicitarA = Math.random() < 0.5;
    const alvo = solicitarA ? alvoA : alvoB;
    const respostaCerta: 'A' | 'B' = solicitarA ? 'A' : 'B';

    exerciciosBrutos.push({
      etapa: 3,
      titulo: "",
      alvo,
      somA: { rotulo: "Som 01", src: srcA, volume: volumeAVal },
      somB: { rotulo: "Som 02", src: srcB, volume: volumeBVal },
      respostaCerta,
      dificuldade: 'difícil'
    });
  }

  // 2. Cria exatamente 1 exercício onde os sons são IGUAIS (com o mesmo volume e pista)
  for (let i = 0; i < 1; i++) {
    const somIgual = pegarItemAleatorio(bancoDeSons);
    const volumeIgual = Math.random() < 0.5 ? 1.0 : 0.3;

    exerciciosBrutos.push({
      etapa: 3,
      titulo: "",
      alvo: somIgual.rotuloAlvo,
      somA: { rotulo: "Som 01", src: somIgual.src, volume: volumeIgual },
      somB: { rotulo: "Som 02", src: somIgual.src, volume: volumeIgual },
      respostaCerta: 'EQUAL',
      dificuldade: 'difícil'
    });
  }

  // 3. Baralha o array completo de exercícios gerados
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaTresIntensidade: ExercicioIntensidade[] = gerarEtapaTresIntensidade();