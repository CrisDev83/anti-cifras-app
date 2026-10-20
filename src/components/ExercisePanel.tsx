'use client';

import React, { useState, useEffect } from 'react';
import { 
  generateStageOne, allStagesExercises,
  generateDurationStageOne, allDurationStagesExercises,
  allTimbreStagesExercises,
  generateIntensityStageOne, allIntensityStagesExercises,
  generateDensityStageOne, allDensityStagesExercises 
} from '@/data/world1';
import { allRitmoStagesExercises } from '@/data/world2/ritmo';
import { allMelodiaStagesExercises } from '@/data/world2/melodia';
import { allHarmoniaStagesExercises } from '@/data/world2/harmonia'; // <-- Importado
import { StageCompletionModal } from '@/components/StageCompletionModal';
import { playSound, stopCurrentAudio } from '@/utils/audioPlayer';

interface ExercisePanelProps {
  activeNode: string;
  currentWorld?: 'world1' | 'world2';
}

export function ExercisePanel({ activeNode, currentWorld = 'world1' }: ExercisePanelProps) {
  const [stageExercises, setStageExercises] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lives, setLives] = useState(5);
  const [xp, setXp] = useState(250);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Função auxiliar para carregar os exercícios do nó ativo consoante o mundo
  const fetchExercisesForNode = (world: string, node: string) => {
    // Lógica do Mundo 2
    if (world === 'world2') {
      switch (node) {
        case 'ritmo':
          return allRitmoStagesExercises;
        case 'melodia':
          return allMelodiaStagesExercises;
        case 'harmonia':
          return allHarmoniaStagesExercises; // <-- Adicionado corretamente
        default:
          return [];
      }
    }

    // Lógica original do Mundo 1
    if (node === 'duracao') {
      return generateDurationStageOne ? generateDurationStageOne() : allDurationStagesExercises;
    } else if (node === 'timbre') {
      return allTimbreStagesExercises.filter(ex => ex.stage === 1);
    } else if (node === 'intensidade') {
      return generateIntensityStageOne ? generateIntensityStageOne() : allIntensityStagesExercises;
    } else if (node === 'densidade') {
      return generateDensityStageOne ? generateDensityStageOne() : allDensityStagesExercises;
    } else {
      return generateStageOne ? generateStageOne() : allStagesExercises.filter(ex => ex.stage === 1);
    }
  };

  useEffect(() => {
    stopCurrentAudio();
    const exercises = fetchExercisesForNode(currentWorld, activeNode);
    setStageExercises(exercises);
    setCurrentIndex(0);
    setSelectedOption(null);
  }, [activeNode, currentWorld]);

  const currentExercise = stageExercises[currentIndex];
  const isWorld2 = currentWorld === 'world2';
  const isDuration = activeNode === 'duracao';
  const isTimbre = activeNode === 'timbre';
  const isIntensity = activeNode === 'intensidade';
  const isDensity = activeNode === 'densidade';

  const handleVerify = () => {
    if (!selectedOption) {
      alert('Selecione uma opção antes de verificar!');
      return;
    }

    stopCurrentAudio();

    if (selectedOption === currentExercise.correctAnswer) {
      setFeedback('Correto! +10 XP');
      setXp(prev => prev + 10);
    } else {
      setFeedback('Incorreto!');
      setErrors(prev => prev + 1);
      setLives(prev => Math.max(0, prev - 1));
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < stageExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowCompletionModal(true);
      }
    }, 1000);
  };

  const handleRestartStage = () => {
    stopCurrentAudio();
    setShowCompletionModal(false);
    setStageExercises(fetchExercisesForNode(currentWorld, activeNode));
    setCurrentIndex(0);
    setErrors(0);
    setLives(5);
    setSelectedOption(null);
  };

  if (!currentExercise) return null;

  // Textos dinâmicos ajustados para o Mundo 2 (Opção B)
  const getWorld2Instruction = () => {
    if (currentExercise.target === 'IGUAL') {
      return "Ouça os dois sons. Eles são IGUAIS ou DIFERENTES?";
    }
    switch (activeNode) {
      case 'ritmo':
        return <>Ouça os dois sons. Qual deles é um <span className="text-primary font-bold">SOM PERCUSSIVO</span>?</>;
      case 'melodia':
        return <>Ouça os dois sons. Qual deles é uma <span className="text-primary font-bold">NOTA SÓ</span>?</>;
      case 'harmonia':
        return <>Ouça os dois sons. Qual deles traz <span className="text-primary font-bold">VÁRIAS NOTAS JUNTAS</span>?</>;
      default:
        return <>Ouça os dois sons e escolha a resposta correta.</>;
    }
  };

  const targetRaw = currentExercise.target; 
  const targetLabel = isWorld2
    ? activeNode.toUpperCase()
    : isDuration 
    ? (targetRaw === 'LONGO' ? 'LONGO' : 'CURTO')
    : isTimbre
    ? targetRaw
    : isIntensity
    ? (targetRaw === 'FORTE' ? 'FORTE' : 'FRACO')
    : isDensity
    ? (targetRaw === 'MAIS_DENSO' ? 'MAIS DENSO' : 'MENOS DENSO')
    : (targetRaw === 'AGUDA' ? 'AGUDA' : 'GRAVE');

  const getOptionLabel = (letter: string) => {
    if (isWorld2) {
      if (letter === 'EQUAL') return 'Ambos são iguais';
      return `O Som ${letter} é o alvo correto`;
    }
    if (isTimbre) return `Som ${letter} é ${targetLabel}`;
    if (isDensity) return `Som ${letter} é ${targetLabel.toLowerCase()}`;
    if (isDuration) return `Som ${letter} é mais ${targetLabel.toLowerCase()}`;
    if (isIntensity) return `Som ${letter} é mais ${targetLabel.toLowerCase()}`;
    return `Som ${letter} é mais ${targetLabel === 'AGUDA' ? 'agudo' : 'grave'}`;
  };

  return (
    <>
      <section className="xl:col-span-5 rounded-xl bg-surface-container border border-outline-variant/40 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-caption-signal font-caption-signal text-primary font-bold uppercase tracking-wider">
              {activeNode.toUpperCase()} — ETAPA 1
            </span>
            <div className="flex gap-1 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-headline-md font-headline-md text-on-surface">{currentExercise.title}</h2>
            <span className="text-xs font-label-mono text-on-surface-variant">Exercício {currentExercise.questionNumber} de {stageExercises.length}</span>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/40 mb-5">
            <div className="text-caption-signal font-caption-signal text-on-surface-variant uppercase mb-1 font-semibold">INSTRUÇÃO ACÚSTICA</div>
            <div className="text-body-md font-body-md">
              {isWorld2 ? (
                getWorld2Instruction()
              ) : isTimbre ? (
                <>Ouça os dois sons. Qual deles é o som de <span className="text-primary font-bold">{targetLabel}</span>?</>
              ) : isDensity ? (
                <>Ouça os dois sons. Qual deles é o som <span className="text-primary font-bold">{targetLabel}</span>?</>
              ) : isDuration ? (
                <>Ouça os dois sons. Qual deles possui o som mais <span className="text-primary font-bold">{targetLabel}</span>?</>
              ) : (
                <>Ouça os dois sons. Qual deles possui o som mais <span className="text-primary font-bold">{targetLabel}</span>?</>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button 
              onClick={() => playSound(currentExercise.soundA)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-caption-signal font-caption-signal text-on-surface-variant">
                {currentExercise.soundA.label}
              </div>
              <div className="font-title-sm font-bold text-primary text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">volume_up</span> Tocar Som A
              </div>
            </button>

            <button 
              onClick={() => playSound(currentExercise.soundB)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-caption-signal font-caption-signal text-on-surface-variant">
                {currentExercise.soundB.label}
              </div>
              <div className="font-title-sm font-bold text-primary text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">volume_up</span> Tocar Som B
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { id: 'A', label: getOptionLabel('A') },
              { id: 'B', label: getOptionLabel('B') },
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

          {feedback && (
            <div className={`p-3 mb-4 rounded text-center font-bold text-sm ${feedback.includes('Correto') ? 'bg-tertiary/20 text-tertiary border border-tertiary/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
              {feedback}
            </div>
          )}
        </div>

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
            <div>Progresso: <strong className="text-primary">{currentIndex + 1}/{stageExercises.length}</strong></div>
          </div>
        </div>
      </section>

      <StageCompletionModal 
        isOpen={showCompletionModal}
        errors={errors}
        totalExercises={stageExercises.length}
        onRestart={handleRestartStage}
      />
    </>
  );
}