'use client';

import React, { useState } from 'react'; // 1. Importado o useState
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { WorldHero } from '@/components/WorldHero';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { ExercisePanel } from '@/components/ExercisePanel';

export default function Home() {
  // 2. Estado que controla qual nó está ativo ('altura', 'duração' ou 'timbre')
  const [activeNode, setActiveNode] = useState<'altura' | 'duração' | 'duracao' | 'timbre'>('altura');

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container bg-grid-telemetry flex flex-col font-body-md overflow-x-hidden">
      
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            <section className="xl:col-span-7 flex flex-col gap-6">
              <WorldHero />
              {/* 3. Passamos o activeNode e a função de mudança para a constelação */}
              <NeuralConstellation 
                activeNode={activeNode as any} 
                onSelectNode={setActiveNode as any} 
              />
            </section>

            {/* 4. Passamos o activeNode para o painel de exercícios */}
            <ExercisePanel activeNode={activeNode as any} />

          </div>
        </main>
      </div>
    </div>
  );
}