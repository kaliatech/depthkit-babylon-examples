import { defineConfig } from 'vite'
import { resolve } from 'path'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/depthkit-babylon-examples/dist/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        example1: resolve(__dirname, 'example1/index.html'),
        example2: resolve(__dirname, 'example2/index.html')
      }
    }
  },
  plugins: [glsl()],
  server: {
    port: 3543,
    https: true,
    // Uncomment to allow access from network (or use `npm run dev -- -- host=0.0.0.0`)
    // host: '0.0.0.0',
  },

})
