export interface ConfiguracaoNo {
  id: 'altura' | 'duracao' | 'timbre' | 'intensidade' | 'densidade';
  label: string;
  icon: string;
  left: string;
  top: string;
  progress?: string;       // Mantido opcional por compatibilidade
  etapasConcluidas?: number; // Começa em 0
  totalEtapas?: number;      // Definido para 2
}

export const nosMundo1: ConfiguracaoNo[] = [
  {
    id: 'altura',
    label: 'Altura',
    icon: 'graphic_eq',
    left: '18%',
    top: '48%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'duracao',
    label: 'Duração',
    icon: 'timer',
    left: '50%',
    top: '22%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'intensidade',
    label: 'Intensidade',
    icon: 'volume_up',
    left: '50%',
    top: '75%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'timbre',
    label: 'Timbre',
    icon: 'waves',
    left: '82%',
    top: '32%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'densidade',
    label: 'Densidade',
    icon: 'layers',
    left: '82%',
    top: '68%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
];