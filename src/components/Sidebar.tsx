'use client';

import React, { useState } from 'react';

interface SidebarProps {
  currentWorld: 'world1' | 'world2';
  onSelectWorld: (world: 'world1' | 'world2') => void;
}

export function Sidebar({ currentWorld, onSelectWorld }: SidebarProps) {
  // Controla se o submenu de mundos está aberto ou fechado
  const [isWorldsOpen, setIsWorldsOpen] = useState(true);

  return (
    <aside className="hidden lg:flex flex-col justify-between h-[calc(100vh-4rem)] w-64 sticky top-16 p-4 border-r border-outline-variant/30 bg-surface-container-lowest shrink-0">
      <div className="flex flex-col gap-6">
        <div className="px-3 pt-2">
          <div className="text-title-sm font-title-sm font-bold text-primary">Anti-Cifras</div>
          <p className="text-caption-signal font-caption-signal text-on-surface-variant uppercase tracking-wider">Terminal Sonoro v2.4</p>
        </div>
        <nav className="flex flex-col gap-1.5">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded text-primary bg-primary/10 border-l-2 border-primary font-semibold text-label-mono font-label-mono text-xs">
            ⚡ Treino
          </a>

          {/* Opção Mundos com Submenu */}
          <div className="flex flex-col">
            <button 
              onClick={() => setIsWorldsOpen(!isWorldsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-mono font-label-mono text-xs transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">🌍 Mundos</span>
              <span className={`material-symbols-outlined text-sm transition-transform ${isWorldsOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Submenu dos Mundos */}
            {isWorldsOpen && (
              <div className="flex flex-col pl-6 mt-1 gap-1 border-l border-outline-variant/20 ml-4">
                <button
                  onClick={() => onSelectWorld('world1')}
                  className={`text-left px-3 py-2 rounded text-xs transition-colors cursor-pointer ${
                    currentWorld === 'world1'
                      ? 'text-primary font-bold bg-primary/10'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
                  }`}
                >
                  Mundo 1: Propriedades do Som
                </button>
                <button
                  onClick={() => onSelectWorld('world2')}
                  className={`text-left px-3 py-2 rounded text-xs transition-colors cursor-pointer ${
                    currentWorld === 'world2'
                      ? 'text-primary font-bold bg-primary/10'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
                  }`}
                >
                  Mundo 2: Elementos da Música
                </button>
              </div>
            )}
          </div>

          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-mono font-label-mono text-xs transition-colors">
            🎛️ Sintetizador
          </a>
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