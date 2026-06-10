// 入口：挂载界面，连接音频与游戏逻辑
import './style.css';
import { appHTML } from './ui/screens';
import { AudioEngine } from './game/audio';
import { ZongziGame } from './game/game';

const app = document.getElementById('app');
if (!app) throw new Error('缺少 #app 容器');
app.innerHTML = appHTML();

const soundBtn = document.getElementById('soundBtn') as HTMLButtonElement;
const audio = new AudioEngine(soundBtn);
const game = new ZongziGame(audio);

// 音乐开关
soundBtn.addEventListener('click', () => audio.toggle());

// 「开始包粽 / 再来一局」按钮
document.querySelectorAll<HTMLElement>('[data-action="start"]').forEach((b) => {
  b.addEventListener('click', () => game.start());
});

// 键盘 1-5 快捷操作
document.addEventListener('keydown', (e) => game.onKey(e));

// 初始化
game.showBest();
audio.initPref();
