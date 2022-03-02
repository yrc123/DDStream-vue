import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"components": path.resolve(__dirname, "src/components"),
			"views": path.resolve(__dirname, "src/views"),
			"apis": path.resolve(__dirname, "src/apis"),
			"js": path.resolve(__dirname, "src/js"),
			"assets": path.resolve(__dirname, "src/assets"),
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			dirs: ['src/components'],
			extensions: ['vue'],
			deep: true,
			resolvers: [ElementPlusResolver()],
		}),
	]
})
