import { ExercicioDensidade } from './types';

export const gerarEtapaDoisDensidade = (): ExercicioDensidade[] => {
  const par = [
    {
      titulo: "Densidade — Instrumentos",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/etapa2/solo_bongo.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/etapa2/batera.mp3' }
    },
    {
      titulo: "Densidade — Instrumentos",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/etapa2/solo_violino.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/etapa2/sinfonia.mp3' }
    },
    {
      titulo: "Densidade — Instrumentos",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/etapa2/solo_vocal.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/etapa2/coral.mp3' }
    },
    {
      titulo: "Densidade — Instrumentos",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/etapa2/solo_metal.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/etapa2/banda_metais.mp3' }
    },
    {
      titulo: "Densidade — Instrumentos",
      somMenosDenso: { nome: "MENOS DENSO", src: '/audio/densidade/etapa2/solo_guitar.mp3' },
      somMaisDenso: { nome: "MAIS DENSO", src: '/audio/densidade/etapa2/banda_rock.mp3' }
    }
  ];

  const exerciciosBrutos: Omit<ExercicioDensidade, 'id' | 'numeroQuestao'>[] = [];

  // 1. Criamos exatamente 4 exercícios de contraste para teste
  for (let i = 0; i < 8; i++) {
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
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo,
      somA: { rotulo: "Som 01", src: objetoSomA.src },
      somB: { rotulo: "Som 02", src: objetoSomB.src },
      respostaCerta,
      dificuldade: 'fácil'
    });
  }

  // 2. Criamos exatamente 1 exercício onde os sons são IGUAIS para teste
  for (let i = 0; i < 2; i++) {
    const parAleatorio = par[Math.floor(Math.random() * par.length)];
    const usarMenosDenso = Math.random() < 0.5;
    const objetoSomIgual = usarMenosDenso ? parAleatorio.somMenosDenso : parAleatorio.somMaisDenso;

    exerciciosBrutos.push({
      etapa: 2,
      titulo: parAleatorio.titulo,
      alvo: 'IGUAL',
      somA: { rotulo: "Som 01", src: objetoSomIgual.src },
      somB: { rotulo: "Som 02", src: objetoSomIgual.src },
      respostaCerta: 'EQUAL',
      dificuldade: 'fácil'
    });
  }

  // 3. Baralhamos o lote completo para espalhar o exercício igual
  const listaBaralhada = exerciciosBrutos.sort(() => Math.random() - 0.5);

  // 4. Atribuímos os IDs e números de questão definitivos (total de 5)
  return listaBaralhada.map((ex, indice) => ({
    ...ex,
    id: indice + 1,
    numeroQuestao: indice + 1
  }));
};