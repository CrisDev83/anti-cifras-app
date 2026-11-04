import { ExercicioTimbre } from "./types"; // Ajusta o import conforme o caminho dos teus tipos

export const gerarEtapaTresTimbre = (): ExercicioTimbre[] => {
  // Lista de pares com combinações complexas de 2 ou 3 instrumentos
  const paresCombinacoes = [
    {
      titulo: "",
      somA: '/audio/timbre/etapa3/pianoViolao.mp3',
      somB: '/audio/timbre/etapa3/celoVoz.mp3',
      alvoA: 'PIANO + VIOLÃO',
      alvoB: 'CELO + VOZ'
    },
    {
      titulo: "",
      somA: '/audio/timbre/etapa3/flautaPianoViolino.mp3',
      somB: '/audio/timbre/etapa3/violaoCelo.mp3',
      alvoA: 'FLAUTA + PIANO + VIOLINISTA', // ou outro rótulo à tua escolha
      alvoB: 'VIOLÃO + CELO'
    },
    {
      titulo: "",
      somA: '/audio/timbre/etapa3/driveVozPiano.mp3',
      somB: '/audio/timbre/etapa3/pianoViolaoCelo.mp3',
      alvoA: 'DRIVE + VOZ + PIANO',
      alvoB: 'PIANO + VIOLÃO + CELO'
    },
    {
      titulo: "",
      somA: '/audio/timbre/etapa3/celoVozFlauta.mp3',
      somB: '/audio/timbre/etapa3/driveFlauta.mp3',
      alvoA: 'CELO + VOZ + FLAUTA',
      alvoB: 'DRIVE + FLAUTA'
    },
    {
      titulo: "",
      somA: '/audio/timbre/etapa3/celoVozFlauta.mp3',
      somB: '/audio/timbre/etapa3/driveFlauta.mp3',
      alvoA: 'CELO + VOZ + FLAUTA',
      alvoB: 'DRIVE + FLAUTA'
    }
  ];

  const exerciciosBrutos: Omit<ExercicioTimbre, 'id' | 'numeroQuestao'>[] = [];

  // 1. Cria exatamente 4 exercícios de contraste normal
  for (let i = 0; i < 4; i++) {
    const parAleatorio = paresCombinacoes[Math.floor(Math.random() * paresCombinacoes.length)];
    const inverter = Math.random() < 0.5;

    const srcA = inverter ? parAleatorio.somB : parAleatorio.somA;
    const srcB = inverter ? parAleatorio.somA : parAleatorio.somB;
    const alvoA = inverter ? parAleatorio.alvoB : parAleatorio.alvoA;
    const alvoB = inverter ? parAleatorio.alvoA : parAleatorio.alvoB;

    const solicitarA = Math.random() < 0.5;
    const alvo = solicitarA ? alvoA : alvoB;
    const respostaCerta: 'A' | 'B' = solicitarA ? 'A' : 'B';

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: srcA },
      somB: { rotulo: "Som 02", src: srcB },
      respostaCerta,
      dificuldade: 'difícil' // Por ser uma camada complexa de múltiplos instrumentos
    });
  }

  // 2. Cria exatamente 1 exercício onde os sons são IGUAIS (com alvo real)
  for (let i = 0; i < 1; i++) {
    const parAleatorio = paresCombinacoes[Math.floor(Math.random() * paresCombinacoes.length)];
    const usarB = Math.random() < 0.5;
    const fonteIgual = usarB ? parAleatorio.somB : parAleatorio.somA;
    const alvoIgual = usarB ? parAleatorio.alvoB : parAleatorio.alvoA;

    exerciciosBrutos.push({
      etapa: 3,
      titulo: parAleatorio.titulo,
      alvo: alvoIgual, // Mostra um alvo real na instrução, obrigando a ouvir para detetar a igualdade
      somA: { rotulo: "Som 01", src: fonteIgual },
      somB: { rotulo: "Som 02", src: fonteIgual },
      respostaCerta: 'EQUAL',
      dificuldade: 'difícil'
    });
  }

  // 3. Baralha o array completo
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribui IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapaTresTimbre: ExercicioTimbre[] = gerarEtapaTresTimbre();