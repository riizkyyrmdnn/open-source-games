import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/open-source-games/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      '@asset': path.resolve(__dirname, 'src/assets'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@page': path.resolve(__dirname, 'src/pages'),
      '@style': path.resolve(__dirname, 'src/styles'),
      '@util': path.resolve(__dirname, 'src/utils'),
    },
  },
});
