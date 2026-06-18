// 游戏状态机与界面渲染
import { AudioEngine } from './audio';
import {
  STEPS,
  ZONGZI_DONE,
  ZONGZI_WIP,
  GAME_SECONDS,
  COMBO_WORDS,
  rankFor,
  STORAGE_BEST,
} from './config';

function el<T extends HTMLElement = HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`缺少元素 #${id}`);
  return node as T;
}

export class ZongziGame {
  private score = 0;
  private count = 0;
  private combo = 0;
  private maxCombo = 0;
  private step = 0;
  private playing = false;
  private timer: number | null = null;
  private lastTime = 0;

  constructor(private audio: AudioEngine) {}

  /** 读取并展示最高分（开始页） */
  showBest(): void {
    const best = this.bestScore();
    el('bestStart').textContent = best ? `🏆 最高分：${best}` : '';
  }

  private bestScore(): number {
    return Number(localStorage.getItem(STORAGE_BEST) || 0);
  }

  private buildControls(): void {
    const wrap = el('controls');
    wrap.innerHTML = '';
    const order = [...STEPS].sort(() => Math.random() - 0.5);
    order.forEach((s) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.dataset.id = String(s.id);
      b.innerHTML = `<span class="ic">${s.ic}</span><span class="lb">${s.lb}</span>`;
      b.addEventListener('click', () => this.tap(s.id, b));
      wrap.appendChild(b);
    });
    this.renderSeq();
    this.showBest();
  }

  private shuffleControls(): void {
    const wrap = el('controls');
    const btns = [...wrap.children];
    btns.sort(() => Math.random() - 0.5);
    btns.forEach((b) => wrap.appendChild(b));
  }

  private renderSeq(): void {
    const seq = el('seq');
    seq.innerHTML = '';
    STEPS.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i < this.step ? ' done' : '') + (i === this.step ? ' cur' : '');
      d.textContent = s.ic;
      seq.appendChild(d);
    });
    document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
      b.classList.toggle('hint', Number(b.dataset.id) === this.step);
    });
  }

  start(): void {
    this.score = 0;
    this.count = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.step = 0;
    this.playing = true;
    this.lastTime = performance.now();
    el('score').textContent = '0';
    el('comboN').textContent = 'x1';
    el('count').textContent = '0';
    el('zongzi').textContent = ZONGZI_WIP;
    el('timebar').style.width = '100%';
    this.buildControls();
    this.show('play');
    this.audio.startMusic();
    if (this.timer !== null) clearInterval(this.timer);
    const t0 = Date.now();
    this.timer = window.setInterval(() => {
      const time = Math.max(0, GAME_SECONDS - (Date.now() - t0) / 1000);
      el('timebar').style.width = (time / GAME_SECONDS) * 100 + '%';
      if (time <= 0) this.end();
    }, 100);
  }

  private tap(id: number, btn: HTMLElement): void {
    if (!this.playing) return;
    const z = el('zongzi');
    if (id === this.step) {
      this.step++;
      z.classList.remove('pop');
      void z.offsetWidth;
      z.classList.add('pop');
      if (this.step >= STEPS.length) this.complete();
      else this.renderSeq();
    } else {
      this.combo = 0;
      el('comboN').textContent = 'x1';
      z.classList.remove('shake');
      void z.offsetWidth;
      z.classList.add('shake');
      this.audio.sfx('wrong');
      btn.animate([{ background: '#ffdede' }, { background: '#fff' }], { duration: 300 });
    }
  }

  private complete(): void {
    this.combo++;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    const speedBonus = dt < 2.2 ? 5 : dt < 3.5 ? 2 : 0;
    const mult = Math.min(this.combo, 5);
    const gain = (10 + speedBonus) * mult;
    this.score += gain;
    this.count++;
    el('score').textContent = String(this.score);
    el('count').textContent = String(this.count);
    el('comboN').textContent = 'x' + mult;
    const z = el('zongzi');
    z.textContent = ZONGZI_DONE;
    this.floatText('+' + gain);
    this.audio.sfx(this.combo >= 2 ? 'combo' : 'done');
    if (this.combo >= 2) this.comboMsg(this.combo);
    window.setTimeout(() => {
      if (!this.playing) return;
      z.textContent = ZONGZI_WIP;
      this.step = 0;
      this.shuffleControls();
      this.renderSeq();
    }, 260);
  }

  private floatText(txt: string): void {
    const stage = document.querySelector('.stage');
    if (!stage) return;
    const f = document.createElement('div');
    f.className = 'float';
    f.textContent = txt;
    f.style.left = 40 + Math.random() * 40 + '%';
    f.style.top = '52%';
    stage.appendChild(f);
    window.setTimeout(() => f.remove(), 800);
  }

  private comboMsg(c: number): void {
    const m = el('comboMsg');
    m.textContent = '🔥 ' + (COMBO_WORDS[Math.min(c, 6)] || '超神!') + ' x' + Math.min(c, 5);
    m.classList.remove('show');
    void m.offsetWidth;
    m.classList.add('show');
  }

  private end(): void {
    this.playing = false;
    if (this.timer !== null) clearInterval(this.timer);
    this.audio.stopMusic();
    el('finalScore').textContent = String(this.score);
    el('finalCount').textContent = String(this.count);
    el('finalCombo').textContent = String(this.maxCombo);
    el('rank').textContent = rankFor(this.score);
    const best = this.bestScore();
    if (this.score > best) {
      localStorage.setItem(STORAGE_BEST, String(this.score));
      el('bestEnd').textContent = '🎊 新纪录！超越了之前的 ' + best + ' 分';
    } else {
      el('bestEnd').textContent = '🏆 历史最高：' + best + ' 分';
    }
    this.show('end');
  }

  private show(id: string): void {
    document.querySelectorAll<HTMLElement>('.screen').forEach((s) => s.classList.remove('active'));
    el(id).classList.add('active');
  }

  /** 键盘 1-5 对应控制按钮 */
  onKey(e: KeyboardEvent): void {
    if (!this.playing) return;
    const n = parseInt(e.key);
    if (n >= 1 && n <= 5) {
      const btns = [...document.querySelectorAll<HTMLElement>('.btn')];
      btns[n - 1]?.click();
    }
  }
}
