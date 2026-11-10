'use client';

import { useState, useEffect } from 'react';

// Função auxiliar interna para definir o total correto de etapas por nó
const obterTotalEtapas = (idNo: string): number => {
  const lower = idNo.toLowerCase();
  // Altura, Duração, Timbre, Intensidade, Densidade, Ritmo, Melodia e Harmonia têm 3 etapas
  if (
    lower.includes('altura') || 
    lower.includes('dura') || 
    lower.includes('timbre') || 
    lower.includes('intensidade') ||
    lower.includes('densidade') ||
    lower.includes('ritmo') ||
    lower.includes('melodia') ||
    lower.includes('harmonia')
  ) {
    return 3;
  }
  return 2;
};

export function useProgressoMundo() {
  // Garante que arranca sempre estritamente vazio na montagem inicial
  const [progressoNos, setProgressoNos] = useState<Record<string, number[]>>({});

  // Força a limpeza de qualquer lixo em memória ou sessionStorage ao montar
  useEffect(() => {
    setProgressoNos({});
  }, []);

  const registrarConclusaoEtapaEspecifica = (noId: string, numeroEtapa: number | string) => {
    const chave = noId.toLowerCase();
    const etapaNum = Number(numeroEtapa);
    
    if (isNaN(etapaNum)) return;

    setProgressoNos(anterior => {
      const etapasAtuais = anterior[chave] || [];
      
      if (!etapasAtuais.includes(etapaNum)) {
        const novasEtapas = Array.from(new Set([...etapasAtuais, etapaNum])).sort((a, b) => a - b);
        return { ...anterior, [chave]: novasEtapas };
      }
      return anterior;
    });
  };

  const obterTextoProgresso = (noId: string, totalEtapasOverride?: number) => {
    const chave = noId.toLowerCase();
    const totalEtapas = totalEtapasOverride !== undefined ? totalEtapasOverride : obterTotalEtapas(chave);
    const etapasConcluidas = progressoNos[chave] || [];
    const qtd = Math.min(etapasConcluidas.length, totalEtapas);
    return `${qtd}/${totalEtapas}`;
  };

  return {
    progressoNos,
    registrarConclusaoEtapaEspecifica,
    obterTextoProgresso,
  };
}