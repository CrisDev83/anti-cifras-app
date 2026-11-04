import { ExercicioDuracao } from "./types";

export const gerarEtapaTresDuracao = (): ExercicioDuracao[] => {
  const paresSequencias = [
    {
      titulo: "",
      sequenciaA: '/audio/duracao/etapa3/vocalCurtoCurtoLongo.mp3',
      sequenciaB: '/audio/duracao/etapa3/pianoLongoCurtoCurto.mp3',
      alvoA: 'CURTO_CURTO_LONGO',
      alvoB: 'LONGO_CURTO_CURTO'
    },
    {
      titulo: "",
      sequenciaA: '/audio/duracao/etapa3/pianoCurtoLongoCurto.mp3',
      sequenciaB: '/audio/duracao/etapa3/violaoCurtoCurtoCurto.mp3',
      alvoA: 'CURTO_LONGO_CURTO',
      alvoB: 'CURTO_CURTO_CURTO'
    },
    {
      titulo: "",
      sequenciaA: '/audio/duracao/etapa3/driveCurtoLongoLongo.mp3',
      sequenciaB: '/audio/duracao/etapa3/driveLongoLongoCurto.mp3',
      alvoA: 'CURTO_LONGO_LONGO',
      alvoB: 'LONGO_LONGO_CURTO'
    },
    {
      titulo: "",
      sequenciaA: '/audio/duracao/etapa3/celoLongoLongoLongo.mp3',
      sequenciaB: '/audio/duracao/etapa3/celoLongoCurtoLongo.mp3',
      alvoA: 'LONGO_LONGO_LONGO',
      alvoB: 'LONGO_CURTO_LONGO'
    },
    {
      titulo: "",
      sequenciaA: '/audio/duracao/etapa3/vocalCurtoCurtoLongo.mp3',
      sequenciaB: '/audio/duracao/etapa3/vocalLongoCurtoCurto.mp3',
      alvoA: 'CURTO_CURTO_LONGO',
      alvoB: 'LONGO_CURTO_CURTO'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioDuracao, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 4 exercícios de contraste normal
  for (let i = 0; i < 4; i++) {
    const parAleatorio = paresSequencias[Math.floor(Math.random() * paresSequencias.length)];
    const inverter = Math.random() < 0.5;

    const srcA = inverter ? parAleatorio.sequenciaB : parAleatorio.sequenciaA;
    const srcB = inverter ? parAleatorio.sequenciaA : parAleatorio.sequenciaB;
    const padraoA = inverter ? parAleatorio.alvoB : parAleatorio.alvoA;
    const padraoB = inverter ? parAleatorio.alvoA : parAleatorio.alvoB;

    const solicitarA = Math.random() < 0.5;
    const alvo = solicitarA ? padraoA : padraoB;
    const respostaCerta: 'A' | 'B' = solicitarA ? 'A' : 'B';

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo,
      padraoA,
      padraoB,
      somA: { rotulo: "Som 01", src: srcA },
      somB: { rotulo: "Som 02", src: srcB },
      respostaCerta,
      dificuldade: 'médio'
    });
  }

  // 2. Cria exatamente 1 exercício onde os sons são IGUAIS (mas o alvo é uma sequência real)
  for (let i = 0; i < 1; i++) {
    const parAleatorio = paresSequencias[Math.floor(Math.random() * paresSequencias.length)];
    const usarB = Math.random() < 0.5;
    const fonteIgual = usarB ? parAleatorio.sequenciaB : parAleatorio.sequenciaA;
    const padraoIgual = usarB ? parAleatorio.alvoB : parAleatorio.alvoA;

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo: padraoIgual, // <--- Aqui está o segredo: usa o padrão real em vez de 'IGUAL'
      padraoA: padraoIgual,
      padraoB: padraoIgual,
      somA: { rotulo: "Som 01", src: fonteIgual },
      somB: { rotulo: "Som 02", src: fonteIgual },
      respostaCerta: 'IGUAL',
      dificuldade: 'médio'
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

export const todosExerciciosEtapaTresDuracao: ExercicioDuracao[] = gerarEtapaTresDuracao();