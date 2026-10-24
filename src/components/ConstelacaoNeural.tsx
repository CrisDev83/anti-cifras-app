'use client';

import React from 'react';

// Interface flexível para aceitar nós com suporte a propriedades em PT e EN
export interface ItemNo {
  id: string;
  rotulo?: string;
  label?: string;
  icone?: string;
  icon?: string;
  left: string;
  top: string;
  progresso?: string;
  progress?: string;
}

interface PropConstelacaoNeural {
  noAtivo: string;
  aoSelecionarNo: (noId: string) => void;
  nos: ItemNo[];
}

// Ícones padrão por ID de nó caso venham em falta nas props
const ICONES_PADRAO: Record<string, string> = {
  densidade: 'layers',
  duracao: 'timer',
  timbre: 'graphic_eq',
  intensidade: 'volume_up',
  altura: 'height',
  ritmo: 'bolt',
  melodia: 'music_note',
  harmonia: 'hub'
};

export function ConstelacaoNeural({ noAtivo, aoSelecionarNo, nos }: PropConstelacaoNeural) {
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
        
        {/* Linhas SVG Conectando Dinamicamente apenas os Nós Existentes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          {nos.map((noA, indexA) =>
            nos.slice(indexA + 1).map((noB) => {
              const estaAtivo = noAtivo === noA.id || noAtivo === noB.id;
              return (
                <line
                  key={`${noA.id}-${noB.id}`}
                  x1={noA.left}
                  y1={noA.top}
                  x2={noB.left}
                  y2={noB.top}
                  stroke={estaAtivo ? '#4cd7f6' : '#869397'}
                  strokeOpacity={estaAtivo ? '0.5' : '0.25'}
                  strokeWidth={estaAtivo ? '1.5' : '1.2'}
                  strokeDasharray="4 4"
                />
              );
            })
          )}
        </svg>

        {/* Renderização Dinâmica dos Nós com Fallbacks Seguros */}
        {nos.map((no) => {
          const estaAtivo = noAtivo === no.id;
          const rotuloFinal = no.rotulo || no.label || no.id;
          const iconeFinal = no.icone || no.icon || ICONES_PADRAO[no.id] || 'radio_button_checked';
          const progressoFinal = no.progresso || no.progress || 'E1';

          return (
            <div 
              key={no.id}
              onClick={() => aoSelecionarNo(no.id)}
              className="absolute z-10 flex flex-col items-center group cursor-pointer" 
              style={{ left: no.left, top: no.top, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${estaAtivo ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50 hover:border-primary/60'}`}>
                <span className={`material-symbols-outlined text-2xl ${estaAtivo ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {iconeFinal}
                </span>
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-label-mono font-bold shadow-md">
                  {progressoFinal}
                </span>
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${estaAtivo ? 'text-primary' : 'text-on-surface'}`}>
                  {rotuloFinal}
                </span>
                <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${estaAtivo ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                  {estaAtivo ? '● Treinando' : 'Disponível'}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}