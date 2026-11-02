import { useState } from 'react';

export function useProgressoMundo() {
  // Estado puramente em memória: recarregar a página (F5) limpa tudo automaticamente para os testes
  const [progressoNos, setProgressoNos] = useState<Record<string, number[]>>({});

  const registrarConclusaoEtapaEspecifica = (noId: string, numeroEtapa: number) => {
    setProgressoNos(anterior => {
      const etapasAtuais = anterior[noId] || [];
      if (!etapasAtuais.includes(numeroEtapa)) {
        const novasEtapas = [...etapasAtuais, numeroEtapa];
        return { ...anterior, [noId]: novasEtapas };
      }
      return anterior;
    });
  };

  const obterTextoProgresso = (noId: string, totalEtapas: number = 2) => {
    const etapasConcluidas = progressoNos[noId] || [];
    const qtd = Math.min(etapasConcluidas.length, totalEtapas);
    return `${qtd}/${totalEtapas}`;
  };

  return {
    progressoNos,
    registrarConclusaoEtapaEspecifica,
    obterTextoProgresso,
  };
}