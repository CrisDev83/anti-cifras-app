'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { WorldHero } from '@/components/WorldHero';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { ExercisePanel } from '@/components/ExercisePanel';
import { world1Nodes } from '@/data/world1';
import { world2Nodes } from '@/data/world2';

export default function Home() {
  // Estado para controlar qual o mundo ativo ('world1' ou 'world2')
  const [currentWorld, setCurrentWorld] = useState<'world1' | 'world2'>('world1');
  
  // Estado para o nó ativo selecionado
  const [activeNode, setActiveNode] = useState<string>('altura');

  // Seleciona dinamicamente os nós com base no mundo escolhido
  const currentNodes = currentWorld === 'world1' ? world1Nodes : world2Nodes;

  // Função para mudar de mundo e redefinir o nó ativo inicial
  const handleSelectWorld = (world: 'world1' | 'world2') => {
    setCurrentWorld(world);
    if (world === 'world1') {
      setActiveNode('altura');
    } else {
      setActiveNode('ritmo'); // <--- Inicializa na Pulsação ao entrar no Mundo 2
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container bg-grid-telemetry flex flex-col font-body-md overflow-x-hidden">
      
      {/* 1. Passamos o currentWorld para o Header */}
      <Header currentWorld={currentWorld} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Passamos o estado e a função para o Sidebar */}
        <Sidebar currentWorld={currentWorld} onSelectWorld={handleSelectWorld} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            <section className="xl:col-span-7 flex flex-col gap-6">
              <WorldHero currentWorld={currentWorld} />
              
              {/* Constelação Neural atualiza os nós conforme o mundo ativo */}
              <NeuralConstellation 
                activeNode={activeNode} 
                onSelectNode={setActiveNode} 
                nodes={currentNodes}
              />
            </section>

            {/* 3. Passamos o currentWorld e o activeNode para o Painel de Exercícios */}
            <ExercisePanel 
              activeNode={activeNode as any} 
              currentWorld={currentWorld} 
            />

          </div>
        </main>
      </div>
    </div>
  );
}