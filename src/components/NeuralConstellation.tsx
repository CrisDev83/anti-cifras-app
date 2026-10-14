import React from 'react';

interface NeuralConstellationProps {
  activeNode: 'altura' | 'duração' | 'timbre' | 'intensidade' | 'densidade';
  onSelectNode: (node: 'altura' | 'duração' | 'timbre' | 'intensidade' | 'densidade') => void;
}

export function NeuralConstellation({ activeNode, onSelectNode }: NeuralConstellationProps) {
  return (
    <div className="rounded-xl bg-surface-container-low/40 border border-outline-variant/20 p-5 md:p-6 flex flex-col gap-4 backdrop-blur-xl relative overflow-hidden select-none">
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(76,215,246,0.25)]">
            <span className="material-symbols-outlined text-lg">hub</span>
          </div>
          <div>
            <h2 className="text-title-sm font-title-sm text-on-surface font-bold tracking-tight">Rede Neural Totalmente Interconectada</h2>
            <p className="text-caption-signal font-caption-signal text-on-surface-variant uppercase tracking-wider">Malha de Conexão Total • Treine em qualquer ordem</p>
          </div>
        </div>
      </div>

      {/* Canvas Constelação Neural */}
      <div className="relative w-full h-[380px] rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30 overflow-hidden flex items-center justify-center">
        
        {/* Linhas SVG Conectando os Nós */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <line x1="18%" y1="48%" x2="50%" y2="22%" stroke="#4cd7f6" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="18%" y1="48%" x2="50%" y2="75%" stroke="#4cd7f6" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="18%" y1="48%" x2="82%" y2="32%" stroke="#4cd7f6" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="18%" y1="48%" x2="82%" y2="68%" stroke="#4cd7f6" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="50%" y1="22%" x2="50%" y2="75%" stroke="#869397" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="22%" x2="82%" y2="32%" stroke="#869397" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="50%" y1="22%" x2="82%" y2="68%" stroke="#869397" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="50%" y1="75%" x2="82%" y2="32%" stroke="#869397" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="50%" y1="75%" x2="82%" y2="68%" stroke="#869397" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="82%" y1="32%" x2="82%" y2="68%" stroke="#869397" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Nó 1: Altura (Pitch) */}
        <div 
          onClick={() => onSelectNode('altura')}
          className="absolute z-10 flex flex-col items-center group cursor-pointer" 
          style={{ left: '18%', top: '48%', transform: 'translate(-50%, -50%)' }}
        >
          <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${activeNode === 'altura' ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50'}`}>
            <span className={`material-symbols-outlined text-2xl ${activeNode === 'altura' ? 'text-primary' : 'text-on-surface-variant'}`}>graphic_eq</span>
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-label-mono font-bold shadow-md">1/5</span>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${activeNode === 'altura' ? 'text-primary' : 'text-on-surface'}`}>Altura (Pitch)</span>
            <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${activeNode === 'altura' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
              {activeNode === 'altura' ? '● Treinando' : 'Disponível'}
            </span>
          </div>
        </div>

        {/* Nó 2: Duração */}
        <div 
          onClick={() => onSelectNode('duração')}
          className="absolute z-10 flex flex-col items-center group cursor-pointer" 
          style={{ left: '50%', top: '22%', transform: 'translate(-50%, -50%)' }}
        >
          <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${activeNode === 'duração' ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50 hover:border-tertiary/60'}`}>
            <span className={`material-symbols-outlined text-2xl ${activeNode === 'duração' ? 'text-primary' : 'text-on-surface-variant group-hover:text-tertiary'}`}>timer</span>
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-surface-container-highest border border-outline-variant/40 text-on-surface-variant text-[10px] font-label-mono font-bold">0/5</span>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${activeNode === 'duração' ? 'text-primary' : 'text-on-surface'}`}>Duração</span>
            <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${activeNode === 'duração' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
              {activeNode === 'duração' ? '● Treinando' : 'Disponível'}
            </span>
          </div>
        </div>

        {/* Nó 3: Intensidade */}
        <div 
          onClick={() => onSelectNode('intensidade')}
          className="absolute z-10 flex flex-col items-center group cursor-pointer" 
          style={{ left: '50%', top: '75%', transform: 'translate(-50%, -50%)' }}
        >
          <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${activeNode === 'intensidade' ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50 hover:border-primary/60'}`}>
            <span className={`material-symbols-outlined text-2xl ${activeNode === 'intensidade' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>volume_up</span>
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-surface-container-highest border border-outline-variant/40 text-on-surface-variant text-[10px] font-label-mono font-bold">0/5</span>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${activeNode === 'intensidade' ? 'text-primary' : 'text-on-surface'}`}>Intensidade</span>
            <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${activeNode === 'intensidade' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
              {activeNode === 'intensidade' ? '● Treinando' : 'Disponível'}
            </span>
          </div>
        </div>

        {/* Nó 4: Timbre */}
        <div 
          onClick={() => onSelectNode('timbre')}
          className="absolute z-10 flex flex-col items-center group cursor-pointer" 
          style={{ left: '82%', top: '32%', transform: 'translate(-50%, -50%)' }}
        >
          <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${activeNode === 'timbre' ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50 hover:border-secondary/60'}`}>
            <span className={`material-symbols-outlined text-2xl ${activeNode === 'timbre' ? 'text-primary' : 'text-on-surface-variant group-hover:text-secondary'}`}>waves</span>
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-surface-container-highest border border-outline-variant/40 text-on-surface-variant text-[10px] font-label-mono font-bold">0/5</span>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${activeNode === 'timbre' ? 'text-primary' : 'text-on-surface'}`}>Timbre</span>
            <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${activeNode === 'timbre' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
              {activeNode === 'timbre' ? '● Treinando' : 'Disponível'}
            </span>
          </div>
        </div>

        {/* Nó 5: Densidade */}
        <div 
          onClick={() => onSelectNode('densidade')}
          className="absolute z-10 flex flex-col items-center group cursor-pointer" 
          style={{ left: '82%', top: '68%', transform: 'translate(-50%, -50%)' }}
        >
          <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${activeNode === 'densidade' ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50 hover:border-primary/60'}`}>
            <span className={`material-symbols-outlined text-2xl ${activeNode === 'densidade' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>layers</span>
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-surface-container-highest border border-outline-variant/40 text-on-surface-variant text-[10px] font-label-mono font-bold">0/5</span>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${activeNode === 'densidade' ? 'text-primary' : 'text-on-surface'}`}>Densidade</span>
            <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${activeNode === 'densidade' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
              {activeNode === 'densidade' ? '● Treinando' : 'Disponível'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}