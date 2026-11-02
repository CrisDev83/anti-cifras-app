'use client';

import React from 'react';

interface PropsPrincipalMundo {
  mundoAtual: 'mundo1' | 'mundo2' | 'mundo3' | 'mundo4' | 'mundo5';
}

export function PrincipalMundo({ mundoAtual }: PropsPrincipalMundo) {
  // Define os textos de acordo com o mundo ativo de forma limpa e escalável
  const infoMundo = {
    mundo1: {
      tag: 'Mundo 01 • Propriedades do Som',
      descricao: 'Domine as características fundamentais de qualquer onda sonora: altura, duração, intensidade e timbre através de calibração perceptual bio-acústica.',
      progresso: '20% Concluído',
    },
    mundo2: {
      tag: 'Mundo 02 • Elementos da Música',
      descricao: 'Explore os pilares fundamentais da linguagem musical: ritmo, melodia e harmonia para estruturar a sua perceção.',
      progresso: '0% Concluído',
    },
    mundo3: {
      tag: 'Mundo 03 • Ritmo',
      descricao: 'Aprofunde-se no universo rítmico: domine a pulsação, swing vs. straight, compassos, tempos fortes e fracos, figuras e grooves essenciais.',
      progresso: '0% Concluído',
    },
    mundo4: {
      tag: 'Mundo 04 • Melodia',
      descricao: 'Explore o universo melódico: domine os intervalos, as escalas maior/menor e pentatônica, o cromatismo e as notas de repouso.',
      progresso: '0% Concluído',
    },
    mundo5: {
      tag: 'Mundo 05 • Harmonia',
      descricao: 'Compreenda a textura vertical dos sons: explore tríades, tétrades, campo harmônico, inversões e condução de vozes.',
      progresso: '0% Concluído',
    },
  }[mundoAtual];

  return (
    <div className="relative rounded-xl bg-surface-container/70 border border-outline-variant/40 p-6 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="px-2.5 py-0.5 rounded text-caption-signal font-caption-signal uppercase font-bold tracking-widest bg-primary/10 text-primary border border-primary/30">
          {infoMundo.tag}
        </span>
      </div>
      
      <p className="text-body-md font-body-md text-on-surface-variant mt-1.5">
        {infoMundo.descricao}
      </p>
      <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-label-mono text-on-surface-variant">
        <span>⚡ ESPECTRO ATIVO</span>
        <span className="text-primary font-bold">
          Progresso Global: {infoMundo.progresso}
        </span>
      </div>
    </div>
  );
}