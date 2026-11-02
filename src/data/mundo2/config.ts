export interface ConfigNosMundo2 {
  id: 'ritmo' | 'melodia' | 'harmonia';
  label: string;
  icon: string;
  left: string;
  top: string;
  progress?: string;
  etapasConcluidas?: number; // Começa em 0
  totalEtapas?: number;      // Definido para 2
}

export const world2Nodes: ConfigNosMundo2[] = [

  {
    id: 'ritmo',
    label: 'Ritmo',
    icon: 'music_note',
    left: '50%',
    top: '25%',
    progress: '0/5',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'melodia',
    label: 'Melodia',
    icon: 'queue_music',
    left: '50%',
    top: '75%',
    progress: '0/5',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
  {
    id: 'harmonia',
    label: 'Harmonia',
    icon: 'piano',
    left: '75%',
    top: '50%',
    progress: '0/5',
    etapasConcluidas: 0,
    totalEtapas: 2,
  },
];