import { defineConfig } from 'vite';

// 相对 base，既能在 Netlify 根路径部署，也能放到子目录或本地直接预览
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    outDir: 'dist',
  },
});
