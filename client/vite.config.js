import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.pem')),
    },
    cors: {
      origin: 'http://127.0.0.1',
    },
    host: "0.0.0.0"
  },
  optimizeDeps: {
    exclude: ['bcrypt']
  },
  commonjsOptions: {
    transformMeta: true
  }
});