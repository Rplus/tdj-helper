import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	// base: '/tdk-helper/',
	plugins: [svelte()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			// '@comp': resolve(__dirname, 'src/comp'),
		},
	},

	build: {
		rollupOptions: {
			input: [
				resolve(__dirname, './index.html'),
				resolve(__dirname, './weapon/index.html'),
				resolve(__dirname, './roles/index.html'),
				resolve(__dirname, './naihe/index.html'),
				resolve(__dirname, './pick-and-put/index.html'),
				resolve(__dirname, './multi-guarder/index.html'),
				resolve(__dirname, './guild-war/index.html'),
				resolve(__dirname, './strategy/index.html'),
				resolve(__dirname, './runes/index.html'),
			],
			// input: {
			// 	main: resolve(__dirname, './index.html'),
			// 	'weapon2': resolve(__dirname, './weapon/index.html'),
			// 	roless: resolve(__dirname, './roles/index.html'),
			// 	naihe: resolve(__dirname, './naihe/index.html'),
			// 	'naihe': resolve(__dirname, './src/pick-and-put/index.html'),
			// },
			// input: {
			// 	'test1/i_1': resolve(__dirname, './src/index.html'),
			// 	'i_2': resolve(__dirname, './src-2/index.html'),
			// 	ii: resolve(__dirname, './src-2/main.js'),
			// },
		},
	},
});
