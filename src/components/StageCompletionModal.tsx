'use client';

import React from 'react';

interface StageCompletionModalProps {
  isOpen: boolean;
  errors: number;
  totalExercises: number;
  onRestart: () => void;
}

export function StageCompletionModal({ isOpen, errors, totalExercises, onRestart }: StageCompletionModalProps) {
  if (!isOpen) return null;

  const correctAnswers = totalExercises - errors;
  const accuracy = Math.round((correctAnswers / totalExercises) * 100);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container border border-primary/50 rounded-2xl p-6 max-w-md w-full shadow-[0_0_30px_rgba(6,182,212,0.25)] text-center animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 bg-primary/10 border border-primary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl">emoji_events</span>
        </div>

        <span className="text-xs font-label-mono text-primary font-bold uppercase tracking-widest">
          SISTEMA BIO-ACÚSTICO
        </span>
        <h3 className="text-2xl font-bold text-on-surface mt-1 mb-2">
          Etapa Concluída!
        </h3>
        <p className="text-sm text-on-surface-variant mb-6">
          A sua calibração perceptual para este nó foi concluída com sucesso.
        </p>

        {/* Quadro de Resumo de Desempenho */}
        <div className="grid grid-cols-3 gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase font-label-mono">Acertos</span>
            <span className="text-lg font-bold text-emerald-400">{correctAnswers}/{totalExercises}</span>
          </div>
          <div className="flex flex-col border-x border-outline-variant/30">
            <span className="text-[10px] text-on-surface-variant uppercase font-label-mono">Erros</span>
            <span className="text-lg font-bold text-rose-400">{errors}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase font-label-mono">Precisão</span>
            <span className="text-lg font-bold text-yellow-400">{accuracy}%</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-3 px-4 rounded-lg bg-primary-container text-on-primary font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all cursor-pointer"
        >
          CONTINUAR TREINO
        </button>
      </div>
    </div>
  );
}