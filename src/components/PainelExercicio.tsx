'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ModeloEtapaCompleta } from '@/components/ModeloEtapaCompleta';
import { useSessaoExercicio } from '@/hooks/useSessaoExercicio';
import { obterRotuloAlvo, obterRotuloOpcao } from '@/utils/ajudaMundo1';
import { getWorld2TargetLabel, getWorld2OptionLabel } from '@/utils/ajudaMundo2';

interface PropsPainelExercicio {
  noAtivo: string;
  mundoAtual?: 'mundo1' | 'mundo2';
}

export function PainelExercicio({ noAtivo, mundoAtual = 'mundo1' }: PropsPainelExercicio) {
  // 1. Estado para a etapa selecionada no seletor (E1 ou E2)
  const [etapaSelecionada, setEtapaSelecionada] = useState<number>(1);

  // Redefine para a Etapa 1 sempre que o mundo ou o nó ativo mudar
  useEffect(() => {
    setEtapaSelecionada(1);
  }, [mundoAtual, noAtivo]);

  const eMundoDois = mundoAtual === 'mundo2';

  // Passamos a etapaSelecionada para o hook saber qual etapa carregar
  const {
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
    tocarSom,
    aoVerificar,
    aoReiniciarEtapa
  } = useSessaoExercicio(noAtivo, mundoAtual, etapaSelecionada);

  // 2. Filtro por segurança caso o hook traga o array total
  const exerciciosFiltrados = useMemo(() => {
    if (!exerciciosEtapa) return [];
    const temMultiplasEtapas = exerciciosEtapa.some((ex: any) => ex.etapa !== undefined);
    if (temMultiplasEtapas) {
      return exerciciosEtapa.filter((ex: any) => ex.etapa === etapaSelecionada);
    }
    return exerciciosEtapa;
  }, [exerciciosEtapa, etapaSelecionada]);

  const exercicioAtivo = exerciciosFiltrados[indiceAtual] || exercicioAtual;

  if (!exercicioAtivo) return null;

  // Lógica separada de Rótulos por Mundo
  const rotuloAlvo = eMundoDois 
    ? getWorld2TargetLabel(exercicioAtivo, noAtivo) 
    : obterRotuloAlvo(exercicioAtivo, noAtivo);

  // Função para mudar a etapa e reiniciar o progresso da sessão
  const aoSelecionarEtapa = (etapa: number) => {
    if (etapa === etapaSelecionada) return;
    setEtapaSelecionada(etapa);
    if (aoReiniciarEtapa) {
      aoReiniciarEtapa();
    }
  };

  const renderizarInstrucao = () => {
    if (eMundoDois) {
        switch (noAtivo) {
        case 'ritmo':
          if (etapaSelecionada === 2) {
            return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">RITMO</span>?</>;
          }
          return <>Ouça os dois sons. Qual deles é um <span className="text-primary font-bold">SOM PERCUSSIVO</span>?</>;
        case 'melodia':
          if (etapaSelecionada === 2) {
            return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">MELODIA</span>?</>;
          }
          return <>Ouça os dois sons. Qual deles é uma <span className="text-primary font-bold">NOTA SÓ</span>?</>;
        case 'harmonia':
          if (etapaSelecionada === 2) {
            return <>Ouça os dois sons. Qual deles representa o elemento <span className="text-primary font-bold">HARMONIA</span>?</>;
          }
          return <>Ouça os dois sons. Qual deles traz <span className="text-primary font-bold">VÁRIAS NOTAS JUNTAS</span>?</>;
        default:
          return <>Ouça os dois sons e escolha a resposta correta.</>;
      }
    }

    const noLower = noAtivo.toLowerCase();
    if ((noLower.includes('altura') || noLower.includes('dura') || noLower.includes('intensidade')) && etapaSelecionada === 2) {
      return <>Ouça os dois sons. Qual deles possui o som mais <span className="text-primary font-bold">{rotuloAlvo}</span>?</>;
    }

    return <>Ouça os dois sons. Qual deles {noLower.includes('timbre') || noLower.includes('densidade') ? 'é o som' : 'possui o som mais'} <span className="text-primary font-bold">{rotuloAlvo}</span>?</>;
  };

  const noLower = noAtivo.toLowerCase();
  const mostraSeletorEtapas = eMundoDois || noLower.includes('altura') || noLower.includes('densidade') || noLower.includes('dura') || noLower.includes('intensidade') || noLower.includes('timbre');

  return (
    <>
      <section className="xl:col-span-5 rounded-xl bg-surface-container border border-outline-variant/40 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header Status + Mini-Seletor de Etapas (E1 / E2) */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-caption-signal font-caption-signal text-primary font-bold uppercase tracking-wider">
                {noAtivo.toUpperCase()}
              </span>

              {/* Seletor Compacto E1 / E2 ativado para todos os nós */}
              {mostraSeletorEtapas && (
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant/60 rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => aoSelecionarEtapa(1)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      etapaSelecionada === 1
                        ? 'bg-primary/20 text-primary border border-primary/50 shadow-sm'
                        : 'text-on-surface-variant/60 hover:text-on-surface'
                    }`}
                  >
                    E1
                  </button>
                  <button
                    type="button"
                    onClick={() => aoSelecionarEtapa(2)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      etapaSelecionada === 2
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
                <span key={i}>{i < vidas ? '❤️' : '🖤'}</span>
              ))}
            </div>
          </div>

          {/* Título & Progresso */}
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-headline-md font-headline-md text-on-surface">{exercicioAtivo.titulo}</h2>
            <span className="text-xs font-label-mono text-on-surface-variant">
              Exercício {indiceAtual + 1} de {exerciciosFiltrados.length || exerciciosEtapa.length}
            </span>
          </div>

          {/* Instrução Acústica Dinâmica */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/40 mb-5">
            <div className="text-caption-signal font-caption-signal text-on-surface-variant uppercase mb-1 font-semibold">
              INSTRUÇÃO ACÚSTICA
            </div>
            <div className="text-body-md font-body-md">
              {renderizarInstrucao()}
            </div>
          </div>

          {/* Player de Sons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button 
              onClick={() => tocarSom(exercicioAtivo.somA || exercicioAtivo.soundA)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-caption-signal font-caption-signal text-on-surface-variant">
                {exercicioAtivo.somA?.rotulo || exercicioAtivo.soundA?.label || "Som 01"}
              </div>
              <div className="font-title-sm font-bold text-primary text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">volume_up</span> Tocar Som A
              </div>
            </button>

            <button 
              onClick={() => tocarSom(exercicioAtivo.somB || exercicioAtivo.soundB)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-caption-signal font-caption-signal text-on-surface-variant">
                {exercicioAtivo.somB?.rotulo || exercicioAtivo.soundB?.label || "Som 02"}
              </div>
              <div className="font-title-sm font-bold text-primary text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">volume_up</span> Tocar Som B
              </div>
            </button>
          </div>

          {/* Opções de Resposta */}
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { id: 'A', label: eMundoDois ? getWorld2OptionLabel('A', exercicioAtivo) : obterRotuloOpcao('A', exercicioAtivo, noAtivo) },
              { id: 'B', label: eMundoDois ? getWorld2OptionLabel('B', exercicioAtivo) : obterRotuloOpcao('B', exercicioAtivo, noAtivo) },
              { id: 'EQUAL', label: 'Ambos são iguais' }
            ].map((opcao) => (
              <div
                key={opcao.id}
                onClick={() => setOpcaoSelecionada(opcao.id)}
                className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center text-sm transition-all ${
                  opcaoSelecionada === opcao.id 
                    ? 'border-primary-container bg-primary-container/10 text-on-surface' 
                    : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:border-outline-variant'
                }`}
              >
                <span>{opcao.label}</span>
                <span className="text-[10px] font-label-mono opacity-60">[{opcao.id === 'A' ? '1' : opcao.id === 'B' ? '2' : '3'}]</span>
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
            onClick={aoVerificar}
            className="w-full py-3 px-4 rounded bg-primary-container text-on-primary font-title-sm font-bold text-sm tracking-wider uppercase shadow-[0_0_16px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all cursor-pointer"
          >
            VERIFICAR RESPOSTA
          </button>
          
          <div className="grid grid-cols-3 text-xs font-label-mono text-on-surface-variant mt-3 pt-2 border-t border-outline-variant/20 text-center">
            <div>XP: <strong className="text-yellow-400">{xp}</strong></div>
            <div>Erros: <strong className="text-rose-400">{erros}</strong></div>
            <div>Progresso: <strong className="text-primary">{indiceAtual + 1}/{exerciciosFiltrados.length || exerciciosEtapa.length}</strong></div>
          </div>
        </div>
      </section>

      <ModeloEtapaCompleta 
        estaAberto={mostrarModalConclusao}
        erros={erros}
        totalExercicios={exerciciosFiltrados.length || exerciciosEtapa.length}
        aoReiniciar={aoReiniciarEtapa}
      />
    </>
  );
}