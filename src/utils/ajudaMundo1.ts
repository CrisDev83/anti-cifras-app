import { 
  gerarEtapaUmAltura, 
  gerarEtapaUmDuracao, 
  gerarEtapaUmIntensidade, 
  gerarEtapaUmDensidade 
} from '@/data/mundo1';
import { gerarEtapaDoisAltura } from '@/data/mundo1/altura/etapaDois';
import { gerarEtapaTresAltura } from '@/data/mundo1/altura/etapaTres';
import { gerarEtapaDoisDensidade } from '@/data/mundo1/densidade/etapaDois';
import { gerarEtapaDoisDuracao } from '@/data/mundo1/duracao/etapaDois';
import { gerarEtapaTresDuracao } from '@/data/mundo1/duracao/etapaTres';
import { gerarEtapaDoisIntensidade } from '@/data/mundo1/intensidade/etapaDois';
import { gerarEtapaUmTimbre } from '@/data/mundo1/timbre/etapaUm';
import { gerarEtapaDoisTimbre } from '@/data/mundo1/timbre/etapaDois';
import { gerarEtapaTresTimbre } from '@/data/mundo1/timbre/etapaTres'; // <-- Importação da Etapa 3 de Timbre

export const buscarExerciciosParaNo = (no: string) => {
  const noLower = no.toLowerCase();
  
  if (noLower.includes('dura')) {
    const exerciciosEtapa1 = gerarEtapaUmDuracao ? gerarEtapaUmDuracao() : [];
    const exerciciosEtapa2 = gerarEtapaDoisDuracao ? gerarEtapaDoisDuracao() : [];
    const exerciciosEtapa3 = gerarEtapaTresDuracao ? gerarEtapaTresDuracao() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2, ...exerciciosEtapa3];
  } else if (noLower.includes('timbre')) {
    const exerciciosEtapa1 = gerarEtapaUmTimbre ? gerarEtapaUmTimbre() : [];
    const exerciciosEtapa2 = gerarEtapaDoisTimbre ? gerarEtapaDoisTimbre() : [];
    const exerciciosEtapa3 = gerarEtapaTresTimbre ? gerarEtapaTresTimbre() : []; // <-- Adicionado aqui
    return [...exerciciosEtapa1, ...exerciciosEtapa2, ...exerciciosEtapa3];
  } else if (noLower.includes('intensidade')) {
    const exerciciosEtapa1 = gerarEtapaUmIntensidade ? gerarEtapaUmIntensidade() : [];
    const exerciciosEtapa2 = gerarEtapaDoisIntensidade ? gerarEtapaDoisIntensidade() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  } else if (noLower.includes('densidade')) {
    const exerciciosEtapa1 = gerarEtapaUmDensidade ? gerarEtapaUmDensidade() : [];
    const exerciciosEtapa2 = gerarEtapaDoisDensidade ? gerarEtapaDoisDensidade() : [];
    return [...exerciciosEtapa1, ...exerciciosEtapa2];
  } else {
    // Para a ALTURA, juntamos a Etapa 1, Etapa 2 e Etapa 3!
    const exerciciosEtapa1 = gerarEtapaUmAltura ? gerarEtapaUmAltura() : [];
    const exerciciosEtapa2 = gerarEtapaDoisAltura ? gerarEtapaDoisAltura() : [];
    const exerciciosEtapa3 = gerarEtapaTresAltura ? gerarEtapaTresAltura() : [];
    
    return [...exerciciosEtapa1, ...exerciciosEtapa2, ...exerciciosEtapa3];
  }
};

export const obterRotuloAlvo = (exercicio: any, noAtivo: string) => {
  const alvoBruto = exercicio?.alvo || exercicio?.target;
  const noLower = noAtivo.toLowerCase();

  switch (true) {
    case noLower.includes('dura'):
      if (exercicio?.etapa === 3) {
        const mapaPadroes: Record<string, string> = {
          'CURTO_CURTO_LONGO': 'Curto — Curto — Longo',
          'LONGO_CURTO_CURTO': 'Longo — Curto — Curto',
          'CURTO_LONGO_CURTO': 'Curto — Longo — Curto',
          'LONGO_LONGO_CURTO': 'Longo — Longo — Curto'
        };
        return mapaPadroes[alvoBruto] || alvoBruto;
      }
      return alvoBruto === 'LONGO' ? 'LONGO' : 'CURTO';
    case noLower.includes('intensidade'):
      return alvoBruto === 'FORTE' ? 'FORTE' : 'FRACO';
    case noLower.includes('densidade'):
      return alvoBruto === 'MAIS_DENSO' ? 'MAIS DENSO' : 'MENOS DENSO';
    case noLower.includes('timbre'):
      // Se for a Etapa 3 de Timbre, devolve o rótulo em maiúsculas (ex: PIANO + VIOLÃO)
      if (exercicio?.etapa === 3) {
        return alvoBruto?.toUpperCase();
      }
      return alvoBruto;
    default:
      return alvoBruto === 'AGUDA' ? 'AGUDA' : 'GRAVE';
  }
};

export const obterRotuloOpcao = (letra: string, exercicio: any, noAtivo: string) => {
  const rotuloAlvo = obterRotuloAlvo(exercicio, noAtivo);
  const noLower = noAtivo.toLowerCase();

  if (noLower.includes('timbre')) {
    if (exercicio?.etapa === 3) {
      return `Som ${letra} é a combinação ${rotuloAlvo}`;
    }
    return `Som ${letra} é ${rotuloAlvo}`;
  }
  if (noLower.includes('densidade')) return `Som ${letra} é ${rotuloAlvo?.toLowerCase()}`;
  if (noLower.includes('dura')) {
    if (exercicio?.etapa === 3) {
      return `Som ${letra}: ${rotuloAlvo}`;
    }
    return `Som ${letra} é mais ${rotuloAlvo?.toLowerCase()}`;
  }
  if (noLower.includes('intensidade')) return `Som ${letra} é mais ${rotuloAlvo?.toLowerCase()}`;
  return `Som ${letra} é mais ${rotuloAlvo === 'AGUDA' ? 'agudo' : 'grave'}`;
};