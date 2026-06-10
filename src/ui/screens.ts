// 界面骨架：开始 / 游戏 / 结算三屏
import { POSTER_SVG } from './poster';

export function appHTML(): string {
  return `
  <button class="sound-toggle" id="soundBtn" title="音乐开关">🔊</button>
  <div class="topband"></div>

  <!-- 开始页（海报封面） -->
  <section id="start" class="screen active">
    ${POSTER_SVG}
    <div class="start-cta">
      <button class="play" data-action="start">开始包粽 ▶</button>
      <div class="best" id="bestStart"></div>
    </div>
  </section>

  <!-- 游戏页 -->
  <section id="play" class="screen">
    <div class="hud">
      <div class="chip"><small>得分</small><span id="score">0</span></div>
      <div class="chip"><small>连击</small><span id="comboN">x1</span></div>
      <div class="chip"><small>粽子</small><span id="count">0</span></div>
    </div>
    <div id="timebar-wrap"><div id="timebar"></div></div>

    <div class="stage">
      <div class="combo" id="comboMsg"></div>
      <div class="order">下一步 ↓</div>
      <div class="seq" id="seq"></div>
      <div class="zongzi" id="zongzi">🫔</div>
    </div>

    <div class="controls" id="controls"></div>
  </section>

  <!-- 结算页 -->
  <section id="end" class="screen">
    <div class="center">
      <div class="lantern">🎉</div>
      <h1 style="font-size:28px">时间到！</h1>
      <div class="endline" id="rank">—</div>
      <div class="stat">
        <div><b id="finalScore">0</b><span>总得分</span></div>
        <div><b id="finalCount">0</b><span>包好粽子</span></div>
        <div><b id="finalCombo">0</b><span>最高连击</span></div>
      </div>
      <div class="best" id="bestEnd"></div>
      <button class="play" data-action="start">再来一局 ↻</button>
      <div class="sub" style="font-size:12px">截图分享，祝亲友端午安康 🥟</div>
    </div>
  </section>
  `;
}
