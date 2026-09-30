// Web Audio API procedural sound effects & SpeechSynthesis wrapper (Spanish & Hindi)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.activeLanguage = 'es';
  }

  setEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  isEnabled() {
    return this.soundEnabled;
  }

  setLanguage(lang) {
    this.activeLanguage = lang;
  }

  initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Cheerful, rising chime for correct answers (Duolingo signature ding)
  playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const duration = 0.12;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + duration);
      });
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  // Gentle, soft two-tone "uh-oh" for wrong answers
  playWrong() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [311.13, 233.08]; // Eb4, Bb3
      const duration = 0.22;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        gain.gain.setValueAtTime(0, now + idx * 0.18);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.18 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + duration);
      });
    } catch {
      // Audio context might be restricted
    }
  }

  // Tactile pop for tapping word tokens or buttons
  playPop() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }

  // Victory fanfare on finishing a lesson
  playFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.5);
      });
    } catch {
      // Ignore
    }
  }

  // Pronunciation via Web Speech API (Auto-detects Hindi or Spanish)
  speak(phrase, rate = 0.95, targetLang) {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(phrase);

      // Check for Devanagari script (Hindi Unicode range \u0900-\u097F)
      const hasDevanagari = /[\u0900-\u097F]/.test(phrase);
      const isHindi = targetLang === 'hi' || (!targetLang && (this.activeLanguage === 'hi' || hasDevanagari));

      const langCode = isHindi ? 'hi-IN' : 'es-ES';
      utterance.lang = langCode;
      utterance.rate = rate; // 0.65 for turtle speed, 0.95 normal
      utterance.pitch = 1.05;

      // Select voice matching language
      const voices = window.speechSynthesis.getVoices();
      const matchVoice = voices.find(v => 
        isHindi 
          ? (v.lang.startsWith('hi') || v.lang.includes('Hindi') || v.name.includes('Hindi'))
          : (v.lang.startsWith('es') || v.lang.includes('Spanish'))
      );

      if (matchVoice) {
        utterance.voice = matchVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }
}

export const sound = new SoundEngine();
