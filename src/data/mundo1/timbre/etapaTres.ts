import { ExercicioTimbre } from "./types";

export const gerarEtapaTresTimbre = (): ExercicioTimbre[] => {
  // 1. Lista única com todos os sons disponíveis e os seus rótulos corretos
  const bancoDeSons = [
    { src: '/audio/timbre/etapa3/pianoViolino.mp3', rotuloAlvo: 'PIANO + VIOLINO' },
    { src: '/audio/timbre/etapa3/acordeonGanza.mp3', rotuloAlvo: 'ACORDEON + GANZA' },
    { src: '/audio/timbre/etapa3/baixoBatera.mp3', rotuloAlvo: 'BAIXO + BATERA' },
    { src: '/audio/timbre/etapa3/bateraVocal.mp3', rotuloAlvo: 'BATERA + VOCAL' },
    { src: '/audio/timbre/etapa3/cajonGaita.mp3', rotuloAlvo: 'CAJON + GAITA' },
    { src: '/audio/timbre/etapa3/harpaTrompete.mp3', rotuloAlvo: 'HARPA + TROMPETE' },
    { src: '/audio/timbre/etapa3/pandeiroCavaco.mp3', rotuloAlvo: 'PANDEIRO + CAVACO' },
    { src: '/audio/timbre/etapa3/ukuleleSax.mp3', rotuloAlvo: 'UKULELE + SAX' },
    { src: '/audio/timbre/etapa3/violaoBanjo.mp3', rotuloAlvo: 'VIOLAO + BANJO' },
    { src: '/audio/timbre/etapa3/violaoFlauta.mp3', rotuloAlvo: 'VIOLAO + FLAUTA' }
  ];

  const exerciciosBrutos: Omit<ExercicioTimbre, 'id' | 'numeroQuestao'>[] = [];

  // Função auxiliar para escolher um item aleatório do array
  const pegarItemAleatorio = (lista: typeof bancoDeSons) => 
    lista[Math.floor(Math.random() * lista.length)];

  // 1. Cria exatamente 4 exercícios de contraste com pares totalmente aleatórios
  for (let i = 0; i < 4; i++) {
    // Escolhe o primeiro som aleatoriamente
    const somItem1 = pegarItemAleatorio(bancoDeSons);
    
    // Escolhe o segundo som, garantindo que seja DIFERENTE do primeiro para formar um par de escolha real
    let somItem2 = pegarItemAleatorio(bancoDeSons);
    while (somItem2.src === somItem1.src) {
      somItem2 = pegarItemAleatorio(bancoDeSons);
    }

    const inverter = Math.random() < 0.5;

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
      somA: { rotulo: "Som 01", src: srcA },
      somB: { rotulo: "Som 02", src: srcB },
      respostaCerta,
      dificuldade: 'difícil'
    });
  }

  // 2. Cria exatamente 1 exercício onde os sons são IGUAIS (com base numa pista aleatória)
  for (let i = 0; i < 1; i++) {
    const somIgual = pegarItemAleatorio(bancoDeSons);

    exerciciosBrutos.push({
      etapa: 3,
      titulo: "",
      alvo: somIgual.rotuloAlvo, // Mostra o alvo correspondente para o aluno testar a igualdade
      somA: { rotulo: "Som 01", src: somIgual.src },
      somB: { rotulo: "Som 02", src: somIgual.src },
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

export const todosExerciciosEtapaTresTimbre: ExercicioTimbre[] = gerarEtapaTresTimbre();