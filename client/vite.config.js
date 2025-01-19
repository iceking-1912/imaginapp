import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve('/home/arcticarc/CODE/imaginapp/client/cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve('/home/arcticarc/CODE/imaginapp/client/cert/localhost.pem')),
    },
    // cors: {
    //   origin: 'http://127.0.0.1',
    // },
    host: "0.0.0.0"
  },
  optimizeDeps: {
    exclude: ['bcrypt']
  },
  commonjsOptions: {
    transformMeta: true
  }
});