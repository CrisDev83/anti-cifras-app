// Referências globais de controlo de áudio para evitar sobreposições
let currentAudio: HTMLAudioElement | null = null;
let currentAudioSrc: string | null = null;
let currentVolume: number = 1.0;

export function playSound(soundObj: any) {
  if (!soundObj) return;

  // Extrai o caminho do áudio de forma flexível (suporta src, fonte, file, audio ou string direta)
  const audioSrc = typeof soundObj === 'string' 
    ? soundObj 
    : (soundObj.src || soundObj.fonte || soundObj.file || soundObj.audio);

  // Extrai o volume caso venha definido no objeto (padrão 1.0)
  const volume = (typeof soundObj === 'object' && soundObj !== null && soundObj.volume !== undefined) 
    ? soundObj.volume 
    : 1.0;

  // Se encontrou um caminho de áudio válido
  if (audioSrc) {
    if (currentAudio) {
      // Compara tanto o src quanto o volume para permitir alternar entre sons com o mesmo ficheiro mas volumes diferentes
      if (currentAudioSrc === audioSrc && currentVolume === volume) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        currentAudioSrc = null;
        currentVolume = 1.0;
        return;
      }
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      currentAudioSrc = null;
    }

    const audio = new Audio(audioSrc);
    audio.volume = volume;
    currentAudio = audio;
    currentAudioSrc = audioSrc;
    currentVolume = volume;

    audio.play().catch(err => {
      console.error("Erro ao reproduzir o ficheiro de áudio:", err, "Caminho tentado:", audioSrc);
    });

    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        currentAudioSrc = null;
        currentVolume = 1.0;
      }
    };
    return;
  }

  // Caso contrário, usa a síntese por frequência (Web Audio API) como fallback
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
    currentVolume = 1.0;
  }
}