/**
 * Studio Sound FX Engine
 * Native Web Audio API procedural sound synthesizer.
 * Zero external audio files, zero CDN latency, sub-millisecond playback.
 */

class SoundFxEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hz_studio_sound_enabled')
      this.enabled = saved === 'true'
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(enable: boolean) {
    this.enabled = enable
    if (typeof window !== 'undefined') {
      localStorage.setItem('hz_studio_sound_enabled', enable ? 'true' : 'false')
    }
    if (enable) {
      this.initCtx()
      this.playSuccess()
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled)
    return this.enabled
  }

  /**
   * Crisp, minimalist optical/mechanical UI click (40ms exponential decay)
   */
  public playClick() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(620, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.035)

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Graceful fallback if AudioContext restricted
    }
  }

  /**
   * Subtle micro-tick on hovering interactive items (15ms, light high frequency)
   */
  public playHover() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1450, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.015)

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.015)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.018)
    } catch {
      // Ignore
    }
  }

  /**
   * Resonant metallic harmonic chords for shader presets
   */
  public playPresetChord(preset: 'mercury' | 'obsidian' | 'iridescent' | 'gold') {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(2400, now)

      let frequencies: number[] = [440, 880]

      if (preset === 'mercury') {
        // Pure fluid silver octave (A4 + A5)
        frequencies = [440, 880]
        filter.frequency.setValueAtTime(3200, now)
      } else if (preset === 'obsidian') {
        // Deep subterranean titanium resonance (A2 + E3)
        frequencies = [110, 165]
        filter.frequency.setValueAtTime(800, now)
      } else if (preset === 'iridescent') {
        // Prismatic glancing sheen triad (C5 + E5 + G5)
        frequencies = [523.25, 659.25, 783.99]
        filter.frequency.setValueAtTime(4000, now)
      } else if (preset === 'gold') {
        // Molten warm harmonic (E4 + B4)
        frequencies = [329.63, 493.88]
        filter.frequency.setValueAtTime(2000, now)
      }

      frequencies.forEach((freq) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now)

        gain.gain.setValueAtTime(0.001, now)
        gain.gain.linearRampToValueAtTime(0.05, now + 0.04)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

        osc.connect(gain)
        gain.connect(filter)
        filter.connect(this.ctx.destination)

        osc.start(now)
        osc.stop(now + 0.5)
      })
    } catch {
      // Ignore
    }
  }

  /**
   * Positive execution chime (for commands, copying, or shortcuts)
   */
  public playSuccess() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [587.33, 880] // D5 -> A5

      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)

        gain.gain.setValueAtTime(0.001, now + idx * 0.08)
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.015)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.25)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.28)
      })
    } catch {
      // Ignore
    }
  }

  /**
   * Terminal command execution acknowledge
   */
  public playCommandAck() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(800, this.ctx.currentTime)
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.11)
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SoundFxEngine()
