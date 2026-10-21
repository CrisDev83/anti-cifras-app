import { useState, useEffect } from 'react';
import { playSound, stopCurrentAudio } from '@/utils/audioPlayer';
import { fetchExercisesForNode } from '@/utils/exerciseHelpers';
import { fetchWorld2Exercises } from '@/utils/world2Helpers'; // 👈 Importa o helper do mundo 2

export function useExerciseSession(activeNode: string, currentWorld: string, selectedStage: number = 1) {
  const [stageExercises, setStageExercises] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lives, setLives] = useState(5);
  const [xp, setXp] = useState(250);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Função centralizada para ir buscar os exercícios corretos
  const loadExercises = () => {
    if (currentWorld === 'world2') {
      return fetchWorld2Exercises(activeNode);
    }
    return fetchExercisesForNode(activeNode);
  };

  useEffect(() => {
    stopCurrentAudio();
    const allExercises = loadExercises();
    
    // Filtra os exercícios pela etapa selecionada (ex: E1 ou E2)
    const filtered = allExercises.some(ex => ex.stage !== undefined)
      ? allExercises.filter(ex => ex.stage === selectedStage)
      : allExercises;

    setStageExercises(filtered);
    setCurrentIndex(0);
    setSelectedOption(null);
  }, [activeNode, currentWorld, selectedStage]);

  const currentExercise = stageExercises[currentIndex];

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
    
    const allExercises = loadExercises();
    const filtered = allExercises.some(ex => ex.stage !== undefined)
      ? allExercises.filter(ex => ex.stage === selectedStage)
      : allExercises;

    setStageExercises(filtered);
    setCurrentIndex(0);
    setErrors(0);
    setLives(5);
    setSelectedOption(null);
  };

  return {
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
  };
}