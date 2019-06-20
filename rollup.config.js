import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

export default {
	input: 'src/main.js',
	output: {
		file: 'dist/app.js',
		format: 'esm',
	},
	plugins: [
		copy({
			targets: [
				{src: 'src/index.html', dest: 'dist'},
			],
		}),
		postcss({
			extract: true,
		}),
		resolve({
			browser: true,
		}),
		svelte({
			emitCss: true,
		}),
	],
};
