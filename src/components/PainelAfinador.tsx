'use client';

import React, { useState, useEffect } from 'react';
import { alternarFrequenciaAfinador, pararSomAfinador } from '@/utils/audioAfinador';

const INSTRUMENTOS = [
  {
    id: 'violao',
    nome: 'Violão / Guitarra',
    cordas: [
      { nome: '6ª Corda (Mi Grave - E)', nota: 'E3', hz: 164.82 },
      { nome: '5ª Corda (Lá - A)', nota: 'A3', hz: 220.00 },
      { nome: '4ª Corda (Ré - D)', nota: 'D4', hz: 293.66 },
      { nome: '3ª Corda (Sol - G)', nota: 'G4', hz: 392.00 },
      { nome: '2ª Corda (Si - B)', nota: 'B4', hz: 493.88 },
      { nome: '1ª Corda (Mi Agudo - E)', nota: 'E5', hz: 659.26 },
    ],
  },
  {
    id: 'ukulele',
    nome: 'Ukulele',
    cordas: [
      { nome: '4ª Corda (Sol - G)', nota: 'G4', hz: 392.00 },
      { nome: '3ª Corda (Dó - C)', nota: 'C4', hz: 261.63 },
      { nome: '2ª Corda (Mi - E)', nota: 'E4', hz: 329.63 },
      { nome: '1ª Corda (Lá - A)', nota: 'A4', hz: 440.00 },
    ],
  },
  {
    id: 'baixo',
    nome: 'Baixo - 4 cordas',
    cordas: [
      { nome: '4ª Corda (Mi - E)', nota: 'E3', hz: 164.82 },
      { nome: '3ª Corda (Lá - A)', nota: 'A3', hz: 220.00 },
      { nome: '2ª Corda (Ré - D)', nota: 'D4', hz: 293.68 },
      { nome: '1ª Corda (Sol - G)', nota: 'G4', hz: 392.00 },
    ],
  },
];

export function PainelAfinador() {
  const [instrumentoSelecionado, setInstrumentoSelecionado] = useState(INSTRUMENTOS[0]);
  const [notaAtiva, setNotaAtiva] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      pararSomAfinador();
    };
  }, []);

  const lidarComCliqueCorda = (hz: number, nota: string) => {
    const estaTocandoAgora = alternarFrequenciaAfinador(hz, nota);
    setNotaAtiva(estaTocandoAgora ? nota : null);
  };

  const mudarInstrumento = (inst: typeof INSTRUMENTOS[0]) => {
    pararSomAfinador();
    setInstrumentoSelecionado(inst);
    setNotaAtiva(null);
  };

  return (
    <section className="w-full max-w-3xl mx-auto rounded-xl bg-surface-container border border-outline-variant/40 p-6 flex flex-col justify-between shadow-2xl">
      <div>
        {/* Cabeçalho do Afinador */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-caption-signal font-caption-signal text-primary font-bold uppercase tracking-wider">
              TREINO AUDITIVO
            </span>
            <h2 className="text-headline-md font-headline-md text-on-surface mt-1">Afinador de Referência</h2>
          </div>
          <span className="material-symbols-outlined text-primary text-3xl">
            tuner
          </span>
        </div>

        {/* Seleção de Instrumentos */}
        <div className="mb-6">
          <div className="text-caption-signal font-caption-signal text-on-surface-variant uppercase mb-2 font-semibold">
            ESCOLHA O INSTRUMENTO
          </div>
          <div className="grid grid-cols-3 gap-2">
            {INSTRUMENTOS.map((inst) => (
              <button
                key={inst.id}
                onClick={() => mudarInstrumento(inst)}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  instrumentoSelecionado.id === inst.id
                    ? 'border-primary bg-primary/20 text-primary shadow-sm'
                    : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:border-outline-variant'
                }`}
              >
                {inst.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Instrução */}
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/40 mb-6">
          <div className="text-caption-signal font-caption-signal text-on-surface-variant uppercase mb-1 font-semibold">
            INSTRUÇÃO DE OUVIDO
          </div>
          <p className="text-body-md font-body-md text-on-surface">
            Clique numa corda para ouvir a frequência pura em Hz. Clique novamente para parar. Treine o seu ouvido para afinar o seu instrumento por referência auditiva.
          </p>
        </div>

        {/* Lista de Cordas do Instrumento Selecionado */}
        <div className="flex flex-col gap-2.5">
          {instrumentoSelecionado.cordas.map((corda) => {
            const estaTocando = notaAtiva === corda.nota;
            return (
              <button
                key={corda.nota}
                onClick={() => lidarComCliqueCorda(corda.hz, corda.nota)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex justify-between items-center ${
                  estaTocando
                    ? 'border-primary bg-primary/20 text-primary shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:border-outline-variant hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-lg ${estaTocando ? 'animate-pulse text-primary' : ''}`}>
                    {estaTocando ? 'volume_up' : 'music_note'}
                  </span>
                  <span className="font-bold text-sm">{corda.nome}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-label-mono px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">
                    {corda.hz} Hz
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${estaTocando ? 'bg-primary text-on-primary' : 'bg-outline-variant/20 text-on-surface-variant'}`}>
                    {estaTocando ? 'A Tocar' : 'Tocar'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}