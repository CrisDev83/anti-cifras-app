import { ExercicioDensidade } from './types';

export const gerarEtapaUmDensidade = (): ExercicioDensidade[] => {
  const par = [
    {
      titulo: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/pingo.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/chuva.mp3' }
    },
    {
      titulo: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/sapoUm.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/sapoCoro.mp3' }
    },
    {
      titulo: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/umaVoz.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/timbre/adultosFalando.mp3' }
    },
    {
      titulo: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/palma.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/aplausos.mp3' }
    },
    {
      titulo: "Densidade — Sons do Dia a Dia",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/umPassaro.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/variosPassaros.mp3' }
    }
  ];

  const exerciciosBrutos: Omit<ExercicioDensidade, 'id' | 'numeroQuestao'>[] = [];

  // 1. Criamos exatamente 16 exercícios de contraste normal
  for (let i = 0; i < 16; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];

    const eA = Math.random() < 0.5;
    const objetoSomA = eA ? parAleatorio.somMenosDenso : parAleatorio.somMaisDenso;
    const objetoSomB = eA ? parAleatorio.somMaisDenso : parAleatorio.somMenosDenso;

    const pedirMenosDenso = Math.random() < 0.5;
    const alvo: 'MENOS_DENSO' | 'MAIS_DENSO' = pedirMenosDenso ? 'MENOS_DENSO' : 'MAIS_DENSO';

    let respostaCerta: 'A' | 'B';
    if (pedirMenosDenso) {
      respostaCerta = eA ? 'A' : 'B';
    } else {
      respostaCerta = eA ? 'B' : 'A';
    }

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: objetoSomA.src },
      somB: { rotulo: "Som 02", src: objetoSomB.src },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Criamos exatamente 4 exercícios onde os sons são IGUAIS
  for (let i = 0; i < 4; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const usarMenosDenso = Math.random() < 0.5;
    const objetoSomIgual = usarMenosDenso ? parAleatorio.somMenosDenso : parAleatorio.somMaisDenso;

    exerciciosBrutos.push({
      etapa: 1,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: objetoSomIgual.src },
      somB: { rotulo: "Som 02", src: objetoSomIgual.src },
      respostaCerta: 'IGUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralhamos o lote completo para espalhar os exercícios iguais
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};

export const todosExerciciosEtapasDensidade: ExercicioDensidade[] = gerarEtapaUmDensidade();