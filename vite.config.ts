import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Page from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetIcons, presetUno, presetAttributify } from 'unocss'
import path from 'path'
const pathName = path.resolve(__dirname, 'src/typings')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Page(),
    Unocss({
      presets: [presetIcons(), presetAttributify(), presetUno()],
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({ importStyle: false, resolveIcons: true }),
      ],
      dts: path.resolve(pathName, 'components.d.ts'),
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: path.resolve(pathName, 'components.d.ts'),
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
