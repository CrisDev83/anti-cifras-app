import { ExercicioDuracao } from "./types";

export const gerarEtapaTresDuracao = (): ExercicioDuracao[] => {
  const paresSequencias = [
    {
      titulo: "Duração — Padrão Rítmico",
      sequenciaA: '/audio/duracao/3/padrao_c_c_l_1.mp3',
      sequenciaB: '/audio/duracao/3/padrao_l_c_c_1.mp3',
      alvoA: 'CURTO_CURTO_LONGO',
      alvoB: 'LONGO_CURTO_CURTO'
    },
    {
      titulo: "Duração — Padrão Rítmico",
      sequenciaA: '/audio/duracao/3/padrao_c_l_c_2.mp3',
      sequenciaB: '/audio/duracao/3/padrao_l_l_c_2.mp3',
      alvoA: 'CURTO_LONGO_CURTO',
      alvoB: 'LONGO_LONGO_CURTO'
    }
  ];

  const exerciciosBrutos: any[] = [];

  for (let i = 0; i < 5; i++) {
    const parAleatorio = paresSequencias[Math.floor(Math.random() * paresSequencias.length)];
    const inverter = Math.random() < 0.5;

    const srcA = inverter ? parAleatorio.sequenciaB : parAleatorio.sequenciaA;
    const srcB = inverter ? parAleatorio.sequenciaA : parAleatorio.sequenciaB;
    const padraoA = inverter ? parAleatorio.alvoB : parAleatorio.alvoA;
    const padraoB = inverter ? parAleatorio.alvoA : parAleatorio.alvoB;

    // Sorteia qual dos dois o utilizador deve encontrar como alvo da pergunta
    const solicitarA = Math.random() < 0.5;
    const alvoDesejado = solicitarA ? padraoA : padraoB;
    const respostaCerta = solicitarA ? 'A' : 'B';

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo: alvoDesejado,
      padraoA, // Guardamos explicitamente o padrão do Som A
      padraoB, // Guardamos explicitamente o padrão do Som B
      somA: { rotulo: "Som 01", src: srcA },
      somB: { rotulo: "Som 02", src: srcB },
      respostaCerta,
      dificuldade: 'médio'
    });
  }

  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaTresDuracao: ExercicioDuracao[] = gerarEtapaTresDuracao();