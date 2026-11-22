import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/local-json': {
				target: 'http://127.0.0.1:9527',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/local-json/, ''),
				// configure: (proxy) => {
				// 	proxy.on('proxyRes', (proxyRes, req) => {
				// 		const readableUrl = decodeURIComponent(req.url || '');
				// 		console.log(`[JSON Proxy] ${proxyRes.statusCode} <- ${readableUrl}`);
				// 	});
				// },
			},
		},
	},
});
