import { 
  gerarEtapaUmAltura, 
  gerarEtapaUmDuracao, 
  gerarEtapaUmIntensidade, 
  gerarEtapaUmDensidade 
} from '@/data/mundo1';
import { gerarEtapaDoisAltura } from '@/data/mundo1/altura/etapaDois';
import { gerarEtapaDoisDensidade } from '@/data/mundo1/densidade/etapaDois';
import { gerarEtapaDoisDuracao } from '@/data/mundo1/duracao/etapaDois';
import { gerarEtapaDoisIntensidade } from '@/data/mundo1/intensidade/etapaDois';
import { gerarEtapaUmTimbre } from '@/data/mundo1/timbre/etapaUm';
import { gerarEtapaDoisTimbre } from '@/data/mundo1/timbre/etapaDois';

export const buscarExerciciosParaNo = (no: string) => {
  const noLower = no.toLowerCase();
  
  if (noLower.includes('dura')) {
    const exerciciosEtapa1 = gerarEtapaUmDuracao ? gerarEtapaUmDuracao() : [];
    const exerciciosEtapa2 = gerarEtapaDoisDuracao ? gerarEtapaDoisDuracao() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  } else if (noLower.includes('timbre')) {
    const exerciciosEtapa1 = gerarEtapaUmTimbre ? gerarEtapaUmTimbre() : [];
    const exerciciosEtapa2 = gerarEtapaDoisTimbre ? gerarEtapaDoisTimbre() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  } else if (noLower.includes('intensidade')) {
    const exerciciosEtapa1 = gerarEtapaUmIntensidade ? gerarEtapaUmIntensidade() : [];
    const exerciciosEtapa2 = gerarEtapaDoisIntensidade ? gerarEtapaDoisIntensidade() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  } else if (noLower.includes('densidade')) {
    const exerciciosEtapa1 = gerarEtapaUmDensidade ? gerarEtapaUmDensidade() : [];
    const exerciciosEtapa2 = gerarEtapaDoisDensidade ? gerarEtapaDoisDensidade() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  } else {
    // Para a ALTURA, juntamos a Etapa 1 e a Etapa 2 para o hook conseguir filtrar a que o utilizador escolheu!
    const exerciciosEtapa1 = gerarEtapaUmAltura ? gerarEtapaUmAltura() : [];
    const exerciciosEtapa2 = gerarEtapaDoisAltura ? gerarEtapaDoisAltura() : [];
    
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  }
};

export const obterRotuloAlvo = (exercicio: any, noAtivo: string) => {
  const alvoBruto = exercicio?.alvo || exercicio?.target;
  const noLower = noAtivo.toLowerCase();

  switch (true) {
    case noLower.includes('dura'):
      return alvoBruto === 'LONGO' ? 'LONGO' : 'CURTO';
    case noLower.includes('intensidade'):
      return alvoBruto === 'FORTE' ? 'FORTE' : 'FRACO';
    case noLower.includes('densidade'):
      return alvoBruto === 'MAIS_DENSO' ? 'MAIS DENSO' : 'MENOS DENSO';
    case noLower.includes('timbre'):
      return alvoBruto;
    default:
      return alvoBruto === 'AGUDA' ? 'AGUDA' : 'GRAVE';
  }
};

export const obterRotuloOpcao = (letra: string, exercicio: any, noAtivo: string) => {
  const rotuloAlvo = obterRotuloAlvo(exercicio, noAtivo);
  const noLower = noAtivo.toLowerCase();

  if (noLower.includes('timbre')) return `Som ${letra} é ${rotuloAlvo}`;
  if (noLower.includes('densidade')) return `Som ${letra} é ${rotuloAlvo?.toLowerCase()}`;
  if (noLower.includes('dura')) return `Som ${letra} é mais ${rotuloAlvo?.toLowerCase()}`;
  if (noLower.includes('intensidade')) return `Som ${letra} é mais ${rotuloAlvo?.toLowerCase()}`;
  return `Som ${letra} é mais ${rotuloAlvo === 'AGUDA' ? 'agudo' : 'grave'}`;
};