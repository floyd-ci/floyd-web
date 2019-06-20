import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import {terser} from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

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
			dev: !production,
			emitCss: true,
		}),
		production && terser({
			module: true,
		}),
	],
};
