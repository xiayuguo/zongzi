// 游戏常量与文案

export interface Step {
  id: number;
  ic: string;
  lb: string;
}

/** 包粽子的正确步骤顺序 */
export const STEPS: Step[] = [
  { id: 0, ic: '🍃', lb: '折粽叶' },
  { id: 1, ic: '🍚', lb: '加糯米' },
  { id: 2, ic: '🫘', lb: '放馅料' },
  { id: 3, ic: '🌯', lb: '包紧' },
  { id: 4, ic: '🧵', lb: '捆线' },
];

export const ZONGZI_DONE = '🥟';
export const ZONGZI_WIP = '🫔';

/** 游戏时长（秒） */
export const GAME_SECONDS = 60;

/** 连击提示文案，索引对应连击数 */
export const COMBO_WORDS = ['', '', '手速不错!', '连击!', '粽神附体!', '火力全开!', '端午锦鲤!'];

/** 根据分数返回段位评价 */
export function rankFor(score: number): string {
  if (score >= 600) return '🥇 粽界宗师 · 划龙舟去吧！';
  if (score >= 350) return '🥈 包粽高手 · 一家人都夸你！';
  if (score >= 150) return '🥉 熟练学徒 · 再练练就出师！';
  return '🌱 初学乍练 · 多包几个就顺手啦！';
}

export const STORAGE_BEST = 'zongzi_best';
export const STORAGE_SOUND = 'zongzi_sound';
