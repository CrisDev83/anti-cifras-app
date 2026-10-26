import { 
  gerarEtapaUmAltura, todosExerciciosEtapaAltura,
  gerarEtapaUmDuracao, todosExerciciosEtapaDuracao,
  todosExerciciosEtapasTimbre, 
  gerarEtapaUmIntensidade, todosExerciciosIntensidade,
  gerarEtapaUmDensidade, todosExerciciosEtapasDensidade 
} from '@/data/mundo1';
// Importa também o gerador da etapa 2 de altura (ou o agregado)
import { gerarEtapaDoisAltura } from '@/data/mundo1/altura/etapaDois'; // Ajusta o caminho se necessário

export const buscarExerciciosParaNo = (no: string) => {
  if (no === 'duracao') {
    return gerarEtapaUmDuracao ? gerarEtapaUmDuracao() : todosExerciciosEtapaDuracao;
  } else if (no === 'timbre') {
    // Se quiseres abrir o timbre para outras etapas no futuro, podes remover o .filter(ex => ex.etapa === 1) ou deixá-lo se a etapa 2 ainda não existir
    return todosExerciciosEtapasTimbre; 
  } else if (no === 'intensidade') {
    return gerarEtapaUmIntensidade ? gerarEtapaUmIntensidade() : todosExerciciosIntensidade;
  } else if (no === 'densidade') {
    return gerarEtapaUmDensidade ? gerarEtapaUmDensidade() : todosExerciciosEtapasDensidade;
  } else {
    // Para a ALTURA, juntamos a Etapa 1 e a Etapa 2 para o hook conseguir filtrar a que o utilizador escolheu!
    const exerciciosEtapa1 = gerarEtapaUmAltura ? gerarEtapaUmAltura() : [];
    const exerciciosEtapa2 = gerarEtapaDoisAltura ? gerarEtapaDoisAltura() : [];
    
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  }
};

export const obterRotuloAlvo = (exercicio: any, noAtivo: string) => {
  const alvoBruto = exercicio?.alvo || exercicio?.target;
  switch (noAtivo) {
    case 'duracao':
      return alvoBruto === 'LONGO' ? 'LONGO' : 'CURTO';
    case 'intensidade':
      return alvoBruto === 'FORTE' ? 'FORTE' : 'FRACO';
    case 'densidade':
      return alvoBruto === 'MAIS_DENSO' ? 'MAIS DENSO' : 'MENOS DENSO';
    case 'timbre':
      return alvoBruto;
    default:
      return alvoBruto === 'AGUDA' ? 'AGUDA' : 'GRAVE';
  }
};

export const obterRotuloOpcao = (letra: string, exercicio: any, noAtivo: string) => {
  const rotuloAlvo = obterRotuloAlvo(exercicio, noAtivo);

  if (noAtivo === 'timbre') return `Som ${letra} é ${rotuloAlvo}`;
  if (noAtivo === 'densidade') return `Som ${letra} é ${rotuloAlvo?.toLowerCase()}`;
  if (noAtivo === 'duracao') return `Som ${letra} é mais ${rotuloAlvo?.toLowerCase()}`;
  if (noAtivo === 'intensidade') return `Som ${letra} é mais ${rotuloAlvo?.toLowerCase()}`;
  return `Som ${letra} é mais ${rotuloAlvo === 'AGUDA' ? 'agudo' : 'grave'}`;
};