import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['fsevents'],
      output: {
        manualChunks: {
          vendor: ['vite']
        }
      }
    }
  },
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    exclude: ['fsevents']
  },
  define: {
    global: 'globalThis'
  }
})