import { ExercicioTimbre } from "./types";

export const gerarEtapaDoisTimbre = (): ExercicioTimbre[] => {
  // 1. Banco central com todos os instrumentos e respetivos áudios da Etapa 2
  const bancoDeSons = [
    { nome: "Violão", src: '/audio/harmonia/acordesViolao.mp3' },
    { nome: "Flauta", src: '/audio/melodia/melodiaFlauta.mp3' },
    { nome: "Piano", src: '/audio/timbre/etapa2/piano.mp3' },
    { nome: "Violino", src: '/audio/densidade/etapa2/solo_violino.mp3' },
    { nome: "Guitarra Elétrica", src: '/audio/melodia/soloGuitar.mp3' },
    { nome: "Baixo Elétrico", src: '/audio/timbre/etapa2/baixo.mp3' },
    { nome: "Trompete", src: '/audio/timbre/etapa2/trompete.mp3' },
    { nome: "Violoncelo", src: '/audio/timbre/etapa2/acordeon.mp3' },
    { nome: "Saxofone", src: '/audio/melodia/saxSolo.mp3' },
    { nome: "Bateria", src: '/audio/ritmo/bateraRock.mp3' }
  ];

  const exerciciosBrutos: Omit<ExercicioTimbre, 'id' | 'numeroQuestao'>[] = [];

  // Função auxiliar para escolher um item aleatório do banco
  const pegarItemAleatorio = (lista: typeof bancoDeSons) => 
    lista[Math.floor(Math.random() * lista.length)];

  // 1. Cria exatamente 4 exercícios de contraste entre instrumentos escolhidos aleatoriamente
  for (let i = 0; i < 4; i++) {
    const somItem1 = pegarItemAleatorio(bancoDeSons);
    
    // Garante que o segundo som é diferente do primeiro
    let somItem2 = pegarItemAleatorio(bancoDeSons);
    while (somItem2.src === somItem1.src) {
      somItem2 = pegarItemAleatorio(bancoDeSons);
    }

    const inverter = Math.random() < 0.5;

    const objetoSomA = inverter ? somItem2 : somItem1;
    const objetoSomB = inverter ? somItem1 : somItem2;

    const pedirA = Math.random() < 0.5;
    const nomeAlvo = pedirA ? somItem1.nome : somItem2.nome;

    let respostaCerta: 'A' | 'B';
    if (pedirA) {
      respostaCerta = inverter ? 'B' : 'A';
    } else {
      respostaCerta = inverter ? 'A' : 'B';
    }

    exerciciosBrutos.push({
      etapa: 2,
      titulo: "Timbre — Instrumentos Musicais",
      alvo: nomeAlvo,
      somA: { rotulo: "Som 01", src: objetoSomA.src },
      somB: { rotulo: "Som 02", src: objetoSomB.src },
      respostaCerta,
      dificuldade: 'médio'
    });
  }

  // 2. Cria exatamente 1 exercício onde os instrumentos tocados são IGUAIS
  for (let i = 0; i < 1; i++) {
    const somIgual = pegarItemAleatorio(bancoDeSons);

    exerciciosBrutos.push({
      etapa: 2,
      titulo: "Timbre — Instrumentos Musicais",
      alvo: somIgual.nome,
      somA: { rotulo: "Som 01", src: somIgual.src },
      somB: { rotulo: "Som 02", src: somIgual.src },
      respostaCerta: 'EQUAL',
      dificuldade: 'médio'
    });
  }

  // 3. Baralha o lote completo de exercícios gerados
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaDoisTimbre: ExercicioTimbre[] = gerarEtapaDoisTimbre();