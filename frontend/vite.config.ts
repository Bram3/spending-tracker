import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true
		},
		host: true,
		cors: {
			origin: process.env.ORIGIN || 'http://localhost:5173',
		}
	}
});
