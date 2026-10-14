import React from 'react';

export function Sidebar() {
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
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-mono font-label-mono text-xs transition-colors">
            🌍 Mundos
          </a>
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