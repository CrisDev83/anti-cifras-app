// Referências globais de controlo de áudio para evitar sobreposições
let currentAudio: HTMLAudioElement | null = null;
let currentAudioSrc: string | null = null;

export function playSound(soundObj: any) {
  if (!soundObj) return;

  // Se o som for baseado num ficheiro de áudio (src)
  if (soundObj.src) {
    if (currentAudio) {
      if (currentAudioSrc === soundObj.src) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        currentAudioSrc = null;
        return;
      }
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      currentAudioSrc = null;
    }

    const audio = new Audio(soundObj.src);
    audio.volume = 1.0;
    currentAudio = audio;
    currentAudioSrc = soundObj.src;

    audio.play().catch(err => {
      console.error("Erro ao reproduzir o ficheiro de áudio:", err);
    });

    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        currentAudioSrc = null;
      }
    };
    return;
  }

  // Caso contrário, usa a síntese por frequência (Web Audio API)
  const frequency = soundObj.freq || 440;
  const duration = soundObj.duration || 1.0;
  
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  osc.type = 'sine';

  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
  gain.gain.setValueAtTime(0.2, now + duration - 0.1);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

// Função utilitária para parar qualquer som ativo (útil ao mudar de exercício ou etapa)
export function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    currentAudioSrc = null;
  }
}