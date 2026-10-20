import React from 'react';

interface WorldHeroProps {
  currentWorld: 'world1' | 'world2';
}

export function WorldHero({ currentWorld }: WorldHeroProps) {
  const isWorld1 = currentWorld === 'world1';

  return (
    <div className="relative rounded-xl bg-surface-container/70 border border-outline-variant/40 p-6 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="px-2.5 py-0.5 rounded text-caption-signal font-caption-signal uppercase font-bold tracking-widest bg-primary/10 text-primary border border-primary/30">
          {isWorld1 ? 'Mundo 01 • Propriedades do Som' : 'Mundo 02 • Elementos da Música'}
        </span>
      </div>
      
      <p className="text-body-md font-body-md text-on-surface-variant mt-1.5">
        {isWorld1
          ? 'Domine as características fundamentais de qualquer onda sonora: altura, duração, intensidade e timbre através de calibração perceptual bio-acústica.'
          : 'Explore os pilares fundamentais da linguagem musical: ritmo, melodia e harmonia para estruturar a sua perceção.'}
      </p>
      <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-label-mono text-on-surface-variant">
        <span>⚡ ESPECTRO ATIVO</span>
        <span className="text-primary font-bold">
          Progresso Global: {isWorld1 ? '20% Concluído' : '0% Concluído'}
        </span>
      </div>
    </div>
  );
}