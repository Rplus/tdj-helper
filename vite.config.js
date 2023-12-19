import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	// base: './',
	base: '/tdj-helper/',
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
				resolve(__dirname, './ornament/index.html'),
			],
		},
	},
});
