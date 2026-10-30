import { ExercicioDuracao } from "./types";

export const gerarEtapaUmDuracao = (): ExercicioDuracao[] => {
  // Apenas o par de áudios que já existem na pasta public/audio/duracao/
  const par = [
    {
      titulo: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/etapa1/latidoCurto.mp3',
      longo: '/audio/duracao/uivoLongo.mp3'
    },
    {
      titulo: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/etapa1/buzinaCurta.mp3',
      longo: '/audio/duracao/sireneLonga.mp3'
    },
    {
      titulo: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/etapa1/alermaCurto.mp3',
      longo: '/audio/duracao/etapa1/alermeLongo.mp3'
    },
    {
      titulo: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/etapa1/portaFechando.mp3',
      longo: '/audio/duracao/etapa1/portaAbrindo.mp3'
    },
    {
      titulo: "Duração — Sons do Dia a Dia",
      curto: '/audio/duracao/etapa1/chuvaCurta.mp3',
      longo: '/audio/duracao/etapa1/chuvaLonga.mp3'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioDuracao, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 16 exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
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
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: fonteA },
      somB: { rotulo: "Som 02", src: fonteB },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Cria exatamente 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 4; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const utilizarLongo = Math.random() < 0.5;
    const fonteIgual = utilizarLongo ? parAleatorio.longo : parAleatorio.curto;

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: fonteIgual },
      somB: { rotulo: "Som 02", src: fonteIgual },
      respostaCerta: 'IGUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralha o array completo para espalhar as questões iguais ao acaso
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui os IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaDuracao: ExercicioDuracao[] = gerarEtapaUmDuracao();