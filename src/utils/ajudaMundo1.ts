import { 
  gerarEtapaUmAltura, todosExerciciosEtapaAltura,
  gerarEtapaUmDuracao, todosExerciciosEtapaDuracao,
  todosExerciciosEtapasTimbre, 
  gerarEtapaUmIntensidade, todosExerciciosIntensidade,
  gerarEtapaUmDensidade, todosExerciciosEtapasDensidade 
} from '@/data/mundo1';

export const buscarExerciciosParaNo = (no: string) => {
  if (no === 'duracao') {
    return gerarEtapaUmDuracao ? gerarEtapaUmDuracao() : todosExerciciosEtapaDuracao;
  } else if (no === 'timbre') {
    return todosExerciciosEtapasTimbre.filter((ex: any) => ex.etapa === 1);
  } else if (no === 'intensidade') {
    return gerarEtapaUmIntensidade ? gerarEtapaUmIntensidade() : todosExerciciosIntensidade;
  } else if (no === 'densidade') {
    return gerarEtapaUmDensidade ? gerarEtapaUmDensidade() : todosExerciciosEtapasDensidade;
  } else {
    return gerarEtapaUmAltura ? gerarEtapaUmAltura() : todosExerciciosEtapaAltura.filter(ex => ex.etapa === 1);
  }
};

export const obterRotuloAlvo = (exercicio: any, noAtivo: string) => {
  // Suporta tanto 'alvo' (geradores novos) quanto 'target' (legado)
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