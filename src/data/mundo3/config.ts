export interface ConfiguracaoNoMundo3 {
  id: 'pulsacao' | 'swing_straight' | 'compasso' | 'tempo' | 'duracao_figuras' | 'grooves_estilos';
  label: string;
  icon: string;
  left: string;
  top: string;
  progress?: string;
  etapasConcluidas?: number;
  totalEtapas?: number;
}

export const nosMundo3: ConfiguracaoNoMundo3[] = [
  {
    id: 'pulsacao',
    label: 'Pulsação',
    icon: 'favorite',
    left: '15%',
    top: '50%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'swing_straight',
    label: 'Swing vs. Straight',
    icon: 'sync_alt',
    left: '35%',
    top: '25%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'compasso',
    label: 'Compasso',
    icon: 'grid_view',
    left: '35%',
    top: '75%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'tempo',
    label: 'Tempo Forte e Fraco',
    icon: 'flash_on',
    left: '65%',
    top: '25%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'duracao_figuras',
    label: 'Duração e Figuras',
    icon: 'hourglass_top',
    left: '65%',
    top: '75%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'grooves_estilos',
    label: 'Grooves e Estilos',
    icon: 'music_note',
    left: '85%',
    top: '50%',
    progress: '0/2',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
];