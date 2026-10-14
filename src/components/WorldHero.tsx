import React from 'react';

export function WorldHero() {
  return (
    <div className="relative rounded-xl bg-surface-container/70 border border-outline-variant/40 p-6 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="px-2.5 py-0.5 rounded text-caption-signal font-caption-signal uppercase font-bold tracking-widest bg-primary/10 text-primary border border-primary/30">
          Mundo 01 • Frequências Puras
        </span>
        <span className="text-label-mono font-label-mono text-xs text-on-surface-variant">20Hz — 20kHz</span>
      </div>
      <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
        MUNDO 1: PROPRIEDADES DO SOM
      </h1>
      <p className="text-body-md font-body-md text-on-surface-variant mt-1.5">
        Domine as características fundamentais de qualquer onda sonora: altura, duração, intensidade e timbre através de calibração perceptual bio-acústica.
      </p>
      <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-label-mono text-on-surface-variant">
        <span>⚡ ESPECTRO ATIVO</span>
        <span className="text-primary font-bold">Progresso Global: 20% Concluído</span>
      </div>
    </div>
  );
}