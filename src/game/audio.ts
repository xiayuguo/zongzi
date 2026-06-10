// 端午背景音乐与音效：纯 Web Audio 程序合成，无外部音频文件
import { STORAGE_SOUND } from './config';

// 五声音阶 (C 宫调: C D E G A)，欢快端午小调
const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

// 一段循环旋律（音阶索引，-1 = 休止）
const MELODY = [
  0, 2, 1, 3, 2, 1, 0, -1,
  3, 2, 3, 4, 2, 1, 0, -1,
  4, 3, 2, 1, 0, 1, 2, 3,
  4, 5, 4, 2, 1, 0, -1, -1,
];

export type Sfx = 'done' | 'wrong' | 'combo';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private started = false;
  private step = 0;
  on = true;

  constructor(private btn?: HTMLElement) {}

  private ensure(): void {
    if (this.ctx) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.on ? 0.5 : 0;
    this.master.connect(this.ctx.destination);
  }

  // 旋律音：三角波 + 衰减包络（近似笛/钟）
  private note(freq: number, t: number, dur: number, vol: number): void {
    if (freq <= 0 || !this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  // 龙舟鼓点：低频正弦下滑
  private drum(t: number): void {
    if (!this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
    g.gain.setValueAtTime(0.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.25);
  }

  startMusic(): void {
    this.ensure();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    if (this.started) return;
    this.started = true;
    this.step = 0;
    const bpm = 132;
    const span = 60 / bpm / 2; // 每音符半拍
    let next = this.ctx.currentTime + 0.1;
    const sched = (): void => {
      if (!this.ctx) return;
      while (next < this.ctx.currentTime + 0.3) {
        const idx = MELODY[this.step % MELODY.length];
        this.note(SCALE[idx] ?? 0, next, span * 1.6, 0.22);
        if (this.step % 4 === 0) this.drum(next);
        next += span;
        this.step++;
      }
    };
    this.timer = window.setInterval(sched, 60);
  }

  stopMusic(): void {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
    this.started = false;
  }

  sfx(type: Sfx): void {
    if (!this.ctx || !this.master || !this.on) return;
    const t = this.ctx.currentTime;
    if (type === 'done') {
      [659.25, 880, 1046.5].forEach((f, i) => this.note(f, t + i * 0.05, 0.18, 0.3));
    } else if (type === 'combo') {
      [880, 1046.5, 1318.5].forEach((f, i) => this.note(f, t + i * 0.04, 0.16, 0.28));
    } else {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(180, t);
      o.frequency.linearRampToValueAtTime(90, t + 0.15);
      g.gain.setValueAtTime(0.25, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.connect(g).connect(this.master);
      o.start(t);
      o.stop(t + 0.2);
    }
  }

  toggle(): void {
    this.on = !this.on;
    if (this.btn) this.btn.textContent = this.on ? '🔊' : '🔇';
    if (this.master) this.master.gain.value = this.on ? 0.5 : 0;
    try {
      localStorage.setItem(STORAGE_SOUND, this.on ? '1' : '0');
    } catch {
      /* localStorage 不可用时忽略 */
    }
  }

  initPref(): void {
    if (localStorage.getItem(STORAGE_SOUND) === '0') {
      this.on = false;
      if (this.btn) this.btn.textContent = '🔇';
    }
  }
}
