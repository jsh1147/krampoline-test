import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const env = loadEnv(process.cwd(), '')
const staticServerUri = env.VITE_APP_PATH || "";

export default defineConfig({
  base: staticServerUri,
  server: {
    port: 3000,
  },
  plugins: [react()],
});