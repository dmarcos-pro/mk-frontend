import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint src',
          dev: {
            overrideConfig: {
              cache: false,
            },
          },
        },
      }),
    ],
  });
};
