'use client';

import React, { useState, useMemo } from 'react';
import { StageCompletionModal } from '@/components/StageCompletionModal';
import { useExerciseSession } from '@/hooks/useExerciseSession';
import { getTargetLabel, getOptionLabel } from '@/utils/exerciseHelpers';
import { getWorld2TargetLabel, getWorld2OptionLabel } from '@/utils/world2Helpers';

interface ExercisePanelProps {
  activeNode: string;
  currentWorld?: 'world1' | 'world2';
}

export function ExercisePanel({ activeNode, currentWorld = 'world1' }: ExercisePanelProps) {
  // 1. Estado para a etapa selecionada no seletor (E1 ou E2)
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const isWorld2 = currentWorld === 'world2';

  // Passamos o selectedStage para o hook saber qual etapa carregar
  const {
    stageExercises,
    currentIndex,
    currentExercise,
    selectedOption,
    setSelectedOption,
    lives,
    xp,
    errors,
    feedback,
    showCompletionModal,
    playSound,
    handleVerify,
    handleRestartStage
  } = useExerciseSession(activeNode, currentWorld, selectedStage);

  // 2. Filtro por segurança caso o hook traga o array total
  const filteredExercises = useMemo(() => {
    if (!stageExercises) return [];
    const hasMultipleStages = stageExercises.some(ex => ex.stage !== undefined);
    if (hasMultipleStages) {
      return stageExercises.filter(ex => ex.stage === selectedStage);
    }
    return stageExercises;
  }, [stageExercises, selectedStage]);

  const activeExercise = filteredExercises[currentIndex] || currentExercise;

  if (!activeExercise) return null;

  // Lógica separada de Rótulos por Mundo
  const targetLabel = isWorld2 
    ? getWorld2TargetLabel(activeExercise, activeNode) 
    : getTargetLabel(activeExercise, activeNode);

  // Função para mudar a etapa e reiniciar o progresso da sessão
  const handleStageSelect = (stage: number) => {
    if (stage === selectedStage) return;
    setSelectedStage(stage);
    if (handleRestartStage) {
      handleRestartStage();
    }
  };

  const renderInstruction = () => {
    if (isWorld2) {
      if (activeExercise.target === 'IGUAL') {
        return "Ouça os dois sons. Eles são IGUAIS ou DIFERENTES?";
      }
      switch (activeNode) {
        case 'ritmo':
          if (selectedStage === 2) {
            return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">RITMO</span>?</>;
          }
          return <>Ouça os dois sons. Qual deles é um <span className="text-primary font-bold">SOM PERCUSSIVO</span>?</>;
        case 'melodia':
          return <>Ouça os dois sons. Qual deles é uma <span className="text-primary font-bold">NOTA SÓ</span>?</>;
        case 'harmonia':
          return <>Ouça os dois sons. Qual deles traz <span className="text-primary font-bold">VÁRIAS NOTAS JUNTAS</span>?</>;
        default:
          return <>Ouça os dois sons e escolha a resposta correta.</>;
      }
    }

    return <>Ouça os dois sons. Qual deles {activeNode === 'timbre' || activeNode === 'densidade' ? 'é o som' : 'possui o som mais'} <span className="text-primary font-bold">{targetLabel}</span>?</>;
  };

  return (
    <>
      <section className="xl:col-span-5 rounded-xl bg-surface-container border border-outline-variant/40 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header Status + Mini-Seletor de Etapas (E1 / E2) */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-caption-signal font-caption-signal text-primary font-bold uppercase tracking-wider">
                {activeNode.toUpperCase()}
              </span>

              {/* Seletor Compacto E1 / E2 para o Mundo 2 */}
              {isWorld2 && (
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant/60 rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => handleStageSelect(1)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      selectedStage === 1
                        ? 'bg-primary/20 text-primary border border-primary/50 shadow-sm'
                        : 'text-on-surface-variant/60 hover:text-on-surface'
                    }`}
                  >
                    E1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStageSelect(2)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      selectedStage === 2
                        ? 'bg-primary/20 text-primary border border-primary/50 shadow-sm'
                        : 'text-on-surface-variant/60 hover:text-on-surface'
                    }`}
                  >
                    E2
                  </button>
                </div>
              )}
            </div>

            {/* Vidas / Corações */}
            <div className="flex gap-1 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
              ))}
            </div>
          </div>

          {/* Título & Progresso */}
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-headline-md font-headline-md text-on-surface">{activeExercise.title}</h2>
            <span className="text-xs font-label-mono text-on-surface-variant">
              Exercício {currentIndex + 1} de {filteredExercises.length || stageExercises.length}
            </span>
          </div>

          {/* Instrução Acústica Dinâmica */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/40 mb-5">
            <div className="text-caption-signal font-caption-signal text-on-surface-variant uppercase mb-1 font-semibold">
              INSTRUÇÃO ACÚSTICA
            </div>
            <div className="text-body-md font-body-md">
              {renderInstruction()}
            </div>
          </div>

          {/* Player de Sons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button 
              onClick={() => playSound(activeExercise.soundA)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-caption-signal font-caption-signal text-on-surface-variant">
                {activeExercise.soundA.label}
              </div>
              <div className="font-title-sm font-bold text-primary text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">volume_up</span> Tocar Som A
              </div>
            </button>

            <button 
              onClick={() => playSound(activeExercise.soundB)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-caption-signal font-caption-signal text-on-surface-variant">
                {activeExercise.soundB.label}
              </div>
              <div className="font-title-sm font-bold text-primary text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">volume_up</span> Tocar Som B
              </div>
            </button>
          </div>

          {/* Opções de Resposta */}
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { id: 'A', label: isWorld2 ? getWorld2OptionLabel('A', activeExercise) : getOptionLabel('A', activeExercise, activeNode) },
              { id: 'B', label: isWorld2 ? getWorld2OptionLabel('B', activeExercise) : getOptionLabel('B', activeExercise, activeNode) },
              { id: 'EQUAL', label: 'Ambos são iguais' }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center text-sm transition-all ${
                  selectedOption === opt.id 
                    ? 'border-primary-container bg-primary-container/10 text-on-surface' 
                    : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:border-outline-variant'
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-[10px] font-label-mono opacity-60">[{opt.id === 'A' ? '1' : opt.id === 'B' ? '2' : '3'}]</span>
              </div>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-3 mb-4 rounded text-center font-bold text-sm ${feedback.includes('Correto') ? 'bg-tertiary/20 text-tertiary border border-tertiary/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
              {feedback}
            </div>
          )}
        </div>

        {/* Rodapé / Botão de Verificação */}
        <div>
          <button 
            onClick={handleVerify}
            className="w-full py-3 px-4 rounded bg-primary-container text-on-primary font-title-sm font-bold text-sm tracking-wider uppercase shadow-[0_0_16px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all cursor-pointer"
          >
            VERIFICAR RESPOSTA
          </button>
          
          <div className="grid grid-cols-3 text-xs font-label-mono text-on-surface-variant mt-3 pt-2 border-t border-outline-variant/20 text-center">
            <div>XP: <strong className="text-yellow-400">{xp}</strong></div>
            <div>Erros: <strong className="text-rose-400">{errors}</strong></div>
            <div>Progresso: <strong className="text-primary">{currentIndex + 1}/{filteredExercises.length || stageExercises.length}</strong></div>
          </div>
        </div>
      </section>

      <StageCompletionModal 
        isOpen={showCompletionModal}
        errors={errors}
        totalExercises={filteredExercises.length || stageExercises.length}
        onRestart={handleRestartStage}
      />
    </>
  );
}