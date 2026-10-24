import React from 'react';

interface PropsCabecalho {
  mundoAtual: 'mundo1' | 'mundo2';
}

export function Cabecalho({ mundoAtual }: PropsCabecalho) {
  return (
    <header className="bg-surface-container-lowest/85 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(76,215,246,0.25)]">
            <span className="material-symbols-outlined text-xl">graphic_eq</span>
          </div>
          <div className="flex flex-col">
            <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight leading-none">Anti-Cifras</span>
            <span className="text-caption-signal font-caption-signal text-on-surface-variant uppercase tracking-widest mt-0.5">Terminal v2.4</span>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container border border-outline-variant/40 text-on-surface transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-label-mono font-label-mono text-on-surface font-semibold tracking-wide">
              {mundoAtual === 'mundo1' ? 'Mundo 1: Propriedades do Som' : 'Mundo 2: Elementos da Música'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30">
            <span className="text-amber-400 text-sm font-bold">🔥</span>
            <span className="text-label-mono font-label-mono font-bold text-amber-300">5 dias</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30">
            <span className="text-rose-500 text-sm font-bold">❤️</span>
            <span className="text-label-mono font-label-mono font-bold text-rose-300">5/5</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30">
            <span className="text-yellow-400 text-sm font-bold">⭐</span>
            <span className="text-label-mono font-label-mono font-bold text-yellow-300">250 XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}