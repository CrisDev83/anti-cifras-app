import { ExercicioTimbre } from "./types";

export const gerarEtapaUmTimbre = (): ExercicioTimbre[] => {
  const par = [
    {
      titulo: "Timbre — Sons do Dia a Dia",
      somA: { nome: "Objeto de Vidro", src: '/audio/timbre/copoVidro.mp3' },
      somB: { nome: "Objeto de Madeira", src: '/audio/timbre/objetoMadeira.mp3' }
    },
    {
      titulo: "Timbre — Sons do Dia a Dia",
      somA: { nome: "Rugido de Leão", src: '/audio/timbre/rugidoLeao.mp3' },
      somB: { nome: "Miado de Gato", src: '/audio/timbre/miadoGato.mp3' }
    },
    {
      titulo: "Timbre — Sons do Dia a Dia",
      somA: { nome: "Andando", src: '/audio/timbre/andando.mp3' },
      somB: { nome: "Correndo", src: '/audio/timbre/correndo.mp3' }
    },
    {
      titulo: "Timbre — Sons do Dia a Dia",
      somA: { nome: "Crianças Falando", src: '/audio/timbre/criancasFalando.mp3' },
      somB: { nome: "Adultos Falando", src: '/audio/timbre/adultosFalando.mp3' }
    },
    {
      titulo: "Timbre — Sons do Dia a Dia",
      somA: { nome: "Floresta", src: '/audio/timbre/floresta.mp3' },
      somB: { nome: "Mar", src: '/audio/timbre/mar.mp3' }
    }
  ];

  const exerciciosBrutos: Omit<ExercicioTimbre, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 16 exercícios de contraste de timbre
  for (let i = 0; i < 16; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];

    const eA = Math.random() < 0.5;
    const objetoSomA = eA ? parAleatorio.somA : parAleatorio.somB;
    const objetoSomB = eA ? parAleatorio.somB : parAleatorio.somA;

    const pedirA = Math.random() < 0.5;
    const nomeAlvo = pedirA ? parAleatorio.somA.nome : parAleatorio.somB.nome;

    let respostaCerta: 'A' | 'B';
    if (pedirA) {
      respostaCerta = eA ? 'A' : 'B';
    } else {
      respostaCerta = eA ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo: nomeAlvo,
      somA: { rotulo: "Som 01", src: objetoSomA.src },
      somB: { rotulo: "Som 02", src: objetoSomB.src },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Cria exatamente 4 exercícios onde os timbres tocados são IGUAIS
  for (let i = 0; i < 4; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const usarPrimeiro = Math.random() < 0.5;
    const objetoSomIgual = usarPrimeiro ? parAleatorio.somA : parAleatorio.somB;

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo: objetoSomIgual.nome,
      somA: { rotulo: "Som 01", src: objetoSomIgual.src },
      somB: { rotulo: "Som 02", src: objetoSomIgual.src },
      respostaCerta: 'IGUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralha o lote para espalhar os exercícios iguais
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui os IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapasTimbre: ExercicioTimbre[] = gerarEtapaUmTimbre();