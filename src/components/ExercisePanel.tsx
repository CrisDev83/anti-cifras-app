'use client';

import React, { useState, useEffect, useRef } from 'react';
import { generateStageOne, allStagesExercises } from '@/data/exercises';
import { allDurationStagesExercises } from '@/data/durationExercises';
import { allTimbreStagesExercises } from '@/data/timbreExercises';
import { generateIntensityStageOne, allIntensityStagesExercises } from '@/data/intensityExercises';
import { generateDensityStageOne, allDensityStagesExercises } from '@/data/densityExercises';
import { StageCompletionModal } from '@/components/StageCompletionModal';

interface ExercisePanelProps {
  activeNode: 'altura' | 'duracao' | 'timbre' | 'intensidade' | 'densidade';
}

export function ExercisePanel({ activeNode }: ExercisePanelProps) {
  const [stageExercises, setStageExercises] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lives, setLives] = useState(5);
  const [xp, setXp] = useState(250);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioSrcRef = useRef<string | null>(null);

  useEffect(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      currentAudioSrcRef.current = null;
    }

    if (activeNode === 'duracao') {
      setStageExercises(allDurationStagesExercises.filter(ex => ex.stage === 1));
    } else if (activeNode === 'timbre') {
      setStageExercises(allTimbreStagesExercises.filter(ex => ex.stage === 1));
    } else if (activeNode === 'intensidade') {
      setStageExercises(generateIntensityStageOne ? generateIntensityStageOne() : allIntensityStagesExercises);
    } else if (activeNode === 'densidade') {
      setStageExercises(generateDensityStageOne ? generateDensityStageOne() : allDensityStagesExercises);
    } else {
      const dynamicExercises = generateStageOne ? generateStageOne() : allStagesExercises.filter(ex => ex.stage === 1);
      setStageExercises(dynamicExercises);
    }
    setCurrentIndex(0);
    setSelectedOption(null);
  }, [activeNode]);

  const currentExercise = stageExercises[currentIndex];
  const isDuration = activeNode === 'duracao';
  const isTimbre = activeNode === 'timbre';
  const isIntensity = activeNode === 'intensidade';
  const isDensity = activeNode === 'densidade';

  const playSound = (soundObj: any) => {
    if (!soundObj) return;

    if (soundObj.src) {
      if (currentAudioRef.current) {
        if (currentAudioSrcRef.current === soundObj.src) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
          currentAudioRef.current = null;
          currentAudioSrcRef.current = null;
          return;
        }
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
        currentAudioSrcRef.current = null;
      }

      const audio = new Audio(soundObj.src);
      audio.volume = 1.0;
      currentAudioRef.current = audio;
      currentAudioSrcRef.current = soundObj.src;

      audio.play().catch(err => {
        console.error("Erro ao reproduzir o ficheiro de áudio:", err);
      });

      audio.onended = () => {
        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null;
          currentAudioSrcRef.current = null;
        }
      };
      return;
    }

    const frequency = soundObj.freq || 440;
    const duration = soundObj.duration || 1.0;
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.type = 'sine';

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.setValueAtTime(0.2, now + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + duration);
  };

  const handleVerify = () => {
    if (!selectedOption) {
      alert('Selecione uma opção antes de verificar!');
      return;
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      currentAudioSrcRef.current = null;
    }

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
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      currentAudioSrcRef.current = null;
    }
    setShowCompletionModal(false);
    if (activeNode === 'duracao') {
      setStageExercises(allDurationStagesExercises.filter(ex => ex.stage === 1));
    } else if (activeNode === 'timbre') {
      setStageExercises(allTimbreStagesExercises.filter(ex => ex.stage === 1));
    } else if (activeNode === 'intensidade') {
      setStageExercises(generateIntensityStageOne ? generateIntensityStageOne() : allIntensityStagesExercises);
    } else if (activeNode === 'densidade') {
      setStageExercises(generateDensityStageOne ? generateDensityStageOne() : allDensityStagesExercises);
    } else if (generateStageOne) {
      setStageExercises(generateStageOne());
    }
    setCurrentIndex(0);
    setErrors(0);
    setLives(5);
    setSelectedOption(null);
  };

  if (!currentExercise) return null;

  const targetRaw = currentExercise.target; 
  const targetLabel = isDuration 
    ? (targetRaw === 'LONGO' ? 'LONGO' : 'CURTO')
    : isTimbre
    ? targetRaw
    : isIntensity
    ? (targetRaw === 'FORTE' ? 'FORTE' : 'FRACO')
    : isDensity
    ? (targetRaw === 'MAIS_DENSO' ? 'MAIS DENSO' : 'MENOS DENSO')
    : (targetRaw === 'AGUDA' ? 'AGUDA' : 'GRAVE');

  return (
    <>
      <section className="xl:col-span-5 rounded-xl bg-surface-container border border-outline-variant/40 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-caption-signal font-caption-signal text-primary font-bold uppercase tracking-wider">
              {activeNode === 'duracao' ? 'DURAÇÃO' : activeNode.toUpperCase()} — ETAPA 1
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

          {/* Instrução Acústica Dinâmica */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/40 mb-5">
            <div className="text-caption-signal font-caption-signal text-on-surface-variant uppercase mb-1 font-semibold">INSTRUÇÃO ACÚSTICA</div>
            <div className="text-body-md font-body-md">
              {isTimbre ? (
                <>Ouça os dois sons. Qual deles é o som de <span className="text-primary font-bold">{targetLabel}</span>?</>
              ) : isDensity ? (
                <>Ouça os dois sons. Qual deles é o som <span className="text-primary font-bold">{targetLabel}</span>?</>
              ) : (
                <>Ouça os dois sons. Qual deles possui o som mais <span className="text-primary font-bold">{targetLabel}</span>?</>
              )}
            </div>
          </div>

          {/* Botões de Áudio A vs B */}
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

          {/* Opções de Resposta Dinâmicas */}
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { 
                id: 'A', 
                label: isTimbre 
                  ? `Som A é ${targetLabel}` 
                  : isDensity 
                  ? `Som A é ${targetLabel.toLowerCase()}` 
                  : `Som A é mais ${targetLabel.toLowerCase()}` 
              },
              { 
                id: 'B', 
                label: isTimbre 
                  ? `Som B é ${targetLabel}` 
                  : isDensity 
                  ? `Som B é ${targetLabel.toLowerCase()}` 
                  : `Som B é mais ${targetLabel.toLowerCase()}` 
              },
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