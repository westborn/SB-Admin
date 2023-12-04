import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-static'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		alias: {
			// these are the aliases and paths to them
			'@components': path.resolve('./src/lib/components'),
			'@lib': path.resolve('./src/lib'),
			'@utils': path.resolve('./src/lib/utils')
		}
	},

	preprocess: vitePreprocess()
}

export default config
