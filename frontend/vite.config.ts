import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA({
		registerType: 'autoUpdate',
		includeAssets: ['favicon.svg', 'robots.txt'], // Additional assets to cache
		manifest: {
			"background_color": "#ffffff",
			"theme_color": "#7E1F86",
			"name": "Spending Tracker",
			"short_name": "Spending Tracker",
			"start_url": "/",
			"display": "standalone",
		},
	})],
	server: {
		watch: {
			usePolling: true
		},
		host: true,
		cors: {
			origin: '*',
		}
	},

});
