# 包粽子大作战 🥟

端午主题休闲点击小游戏。60 秒内按正确顺序「折粽叶 → 加糯米 → 放馅料 → 包紧 → 捆线」包出尽可能多的粽子，手快加连击、分数翻倍，配龙舟鼓点背景音乐。

技术栈：**Vite + 原生 TypeScript**（无框架），Web Audio 实时合成音乐，无任何外部资源。

## 开发

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 类型检查 + 打包到 dist/
npm run preview  # 预览生产构建
```

## 持续集成与部署

仓库内置两条 GitHub Actions 工作流（`.github/workflows/`）：

- **ci.yml**：每次 push 到 `main` 或提 PR 时，运行 `npm ci` + `npm run build`（含 tsc 类型检查），并上传 `dist` 产物。用于守住构建质量。
- **deploy.yml**：push 到 `main`（或手动触发）时，构建并部署到 Netlify 生产环境。

### 部署所需的 Secrets

在 GitHub 仓库 `Settings → Secrets and variables → Actions` 中添加两个密钥：

| Secret | 获取方式 |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Applications → Personal access tokens 新建 |
| `NETLIFY_SITE_ID` | Netlify 站点 → Site configuration → 复制 Site ID（或 API ID） |

需要先在 Netlify 后台手动建一个空站点（不连 Git 也行），拿到 Site ID 即可；之后所有部署都由 GitHub Actions 推送。

### 两种部署方式（二选一）

1. **GitHub Actions 推送（本仓库默认）**：配好上面两个 Secret，push 到 `main` 即自动部署。
2. **Netlify 直连 Git**：在 Netlify 后台直接连接本仓库，它会读取 `netlify.toml`（build command `npm run build`，publish 目录 `dist`）。若用这种方式，可删除 `deploy.yml` 避免重复部署。

也可手动拖拽 `dist/` 目录到 Netlify 后台部署。

### CI 徽章

把下面的 `OWNER/REPO` 换成你的仓库后，可放到本文件顶部：

```markdown
![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)
```

## SEO 与分享卡片（OG）

`index.html` 头部已内置完整的搜索与分享优化，绝对地址统一使用 `https://zongzi.yuguo.im`：

- **基础 SEO**：`title` / `description` / `keywords` / `author` / `canonical` / `theme-color` / `robots`。
- **Open Graph**：`og:title` / `og:description` / `og:image`（`/og-image.png`，1200×630）/ `og:url` / `og:locale`，微信、QQ、Facebook 等分享时显示大图卡片。
- **Twitter Card**：`summary_large_image` 大图卡片。
- **结构化数据**：`VideoGame` 类型的 JSON-LD，利于搜索引擎富结果。
- **静态资源**（在 `public/`，构建后位于站点根）：
  - `og-image.png` 分享大图
  - `favicon.svg` 站点图标
  - `robots.txt`、`sitemap.xml`

### 换域名时要改的地方

如果部署域名不是 `zongzi.yuguo.im`，全局替换以下文件中的该地址即可：

```
index.html          # canonical / og:url / og:image / twitter:image / JSON-LD
public/robots.txt    # Sitemap 行
public/sitemap.xml   # <loc>
```

### 验证工具

- 微信：把链接发到对话框，看是否出现大图卡片（微信有缓存，改动后可在链接后加 `?v=2` 强刷）。
- Twitter：[Card Validator](https://cards-dev.twitter.com/validator)
- Facebook：[Sharing Debugger](https://developers.facebook.com/tools/debug/)

## 目录结构

```
src/
  main.ts            入口：挂载界面、连接交互
  style.css          全部样式
  game/
    config.ts        步骤、常量、段位、文案
    audio.ts         AudioEngine 背景音乐与音效
    game.ts          ZongziGame 游戏状态机与渲染
  ui/
    poster.ts        开始页海报 SVG
    screens.ts       界面骨架 HTML
```
