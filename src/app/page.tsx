'use client';

import React, { useState } from 'react';
import { Cabecalho } from '@/components/Cabecalho';
import { BarraLateral } from '@/components/BarraLateral';
import { PrincipalMundo } from '@/components/PrincipalMundo';
import { ConstelacaoNeural } from '@/components/ConstelacaoNeural';
import { PainelExercicio } from '@/components/PainelExercicio';
import { nosMundo1 } from '@/data/mundo1';
import { nosMundo2 } from '@/data/mundo2';

export default function Home() {
  // Estado para controlar qual o mundo ativo ('world1' ou 'world2')
  const [mundoAtual, setMundoAtual] = useState<'mundo1' | 'mundo2'>('mundo1');

  // Estado para o nó ativo selecionado
  const [noAtivo, setNoAtivo] = useState<string>('altura');

  // Seleciona dinamicamente os nós com base no mundo escolhido
  const nosAtuais = mundoAtual === 'mundo1' ? nosMundo1 : nosMundo2;

  // Função para mudar de mundo e redefinir o nó ativo inicial
  const aoSelecionarMundo = (mundo: 'mundo1' | 'mundo2') => {
    setMundoAtual(mundo);
    if (mundo === 'mundo1') {
      setNoAtivo('altura');
    } else {
      setNoAtivo('ritmo'); // <--- Inicializa na Pulsação ao entrar no Mundo 2
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container bg-grid-telemetry flex flex-col font-body-md overflow-x-hidden">
      
      {/* 1. Passamos o currentWorld para o Header */}
      <Cabecalho mundoAtual={mundoAtual} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Passamos o estado e a função para o Sidebar */}
        <BarraLateral mundoAtual={mundoAtual} aoSelecionarMundo={aoSelecionarMundo} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            <section className="xl:col-span-7 flex flex-col gap-6">
              <PrincipalMundo mundoAtual={mundoAtual} />
              
              {/* Constelação Neural atualiza os nós conforme o mundo ativo */}
              <ConstelacaoNeural 
                noAtivo={noAtivo} 
                aoSelecionarNo={setNoAtivo} 
                nos={nosAtuais}
              />
            </section>

            {/* 3. Passamos o currentWorld e o activeNode para o Painel de Exercícios */}
            <PainelExercicio 
              noAtivo={noAtivo as any} 
              mundoAtual={mundoAtual} 
            />

          </div>
        </main>
      </div>
    </div>
  );
}