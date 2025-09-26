import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['fsevents']
    }
  },
  optimizeDeps: {
    exclude: ['fsevents']
  }
})