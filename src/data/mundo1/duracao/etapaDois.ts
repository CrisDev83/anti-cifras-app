import { ExercicioDuracao } from "./types";

export const gerarEtapaDoisDuracao = (): ExercicioDuracao[] => {
  const par = [
    {
      titulo: "Duração — Instrumentos",
      curto: '/audio/duracao/latidoCurto.mp3',
      longo: '/audio/duracao/uivoLongo.mp3'
    },
    {
      titulo: "Duração — Instrumentos",
      curto: '/audio/duracao/buzinaCurta.mp3',
      longo: '/audio/duracao/sireneLonga.mp3'
    },
    {
      titulo: "Duração — Instrumentos",
      curto: '/audio/duracao/alermaCurto.mp3',
      longo: '/audio/duracao/alermeLongo.mp3'
    },
    {
      titulo: "Duração — Instrumentos",
      curto: '/audio/duracao/portaFechando.mp3',
      longo: '/audio/duracao/portaAbrindo.mp3'
    },
    {
      titulo: "Duração — Instrumentos",
      curto: '/audio/duracao/chuvaCurta.mp3',
      longo: '/audio/duracao/chuvaLonga.mp3'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioDuracao, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 4 exercícios de contraste para teste
  for (let i = 0; i < 4; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const eLongoA = Math.random() < 0.5;
    const fonteA = eLongoA ? parAleatorio.longo : parAleatorio.curto;
    const fonteB = eLongoA ? parAleatorio.curto : parAleatorio.longo;
    const solicitarLongo = Math.random() < 0.5;
    const alvo: 'LONGO' | 'CURTO' = solicitarLongo ? 'LONGO' : 'CURTO';

    let respostaCerta: 'A' | 'B';
    if (solicitarLongo) {
      respostaCerta = eLongoA ? 'A' : 'B';
    } else {
      respostaCerta = eLongoA ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: fonteA },
      somB: { rotulo: "Som 02", src: fonteB },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Cria exatamente 1 exercício onde os sons são IGUAIS para teste
  for (let i = 0; i < 1; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const utilizarLongo = Math.random() < 0.5;
    const fonteIgual = utilizarLongo ? parAleatorio.longo : parAleatorio.curto;

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: fonteIgual },
      somB: { rotulo: "Som 02", src: fonteIgual },
      respostaCerta: 'IGUAL',
      dificuldade: 'fácil'
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

export const todosExerciciosEtapaDoisDuracao: ExercicioDuracao[] = gerarEtapaDoisDuracao();