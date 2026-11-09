'use client';

import React, { useState, useMemo } from 'react';
import { Cabecalho } from '@/components/Cabecalho';
import { BarraLateral } from '@/components/BarraLateral';
import { PrincipalMundo } from '@/components/PrincipalMundo';
import { ConstelacaoNeural } from '@/components/ConstelacaoNeural';
import { PainelExercicio } from '@/components/PainelExercicio';
import { PainelAfinador } from '@/components/PainelAfinador';
import { nosMundo1 } from '@/data/mundo1';
import { nosMundo2 } from '@/data/mundo2';
import { nosMundo3 } from '@/data/mundo3';
import { nosMundo4 } from '@/data/mundo4';
import { nosMundo5 } from '@/data/mundo5';
import { useProgressoMundo } from '@/hooks/useProgressoMundo';

export default function Home() {
  // Estado para controlar qual o mundo ativo (incluindo 'mundo5')
  const [mundoAtual, setMundoAtual] = useState<'mundo1' | 'mundo2' | 'mundo3' | 'mundo4' | 'mundo5'>('mundo1');

  // Estado para o nó ativo selecionado
  const [noAtivo, setNoAtivo] = useState<string>('altura');

  // Estado para controlar se estamos no 'treino' ou no 'afinador'
  const [vistaAtual, setVistaAtual] = useState<'treino' | 'afinador'>('treino');

  // Hook centralizado de progresso unificado aqui no nível superior
  const { progressoNos, registrarConclusaoEtapaEspecifica, obterTextoProgresso } = useProgressoMundo();

  // Seleciona dinamicamente os nós com base no mundo escolhido e injeta o progresso dinâmico reativo
  const nosBrutos = 
    mundoAtual === 'mundo1' ? nosMundo1 : 
    mundoAtual === 'mundo2' ? nosMundo2 : 
    mundoAtual === 'mundo3' ? nosMundo3 : 
    mundoAtual === 'mundo4' ? nosMundo4 : 
    nosMundo5;

  const nosAtuais = useMemo(() => {
    return nosBrutos.map(no => {
      // 1. Normaliza o ID para minúsculas para prevenir falhas por letras maiúsculas (ex: "Altura" vs "altura")
      const idLower = (no.id || '').toLowerCase();

      // 2. Verifica se é um nó de 3 etapas (incluindo densidade)
      const isTresEtapas = ['altura', 'duracao', 'timbre', 'intensidade', 'densidade'].includes(idLower);

      // 3. PRIORIDADE ABSOLUTA: Se for de 3 etapas, força 3. Caso contrário, lê do objeto ou assume 2.
      const totalEtapasDoNo = isTresEtapas ? 3 : ((no as any).totalEtapas || 2);

      return {
        ...no,
        // Passa o ID normalizado e o teto correto para o hook de progresso
        progresso: obterTextoProgresso(idLower, totalEtapasDoNo),
      };
    });
  }, [nosBrutos, progressoNos, obterTextoProgresso]);

  // Função para mudar de mundo e redefinir o nó ativo inicial
  const aoSelecionarMundo = (mundo: 'mundo1' | 'mundo2' | 'mundo3' | 'mundo4' | 'mundo5') => {
    setMundoAtual(mundo);
    setVistaAtual('treino'); // Garante que volta ao treino ao trocar de mundo
    if (mundo === 'mundo1') {
      setNoAtivo('altura');
    } else if (mundo === 'mundo2') {
      setNoAtivo('ritmo');
    } else if (mundo === 'mundo3') {
      setNoAtivo('pulsacao');
    } else if (mundo === 'mundo4') {
      setNoAtivo('intervalos');
    } else {
      setNoAtivo('triades');
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container bg-grid-telemetry flex flex-col font-body-md overflow-x-hidden">
      
      {/* Cabeçalho */}
      <Cabecalho mundoAtual={mundoAtual} vistaAtual={vistaAtual} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Barra Lateral passa a controlar a vista atual */}
        <BarraLateral 
          mundoAtual={mundoAtual} 
          aoSelecionarMundo={aoSelecionarMundo} 
          vistaAtual={vistaAtual}
          aoSelecionarVista={setVistaAtual}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
          {vistaAtual === 'treino' ? (
            // Layout normal de Treino (2 colunas: Esquerda com Mundo/Constelação, Direita com Painel de Exercício ou Aviso)
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
              <section className="xl:col-span-7 flex flex-col gap-6">
                <PrincipalMundo mundoAtual={mundoAtual} />
                <ConstelacaoNeural 
                  noAtivo={noAtivo} 
                  aoSelecionarNo={setNoAtivo} 
                  nos={nosAtuais}
                />
              </section>

              {/* Lado Direito: Mostra os exercícios ou o aviso de construção para os mundos sem exercícios (3, 4 e 5) */}
              <div className="xl:col-span-5 w-full">
                {mundoAtual === 'mundo3' || mundoAtual === 'mundo4' || mundoAtual === 'mundo5' ? (
                  <div className="w-full bg-surface-container/70 border border-outline-variant/40 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4 min-h-[400px]">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl">
                      🚧
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-title-md font-bold text-on-surface">Módulo em Construção</h2>
                      <p className="text-body-sm text-on-surface-variant max-w-sm">
                        Os exercícios interativos para este mundo estão a ser arquitetados. Podes explorar os nós na constelação e voltar em breve!
                      </p>
                    </div>
                  </div>
                ) : (
                  <PainelExercicio 
                    noAtivo={noAtivo as any} 
                    mundoAtual={mundoAtual} 
                    aoConcluirEtapa={(noId, etapa) => {
                      console.log('[HOME] Registando conclusão de etapa via Painel:', { noId, etapa });
                      registrarConclusaoEtapaEspecifica(noId, etapa);
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            // Layout do Afinador: Ocupa o espaço completo da área principal
            <div className="w-full max-w-3xl mx-auto">
              <PainelAfinador />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}