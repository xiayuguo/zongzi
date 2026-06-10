// 开始页国潮风海报封面（内联 SVG）
export const POSTER_SVG = `
<svg class="poster-bg" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a0d12"/><stop offset="0.5" stop-color="#c8161d"/><stop offset="1" stop-color="#8a0c12"/></linearGradient>
    <radialGradient id="pglow" cx="0.5" cy="0.3" r="0.6"><stop offset="0" stop-color="#f5c542" stop-opacity="0.45"/><stop offset="1" stop-color="#f5c542" stop-opacity="0"/></radialGradient>
    <linearGradient id="pgold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="0.5" stop-color="#f5c542"/><stop offset="1" stop-color="#dca135"/></linearGradient>
    <linearGradient id="pleaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a9d63"/><stop offset="1" stop-color="#1f5c39"/></linearGradient>
    <linearGradient id="pleaf2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#57b878"/><stop offset="1" stop-color="#2e7d4f"/></linearGradient>
    <filter id="psoft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.35"/></filter>
  </defs>
  <rect width="800" height="1200" fill="url(#pbg)"/>
  <rect width="800" height="1200" fill="url(#pglow)"/>
  <g opacity="0.10" fill="none" stroke="#ffe9a8" stroke-width="3">
    <path d="M-20 240 Q 60 200 140 240 T 300 240 T 460 240 T 620 240 T 820 240"/>
    <path d="M-20 1000 Q 60 960 140 1000 T 300 1000 T 460 1000 T 620 1000 T 820 1000"/>
  </g>
  <rect x="28" y="28" width="744" height="1144" rx="22" fill="none" stroke="url(#pgold)" stroke-width="4"/>
  <rect x="40" y="40" width="720" height="1120" rx="16" fill="none" stroke="#f5c542" stroke-width="1.5" opacity="0.6"/>
  <g fill="#f5c542" opacity="0.85">
    <path d="M52 52 h70 v10 h-60 v60 h-10 z"/><path d="M748 52 h-70 v10 h60 v60 h10 z"/>
    <path d="M52 1148 h70 v-10 h-60 v-60 h-10 z"/><path d="M748 1148 h-70 v-10 h60 v-60 h10 z"/>
  </g>
  <g filter="url(#psoft)">
    <g transform="translate(150,90)"><line x1="0" y1="-30" x2="0" y2="0" stroke="#f5c542" stroke-width="3"/><ellipse cx="0" cy="34" rx="34" ry="40" fill="#e0151c" stroke="#f5c542" stroke-width="3"/><rect x="-12" y="-4" width="24" height="8" rx="2" fill="#f5c542"/><rect x="-12" y="64" width="24" height="8" rx="2" fill="#f5c542"/><g stroke="#f5c542" stroke-width="2"><line x1="-8" y1="72" x2="-8" y2="92"/><line x1="0" y1="72" x2="0" y2="96"/><line x1="8" y1="72" x2="8" y2="92"/></g><text x="0" y="44" text-anchor="middle" font-size="30" fill="#f5c542" font-weight="900">端</text></g>
    <g transform="translate(650,90)"><line x1="0" y1="-30" x2="0" y2="0" stroke="#f5c542" stroke-width="3"/><ellipse cx="0" cy="34" rx="34" ry="40" fill="#e0151c" stroke="#f5c542" stroke-width="3"/><rect x="-12" y="-4" width="24" height="8" rx="2" fill="#f5c542"/><rect x="-12" y="64" width="24" height="8" rx="2" fill="#f5c542"/><g stroke="#f5c542" stroke-width="2"><line x1="-8" y1="72" x2="-8" y2="92"/><line x1="0" y1="72" x2="0" y2="96"/><line x1="8" y1="72" x2="8" y2="92"/></g><text x="0" y="44" text-anchor="middle" font-size="30" fill="#f5c542" font-weight="900">午</text></g>
  </g>
  <text x="400" y="320" text-anchor="middle" font-size="120" font-weight="900" fill="url(#pgold)" letter-spacing="6" filter="url(#psoft)">端午安康</text>
  <text x="400" y="372" text-anchor="middle" font-size="24" fill="#ffe9a8" letter-spacing="12" opacity="0.9">DRAGON · BOAT · FESTIVAL</text>
  <g filter="url(#psoft)" transform="translate(400,620)">
    <g><path d="M0 -120 L120 60 L-120 60 Z" fill="url(#pleaf)"/><path d="M0 -120 L120 60 L0 30 Z" fill="url(#pleaf2)" opacity="0.9"/><path d="M0 -120 L-120 60 L0 30 Z" fill="#256b45"/><path d="M-110 20 Q 0 -10 110 20" stroke="#f5c542" stroke-width="6" fill="none"/><path d="M-70 -40 Q 0 -70 70 -40" stroke="#f5c542" stroke-width="6" fill="none"/></g>
    <g transform="translate(-150,70) scale(0.5)"><path d="M0 -120 L120 60 L-120 60 Z" fill="url(#pleaf2)"/><path d="M0 -120 L-120 60 L0 30 Z" fill="#256b45"/><path d="M-110 20 Q 0 -10 110 20" stroke="#f5c542" stroke-width="9" fill="none"/></g>
    <g transform="translate(150,70) scale(0.5)"><path d="M0 -120 L120 60 L-120 60 Z" fill="url(#pleaf2)"/><path d="M0 -120 L-120 60 L0 30 Z" fill="#256b45"/><path d="M-110 20 Q 0 -10 110 20" stroke="#f5c542" stroke-width="9" fill="none"/></g>
  </g>
  <g transform="translate(400,840)" opacity="0.95" filter="url(#psoft)">
    <path d="M-180 0 Q -200 -30 -150 -28 L150 -28 Q 200 -30 180 0 Q 150 26 0 26 Q -150 26 -180 0 Z" fill="#f5c542"/>
    <path d="M-150 -28 Q -190 -55 -210 -34 Q -195 -22 -160 -24 Z" fill="#f5c542"/><circle cx="-188" cy="-36" r="4" fill="#c8161d"/>
    <g stroke="#9e0f15" stroke-width="5"><line x1="-110" y1="-10" x2="-130" y2="34"/><line x1="-55" y1="-10" x2="-75" y2="34"/><line x1="0" y1="-10" x2="-20" y2="34"/><line x1="55" y1="-10" x2="35" y2="34"/><line x1="110" y1="-10" x2="90" y2="34"/></g>
    <rect x="-10" y="-58" width="6" height="34" fill="#9e0f15"/><path d="M-4 -58 L40 -50 L-4 -40 Z" fill="#c8161d" stroke="#9e0f15" stroke-width="2"/>
  </g>
  <g opacity="0.5" fill="none" stroke="#ffe9a8" stroke-width="3">
    <path d="M150 885 Q 200 865 250 885 T 350 885 T 450 885 T 550 885 T 650 885"/>
    <path d="M180 905 Q 230 888 280 905 T 380 905 T 480 905 T 580 905"/>
  </g>
</svg>
`;
