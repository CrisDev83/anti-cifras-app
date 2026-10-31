'use client';

import React, { useState } from 'react';
import { Cabecalho } from '@/components/Cabecalho';
import { BarraLateral } from '@/components/BarraLateral';
import { PrincipalMundo } from '@/components/PrincipalMundo';
import { ConstelacaoNeural } from '@/components/ConstelacaoNeural';
import { PainelExercicio } from '@/components/PainelExercicio';
import { PainelAfinador } from '@/components/PainelAfinador';
import { nosMundo1 } from '@/data/mundo1';
import { nosMundo2 } from '@/data/mundo2';

export default function Home() {
  // Estado para controlar qual o mundo ativo ('mundo1' ou 'mundo2')
  const [mundoAtual, setMundoAtual] = useState<'mundo1' | 'mundo2'>('mundo1');

  // Estado para o nó ativo selecionado
  const [noAtivo, setNoAtivo] = useState<string>('altura');

  // Estado para controlar se estamos no 'treino' ou no 'afinador'
  const [vistaAtual, setVistaAtual] = useState<'treino' | 'afinador'>('treino');

  // Seleciona dinamicamente os nós com base no mundo escolhido
  const nosAtuais = mundoAtual === 'mundo1' ? nosMundo1 : nosMundo2;

  // Função para mudar de mundo e redefinir o nó ativo inicial
  const aoSelecionarMundo = (mundo: 'mundo1' | 'mundo2') => {
    setMundoAtual(mundo);
    setVistaAtual('treino'); // Garante que volta ao treino ao trocar de mundo
    if (mundo === 'mundo1') {
      setNoAtivo('altura');
    } else {
      setNoAtivo('ritmo');
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
            // Layout normal de Treino (2 colunas: Esquerda com Mundo/Constelação, Direita com Painel de Exercício)
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
              <section className="xl:col-span-7 flex flex-col gap-6">
                <PrincipalMundo mundoAtual={mundoAtual} />
                <ConstelacaoNeural 
                  noAtivo={noAtivo} 
                  aoSelecionarNo={setNoAtivo} 
                  nos={nosAtuais}
                />
              </section>
              <PainelExercicio 
                noAtivo={noAtivo as any} 
                mundoAtual={mundoAtual} 
              />
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