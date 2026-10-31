// Utilitário de Frequências Puras baseadas em 440 Hz

let contextoAudio: AudioContext | null = null;
let osciladorAtivo: OscillatorNode | null = null;
let ganhoAtivo: GainNode | null = null;
let notaEmReproducao: string | null = null;

/**
 * Calcula a frequência exata em Hz de qualquer nota em função de semitons a partir de 440 Hz (A4).
 */
export function calcularFrequenciaPura(semitonsDoLa: number): number {
  return 440 * Math.pow(2, semitonsDoLa / 12);
}

export function alternarFrequenciaAfinador(hz: number, nota: string): boolean {
  try {
    if (!contextoAudio) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      contextoAudio = new AudioContextClass();
    }

    if (contextoAudio.state === 'suspended') {
      contextoAudio.resume();
    }

    if (notaEmReproducao === nota) {
      pararSomAfinador();
      return false;
    }

    pararSomAfinador();

    const tempoAtual = contextoAudio.currentTime;
    const oscilador = contextoAudio.createOscillator();
    const ganho = contextoAudio.createGain();

    oscilador.type = 'sine'; // Onda pura pura baseada estritamente no diapasão
    oscilador.frequency.setValueAtTime(hz, tempoAtual);

    const volumeCompensado = hz < 100 ? 0.5 : 0.35;
    ganho.gain.setValueAtTime(0, tempoAtual);
    ganho.gain.linearRampToValueAtTime(volumeCompensado, tempoAtual + 0.05);

    oscilador.connect(ganho);
    ganho.connect(contextoAudio.destination);

    oscilador.start(tempoAtual);

    osciladorAtivo = oscilador;
    ganhoAtivo = ganho;
    notaEmReproducao = nota;

    return true;
  } catch (erro) {
    console.error('Erro ao gerar frequência pura:', erro);
    return false;
  }
}

export function pararSomAfinador() {
  if (osciladorAtivo) {
    try {
      osciladorAtivo.stop();
      osciladorAtivo.disconnect();
    } catch (e) {}
    osciladorAtivo = null;
    ganhoAtivo = null;
  }
  notaEmReproducao = null;
}