import { ExercicioTimbre } from "./types";

export const gerarEtapaDoisTimbre = (): ExercicioTimbre[] => {
  // Pares de instrumentos musicais para a Etapa 2
  const paresInstrumentos = [
    {
      titulo: "Timbre — Instrumentos Musicais",
      somA: { nome: "Violão", src: '/audio/harmonia/acordesViolao.mp3' },
      somB: { nome: "Flauta", src: '/audio/melodia/melodiaFlauta.mp3' }
    },
    {
      titulo: "Timbre — Instrumentos Musicais",
      somA: { nome: "Piano", src: '/audio/timbre/etapa2/piano.mp3' },
      somB: { nome: "Violino", src: '/audio/densidade/etapa2/solo_violino.mp3' }
    },
    {
      titulo: "Timbre — Instrumentos Musicais",
      somA: { nome: "Guitarra Elétrica", src: '/audio/melodia/soloGuitar.mp3' },
      somB: { nome: "Baixo Elétrico", src: '/audio/timbre/etapa2/baixo.mp3' }
    },
    {
      titulo: "Timbre — Instrumentos Musicais",
      somA: { nome: "Trompete", src: '/audio/timbre/etapa2/trompete.mp3' },
      somB: { nome: "Violoncelo", src: '/audio/timbre/etapa2/acordeon.mp3' }
    },
    {
      titulo: "Timbre — Instrumentos Musicais",
      somA: { nome: "Saxofone", src: '/audio/melodia/saxSolo.mp3' },
      somB: { nome: "Bateria", src: '/audio/ritmo/bateraRock.mp3' }
    }
  ];

  const exerciciosBrutos: Omit<ExercicioTimbre, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exercícios de contraste entre instrumentos
  for (let i = 0; i < 4; i++) {
    const parAleatorio = paresInstrumentos[Math.floor(Math.random() * paresInstrumentos.length)];

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
      etapa: 2, // Atenção que aqui já é a etapa 2
      titulo: parAleatorio.titulo,
      alvo: nomeAlvo,
      somA: { rotulo: "Som 01", src: objetoSomA.src },
      somB: { rotulo: "Som 02", src: objetoSomB.src },
      respostaCerta,
      dificuldade: 'médio' // Um bocadinho mais avançado por serem instrumentos
    });
  }

  // 2. Cria exercícios onde os instrumentos tocados são IGUAIS
  for (let i = 0; i < 1; i++) {
    const parAleatorio = paresInstrumentos[Math.floor(Math.random() * paresInstrumentos.length)];
    const usarPrimeiro = Math.random() < 0.5;
    const objetoSomIgual = usarPrimeiro ? parAleatorio.somA : parAleatorio.somB;

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo: objetoSomIgual.nome,
      somA: { rotulo: "Som 01", src: objetoSomIgual.src },
      somB: { rotulo: "Som 02", src: objetoSomIgual.src },
      respostaCerta: 'EQUAL',
      dificuldade: 'médio'
    });
  }

  // 3. Baralha o lote
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs e números de questão
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};