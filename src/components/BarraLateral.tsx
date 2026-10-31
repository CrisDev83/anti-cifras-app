'use client';

import React, { useState } from 'react';

interface PropsBarraLateral {
  mundoAtual: 'mundo1' | 'mundo2';
  aoSelecionarMundo: (mundo: 'mundo1' | 'mundo2') => void;
  vistaAtual?: 'treino' | 'afinador';
  aoSelecionarVista?: (vista: 'treino' | 'afinador') => void;
}

export function BarraLateral({ mundoAtual, aoSelecionarMundo, vistaAtual = 'treino', aoSelecionarVista }: PropsBarraLateral) {
  // Controla se o submenu de mundos está aberto ou fechado
  const [mundosAbertos, setMundosAbertos] = useState(true);

  return (
    <aside className="hidden lg:flex flex-col justify-between h-[calc(100vh-4rem)] w-64 sticky top-16 p-4 border-r border-outline-variant/30 bg-surface-container-lowest shrink-0">
      <div className="flex flex-col gap-6">
        <div className="px-3 pt-2">
          <div className="text-title-sm font-title-sm font-bold text-primary">Anti-Cifras</div>
          <p className="text-caption-signal font-caption-signal text-on-surface-variant uppercase tracking-wider">Terminal Sonoro v2.4</p>
        </div>
        <nav className="flex flex-col gap-1.5">
          <button
            onClick={() => aoSelecionarVista?.('treino')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors cursor-pointer text-label-mono font-label-mono text-xs ${
              vistaAtual === 'treino'
                ? 'text-primary bg-primary/10 border-l-2 border-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            ⚡ Treino
          </button>

          {/* Opção Mundos com Submenu */}
          <div className="flex flex-col">
            <button 
              onClick={() => setMundosAbertos(!mundosAbertos)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-mono font-label-mono text-xs transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">🌍 Mundos</span>
              <span className={`material-symbols-outlined text-sm transition-transform ${mundosAbertos ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Submenu dos Mundos */}
            {mundosAbertos && (
              <div className="flex flex-col pl-6 mt-1 gap-1 border-l border-outline-variant/20 ml-4">
                <button
                  onClick={() => aoSelecionarMundo('mundo1')}
                  className={`text-left px-3 py-2 rounded text-xs transition-colors cursor-pointer ${
                    mundoAtual === 'mundo1'
                      ? 'text-primary font-bold bg-primary/10'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
                  }`}
                >
                  Mundo 1: Propriedades do Som
                </button>
                <button
                  onClick={() => aoSelecionarMundo('mundo2')}
                  className={`text-left px-3 py-2 rounded text-xs transition-colors cursor-pointer ${
                    mundoAtual === 'mundo2'
                      ? 'text-primary font-bold bg-primary/10'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
                  }`}
                >
                  Mundo 2: Elementos da Música
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => aoSelecionarVista?.('afinador')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors cursor-pointer text-label-mono font-label-mono text-xs ${
              vistaAtual === 'afinador'
                ? 'text-primary bg-primary/10 border-l-2 border-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            🎸 Afinador
          </button>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-mono font-label-mono text-xs transition-colors">
            🏆 Rankings
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-mono font-label-mono text-xs transition-colors">
            ⚙️ Configurações
          </a>
        </nav>
      </div>
    </aside>
  );
}