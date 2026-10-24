import { useState, useEffect } from 'react';
import { playSound, stopCurrentAudio } from '@/utils/audioPlayer';
import { buscarExerciciosParaNo } from '@/utils/ajudaMundo1';
import { fetchWorld2Exercises } from '@/utils/ajudaMundo2';

export function useSessaoExercicio(noAtivo: string, mundoAtual: string, etapaSelecionada: number = 1) {
  const [exerciciosEtapa, setExerciciosEtapa] = useState<any[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
  const [vidas, setVidas] = useState(5);
  const [xp, setXp] = useState(250);
  const [erros, setErros] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [mostrarModalConclusao, setMostrarModalConclusao] = useState(false);

  // Função centralizada para ir buscar os exercícios corretos
  const carregarExercicios = () => {
    if (mundoAtual === 'world2' || mundoAtual === 'mundo2') {
      return fetchWorld2Exercises(noAtivo);
    }
    return buscarExerciciosParaNo(noAtivo);
  };

  useEffect(() => {
    stopCurrentAudio();
    const todosExercicios = carregarExercicios();
    
    // Filtra suportando tanto 'stage' quanto 'etapa' de forma segura
    const filtrados = todosExercicios.filter((ex: any) => {
      const etapaEx = ex.stage !== undefined ? ex.stage : (ex.etapa !== undefined ? ex.etapa : 1);
      return etapaEx === etapaSelecionada;
    });

    // Se o filtro retornar vazio por incompatibilidade, garante que mostra todos para não travar
    setExerciciosEtapa(filtrados.length > 0 ? filtrados : todosExercicios);
    setIndiceAtual(0);
    setOpcaoSelecionada(null);
  }, [noAtivo, mundoAtual, etapaSelecionada]);

  const exercicioAtual = exerciciosEtapa[indiceAtual];

  const aoVerificar = () => {
    if (!opcaoSelecionada) {
      alert('Selecione uma opção antes de verificar!');
      return;
    }

    stopCurrentAudio();

    // Suporta tanto 'correctAnswer' quanto 'respostaCerta' ou 'respostaCorreta'
    const respostaCorretaReal = exercicioAtual?.correctAnswer || exercicioAtual?.respostaCerta || exercicioAtual?.respostaCorreta;

    if (opcaoSelecionada === respostaCorretaReal) {
      setFeedback('Correto! +10 XP');
      setXp(anterior => anterior + 10);
    } else {
      setFeedback('Incorreto!');
      setErros(anterior => anterior + 1);
      setVidas(anterior => Math.max(0, anterior - 1));
    }

    setTimeout(() => {
      setFeedback(null);
      if (indiceAtual < exerciciosEtapa.length - 1) {
        setIndiceAtual(anterior => anterior + 1);
        setOpcaoSelecionada(null);
      } else {
        setMostrarModalConclusao(true);
      }
    }, 1000);
  };

  const aoReiniciarEtapa = () => {
    stopCurrentAudio();
    setMostrarModalConclusao(false);
    
    const todosExercicios = carregarExercicios();
    const filtrados = todosExercicios.filter((ex: any) => {
      const etapaEx = ex.stage !== undefined ? ex.stage : (ex.etapa !== undefined ? ex.etapa : 1);
      return etapaEx === etapaSelecionada;
    });

    setExerciciosEtapa(filtrados.length > 0 ? filtrados : todosExercicios);
    setIndiceAtual(0);
    setErros(0);
    setVidas(5);
    setOpcaoSelecionada(null);
  };

  return {
    exerciciosEtapa,
    indiceAtual,
    exercicioAtual,
    opcaoSelecionada,
    setOpcaoSelecionada,
    vidas,
    xp,
    erros,
    feedback,
    mostrarModalConclusao,
    tocarSom: playSound,
    aoVerificar,
    aoReiniciarEtapa
  };
}