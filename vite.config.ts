import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Page from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
const pathName = path.resolve(__dirname, 'src/typings')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Page(),
    Components({
      dts: path.resolve(pathName, 'components.d.ts'),
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: path.resolve(pathName, 'components.d.ts'),
    }),
  ],
})
