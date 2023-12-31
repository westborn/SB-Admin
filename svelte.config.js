import adapter from '@sveltejs/adapter-static'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: '/adminApps'
		},
		alias: {
			// these are the aliases and paths to them
			'@components': path.resolve('./src/lib/components'),
			'@lib': path.resolve('./src/lib'),
			'@utils': path.resolve('./src/lib/utils')
		}
	},
	onwarn: (warning) => {
		if (warning.code === 'ally-autofocus') {
			console.log(warning)
			return
		}
		warning.message += ' and stuff'
		return warning
	},
	vitePlugin: {
		inspector: true
	}
}

export default config
