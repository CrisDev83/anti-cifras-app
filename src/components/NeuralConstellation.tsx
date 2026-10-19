'use client';

import React from 'react';

// Interface genérica para aceitar nós de qualquer mundo (Mundo 1, Mundo 2, etc.)
export interface NodeItem {
  id: string;
  label: string;
  icon: string;
  left: string;
  top: string;
  progress: string;
}

interface NeuralConstellationProps {
  activeNode: string;
  onSelectNode: (nodeId: string) => void;
  nodes: NodeItem[];
}

export function NeuralConstellation({ activeNode, onSelectNode, nodes }: NeuralConstellationProps) {
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
          {nodes.map((nodeA, indexA) =>
            nodes.slice(indexA + 1).map((nodeB) => {
              const isConnectedToActive = activeNode === nodeA.id || activeNode === nodeB.id;
              return (
                <line
                  key={`${nodeA.id}-${nodeB.id}`}
                  x1={nodeA.left}
                  y1={nodeA.top}
                  x2={nodeB.left}
                  y2={nodeB.top}
                  stroke={isConnectedToActive ? '#4cd7f6' : '#869397'}
                  strokeOpacity={isConnectedToActive ? '0.5' : '0.25'}
                  strokeWidth={isConnectedToActive ? '1.5' : '1.2'}
                  strokeDasharray="4 4"
                />
              );
            })
          )}
        </svg>

        {/* Renderização Dinâmica dos Nós baseada na configuração */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <div 
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className="absolute z-10 flex flex-col items-center group cursor-pointer" 
              style={{ left: node.left, top: node.top, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`relative w-16 h-16 rounded-xl bg-surface-container/90 border-2 transition-all group-hover:scale-110 flex items-center justify-center ${isActive ? 'border-primary shadow-[0_0_16px_rgba(76,215,246,0.4)]' : 'border-outline-variant/50 hover:border-primary/60'}`}>
                <span className={`material-symbols-outlined text-2xl ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>{node.icon}</span>
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-label-mono font-bold shadow-md">{node.progress}</span>
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span className={`text-xs font-title-sm font-bold tracking-wide text-center ${isActive ? 'text-primary' : 'text-on-surface'}`}>{node.label}</span>
                <span className={`text-[10px] font-caption-signal flex items-center gap-1 mt-0.5 ${isActive ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                  {isActive ? '● Treinando' : 'Disponível'}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}